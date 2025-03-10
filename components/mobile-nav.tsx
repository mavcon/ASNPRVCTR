"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { useUserStore } from "@/lib/user-store"
import { BrandLogo } from "@/components/brand-logo"
import { SearchBarMobile } from "@/components/search-bar-mobile"
import { CartButton } from "@/components/cart-button"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const currentUser = useUserStore((state) => state.currentUser)
  const logout = useUserStore((state) => state.logout)

  // Get the correct dashboard link based on user role
  const getDashboardLink = () => {
    if (!currentUser) return "/login"

    switch (currentUser.role) {
      case "Artist":
        return "/artist"
      case "Admin":
        return "/admin"
      case "Super-Admin":
        return "/super-admin"
      default:
        return "/account/dashboard"
    }
  }

  const handleLogout = () => {
    logout()
    setOpen(false)

    // Use the same method as in auth-utils to ensure consistent behavior
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.location.href = "/"
      }, 100)
    }
  }

  return (
    <div className="flex w-full items-center justify-between md:hidden px-4">
      {/* Left: Brand Logo */}
      <a href="/" className="flex-none">
        <BrandLogo withLink={false} />
      </a>

      {/* Right: Navigation Icons */}
      <div className="flex items-center space-x-4">
        <SearchBarMobile />

        <CartButton />

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="mt-6 mb-8">
              <BrandLogo />
            </div>
            <nav className="flex flex-col space-y-4">
              <Link
                href="/shop"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/shop" ? "text-primary" : "text-muted-foreground",
                )}
                onClick={() => setOpen(false)}
              >
                Catalogue
              </Link>
              <Link
                href="/about"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/about" ? "text-primary" : "text-muted-foreground",
                )}
                onClick={() => setOpen(false)}
              >
                About Us
              </Link>

              {currentUser ? (
                <>
                  <Link
                    href={getDashboardLink()}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname.startsWith(getDashboardLink()) ? "text-primary" : "text-muted-foreground",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    Account
                  </Link>
                  <Button
                    variant="ghost"
                    className="justify-start p-0 h-auto text-sm font-medium text-red-600 hover:text-red-700"
                    onClick={handleLogout}
                  >
                    Log out
                  </Button>
                </>
              ) : (
                <Link
                  href="/login"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === "/login" ? "text-primary" : "text-muted-foreground",
                  )}
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

