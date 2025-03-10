"use client"

import { useState, useEffect, useRef } from "react"
import { useInvitationStore, type InvitationStatus } from "@/lib/invitation-store"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Copy, Mail, RotateCw, XCircle, Check, Loader2 } from "lucide-react"

export function InvitationManagement() {
  const invitations = useInvitationStore((state) => state.invitations)
  const updateInvitation = useInvitationStore((state) => state.updateInvitation)
  const [selectedInvitation, setSelectedInvitation] = useState<string | null>(null)
  const [isResending, setIsResending] = useState(false)
  const [isRevoking, setIsRevoking] = useState(false)
  const [activeTab, setActiveTab] = useState<InvitationStatus | "All">("All")
  const [showCopySuccess, setShowCopySuccess] = useState<string | null>(null)
  const [showDetailsId, setShowDetailsId] = useState<string | null>(null)
  const [showRevokeId, setShowRevokeId] = useState<string | null>(null)
  const linkInputRef = useRef<HTMLInputElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const filteredInvitations = activeTab === "All" ? invitations : invitations.filter((inv) => inv.status === activeTab)

  const sortedInvitations = [...filteredInvitations].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleCopyLink = async (token: string) => {
    if (!isMounted) return

    const origin = window.location.origin
    const link = `${origin}/invite/${token}`

    try {
      await navigator.clipboard.writeText(link)
      setShowCopySuccess(token)
      toast.success("Link copied to clipboard")
      setTimeout(() => setShowCopySuccess(null), 2000)
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

  const handleResend = async (id: string) => {
    setIsResending(true)
    setSelectedInvitation(id)

    try {
      // Generate new expiration date (7 days from now)
      const now = new Date()
      const expiresAt = new Date(now)
      expiresAt.setDate(now.getDate() + 7)

      // Update the invitation
      updateInvitation(id, {
        status: "Pending",
        createdAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
      })

      toast.success("Invitation resent successfully", {
        description: `Sent at ${now.toLocaleTimeString()}`,
      })
    } catch (error) {
      toast.error("Failed to resend invitation")
      console.error(error)
    } finally {
      setTimeout(() => {
        setIsResending(false)
        setSelectedInvitation(null)
      }, 1000) // Keep animation for a moment after success
    }
  }

  const handleRevoke = async (id: string) => {
    setIsRevoking(true)
    setSelectedInvitation(id)

    try {
      updateInvitation(id, {
        status: "Revoked",
      })
      toast.success("Invitation revoked successfully")
      setShowRevokeId(null) // Close the alert dialog
    } catch (error) {
      toast.error("Failed to revoke invitation")
      console.error(error)
    } finally {
      setIsRevoking(false)
      setSelectedInvitation(null)
    }
  }

  const getStatusBadge = (status: InvitationStatus) => {
    const badges = {
      Pending: "bg-blue-500/10 text-blue-500",
      Accepted: "bg-green-500/10 text-green-500",
      Expired: "bg-yellow-500/10 text-yellow-500",
      Revoked: "bg-red-500/10 text-red-500",
    }
    return (
      <Badge variant="outline" className={badges[status]}>
        {status}
      </Badge>
    )
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }
  }

  // Check for expired invitations
  useEffect(() => {
    if (!isMounted) return

    const now = new Date().toISOString()
    invitations.forEach((invitation) => {
      if (invitation.status === "Pending" && invitation.expiresAt < now) {
        updateInvitation(invitation.id, { status: "Expired" })
      }
    })
  }, [invitations, updateInvitation, isMounted])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Invitations</CardTitle>
        <CardDescription>View and manage all invitations sent to potential users.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as InvitationStatus | "All")}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Pending">Pending</TabsTrigger>
            <TabsTrigger value="Accepted">Accepted</TabsTrigger>
            <TabsTrigger value="Expired">Expired</TabsTrigger>
            <TabsTrigger value="Revoked">Revoked</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab}>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Invited By</TableHead>
                    <TableHead>Date Sent</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedInvitations.map((invitation) => {
                    const sentDateTime = formatDateTime(invitation.createdAt)
                    const expiresDateTime = formatDateTime(invitation.expiresAt)

                    return (
                      <TableRow key={invitation.id}>
                        <TableCell>{invitation.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{invitation.role}</Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(invitation.status)}</TableCell>
                        <TableCell>{invitation.invitedByName}</TableCell>
                        <TableCell>
                          <div>{sentDateTime.date}</div>
                          <div className="text-xs text-muted-foreground">{sentDateTime.time}</div>
                        </TableCell>
                        <TableCell>
                          <div>{expiresDateTime.date}</div>
                          <div className="text-xs text-muted-foreground">{expiresDateTime.time}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            {invitation.status === "Pending" && (
                              <>
                                <Button variant="ghost" size="icon" onClick={() => handleCopyLink(invitation.token)}>
                                  {showCopySuccess === invitation.token ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleResend(invitation.id)}
                                  disabled={isResending && selectedInvitation === invitation.id}
                                >
                                  <RotateCw
                                    className={`h-4 w-4 ${
                                      isResending && selectedInvitation === invitation.id ? "animate-spin" : ""
                                    }`}
                                  />
                                </Button>

                                <AlertDialog
                                  open={showRevokeId === invitation.id}
                                  onOpenChange={(open) => setShowRevokeId(open ? invitation.id : null)}
                                >
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-destructive">
                                      <XCircle className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Revoke Invitation</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to revoke this invitation? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel onClick={() => setShowRevokeId(null)}>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleRevoke(invitation.id)}
                                        className="bg-destructive text-destructive-foreground"
                                      >
                                        {isRevoking && selectedInvitation === invitation.id ? (
                                          <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Revoking...
                                          </>
                                        ) : (
                                          "Revoke"
                                        )}
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </>
                            )}

                            {invitation.status === "Expired" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleResend(invitation.id)}
                                disabled={isResending && selectedInvitation === invitation.id}
                              >
                                <RotateCw
                                  className={`h-4 w-4 ${
                                    isResending && selectedInvitation === invitation.id ? "animate-spin" : ""
                                  }`}
                                />
                              </Button>
                            )}

                            <Dialog
                              open={showDetailsId === invitation.id}
                              onOpenChange={(open) => setShowDetailsId(open ? invitation.id : null)}
                            >
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Mail className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Invitation Details</DialogTitle>
                                  <DialogDescription>Details for invitation to {invitation.email}</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <div className="font-medium">Email:</div>
                                    <div className="col-span-3">{invitation.email}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <div className="font-medium">Role:</div>
                                    <div className="col-span-3">{invitation.role}</div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <div className="font-medium">Status:</div>
                                    <div className="col-span-3">{getStatusBadge(invitation.status)}</div>
                                  </div>
                                  {invitation.message && (
                                    <div className="grid grid-cols-4 items-start gap-4">
                                      <div className="font-medium">Message:</div>
                                      <div className="col-span-3 whitespace-pre-wrap">{invitation.message}</div>
                                    </div>
                                  )}
                                  {invitation.status === "Pending" && isMounted && (
                                    <div className="grid grid-cols-4 items-start gap-4">
                                      <div className="font-medium">Link:</div>
                                      <div className="col-span-3">
                                        <Input
                                          readOnly
                                          value={`${window.location.origin}/invite/${invitation.token}`}
                                          onClick={(e) => e.currentTarget.select()}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

