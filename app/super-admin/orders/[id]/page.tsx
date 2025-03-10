"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useOrderStore } from "@/lib/order-store"
import { ArrowLeft } from "lucide-react"
import { OrderDetails } from "@/components/super-admin/order-details"

export default function ViewOrderPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { getOrder } = useOrderStore()
  const order = getOrder(params.id)

  useEffect(() => {
    if (!order) {
      toast({
        title: "Order not found",
        description: "The order you're trying to view doesn't exist.",
        variant: "destructive",
      })
      router.push("/super-admin/orders")
    }
  }, [order, router, toast])

  if (!order) {
    return null
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => router.push("/super-admin/orders")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <h2 className="text-3xl font-bold tracking-tight ml-4">Order {order.id}</h2>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <OrderDetails order={order} onClose={() => router.push("/super-admin/orders")} />
        </CardContent>
      </Card>
    </div>
  )
}

