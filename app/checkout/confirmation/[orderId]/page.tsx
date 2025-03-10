"use client"

import { useEffect, useState } from "react"
import { RetailLayout } from "@/components/layouts/retail-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Check, Truck, Package } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ShippingTracker } from "@/components/shipping-tracker"

// This would come from your order store in a real application
interface OrderItem {
  name: string
  price: number
  quantity: number
  color: string
  size: string
  image: string
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: string
  paymentStatus: string
  shippingMethod: string
  shippingCost: number
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zip: string
    country: string
  }
  billingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zip: string
    country: string
  }
  paymentMethod: string
  trackingNumber?: string
}

export default function OrderConfirmationPage() {
  const params = useParams()
  const orderId = params.orderId as string
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real application, you would fetch the order from your API
    // For now, we'll simulate it with a timeout
    const timeout = setTimeout(() => {
      setOrder({
        id: orderId,
        orderNumber: `ORD-${orderId.substring(0, 5).toUpperCase()}`,
        date: new Date().toISOString(),
        status: "processing",
        paymentStatus: "paid",
        shippingMethod: "standard",
        shippingCost: 5.99,
        items: [
          {
            name: "Premium T-Shirt",
            price: 29.99,
            quantity: 2,
            color: "Black",
            size: "M",
            image: "/placeholder.svg?height=80&width=80",
          },
          {
            name: "Wireless Headphones",
            price: 89.99,
            quantity: 1,
            color: "Silver",
            size: "",
            image: "/placeholder.svg?height=80&width=80",
          },
        ],
        subtotal: 149.97,
        tax: 12.0,
        total: 167.96,
        shippingAddress: {
          firstName: "John",
          lastName: "Doe",
          address: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345",
          country: "United States",
        },
        billingAddress: {
          firstName: "John",
          lastName: "Doe",
          address: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345",
          country: "United States",
        },
        paymentMethod: "Credit Card",
        trackingNumber: "TRK123456789",
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [orderId])

  if (loading) {
    return (
      <RetailLayout>
        <div className="container max-w-4xl px-4 py-12">
          <p className="text-center">Loading order details...</p>
        </div>
      </RetailLayout>
    )
  }

  if (!order) {
    return (
      <RetailLayout>
        <div className="container max-w-4xl px-4 py-12">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold tracking-wider">Order Not Found</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              We couldn't find the order you're looking for. Please check the order ID and try again.
            </p>
            <Link href="/account/orders">
              <Button>View Your Orders</Button>
            </Link>
          </div>
        </div>
      </RetailLayout>
    )
  }

  return (
    <RetailLayout>
      <div className="container max-w-4xl px-4 py-12">
        <div className="space-y-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-wider">Order Confirmed!</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Thank you for your order. We've received your payment and will process your order shortly.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">Order #{order.orderNumber}</h2>
                  <p className="text-muted-foreground">
                    Placed on {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link href={`/track?number=${order.trackingNumber}`}>
                    <Button variant="outline">Track Order</Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <p>
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Billing Address</h3>
                  <p>
                    {order.billingAddress.firstName} {order.billingAddress.lastName}
                  </p>
                  <p>{order.billingAddress.address}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}
                  </p>
                  <p>{order.billingAddress.country}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Payment Method</h3>
                  <p>{order.paymentMethod}</p>
                  <p className="text-green-600 font-medium mt-2">
                    {order.paymentStatus === "paid" ? "Paid" : "Payment Pending"}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-4">Order Status</h3>
                <div className="relative">
                  <div className="flex justify-between mb-2">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                        <Check className="h-5 w-5" />
                      </div>
                      <span className="text-sm mt-1">Confirmed</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === "processing" || order.status === "shipped" || order.status === "delivered" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                      >
                        <Package className="h-5 w-5" />
                      </div>
                      <span className="text-sm mt-1">Processing</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === "shipped" || order.status === "delivered" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                      >
                        <Truck className="h-5 w-5" />
                      </div>
                      <span className="text-sm mt-1">Shipped</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${order.status === "delivered" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                      >
                        <Check className="h-5 w-5" />
                      </div>
                      <span className="text-sm mt-1">Delivered</span>
                    </div>
                  </div>
                  <div className="absolute top-5 left-10 right-10 h-1 bg-muted">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width:
                          order.status === "confirmed"
                            ? "0%"
                            : order.status === "processing"
                              ? "33%"
                              : order.status === "shipped"
                                ? "66%"
                                : "100%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {order.trackingNumber && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Tracking Information</h3>
                  <ShippingTracker trackingNumber={order.trackingNumber} />
                </div>
              )}

              <Separator className="my-6" />

              <h3 className="font-semibold mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-muted rounded-sm mr-3 relative overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-1">
                          {item.quantity}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.color} {item.size && `/ ${item.size}`}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping ({order.shippingMethod})</span>
                  <span>${order.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalogue">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            <Link href="/account/orders">
              <Button>View All Orders</Button>
            </Link>
          </div>
        </div>
      </div>
    </RetailLayout>
  )
}

