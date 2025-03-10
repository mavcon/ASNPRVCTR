"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { RetailLayout } from "@/components/layouts/retail-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface OrderItem {
  id: string
  productId: string
  name: string
  image: string
}

export default function CreateReviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order")
  const productId = searchParams.get("product")

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<OrderItem | null>(null)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call to fetch order items
    const timer = setTimeout(() => {
      if (orderId) {
        // Mock order items
        const mockOrderItems: OrderItem[] = [
          {
            id: "item-1",
            productId: "prod-1",
            name: "Minimalist Leather Backpack",
            image: "/placeholder.svg?height=80&width=80",
          },
          {
            id: "item-2",
            productId: "prod-2",
            name: "Organic Cotton T-Shirt",
            image: "/placeholder.svg?height=80&width=80",
          },
        ]

        setOrderItems(mockOrderItems)

        // If product ID is specified, select that product
        if (productId) {
          const product = mockOrderItems.find((item) => item.productId === productId) || null
          setSelectedProduct(product)
        }
      } else if (productId) {
        // Mock product data if only product ID is provided
        const mockProduct: OrderItem = {
          id: "item-direct",
          productId: productId,
          name: "Product Name",
          image: "/placeholder.svg?height=80&width=80",
        }

        setSelectedProduct(mockProduct)
      }

      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [orderId, productId])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedProduct) return

    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const reviewData = {
      productId: selectedProduct.productId,
      rating,
      title: formData.get("title") as string,
      content: formData.get("content") as string,
    }

    // In a real app, this would be an API call
    console.log("Submitting review:", reviewData)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)

      toast({
        title: "Review submitted",
        description: "Thank you for your feedback! Your review has been submitted successfully.",
      })

      // Redirect back to orders or product page
      if (orderId) {
        router.push(`/account/orders/${orderId}`)
      } else {
        router.push(`/product/${selectedProduct.productId}`)
      }
    }, 1500)
  }

  if (isLoading) {
    return (
      <RetailLayout>
        <div className="container py-8 max-w-2xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-6 bg-muted rounded w-1/3"></div>
            <Card>
              <CardContent className="p-6">
                <div className="h-6 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </RetailLayout>
    )
  }

  return (
    <RetailLayout>
      <div className="container py-8 max-w-2xl">
        <div className="mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Write a Review</h1>
          <p className="text-muted-foreground">Share your experience with this product</p>
        </div>

        {orderItems.length > 0 && !selectedProduct && (
          <Card>
            <CardHeader>
              <CardTitle>Select a Product to Review</CardTitle>
              <CardDescription>Choose which product from your order you'd like to review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedProduct(item)}
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="w-15 h-15 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedProduct && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  width={60}
                  height={60}
                  className="w-15 h-15 object-cover rounded-md"
                />
                <div>
                  <CardTitle>{selectedProduct.name}</CardTitle>
                  <CardDescription>Share your thoughts about this product</CardDescription>
                </div>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <Star
                          className={`h-8 w-8 ${
                            (hoverRating || rating) >= star ? "text-amber-500 fill-amber-500" : "text-muted-foreground"
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating === 0 && <p className="text-sm text-destructive">Please select a rating</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Review Title</Label>
                  <Input id="title" name="title" placeholder="Summarize your experience" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Review</Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="What did you like or dislike about this product?"
                    rows={5}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting || rating === 0} className="w-full sm:w-auto">
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
      </div>
    </RetailLayout>
  )
}

