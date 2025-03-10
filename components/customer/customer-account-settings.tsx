"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function CustomerAccountSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

  const [settings, setSettings] = useState({
    email: "alex.johnson@example.com",
    notifications: {
      orderUpdates: true,
      promotions: true,
      newProducts: false,
      reviews: true,
      blog: false,
    },
  })

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }, 1000)
  }

  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
      // Reset form
      ;(e.target as HTMLFormElement).reset()
    }, 1000)
  }

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

  const handleDeleteAccount = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowDeleteConfirmation(false)
      toast({
        title: "Account deleted",
        description: "Your account has been deleted. You will be redirected to the homepage.",
      })

      // In a real app, this would redirect to the homepage after a delay
      setTimeout(() => {
        window.location.href = "/"
      }, 3000)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-3">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Alex" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Johnson" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+1 (416) 555-1234" />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-3">
                <div className="grid gap-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-destructive">Delete Account</CardTitle>
        </CardHeader>
        <CardContent>
          {showDeleteConfirmation ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription className="text-xs">
                This action cannot be undone. All your data, including order history, saved addresses, and payment
                methods will be permanently deleted.
              </AlertDescription>
              <div className="flex space-x-2 mt-3">
                <Button variant="destructive" size="sm" onClick={handleDeleteAccount} disabled={isLoading}>
                  {isLoading ? "Deleting..." : "Confirm Delete"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteConfirmation(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </Alert>
          ) : (
            <Button variant="destructive" size="sm" onClick={() => setShowDeleteConfirmation(true)}>
              Delete Account
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

