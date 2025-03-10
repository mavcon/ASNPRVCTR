import type React from "react"
import { AdminNav } from "@/components/admin-nav"
import { SidebarLayout } from "@/components/layouts/sidebar-layout"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarLayout sidebarContent={<AdminNav className="p-4" />}>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">{children}</div>
    </SidebarLayout>
  )
}

