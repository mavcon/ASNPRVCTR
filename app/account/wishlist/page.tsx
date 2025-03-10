"use client"

import { useState, useEffect } from "react"
import { useUserStore } from "@/lib/user-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Trash2, ShoppingCart, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

// Mock data for wishlist items
const mockWishlistItems = [
  {
    id: "1",
    name: "Abstract Painting",
    artist: "Jane Doe",
    price: 299.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Landscape Photography",
    artist: "John Smith",
    price: 199.99,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Ceramic Sculpture",
    artist: "Alex Johnson",
    price: 499.99,
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function WishlistPage() {
  const { toast } = useToast()
  const currentUser = useUserStore((state) => state.currentUser)
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch the user's wishlist items from an API
    // For now, we'll use mock data
    const fetchWishlist = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setWishlistItems(mockWishlistItems)
      } catch (error) {
        console.error("Error fetching wishlist:", error)
        toast({
          title: "Error",
          description: "Failed to load your wishlist. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWishlist()
  }, [toast])

  const removeFromWishlist = async (itemId) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update local state
      setWishlistItems(wishlistItems.filter((item) => item.id !== itemId))

      toast({
        title: "Item removed",
        description: "The item has been removed from your wishlist.",
      })
    } catch (error) {
      console.error("Error removing item:", error)
      toast({
        title: "Error",
        description: "Failed to remove the item. Please try again.",
        variant: "destructive",
      })
    }
  }

  const addToCart = async (itemId) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Added to cart",
        description: "The item has been added to your cart.",
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Error",
        description: "Failed to add the item to your cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Wishlist</h2>
        <p className="text-muted-foreground">Items you've saved for later.</p>
      </div>
      <Separator className="my-6" />

      {wishlistItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">Your wishlist is empty.</p>
          <Button asChild>
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-muted-foreground">by {item.artist}</p>
                <p className="mt-2 font-medium">${item.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeFromWishlist(item.id)}
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button onClick={() => addToCart(item.id)} aria-label="Add to cart">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

