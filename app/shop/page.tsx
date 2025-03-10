import { RetailLayout } from "@/components/layouts/retail-layout"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Sample products data
const products = [
  {
    id: "1",
    name: "Premium T-Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "High-quality cotton t-shirt with a modern fit.",
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Noise-cancelling headphones with 20-hour battery life.",
  },
  {
    id: "3",
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Track your fitness and stay connected with this smart watch.",
  },
  {
    id: "4",
    name: "Leather Wallet",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Genuine leather wallet with RFID protection.",
  },
  {
    id: "5",
    name: "Wireless Earbuds",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "True wireless earbuds with noise cancellation.",
  },
  {
    id: "6",
    name: "Backpack",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Durable backpack with laptop compartment.",
  },
  {
    id: "7",
    name: "Running Shoes",
    price: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Lightweight running shoes with cushioned soles.",
  },
  {
    id: "8",
    name: "Sunglasses",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Polarized sunglasses with UV protection.",
  },
]

export default function ShopPage() {
  return (
    <RetailLayout>
      <div className="container py-4 md:py-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl md:text-2xl font-bold">Shop</h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[85vw] sm:w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Narrow down your search</SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Categories</h3>
                      <div className="space-y-2">
                        {["Clothing", "Electronics", "Accessories", "Footwear"].map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox id={`category-${category.toLowerCase()}`} />
                            <Label htmlFor={`category-${category.toLowerCase()}`}>{category}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Price Range</h3>
                      <div className="space-y-4">
                        <Slider defaultValue={[0, 200]} max={500} step={1} />
                        <div className="flex items-center justify-between">
                          <Input type="number" placeholder="Min" className="w-[45%] h-8" defaultValue={0} />
                          <span className="text-muted-foreground">-</span>
                          <Input type="number" placeholder="Max" className="w-[45%] h-8" defaultValue={200} />
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">Apply Filters</Button>
                  </div>
                </SheetContent>
              </Sheet>
              <Select defaultValue="featured">
                <SelectTrigger className="w-[120px] md:w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="hidden md:block space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Categories</h3>
                <div className="space-y-2">
                  {["Clothing", "Electronics", "Accessories", "Footwear"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={`desktop-category-${category.toLowerCase()}`} />
                      <Label htmlFor={`desktop-category-${category.toLowerCase()}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Price Range</h3>
                <div className="space-y-4">
                  <Slider defaultValue={[0, 200]} max={500} step={1} />
                  <div className="flex items-center justify-between">
                    <Input type="number" placeholder="Min" className="w-[45%] h-8" defaultValue={0} />
                    <span className="text-muted-foreground">-</span>
                    <Input type="number" placeholder="Max" className="w-[45%] h-8" defaultValue={200} />
                  </div>
                </div>
              </div>
              <Button className="w-full">Apply Filters</Button>
            </div>

            <div className="md:col-span-2 lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="outline" className="mx-auto">
              Load More
            </Button>
          </div>
        </div>
      </div>
    </RetailLayout>
  )
}

