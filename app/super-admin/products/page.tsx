"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Search, Filter, Plus, Edit, Trash, Eye, Copy, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ProductForm } from "@/components/super-admin/product-form"
import { Card, CardContent } from "@/components/ui/card"
import { useProductStore } from "@/lib/store"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function ProductManagementPage() {
  const { products, addProduct, deleteProduct } = useProductStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<any>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [stockRange, setStockRange] = useState<[number, number]>([0, 1000])
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false)
  const [materialFilter, setMaterialFilter] = useState("all")
  const [tagFilter, setTagFilter] = useState("")
  const [dateRange, setDateRange] = useState<[string, string]>(["", ""])
  const [discountFilter, setDiscountFilter] = useState(false)
  const [hasVariantsFilter, setHasVariantsFilter] = useState(false)

  // Filter products when search or filters change
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      const matchesStatus = statusFilter === "all" || product.status.toLowerCase() === statusFilter.toLowerCase()

      // Only apply basic filters in the useEffect
      return matchesSearch && matchesCategory && matchesStatus
    })

    // Apply sorting if set
    if (sortField && sortDirection) {
      filtered.sort((a, b) => {
        if (sortField === "name" || sortField === "createdAt") {
          return sortDirection === "asc"
            ? String(a[sortField]).localeCompare(String(b[sortField]))
            : String(b[sortField]).localeCompare(String(a[sortField]))
        } else {
          return sortDirection === "asc"
            ? Number(a[sortField]) - Number(b[sortField])
            : Number(b[sortField]) - Number(a[sortField])
        }
      })
    }

    setFilteredProducts(filtered)
  }, [searchQuery, categoryFilter, statusFilter, products, sortField, sortDirection])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "out of stock":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "draft":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
      // Update filtered products after deletion
      setFilteredProducts(filteredProducts.filter((product) => product.id !== id))
      toast({
        title: "Product deleted",
        description: "The product has been successfully removed.",
      })
    }
  }

  const handleDuplicateProduct = (product: any) => {
    const duplicatedProduct = {
      ...product,
      id: `dup-${Date.now()}`,
      name: `${product.name} (Copy)`,
      sku: `${product.skuPrefix}-COPY`,
      createdAt: new Date().toISOString().split("T")[0],
    }

    addProduct(duplicatedProduct)
    setFilteredProducts([duplicatedProduct, ...filteredProducts])

    toast({
      title: "Product duplicated",
      description: "A copy of the product has been created.",
    })
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleEditProduct = (product: any) => {
    setCurrentProduct(product)
    setIsEditProductOpen(true)
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Product Management</h2>
        <p className="text-muted-foreground">Manage your clothing store products, inventory, and variants.</p>
      </div>

      <Tabs defaultValue="all-products" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList>
            <TabsTrigger value="all-products">All Products</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="on-sale">On Sale</TabsTrigger>
            <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-muted" : ""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-muted" : ""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </Button>
            <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsAddProductOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>
                    Create a new product with variants, images, and inventory information.
                  </DialogDescription>
                </DialogHeader>
                <ProductForm
                  onSuccess={(newProduct) => {
                    if (newProduct) {
                      // Add the new product to the store
                      addProduct(newProduct)
                    }
                    setIsAddProductOpen(false)
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-2">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Men's Clothing">Men's Clothing</SelectItem>
                <SelectItem value="Women's Clothing">Women's Clothing</SelectItem>
                <SelectItem value="Unisex">Unisex</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="out of stock">Out of Stock</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
            onClick={() => setIsAdvancedFiltersOpen(true)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
        </div>

        <TabsContent value="all-products" className="space-y-4">
          {viewMode === "list" ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
                      <div className="flex items-center">
                        Product
                        {sortField === "name" && (
                          <ArrowUpDown className={`ml-2 h-3 w-3 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead onClick={() => handleSort("price")} className="cursor-pointer">
                      <div className="flex items-center">
                        Price
                        {sortField === "price" && (
                          <ArrowUpDown className={`ml-2 h-3 w-3 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead onClick={() => handleSort("totalStock")} className="cursor-pointer">
                      <div className="flex items-center">
                        Stock
                        {sortField === "totalStock" && (
                          <ArrowUpDown className={`ml-2 h-3 w-3 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="h-10 w-10 relative rounded-md overflow-hidden">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{product.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {product.colors.length} colors, {product.sizes.length} sizes
                          </span>
                          {product.featured && (
                            <Badge variant="outline" className="mt-1 w-fit">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{product.category}</span>
                          <span className="text-xs text-muted-foreground">{product.subcategory}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          {product.salePrice ? (
                            <>
                              <span className="font-medium">${product.salePrice.toFixed(2)}</span>
                              <span className="text-xs line-through text-muted-foreground">
                                ${product.price.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span>${product.price.toFixed(2)}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{product.totalStock}</span>
                          <span className="text-xs text-muted-foreground">
                            {Object.keys(product.stock).length} variants
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(product.status)} variant="outline">
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/super-admin/products/${product.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDuplicateProduct(product)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No products found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Badge
                      className={`absolute top-2 right-2 z-10 ${
                        product.salePrice ? "bg-red-500 hover:bg-red-600" : ""
                      }`}
                      variant={product.salePrice ? "default" : "outline"}
                    >
                      {product.salePrice ? "SALE" : product.status}
                    </Badge>
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-xs text-muted-foreground">{product.sku}</p>
                        </div>
                        <div className="text-right">
                          {product.salePrice ? (
                            <>
                              <div className="font-medium">${product.salePrice.toFixed(2)}</div>
                              <div className="text-xs line-through text-muted-foreground">
                                ${product.price.toFixed(2)}
                              </div>
                            </>
                          ) : (
                            <div className="font-medium">${product.price.toFixed(2)}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>{product.category}</span>
                        <span>Stock: {product.totalStock}</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/super-admin/products/${product.id}`}>
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </Button>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleDuplicateProduct(product)}>
                          <Copy className="h-3.5 w-3.5 mr-1" />
                          Copy
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full h-24 flex items-center justify-center text-muted-foreground">
                  No products found.
                </div>
              )}
            </div>
          )}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </TabsContent>

        <TabsContent value="featured">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.filter((p) => p.featured).length > 0 ? (
                  filteredProducts
                    .filter((p) => p.featured)
                    .map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="h-10 w-10 relative rounded-md overflow-hidden">
                            <Image
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              width={80}
                              height={80}
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/super-admin/products/${product.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No featured products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="on-sale">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Original Price</TableHead>
                  <TableHead>Sale Price</TableHead>
                  <TableHead>Discount %</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.filter((p) => p.salePrice).length > 0 ? (
                  filteredProducts
                    .filter((p) => p.salePrice)
                    .map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="h-10 w-10 relative rounded-md overflow-hidden">
                            <Image
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              width={80}
                              height={80}
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>${product.salePrice?.toFixed(2)}</TableCell>
                        <TableCell>
                          {product.salePrice ? `${Math.round((1 - product.salePrice / product.price) * 100)}%` : "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/super-admin/products/${product.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No products on sale found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="out-of-stock">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Last In Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.filter((p) => p.status.toLowerCase() === "out of stock" || p.totalStock === 0)
                  .length > 0 ? (
                  filteredProducts
                    .filter((p) => p.status.toLowerCase() === "out of stock" || p.totalStock === 0)
                    .map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="h-10 w-10 relative rounded-md overflow-hidden">
                            <Image
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              width={80}
                              height={80}
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>N/A</TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/super-admin/products/${product.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEditProduct(product)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No out of stock products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product details, variants, images, and inventory information.</DialogDescription>
          </DialogHeader>
          <ProductForm
            initialData={currentProduct}
            onSuccess={(updatedProduct) => {
              if (updatedProduct) {
                // Update the product in the store
                // This assumes you have an updateProduct function in your store
                const { updateProduct } = useProductStore.getState()
                updateProduct(updatedProduct)

                // Update the filtered products
                setFilteredProducts(filteredProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))

                toast({
                  title: "Product updated",
                  description: "The product has been successfully updated.",
                })
              }
              setIsEditProductOpen(false)
              setCurrentProduct(null)
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={isAdvancedFiltersOpen} onOpenChange={setIsAdvancedFiltersOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Advanced Filters & Sorting</DialogTitle>
            <DialogDescription>Refine your product list with advanced options.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Sort Products By</Label>
              <Select
                defaultValue="createdAt-desc"
                onValueChange={(value) => {
                  setSortField(value.split("-")[0])
                  setSortDirection(value.split("-")[1] as "asc" | "desc")
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sort option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt-desc">Newest First</SelectItem>
                  <SelectItem value="createdAt-asc">Oldest First</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  <SelectItem value="totalStock-desc">Stock (High to Low)</SelectItem>
                  <SelectItem value="totalStock-asc">Stock (Low to High)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Price Range ($)</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                />
                <span>to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Stock Range</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={stockRange[0]}
                  onChange={(e) => setStockRange([Number(e.target.value), stockRange[1]])}
                />
                <span>to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={stockRange[1]}
                  onChange={(e) => setStockRange([stockRange[0], Number(e.target.value)])}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Filter by Material</Label>
              <Select onValueChange={(value) => setMaterialFilter(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Materials</SelectItem>
                  <SelectItem value="Cotton">Cotton</SelectItem>
                  <SelectItem value="Polyester">Polyester</SelectItem>
                  <SelectItem value="Rayon">Rayon</SelectItem>
                  <SelectItem value="Elastane">Elastane</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Product Tags</Label>
              <Input
                placeholder="Search by tags (comma separated)"
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Date Added</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">From</Label>
                  <Input
                    type="date"
                    value={dateRange[0]}
                    onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
                  />
                </div>
                <div>
                  <Label className="text-xs">To</Label>
                  <Input
                    type="date"
                    value={dateRange[1]}
                    onChange={(e) => setDateRange([dateRange[0], e.target.value])}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="discount-only"
                checked={discountFilter}
                onCheckedChange={(checked) => setDiscountFilter(checked as boolean)}
              />
              <Label htmlFor="discount-only">Discounted Products Only</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-variants"
                checked={hasVariantsFilter}
                onCheckedChange={(checked) => setHasVariantsFilter(checked as boolean)}
              />
              <Label htmlFor="has-variants">Products with Multiple Variants</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                // Reset all advanced filters
                setPriceRange([0, 1000])
                setStockRange([0, 1000])
                setMaterialFilter("all")
                setTagFilter("")
                setDateRange(["", ""])
                setDiscountFilter(false)
                setHasVariantsFilter(false)
                setIsAdvancedFiltersOpen(false)
              }}
            >
              Reset Filters
            </Button>
            <Button
              onClick={() => {
                // Apply the filters
                const filtered = products.filter((product) => {
                  // Apply all filters
                  const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
                  const matchesStock = product.totalStock >= stockRange[0] && product.totalStock <= stockRange[1]
                  const matchesMaterial =
                    materialFilter === "all" || (product.material && product.material.includes(materialFilter))

                  const matchesTags =
                    !tagFilter ||
                    (product.tags &&
                      tagFilter
                        .split(",")
                        .some((tag) => product.tags?.toLowerCase().includes(tag.trim().toLowerCase())))

                  const matchesDate =
                    (!dateRange[0] || new Date(product.createdAt) >= new Date(dateRange[0])) &&
                    (!dateRange[1] || new Date(product.createdAt) <= new Date(dateRange[1]))

                  const matchesDiscount = !discountFilter || product.salePrice !== null

                  const matchesVariants = !hasVariantsFilter || (product.variants && product.variants.length > 1)

                  return (
                    matchesPrice &&
                    matchesStock &&
                    matchesMaterial &&
                    matchesTags &&
                    matchesDate &&
                    matchesDiscount &&
                    matchesVariants
                  )
                })

                // Apply sorting
                if (sortField && sortDirection) {
                  filtered.sort((a, b) => {
                    if (sortField === "name" || sortField === "createdAt") {
                      return sortDirection === "asc"
                        ? String(a[sortField]).localeCompare(String(b[sortField]))
                        : String(b[sortField]).localeCompare(String(a[sortField]))
                    } else {
                      return sortDirection === "asc"
                        ? Number(a[sortField]) - Number(b[sortField])
                        : Number(b[sortField]) - Number(a[sortField])
                    }
                  })
                }

                setFilteredProducts(filtered)
                setIsAdvancedFiltersOpen(false)
              }}
            >
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

