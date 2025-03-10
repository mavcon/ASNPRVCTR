"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

export function ArtistPrivacySettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    profileVisibility: true,
    showEmail: false,
    showPhone: false,
    allowDirectMessages: true,
    allowReviews: true,
    dataCollection: true,
    marketingConsent: true,
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
        title: "Privacy settings updated",
        description: "Your privacy preferences have been saved successfully.",
      })
    }, 1000)
  }

  const handleDataDownload = () => {
    toast({
      title: "Data export requested",
      description: "Your data export has been initiated. You will receive an email with download instructions shortly.",
    })
  }

  const handleAccountDeletion = () => {
    toast({
      title: "Account deletion requested",
      description: "Your account deletion request has been submitted. You will receive a confirmation email shortly.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Profile Privacy</h3>
          <p className="text-sm text-muted-foreground">Control how your profile information is displayed to others.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="profile-visibility" className="flex flex-col space-y-1">
              <span>Public Profile</span>
              <span className="font-normal text-sm text-muted-foreground">
                Make your artist profile visible to the public
              </span>
            </Label>
            <Switch
              id="profile-visibility"
              checked={settings.profileVisibility}
              onCheckedChange={() => handleToggle("profileVisibility")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="show-email" className="flex flex-col space-y-1">
              <span>Show Email</span>
              <span className="font-normal text-sm text-muted-foreground">
                Display your email address on your public profile
              </span>
            </Label>
            <Switch id="show-email" checked={settings.showEmail} onCheckedChange={() => handleToggle("showEmail")} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="show-phone" className="flex flex-col space-y-1">
              <span>Show Phone Number</span>
              <span className="font-normal text-sm text-muted-foreground">
                Display your phone number on your public profile
              </span>
            </Label>
            <Switch id="show-phone" checked={settings.showPhone} onCheckedChange={() => handleToggle("showPhone")} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="allow-messages" className="flex flex-col space-y-1">
              <span>Direct Messages</span>
              <span className="font-normal text-sm text-muted-foreground">
                Allow customers to send you direct messages
              </span>
            </Label>
            <Switch
              id="allow-messages"
              checked={settings.allowDirectMessages}
              onCheckedChange={() => handleToggle("allowDirectMessages")}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Data & Consent</h3>
          <p className="text-sm text-muted-foreground">Manage how your data is collected and used.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="data-collection" className="flex flex-col space-y-1">
              <span>Analytics & Tracking</span>
              <span className="font-normal text-sm text-muted-foreground">
                Allow us to collect usage data to improve your experience
              </span>
            </Label>
            <Switch
              id="data-collection"
              checked={settings.dataCollection}
              onCheckedChange={() => handleToggle("dataCollection")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="marketing-consent" className="flex flex-col space-y-1">
              <span>Marketing Consent</span>
              <span className="font-normal text-sm text-muted-foreground">
                Allow us to use your data for personalized marketing
              </span>
            </Label>
            <Switch
              id="marketing-consent"
              checked={settings.marketingConsent}
              onCheckedChange={() => handleToggle("marketingConsent")}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Data Management</h3>
          <p className="text-sm text-muted-foreground">Download or delete your account data.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" onClick={handleDataDownload}>
            Download My Data
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAccountDeletion}>Delete Account</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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

