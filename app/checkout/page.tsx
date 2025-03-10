"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/lib/cart-store"
import { useOrderStore } from "@/lib/order-store"
import { useUserStore } from "@/lib/user-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { PaymentForm } from "@/components/checkout/payment-form"
import { countries } from "@/lib/countries-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingBag, ChevronDown, ChevronUp, Zap } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useToast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart, calculateSubtotal } = useCartStore()
  const { createOrder } = useOrderStore()
  const { currentUser } = useUserStore()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false)
  const [selectedAddressId, setSelectedAddressId] = useState("")
  const [useExpressCheckout, setUseExpressCheckout] = useState(false)

  // Get user's addresses and default payment method
  const userAddresses = currentUser?.addresses || []
  const defaultAddress = userAddresses.find((addr) => addr.isDefault)
  const defaultPaymentMethod = currentUser?.paymentMethods?.find((pm) => pm.isDefault)

  // Pre-populate form with user data
  const [formData, setFormData] = useState({
    email: currentUser?.email || "",
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    address: defaultAddress?.address1 || "",
    city: defaultAddress?.city || "",
    state: defaultAddress?.state || "",
    postalCode: defaultAddress?.postalCode || "",
    country: defaultAddress?.country || "CA",
  })

  // When a user selects an address
  useEffect(() => {
    if (selectedAddressId) {
      const selectedAddress = userAddresses.find((addr) => addr.id === selectedAddressId)
      if (selectedAddress) {
        setFormData((prev) => ({
          ...prev,
          address: selectedAddress.address1,
          city: selectedAddress.city,
          state: selectedAddress.state,
          postalCode: selectedAddress.postalCode,
          country: selectedAddress.country,
        }))
      }
    }
  }, [selectedAddressId, userAddresses])

  const subtotal = calculateSubtotal() || 0
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleExpressCheckout = async () => {
    if (!defaultAddress || !defaultPaymentMethod) {
      toast({
        title: "Express checkout unavailable",
        description: "You need a default address and payment method for express checkout.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    try {
      // Create mock payment result
      const paymentResult = {
        success: true,
        transactionId: `txn-${Date.now()}`,
      }

      // Process the order with default information
      await handlePaymentComplete(paymentResult)
    } catch (error) {
      toast({
        title: "Express checkout failed",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  const handlePaymentComplete = async (result) => {
    if (result.success) {
      const selectedAddress = selectedAddressId
        ? userAddresses.find((addr) => addr.id === selectedAddressId)
        : defaultAddress

      const order = {
        id: `order-${Date.now()}`,
        customer: {
          id: currentUser?.id,
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        items,
        payment: {
          method: "card",
          transactionId: result.transactionId,
          lastFour: defaultPaymentMethod?.lastFour,
          subtotal,
          tax,
          shipping,
          total,
        },
        status: "pending",
        createdAt: new Date().toISOString(),
      }

      try {
        await createOrder(order)
        clearCart()
        router.push(`/checkout/confirmation/${order.id}`)
      } catch (error) {
        toast({
          title: "Error creating order",
          description: "There was a problem processing your order. Please try again.",
          variant: "destructive",
        })
        setIsProcessing(false)
      }
    } else {
      toast({
        title: "Payment failed",
        description: result.error || "There was a problem with your payment. Please try again.",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container max-w-lg py-12">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={() => router.push("/shop")}>Continue Shopping</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-4 md:py-8">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">Checkout</h1>

      {/* Express Checkout for logged-in users with saved payment */}
      {currentUser && defaultPaymentMethod && defaultAddress && (
        <Card className="mb-6">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <div>
                  <h3 className="font-medium">Express Checkout</h3>
                  <p className="text-sm text-muted-foreground">
                    Use your default address and {defaultPaymentMethod.cardType} ending in{" "}
                    {defaultPaymentMethod.lastFour}
                  </p>
                </div>
              </div>
              <Button onClick={handleExpressCheckout} disabled={isProcessing} className="w-full sm:w-auto">
                {isProcessing ? "Processing..." : "Pay Now"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mobile Order Summary Toggle */}
      <div className="md:hidden mb-4">
        <Collapsible open={orderSummaryOpen} onOpenChange={setOrderSummaryOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between">
              <span>Order Summary ({items.length} items)</span>
              <span className="flex items-center">
                ${total.toFixed(2)}
                {orderSummaryOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <Card>
              <CardContent className="py-4 space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-muted rounded-sm" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Shipping</p>
                    <p>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Tax</p>
                    <p>${tax.toFixed(2)}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold">
                  <p>Total</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="grid gap-4 md:gap-8 md:grid-cols-5">
        <div className="md:col-span-3 space-y-4 md:space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="(123) 456-7890"
                    autoComplete="tel"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userAddresses.length > 0 && (
                <>
                  <div className="space-y-3">
                    <Label>Select a saved address</Label>
                    <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId} className="space-y-3">
                      {userAddresses.map((address) => (
                        <div key={address.id} className="flex items-start space-x-2">
                          <RadioGroupItem value={address.id} id={`address-${address.id}`} className="mt-1" />
                          <Label htmlFor={`address-${address.id}`} className="font-normal cursor-pointer flex-1">
                            <div className="text-sm font-medium">
                              {address.firstName} {address.lastName}
                              {address.isDefault && (
                                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {address.address1}, {address.city}, {address.state} {address.postalCode}
                            </div>
                          </Label>
                        </div>
                      ))}
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="new" id="address-new" className="mt-1" />
                        <Label htmlFor="address-new" className="font-normal cursor-pointer">
                          Use a new address
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />
                </>
              )}

              {(selectedAddressId === "new" || userAddresses.length === 0) && (
                <form className="space-y-4" autoComplete="on">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="123 Main St"
                      autoComplete="shipping address-line1"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="Toronto"
                        autoComplete="shipping address-level2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        placeholder="Ontario"
                        autoComplete="shipping address-level1"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        placeholder="M5V 2H1"
                        autoComplete="shipping postal-code"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => handleInputChange({ target: { name: "country", value } })}
                      >
                        <SelectTrigger id="country">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentForm
                total={total}
                currency="CAD"
                onPaymentComplete={handlePaymentComplete}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
                savedPaymentMethods={currentUser?.paymentMethods}
              />
            </CardContent>
          </Card>
        </div>

        {/* Desktop Order Summary */}
        <div className="hidden md:block md:col-span-2">
          <Card className="sticky top-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-muted rounded-sm" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Shipping</p>
                  <p>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Tax</p>
                  <p>${tax.toFixed(2)}</p>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>

              {shipping === 0 ? (
                <p className="text-xs text-green-600 text-center">Free shipping on orders over $50</p>
              ) : (
                <p className="text-xs text-muted-foreground text-center">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

