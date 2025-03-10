"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  Settings,
  CreditCard,
  MessageSquare,
  LayoutDashboard,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLogout } from "@/lib/auth-utils"
import { Button } from "@/components/ui/button"

interface DashboardNavProps {
  userRole?: string
}

export function DashboardNav({ userRole = "admin" }: DashboardNavProps) {
  const pathname = usePathname()
  const logout = useLogout()

  // Define routes based on user role
  const routesByRole = {
    admin: [
      {
        href: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        exact: true,
      },
      {
        href: "/dashboard/products",
        label: "Products",
        icon: Package,
      },
      {
        href: "/dashboard/orders",
        label: "Orders",
        icon: ShoppingCart,
      },
      {
        href: "/dashboard/users",
        label: "Users",
        icon: Users,
      },
      {
        href: "/dashboard/analytics",
        label: "Analytics",
        icon: BarChart3,
      },
      {
        href: "/dashboard/payments",
        label: "Payments",
        icon: CreditCard,
      },
      {
        href: "/dashboard/messages",
        label: "Messages",
        icon: MessageSquare,
      },
      {
        href: "/dashboard/settings",
        label: "Settings",
        icon: Settings,
      },
    ],
    collaborator: [
      {
        href: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        exact: true,
      },
      {
        href: "/dashboard/products",
        label: "Products",
        icon: Package,
      },
      {
        href: "/dashboard/orders",
        label: "Orders",
        icon: ShoppingCart,
      },
      {
        href: "/dashboard/analytics",
        label: "Analytics",
        icon: BarChart3,
      },
      {
        href: "/dashboard/settings",
        label: "Settings",
        icon: Settings,
      },
    ],
    "sub-admin": [
      {
        href: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        exact: true,
      },
      {
        href: "/dashboard/products",
        label: "Products",
        icon: Package,
      },
      {
        href: "/dashboard/orders",
        label: "Orders",
        icon: ShoppingCart,
      },
      {
        href: "/dashboard/users",
        label: "Users",
        icon: Users,
      },
      {
        href: "/dashboard/settings",
        label: "Settings",
        icon: Settings,
      },
    ],
  }

  // Get routes for the current user role, default to admin if role not found
  const routes = routesByRole[userRole as keyof typeof routesByRole] || routesByRole.admin

  return (
    <nav className="grid items-start gap-2 py-4">
      {routes.map((route) => {
        const isActive = route.exact ? pathname === route.href : pathname.startsWith(route.href)

        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent" : "transparent",
            )}
          >
            <route.icon className="mr-2 h-4 w-4" />
            <span>{route.label}</span>
          </Link>
        )
      })}
      <Button
        variant="ghost"
        className="justify-start text-red-600 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/20 px-3 py-2 text-sm font-medium"
        onClick={logout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </Button>
    </nav>
  )
}

