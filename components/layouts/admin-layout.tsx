import type React from "react"
import { AdminNav } from "@/components/admin-nav"
import { SidebarLayout } from "@/components/layouts/sidebar-layout"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return <SidebarLayout sidebarContent={<AdminNav className="p-4" />}>{children}</SidebarLayout>
}

