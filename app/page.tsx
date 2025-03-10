"use client"

import { useEffect } from "react"
import { FeaturedProducts } from "@/components/featured-products"
import { HeroSection } from "@/components/hero-section"
import { RetailLayout } from "@/components/layouts/retail-layout"

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <RetailLayout>
      <HeroSection />
      <FeaturedProducts />
    </RetailLayout>
  )
}

