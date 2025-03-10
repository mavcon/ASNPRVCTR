"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Palette, ShoppingBag, Settings } from "lucide-react"

export function ArtistSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/artist/dashboard",
      label: "Dashboard",
      icon: <Palette className="mr-2 h-4 w-4" />,
    },
    {
      href: "/artist/artworks",
      label: "My Artworks",
      icon: <Palette className="mr-2 h-4 w-4" />,
    },
    {
      href: "/artist/orders",
      label: "Orders",
      icon: <ShoppingBag className="mr-2 h-4 w-4" />,
    },
    {
      href: "/artist/settings",
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

