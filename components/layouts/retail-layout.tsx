import type React from "react"
import { ScrollToTop } from "@/components/scroll-to-top"

export function RetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ScrollToTop />
      {/* Footer is now in the root layout */}
    </>
  )
}

