import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TaxManagement } from "@/components/super-admin/tax-management"
import { ShippingManagement } from "@/components/super-admin/shipping-management"
import { CustomsManagement } from "@/components/super-admin/customs-management"

export default function InternationalManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">International Settings</h1>
        <p className="text-muted-foreground">Manage tax rates and shipping options for international sales</p>
      </div>

      <Tabs defaultValue="tax" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tax">Tax Rates</TabsTrigger>
          <TabsTrigger value="shipping">Shipping Options</TabsTrigger>
          <TabsTrigger value="customs">Customs & Duties</TabsTrigger>
        </TabsList>

        <TabsContent value="tax" className="space-y-4">
          <TaxManagement />
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          <ShippingManagement />
        </TabsContent>

        <TabsContent value="customs" className="space-y-4">
          <CustomsManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}

