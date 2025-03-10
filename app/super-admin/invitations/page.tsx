"use client"

import { InvitationForm } from "@/components/super-admin/invitation-form"
import { InvitationManagement } from "@/components/super-admin/invitation-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { HomeIcon } from "lucide-react"
import { useState, useEffect } from "react"

export default function InvitationsPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Show a simple loading state during server-side rendering
  if (!isMounted) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="h-8 w-64 bg-muted animate-pulse rounded"></div>
        <div className="h-12 w-full bg-muted animate-pulse rounded"></div>
        <div className="h-64 w-full bg-muted animate-pulse rounded"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/super-admin">
              <HomeIcon className="mr-2 h-4 w-4" />
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Invitations</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User Invitations</h2>
        <p className="text-muted-foreground">Invite new users to join the platform and manage existing invitations.</p>
      </div>

      <Tabs defaultValue="manage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="manage">Manage Invitations</TabsTrigger>
          <TabsTrigger value="invite">Invite New User</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-4">
          <InvitationManagement />
        </TabsContent>

        <TabsContent value="invite" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InvitationForm />
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium mb-2">About User Roles</h3>
                <ul className="space-y-2">
                  <li>
                    <strong>Artist:</strong> Can upload and manage their own products, view sales data, and manage their
                    profile.
                  </li>
                  <li>
                    <strong>Admin:</strong> Can manage products, orders, and customer accounts. Cannot access system
                    settings or invite users.
                  </li>
                  <li>
                    <strong>Super Admin:</strong> Has full access to all platform features, including system settings,
                    user management, and invitations.
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium mb-2">Invitation Process</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Fill out the invitation form with the recipient's email and select their role.</li>
                  <li>Add an optional personal message to customize the invitation email.</li>
                  <li>The recipient will receive an email with a link to accept the invitation.</li>
                  <li>Upon acceptance, they'll be directed to complete their registration.</li>
                  <li>Invitations expire after 7 days but can be resent if needed.</li>
                </ol>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

