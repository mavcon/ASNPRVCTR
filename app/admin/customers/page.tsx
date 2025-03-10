import { Suspense } from "react"
import { CustomersList } from "@/components/customers/customers-list"
import { CustomerListSkeleton } from "@/components/customers/customer-list-skeleton"
import { PageHeader } from "@/components/page-header"

export const metadata = {
  title: "Customers",
  description: "Manage your customers",
}

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Customers" description="View and manage your customers." />
      <Suspense fallback={<CustomerListSkeleton />}>
        <CustomersList />
      </Suspense>
    </div>
  )
}

