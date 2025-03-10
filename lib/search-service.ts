// Dynamic product search service

export type ProductSearchResult = {
  id: string
  name: string
  price: number
  image: string
  slug: string
}

// This would connect to your actual search API in production
export async function searchProducts(query: string): Promise<ProductSearchResult[]> {
  // For now, return mock data
  if (!query || query.trim().length === 0) {
    return []
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock data - would be replaced with actual search API call
  return [
    {
      id: "1",
      name: "Black Abstract Print",
      price: 120,
      image: "/placeholder.svg?height=200&width=200",
      slug: "black-abstract-print",
    },
    {
      id: "2",
      name: "Urban Landscape Series",
      price: 150,
      image: "/placeholder.svg?height=200&width=200",
      slug: "urban-landscape-series",
    },
    {
      id: "3",
      name: "Minimalist Study No. 2",
      price: 95,
      image: "/placeholder.svg?height=200&width=200",
      slug: "minimalist-study-2",
    },
  ].filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
}

