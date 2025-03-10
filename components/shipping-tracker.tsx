"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Truck, Package, CheckCircle, Clock, MapPin, AlertTriangle } from "lucide-react"
import type { Order } from "@/lib/order-store"

interface ShippingTrackerProps {
  order: Order
  compact?: boolean
}

interface TrackingStep {
  id: string
  title: string
  description: string
  date?: string
  isCompleted: boolean
  isCurrent: boolean
  icon: React.ReactNode
  location?: {
    lat: number
    lng: number
  }
}

declare global {
  interface Window {
    google: any
  }
}

export function ShippingTracker({ order, compact = false }: ShippingTrackerProps) {
  const [trackingSteps, setTrackingSteps] = useState<TrackingStep[]>([])
  const [map, setMap] = useState<any | null>(null)
  const [marker, setMarker] = useState<any | null>(null)
  const [mapError, setMapError] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Google Maps
    try {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      script.async = true
      script.defer = true

      script.onload = initMap
      script.onerror = () => {
        setMapError(true)
        console.error("Failed to load Google Maps")
      }

      document.head.appendChild(script)

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    } catch (error) {
      setMapError(true)
      console.error("Error setting up Google Maps:", error)
    }
  }, [])

  const initMap = () => {
    if (!mapRef.current || !window.google) {
      setMapError(true)
      return
    }

    try {
      const newMap = new window.google.maps.Map(mapRef.current, {
        zoom: 4,
        center: { lat: 40, lng: -95 }, // Center of US
        styles: [
          {
            featureType: "all",
            elementType: "geometry",
            stylers: [{ color: "#242f3e" }],
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#242f3e" }],
          },
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#746855" }],
          },
        ],
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      })
      setMap(newMap)

      // Create marker
      const newMarker = new window.google.maps.Marker({
        map: newMap,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: "#0ea5e9",
          fillOpacity: 1,
          strokeColor: "#0ea5e9",
          strokeWeight: 2,
        },
      })
      setMarker(newMarker)
    } catch (error) {
      setMapError(true)
      console.error("Error initializing map:", error)
    }
  }

  useEffect(() => {
    // Generate tracking steps based on order status
    const steps: TrackingStep[] = [
      {
        id: "order-placed",
        title: "Order Placed",
        description: "Your order has been received",
        date: order.created_at,
        isCompleted: true,
        isCurrent: order.status === "pending",
        icon: <Clock className="h-5 w-5" />,
        location: { lat: 43.6532, lng: -79.3832 }, // Toronto
      },
      {
        id: "processing",
        title: "Processing",
        description: "Your order is being prepared",
        date:
          order.status !== "pending"
            ? new Date(new Date(order.created_at).getTime() + 86400000).toISOString()
            : undefined,
        isCompleted: ["processing", "shipped", "delivered"].includes(order.status),
        isCurrent: order.status === "processing",
        icon: <Package className="h-5 w-5" />,
        location: { lat: 43.6532, lng: -79.3832 }, // Toronto
      },
      {
        id: "shipped",
        title: "Shipped",
        description: order.tracking_number
          ? `Your order is on its way (${order.tracking_number})`
          : "Your order is on its way",
        date: ["shipped", "delivered"].includes(order.status)
          ? new Date(new Date(order.created_at).getTime() + 86400000 * 2).toISOString()
          : undefined,
        isCompleted: ["shipped", "delivered"].includes(order.status),
        isCurrent: order.status === "shipped",
        icon: <Truck className="h-5 w-5" />,
        location: { lat: 41.8781, lng: -87.6298 }, // Chicago (example transit point)
      },
      {
        id: "delivered",
        title: "Delivered",
        description: "Your order has been delivered",
        date:
          order.status === "delivered"
            ? new Date(new Date(order.created_at).getTime() + 86400000 * 4).toISOString()
            : undefined,
        isCompleted: order.status === "delivered",
        isCurrent: order.status === "delivered",
        icon: <CheckCircle className="h-5 w-5" />,
        location: {
          lat: order.shipping_address?.latitude || 40.7128,
          lng: order.shipping_address?.longitude || -74.006,
        },
      },
    ]

    setTrackingSteps(steps)

    // Update map marker position
    if (map && marker) {
      const currentStep = steps.find((step) => step.isCurrent)
      if (currentStep?.location) {
        marker.setPosition(currentStep.location)
        map.panTo(currentStep.location)
      }
    }
  }, [order, map, marker])

  return (
    <Card className={compact ? "border-0 shadow-none" : ""}>
      <CardHeader className={compact ? "px-0 pt-0" : ""}>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className={compact ? "text-lg" : "text-xl"}>Order Tracking</CardTitle>
            <p className="text-sm text-muted-foreground">
              {order.id} • {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
          <Badge variant="outline" className="capitalize">
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className={compact ? "px-0 pb-0" : ""}>
        <div className="space-y-6">
          {mapError ? (
            <div className="w-full h-[200px] rounded-lg bg-muted flex items-center justify-center">
              <div className="text-center p-4">
                <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Map unavailable. Tracking your order from Toronto to {order.shipping_address.city}.
                </p>
              </div>
            </div>
          ) : (
            <div
              ref={mapRef}
              className="w-full h-[200px] rounded-lg mb-6 bg-muted"
              aria-label="Map showing package location"
            />
          )}

          <div className="relative">
            <div className="absolute top-5 left-5 h-[calc(100%-40px)] w-[2px] bg-muted">
              <div
                className="h-full w-full bg-primary transition-all duration-500 ease-in-out"
                style={{
                  height: `${Math.max(
                    0,
                    ((trackingSteps.filter((step) => step.isCompleted).length - 1) / (trackingSteps.length - 1)) * 100,
                  )}%`,
                }}
              />
            </div>

            <div className="space-y-8">
              {trackingSteps.map((step) => (
                <div key={step.id} className="relative pl-12">
                  <div
                    className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      step.isCompleted
                        ? "border-primary bg-primary text-primary-foreground"
                        : step.isCurrent
                          ? "border-primary bg-background text-primary"
                          : "border-muted bg-background text-muted-foreground"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{step.title}</h3>
                      {step.date && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          {new Date(step.date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!compact && (
            <>
              <Separator />
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                Delivering to: {order.shipping_address.city}, {order.shipping_address.state}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

