"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Edit, Trash2, MessageSquare } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

interface Review {
  id: string
  productId: string
  productName: string
  productImage: string
  rating: number
  title: string
  content: string
  date: Date
  helpful: number
  reply?: {
    content: string
    date: Date
    isAdmin: boolean
  }
}

export function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call to fetch reviews
    const timer = setTimeout(() => {
      const mockReviews: Review[] = [
        {
          id: "rev-1",
          productId: "prod-1",
          productName: "Minimalist Leather Backpack",
          productImage: "/placeholder.svg?height=80&width=80",
          rating: 5,
          title: "Excellent quality and design",
          content:
            "I've been using this backpack for a month now and I'm very impressed with the quality. The leather is soft yet durable, and the design is both functional and stylish. Highly recommend!",
          date: new Date(2023, 4, 20),
          helpful: 7,
          reply: {
            content:
              "Thank you for your kind review! We're so glad you're enjoying your backpack. The leather is sourced from a sustainable tannery and should last for many years.",
            date: new Date(2023, 4, 21),
            isAdmin: true,
          },
        },
        {
          id: "rev-2",
          productId: "prod-2",
          productName: "Organic Cotton T-Shirt",
          productImage: "/placeholder.svg?height=80&width=80",
          rating: 4,
          title: "Great shirt, runs a bit small",
          content:
            "The quality of this shirt is excellent and I love the organic cotton. My only issue is that it runs a bit small. I would recommend sizing up if you're between sizes.",
          date: new Date(2023, 3, 15),
          helpful: 3,
        },
        {
          id: "rev-3",
          productId: "prod-3",
          productName: "Handcrafted Ceramic Mug",
          productImage: "/placeholder.svg?height=80&width=80",
          rating: 3,
          title: "Beautiful but fragile",
          content:
            "The mug is beautiful and I love the design. However, it's quite fragile and the handle broke after just a few uses. I would still recommend it for display purposes or very gentle use.",
          date: new Date(2023, 2, 10),
          helpful: 5,
        },
      ]

      setReviews(mockReviews)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleDeleteReview = (id: string) => {
    // In a real app, this would be an API call
    setReviews((prev) => prev.filter((review) => review.id !== id))

    toast({
      title: "Review deleted",
      description: "Your review has been deleted successfully.",
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-amber-500 fill-amber-500" : "text-muted-foreground"}`} />
    ))
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Reviews</CardTitle>
          <CardDescription>Reviews you've written for products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 bg-muted rounded"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-muted rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                      <div className="h-4 bg-muted rounded w-full mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Reviews</CardTitle>
          <CardDescription>Reviews you've written for products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No reviews yet</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">You haven't written any product reviews yet.</p>
            <Button asChild>
              <Link href="/shop">Browse Products to Review</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Reviews</CardTitle>
        <CardDescription>Reviews you've written for products</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={`/product/${review.productId}`} className="shrink-0">
                    <Image
                      src={review.productImage || "/placeholder.svg"}
                      alt={review.productName}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                  </Link>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link href={`/product/${review.productId}`} className="font-medium hover:underline">
                          {review.productName}
                        </Link>
                        <div className="flex items-center mt-1 mb-2">
                          <div className="flex mr-2">{renderStars(review.rating)}</div>
                          <span className="text-xs text-muted-foreground">{format(review.date, "MMM d, yyyy")}</span>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/account/reviews/edit/${review.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteReview(review.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <h4 className="font-medium text-sm">{review.title}</h4>
                    <p className="text-sm mt-1">{review.content}</p>
                    <div className="flex items-center mt-2">
                      <Badge variant="outline" className="text-xs">
                        {review.helpful} {review.helpful === 1 ? "person" : "people"} found this helpful
                      </Badge>
                    </div>

                    {review.reply && (
                      <div className="mt-3 pl-3 border-l-2 border-muted">
                        <p className="text-xs font-medium">
                          {review.reply.isAdmin ? "ASNPRVCTR Response" : "Seller Response"} •{" "}
                          {format(review.reply.date, "MMM d, yyyy")}
                        </p>
                        <p className="text-sm mt-1">{review.reply.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

