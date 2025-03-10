"use client"

import { RetailLayout } from "@/components/layouts/retail-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    notifications: {
      orderUpdates: true,
      promotions: true,
      newProducts: false,
      reviews: true,
      blog: false,
    },
  })

  const handleNotificationChange = (key: keyof typeof settings.notifications, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: checked,
      },
    }))

    // In a real app, this would be an API call
    toast({
      title: "Preferences updated",
      description: "Your notification preferences have been updated.",
    })
  }

  return (
    <RetailLayout>
      <div className="container py-4 px-4 max-w-md">
        <div className="mb-4">
          <Link
            href="/account/dashboard"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="orderUpdates" className="text-sm font-medium">
                  Order Updates
                </Label>
                <p className="text-xs text-muted-foreground">Receive notifications about your order status</p>
              </div>
              <Switch
                id="orderUpdates"
                checked={settings.notifications.orderUpdates}
                onCheckedChange={(checked) => handleNotificationChange("orderUpdates", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotions" className="text-sm font-medium">
                  Promotions
                </Label>
                <p className="text-xs text-muted-foreground">Receive notifications about sales and special offers</p>
              </div>
              <Switch
                id="promotions"
                checked={settings.notifications.promotions}
                onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newProducts" className="text-sm font-medium">
                  New Products
                </Label>
                <p className="text-xs text-muted-foreground">Be the first to know about new product launches</p>
              </div>
              <Switch
                id="newProducts"
                checked={settings.notifications.newProducts}
                onCheckedChange={(checked) => handleNotificationChange("newProducts", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reviews" className="text-sm font-medium">
                  Reviews
                </Label>
                <p className="text-xs text-muted-foreground">Receive reminders to review products you've purchased</p>
              </div>
              <Switch
                id="reviews"
                checked={settings.notifications.reviews}
                onCheckedChange={(checked) => handleNotificationChange("reviews", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="blog" className="text-sm font-medium">
                  Blog & Articles
                </Label>
                <p className="text-xs text-muted-foreground">Receive notifications about new blog posts and articles</p>
              </div>
              <Switch
                id="blog"
                checked={settings.notifications.blog}
                onCheckedChange={(checked) => handleNotificationChange("blog", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </RetailLayout>
  )
}

