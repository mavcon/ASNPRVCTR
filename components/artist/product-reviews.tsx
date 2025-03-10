"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ThumbsUp } from "lucide-react"

interface ProductReviewsProps {
  productId: string
}

interface Review {
  id: string
  customerName: string
  customerAvatar: string
  customerInitials: string
  rating: number
  date: string
  title: string
  content: string
  helpful: number
  verified: boolean
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [filter, setFilter] = useState("all")

  // In a real app, you would fetch this data based on the product ID
  const reviews: Review[] = [
    {
      id: "1",
      customerName: "Sarah Johnson",
      customerAvatar: "",
      customerInitials: "SJ",
      rating: 5,
      date: "2025-02-15",
      title: "Absolutely stunning piece!",
      content:
        "This painting exceeded my expectations. The colors are vibrant and it looks even better in person than in the photos. It's become the focal point of my living room and I've received so many compliments on it. The artist's attention to detail is remarkable.",
      helpful: 12,
      verified: true,
    },
    {
      id: "2",
      customerName: "Michael Chen",
      customerAvatar: "",
      customerInitials: "MC",
      rating: 4,
      date: "2025-02-10",
      title: "Beautiful artwork, minor shipping issue",
      content:
        "The painting is beautiful and exactly as described. The colors are rich and the technique is impressive. I'm taking off one star only because the packaging was slightly damaged during shipping, but the artwork itself was thankfully unharmed. Would definitely buy from this artist again.",
      helpful: 8,
      verified: true,
    },
    {
      id: "3",
      customerName: "Emily Rodriguez",
      customerAvatar: "",
      customerInitials: "ER",
      rating: 5,
      date: "2025-02-05",
      title: "Perfect addition to my collection",
      content:
        "As an art collector, I'm very selective about the pieces I purchase. This artwork immediately caught my eye with its unique style and composition. The artist has a distinctive voice that comes through clearly. The craftsmanship is excellent and the piece arrived in perfect condition.",
      helpful: 15,
      verified: true,
    },
    {
      id: "4",
      customerName: "David Thompson",
      customerAvatar: "",
      customerInitials: "DT",
      rating: 3,
      date: "2025-01-28",
      title: "Nice but not quite what I expected",
      content:
        "The artwork is well-made and the quality is good, but the colors appear different in person than they did online. It's still a nice piece, but doesn't match my space as well as I had hoped. Consider updating the product photos to more accurately reflect the true colors.",
      helpful: 6,
      verified: true,
    },
    {
      id: "5",
      customerName: "Jessica Kim",
      customerAvatar: "",
      customerInitials: "JK",
      rating: 5,
      date: "2025-01-20",
      title: "Exceeded all expectations",
      content:
        "I'm absolutely in love with this piece! The texture and dimension don't fully translate in photos - it's so much more impressive in person. The artist clearly puts a lot of care and skill into their work. Shipping was fast and the packaging was secure. Couldn't be happier with my purchase.",
      helpful: 19,
      verified: true,
    },
  ]

  const filteredReviews = reviews.filter((review) => {
    if (filter === "all") return true
    if (filter === "positive" && review.rating >= 4) return true
    if (filter === "negative" && review.rating < 4) return true
    return false
  })

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
      ))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(Math.round(averageRating))}</div>
            <span className="font-bold">{averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviews.length} reviews)</span>
          </div>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter reviews" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reviews</SelectItem>
            <SelectItem value="positive">Positive (4-5 ★)</SelectItem>
            <SelectItem value="negative">Critical (1-3 ★)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <p className="text-center py-6 text-muted-foreground">No reviews match your filter criteria.</p>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.customerAvatar} alt={review.customerName} />
                    <AvatarFallback>{review.customerInitials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.customerName}</div>
                    <div className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  {review.verified && (
                    <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400">
                      Verified Purchase
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium">{review.title}</h4>
                <p className="mt-1 text-muted-foreground">{review.content}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  Helpful ({review.helpful})
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

