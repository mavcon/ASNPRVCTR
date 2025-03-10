"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Search, ShoppingBag, Clock, CheckCircle, Truck, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data - would be replaced with actual API call
const mockOrders = [
  {
    id: "ORD-123456",
    date: "2023-11-15",
    status: "Delivered",
    total: 245.5,
    items: 3,
  },
  {
    id: "ORD-123457",
    date: "2023-11-02",
    status: "Processing",
    total: 120.0,
    items: 1,
  },
  {
    id: "ORD-123458",
    date: "2023-10-28",
    status: "Shipped",
    total: 89.99,
    items: 2,
  },
  {
    id: "ORD-123459",
    date: "2023-10-15",
    status: "Delivered",
    total: 175.25,
    items: 4,
  },
  {
    id: "ORD-123460",
    date: "2023-09-30",
    status: "Cancelled",
    total: 65.0,
    items: 1,
  },
]

export default function OrdersPage() {
  const [orders] = useState(mockOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getFilteredOrders = (status: string) => {
    return orders.filter((order) => {
      const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = status === "all" || order.status.toLowerCase() === status.toLowerCase()
      return matchesSearch && matchesStatus
    })
  }

  const allFilteredOrders = getFilteredOrders(statusFilter)
  const processingOrders = orders.filter((order) => order.status === "Processing")
  const shippedOrders = orders.filter((order) => order.status === "Shipped")
  const deliveredOrders = orders.filter((order) => order.status === "Delivered")
  const cancelledOrders = orders.filter((order) => order.status === "Cancelled")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "Shipped":
        return <Truck className="h-5 w-5 text-blue-500" />
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "Cancelled":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Package className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processing":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-950/20">
            {status}
          </Badge>
        )
      case "Shipped":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-50 dark:bg-blue-950/20">
            {status}
          </Badge>
        )
      case "Delivered":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50 dark:bg-green-950/20">
            {status}
          </Badge>
        )
      case "Cancelled":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50 dark:bg-red-950/20">
            {status}
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground">{orders.length} orders</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by order ID..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
          <TabsTrigger value="processing">Processing ({processingOrders.length})</TabsTrigger>
          <TabsTrigger value="shipped">Shipped ({shippedOrders.length})</TabsTrigger>
          <TabsTrigger value="delivered">Delivered ({deliveredOrders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <OrdersList
            orders={allFilteredOrders}
            getStatusIcon={getStatusIcon}
            getStatusBadge={getStatusBadge}
            searchQuery={searchQuery}
            statusFilter={statusFilter}
          />
        </TabsContent>

        <TabsContent value="processing">
          <OrdersList
            orders={processingOrders.filter((order) => order.id.toLowerCase().includes(searchQuery.toLowerCase()))}
            getStatusIcon={getStatusIcon}
            getStatusBadge={getStatusBadge}
            searchQuery={searchQuery}
            statusFilter="processing"
          />
        </TabsContent>

        <TabsContent value="shipped">
          <OrdersList
            orders={shippedOrders.filter((order) => order.id.toLowerCase().includes(searchQuery.toLowerCase()))}
            getStatusIcon={getStatusIcon}
            getStatusBadge={getStatusBadge}
            searchQuery={searchQuery}
            statusFilter="shipped"
          />
        </TabsContent>

        <TabsContent value="delivered">
          <OrdersList
            orders={deliveredOrders.filter((order) => order.id.toLowerCase().includes(searchQuery.toLowerCase()))}
            getStatusIcon={getStatusIcon}
            getStatusBadge={getStatusBadge}
            searchQuery={searchQuery}
            statusFilter="delivered"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface OrdersListProps {
  orders: Array<{
    id: string
    date: string
    status: string
    total: number
    items: number
  }>
  getStatusIcon: (status: string) => React.ReactNode
  getStatusBadge: (status: string) => React.ReactNode
  searchQuery: string
  statusFilter: string
}

function OrdersList({ orders, getStatusIcon, getStatusBadge, searchQuery, statusFilter }: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
          {searchQuery || statusFilter !== "all" ? (
            <>
              <h3 className="text-xl font-semibold mb-2">No matching orders</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter</p>
              <Button
                variant="outline"
                onClick={() => {
                  // This would reset filters in a real implementation
                }}
              >
                Clear Filters
              </Button>
            </>
          ) : (
            <>
              <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">When you place an order, it will appear here</p>
              <Button asChild>
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <CardHeader className="bg-muted/50 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center">
                {getStatusIcon(order.status)}
                <div className="ml-3">
                  <CardTitle className="text-lg">{order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.items} {order.items === 1 ? "item" : "items"}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {getStatusBadge(order.status)}
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/account/orders/${order.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

