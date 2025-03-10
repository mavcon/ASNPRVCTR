// A simple store to manage products across the application
import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define the product type
export interface Product {
  id: string
  name: string
  sku: string
  skuPrefix?: string
  category: string
  subcategory: string
  price: number
  salePrice: number | null
  stock: Record<string, number>
  totalStock: number
  status: string
  featured: boolean
  images: string[]
  colors: string[]
  sizes: string[]
  material: string
  description: string
  createdAt: string
  updatedAt?: string
  variants?: Array<{
    color: string
    size: string
    stock: number
    sku: string
  }>
  tags?: string // Added tags field
  [key: string]: any // Allow additional properties
}

// Define the store state
interface StoreState {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  getProduct: (id: string) => Product | undefined
  getActiveProducts: () => Product[]
  searchProducts: (query: string, category?: string) => Product[]
  getFeaturedProducts: () => Product[]
  getSaleProducts: () => Product[]
  getOutOfStockProducts: () => Product[]
}

// Create the store
export const useProductStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: [
        {
          id: "1",
          name: "Classic Cotton T-Shirt",
          sku: "TS-001-BLK",
          category: "Men's Clothing",
          subcategory: "T-Shirts",
          price: 29.99,
          salePrice: null,
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
          images: ["/placeholder.svg?height=300&width=300"],
          colors: ["Black", "White"],
          sizes: ["S", "M", "L", "XL"],
          material: "100% Cotton",
          description: "High-quality cotton t-shirt with a modern fit.",
          createdAt: "2023-05-15",
          tags: "tshirt, cotton, classic", // Added tags
        },
        {
          id: "2",
          name: "Slim Fit Jeans",
          sku: "JN-002-BLU",
          category: "Men's Clothing",
          subcategory: "Jeans",
          price: 59.99,
          salePrice: 49.99,
          stock: {
            "30-Blue": 15,
            "32-Blue": 20,
            "34-Blue": 25,
            "36-Blue": 10,
            "30-Black": 15,
            "32-Black": 20,
            "34-Black": 25,
            "36-Black": 10,
          },
          totalStock: 140,
          status: "Active",
          featured: false,
          images: ["/placeholder.svg?height=300&width=300"],
          colors: ["Blue", "Black"],
          sizes: ["30", "32", "34", "36"],
          material: "98% Cotton, 2% Elastane",
          description: "Comfortable slim fit jeans with a modern look.",
          createdAt: "2023-05-16",
          tags: "jeans, slim fit, denim", // Added tags
        },
        {
          id: "3",
          name: "Casual Hoodie",
          sku: "HD-003-GRY",
          category: "Unisex",
          subcategory: "Hoodies",
          price: 49.99,
          salePrice: null,
          stock: {
            "S-Grey": 20,
            "M-Grey": 25,
            "L-Grey": 30,
            "XL-Grey": 15,
            "S-Navy": 20,
            "M-Navy": 25,
            "L-Navy": 30,
            "XL-Navy": 15,
          },
          totalStock: 180,
          status: "Active",
          featured: true,
          images: ["/placeholder.svg?height=300&width=300"],
          colors: ["Grey", "Navy"],
          sizes: ["S", "M", "L", "XL"],
          material: "80% Cotton, 20% Polyester",
          description: "Warm and comfortable hoodie perfect for casual wear.",
          createdAt: "2023-05-17",
          tags: "hoodie, casual, warm", // Added tags
        },
        {
          id: "4",
          name: "Summer Dress",
          sku: "DR-004-FLR",
          category: "Women's Clothing",
          subcategory: "Dresses",
          price: 79.99,
          salePrice: 59.99,
          stock: {
            "XS-Floral": 15,
            "S-Floral": 20,
            "M-Floral": 25,
            "L-Floral": 15,
            "XS-Blue": 15,
            "S-Blue": 20,
            "M-Blue": 25,
            "L-Blue": 15,
          },
          totalStock: 150,
          status: "Active",
          featured: true,
          images: ["/placeholder.svg?height=300&width=300"],
          colors: ["Floral", "Blue"],
          sizes: ["XS", "S", "M", "L"],
          material: "100% Rayon",
          description: "Light and flowy summer dress in beautiful patterns.",
          createdAt: "2023-05-18",
          tags: "dress, summer, floral", // Added tags
        },
      ],

      addProduct: (product) => {
        set((state) => ({
          products: [product, ...state.products],
        }))
      },

      updateProduct: (updatedProduct) => {
        set((state) => ({
          products: state.products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)),
        }))
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }))
      },

      getProduct: (id) => {
        return get().products.find((p) => p.id === id)
      },

      getActiveProducts: () => {
        return get().products.filter((p) => p.status === "Active" && p.totalStock > 0)
      },

      searchProducts: (query, category) => {
        const products = get().getActiveProducts()
        return products.filter((product) => {
          // Search in multiple fields
          const searchFields = [
            product.name,
            product.description,
            product.sku,
            product.category,
            product.subcategory,
            product.tags,
          ]

          const matchesQuery = query
            ? searchFields.some((field) => field && field.toLowerCase().includes(query.toLowerCase()))
            : true

          const matchesCategory = category && category !== "all" ? product.category === category : true

          return matchesQuery && matchesCategory
        })
      },
      getFeaturedProducts: () => {
        return get().products.filter((p) => p.featured === true && p.status === "Active" && p.totalStock > 0)
      },
      getSaleProducts: () => {
        return get().products.filter((p) => p.salePrice !== null && p.status === "Active" && p.totalStock > 0)
      },
      getOutOfStockProducts: () => {
        return get().products.filter((p) => p.totalStock === 0 || p.status === "Out of Stock")
      },
    }),
    {
      name: "asnprvctr-product-store",
    },
  ),
)

