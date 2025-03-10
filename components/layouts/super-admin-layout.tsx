import type React from "react"
import { SuperAdminNav } from "@/components/super-admin/super-admin-nav"
import { SidebarLayout } from "@/components/layouts/sidebar-layout"

interface SuperAdminLayoutProps {
  children: React.ReactNode
}

export function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  return <SidebarLayout sidebarContent={<SuperAdminNav className="p-4" />}>{children}</SidebarLayout>
}

