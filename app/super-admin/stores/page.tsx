import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StoreProfile } from "@/components/super-admin/store/store-profile"
import { StoreAppearance } from "@/components/super-admin/store/store-appearance"
import { StorePolicies } from "@/components/super-admin/store/store-policies"
import { StoreOnlinePresence } from "@/components/super-admin/store/store-online-presence"

export default function StoreManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Store Management</h1>
        <p className="text-muted-foreground">
          Manage your international online boutique store settings and configuration
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Store Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="online">Online Presence</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <StoreProfile />
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <StoreAppearance />
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <StorePolicies />
        </TabsContent>

        <TabsContent value="online" className="space-y-4">
          <StoreOnlinePresence />
        </TabsContent>
      </Tabs>
    </div>
  )
}

