"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Printer, Truck, ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useOrderStore, type Order, type OrderStatus, type PaymentStatus } from "@/lib/order-store"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ShippingTracker } from "@/components/shipping-tracker"

interface OrderDetailsProps {
  order: Order
  onClose: () => void
}

export function OrderDetails({ order, onClose }: OrderDetailsProps) {
  const router = useRouter()
  const { updateOrderStatus, updatePaymentStatus, updateTrackingNumber, updateOrder } = useOrderStore()
  const [status, setStatus] = useState<OrderStatus>(order.status as OrderStatus)
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(order.payment_status as PaymentStatus)
  const [trackingNumber, setTrackingNumber] = useState(order.tracking_number || "")
  const [notes, setNotes] = useState(order.notes || "")
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "processing":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "shipped":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "refunded":
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "refunded":
        return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20"
      case "failed":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const handleUpdateStatus = () => {
    setIsUpdating(true)

    // Update the order status
    updateOrderStatus(order.id, status)

    toast({
      title: "Status updated",
      description: `Order ${order.id} status has been updated to ${status}`,
    })

    setIsUpdating(false)
  }

  const handleUpdatePaymentStatus = () => {
    setIsUpdating(true)

    // Update the payment status
    updatePaymentStatus(order.id, paymentStatus)

    toast({
      title: "Payment status updated",
      description: `Payment status has been updated to ${paymentStatus}`,
    })

    setIsUpdating(false)
  }

  const handleUpdateTracking = () => {
    setIsUpdating(true)

    // Update the tracking number
    updateTrackingNumber(order.id, trackingNumber)

    toast({
      title: "Tracking updated",
      description: `Tracking number has been updated for order ${order.id}`,
    })

    setIsUpdating(false)
  }

  const handleUpdateNotes = () => {
    setIsUpdating(true)

    // Update the order notes
    updateOrder(order.id, { notes })

    toast({
      title: "Notes updated",
      description: "Order notes have been saved successfully",
    })

    setIsUpdating(false)
  }

  const handlePrintOrder = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Order {order.id}</h3>
          <p className="text-sm text-muted-foreground">Placed on {order.created_at}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(status)} variant="outline">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          <Badge className={getPaymentStatusColor(paymentStatus)} variant="outline">
            {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
          </Badge>
          <Button variant="outline" size="sm" onClick={handlePrintOrder}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 pt-4">
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">Product</th>
                  <th className="px-4 py-3 text-left font-medium">SKU</th>
                  <th className="px-4 py-3 text-left font-medium">Price</th>
                  <th className="px-4 py-3 text-left font-medium">Quantity</th>
                  <th className="px-4 py-3 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-sm overflow-hidden bg-muted">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.options}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{item.sku}</td>
                    <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-b">
                  <td colSpan={4} className="px-4 py-3 text-right font-medium">
                    Subtotal
                  </td>
                  <td className="px-4 py-3 text-right">${order.subtotal.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td colSpan={4} className="px-4 py-3 text-right font-medium">
                    Shipping ({order.shipping_method.replace("_", " ")})
                  </td>
                  <td className="px-4 py-3 text-right">${order.shipping_cost.toFixed(2)}</td>
                </tr>
                <tr className="border-b">
                  <td colSpan={4} className="px-4 py-3 text-right font-medium">
                    Tax
                  </td>
                  <td className="px-4 py-3 text-right">${order.tax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-right font-medium">
                    Total
                  </td>
                  <td className="px-4 py-3 text-right font-bold">${order.total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="customer" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <p className="text-sm">{order.customer.name}</p>
                  <p className="text-sm">{order.customer.email}</p>
                  <p className="text-sm">{order.customer.phone}</p>
                  <p className="text-sm text-muted-foreground mt-1">Customer ID: {order.customer.id}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Customer Notes</h4>
                  <p className="text-sm text-muted-foreground">
                    {order.notes ? order.notes : "No notes from customer"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-6">
          <ShippingTracker order={order} />
          <div className="flex justify-end">
            <Button
              onClick={() => router.push(`/super-admin/orders/${order.id}/shipping`)}
              className="flex items-center gap-2"
            >
              <Truck className="h-4 w-4" />
              Manage Shipping
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 pt-4">
          {/* History content will go here */}
        </TabsContent>

        <TabsContent value="notes" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="admin-notes">Admin Notes</Label>
                <Textarea
                  id="admin-notes"
                  placeholder="Add notes about this order (only visible to staff)"
                  className="mt-2"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <Button className="mt-2" onClick={handleUpdateNotes}>
                  Save Notes
                </Button>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Note History</h4>
                <div className="text-sm text-muted-foreground">
                  {order.notes ? (
                    <div className="p-3 bg-muted/30 rounded-sm">
                      <p className="mb-1 text-xs text-muted-foreground">Last updated: {order.updated_at}</p>
                      <p>{order.notes}</p>
                    </div>
                  ) : (
                    "No notes have been added to this order yet."
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        <Button>
          <Truck className="mr-2 h-4 w-4" />
          Process Order
        </Button>
      </div>
    </div>
  )
}

