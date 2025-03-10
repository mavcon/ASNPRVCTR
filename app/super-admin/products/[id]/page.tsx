"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProductForm } from "@/components/super-admin/product-form"
import { ArrowLeft, Edit, Trash, Copy, Tag, BarChart, ShoppingCart, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState("1")

  // This would normally be fetched from an API
  const product = {
    id: params.id,
    name: "Classic Cotton T-Shirt",
    sku: "TS-001-BLK",
    skuPrefix: "TS-001",
    category: "Men's Clothing",
    subcategory: "T-Shirts",
    price: 29.99,
    salePrice: null,
    costPrice: 12.5,
    stock: {
      "S-Black": 25,
      "M-Black": 30,
      "L-Black": 20,
      "XL-Black": 15,
      "S-White": 25,
      "M-White": 30,
      "L-White": 20,
      "XL-White": 15,
    },
    totalStock: 180,
    status: "Active",
    featured: true,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    colors: ["Black", "White"],
    sizes: ["S", "M", "L", "XL"],
    material: "100% Cotton",
    description:
      "A premium quality t-shirt made from 100% cotton. Features a classic fit with reinforced stitching for durability. Perfect for everyday wear and available in multiple colors and sizes.",
    createdAt: "2023-05-15",
    updatedAt: "2023-05-20",
    metaTitle: "Classic Cotton T-Shirt | ASNPRVCTR",
    metaDescription:
      "Premium quality 100% cotton t-shirt with classic fit. Available in multiple colors and sizes. Shop now at ASNPRVCTR.",
    tags: "t-shirt, cotton, men's clothing, casual wear",
    slug: "classic-cotton-t-shirt",
    variants: [
      { color: "Black", size: "S", stock: 25, sku: "TS-001-BLK-S" },
      { color: "Black", size: "M", stock: 30, sku: "TS-001-BLK-M" },
      { color: "Black", size: "L", stock: 20, sku: "TS-001-BLK-L" },
      { color: "Black", size: "XL", stock: 15, sku: "TS-001-BLK-XL" },
      { color: "White", size: "S", stock: 25, sku: "TS-001-WHT-S" },
      { color: "White", size: "M", stock: 30, sku: "TS-001-WHT-M" },
      { color: "White", size: "L", stock: 20, sku: "TS-001-WHT-L" },
      { color: "White", size: "XL", stock: 15, sku: "TS-001-WHT-XL" },
    ],
    stats: {
      views: 1245,
      orders: 87,
      revenue: 2608.13,
      conversionRate: 6.99,
    },
    relatedProducts: [
      { id: "2", name: "Slim Fit Jeans", price: 59.99 },
      { id: "3", name: "Casual Hoodie", price: 49.99 },
      { id: "6", name: "Athletic Shorts", price: 34.99 },
    ],
  }

  const addToCart = (product, quantity, color, size) => {
    // Replace this with your actual add to cart logic
    console.log("Adding to cart:", product, quantity, color, size)
  }

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast({
        title: "Selection required",
        description: "Please select both color and size before adding to cart.",
        variant: "destructive",
      })
      return
    }

    setIsAddingToCart(true)

    // Add to cart with selected options
    setTimeout(() => {
      try {
        addToCart(product, Number.parseInt(quantity), selectedColor, selectedSize)

        toast({
          title: "Added to cart",
          description: `${product.name} (${selectedColor}, ${selectedSize}) has been added to your cart.`,
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
    }, 500)
  }

  if (isEditMode) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsEditMode(false)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-3xl font-bold tracking-tight ml-2">Edit Product</h2>
          </div>
        </div>
        <ProductForm initialData={product} onSuccess={() => setIsEditMode(false)} />
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/super-admin/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight ml-2">{product.name}</h2>
          {product.featured && (
            <Badge variant="outline" className="ml-4">
              Featured
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </Button>
          <Button size="sm" onClick={() => setIsEditMode(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Product</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this product? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Delete Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">SKU</h3>
                    <p>{product.sku}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <Badge className="mt-1">{product.status}</Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                    <p>
                      {product.category} / {product.subcategory}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Material</h3>
                    <p>{product.material}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                    <p>{product.createdAt}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                    <p>{product.updatedAt}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                  <p className="text-sm">{product.description}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Regular Price</h3>
                    <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Sale Price</h3>
                    <p className="text-lg font-bold">
                      {product.salePrice ? `$${product.salePrice.toFixed(2)}` : "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Cost Price</h3>
                    <p className="text-lg font-bold">${product.costPrice.toFixed(2)}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Available Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <Badge key={color} variant="outline">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Available Sizes</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <Badge key={size} variant="outline">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{product.totalStock}</div>
                  <p className="text-sm text-muted-foreground">Total units in stock</p>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Variants</span>
                      <span>{product.variants.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Low Stock Variants</span>
                      <span className="text-amber-500">2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Out of Stock Variants</span>
                      <span className="text-red-500">0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Views (30 days)</p>
                      <p className="font-bold">{product.stats.views}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Orders (30 days)</p>
                      <p className="font-bold">{product.stats.orders}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                      <Tag className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Revenue (30 days)</p>
                      <p className="font-bold">${product.stats.revenue.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <p className="font-bold">{product.stats.conversionRate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Related Products</CardTitle>
              <CardDescription>Products often purchased together</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {product.relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-md bg-muted"></div>
                    <div>
                      <p className="text-sm font-medium">{relatedProduct.name}</p>
                      <p className="text-sm text-muted-foreground">${relatedProduct.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Variants</CardTitle>
              <CardDescription>Manage inventory for each product variant</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left font-medium">Variant</th>
                      <th className="px-4 py-3 text-left font-medium">SKU</th>
                      <th className="px-4 py-3 text-left font-medium">Stock</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.variants && product.variants.length > 0 ? (
                      product.variants.map((variant, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-3">
                            {variant.color} / {variant.size}
                          </td>
                          <td className="px-4 py-3">{variant.sku}</td>
                          <td className="px-4 py-3">{variant.stock}</td>
                          <td className="px-4 py-3">
                            <Badge
                              variant="outline"
                              className={
                                variant.stock > 20
                                  ? "bg-green-500/10 text-green-500"
                                  : variant.stock > 5
                                    ? "bg-yellow-500/10 text-yellow-500"
                                    : "bg-red-500/10 text-red-500"
                              }
                            >
                              {variant.stock > 20 ? "In Stock" : variant.stock > 5 ? "Low Stock" : "Critical Stock"}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-3 text-center text-muted-foreground">
                          No variants available for this product.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>Manage product images and gallery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                    {index === 0 && <Badge className="absolute top-2 left-2">Primary</Badge>}
                  </div>
                ))}
                <div className="aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Button variant="ghost">Add Image</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>Product performance metrics and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Analytics charts would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Search engine optimization settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Meta Title</h3>
                <p>{product.metaTitle}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Meta Description</h3>
                <p>{product.metaDescription}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">URL Slug</h3>
                <p>{product.slug}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Tags</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {product.tags.split(",").map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

