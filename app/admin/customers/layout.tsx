import type React from "react"
import { AdminLayout } from "@/components/layouts/admin-layout"

export default function CustomersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayout>{children}</AdminLayout>
}

