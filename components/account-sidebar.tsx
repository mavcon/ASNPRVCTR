"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { User, ShoppingBag, CreditCard, Settings, Heart } from "lucide-react"

export function AccountSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/account",
      label: "Dashboard",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      href: "/account/orders",
      label: "Orders",
      icon: <ShoppingBag className="mr-2 h-4 w-4" />,
    },
    {
      href: "/account/payment",
      label: "Payment Methods",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      href: "/account/wishlist",
      label: "Wishlist",
      icon: <Heart className="mr-2 h-4 w-4" />,
    },
    {
      href: "/account/settings",
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className="flex flex-col space-y-2">
      {routes.map((route) => (
        <Button
          key={route.href}
          variant={pathname === route.href ? "default" : "ghost"}
          className={cn(
            "justify-start",
            pathname === route.href ? "bg-primary text-primary-foreground" : "text-muted-foreground",
          )}
          asChild
        >
          <Link href={route.href}>
            {route.icon}
            {route.label}
          </Link>
        </Button>
      ))}
    </nav>
  )
}

