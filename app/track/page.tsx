"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useOrderStore } from "@/lib/order-store"
import { RetailLayout } from "@/components/layouts/retail-layout"
import { ShippingTracker } from "@/components/shipping-tracker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Package, Search } from "lucide-react"

export default function TrackOrderPage() {
  const searchParams = useSearchParams()
  const { orders } = useOrderStore()
  const [orderNumber, setOrderNumber] = useState(searchParams.get("order") || "")
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get("tracking") || "")
  const [searchSubmitted, setSearchSubmitted] = useState(!!searchParams.get("order") || !!searchParams.get("tracking"))

  // Find order by order number or tracking number
  const foundOrder = searchSubmitted
    ? orders.find(
        (order) =>
          (orderNumber && order.id.toLowerCase() === orderNumber.toLowerCase()) ||
          (trackingNumber && order.tracking_number?.toLowerCase() === trackingNumber.toLowerCase()),
      )
    : null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchSubmitted(true)
  }

  return (
    <RetailLayout>
      <div className="container px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-wider mb-2">Track Your Order</h1>
            <p className="text-muted-foreground">
              Enter your order number or tracking number to check the status of your shipment
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Tracking</CardTitle>
              <CardDescription>
                Track the status of your order with your order number or tracking number
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="order-number" className="text-sm font-medium">
                      Order Number
                    </label>
                    <Input
                      id="order-number"
                      placeholder="e.g. ORD-001"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="tracking-number" className="text-sm font-medium">
                      Tracking Number
                    </label>
                    <Input
                      id="tracking-number"
                      placeholder="e.g. TRK123456789"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={!orderNumber && !trackingNumber} className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Track Order
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {searchSubmitted && (
            <>
              {foundOrder ? (
                <div className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium mb-1">Order Information</h3>
                        <p className="text-sm">Order Number: {foundOrder.id}</p>
                        <p className="text-sm">Date: {foundOrder.created_at}</p>
                        <p className="text-sm">Items: {foundOrder.items.length}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-1">Shipping Address</h3>
                        <p className="text-sm">{foundOrder.shipping_address.name}</p>
                        <p className="text-sm">
                          {foundOrder.shipping_address.city}, {foundOrder.shipping_address.state}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <ShippingTracker order={foundOrder} />

                  <div className="bg-muted/30 p-4 rounded-sm">
                    <h3 className="text-sm font-medium mb-2">Order Summary</h3>
                    <div className="space-y-3">
                      {foundOrder.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-muted rounded-sm flex items-center justify-center">
                              {item.image ? (
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-sm"
                                />
                              ) : (
                                <Package className="h-6 w-6 text-muted-foreground" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.options} • Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto" />
                  <h2 className="text-xl font-bold">Order Not Found</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We couldn't find an order with the provided information. Please check your order number or tracking
                    number and try again.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchSubmitted(false)
                      setOrderNumber("")
                      setTrackingNumber("")
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </RetailLayout>
  )
}

