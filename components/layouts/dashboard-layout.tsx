import type React from "react"
import { Suspense } from "react"
import { AdminNav } from "@/components/admin-nav"
import { SiteHeader } from "@/components/site-header"
import { MobileNav } from "@/components/mobile-nav"
import { UserNav } from "@/components/user-nav"
import { Toaster } from "@/components/ui/toaster"

interface DashboardLayoutProps {
  children: React.ReactNode
}

/**
 * Generic layout component that can be used for different dashboard types
 * This is used as a base for AdminLayout and SuperAdminLayout
 */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader>
        <MobileNav />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </SiteHeader>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex lg:w-[240px]">
          <AdminNav />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden py-6">
          <Suspense>{children}</Suspense>
        </main>
      </div>
      <Toaster />
    </div>
  )
}

