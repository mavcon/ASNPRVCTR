import { CustomerListSkeleton } from "@/components/customers/customer-list-skeleton"
import { PageHeader } from "@/components/page-header"

export default function CustomersLoading() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Customers" description="View and manage all customers across the platform." />
      <CustomerListSkeleton />
    </div>
  )
}

