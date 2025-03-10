import { PaymentGatewayManagement } from "@/components/super-admin/payment-gateway-management"

export default function PaymentSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Settings</h1>
        <p className="text-muted-foreground">Configure payment gateways and processing options</p>
      </div>
      <PaymentGatewayManagement />
    </div>
  )
}

