"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

export function CartButton() {
  // Use state to handle hydration mismatch
  const [mounted, setMounted] = useState(false)
  const { totalItems } = useCartStore()

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Only show count after hydration to prevent mismatch
  const count = mounted ? totalItems() : 0

  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingBag className="h-5 w-5" />
        {count > 0 && (
          <Badge
            variant="secondary"
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-bold bg-primary text-primary-foreground"
          >
            {count}
          </Badge>
        )}
        <span className="sr-only">Shopping bag with {count} items</span>
      </Button>
    </Link>
  )
}

