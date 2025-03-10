"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  Check,
  Edit,
  Lock,
  Trash,
  UserPlus,
  X,
  ShoppingBag,
  CreditCard,
  Package,
  RefreshCw,
  Copy,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"
import { useUserStore, type User, type UserRole } from "@/lib/user-store"
import { useInvitationStore, type Invitation } from "@/lib/invitation-store"

export default function SuperAdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isInviteUserOpen, setIsInviteUserOpen] = useState(false)
  const [isViewUserOpen, setIsViewUserOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // Invitation form state
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<UserRole>("Artist")
  const [inviteMessage, setInviteMessage] = useState("")
  const [isInviting, setIsInviting] = useState(false)
  const [copiedToken, setCopiedToken] = useState<string | null>(null)
  const [isResending, setIsResending] = useState<string | null>(null)

  // Get users and invitations from stores
  const users = useUserStore((state) => state.users)
  const deleteUser = useUserStore((state) => state.deleteUser)
  const invitations = useInvitationStore((state) => state.invitations)
  const addInvitation = useInvitationStore((state) => state.addInvitation)
  const resendInvitation = useInvitationStore((state) => state.resendInvitation)
  const revokeInvitation = useInvitationStore((state) => state.revokeInvitation)

  // Combine users and pending invitations for display
  const allUsers = [...users]
  const pendingInvitations = invitations
    .filter((inv) => inv.status === "Pending")
    .map((inv) => ({
      id: inv.id,
      name: "Invited User",
      email: inv.email,
      role: inv.role,
      status: "Invited",
      joinDate: inv.createdAt,
      verifiedEmail: false,
      lastLogin: "-",
      invitation: inv,
    }))

  const combinedUsers = [...allUsers, ...pendingInvitations]

  const filteredUsers = combinedUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus =
      statusFilter === "all" ||
      user.status.toLowerCase() === statusFilter.toLowerCase() ||
      (statusFilter === "invited" && user.status === "Invited")

    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "inactive":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "suspended":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "invited":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case "super-admin":
        return <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20">{role}</Badge>
      case "admin":
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">{role}</Badge>
      case "artist":
        return <Badge className="bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20">{role}</Badge>
      case "customer":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">{role}</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  const handleViewUser = (user: any) => {
    setSelectedUser(user)
    setIsViewUserOpen(true)
  }

  const handleDeleteUser = async (user: any) => {
    setIsDeleting(true)
    try {
      // If it's an invitation, revoke it
      if (user.invitation) {
        revokeInvitation(user.id)
        toast.success(`Invitation to ${user.email} has been revoked`)
      } else {
        // Otherwise delete the user
        deleteUser(user.id)
        toast.success(`User ${user.name} has been deleted`)
      }
    } catch (error) {
      toast.error("Failed to delete user")
      console.error(error)
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleInviteUser = () => {
    setIsInviting(true)

    try {
      // Validate email
      if (!inviteEmail || !inviteEmail.includes("@")) {
        toast.error("Please enter a valid email address")
        setIsInviting(false)
        return
      }

      // Create a new invitation
      const now = new Date()
      const expiresAt = new Date(now)
      expiresAt.setDate(now.getDate() + 7) // Expires in 7 days

      const token = `token-${Math.random().toString(36).substring(2, 15)}`

      const newInvitation: Invitation = {
        id: `inv-${Math.random().toString(36).substring(2, 10)}`,
        email: inviteEmail,
        role: inviteRole,
        status: "Pending",
        message: inviteMessage,
        invitedBy: "6", // Current user ID (Sarah Thompson)
        invitedByName: "Sarah Thompson", // Current user name
        createdAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        token,
      }

      // Add to store
      addInvitation(newInvitation)

      // Reset form
      setInviteEmail("")
      setInviteRole("Artist")
      setInviteMessage("")

      // Close modal
      setIsInviteUserOpen(false)

      // Show success message
      toast.success("Invitation sent successfully", {
        description: `An invitation has been sent to ${inviteEmail}.`,
      })
    } catch (error) {
      toast.error("Failed to send invitation")
      console.error(error)
    } finally {
      setIsInviting(false)
    }
  }

  const handleCopyInviteLink = (token: string) => {
    const link = `${window.location.origin}/invite/${token}`
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopiedToken(token)
        toast.success("Invitation link copied to clipboard")
        setTimeout(() => setCopiedToken(null), 2000)
      })
      .catch(() => {
        toast.error("Failed to copy link")
      })
  }

  const handleResendInvitation = async (id: string) => {
    setIsResending(id)
    try {
      resendInvitation(id)
      toast.success("Invitation resent successfully")
    } catch (error) {
      toast.error("Failed to resend invitation")
      console.error(error)
    } finally {
      setTimeout(() => setIsResending(null), 1000)
    }
  }

  const formatDate = (dateString: string) => {
    if (dateString === "-") return "-"
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">
          Manage all users across the platform with advanced controls and permissions.
        </p>
      </div>

      <Tabs defaultValue="all-users" className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all-users">All Users</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
            <TabsTrigger value="artists">Artists</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="invited">Invited</TabsTrigger>
          </TabsList>

          <div className="flex space-x-2">
            <Dialog open={isInviteUserOpen} onOpenChange={setIsInviteUserOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Invite New User</DialogTitle>
                  <DialogDescription>Send an invitation to join your platform with a specific role.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="invite-email">Email</Label>
                    <Input
                      id="invite-email"
                      type="email"
                      placeholder="user@example.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="invite-role">Role</Label>
                    <Select value={inviteRole} onValueChange={(value) => setInviteRole(value as UserRole)}>
                      <SelectTrigger id="invite-role">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Artist">Artist</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Super-Admin">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Note: Customer accounts are created through the registration process.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="invite-message">Message (Optional)</Label>
                    <Textarea
                      id="invite-message"
                      placeholder="Enter a personal message to include with the invitation..."
                      value={inviteMessage}
                      onChange={(e) => setInviteMessage(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsInviteUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleInviteUser} disabled={isInviting}>
                    {isInviting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Invitation"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Create a new user with the appropriate role and permissions.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Select>
                      <SelectTrigger id="role" className="col-span-3">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="artist">Artist</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="super-admin">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select defaultValue="active">
                      <SelectTrigger id="status" className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setIsAddUserOpen(false)}>
                    Add User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="super-admin">Super Admin</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="artist">Artist</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
              <SelectItem value="invited">Invited</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="all-users" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">{user.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {user.email}
                        {user.status !== "Invited" &&
                          (user.verifiedEmail ? (
                            <Check className="ml-2 h-4 w-4 text-green-500" />
                          ) : (
                            <X className="ml-2 h-4 w-4 text-red-500" />
                          ))}
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusColor(user.status === "Invited" ? "invited" : user.status.toLowerCase())}
                        variant="outline"
                      >
                        {user.status === "Invited" ? "Invited" : user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.joinDate)}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        {user.status === "Invited" ? (
                          // Actions for invited users
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleCopyInviteLink(user.invitation.token)}
                              title="Copy invitation link"
                            >
                              {copiedToken === user.invitation.token ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleResendInvitation(user.id)}
                              disabled={isResending === user.id}
                              title="Resend invitation"
                            >
                              {isResending === user.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <RefreshCw className="h-4 w-4" />
                              )}
                            </Button>
                          </>
                        ) : (
                          // Actions for regular users
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewUser(user)}
                              title="View details"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Manage permissions">
                              <Lock className="h-4 w-4" />
                            </Button>
                          </>
                        )}

                        {/* Delete/Revoke action for all users */}
                        <AlertDialog
                          open={isDeleteDialogOpen && selectedUser?.id === user.id}
                          onOpenChange={setIsDeleteDialogOpen}
                        >
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => {
                                setSelectedUser(user)
                                setIsDeleteDialogOpen(true)
                              }}
                              title={user.status === "Invited" ? "Revoke invitation" : "Delete user"}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {user.status === "Invited" ? "Revoke Invitation" : "Delete User"}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {user.status === "Invited"
                                  ? `Are you sure you want to revoke the invitation sent to ${user.email}?`
                                  : `Are you sure you want to delete ${user.name}? This action cannot be undone.`}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteUser(user)}
                                className="bg-destructive text-destructive-foreground"
                              >
                                {isDeleting ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {user.status === "Invited" ? "Revoking..." : "Deleting..."}
                                  </>
                                ) : user.status === "Invited" ? (
                                  "Revoke"
                                ) : (
                                  "Delete"
                                )}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TabsContent>

        <TabsContent value="admins">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers
                  .filter((user) => user.role === "Admin" || user.role === "Super-Admin")
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(user.status === "Invited" ? "invited" : user.status.toLowerCase())}
                          variant="outline"
                        >
                          {user.status === "Invited" ? "Invited" : user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          {user.status === "Invited" ? (
                            // Actions for invited users
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCopyInviteLink(user.invitation.token)}
                                title="Copy invitation link"
                              >
                                {copiedToken === user.invitation.token ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleResendInvitation(user.id)}
                                disabled={isResending === user.id}
                                title="Resend invitation"
                              >
                                {isResending === user.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <RefreshCw className="h-4 w-4" />
                                )}
                              </Button>
                            </>
                          ) : (
                            // Actions for regular users
                            <>
                              <Button variant="ghost" size="icon" onClick={() => handleViewUser(user)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Lock className="h-4 w-4" />
                              </Button>
                            </>
                          )}

                          {/* Delete/Revoke action */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => {
                              setSelectedUser(user)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="artists">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Products Created</TableHead>
                  <TableHead>Total Sales</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers
                  .filter((user) => user.role === "Artist")
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.productsCreated || 0}</TableCell>
                      <TableCell>{user.totalSales || "$0.00"}</TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(user.status === "Invited" ? "invited" : user.status.toLowerCase())}
                          variant="outline"
                        >
                          {user.status === "Invited" ? "Invited" : user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          {user.status === "Invited" ? (
                            // Actions for invited users
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCopyInviteLink(user.invitation.token)}
                                title="Copy invitation link"
                              >
                                {copiedToken === user.invitation.token ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleResendInvitation(user.id)}
                                disabled={isResending === user.id}
                                title="Resend invitation"
                              >
                                {isResending === user.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <RefreshCw className="h-4 w-4" />
                                )}
                              </Button>
                            </>
                          ) : (
                            // Actions for regular users
                            <>
                              <Button variant="ghost" size="icon" onClick={() => handleViewUser(user)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Lock className="h-4 w-4" />
                              </Button>
                            </>
                          )}

                          {/* Delete/Revoke action */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => {
                              setSelectedUser(user)
                              setIsDeleteDialogOpen(true)
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="customers">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers
                  .filter((user) => user.role === "Customer")
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.totalOrders || 0}</TableCell>
                      <TableCell>{user.totalSpent || "$0.00"}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status.toLowerCase())} variant="outline">
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleViewUser(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Lock className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => {
                            setSelectedUser(user)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="invited">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Invited By</TableHead>
                  <TableHead>Date Sent</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations
                  .filter((inv) => inv.status === "Pending")
                  .map((invitation) => {
                    const sentDate = formatDate(invitation.createdAt)
                    const expiresDate = formatDate(invitation.expiresAt)

                    return (
                      <TableRow key={invitation.id}>
                        <TableCell>{invitation.email}</TableCell>
                        <TableCell>{getRoleBadge(invitation.role)}</TableCell>
                        <TableCell>{invitation.invitedByName}</TableCell>
                        <TableCell>{sentDate}</TableCell>
                        <TableCell>{expiresDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleCopyInviteLink(invitation.token)}
                              title="Copy invitation link"
                            >
                              {copiedToken === invitation.token ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleResendInvitation(invitation.id)}
                              disabled={isResending === invitation.id}
                              title="Resend invitation"
                            >
                              {isResending === invitation.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <RefreshCw className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => {
                                setSelectedUser({
                                  id: invitation.id,
                                  email: invitation.email,
                                  status: "Invited",
                                  invitation,
                                })
                                setIsDeleteDialogOpen(true)
                              }}
                              title="Revoke invitation"
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {invitations.filter((inv) => inv.status === "Pending").length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No pending invitations found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* User Details Dialog */}
      <Dialog open={isViewUserOpen} onOpenChange={setIsViewUserOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle>User Details</DialogTitle>
                <DialogDescription>Detailed information about {selectedUser.name}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Account Information</h3>
                  <Badge className={getStatusColor(selectedUser.status.toLowerCase())} variant="outline">
                    {selectedUser.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedUser.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <div className="flex items-center">
                      <p className="font-medium">{selectedUser.email}</p>
                      {selectedUser.verifiedEmail ? (
                        <Check className="ml-2 h-4 w-4 text-green-500" />
                      ) : (
                        <X className="ml-2 h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="font-medium">{getRoleBadge(selectedUser.role)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Join Date</p>
                    <p className="font-medium">{formatDate(selectedUser.joinDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Login</p>
                    <p className="font-medium">{selectedUser.lastLogin}</p>
                  </div>
                </div>

                {selectedUser.role === "Customer" && (
                  <>
                    <div className="mt-4">
                      <h3 className="text-lg font-medium">Customer Information</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        <div>
                          <p className="text-sm text-muted-foreground">Total Orders</p>
                          <p className="font-medium">{selectedUser.totalOrders || 0}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <div>
                          <p className="text-sm text-muted-foreground">Total Spent</p>
                          <p className="font-medium">{selectedUser.totalSpent || "$0.00"}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedUser.role === "Artist" && (
                  <>
                    <div className="mt-4">
                      <h3 className="text-lg font-medium">Artist Information</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Package className="mr-2 h-4 w-4" />
                        <div>
                          <p className="text-sm text-muted-foreground">Products Created</p>
                          <p className="font-medium">{selectedUser.productsCreated || 0}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <div>
                          <p className="text-sm text-muted-foreground">Total Sales</p>
                          <p className="font-medium">{selectedUser.totalSales || "$0.00"}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewUserOpen(false)}>
                  Close
                </Button>
                <Button>Edit User</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete/Revoke Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedUser?.status === "Invited" ? "Revoke Invitation" : "Delete User"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedUser?.status === "Invited"
                ? `Are you sure you want to revoke the invitation sent to ${selectedUser?.email}?`
                : `Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedUser && handleDeleteUser(selectedUser)}
              className="bg-destructive text-destructive-foreground"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {selectedUser?.status === "Invited" ? "Revoking..." : "Deleting..."}
                </>
              ) : selectedUser?.status === "Invited" ? (
                "Revoke"
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

