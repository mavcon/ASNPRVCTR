"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useClickOutside } from "@/hooks/use-click-outside"

export function SearchBarMobile() {
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useClickOutside(searchRef, () => {
    if (isOpen) setIsOpen(false)
  })

  // Handle ESC key to close search
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }

    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  if (isOpen) {
    return (
      <div ref={searchRef} className="fixed inset-0 z-50 flex items-start justify-center bg-background/95 pt-16 px-4">
        <div className="relative w-full max-w-md">
          <Input type="search" placeholder="Search products..." className="w-full pr-8" autoFocus />
          <Button variant="ghost" size="icon" className="absolute right-0 top-0" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close search</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setIsOpen(true)}>
      <Search className="h-5 w-5" />
      <span className="sr-only">Search</span>
    </Button>
  )
}

