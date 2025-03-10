"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useInvitationStore, type Invitation } from "@/lib/invitation-store"
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react"

export default function InvitePageClient({ token }: { token: string }) {
  const router = useRouter()
  const [invitation, setInvitation] = useState<Invitation | null>(null)
  const [loading, setLoading] = useState(true)
  const [accepting, setAccepting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getInvitationByToken = useInvitationStore((state) => state.getInvitationByToken)
  const updateInvitation = useInvitationStore((state) => state.updateInvitation)

  useEffect(() => {
    // Find the invitation by token
    const foundInvitation = getInvitationByToken(token)

    if (!foundInvitation) {
      setError("Invalid or expired invitation link")
    } else if (foundInvitation.status === "Revoked") {
      setError("This invitation has been revoked")
    } else if (foundInvitation.status === "Expired") {
      setError("This invitation has expired")
    } else if (foundInvitation.status === "Accepted") {
      setError("This invitation has already been accepted")
    } else {
      setInvitation(foundInvitation)
    }

    setLoading(false)
  }, [token, getInvitationByToken])

  const handleAccept = async () => {
    setAccepting(true)

    try {
      // In a real app, this would redirect to a registration page with the token
      // For now, we'll just update the invitation status
      if (invitation) {
        updateInvitation(invitation.id, {
          status: "Accepted",
          acceptedAt: new Date().toISOString(),
        })

        // Redirect to registration page
        router.push(`/register?token=${token}`)
      }
    } catch (error) {
      setError("Failed to accept invitation")
      setAccepting(false)
    }
  }

  const handleDecline = () => {
    if (invitation) {
      updateInvitation(invitation.id, {
        status: "Revoked",
      })

      // Redirect to home page
      router.push("/")
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Verifying invitation...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <XCircle className="h-12 w-12 text-destructive" />
            </div>
            <CardTitle className="text-center">Invitation Error</CardTitle>
            <CardDescription className="text-center">{error}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={() => router.push("/")}>
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (!invitation) {
    return null
  }

  // Calculate expiration time
  const expiresAt = new Date(invitation.expiresAt)
  const now = new Date()
  const daysLeft = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-center">You've Been Invited!</CardTitle>
          <CardDescription className="text-center">
            You've been invited to join ASNPRVCTR as a{invitation.role === "Admin" ? "n" : ""} {invitation.role}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Invitation Details:</p>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="text-muted-foreground">Email:</span>
                <span className="col-span-2 font-medium">{invitation.email}</span>

                <span className="text-muted-foreground">Role:</span>
                <span className="col-span-2 font-medium">{invitation.role}</span>

                <span className="text-muted-foreground">Invited by:</span>
                <span className="col-span-2 font-medium">{invitation.invitedByName}</span>

                <span className="text-muted-foreground">Expires in:</span>
                <span className="col-span-2 font-medium flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                  {daysLeft} days
                </span>
              </div>
            </div>
          </div>

          {invitation.message && (
            <div className="rounded-md border p-4">
              <p className="text-sm font-medium mb-2">Message:</p>
              <p className="text-sm italic">{invitation.message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={handleAccept} disabled={accepting}>
            {accepting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Accepting...
              </>
            ) : (
              "Accept Invitation"
            )}
          </Button>
          <Button variant="outline" className="w-full" onClick={handleDecline}>
            Decline
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

