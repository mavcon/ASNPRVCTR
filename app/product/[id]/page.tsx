"use client"

import { useState } from "react"
import { RetailLayout } from "@/components/layouts/retail-layout"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Share2, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react"
import { useProductStore } from "@/lib/store"
import { useCartStore } from "@/lib/cart-store"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

// Sample product data
const product = {
  id: "1",
  name: "Premium T-Shirt",
  price: 29.99,
  salePrice: 24.99,
  description:
    "High-quality cotton t-shirt with a modern fit. This premium t-shirt is made from 100% organic cotton, providing exceptional comfort and durability. The modern fit ensures a stylish look while maintaining comfort for all-day wear.",
  features: [
    "100% organic cotton",
    "Modern fit",
    "Pre-shrunk fabric",
    "Reinforced stitching",
    "Available in multiple colors",
  ],
  rating: 4.5,
  reviews: 128,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  colors: ["Black", "White", "Navy", "Gray"],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const getProduct = useProductStore((state) => state.getProduct)
  const addToCart = useCartStore((state) => state.addItem)

  const product = getProduct(params.id)

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "")
  const [selectedSize, setSelectedSize] = useState(product?.sizes[2] || "")
  const [quantity, setQuantity] = useState("1")
  const [selectedImage, setSelectedImage] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  // If product not found, redirect to catalogue
  if (!product) {
    router.push("/catalogue")
    return null
  }

  const handleAddToCart = () => {
    setIsAddingToCart(true)

    // Add to cart with selected options
    setTimeout(() => {
      addToCart(product, Number.parseInt(quantity), selectedColor, selectedSize)

      toast({
        title: "Added to cart",
        description: `${product.name} (${selectedColor}, ${selectedSize}) has been added to your cart.`,
      })

      setIsAddingToCart(false)
    }, 500)
  }

  return (
    <RetailLayout>
      <div className="container px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-sm">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square overflow-hidden rounded-sm border-2 cursor-pointer ${
                    index === selectedImage ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - View ${index + 1}`}
                    width={150}
                    height={150}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-wider">{product.name}</h1>
              <div className="flex items-center mt-2 space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating || 4.5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating || 4.5} ({product.reviews || 128} reviews)
                </span>
              </div>
            </div>

            <div className="text-2xl font-bold">
              {product.salePrice ? (
                <div className="flex items-center gap-2">
                  <span>${product.salePrice.toFixed(2)}</span>
                  <span className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                </div>
              ) : (
                <span>${product.price.toFixed(2)}</span>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Color</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Quantity</label>
                <Select value={quantity} onValueChange={setQuantity}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((qty) => (
                      <SelectItem key={qty} value={qty.toString()}>
                        {qty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={isAddingToCart}>
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                <span>2-year warranty</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RotateCcw className="h-4 w-4 text-muted-foreground" />
                <span>30-day returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Share2 className="h-4 w-4 text-muted-foreground" />
                <span>Share this product</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-4">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="features" className="py-4">
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {(
                  product.features || [
                    "100% organic cotton",
                    "Modern fit",
                    "Pre-shrunk fabric",
                    "Reinforced stitching",
                    "Available in multiple colors",
                  ]
                ).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="py-4">
              <p className="text-muted-foreground">Customer reviews will be displayed here.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </RetailLayout>
  )
}

