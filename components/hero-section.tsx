import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "@/components/brand-logo"

export function HeroSection() {
  return (
    <section className="w-full py-8 md:py-12 lg:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <BrandLogo variant="heading" />
              <p className="max-w-[600px] text-muted-foreground text-base md:text-xl tracking-wide">
                Your one-stop shop for premium products with secure shopping and fast delivery.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/catalogue">
                <Button size="lg" className="tracking-wider w-full sm:w-auto">
                  Shop Now
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="tracking-wider w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center mt-8 lg:mt-0">
            <div className="relative h-[250px] sm:h-[300px] w-full md:h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/20 rounded-sm opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-lg md:text-xl font-bold tracking-wider">Featured Image</p>
                  <p className="text-muted-foreground tracking-wide">Product showcase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

