"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeStatus } from "@/components/theme-status"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ModeToggle } from "@/components/mode-toggle"

export default function SettingsPage() {
  const { setTheme } = useTheme()
  const [autoTheme, setAutoTheme] = useState(true)

  const handleAutoThemeChange = (checked: boolean) => {
    setAutoTheme(checked)
    if (checked) {
      setTheme("system")
    } else {
      // Default to light if turning off auto
      setTheme("light")
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="appearance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize how ASNPRVCTR looks on your device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <h3>Theme Settings</h3>
                <ModeToggle />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="auto-theme" checked={autoTheme} onCheckedChange={handleAutoThemeChange} />
                <Label htmlFor="auto-theme">Use system theme settings</Label>
              </div>

              <ThemeStatus />

              <div className="text-sm text-muted-foreground mt-4">
                <p>Your theme preference will be saved and applied across sessions.</p>
                <p className="mt-1">
                  When system theme is enabled, ASNPRVCTR will automatically adjust to your device's theme settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Account settings will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Notification settings will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Customize your display preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Display settings will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

