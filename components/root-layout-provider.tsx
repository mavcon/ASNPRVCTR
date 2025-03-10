"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useUserStore, useIsUserStoreInitialized } from "@/lib/user-store"
import { usePathname, useRouter } from "next/navigation"
import { AuthLoading } from "./auth-loading"

interface RootLayoutProviderProps {
  children: React.ReactNode
}

export function RootLayoutProvider({ children }: RootLayoutProviderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const isInitialized = useIsUserStoreInitialized()
  const currentUser = useUserStore((state) => state.currentUser)
  const canAccessRoute = useUserStore((state) => state.canAccessRoute)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Skip auth check for public routes
    const publicRoutes = [
      "/",
      "/login",
      "/register",
      "/forgot-password",
      "/about",
      "/contact",
      "/faq",
      "/terms",
      "/privacy",
      "/cookies",
      "/accessibility",
    ]

    if (
      publicRoutes.some((route) => pathname === route) ||
      pathname.startsWith("/shop") ||
      pathname.startsWith("/product")
    ) {
      setIsLoading(false)
      return
    }

    // Wait for user store to initialize
    if (!isInitialized) {
      return
    }

    // Check if user can access the current route
    if (currentUser) {
      if (!canAccessRoute(pathname)) {
        // Redirect to appropriate page based on role
        switch (currentUser.role) {
          case "Customer":
            router.push("/account/dashboard")
            break
          case "Artist":
            router.push("/artist")
            break
          case "Admin":
            router.push("/dashboard")
            break
          case "Super-Admin":
            router.push("/super-admin")
            break
          default:
            router.push("/")
        }
      }
    } else {
      // Not logged in, check if this is a protected route
      const protectedRoutePatterns = [
        /^\/dashboard(\/.*)?$/,
        /^\/super-admin(\/.*)?$/,
        /^\/artist(\/.*)?$/,
        /^\/account(\/.*)?$/,
      ]

      if (protectedRoutePatterns.some((pattern) => pattern.test(pathname))) {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
      }
    }

    setIsLoading(false)
  }, [pathname, isInitialized, currentUser, canAccessRoute, router])

  if (isLoading) {
    return <AuthLoading />
  }

  return <>{children}</>
}

