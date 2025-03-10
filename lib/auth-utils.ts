"use client"

import { useUserStore } from "./user-store"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

/**
 * Logs out the current user by clearing all user-related data
 */
export function logoutUser() {
  // Clear the current user in the store
  useUserStore.getState().setCurrentUser(null)

  // Clear any cart items and other user-specific data
  if (typeof window !== "undefined") {
    // Clear relevant localStorage items
    localStorage.removeItem("asnprvctr-cart-store")
    localStorage.removeItem("asnprvctr-wishlist")
    localStorage.removeItem("asnprvctr-recent-viewed")

    // Clear any session storage items
    sessionStorage.removeItem("pendingWishlistItem")
    sessionStorage.removeItem("checkout-data")

    // Clear any auth-related cookies
    document.cookie = "asnprvctr-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  }
}

/**
 * React hook for logout functionality
 * @returns A function that can be called to log the user out
 */
export function useLogout() {
  const router = useRouter()
  const { toast } = useToast()

  return () => {
    // Call the logout function
    logoutUser()

    // Show logout confirmation
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    })

    // Redirect to home page immediately without refresh
    router.push("/")

    // Remove the page refresh which was causing the white screen
    // The router.push should be sufficient for navigation
  }
}

