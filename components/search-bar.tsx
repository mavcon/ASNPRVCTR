"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useClickOutside } from "@/hooks/use-click-outside"

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock search results - in a real app, this would come from an API
  const mockSearch = (query: string) => {
    if (!query.trim()) return []

    // Mock products
    const products = [
      {
        id: 1,
        name: "Abstract Painting",
        artist: "Jane Doe",
        price: 299,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 2,
        name: "Landscape Print",
        artist: "John Smith",
        price: 199,
        image: "/placeholder.svg?height=100&width=100",
      },
      { id: 3, name: "Portrait", artist: "Alice Johnson", price: 399, image: "/placeholder.svg?height=100&width=100" },
      {
        id: 4,
        name: "Modern Sculpture",
        artist: "Bob Williams",
        price: 599,
        image: "/placeholder.svg?height=100&width=100",
      },
    ]

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.artist.toLowerCase().includes(query.toLowerCase()),
    )
  }

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    // Debounce search
    const timeoutId = setTimeout(() => {
      setResults(mockSearch(value))
    }, 300)

    return () => clearTimeout(timeoutId)
  }

  // Handle search toggle
  const toggleSearch = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Focus the input when opening
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      // Clear search when closing
      setQuery("")
      setResults([])
    }
  }

  // Close search when clicking outside
  useClickOutside(searchRef, () => {
    if (isOpen) {
      setIsOpen(false)
      setQuery("")
      setResults([])
    }
  })

  // Focus input when search is opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  return (
    <div ref={searchRef} className="relative">
      <div className="flex items-center">
        {isOpen ? (
          <div className="flex items-center animate-in fade-in slide-in-from-right-5 duration-300">
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={handleSearchChange}
                className="w-[200px] md:w-[300px] pr-8 border-none shadow-none focus-visible:ring-1"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full w-8 p-0"
                  onClick={() => setQuery("")}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={toggleSearch} className="ml-1">
              <X className="h-5 w-5" />
              <span className="sr-only">Close search</span>
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="icon" onClick={toggleSearch}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        )}
      </div>

      {/* Search results */}
      {isOpen && query && results.length > 0 && (
        <div className="absolute right-0 top-full mt-2 w-[300px] md:w-[400px] rounded-md border bg-background shadow-md z-50">
          <div className="p-2">
            <h3 className="text-sm font-medium p-2">Search Results</h3>
            <div className="max-h-[400px] overflow-auto">
              {results.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center p-2 hover:bg-muted rounded-md cursor-pointer"
                  onClick={() => {
                    // In a real app, this would navigate to the product page
                    setIsOpen(false)
                    setQuery("")
                    setResults([])
                  }}
                >
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-12 w-12 object-cover rounded-md mr-3"
                  />
                  <div>
                    <h4 className="text-sm font-medium">{product.name}</h4>
                    <p className="text-xs text-muted-foreground">{product.artist}</p>
                    <p className="text-xs font-medium">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No results message */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute right-0 top-full mt-2 w-[300px] md:w-[400px] rounded-md border bg-background shadow-md z-50">
          <div className="p-4 text-center">
            <p className="text-sm text-muted-foreground">No products found for "{query}"</p>
          </div>
        </div>
      )}
    </div>
  )
}

