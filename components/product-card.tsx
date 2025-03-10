"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useCartStore } from "@/lib/cart-store"
import { WishlistButton } from "@/components/wishlist-button"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    salePrice?: number | null
    image?: string
    images?: string[]
    description: string
    [key: string]: any
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [imageError, setImageError] = useState(false)
  const { toast } = useToast()
  const addItem = useCartStore((state) => state.addItem)

  // Get the first image or use a placeholder
  const productImage = product.images?.[0] || product.image || "/placeholder.svg?height=300&width=300"

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAddingToCart(true)

    // Simulate a small delay for better UX
    setTimeout(() => {
      try {
        // Add the product to the cart
        addItem(product)

        // Show success toast
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add product to cart. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsAddingToCart(false)
      }
    }, 300)
  }

  const handleImageError = () => {
    setImageError(true)
    setIsImageLoading(false)
  }

  return (
    <Link href={`/product/${product.id}`} className="block h-full">
      <Card className="overflow-hidden h-full flex flex-col border-0 shadow-sm hover:shadow-md transition-shadow">
        <div className="aspect-square overflow-hidden relative">
          <div
            className={`absolute inset-0 bg-muted/20 flex items-center justify-center ${
              isImageLoading ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
          <Image
            src={imageError ? "/placeholder.svg?height=300&width=300" : productImage}
            alt={product.name}
            width={300}
            height={300}
            className={`h-full w-full object-cover ${isImageLoading ? "opacity-0" : "opacity-100"}`}
            onLoadingComplete={() => setIsImageLoading(false)}
            onError={handleImageError}
          />
          {product.salePrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</div>
          )}
          <div className="absolute top-2 right-2">
            <WishlistButton productId={product.id} />
          </div>
        </div>
        <CardContent className="p-3 flex-grow">
          <h3 className="line-clamp-1 text-sm font-medium">{product.name}</h3>
          <div className="mt-1">
            {product.salePrice ? (
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm">${product.salePrice.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground line-through">${product.price.toFixed(2)}</p>
              </div>
            ) : (
              <p className="font-bold text-sm">${product.price.toFixed(2)}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <Button className="w-full text-xs h-8" size="sm" onClick={handleAddToCart} disabled={isAddingToCart}>
            <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

