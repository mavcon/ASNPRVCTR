"use client"

import { useState, useEffect } from "react"
import { RetailLayout } from "@/components/layouts/retail-layout"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useProductStore } from "@/lib/store"

export default function CataloguePage() {
  const { getActiveProducts, searchProducts } = useProductStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [products, setProducts] = useState(getActiveProducts())
  const [priceRange, setPriceRange] = useState([0, 200])
  const [isLoading, setIsLoading] = useState(false)

  // Handle search and filtering
  useEffect(() => {
    setIsLoading(true)
    // Simulate API call delay
    const timer = setTimeout(() => {
      const filteredProducts = searchProducts(
        searchQuery,
        categoryFilter === "all" ? undefined : categoryFilter,
      ).filter((product) => {
        // Apply price filter
        const price = product.salePrice || product.price
        return price >= priceRange[0] && price <= priceRange[1]
      })

      setProducts(filteredProducts)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, categoryFilter, priceRange, searchProducts])

  // Get the max price for the slider
  const maxPrice = Math.max(...getActiveProducts().map((p) => p.price), 200)

  return (
    <RetailLayout>
      <div className="container px-4 py-6 md:py-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider">Catalogue</h1>

          <div className="flex items-center justify-between bg-muted/30 p-4 rounded-sm">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={categoryFilter === "all" ? "default" : "outline"}
                size="sm"
                className="h-8"
                onClick={() => setCategoryFilter("all")}
              >
                All Categories
              </Button>
              {["Men's Clothing", "Women's Clothing", "Unisex", "Accessories", "Footwear", "Home"].map((category) => (
                <Button
                  key={category}
                  variant={categoryFilter === category ? "default" : "outline"}
                  size="sm"
                  className="h-8"
                  onClick={() => setCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Narrow down your product search</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Price Range</h3>
                    <div className="space-y-4">
                      <Slider defaultValue={priceRange} max={maxPrice} step={1} onValueChange={setPriceRange} />
                      <div className="flex items-center justify-between">
                        <Input
                          type="number"
                          placeholder="Min"
                          className="w-[45%] h-8"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        />
                        <span className="text-muted-foreground">-</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          className="w-[45%] h-8"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="relative w-full mb-4">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="hidden md:block space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Filters</h3>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Price Range</h4>
                  <div className="space-y-4">
                    <Slider defaultValue={priceRange} max={maxPrice} step={1} onValueChange={setPriceRange} />
                    <div className="flex items-center justify-between">
                      <Input
                        type="number"
                        placeholder="Min"
                        className="w-[45%] h-8"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      />
                      <span className="text-muted-foreground">-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        className="w-[45%] h-8"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <p>Loading products...</p>
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No products found matching your criteria</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setCategoryFilter("all")
                      setPriceRange([0, maxPrice])
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {products.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="mx-auto">
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
    </RetailLayout>
  )
}

