"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/lib/cart-store"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { RetailLayout } from "@/components/layouts/retail-layout"

export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQuantity, clearCart, totalItems, calculateSubtotal } = useCartStore()
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleRemoveItem = (id: string) => {
    removeItem(id)
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    setIsUpdating(true)
    setTimeout(() => {
      updateQuantity(id, quantity)
      setIsUpdating(false)
    }, 300)
  }

  const handleCheckout = () => {
    router.push("/checkout")
  }

  const subtotal = calculateSubtotal() || 0
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const cartContent = (
    <div className="container py-4 md:py-8">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={() => router.push("/shop")}>Continue Shopping</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Items ({totalItems()})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between py-2">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-muted rounded-md flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={isUpdating || item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <div className="h-8 px-3 flex items-center justify-center border-y border-input">
                          {item.quantity}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={isUpdating}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-destructive"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/shop")}>
                  Continue Shopping
                </Button>
                <Button variant="ghost" onClick={() => clearCart()}>
                  Clear Cart
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card className="sticky top-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    <p className="text-muted-foreground">Tax (8%)</p>
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
              <CardFooter>
                <Button className="w-full" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )

  return <RetailLayout>{cartContent}</RetailLayout>
}

