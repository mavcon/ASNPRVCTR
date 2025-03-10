"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, X, Move, Edit } from "lucide-react"
import { cn } from "@/lib/utils"

interface PortfolioItem {
  id: string
  imageUrl: string
  title: string
  description: string
  featured: boolean
}

const initialPortfolioItems: PortfolioItem[] = [
  {
    id: "1",
    imageUrl: "/placeholder.svg?height=300&width=300",
    title: "Abstract Composition #12",
    description: "Acrylic on canvas, 24x36 inches",
    featured: true,
  },
  {
    id: "2",
    imageUrl: "/placeholder.svg?height=300&width=300",
    title: "Urban Landscape Series",
    description: "Mixed media on paper, 18x24 inches",
    featured: false,
  },
  {
    id: "3",
    imageUrl: "/placeholder.svg?height=300&width=300",
    title: "Digital Exploration #5",
    description: "Digital art, limited edition print",
    featured: false,
  },
  {
    id: "4",
    imageUrl: "/placeholder.svg?height=300&width=300",
    title: "Portrait Study",
    description: "Oil on canvas, 16x20 inches",
    featured: false,
  },
  {
    id: "5",
    imageUrl: "/placeholder.svg?height=300&width=300",
    title: "Sculptural Form",
    description: "Bronze, 12 inches height",
    featured: false,
  },
  {
    id: "6",
    imageUrl: "/placeholder.svg?height=300&width=300",
    title: "Nature Series #3",
    description: "Watercolor on paper, 11x14 inches",
    featured: false,
  },
]

export function ArtistPortfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(initialPortfolioItems)
  const [isDragging, setIsDragging] = useState(false)

  const handleFeatureToggle = (id: string) => {
    setPortfolioItems(portfolioItems.map((item) => (item.id === id ? { ...item, featured: !item.featured } : item)))
  }

  const handleRemoveItem = (id: string) => {
    setPortfolioItems(portfolioItems.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Portfolio Items</h3>
          <p className="text-sm text-muted-foreground">
            Showcase your best work. Drag to reorder, feature your best pieces.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Item
        </Button>
      </div>

      <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", isDragging && "opacity-75")}>
        {portfolioItems.map((item) => (
          <Card
            key={item.id}
            className={cn("group relative overflow-hidden transition-all", item.featured && "ring-2 ring-primary")}
          >
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
              <div className="flex gap-2">
                <Button size="sm" variant="secondary">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleRemoveItem(item.id)}>
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
            <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant={item.featured ? "default" : "outline"}
                onClick={() => handleFeatureToggle(item.id)}
              >
                {item.featured ? "Featured" : "Feature"}
              </Button>
            </div>
            <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
              <Move className="h-5 w-5 text-white" />
            </div>
            <CardContent className="p-0">
              <div className="aspect-square relative">
                <img
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

