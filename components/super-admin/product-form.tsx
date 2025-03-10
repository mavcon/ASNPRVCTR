"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ImagePlus, X, Plus, Trash } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { useUserStore } from "@/lib/user-store"

interface ProductFormProps {
  onSuccess?: (productData?: any) => void
  initialData?: any
}

export function ProductForm({ onSuccess, initialData }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [variants, setVariants] = useState<{ color: string; size: string; stock: number; sku: string }[]>(
    initialData?.variants || [],
  )
  const [colors, setColors] = useState<string[]>(initialData?.colors || [])
  const [sizes, setSizes] = useState<string[]>(initialData?.sizes || [])
  const [newColor, setNewColor] = useState("")
  const [newSize, setNewSize] = useState("")
  const [images, setImages] = useState<string[]>(initialData?.images || [])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { users } = useUserStore()
  const artists = users.filter((user) => user.role === "Artist" && user.verifiedEmail)
  const [selectedArtistId, setSelectedArtistId] = useState(initialData?.artistId || "")

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    skuPrefix: initialData?.skuPrefix || "",
    category: initialData?.category || "",
    subcategory: initialData?.subcategory || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    salePrice: initialData?.salePrice || "",
    costPrice: initialData?.costPrice || "",
    material: initialData?.material || "",
    featured: initialData?.featured || false,
    status: initialData?.status || "Active",
    altText: initialData?.altText || "",
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    tags: initialData?.tags || "",
    slug: initialData?.slug || "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [id]: checked,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Check if adding these files would exceed the limit
    if (images.length + files.length > 8) {
      toast({
        title: "Too many images",
        description: `You can only upload up to 8 images. You already have ${images.length}.`,
        variant: "destructive",
      })
      return
    }

    // Process up to 8 images
    const newImages = [...images]
    const filesToProcess = Math.min(files.length, 8 - images.length)
    let processedCount = 0

    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i]

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 5MB size limit.`,
          variant: "destructive",
        })
        continue
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file.`,
          variant: "destructive",
        })
        continue
      }

      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string)
          processedCount++

          if (processedCount === filesToProcess) {
            setImages(newImages)
          }
        }
      }

      reader.onerror = () => {
        toast({
          title: "Error reading file",
          description: `Failed to read ${file.name}.`,
          variant: "destructive",
        })
      }

      reader.readAsDataURL(file)
    }

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate required fields
    const requiredFields = [
      { field: "name", label: "Product Name" },
      { field: "skuPrefix", label: "SKU Prefix" },
      { field: "price", label: "Price" },
      { field: "category", label: "Category" },
      { field: "artist", label: "Artist" },
    ]

    const missingFields = requiredFields.filter((field) => !formData[field.field] && field.field !== "artist")

    if (missingFields.length > 0 || colors.length === 0 || sizes.length === 0 || !selectedArtistId) {
      const missingFieldNames = missingFields.map((f) => f.label).join(", ")
      const artistMessage = !selectedArtistId ? ", Artist" : ""
      const colorSizeMessage = colors.length === 0 ? "at least one color" : ""
      const andSizes = (colors.length === 0 || !selectedArtistId) && sizes.length === 0 ? " and " : ""
      const sizesMessage = sizes.length === 0 ? "at least one size" : ""

      toast({
        title: "Validation Error",
        description: `Please fill in all required fields: ${missingFieldNames}${artistMessage}${missingFields.length > 0 && (colorSizeMessage || sizesMessage) ? ", " : ""}${colorSizeMessage}${andSizes}${sizesMessage}.`,
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Validate variants have stock values
    const invalidVariants = variants.filter((v) => v.stock < 0)
    if (invalidVariants.length > 0) {
      toast({
        title: "Validation Error",
        description: "Stock quantities cannot be negative.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Create a complete product object with all data
    const productData = {
      id: initialData?.id || `new-${Date.now()}`, // Generate a temporary ID if it's a new product
      name: formData.name,
      sku: formData.skuPrefix + (colors[0] ? `-${colors[0].substring(0, 3).toUpperCase()}` : ""),
      skuPrefix: formData.skuPrefix,
      category: formData.category,
      subcategory: formData.subcategory,
      price: Number.parseFloat(formData.price as string) || 0,
      salePrice: formData.salePrice ? Number.parseFloat(formData.salePrice as string) : null,
      costPrice: Number.parseFloat(formData.costPrice as string) || 0,
      stock: variants.reduce(
        (acc, variant) => {
          // Only include valid variants
          if (colors.includes(variant.color) && sizes.includes(variant.size)) {
            acc[`${variant.size}-${variant.color}`] = variant.stock
          }
          return acc
        },
        {} as Record<string, number>,
      ),
      totalStock: variants.reduce((sum, variant) => {
        // Only count valid variants
        if (colors.includes(variant.color) && sizes.includes(variant.size)) {
          return sum + variant.stock
        }
        return sum
      }, 0),
      status: formData.status,
      featured: formData.featured,
      images: images.length > 0 ? images : ["/placeholder.svg?height=400&width=400"], // Use uploaded images or default
      colors,
      sizes,
      material: formData.material,
      description: formData.description,
      createdAt: initialData?.createdAt || new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      metaTitle: formData.metaTitle || formData.name,
      metaDescription: formData.metaDescription || formData.description,
      tags: formData.tags,
      slug:
        formData.slug ||
        formData.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      variants: variants.filter((v) => colors.includes(v.color) && sizes.includes(v.size)),
      artistId: selectedArtistId,
      artistName: artists.find((a) => a.id === selectedArtistId)?.name || "",
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)

    toast({
      title: initialData ? "Product updated" : "Product created",
      description: initialData
        ? "Your product has been updated successfully."
        : "Your product has been added to the store.",
    })

    if (onSuccess) {
      // Pass the product data back to the parent component
      onSuccess(productData)
    }
  }

  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors([...colors, newColor])
      setNewColor("")

      // Generate variants for new color
      const newVariants = sizes.map((size) => ({
        color: newColor,
        size,
        stock: 0,
        sku: `${formData.skuPrefix || "SKU"}-${newColor.substring(0, 3).toUpperCase()}-${size}`,
      }))

      setVariants([...variants, ...newVariants])
    }
  }

  const removeColor = (color: string) => {
    setColors(colors.filter((c) => c !== color))
    setVariants(variants.filter((v) => v.color !== color))
  }

  const addSize = () => {
    if (newSize && !sizes.includes(newSize)) {
      setSizes([...sizes, newSize])
      setNewSize("")

      // Generate variants for new size
      const newVariants = colors.map((color) => ({
        color,
        size: newSize,
        stock: 0,
        sku: `${formData.skuPrefix || "SKU"}-${color.substring(0, 3).toUpperCase()}-${newSize}`,
      }))

      setVariants([...variants, ...newVariants])
    }
  }

  const removeSize = (size: string) => {
    setSizes(sizes.filter((s) => s !== size))
    setVariants(variants.filter((v) => v.size !== size))
  }

  const updateVariantStock = (color: string, size: string, stock: number) => {
    // Find the variant
    const variantExists = variants.some((v) => v.color === color && v.size === size)

    if (variantExists) {
      // Only update existing variants
      setVariants(variants.map((v) => (v.color === color && v.size === size ? { ...v, stock } : v)))
    }
  }

  const updateVariantSku = (color: string, size: string, sku: string) => {
    setVariants(variants.map((v) => (v.color === color && v.size === size ? { ...v, sku } : v)))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="seo">SEO & Metadata</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Product Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skuPrefix">
                SKU Prefix <span className="text-red-500">*</span>
              </Label>
              <Input
                id="skuPrefix"
                placeholder="e.g., TS-001"
                value={formData.skuPrefix}
                onChange={handleInputChange}
                required
              />
              <p className="text-xs text-muted-foreground">This will be used as a base for all variant SKUs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Men's Clothing">Men's Clothing</SelectItem>
                  <SelectItem value="Women's Clothing">Women's Clothing</SelectItem>
                  <SelectItem value="Unisex">Unisex</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="artist">
                Artist <span className="text-red-500">*</span>
              </Label>
              <Select value={selectedArtistId} onValueChange={(value) => setSelectedArtistId(value)} required>
                <SelectTrigger id="artist">
                  <SelectValue placeholder="Select artist" />
                </SelectTrigger>
                <SelectContent>
                  {artists.length > 0 ? (
                    artists.map((artist) => (
                      <SelectItem key={artist.id} value={artist.id}>
                        {artist.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>
                      No verified artists available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subcategory">Subcategory</Label>
            <Select value={formData.subcategory} onValueChange={(value) => handleSelectChange("subcategory", value)}>
              <SelectTrigger id="subcategory">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="T-Shirts">T-Shirts</SelectItem>
                <SelectItem value="Shirts">Shirts</SelectItem>
                <SelectItem value="Jeans">Jeans</SelectItem>
                <SelectItem value="Dresses">Dresses</SelectItem>
                <SelectItem value="Jackets">Jackets</SelectItem>
                <SelectItem value="Hoodies">Hoodies</SelectItem>
                <SelectItem value="Sweaters">Sweaters</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              rows={5}
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">
                Regular Price ($) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salePrice">Sale Price ($)</Label>
              <Input
                id="salePrice"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.salePrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="costPrice">Cost Price ($)</Label>
              <Input
                id="costPrice"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.costPrice}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="material">Material</Label>
            <Input
              id="material"
              placeholder="e.g., 100% Cotton"
              value={formData.material}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => handleCheckboxChange("featured", checked as boolean)}
            />
            <Label htmlFor="featured">Featured Product</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Out of Stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="variants" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Colors <span className="text-red-500">*</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <Badge key={color} variant="outline" className="px-3 py-1">
                    {color}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-2 text-muted-foreground hover:text-foreground"
                      onClick={() => removeColor(color)}
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add color (e.g., Black)"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" onClick={addColor} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Sizes <span className="text-red-500">*</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Badge key={size} variant="outline" className="px-3 py-1">
                    {size}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-2 text-muted-foreground hover:text-foreground"
                      onClick={() => removeSize(size)}
                      type="button"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add size (e.g., M)"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" onClick={addSize} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Variant Inventory</h3>
            {colors.length > 0 && sizes.length > 0 ? (
              <div className="rounded-md border overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">Color</th>
                      <th className="px-4 py-2 text-left font-medium">Size</th>
                      <th className="px-4 py-2 text-left font-medium">SKU</th>
                      <th className="px-4 py-2 text-left font-medium">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {variants.map((variant, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2">{variant.color}</td>
                        <td className="px-4 py-2">{variant.size}</td>
                        <td className="px-4 py-2">
                          <Input
                            value={variant.sku}
                            onChange={(e) => updateVariantSku(variant.color, variant.size, e.target.value)}
                            className="h-8"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            min="0"
                            value={variant.stock}
                            onChange={(e) =>
                              updateVariantStock(variant.color, variant.size, Number.parseInt(e.target.value))
                            }
                            className="h-8 w-24"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-4 border rounded-md text-muted-foreground">
                Add colors and sizes to generate variants
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="images" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Product Images</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Upload button */}
              <div
                className="aspect-square border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={triggerFileInput}
              >
                <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Add Image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
              </div>

              {/* Display uploaded images */}
              {images.map((image, index) => (
                <div key={index} className="aspect-square relative border rounded-md overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 bg-background/80 hover:bg-background"
                    type="button"
                    onClick={() => removeImage(index)}
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                  {index === 0 && <Badge className="absolute top-2 left-2 bg-primary">Primary</Badge>}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Upload up to 8 images. First image will be used as the product thumbnail.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="altText">Image Alt Text</Label>
            <Input
              id="altText"
              placeholder="Describe the product for accessibility"
              value={formData.altText}
              onChange={handleInputChange}
            />
            <p className="text-xs text-muted-foreground">This helps with accessibility and SEO</p>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              placeholder="SEO title (leave blank to use product name)"
              value={formData.metaTitle}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="metaDescription">Meta Description</Label>
            <Textarea
              id="metaDescription"
              placeholder="SEO description"
              rows={3}
              value={formData.metaDescription}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Product Tags</Label>
            <Input
              id="tags"
              placeholder="Enter tags separated by commas"
              value={formData.tags}
              onChange={handleInputChange}
            />
            <p className="text-xs text-muted-foreground">Tags help customers find your products through search</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input id="slug" placeholder="product-url-slug" value={formData.slug} onChange={handleInputChange} />
            <p className="text-xs text-muted-foreground">Leave blank to auto-generate from product name</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => onSuccess && onSuccess()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : initialData ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  )
}

