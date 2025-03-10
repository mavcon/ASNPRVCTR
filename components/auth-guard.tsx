"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useUserStore } from "@/lib/user-store"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: string | string[]
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const currentUser = useUserStore((state) => state.currentUser)
  const isInitialized = useUserStore((state) => state.isInitialized)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Wait for user store to initialize
    if (!isInitialized) {
      return
    }

    // Check if user is logged in
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      })

      router.push(`/login?redirect=${encodeURIComponent(pathname)}`)
      return
    }

    // Check if user has required role
    if (requiredRole) {
      const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]

      // Case-insensitive role comparison
      const userRole = currentUser.role.toLowerCase()
      const normalizedRoles = roles.map((r) => r.toLowerCase())

      if (!normalizedRoles.includes(userRole)) {
        toast({
          title: "Access denied",
          description: "You don't have permission to access this page",
          variant: "destructive",
        })

        // Redirect based on user role
        if (currentUser.role === "Customer") {
          router.push("/account/dashboard")
        } else if (currentUser.role === "Artist") {
          router.push("/artist")
        } else if (currentUser.role === "Admin") {
          router.push("/dashboard")
        } else if (currentUser.role === "Super-Admin") {
          router.push("/super-admin")
        } else {
          router.push("/")
        }
        return
      }

      // User has the required role
      setIsAuthorized(true)
    } else {
      // No role required, just need to be logged in
      setIsAuthorized(true)
    }

    setIsLoading(false)
  }, [currentUser, isInitialized, pathname, requiredRole, router, toast])

  // Show loading state until authorization is checked
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Only render children if authorized
  return isAuthorized ? <>{children}</> : null
}

