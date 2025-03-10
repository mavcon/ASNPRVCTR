import type React from "react"
import { ArtistNav } from "@/components/artist-nav"
import { SidebarLayout } from "@/components/layouts/sidebar-layout"

export default function ArtistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarLayout sidebarContent={<ArtistNav className="p-4" />}>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">{children}</div>
    </SidebarLayout>
  )
}

