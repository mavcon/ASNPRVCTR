import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserRole = "Super-Admin" | "Admin" | "Artist" | "Customer"
export type UserStatus = "Active" | "Inactive" | "Suspended" | "Pending"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  joinDate: string
  verifiedEmail: boolean
  lastLogin?: string
  avatar?: string

  // Customer specific fields
  totalOrders?: number
  totalSpent?: number
  addresses?: Address[]
  paymentMethods?: PaymentMethod[]
  wishlist?: string[] // Product IDs

  // Artist specific fields
  productsCreated?: number
  totalSales?: number
  bio?: string
  socialLinks?: SocialLinks

  // Admin specific fields
  permissions?: string[]

  [key: string]: any // Allow additional properties
}

export interface Address {
  id: string
  type: "billing" | "shipping"
  isDefault: boolean
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
}

export interface PaymentMethod {
  id: string
  type: "credit_card" | "paypal" | "other"
  isDefault: boolean
  lastFour?: string
  cardType?: string
  expiryDate?: string
  nickname?: string
}

export interface SocialLinks {
  website?: string
  instagram?: string
  twitter?: string
  facebook?: string
  pinterest?: string
}

interface UserState {
  currentUser: User | null
  users: User[]
  setCurrentUser: (user: User | null) => void
  addUser: (user: User) => void
  updateUser: (user: User) => void
  deleteUser: (id: string) => void
  getUserById: (id: string) => User | undefined
  getUsersByRole: (role: UserRole) => User[]
  getUsersByStatus: (status: UserStatus) => User[]
}

// Sample users data
const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2023-01-15",
    verifiedEmail: true,
    lastLogin: "2023-05-21",
    totalOrders: 12,
    totalSpent: 1245.67,
    addresses: [],
    paymentMethods: [],
    wishlist: [],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Customer",
    status: "Active",
    joinDate: "2023-02-20",
    verifiedEmail: true,
    lastLogin: "2023-05-20",
    totalOrders: 8,
    totalSpent: 876.5,
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "Admin",
    status: "Active",
    joinDate: "2023-03-10",
    verifiedEmail: true,
    lastLogin: "2023-05-21",
    permissions: ["manage_products", "manage_orders", "manage_users"],
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Artist",
    status: "Active",
    joinDate: "2023-04-05",
    verifiedEmail: true,
    lastLogin: "2023-05-15",
    productsCreated: 24,
    totalSales: 4567.89,
    bio: "Contemporary artist specializing in digital art and mixed media.",
    socialLinks: {
      instagram: "emilydavisart",
      website: "emilydavisart.com",
    },
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "Customer",
    status: "Inactive",
    joinDate: "2023-05-12",
    verifiedEmail: false,
    lastLogin: "2023-05-10",
    totalOrders: 3,
    totalSpent: 129.99,
  },
  {
    id: "6",
    name: "Sarah Thompson",
    email: "sarah.thompson@example.com",
    role: "Super-Admin",
    status: "Active",
    joinDate: "2022-10-05",
    verifiedEmail: true,
    lastLogin: "2023-05-21",
    permissions: ["all"],
  },
]

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: sampleUsers,

      setCurrentUser: (user) => set({ currentUser: user }),

      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),

      updateUser: (updatedUser) =>
        set((state) => ({
          users: state.users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
        })),

      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),

      getUserById: (id) => {
        return get().users.find((user) => user.id === id)
      },

      getUsersByRole: (role) => {
        return get().users.filter((user) => user.role === role)
      },

      getUsersByStatus: (status) => {
        return get().users.filter((user) => user.status === status)
      },
    }),
    {
      name: "asnprvctr-user-store",
    },
  ),
)

