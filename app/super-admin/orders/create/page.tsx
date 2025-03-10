"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
  useOrderStore,
  type Order,
  type OrderStatus,
  type PaymentStatus,
  type PaymentMethod,
  type ShippingMethod,
} from "@/lib/order-store"
import { useProductStore } from "@/lib/store"
import { ArrowLeft, Plus, Trash } from "lucide-react"

export default function CreateOrderPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addOrder, orders } = useOrderStore()
  const { getActiveProducts } = useProductStore()
  const products = getActiveProducts()

  // Customer information
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")

  // Shipping information
  const [shippingName, setShippingName] = useState("")
  const [shippingAddress1, setShippingAddress1] = useState("")
  const [shippingAddress2, setShippingAddress2] = useState("")
  const [shippingCity, setShippingCity] = useState("")
  const [shippingState, setShippingState] = useState("")
  const [shippingPostalCode, setShippingPostalCode] = useState("")
  const [shippingCountry, setShippingCountry] = useState("United States")
  const [shippingPhone, setShippingPhone] = useState("")

  // Billing information
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [billingName, setBillingName] = useState("")
  const [billingAddress1, setBillingAddress1] = useState("")
  const [billingAddress2, setBillingAddress2] = useState("")
  const [billingCity, setBillingCity] = useState("")
  const [billingState, setBillingState] = useState("")
  const [billingPostalCode, setBillingPostalCode] = useState("")
  const [billingCountry, setBillingCountry] = useState("United States")
  const [billingPhone, setBillingPhone] = useState("")

  // Order information
  const [orderItems, setOrderItems] = useState<
    Array<{
      product_id: string
      name: string
      sku: string
      price: number
      quantity: number
      options?: string
      image?: string
    }>
  >([])
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card")
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("pending")
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("pending")
  const [notes, setNotes] = useState("")
  const [trackingNumber, setTrackingNumber] = useState("")

  // Add item to order
  const [selectedProduct, setSelectedProduct] = useState("")
  const [quantity, setQuantity] = useState(1)

  const addItemToOrder = () => {
    if (!selectedProduct) {
      toast({
        title: "Error",
        description: "Please select a product to add",
        variant: "destructive",
      })
      return
    }

    const product = products.find((p) => p.id === selectedProduct)
    if (!product) return

    const newItem = {
      product_id: product.id,
      name: product.name,
      sku: product.sku,
      price: product.salePrice || product.price,
      quantity,
      options: `${product.colors[0]} / ${product.sizes[0]}`,
      image: product.images[0],
    }

    setOrderItems([...orderItems, newItem])
    setSelectedProduct("")
    setQuantity(1)

    toast({
      title: "Item added",
      description: `${product.name} has been added to the order`,
    })
  }

  const removeItem = (index: number) => {
    const newItems = [...orderItems]
    newItems.splice(index, 1)
    setOrderItems(newItems)
  }

  // Calculate totals
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingCost = shippingMethod === "standard" ? 5.99 : shippingMethod === "express" ? 12.99 : 0
  const taxRate = 0.08 // 8% tax rate
  const tax = subtotal * taxRate
  const total = subtotal + shippingCost + tax

  const handleCreateOrder = () => {
    // Validate required fields
    if (
      !customerName ||
      !customerEmail ||
      !shippingAddress1 ||
      !shippingCity ||
      !shippingState ||
      !shippingPostalCode
    ) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (orderItems.length === 0) {
      toast({
        title: "No items",
        description: "Please add at least one item to the order",
        variant: "destructive",
      })
      return
    }

    // Create billing address based on shipping if same
    const billingAddress = sameAsShipping
      ? {
          name: shippingName,
          address1: shippingAddress1,
          address2: shippingAddress2,
          city: shippingCity,
          state: shippingState,
          postalCode: shippingPostalCode,
          country: shippingCountry,
          phone: shippingPhone,
        }
      : {
          name: billingName,
          address1: billingAddress1,
          address2: billingAddress2,
          city: billingCity,
          state: billingState,
          postalCode: billingPostalCode,
          country: billingCountry,
          phone: billingPhone,
        }

    // Generate a new order ID
    const lastOrderId = orders.length > 0 ? Number.parseInt(orders[0].id.replace("ORD-", "")) : 0
    const newOrderId = `ORD-${String(lastOrderId + 1).padStart(3, "0")}`

    // Create the new order
    const newOrder: Order = {
      id: newOrderId,
      customer: {
        id: `CUST-${Math.floor(Math.random() * 1000)}`,
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
      },
      items: orderItems.map((item, index) => ({
        id: `ITEM-${newOrderId}-${index + 1}`,
        ...item,
      })),
      billing_address: billingAddress,
      shipping_address: {
        name: shippingName,
        address1: shippingAddress1,
        address2: shippingAddress2,
        city: shippingCity,
        state: shippingState,
        postalCode: shippingPostalCode,
        country: shippingCountry,
        phone: shippingPhone,
      },
      subtotal,
      shipping_cost: shippingCost,
      tax,
      total,
      status: orderStatus,
      payment_status: paymentStatus,
      payment_method: paymentMethod,
      shipping_method: shippingMethod,
      tracking_number: trackingNumber,
      notes,
      created_at: new Date().toISOString().split("T")[0],
      updated_at: new Date().toISOString().split("T")[0],
    }

    // Add the order to the store
    addOrder(newOrder)

    toast({
      title: "Order created",
      description: `Order ${newOrderId} has been created successfully`,
    })

    // Redirect to the orders page
    router.push("/super-admin/orders")
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => router.push("/super-admin/orders")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <h2 className="text-3xl font-bold tracking-tight ml-4">Create New Order</h2>
        </div>
      </div>

      <Tabs defaultValue="items" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="items">Order Items</TabsTrigger>
          <TabsTrigger value="customer">Customer Info</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>Add products to this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="product">Product</Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                    <SelectTrigger id="product">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - ${(product.salePrice || product.price).toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-24">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={addItemToOrder}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium">Product</th>
                      <th className="px-4 py-3 text-left font-medium">SKU</th>
                      <th className="px-4 py-3 text-left font-medium">Price</th>
                      <th className="px-4 py-3 text-left font-medium">Quantity</th>
                      <th className="px-4 py-3 text-right font-medium">Total</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                          No items added to this order yet. Add some products above.
                        </td>
                      </tr>
                    ) : (
                      orderItems.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.options}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">{item.sku}</td>
                          <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                          <td className="px-4 py-3">{item.quantity}</td>
                          <td className="px-4 py-3 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="sm" onClick={() => removeItem(index)}>
                              <Trash className="h-4 w-4 text-destructive" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="border-b">
                      <td colSpan={4} className="px-4 py-3 text-right font-medium">
                        Subtotal
                      </td>
                      <td className="px-4 py-3 text-right">${subtotal.toFixed(2)}</td>
                      <td></td>
                    </tr>
                    <tr className="border-b">
                      <td colSpan={4} className="px-4 py-3 text-right font-medium">
                        Shipping
                      </td>
                      <td className="px-4 py-3 text-right">${shippingCost.toFixed(2)}</td>
                      <td></td>
                    </tr>
                    <tr className="border-b">
                      <td colSpan={4} className="px-4 py-3 text-right font-medium">
                        Tax (8%)
                      </td>
                      <td className="px-4 py-3 text-right">${tax.toFixed(2)}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="px-4 py-3 text-right font-medium">
                        Total
                      </td>
                      <td className="px-4 py-3 text-right font-bold">${total.toFixed(2)}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Enter customer details for this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Full Name</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email Address</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Phone Number</Label>
                <Input id="customerPhone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Enter shipping details for this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shippingName">Full Name</Label>
                <Input
                  id="shippingName"
                  value={shippingName}
                  onChange={(e) => setShippingName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shippingAddress1">Address Line 1</Label>
                <Input
                  id="shippingAddress1"
                  value={shippingAddress1}
                  onChange={(e) => setShippingAddress1(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shippingAddress2">Address Line 2 (Optional)</Label>
                <Input
                  id="shippingAddress2"
                  value={shippingAddress2}
                  onChange={(e) => setShippingAddress2(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingCity">City</Label>
                  <Input
                    id="shippingCity"
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shippingState">State/Province</Label>
                  <Input
                    id="shippingState"
                    value={shippingState}
                    onChange={(e) => setShippingState(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shippingPostalCode">Postal Code</Label>
                  <Input
                    id="shippingPostalCode"
                    value={shippingPostalCode}
                    onChange={(e) => setShippingPostalCode(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingCountry">Country</Label>
                  <Input
                    id="shippingCountry"
                    value={shippingCountry}
                    onChange={(e) => setShippingCountry(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shippingPhone">Phone Number</Label>
                  <Input
                    id="shippingPhone"
                    value={shippingPhone}
                    onChange={(e) => setShippingPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shippingMethod">Shipping Method</Label>
                <Select value={shippingMethod} onValueChange={(value) => setShippingMethod(value as ShippingMethod)}>
                  <SelectTrigger id="shippingMethod">
                    <SelectValue placeholder="Select shipping method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Shipping ($5.99)</SelectItem>
                    <SelectItem value="express">Express Shipping ($12.99)</SelectItem>
                    <SelectItem value="overnight">Overnight Shipping ($19.99)</SelectItem>
                    <SelectItem value="local_pickup">Local Pickup (Free)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="trackingNumber">Tracking Number (Optional)</Label>
                <Input id="trackingNumber" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Enter billing details for this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="sameAsShipping"
                  checked={sameAsShipping}
                  onChange={(e) => setSameAsShipping(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="sameAsShipping">Same as shipping address</Label>
              </div>

              {!sameAsShipping && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="billingName">Full Name</Label>
                    <Input
                      id="billingName"
                      value={billingName}
                      onChange={(e) => setBillingName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingAddress1">Address Line 1</Label>
                    <Input
                      id="billingAddress1"
                      value={billingAddress1}
                      onChange={(e) => setBillingAddress1(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingAddress2">Address Line 2 (Optional)</Label>
                    <Input
                      id="billingAddress2"
                      value={billingAddress2}
                      onChange={(e) => setBillingAddress2(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="billingCity">City</Label>
                      <Input
                        id="billingCity"
                        value={billingCity}
                        onChange={(e) => setBillingCity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingState">State/Province</Label>
                      <Input
                        id="billingState"
                        value={billingState}
                        onChange={(e) => setBillingState(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingPostalCode">Postal Code</Label>
                      <Input
                        id="billingPostalCode"
                        value={billingPostalCode}
                        onChange={(e) => setBillingPostalCode(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="billingCountry">Country</Label>
                      <Input
                        id="billingCountry"
                        value={billingCountry}
                        onChange={(e) => setBillingCountry(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billingPhone">Phone Number</Label>
                      <Input
                        id="billingPhone"
                        value={billingPhone}
                        onChange={(e) => setBillingPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Enter payment details for this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cash_on_delivery">Cash on Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <Select value={paymentStatus} onValueChange={(value) => setPaymentStatus(value as PaymentStatus)}>
                  <SelectTrigger id="paymentStatus">
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Notes</CardTitle>
              <CardDescription>Add any additional notes for this order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orderStatus">Order Status</Label>
                <Select value={orderStatus} onValueChange={(value) => setOrderStatus(value as OrderStatus)}>
                  <SelectTrigger id="orderStatus">
                    <SelectValue placeholder="Select order status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Admin Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about this order (only visible to staff)"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={() => router.push("/super-admin/orders")}>
          Cancel
        </Button>
        <Button onClick={handleCreateOrder}>Create Order</Button>
      </div>
    </div>
  )
}

