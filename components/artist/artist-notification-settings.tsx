"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

export function ArtistNotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    salesEmail: true,
    salesPush: true,
    salesSms: false,

    reviewsEmail: true,
    reviewsPush: true,
    reviewsSms: false,

    messagesEmail: true,
    messagesPush: true,
    messagesSms: false,

    productUpdatesEmail: true,
    productUpdatesPush: false,
    productUpdatesSms: false,

    newsletterEmail: true,
    newsletterPush: false,
    newsletterSms: false,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    })
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Sales Notifications</h3>
          <p className="text-sm text-muted-foreground">Receive notifications when your products are sold.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="sales-email" className="flex flex-col space-y-1">
              <span>Email</span>
              <span className="font-normal text-sm text-muted-foreground">Receive sales notifications via email</span>
            </Label>
            <Switch id="sales-email" checked={settings.salesEmail} onCheckedChange={() => handleToggle("salesEmail")} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="sales-push" className="flex flex-col space-y-1">
              <span>Push Notifications</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive sales notifications on your device
              </span>
            </Label>
            <Switch id="sales-push" checked={settings.salesPush} onCheckedChange={() => handleToggle("salesPush")} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="sales-sms" className="flex flex-col space-y-1">
              <span>SMS</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive sales notifications via text message
              </span>
            </Label>
            <Switch id="sales-sms" checked={settings.salesSms} onCheckedChange={() => handleToggle("salesSms")} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Review Notifications</h3>
          <p className="text-sm text-muted-foreground">Receive notifications when customers review your products.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="reviews-email" className="flex flex-col space-y-1">
              <span>Email</span>
              <span className="font-normal text-sm text-muted-foreground">Receive review notifications via email</span>
            </Label>
            <Switch
              id="reviews-email"
              checked={settings.reviewsEmail}
              onCheckedChange={() => handleToggle("reviewsEmail")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="reviews-push" className="flex flex-col space-y-1">
              <span>Push Notifications</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive review notifications on your device
              </span>
            </Label>
            <Switch
              id="reviews-push"
              checked={settings.reviewsPush}
              onCheckedChange={() => handleToggle("reviewsPush")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="reviews-sms" className="flex flex-col space-y-1">
              <span>SMS</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive review notifications via text message
              </span>
            </Label>
            <Switch id="reviews-sms" checked={settings.reviewsSms} onCheckedChange={() => handleToggle("reviewsSms")} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Message Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Receive notifications when you receive messages from customers or administrators.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="messages-email" className="flex flex-col space-y-1">
              <span>Email</span>
              <span className="font-normal text-sm text-muted-foreground">Receive message notifications via email</span>
            </Label>
            <Switch
              id="messages-email"
              checked={settings.messagesEmail}
              onCheckedChange={() => handleToggle("messagesEmail")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="messages-push" className="flex flex-col space-y-1">
              <span>Push Notifications</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive message notifications on your device
              </span>
            </Label>
            <Switch
              id="messages-push"
              checked={settings.messagesPush}
              onCheckedChange={() => handleToggle("messagesPush")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="messages-sms" className="flex flex-col space-y-1">
              <span>SMS</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive message notifications via text message
              </span>
            </Label>
            <Switch
              id="messages-sms"
              checked={settings.messagesSms}
              onCheckedChange={() => handleToggle("messagesSms")}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Marketing Communications</h3>
          <p className="text-sm text-muted-foreground">
            Receive updates about platform features, promotions, and newsletters.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="newsletter-email" className="flex flex-col space-y-1">
              <span>Email Newsletter</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive our monthly newsletter and updates
              </span>
            </Label>
            <Switch
              id="newsletter-email"
              checked={settings.newsletterEmail}
              onCheckedChange={() => handleToggle("newsletterEmail")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="product-updates-email" className="flex flex-col space-y-1">
              <span>Product Updates</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive updates about platform features and improvements
              </span>
            </Label>
            <Switch
              id="product-updates-email"
              checked={settings.productUpdatesEmail}
              onCheckedChange={() => handleToggle("productUpdatesEmail")}
            />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  )
}

