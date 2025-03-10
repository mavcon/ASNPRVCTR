import { create } from "zustand"
import { persist } from "zustand/middleware"

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"
export type PaymentStatus = "paid" | "pending" | "refunded" | "failed"
export type PaymentMethod = "credit_card" | "paypal" | "bank_transfer" | "cash_on_delivery"
export type ShippingMethod = "standard" | "express" | "overnight" | "local_pickup"

export interface OrderItem {
  id: string
  product_id: string
  name: string
  sku: string
  price: number
  quantity: number
  options?: string
  image?: string
}

export interface Address {
  name: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}

export interface Order {
  id: string
  customer: {
    id: string
    name: string
    email: string
    phone?: string
  }
  items: OrderItem[]
  billing_address: Address
  shipping_address: Address
  subtotal: number
  shipping_cost: number
  tax: number
  total: number
  status: OrderStatus
  payment_status: PaymentStatus
  payment_method: PaymentMethod
  shipping_method: ShippingMethod
  tracking_number?: string
  notes?: string
  created_at: string
  updated_at: string
}

interface OrderStore {
  orders: Order[]
  getOrder: (id: string) => Order | undefined
  addOrder: (order: Order) => void
  updateOrder: (id: string, updates: Partial<Order>) => void
  deleteOrder: (id: string) => void
  updateOrderStatus: (id: string, status: OrderStatus) => void
  updatePaymentStatus: (id: string, status: PaymentStatus) => void
  updateTrackingNumber: (id: string, trackingNumber: string) => void
}

// Sample data for initial orders
const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    customer: {
      id: "CUST-101",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
    },
    items: [
      {
        id: "ITEM-001",
        product_id: "PROD-001",
        name: "Premium T-Shirt",
        sku: "TS-001-BLK-L",
        price: 29.99,
        quantity: 2,
        options: "Black / L",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "ITEM-002",
        product_id: "PROD-002",
        name: "Wireless Headphones",
        sku: "HP-002-BLK",
        price: 69.99,
        quantity: 1,
        options: "Black",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    billing_address: {
      name: "John Doe",
      address1: "123 Main St",
      address2: "Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
    },
    shipping_address: {
      name: "John Doe",
      address1: "123 Main St",
      address2: "Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
    },
    subtotal: 129.97,
    shipping_cost: 5.99,
    tax: 10.8,
    total: 146.76,
    status: "delivered",
    payment_status: "paid",
    payment_method: "credit_card",
    shipping_method: "standard",
    tracking_number: "TRK123456789",
    created_at: "2023-05-15",
    updated_at: "2023-05-18",
  },
  {
    id: "ORD-002",
    customer: {
      id: "CUST-102",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 987-6543",
    },
    items: [
      {
        id: "ITEM-003",
        product_id: "PROD-003",
        name: "Slim Fit Jeans",
        sku: "JN-003-BLU-32",
        price: 59.99,
        quantity: 1,
        options: "Blue / 32",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    billing_address: {
      name: "Jane Smith",
      address1: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90001",
      country: "United States",
      phone: "+1 (555) 987-6543",
    },
    shipping_address: {
      name: "Jane Smith",
      address1: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90001",
      country: "United States",
      phone: "+1 (555) 987-6543",
    },
    subtotal: 59.99,
    shipping_cost: 5.99,
    tax: 5.4,
    total: 71.38,
    status: "processing",
    payment_status: "paid",
    payment_method: "paypal",
    shipping_method: "standard",
    created_at: "2023-05-16",
    updated_at: "2023-05-16",
  },
  {
    id: "ORD-003",
    customer: {
      id: "CUST-103",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      phone: "+1 (555) 456-7890",
    },
    items: [
      {
        id: "ITEM-004",
        product_id: "PROD-004",
        name: "Casual Hoodie",
        sku: "HD-004-GRY-XL",
        price: 49.99,
        quantity: 1,
        options: "Gray / XL",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "ITEM-005",
        product_id: "PROD-005",
        name: "Running Shoes",
        sku: "SH-005-BLK-10",
        price: 89.99,
        quantity: 1,
        options: "Black / 10",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    billing_address: {
      name: "Robert Johnson",
      address1: "789 Pine St",
      city: "Chicago",
      state: "IL",
      postalCode: "60007",
      country: "United States",
      phone: "+1 (555) 456-7890",
    },
    shipping_address: {
      name: "Robert Johnson",
      address1: "789 Pine St",
      city: "Chicago",
      state: "IL",
      postalCode: "60007",
      country: "United States",
      phone: "+1 (555) 456-7890",
    },
    subtotal: 139.98,
    shipping_cost: 0,
    tax: 12.6,
    total: 152.58,
    status: "shipped",
    payment_status: "paid",
    payment_method: "credit_card",
    shipping_method: "express",
    tracking_number: "TRK987654321",
    created_at: "2023-05-17",
    updated_at: "2023-05-19",
  },
  {
    id: "ORD-004",
    customer: {
      id: "CUST-104",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 234-5678",
    },
    items: [
      {
        id: "ITEM-006",
        product_id: "PROD-006",
        name: "Summer Dress",
        sku: "DR-006-FLR-S",
        price: 79.99,
        quantity: 1,
        options: "Floral / S",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    billing_address: {
      name: "Emily Davis",
      address1: "321 Maple Rd",
      city: "Miami",
      state: "FL",
      postalCode: "33101",
      country: "United States",
      phone: "+1 (555) 234-5678",
    },
    shipping_address: {
      name: "Emily Davis",
      address1: "321 Maple Rd",
      city: "Miami",
      state: "FL",
      postalCode: "33101",
      country: "United States",
      phone: "+1 (555) 234-5678",
    },
    subtotal: 79.99,
    shipping_cost: 5.99,
    tax: 6.9,
    total: 92.88,
    status: "cancelled",
    payment_status: "refunded",
    payment_method: "credit_card",
    shipping_method: "standard",
    created_at: "2023-05-18",
    updated_at: "2023-05-20",
  },
  {
    id: "ORD-005",
    customer: {
      id: "CUST-105",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      phone: "+1 (555) 876-5432",
    },
    items: [
      {
        id: "ITEM-007",
        product_id: "PROD-007",
        name: "Leather Wallet",
        sku: "WL-007-BRN",
        price: 39.99,
        quantity: 1,
        options: "Brown",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "ITEM-008",
        product_id: "PROD-008",
        name: "Sunglasses",
        sku: "SG-008-BLK",
        price: 59.99,
        quantity: 1,
        options: "Black",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    billing_address: {
      name: "Michael Wilson",
      address1: "654 Cedar Ln",
      city: "Seattle",
      state: "WA",
      postalCode: "98101",
      country: "United States",
      phone: "+1 (555) 876-5432",
    },
    shipping_address: {
      name: "Michael Wilson",
      address1: "654 Cedar Ln",
      city: "Seattle",
      state: "WA",
      postalCode: "98101",
      country: "United States",
      phone: "+1 (555) 876-5432",
    },
    subtotal: 99.98,
    shipping_cost: 5.99,
    tax: 8.5,
    total: 114.47,
    status: "pending",
    payment_status: "pending",
    payment_method: "bank_transfer",
    shipping_method: "standard",
    created_at: "2023-05-19",
    updated_at: "2023-05-19",
  },
  {
    id: "ORD-006",
    customer: {
      id: "CUST-106",
      name: "Sarah Thompson",
      email: "sarah.thompson@example.com",
      phone: "+1 (555) 345-6789",
    },
    items: [
      {
        id: "ITEM-009",
        product_id: "PROD-009",
        name: "Wireless Earbuds",
        sku: "EB-009-WHT",
        price: 129.99,
        quantity: 1,
        options: "White",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    billing_address: {
      name: "Sarah Thompson",
      address1: "987 Birch St",
      city: "Boston",
      state: "MA",
      postalCode: "02108",
      country: "United States",
      phone: "+1 (555) 345-6789",
    },
    shipping_address: {
      name: "Sarah Thompson",
      address1: "987 Birch St",
      city: "Boston",
      state: "MA",
      postalCode: "02108",
      country: "United States",
      phone: "+1 (555) 345-6789",
    },
    subtotal: 129.99,
    shipping_cost: 0,
    tax: 10.4,
    total: 140.39,
    status: "refunded",
    payment_status: "refunded",
    payment_method: "credit_card",
    shipping_method: "express",
    created_at: "2023-05-20",
    updated_at: "2023-05-22",
  },
]

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: sampleOrders,

      getOrder: (id) => {
        return get().orders.find((order) => order.id === id)
      },

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }))
      },

      updateOrder: (id, updates) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, ...updates, updated_at: new Date().toISOString().split("T")[0] } : order,
          ),
        }))
      },

      deleteOrder: (id) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id),
        }))
      },

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  status,
                  updated_at: new Date().toISOString().split("T")[0],
                }
              : order,
          ),
        }))
      },

      updatePaymentStatus: (id, payment_status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  payment_status,
                  updated_at: new Date().toISOString().split("T")[0],
                }
              : order,
          ),
        }))
      },

      updateTrackingNumber: (id, tracking_number) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  tracking_number,
                  updated_at: new Date().toISOString().split("T")[0],
                }
              : order,
          ),
        }))
      },
    }),
    {
      name: "asnprvctr-orders-store",
    },
  ),
)

