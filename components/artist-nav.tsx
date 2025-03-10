"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  BarChart3Icon,
  BoxIcon,
  HomeIcon,
  ImageIcon,
  LogOutIcon,
  SettingsIcon,
  ShoppingCartIcon,
  TagIcon,
  WalletIcon,
} from "lucide-react"
import { useUserStore } from "@/lib/user-store"

interface ArtistNavProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed?: boolean
}

export function ArtistNav({ className, isCollapsed, ...props }: ArtistNavProps) {
  const pathname = usePathname()
  const logout = useUserStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    // Use the same method as in other components to ensure consistent behavior
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.location.href = "/"
      }, 100)
    }
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/artist",
      icon: HomeIcon,
    },
    {
      title: "Analytics",
      href: "/artist/analytics",
      icon: BarChart3Icon,
    },
    {
      title: "Products",
      href: "/artist/products",
      icon: BoxIcon,
    },
    {
      title: "Orders",
      href: "/artist/orders",
      icon: ShoppingCartIcon,
    },
    {
      title: "Earnings",
      href: "/artist/earnings",
      icon: WalletIcon,
    },
    {
      title: "Gallery",
      href: "/artist/gallery",
      icon: ImageIcon,
    },
    {
      title: "Discounts",
      href: "/artist/discounts",
      icon: TagIcon,
    },
    {
      title: "Settings",
      href: "/artist/settings",
      icon: SettingsIcon,
    },
  ]

  return (
    <nav className={cn("flex flex-col gap-2", className)} {...props}>
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            "justify-start",
            isCollapsed && "h-9 w-9 p-0 justify-center",
          )}
        >
          <item.icon className={cn("h-4 w-4", isCollapsed ? "mr-0" : "mr-2")} />
          {!isCollapsed && <span>{item.title}</span>}
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "justify-start mt-auto text-red-500 hover:text-red-600 hover:bg-red-100/10",
          isCollapsed && "h-9 w-9 p-0 justify-center",
        )}
      >
        <LogOutIcon className={cn("h-4 w-4", isCollapsed ? "mr-0" : "mr-2")} />
        {!isCollapsed && <span>Log out</span>}
      </button>
    </nav>
  )
}

