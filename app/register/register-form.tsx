"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useInvitationStore } from "@/lib/invitation-store"
import { useUserStore } from "@/lib/user-store"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function RegisterForm({ token }: { token?: string | null }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getInvitationByToken = useInvitationStore((state) => state.getInvitationByToken)
  const updateInvitation = useInvitationStore((state) => state.updateInvitation)
  const addUser = useUserStore((state) => state.addUser)

  useEffect(() => {
    if (token) {
      const invitation = getInvitationByToken(token)
      if (invitation && invitation.status === "Pending") {
        setEmail(invitation.email)
      }
    }
    setIsLoading(false)
  }, [token, getInvitationByToken])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate form
      if (!name || !email || !password) {
        toast.error("Please fill in all required fields")
        setIsSubmitting(false)
        return
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        setIsSubmitting(false)
        return
      }

      // If registering with an invitation token
      if (token) {
        const invitation = getInvitationByToken(token)

        if (!invitation) {
          toast.error("Invalid invitation token")
          setIsSubmitting(false)
          return
        }

        if (invitation.status !== "Pending") {
          toast.error("This invitation is no longer valid")
          setIsSubmitting(false)
          return
        }

        if (invitation.email !== email) {
          toast.error("The email address does not match the invitation")
          setIsSubmitting(false)
          return
        }

        // Update invitation status
        updateInvitation(invitation.id, {
          status: "Accepted",
          acceptedAt: new Date().toISOString(),
        })

        // Create new user with the invited role
        const newUser = {
          id: `user-${Math.random().toString(36).substring(2, 10)}`,
          name,
          email,
          role: invitation.role,
          status: "Active",
          joinDate: new Date().toISOString(),
          verifiedEmail: true,
          lastLogin: new Date().toISOString(),
        }

        addUser(newUser)

        toast.success("Account created successfully")

        // Redirect to login page
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        // Regular registration (Customer role)
        const newUser = {
          id: `user-${Math.random().toString(36).substring(2, 10)}`,
          name,
          email,
          role: "Customer",
          status: "Active",
          joinDate: new Date().toISOString(),
          verifiedEmail: false,
          lastLogin: new Date().toISOString(),
        }

        addUser(newUser)

        toast.success("Account created successfully")

        // Redirect to login page
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast.error("Failed to create account")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          {token ? "Complete your registration to join ASNPRVCTR" : "Enter your details to create your account"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!!token}
              required
            />
            {token && <p className="text-sm text-muted-foreground">Email is pre-filled from your invitation.</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

