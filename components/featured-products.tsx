"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { useProductStore } from "@/lib/store"

export function FeaturedProducts() {
  const { getActiveProducts } = useProductStore()
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    // Get featured products from the store
    const products = getActiveProducts().filter((product) => product.featured)
    setFeaturedProducts(products.slice(0, 4)) // Limit to 4 products
  }, [getActiveProducts])

  return (
    <section className="w-full py-8 md:py-12 lg:py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-wider md:text-3xl lg:text-4xl">Featured Products</h2>
            <p className="max-w-[700px] text-muted-foreground text-sm md:text-base lg:text-lg tracking-wide">
              Check out our most popular items handpicked for you.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-2 gap-4 py-8 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/catalogue">
            <Button variant="outline" size="lg" className="tracking-wider">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

