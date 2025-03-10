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
  totalSpent?: number
  lastOrder?: string
  addresses?: Address[]
  paymentMethods?: PaymentMethod[]
  wishlist?: string[]
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

interface UserState {
  currentUser: User | null
  users: User[]
  isInitialized: boolean
  setCurrentUser: (user: User | null) => void
  addUser: (user: User) => void
  updateUser: (userData: Partial<User>) => void
  deleteUser: (id: string) => void
  canAccessRoute: (pathname: string) => boolean
  logout: () => void
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [],
      isInitialized: true,
      setCurrentUser: (user) => set({ currentUser: user }),
      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),
      updateUser: (userData) =>
        set((state) => ({
          users: state.users.map((user) => (user.id === userData.id ? { ...user, ...userData } : user)),
          currentUser:
            state.currentUser?.id === userData.id ? { ...state.currentUser, ...userData } : state.currentUser,
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
          currentUser: state.currentUser?.id === id ? null : state.currentUser,
        })),
      canAccessRoute: (pathname) => {
        const user = get().currentUser
        if (!user) return false

        const role = user.role.toLowerCase()

        if (pathname.startsWith("/dashboard") && (role === "admin" || role === "super-admin")) return true
        if (pathname.startsWith("/super-admin") && role === "super-admin") return true
        if (pathname.startsWith("/artist") && role === "artist") return true
        if (pathname.startsWith("/account") && role === "customer") return true

        return false
      },
      logout: () => set({ currentUser: null }),
    }),
    {
      name: "asnprvctr-user-store",
    },
  ),
)

export const useIsUserStoreInitialized = () => {
  const isInitialized = useUserStore((state) => state.isInitialized)
  return isInitialized
}

export { useUserStore }
export type { UserRole }
export type { User }

