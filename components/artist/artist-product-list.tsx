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
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Search, Edit, Eye, Archive, Trash2, Copy, BarChart2 } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  inventory: number
  category: string
  status: "active" | "draft" | "archived"
  createdAt: string
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Abstract Painting - Blue Horizon",
    price: 129,
    inventory: 1,
    category: "Painting",
    status: "active",
    createdAt: "2023-05-12",
  },
  {
    id: "2",
    name: "Landscape Print - Mountain View",
    price: 89,
    inventory: 15,
    category: "Print",
    status: "active",
    createdAt: "2023-06-03",
  },
  {
    id: "3",
    name: "Portrait Study - The Gaze",
    price: 199,
    inventory: 1,
    category: "Painting",
    status: "active",
    createdAt: "2023-04-28",
  },
  {
    id: "4",
    name: "Digital Art - Cyberpunk City",
    price: 69,
    inventory: 50,
    category: "Digital",
    status: "active",
    createdAt: "2023-07-15",
  },
  {
    id: "5",
    name: "Mixed Media - Urban Jungle",
    price: 149,
    inventory: 3,
    category: "Mixed Media",
    status: "active",
    createdAt: "2023-06-22",
  },
  {
    id: "6",
    name: "Sculpture - Bronze Figure",
    price: 299,
    inventory: 2,
    category: "Sculpture",
    status: "active",
    createdAt: "2023-03-10",
  },
  {
    id: "7",
    name: "Photography - Ocean Waves",
    price: 79,
    inventory: 10,
    category: "Photography",
    status: "active",
    createdAt: "2023-05-30",
  },
  {
    id: "8",
    name: "Watercolor - Spring Flowers",
    price: 109,
    inventory: 1,
    category: "Painting",
    status: "draft",
    createdAt: "2023-07-02",
  },
  {
    id: "9",
    name: "Ceramic Vase - Modern Design",
    price: 159,
    inventory: 5,
    category: "Ceramics",
    status: "active",
    createdAt: "2023-04-15",
  },
  {
    id: "10",
    name: "Textile Art - Woven Tapestry",
    price: 179,
    inventory: 2,
    category: "Textile",
    status: "archived",
    createdAt: "2023-02-28",
  },
]

interface ArtistProductListProps {
  filter: "all" | "active" | "draft" | "archived"
}

export function ArtistProductList({ filter }: ArtistProductListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = sampleProducts.filter((product) => {
    // Apply status filter
    if (filter !== "all" && product.status !== filter) {
      return false
    }

    // Apply search filter
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }

    return true
  })

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
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>${product.price?.toFixed(2) || "0.00"}</TableCell>
                  <TableCell>{product.inventory}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(product.status)}>
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.createdAt}</TableCell>
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
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart2 className="mr-2 h-4 w-4" />
                          Analytics
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

