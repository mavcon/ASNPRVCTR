"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserStore } from "@/lib/user-store"

export function LoginHandler() {
  const router = useRouter()
  const currentUser = useUserStore((state) => state.currentUser)

  useEffect(() => {
    // If user is logged in, redirect to appropriate dashboard
    if (currentUser) {
      console.log("LoginHandler: User is logged in, redirecting...", currentUser)

      if (currentUser.role === "Super-Admin") {
        router.push("/super-admin")
      } else if (currentUser.role === "Artist") {
        router.push("/artist")
      } else if (currentUser.role === "Admin") {
        router.push("/admin")
      } else if (currentUser.role === "Customer") {
        router.push("/account/dashboard")
      }
    }
  }, [currentUser, router])

  return null
}

