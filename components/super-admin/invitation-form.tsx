"use client"

import { CardDescription } from "@/components/ui/card"

import type React from "react"

import { useState } from "react"
import { useInvitationStore } from "@/lib/invitation-store"
import { createInvitation } from "@/app/actions/invitation-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function InvitationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [role, setRole] = useState("Artist") // Added state for role
  const addInvitation = useInvitationStore((state) => state.addInvitation)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.target as HTMLFormElement)

    try {
      const result = await createInvitation(formData)

      if (result.success) {
        // Create a new invitation object
        const now = new Date()
        const expiresAt = new Date(now)
        expiresAt.setDate(expiresAt.getDate() + 7) // Expires in 7 days

        // Add to store
        addInvitation({
          id: `inv-${Math.random().toString(36).substring(2, 10)}`,
          email: result.email,
          role: result.role,
          status: "Pending",
          message: formData.get("message") as string,
          invitedBy: "6", // Current user ID (Sarah Thompson)
          invitedByName: "Sarah Thompson", // Current user name
          createdAt: now.toISOString(),
          expiresAt: expiresAt.toISOString(),
          token: result.token,
        })

        // Reset the form
        e.target.reset()

        // Show success message
        toast.success("Invitation sent successfully", {
          description: `An invitation has been sent to ${result.email}.`,
        })
      }
    } catch (error) {
      console.error("Error sending invitation:", error)
      toast.error("Failed to send invitation", {
        description: "Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite New User</CardTitle>
        <CardDescription>Send an invitation to join your platform with a specific role.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="invitation-form" onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="user@example.com" required />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole} disabled={isSubmitting}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Artist">Artist</SelectItem>
                  <SelectItem value="Super-Admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Enter a personal message to include with the invitation..."
                className="min-h-[100px]"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Note: Only invited users can have Admin, Artist, or Super-Admin roles. Customers can register directly.
            </p>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="invitation-form" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Invitation"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

