"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useOrderStore } from "@/lib/order-store"
import { ArrowLeft } from "lucide-react"

export default function EditOrderPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { getOrder, updateOrder } = useOrderStore()
  const [order, setOrder] = useState(getOrder(params.id))

  useEffect(() => {
    if (!order) {
      toast({
        title: "Order not found",
        description: "The order you're trying to edit doesn't exist.",
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
          <h2 className="text-3xl font-bold tracking-tight ml-4">Edit Order {order.id}</h2>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Order</CardTitle>
          <CardDescription>
            For security and data integrity reasons, we recommend using the order details view to make specific changes
            to orders rather than editing the entire order.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            To edit specific aspects of this order, please return to the orders list and use the "View Details" option.
          </p>
          <div className="flex justify-end">
            <Button onClick={() => router.push("/super-admin/orders")}>Return to Orders</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

