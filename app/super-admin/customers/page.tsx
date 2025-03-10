import { Suspense } from "react"
import { CustomersList } from "@/components/customers/customers-list"
import { CustomerListSkeleton } from "@/components/customers/customer-list-skeleton"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "Customers | Super Admin",
  description: "Manage all customers across the platform",
}

export default function SuperAdminCustomersPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Customers" description="View and manage all customers across the platform." />
      <Suspense fallback={<CustomerListSkeleton />}>
        <CustomersList isGlobal={true} />
      </Suspense>
    </div>
  )
}

