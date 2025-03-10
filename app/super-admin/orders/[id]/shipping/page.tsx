"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useOrderStore, type Order } from "@/lib/order-store"
import { ShippingManagement } from "@/components/super-admin/shipping-management"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ArrowLeft, Home, Package } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function OrderShippingPage() {
  const params = useParams()
  const router = useRouter()
  const { getOrder } = useOrderStore()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const foundOrder = getOrder(params.id as string)
      if (foundOrder) {
        setOrder(foundOrder)
      }
      setLoading(false)
    }
  }, [params.id, getOrder])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-[600px] w-full" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
        <Package className="h-16 w-16 text-muted-foreground" />
        <h1 className="text-xl font-bold">Order Not Found</h1>
        <p className="text-muted-foreground">The order you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/super-admin/orders")}>Back to Orders</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/super-admin">
                  <Home className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/super-admin/orders">Orders</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/super-admin/orders/${order.id}`}>{order.id}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Shipping</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-bold tracking-tight">Shipping Details for Order {order.id}</h1>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => router.push(`/super-admin/orders/${order.id}`)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Order
        </Button>
      </div>

      <ShippingManagement order={order} />
    </div>
  )
}

