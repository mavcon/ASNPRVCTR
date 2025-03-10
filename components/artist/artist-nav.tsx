"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Image, Settings, ShoppingCart, Users, Wallet, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useLogout } from "@/lib/auth-utils"

interface ArtistNavProps extends React.HTMLAttributes<HTMLElement> {}

export function ArtistNav({ className, ...props }: ArtistNavProps) {
  const pathname = usePathname()
  const logout = useLogout()

  const routes = [
    {
      href: "/artist",
      label: "Overview",
      icon: BarChart3,
    },
    {
      href: "/artist/artworks",
      label: "Artworks",
      icon: Image,
    },
    {
      href: "/artist/orders",
      label: "Orders",
      icon: ShoppingCart,
    },
    {
      href: "/artist/earnings",
      label: "Earnings",
      icon: Wallet,
    },
    {
      href: "/artist/customers",
      label: "Customers",
      icon: Users,
    },
    {
      href: "/artist/settings",
      label: "Settings",
      icon: Settings,
    },
  ]

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      <div className="py-2">
        <h2 className="px-2 text-lg font-semibold tracking-tight">Artist Dashboard</h2>
        <p className="px-2 text-sm text-muted-foreground">Manage your artworks and sales</p>
      </div>
      <Separator className="my-2" />
      {routes.map((route) => (
        <Button
          key={route.href}
          variant={pathname === route.href ? "secondary" : "ghost"}
          className={cn(
            "justify-start",
            pathname === route.href
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              : "hover:bg-transparent hover:underline",
          )}
          asChild
        >
          <Link href={route.href}>
            <route.icon className="mr-2 h-4 w-4" />
            {route.label}
          </Link>
        </Button>
      ))}
      <Button
        variant="ghost"
        className="justify-start text-red-600 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/20"
        onClick={logout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </Button>
    </nav>
  )
}

