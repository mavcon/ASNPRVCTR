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
  LogOutIcon,
  SettingsIcon,
  ShoppingCartIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react"
import { useUserStore } from "@/lib/user-store"

interface SuperAdminNavProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed?: boolean
}

export function SuperAdminNav({ className, isCollapsed, ...props }: SuperAdminNavProps) {
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
      href: "/super-admin",
      icon: HomeIcon,
    },
    {
      title: "Analytics",
      href: "/super-admin/analytics",
      icon: BarChart3Icon,
    },
    {
      title: "Products",
      href: "/super-admin/products",
      icon: BoxIcon,
    },
    {
      title: "Orders",
      href: "/super-admin/orders",
      icon: ShoppingCartIcon,
    },
    {
      title: "Customers",
      href: "/super-admin/customers",
      icon: UsersIcon,
    },
    {
      title: "Categories",
      href: "/super-admin/categories",
      icon: BoxIcon,
    },
    {
      title: "Discounts",
      href: "/super-admin/discounts",
      icon: TagIcon,
    },
    {
      title: "Settings",
      href: "/super-admin/settings",
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

