import type React from "react"
import { SuperAdminNav } from "@/components/super-admin/super-admin-nav"
import { SidebarLayout } from "@/components/layouts/sidebar-layout"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarLayout sidebarContent={<SuperAdminNav className="p-4" />}>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">{children}</div>
    </SidebarLayout>
  )
}

