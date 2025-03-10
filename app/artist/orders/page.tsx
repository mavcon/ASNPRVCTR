import type { Metadata } from "next"
import { ArrowDownToLine, ArrowUpCircle, Clock, Package, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArtistOrdersTable } from "@/components/artist/orders-table"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Orders | Artist Dashboard",
  description: "Manage and track orders for your artworks",
}

export default function OrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">122</div>
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search orders..." className="max-w-sm" />
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">
            Pending
            <Badge variant="secondary" className="ml-2">
              5
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <ArtistOrdersTable />
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <ArtistOrdersTable status="pending" />
        </TabsContent>
        <TabsContent value="processing" className="space-y-4">
          <ArtistOrdersTable status="processing" />
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <ArtistOrdersTable status="completed" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

