"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SidebarLayoutProps {
  children: React.ReactNode
  sidebarContent: React.ReactNode
  defaultCollapsed?: boolean
}

export function SidebarLayout({ children, sidebarContent, defaultCollapsed = false }: SidebarLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "relative flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[60px]" : "w-[240px]",
        )}
      >
        <div className="flex flex-1 flex-col overflow-y-auto">
          {/* Pass isCollapsed to the sidebar content */}
          {typeof sidebarContent === "function" ? sidebarContent({ isCollapsed }) : sidebarContent}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-3 h-6 w-6 rounded-full border bg-background"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-y-auto">{children}</div>
    </div>
  )
}

