"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, RefreshCw, Eye } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { useCartStore } from "@/lib/cart-store"
import { useToast } from "@/components/ui/use-toast"

interface OrderItem {
  sku: string
  name: string
  price: number
  quantity: number
  image: string
  color?: string
  size?: string
}

interface Order {
  id: string
  date: Date
  total: number
  status: "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  trackingNumber?: string
}

interface CustomerOrderListProps {
  limit?: number
}

export function CustomerOrderList({ limit }: CustomerOrderListProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [buyingAgain, setBuyingAgain] = useState<string | null>(null)
  const { addItem } = useCartStore()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call to fetch orders
    const timer = setTimeout(() => {
      const mockOrders: Order[] = [
        {
          id: "ORD-1234",
          date: new Date(2023, 4, 15),
          total: 129.99,
          status: "delivered",
          items: [
            {
              sku: "TS-BLK-M",
              name: "Premium T-Shirt",
              price: 29.99,
              quantity: 1,
              image: "/placeholder.svg?height=80&width=80",
              color: "Black",
              size: "M",
            },
            {
              sku: "HP-WHT-OS",
              name: "Wireless Headphones",
              price: 99.99,
              quantity: 1,
              image: "/placeholder.svg?height=80&width=80",
              color: "White",
            },
          ],
          trackingNumber: "TRK123456789",
        },
        {
          id: "ORD-1235",
          date: new Date(2023, 3, 28),
          total: 79.5,
          status: "shipped",
          items: [
            {
              sku: "SW-BLU-S",
              name: "Smart Watch",
              price: 79.5,
              quantity: 1,
              image: "/placeholder.svg?height=80&width=80",
              color: "Blue",
            },
          ],
          trackingNumber: "TRK987654321",
        },
        {
          id: "ORD-1236",
          date: new Date(2023, 3, 10),
          total: 215.75,
          status: "delivered",
          items: [
            {
              sku: "LW-BRN-OS",
              name: "Leather Wallet",
              price: 49.99,
              quantity: 1,
              image: "/placeholder.svg?height=80&width=80",
              color: "Brown",
            },
            {
              sku: "WE-BLK-OS",
              name: "Wireless Earbuds",
              price: 129.99,
              quantity: 1,
              image: "/placeholder.svg?height=80&width=80",
              color: "Black",
            },
            {
              sku: "BP-GRY-OS",
              name: "Backpack",
              price: 35.77,
              quantity: 1,
              image: "/placeholder.svg?height=80&width=80",
              color: "Gray",
            },
          ],
          trackingNumber: "TRK456789123",
        },
        {
          id: "ORD-1237",
          date: new Date(2023, 2, 22),
          total: 45.99,
          status: "delivered",
          items: [
            {
              sku: "RS-BLK-10",
              name: "Running Shoes",
              price: 45.99,
              quantity: 1,
              image: "/placeholder.svg?height=80&width=80",
              color: "Black",
              size: "10",
            },
          ],
          trackingNumber: "TRK789123456",
        },
        {
          id: "ORD-1238",
          date: new Date(2023, 5, 5),
          total: 159.99,
          status: "processing",
          items: [
            {
              sku: "SG-BLK-OS",
              name: "Sunglasses",
              price: 59.99,
              quantity: 1,
              image: "/placeholder.svg?height=80&width=80",
              color: "Black",
            },
            {
              sku: "TS-WHT-L",
              name: "Premium T-Shirt",
              price: 29.99,
              quantity: 2,
              image: "/placeholder.svg?height=80&width=80",
              color: "White",
              size: "L",
            },
            {
              sku: "TS-RED-M",
              name: "Premium T-Shirt",
              price: 29.99,
              quantity: 1,
              image: "/placeholder.svg?height=80&width=80",
              color: "Red",
              size: "M",
            },
          ],
        },
      ]

      setOrders(mockOrders)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const displayOrders = limit ? orders.slice(0, limit) : orders

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "shipped":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const handleBuyAgain = (order: Order) => {
    setBuyingAgain(order.id)

    // Add all items from the order to the cart
    order.items.forEach((item) => {
      // Pass the item directly - our updated addItem function can handle OrderItems
      addItem(item, item.quantity)
    })

    // Show success message
    toast({
      title: "Items added to cart",
      description: `${order.items.length} item${order.items.length > 1 ? "s" : ""} from order ${order.id} added to your cart.`,
    })

    // Reset loading state after a delay
    setTimeout(() => setBuyingAgain(null), 1000)
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(limit || 3)].map((_, i) => (
          <div key={i} className="animate-pulse p-3 border rounded-md">
            <div className="h-5 bg-muted rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-6">
        <Package className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
        <h3 className="text-base font-medium">No orders yet</h3>
        <p className="text-sm text-muted-foreground mt-1">When you place orders, they will appear here.</p>
        <Button className="mt-3" size="sm" asChild>
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {displayOrders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-3 md:p-4 flex flex-col gap-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-medium text-sm md:text-base">{order.id}</h3>
                    <Badge variant="outline" className={`${getStatusColor(order.status)} border-0 text-xs py-0 px-1.5`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {format(order.date, "MMM d, yyyy")} • {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"}
                  </p>
                </div>
                <span className="font-medium text-sm md:text-base">${order.total.toFixed(2)}</span>
              </div>

              {/* Preview of items */}
              <div className="flex flex-wrap gap-2 mt-1">
                {order.items.slice(0, 3).map((item) => (
                  <div key={item.sku} className="relative w-10 h-10 rounded-sm overflow-hidden border">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                    {item.quantity > 1 && (
                      <span className="absolute bottom-0 right-0 bg-background/80 text-[10px] px-1 rounded-tl">
                        x{item.quantity}
                      </span>
                    )}
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="flex items-center justify-center w-10 h-10 rounded-sm border bg-muted/30">
                    <span className="text-xs text-muted-foreground">+{order.items.length - 3}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-1">
                <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
                  <Link href={`/account/orders/${order.id}`}>
                    <Eye className="h-3 w-3 mr-1" />
                    Details
                  </Link>
                </Button>
                {(order.status === "shipped" || order.status === "delivered") && (
                  <Button size="sm" variant="outline" className="h-8 text-xs" asChild>
                    <Link href={`/track?number=${order.trackingNumber}`}>
                      <Package className="h-3 w-3 mr-1" />
                      Track
                    </Link>
                  </Button>
                )}
                {order.status === "delivered" && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 text-xs"
                    onClick={() => handleBuyAgain(order)}
                    disabled={buyingAgain === order.id}
                  >
                    <RefreshCw className={`h-3 w-3 mr-1 ${buyingAgain === order.id ? "animate-spin" : ""}`} />
                    {buyingAgain === order.id ? "Adding..." : "Buy Again"}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

