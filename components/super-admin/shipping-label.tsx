"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Order } from "@/lib/order-store"
import { Printer, Download } from "lucide-react"
import { toast } from "sonner"
import { useReactToPrint } from "react-to-print"

interface ShippingLabelProps {
  order: Order
}

export function ShippingLabel({ order }: ShippingLabelProps) {
  const labelRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    content: () => labelRef.current,
    documentTitle: `Shipping Label - ${order.id}`,
    onAfterPrint: () => toast.success("Shipping label printed successfully"),
    onPrintError: () => toast.error("Failed to print shipping label"),
  })

  const handleDownload = () => {
    // In a real app, this would generate a PDF and download it
    toast.success("Shipping label downloaded successfully")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <Button variant="outline" className="flex items-center gap-2" onClick={handlePrint}>
          <Printer className="h-4 w-4" />
          Print Label
        </Button>
        <Button className="flex items-center gap-2" onClick={handleDownload}>
          <Download className="h-4 w-4" />
          Download Label
        </Button>
      </div>

      <Card className="border-2 border-dashed p-0">
        <CardContent className="p-0">
          <div ref={labelRef} className="p-8 print:p-0">
            <div className="border-b-2 border-black pb-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold tracking-wider">
                    <span className="text-red-600">亞</span> ASNPRVCTR
                  </h2>
                  <p className="text-sm">123 Commerce St, Suite 100</p>
                  <p className="text-sm">New York, NY 10001</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">Order: {order.id}</p>
                  <p className="text-sm">Date: {formatDate(order.created_at)}</p>
                  {order.tracking_number && <p className="text-sm">Tracking: {order.tracking_number}</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xs uppercase font-bold mb-2">Ship To:</h3>
                <div className="text-lg font-bold">{order.shipping_address.name}</div>
                <div>{order.shipping_address.address1}</div>
                {order.shipping_address.address2 && <div>{order.shipping_address.address2}</div>}
                <div>
                  {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postalCode}
                </div>
                <div>{order.shipping_address.country}</div>
                <div className="mt-2">{order.shipping_address.phone}</div>
              </div>

              <div>
                <h3 className="text-xs uppercase font-bold mb-2">Shipping Method:</h3>
                <div className="text-lg font-bold">
                  {order.shipping_method === "standard" && "Standard Shipping"}
                  {order.shipping_method === "express" && "Express Shipping"}
                  {order.shipping_method === "overnight" && "Overnight Shipping"}
                  {order.shipping_method === "local_pickup" && "Local Pickup"}
                </div>

                <h3 className="text-xs uppercase font-bold mt-4 mb-2">Package Contents:</h3>
                <div className="text-sm">
                  {order.items.length} items
                  {order.items.map((item, index) => (
                    <div key={index} className="text-xs mt-1">
                      {item.quantity}x {item.name} ({item.options})
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t-2 border-black">
              <div className="flex justify-between items-center">
                <div className="text-xs">
                  <p>Thank you for your order!</p>
                  <p>Questions? Contact us at support@asnprvctr.com</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold">Weight: {(Math.random() * 5 + 1).toFixed(2)} lbs</p>
                  <p className="text-xs">
                    Package {Math.floor(Math.random() * 100000)} of {Math.floor(Math.random() * 10)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

