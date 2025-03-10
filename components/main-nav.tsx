"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { useUserStore } from "@/lib/user-store"
import { SearchBar } from "@/components/search-bar"
import { UserNav } from "@/components/user-nav"
import { CartButton } from "@/components/cart-button"

export function MainNav() {
  const pathname = usePathname()
  const currentUser = useUserStore((state) => state.currentUser)

  return (
    <div className="flex w-full items-center justify-between">
      {/* LEFT GROUP: Brand logo and navigation links */}
      <div className="flex items-center">
        <Link href="/" prefetch={true} className="flex items-center space-x-2">
          <BrandLogo withLink={false} />
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 ml-6">
          <Link
            href="/about"
            prefetch={true}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/about" ? "text-primary" : "text-muted-foreground",
            )}
          >
            About Us
          </Link>
          <Link
            href="/shop"
            prefetch={true}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/shop" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Catalogue
          </Link>
        </nav>
      </div>

      {/* RIGHT GROUP: Search, Cart, Profile */}
      <div className="flex items-center space-x-4">
        <SearchBar />

        <CartButton />

        {/* ALWAYS use Avatar for logged in users, User icon for guests */}
        {currentUser ? (
          <UserNav />
        ) : (
          <Button variant="ghost" size="icon" asChild>
            <Link href="/login" prefetch={true}>
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}

