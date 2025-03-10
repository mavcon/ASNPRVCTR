import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProductReviews } from "@/components/artist/product-reviews"
import { ProductSalesChart } from "@/components/artist/product-sales-chart"
import { ArrowLeft, Star, ShoppingCart, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ArtistProductDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the product data based on the ID
  const product = {
    id: params.id,
    name: "Abstract Painting - Blue Horizon",
    description:
      "A stunning abstract painting featuring shades of blue that evoke the feeling of staring at the horizon over the ocean. Created with acrylic on canvas.",
    price: 129,
    inventory: 1,
    category: "Painting",
    status: "active",
    createdAt: "2023-05-12",
    dimensions: '24" x 36"',
    medium: "Acrylic on Canvas",
    totalSales: 129,
    totalRevenue: 16641,
    averageRating: 4.8,
    reviewCount: 42,
    conversionRate: 7.5,
    viewCount: 1720,
    imageUrl: "/placeholder.svg?height=400&width=400",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/artist/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card>
            <CardContent className="p-0">
              <img
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-auto rounded-t-lg"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-green-500/20 text-green-700 dark:text-green-400">
                    Active
                  </Badge>
                  <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                </div>
                <p className="mt-4">{product.description}</p>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Price</p>
                    <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Inventory</p>
                    <p className="text-lg font-bold">{product.inventory} available</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Category</p>
                    <p className="text-lg font-bold">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Created</p>
                    <p className="text-lg font-bold">{product.createdAt}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Dimensions</p>
                    <p className="text-lg font-bold">{product.dimensions}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Medium</p>
                    <p className="text-lg font-bold">{product.medium}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{product.totalSales}</div>
                <p className="text-xs text-muted-foreground">+12 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(product.totalRevenue / 100).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">+$1,548 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{product.averageRating}/5</div>
                <p className="text-xs text-muted-foreground">From {product.reviewCount} reviews</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{product.conversionRate}%</div>
                <p className="text-xs text-muted-foreground">{product.viewCount} page views</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="sales" className="space-y-4">
            <TabsList>
              <TabsTrigger value="sales">Sales History</TabsTrigger>
              <TabsTrigger value="reviews">Customer Reviews</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="sales" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sales History</CardTitle>
                  <CardDescription>Monthly sales performance for this product</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ProductSalesChart productId={product.id} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>What customers are saying about your product</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProductReviews productId={product.id} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Analytics</CardTitle>
                  <CardDescription>Detailed performance metrics for this product</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Customer Demographics</h3>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Age Groups</p>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>18-24</span>
                              <span>15%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "15%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>25-34</span>
                              <span>42%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "42%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>35-44</span>
                              <span>28%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "28%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>45+</span>
                              <span>15%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "15%" }}></div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Gender</p>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>Female</span>
                              <span>58%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "58%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>Male</span>
                              <span>39%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "39%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>Other</span>
                              <span>3%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "3%" }}></div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Location</p>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>United States</span>
                              <span>65%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "65%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>Europe</span>
                              <span>22%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "22%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>Asia</span>
                              <span>8%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "8%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>Other</span>
                              <span>5%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "5%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Purchase Patterns</h3>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Time to Purchase</p>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>First visit</span>
                              <span>32%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "32%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>Within 24 hours</span>
                              <span>28%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "28%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>Within a week</span>
                              <span>25%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "25%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>Longer</span>
                              <span>15%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "15%" }}></div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">Traffic Sources</p>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>Direct</span>
                              <span>45%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "45%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>Social Media</span>
                              <span>30%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "30%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>Search</span>
                              <span>20%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "20%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-sm">
                              <span>Referral</span>
                              <span>5%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="bg-primary h-full rounded-full" style={{ width: "5%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

