import type React from "react"
import { SuperAdminLayout } from "@/components/layouts/super-admin-layout"

export default function SuperAdminCustomersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SuperAdminLayout>{children}</SuperAdminLayout>
}

