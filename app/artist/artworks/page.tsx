import type { Metadata } from "next"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArtworkCard } from "@/components/artist/artwork-card"

export const metadata: Metadata = {
  title: "Artworks | Artist Dashboard",
  description: "Manage your artworks and collections",
}

export default function ArtworksPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Artworks</h2>
        <Button asChild>
          <Link href="/artist/artworks/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Artwork
          </Link>
        </Button>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Artworks</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <ArtworkCard
              title="Abstract Landscape"
              description="Mixed media on canvas"
              imageSrc="/placeholder.svg?height=300&width=300"
              price={299}
              status="published"
            />
            <ArtworkCard
              title="Urban Nightscape"
              description="Acrylic on canvas"
              imageSrc="/placeholder.svg?height=300&width=300"
              price={459}
              status="published"
            />
            <ArtworkCard
              title="Serenity"
              description="Oil on canvas"
              imageSrc="/placeholder.svg?height=300&width=300"
              price={599}
              status="published"
            />
            <ArtworkCard
              title="Coastal Dreams"
              description="Watercolor on paper"
              imageSrc="/placeholder.svg?height=300&width=300"
              price={199}
              status="draft"
            />
            <ArtworkCard
              title="Autumn Reflections"
              description="Oil on canvas"
              imageSrc="/placeholder.svg?height=300&width=300"
              price={699}
              status="published"
            />
            <ArtworkCard
              title="Winter Solitude"
              description="Mixed media on canvas"
              imageSrc="/placeholder.svg?height=300&width=300"
              price={349}
              status="archived"
            />
          </div>
        </TabsContent>
        <TabsContent value="published" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <ArtworkCard
              title="Abstract Landscape"
              description="Mixed media on canvas"
              imageSrc="/placeholder.svg?height=300&width=300"
              price={299}
              status="published"
            />
            <ArtworkCard
              title="Urban Nightscape"
              description="Acrylic on canvas"
              imageSrc="/placeholder.svg?height=300&width=300"
              price={459}
              status="published"
            />
            <ArtworkCard
              title="Serenity"
              description="Oil on canvas"
              imageSrc="/placeholder.svg?height=300&width=300"
              price={599}
              status="published"
            />
            <ArtworkCard
              title="Autumn Reflections"
              description="Oil on canvas"
              imageSrc="/placeholder.svg?height=300&width=300"
              price={699}
              status="published"
            />
          </div>
        </TabsContent>
        <TabsContent value="drafts" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <ArtworkCard
              title="Coastal Dreams"
              description="Watercolor on paper"
              imageSrc="/placeholder.svg?height=300&width=300"
              price={199}
              status="draft"
            />
          </div>
        </TabsContent>
        <TabsContent value="archived" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <ArtworkCard
              title="Winter Solitude"
              description="Mixed media on canvas"
              imageSrc="/placeholder.svg?height=300&width=300"
              price={349}
              status="archived"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

