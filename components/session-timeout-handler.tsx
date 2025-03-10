"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useUserStore } from "@/lib/user-store"
import { useLogout } from "@/lib/auth-utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

// Session timeout in milliseconds (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000
// Warning before timeout (1 minute before)
const WARNING_BEFORE_TIMEOUT = 1 * 60 * 1000

export function SessionTimeoutHandler() {
  const pathname = usePathname()
  const currentUser = useUserStore((state) => state.currentUser)
  const logout = useLogout()
  const [lastActivity, setLastActivity] = useState<number>(Date.now())
  const [showWarning, setShowWarning] = useState(false)

  // Only track session if user is logged in and not on public pages
  const isAuthenticatedRoute =
    currentUser &&
    !pathname.startsWith("/login") &&
    !pathname.startsWith("/register") &&
    pathname !== "/" &&
    !pathname.startsWith("/shop") &&
    !pathname.startsWith("/product")

  // Reset activity timer on user interaction
  const resetActivityTimer = () => {
    setLastActivity(Date.now())
    setShowWarning(false)
  }

  // Add event listeners for user activity
  useEffect(() => {
    if (!isAuthenticatedRoute) return

    const handleActivity = () => {
      resetActivityTimer()
    }

    // Track various user activities
    window.addEventListener("mousemove", handleActivity)
    window.addEventListener("keypress", handleActivity)
    window.addEventListener("click", handleActivity)
    window.addEventListener("scroll", handleActivity)

    return () => {
      window.removeEventListener("mousemove", handleActivity)
      window.removeEventListener("keypress", handleActivity)
      window.removeEventListener("click", handleActivity)
      window.removeEventListener("scroll", handleActivity)
    }
  }, [isAuthenticatedRoute])

  // Check for session timeout
  useEffect(() => {
    if (!isAuthenticatedRoute) return

    const interval = setInterval(() => {
      const now = Date.now()
      const timeSinceLastActivity = now - lastActivity

      // Show warning before timeout
      if (
        timeSinceLastActivity >= SESSION_TIMEOUT - WARNING_BEFORE_TIMEOUT &&
        timeSinceLastActivity < SESSION_TIMEOUT &&
        !showWarning
      ) {
        setShowWarning(true)
      }

      // Log out after timeout
      if (timeSinceLastActivity >= SESSION_TIMEOUT) {
        logout()
        clearInterval(interval)
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [isAuthenticatedRoute, lastActivity, logout, showWarning])

  if (!showWarning) return null

  return (
    <Dialog open={showWarning} onOpenChange={setShowWarning}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Session Timeout Warning</DialogTitle>
          <DialogDescription>
            Your session is about to expire due to inactivity. You will be automatically logged out in less than a
            minute.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={logout}>
            Log out now
          </Button>
          <Button onClick={resetActivityTimer}>Stay logged in</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

