"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

type SortDirection = "asc" | "desc" | null
type SortField = "name" | "price" | "sales" | "revenue" | "rating" | null

interface Product {
  id: string
  name: string
  price: number
  sales: number
  revenue: number
  rating: number
  status: "active" | "draft" | "archived"
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Abstract Painting - Blue Horizon",
    price: 129,
    sales: 42,
    revenue: 5418,
    rating: 4.8,
    status: "active",
  },
  {
    id: "2",
    name: "Landscape Print - Mountain View",
    price: 89,
    sales: 37,
    revenue: 3293,
    rating: 4.6,
    status: "active",
  },
  { id: "3", name: "Portrait Study - The Gaze", price: 199, sales: 28, revenue: 5572, rating: 4.9, status: "active" },
  { id: "4", name: "Digital Art - Cyberpunk City", price: 69, sales: 53, revenue: 3657, rating: 4.5, status: "active" },
  { id: "5", name: "Mixed Media - Urban Jungle", price: 149, sales: 31, revenue: 4619, rating: 4.7, status: "active" },
  { id: "6", name: "Sculpture - Bronze Figure", price: 299, sales: 12, revenue: 3588, rating: 4.9, status: "active" },
  { id: "7", name: "Photography - Ocean Waves", price: 79, sales: 45, revenue: 3555, rating: 4.4, status: "active" },
  { id: "8", name: "Watercolor - Spring Flowers", price: 109, sales: 34, revenue: 3706, rating: 4.6, status: "draft" },
  {
    id: "9",
    name: "Ceramic Vase - Modern Design",
    price: 159,
    sales: 19,
    revenue: 3021,
    rating: 4.8,
    status: "active",
  },
  {
    id: "10",
    name: "Textile Art - Woven Tapestry",
    price: 179,
    sales: 15,
    revenue: 2685,
    rating: 4.7,
    status: "archived",
  },
]

export function ProductPerformance() {
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [sortField, setSortField] = useState<SortField>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const handleSort = (field: SortField) => {
    const isAsc = sortField === field && sortDirection === "asc"
    setSortDirection(isAsc ? "desc" : "asc")
    setSortField(field)

    const sortedProducts = [...products].sort((a, b) => {
      if (field === null) return 0

      const compareA = a[field]
      const compareB = b[field]

      if (isAsc) {
        return compareA > compareB ? -1 : 1
      } else {
        return compareA < compareB ? -1 : 1
      }
    })

    setProducts(sortedProducts)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-700 dark:text-green-400"
      case "draft":
        return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400"
      case "archived":
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
      default:
        return "bg-gray-500/20 text-gray-700 dark:text-gray-400"
    }
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("price")} className="p-0 h-auto font-medium">
                Price <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("sales")} className="p-0 h-auto font-medium">
                Sales <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("revenue")} className="p-0 h-auto font-medium">
                Revenue <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("rating")} className="p-0 h-auto font-medium">
                Rating <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.sales}</TableCell>
              <TableCell>${product.revenue.toFixed(2)}</TableCell>
              <TableCell>{product.rating.toFixed(1)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(product.status)}>
                  {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Edit product</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Archive product</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

