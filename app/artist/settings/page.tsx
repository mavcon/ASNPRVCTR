import type { Metadata } from "next"

import { Separator } from "@/components/ui/separator"
import { ArtistProfileForm } from "@/components/artist/profile-form"
import { ArtistPaymentForm } from "@/components/artist/payment-form"
import { ArtistNotificationsForm } from "@/components/artist/notifications-form"

export const metadata: Metadata = {
  title: "Settings | Artist Dashboard",
  description: "Manage your artist profile and account settings",
}

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-4 pt-6 md:p-8">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">Manage your artist profile information.</p>
      </div>
      <Separator />
      <ArtistProfileForm />

      <div className="mt-8">
        <h3 className="text-lg font-medium">Payment Information</h3>
        <p className="text-sm text-muted-foreground">Manage your payment details and preferences.</p>
      </div>
      <Separator />
      <ArtistPaymentForm />

      <div className="mt-8">
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">Configure how you receive notifications.</p>
      </div>
      <Separator />
      <ArtistNotificationsForm />
    </div>
  )
}

