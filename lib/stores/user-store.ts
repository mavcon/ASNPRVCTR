import { create } from "zustand"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface UserState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
}))

export const useIsUserStoreInitialized = () => {
  return true
}

