"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useUserStore } from "@/lib/user-store"

interface WishlistButtonProps {
  productId: string
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function WishlistButton({ productId, className, variant = "ghost", size = "icon" }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const currentUser = useUserStore((state) => state.currentUser)
  const updateUser = useUserStore((state) => state.updateUser)

  // Check if product is in wishlist
  useEffect(() => {
    if (currentUser && currentUser.wishlist) {
      setIsInWishlist(currentUser.wishlist.includes(productId))
    }
  }, [currentUser, productId])

  const toggleWishlist = () => {
    if (!currentUser) {
      // Store the product ID in session storage to add after login
      sessionStorage.setItem("pendingWishlistItem", productId)
      setShowLoginDialog(true)
      return
    }

    // User is logged in, handle wishlist toggle
    const newWishlist = currentUser.wishlist || []

    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = newWishlist.filter((id) => id !== productId)
      updateUser({
        ...currentUser,
        wishlist: updatedWishlist,
      })

      toast({
        title: "Removed from wishlist",
        description: "The item has been removed from your wishlist",
      })

      setIsInWishlist(false)
    } else {
      // Add to wishlist
      const updatedWishlist = [...newWishlist, productId]
      updateUser({
        ...currentUser,
        wishlist: updatedWishlist,
      })

      toast({
        title: "Added to wishlist",
        description: "The item has been added to your wishlist",
      })

      setIsInWishlist(true)
    }
  }

  const handleLogin = () => {
    router.push("/login?redirect=wishlist")
    setShowLoginDialog(false)
  }

  const handleRegister = () => {
    router.push("/register?redirect=wishlist")
    setShowLoginDialog(false)
  }

  return (
    <>
      <Button
        onClick={toggleWishlist}
        variant={variant}
        size={size}
        className={className}
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={`h-[1.2rem] w-[1.2rem] ${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />
      </Button>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sign in required</DialogTitle>
            <DialogDescription>You need to be signed in to save items to your wishlist.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={handleRegister} className="w-full sm:w-auto">
              Create account
            </Button>
            <Button onClick={handleLogin} className="w-full sm:w-auto">
              Sign in
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

