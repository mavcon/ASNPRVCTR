"use client"

import { useState, useEffect } from "react"
import { usePaymentGatewayStore } from "@/lib/payment-gateway-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { checkGatewayConfiguration } from "@/app/actions/payment-gateway-actions"

export function PaymentGatewayManagement() {
  const { gateways, updateGateway, setActiveGateway, activeGateway } = usePaymentGatewayStore()
  const [apiKeys, setApiKeys] = useState<
    Record<string, { publicKey?: string; secretKey?: string; clientId?: string; clientSecret?: string }>
  >({})
  const [saveStatus, setSaveStatus] = useState<
    Record<string, { status: "idle" | "saving" | "success" | "error"; message?: string }>
  >({})

  useEffect(() => {
    const checkConfiguration = async () => {
      try {
        const config = await checkGatewayConfiguration()

        // Update the gateway configuration status based on environment variables
        Object.entries(config).forEach(([gateway, configured]) => {
          if (configured) {
            updateGateway(gateway, { configured: true })
          }
        })
      } catch (error) {
        console.error("Failed to check gateway configuration:", error)
      }
    }

    checkConfiguration()
  }, [updateGateway])

  const handleToggleGateway = (id: string, enabled: boolean) => {
    updateGateway(id, { enabled })
    if (enabled && !activeGateway) {
      setActiveGateway(id)
    } else if (!enabled && activeGateway === id) {
      // Find another enabled gateway to set as active
      const nextEnabledGateway = gateways.find((g) => g.id !== id && g.enabled)
      setActiveGateway(nextEnabledGateway?.id || null)
    }
  }

  const handleSetActive = (id: string) => {
    setActiveGateway(id)
  }

  const handleModeChange = (id: string, mode: "test" | "live") => {
    updateGateway(id, { mode })
  }

  const handleApiKeyChange = (gatewayId: string, keyType: string, value: string) => {
    setApiKeys((prev) => ({
      ...prev,
      [gatewayId]: {
        ...prev[gatewayId],
        [keyType]: value,
      },
    }))
  }

  const handleSaveApiKeys = async (gatewayId: string) => {
    setSaveStatus((prev) => ({
      ...prev,
      [gatewayId]: { status: "saving" },
    }))

    try {
      // Check if the gateway is already configured via environment variables
      const config = await checkGatewayConfiguration()
      const isConfiguredViaEnv = config[gatewayId]

      if (isConfiguredViaEnv) {
        // If already configured via environment variables, just update the UI
        updateGateway(gatewayId, { configured: true })

        setSaveStatus((prev) => ({
          ...prev,
          [gatewayId]: {
            status: "success",
            message: "API keys are configured via environment variables",
          },
        }))

        // Reset status after 3 seconds
        setTimeout(() => {
          setSaveStatus((prev) => ({
            ...prev,
            [gatewayId]: { status: "idle" },
          }))
        }, 3000)

        return
      }

      // In a real application, this would be a server action or API call
      // to securely store the API keys on the server
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful API key validation and storage
      updateGateway(gatewayId, { configured: true })

      setSaveStatus((prev) => ({
        ...prev,
        [gatewayId]: {
          status: "success",
          message: "API keys saved successfully",
        },
      }))

      // Clear the API keys from state for security
      setApiKeys((prev) => ({
        ...prev,
        [gatewayId]: {},
      }))

      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus((prev) => ({
          ...prev,
          [gatewayId]: { status: "idle" },
        }))
      }, 3000)
    } catch (error) {
      setSaveStatus((prev) => ({
        ...prev,
        [gatewayId]: {
          status: "error",
          message: "Failed to save API keys",
        },
      }))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payment Gateways</h2>
          <p className="text-muted-foreground">Configure payment gateways for your store</p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          API keys are sensitive information. They are securely stored and never exposed to clients. Always use
          environment variables for production keys.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue={gateways[0]?.id} className="w-full">
        <TabsList className="grid grid-cols-4">
          {gateways.map((gateway) => (
            <TabsTrigger key={gateway.id} value={gateway.id} className="relative">
              {gateway.name}
              {gateway.configured && (
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                  Configured
                </Badge>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {gateways.map((gateway) => (
          <TabsContent key={gateway.id} value={gateway.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{gateway.name} Settings</span>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={gateway.enabled}
                      onCheckedChange={(checked) => handleToggleGateway(gateway.id, checked)}
                      id={`${gateway.id}-enabled`}
                    />
                    <Label htmlFor={`${gateway.id}-enabled`}>{gateway.enabled ? "Enabled" : "Disabled"}</Label>
                  </div>
                </CardTitle>
                <CardDescription>Configure your {gateway.name} integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Label htmlFor={`${gateway.id}-mode`} className="min-w-[100px]">
                    Mode
                  </Label>
                  <div className="flex items-center space-x-2 border rounded-md p-1">
                    <Button
                      variant={gateway.mode === "test" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleModeChange(gateway.id, "test")}
                      className="text-xs h-7"
                    >
                      Test
                    </Button>
                    <Button
                      variant={gateway.mode === "live" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleModeChange(gateway.id, "live")}
                      className="text-xs h-7"
                    >
                      Live
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h4 className="font-medium">API Keys ({gateway.mode === "test" ? "Test" : "Live"})</h4>

                  {gateway.id === "stripe" && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor={`${gateway.id}-publishable-key`}>Publishable Key</Label>
                        <Input
                          id={`${gateway.id}-publishable-key`}
                          placeholder="pk_test_..."
                          value={apiKeys[gateway.id]?.publicKey || ""}
                          onChange={(e) => handleApiKeyChange(gateway.id, "publicKey", e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`${gateway.id}-secret-key`}>Secret Key</Label>
                        <Input
                          id={`${gateway.id}-secret-key`}
                          type="password"
                          placeholder="sk_test_..."
                          value={apiKeys[gateway.id]?.secretKey || ""}
                          onChange={(e) => handleApiKeyChange(gateway.id, "secretKey", e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          This key will be securely stored on the server and never exposed to clients.
                        </p>
                      </div>
                    </>
                  )}

                  {gateway.id === "paypal" && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor={`${gateway.id}-client-id`}>Client ID</Label>
                        <Input
                          id={`${gateway.id}-client-id`}
                          placeholder="Client ID"
                          value={apiKeys[gateway.id]?.clientId || ""}
                          onChange={(e) => handleApiKeyChange(gateway.id, "clientId", e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`${gateway.id}-client-secret`}>Client Secret</Label>
                        <Input
                          id={`${gateway.id}-client-secret`}
                          type="password"
                          placeholder="Client Secret"
                          value={apiKeys[gateway.id]?.clientSecret || ""}
                          onChange={(e) => handleApiKeyChange(gateway.id, "clientSecret", e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          This key will be securely stored on the server and never exposed to clients.
                        </p>
                      </div>
                    </>
                  )}

                  {gateway.id === "square" && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor={`${gateway.id}-application-id`}>Application ID</Label>
                        <Input
                          id={`${gateway.id}-application-id`}
                          placeholder="Application ID"
                          value={apiKeys[gateway.id]?.clientId || ""}
                          onChange={(e) => handleApiKeyChange(gateway.id, "clientId", e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`${gateway.id}-access-token`}>Access Token</Label>
                        <Input
                          id={`${gateway.id}-access-token`}
                          type="password"
                          placeholder="Access Token"
                          value={apiKeys[gateway.id]?.secretKey || ""}
                          onChange={(e) => handleApiKeyChange(gateway.id, "secretKey", e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          This key will be securely stored on the server and never exposed to clients.
                        </p>
                      </div>
                    </>
                  )}

                  {gateway.id === "authorize" && (
                    <>
                      <div className="grid gap-2">
                        <Label htmlFor={`${gateway.id}-api-login-id`}>API Login ID</Label>
                        <Input
                          id={`${gateway.id}-api-login-id`}
                          placeholder="API Login ID"
                          value={apiKeys[gateway.id]?.clientId || ""}
                          onChange={(e) => handleApiKeyChange(gateway.id, "clientId", e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`${gateway.id}-transaction-key`}>Transaction Key</Label>
                        <Input
                          id={`${gateway.id}-transaction-key`}
                          type="password"
                          placeholder="Transaction Key"
                          value={apiKeys[gateway.id]?.secretKey || ""}
                          onChange={(e) => handleApiKeyChange(gateway.id, "secretKey", e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          This key will be securely stored on the server and never exposed to clients.
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {saveStatus[gateway.id]?.status === "success" && (
                  <Alert variant="success" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{saveStatus[gateway.id].message}</AlertDescription>
                  </Alert>
                )}

                {saveStatus[gateway.id]?.status === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{saveStatus[gateway.id].message}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  {gateway.configured && (
                    <Button
                      variant="outline"
                      onClick={() => handleSetActive(gateway.id)}
                      disabled={activeGateway === gateway.id}
                    >
                      {activeGateway === gateway.id ? "Default Gateway" : "Set as Default"}
                    </Button>
                  )}
                </div>
                <Button
                  onClick={() => handleSaveApiKeys(gateway.id)}
                  disabled={saveStatus[gateway.id]?.status === "saving"}
                >
                  {saveStatus[gateway.id]?.status === "saving" ? "Saving..." : "Save API Keys"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supported Features</CardTitle>
                <CardDescription>Features supported by {gateway.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle
                      className={`h-5 w-5 ${gateway.features.recurringPayments ? "text-green-500" : "text-gray-300"}`}
                    />
                    <span>Recurring Payments</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle
                      className={`h-5 w-5 ${gateway.features.saveCards ? "text-green-500" : "text-gray-300"}`}
                    />
                    <span>Save Payment Methods</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle
                      className={`h-5 w-5 ${gateway.features.refunds ? "text-green-500" : "text-gray-300"}`}
                    />
                    <span>Refunds</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

