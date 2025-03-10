"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function RevenueOverview() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="platform">Platform</TabsTrigger>
          <TabsTrigger value="stores">Stores</TabsTrigger>
          <TabsTrigger value="commissions">Commissions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="h-[350px] bg-muted/10 rounded-lg flex items-center justify-center">
            Revenue chart would be displayed here
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="text-xl font-bold">$2.4M</div>
                <p className="text-sm text-muted-foreground">Total Platform Revenue</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-xl font-bold">$15.7M</div>
                <p className="text-sm text-muted-foreground">Gross Merchandise Value</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-xl font-bold">$578K</div>
                <p className="text-sm text-muted-foreground">Commission Revenue</p>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border">
            <div className="p-4 font-medium">Top Revenue Categories</div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Electronics</span>
                  <span>$4.2M</span>
                </div>
                <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
                  <div className="h-full bg-primary w-[65%] rounded-full"></div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Fashion</span>
                  <span>$3.8M</span>
                </div>
                <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
                  <div className="h-full bg-primary w-[58%] rounded-full"></div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Home & Garden</span>
                  <span>$2.5M</span>
                </div>
                <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
                  <div className="h-full bg-primary w-[38%] rounded-full"></div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Beauty & Personal Care</span>
                  <span>$1.9M</span>
                </div>
                <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
                  <div className="h-full bg-primary w-[29%] rounded-full"></div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Sports & Outdoors</span>
                  <span>$1.4M</span>
                </div>
                <div className="h-2 w-full bg-secondary overflow-hidden rounded-full">
                  <div className="h-full bg-primary w-[21%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="platform">
          <div className="h-[400px] bg-muted/10 rounded-lg flex items-center justify-center">
            Platform revenue chart would be displayed here
          </div>
        </TabsContent>

        <TabsContent value="stores">
          <div className="h-[400px] bg-muted/10 rounded-lg flex items-center justify-center">
            Store revenue chart would be displayed here
          </div>
        </TabsContent>

        <TabsContent value="commissions">
          <div className="h-[400px] bg-muted/10 rounded-lg flex items-center justify-center">
            Commission revenue chart would be displayed here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

