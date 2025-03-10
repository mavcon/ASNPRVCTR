"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Trash2, ShoppingBag, Filter, SlidersHorizontal, FolderPlus, Folder } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useUserStore } from "@/lib/user-store"
import { useProductStore, type Product } from "@/lib/store"
import { ProductCard } from "@/components/product-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Collection {
  id: string
  name: string
  productIds: string[]
}

export function CustomerWishlist() {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([])
  const [sortOption, setSortOption] = useState("dateAdded")
  const [filterCategory, setFilterCategory] = useState("all")
  const [collections, setCollections] = useState<Collection[]>([])
  const [newCollectionName, setNewCollectionName] = useState("")
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
  const [isAddingToCollection, setIsAddingToCollection] = useState(false)
  const [targetCollectionId, setTargetCollectionId] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [categories, setCategories] = useState<string[]>([])

  const { toast } = useToast()
  const router = useRouter()

  const currentUser = useUserStore((state) => state.currentUser)
  const updateUser = useUserStore((state) => state.updateUser)
  const getProduct = useProductStore((state) => state.getProduct)
  const products = useProductStore((state) => state.products)

  // Load wishlist products and extract categories
  useEffect(() => {
    if (currentUser?.wishlist) {
      const productsData = currentUser.wishlist
        .map((id) => getProduct(id))
        .filter((product) => product !== undefined) as Product[]

      setWishlistProducts(productsData)

      // Extract unique categories
      const uniqueCategories = Array.from(new Set(productsData.map((product) => product.category)))
      setCategories(uniqueCategories)

      // Load collections from localStorage
      const savedCollections = localStorage.getItem(`wishlist-collections-${currentUser.id}`)
      if (savedCollections) {
        setCollections(JSON.parse(savedCollections))
      }
    }
  }, [currentUser, getProduct])

  // Save collections to localStorage when they change
  useEffect(() => {
    if (currentUser && collections.length > 0) {
      localStorage.setItem(`wishlist-collections-${currentUser.id}`, JSON.stringify(collections))
    }
  }, [collections, currentUser])

  // Handle sorting
  const getSortedProducts = (products: Product[]) => {
    switch (sortOption) {
      case "priceLow":
        return [...products].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
      case "priceHigh":
        return [...products].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
      case "nameAZ":
        return [...products].sort((a, b) => a.name.localeCompare(b.name))
      case "nameZA":
        return [...products].sort((a, b) => b.name.localeCompare(a.name))
      case "dateAdded":
      default:
        // Assuming the order in the wishlist array is the order they were added
        return products
    }
  }

  // Handle filtering
  const getFilteredProducts = (products: Product[]) => {
    if (filterCategory === "all") return products
    return products.filter((product) => product.category === filterCategory)
  }

  // Get products for the current tab
  const getTabProducts = () => {
    let productsToShow = [...wishlistProducts]

    // Filter by collection if not on "all" tab
    if (activeTab !== "all") {
      const collection = collections.find((c) => c.id === activeTab)
      if (collection) {
        productsToShow = productsToShow.filter((product) => collection.productIds.includes(product.id))
      }
    }

    // Apply category filter
    productsToShow = getFilteredProducts(productsToShow)

    // Apply sorting
    return getSortedProducts(productsToShow)
  }

  const removeFromWishlist = (productId: string) => {
    if (!currentUser) return

    const updatedWishlist = (currentUser.wishlist || []).filter((id) => id !== productId)

    updateUser({
      ...currentUser,
      wishlist: updatedWishlist,
    })

    // Also remove from any collections
    const updatedCollections = collections.map((collection) => ({
      ...collection,
      productIds: collection.productIds.filter((id) => id !== productId),
    }))
    setCollections(updatedCollections)

    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist",
    })
  }

  const addToCart = (product: Product) => {
    // This would typically use your cart store
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  const createCollection = () => {
    if (!newCollectionName.trim()) {
      toast({
        title: "Collection name required",
        description: "Please enter a name for your collection",
        variant: "destructive",
      })
      return
    }

    const newCollection: Collection = {
      id: `collection-${Date.now()}`,
      name: newCollectionName,
      productIds: [],
    }

    setCollections([...collections, newCollection])
    setNewCollectionName("")

    toast({
      title: "Collection created",
      description: `"${newCollectionName}" collection has been created`,
    })
  }

  const addToCollection = () => {
    if (!targetCollectionId || selectedProductIds.length === 0) return

    const updatedCollections = collections.map((collection) => {
      if (collection.id === targetCollectionId) {
        // Add products that aren't already in the collection
        const newProductIds = [...new Set([...collection.productIds, ...selectedProductIds])]

        return {
          ...collection,
          productIds: newProductIds,
        }
      }
      return collection
    })

    setCollections(updatedCollections)
    setSelectedProductIds([])
    setIsAddingToCollection(false)

    toast({
      title: "Added to collection",
      description: `${selectedProductIds.length} item(s) added to collection`,
    })
  }

  const toggleProductSelection = (productId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  // If user is not logged in or has no wishlist items
  if (!currentUser || !currentUser.wishlist || currentUser.wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
        <p className="text-muted-foreground mb-4">Browse our products and add items to your wishlist</p>
        <Button onClick={() => router.push("/shop")}>Continue Shopping</Button>
      </div>
    )
  }

  const displayProducts = getTabProducts()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">My Wishlist ({wishlistProducts.length})</h2>

        <div className="flex flex-wrap gap-2">
          {/* Sort dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortOption("dateAdded")}>Date Added</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("priceLow")}>Price: Low to High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("priceHigh")}>Price: High to Low</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("nameAZ")}>Name: A to Z</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("nameZA")}>Name: Z to A</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <Filter className="h-3.5 w-3.5 mr-1.5" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterCategory("all")}>All Categories</DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem key={category} onClick={() => setFilterCategory(category)}>
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Create collection button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <FolderPlus className="h-3.5 w-3.5 mr-1.5" />
                New Collection
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Collection</DialogTitle>
                <DialogDescription>Create a new collection to organize your wishlist items</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="collection-name">Collection Name</Label>
                  <Input
                    id="collection-name"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="e.g., Summer Favorites"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={createCollection}>Create Collection</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Add to collection button (only shown when items are selected) */}
          {selectedProductIds.length > 0 && (
            <Dialog open={isAddingToCollection} onOpenChange={setIsAddingToCollection}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8">
                  <Folder className="h-3.5 w-3.5 mr-1.5" />
                  Add to Collection ({selectedProductIds.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add to Collection</DialogTitle>
                  <DialogDescription>Choose a collection to add the selected items</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {collections.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No collections yet. Create one first.</p>
                  ) : (
                    <div className="grid gap-2">
                      <Label htmlFor="collection-select">Select Collection</Label>
                      <select
                        id="collection-select"
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        value={targetCollectionId}
                        onChange={(e) => setTargetCollectionId(e.target.value)}
                      >
                        <option value="">Select a collection</option>
                        {collections.map((collection) => (
                          <option key={collection.id} value={collection.id}>
                            {collection.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button onClick={addToCollection} disabled={!targetCollectionId || collections.length === 0}>
                    Add to Collection
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Collection tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full overflow-x-auto flex-nowrap justify-start h-auto p-0 bg-transparent">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-3 py-1 text-sm"
          >
            All Items
          </TabsTrigger>
          {collections.map((collection) => (
            <TabsTrigger
              key={collection.id}
              value={collection.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-3 py-1 text-sm"
            >
              {collection.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {displayProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No items in this collection</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {displayProducts.map((product) => (
                <div key={product.id} className="relative group">
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          removeFromWishlist(product.id)
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="default"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          addToCart(product)
                        }}
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div
                    className="absolute top-2 left-2 z-10"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleProductSelection(product.id)
                    }}
                  >
                    <div
                      className={`h-5 w-5 rounded border ${
                        selectedProductIds.includes(product.id)
                          ? "bg-primary border-primary"
                          : "bg-background border-input"
                      } flex items-center justify-center cursor-pointer`}
                    >
                      {selectedProductIds.includes(product.id) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary-foreground"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </div>
                  </div>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

