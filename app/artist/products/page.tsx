import { ArtistProductList } from "@/components/artist/artist-product-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function ArtistProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Products</h2>
        <p className="text-muted-foreground">View and manage products assigned to you by administrators.</p>
      </div>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Product Management</AlertTitle>
        <AlertDescription>
          As an artist, you can view your assigned products and their performance. To request changes or new products,
          please contact an administrator.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <ArtistProductList filter="all" />
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <ArtistProductList filter="active" />
        </TabsContent>
        <TabsContent value="draft" className="space-y-4">
          <ArtistProductList filter="draft" />
        </TabsContent>
        <TabsContent value="archived" className="space-y-4">
          <ArtistProductList filter="archived" />
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Product Performance Overview</CardTitle>
          <CardDescription>See how your products are performing in the marketplace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Top Selling Product</p>
              <p className="text-xl font-bold">Abstract Painting - Blue Horizon</p>
              <p className="text-sm text-muted-foreground">129 units sold</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Highest Revenue</p>
              <p className="text-xl font-bold">Sculpture - Bronze Figure</p>
              <p className="text-sm text-muted-foreground">$5,980 total revenue</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Best Conversion Rate</p>
              <p className="text-xl font-bold">Digital Art - Cyberpunk City</p>
              <p className="text-sm text-muted-foreground">8.7% conversion rate</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Highest Rated</p>
              <p className="text-xl font-bold">Portrait Study - The Gaze</p>
              <p className="text-sm text-muted-foreground">4.9/5 average rating</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

