"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const categoriesData = [
  {
    name: "Clothing",
    description: "Explore our range of premium clothing",
    imageUrl: "/placeholder.svg?height=200&width=200",
    href: "/shop?category=clothing",
  },
  {
    name: "Electronics",
    description: "Discover the latest electronic gadgets",
    imageUrl: "/placeholder.svg?height=200&width=200",
    href: "/shop?category=electronics",
  },
  {
    name: "Accessories",
    description: "Find the perfect accessories to complement your style",
    imageUrl: "/placeholder.svg?height=200&width=200",
    href: "/shop?category=accessories",
  },
  {
    name: "Footwear",
    description: "Step into style with our footwear collection",
    imageUrl: "/placeholder.svg?height=200&width=200",
    href: "/shop?category=footwear",
  },
]

export function Categories() {
  return (
    <section className="w-full py-8 md:py-12 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-wider md:text-3xl lg:text-4xl">Shop By Category</h2>
            <p className="max-w-[700px] text-muted-foreground text-sm md:text-base lg:text-lg tracking-wide">
              Explore our curated collections of premium products.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-4 py-8 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {categoriesData.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={category.imageUrl || "/placeholder.svg"}
                    alt={category.name}
                    className="object-cover w-full h-full transition-all hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/shop">
            <Button variant="outline" size="lg" className="tracking-wider">
              View All Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

