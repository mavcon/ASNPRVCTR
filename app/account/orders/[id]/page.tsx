"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package, Truck, CheckCircle, Clock, AlertTriangle, Download } from "lucide-react"

// Mock order data - would be replaced with API call
const mockOrderDetails = {
  id: "ORD-123456",
  date: "November 15, 2023",
  status: "Delivered",
  total: 245.5,
  subtotal: 220.0,
  tax: 15.5,
  shipping: 10.0,
  paymentMethod: "Visa ending in 4242",
  shippingAddress: {
    name: "John Doe",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
  },
  items: [
    {
      id: "1",
      name: "Black Abstract Print",
      price: 120.0,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Urban Landscape Series",
      price: 100.0,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
  timeline: [
    {
      status: "Order Placed",
      date: "November 15, 2023 - 10:30 AM",
      description: "Your order has been received and is being processed.",
    },
    {
      status: "Payment Confirmed",
      date: "November 15, 2023 - 10:35 AM",
      description: "Payment has been successfully processed.",
    },
    {
      status: "Shipped",
      date: "November 16, 2023 - 2:15 PM",
      description: "Your order has been shipped via USPS.",
    },
    {
      status: "Delivered",
      date: "November 18, 2023 - 11:20 AM",
      description: "Your order has been delivered.",
    },
  ],
}

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id as string
  const [order, setOrder] = useState<typeof mockOrderDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Simulate API call
  useEffect(() => {
    const fetchOrder = async () => {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setOrder(mockOrderDetails)
      setIsLoading(false)
    }

    fetchOrder()
  }, [orderId])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted animate-pulse rounded-md"></div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-[200px] bg-muted animate-pulse rounded-md"></div>
          <div className="h-[200px] bg-muted animate-pulse rounded-md"></div>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Order not found</h3>
          <p className="text-muted-foreground mb-6">We couldn't find the order you're looking for.</p>
          <Button asChild>
            <Link href="/account/orders">Back to Orders</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "Shipped":
        return <Truck className="h-5 w-5 text-blue-500" />
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "Cancelled":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Package className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processing":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
            {status}
          </Badge>
        )
      case "Shipped":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50 dark:bg-blue-950/20">
            {status}
          </Badge>
        )
      case "Delivered":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50 dark:bg-green-950/20">
            {status}
          </Badge>
        )
      case "Cancelled":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 dark:bg-red-950/20">
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/account/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Order {order.id}</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Order Status</CardTitle>
                  <CardDescription>Placed on {order.date}</CardDescription>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(order.status)}
                  <span className="ml-2">{getStatusBadge(order.status)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-muted pl-6 pb-2 space-y-8">
                {order.timeline.map((event, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[31px] p-1 bg-background border-2 border-muted rounded-full">
                      {index === order.timeline.length - 1 ? (
                        <div className="w-3 h-3 bg-primary rounded-full" />
                      ) : (
                        <div className="w-3 h-3 bg-muted rounded-full" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{event.status}</h4>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                      <p className="text-sm mt-1">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="relative h-16 w-16 rounded overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
              <Button variant="outline" size="sm">
                Buy Again
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p>${order.subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p>${order.shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Tax</p>
                  <p>${order.tax.toFixed(2)}</p>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <p>Total</p>
                  <p>${order.total.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{order.paymentMethod}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/returns">Return Items</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

