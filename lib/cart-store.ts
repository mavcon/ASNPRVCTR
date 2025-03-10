import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "./store"

export interface CartItem {
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  color: string
  size: string
  sku: string
}

interface CartStore {
  items: CartItem[]
  totalItems: () => number
  calculateSubtotal: () => number
  addItem: (product: Product, quantity?: number, color?: string, size?: string) => void
  removeItem: (sku: string) => void
  updateQuantity: (sku: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
      calculateSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      addItem: (product, quantity = 1, color, size) => {
        const { items } = get()

        // Check if product is a full Product object or an OrderItem
        const isOrderItem = !product.colors && !product.sizes

        // Handle different product structures
        let selectedColor, selectedSize, sku, price

        if (isOrderItem) {
          // It's an OrderItem from previous order
          selectedColor = product.color || ""
          selectedSize = product.size || ""
          sku = product.sku
          price = product.price
        } else {
          // It's a regular Product
          selectedColor = color || product.colors[0]
          selectedSize = size || product.sizes[0]
          sku = `${product.skuPrefix}-${selectedColor.substring(0, 3).toUpperCase()}-${selectedSize}`
          price = product.salePrice || product.price
        }

        // Check if item already exists in cart
        const existingItemIndex = items.findIndex((item) => item.sku === sku)

        if (existingItemIndex >= 0) {
          // Update quantity if item exists
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += quantity

          set({
            items: updatedItems,
          })
        } else {
          // Add new item
          const newItem: CartItem = {
            productId: product.id || product.productId,
            name: product.name,
            price: price,
            image: isOrderItem ? product.image : product.images[0] || "/placeholder.svg",
            quantity,
            color: selectedColor,
            size: selectedSize,
            sku,
          }

          set({
            items: [...items, newItem],
          })
        }
      },

      removeItem: (sku) => {
        const { items } = get()
        const itemToRemove = items.find((item) => item.sku === sku)

        if (itemToRemove) {
          set({
            items: items.filter((item) => item.sku !== sku),
          })
        }
      },

      updateQuantity: (sku, quantity) => {
        if (quantity < 1) return

        const { items } = get()
        const itemIndex = items.findIndex((item) => item.sku === sku)

        if (itemIndex >= 0) {
          const item = items[itemIndex]
          const quantityDiff = quantity - item.quantity
          const updatedItems = [...items]
          updatedItems[itemIndex].quantity = quantity

          set({
            items: updatedItems,
          })
        }
      },

      clearCart: () => {
        set({
          items: [],
        })
      },
    }),
    {
      name: "asnprvctr-cart-store",
    },
  ),
)

