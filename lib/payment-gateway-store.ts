import { create } from "zustand"
import { persist } from "zustand/middleware"

export type PaymentGateway = {
  id: string
  name: string
  enabled: boolean
  mode: "test" | "live"
  // We don't store actual API keys in the client-side store for security
  // These are just configuration flags
  configured: boolean
  supportedCountries: string[]
  supportedCurrencies: string[]
  features: {
    recurringPayments: boolean
    saveCards: boolean
    refunds: boolean
  }
}

interface PaymentGatewayState {
  gateways: PaymentGateway[]
  activeGateway: string | null
  setActiveGateway: (id: string | null) => void
  updateGateway: (id: string, updates: Partial<PaymentGateway>) => void
  getAvailableGateways: (country: string, currency: string) => PaymentGateway[]
  isGatewayAvailable: (id: string, country: string, currency: string) => boolean
}

export const usePaymentGatewayStore = create<PaymentGatewayState>()(
  persist(
    (set, get) => ({
      gateways: [
        {
          id: "stripe",
          name: "Stripe",
          enabled: true,
          mode: "test",
          configured: false,
          supportedCountries: ["US", "CA", "GB", "AU", "EU"],
          supportedCurrencies: ["USD", "CAD", "GBP", "EUR", "AUD"],
          features: {
            recurringPayments: true,
            saveCards: true,
            refunds: true,
          },
        },
        {
          id: "paypal",
          name: "PayPal",
          enabled: true,
          mode: "test",
          configured: false,
          supportedCountries: ["US", "CA", "GB", "AU", "EU"],
          supportedCurrencies: ["USD", "CAD", "GBP", "EUR", "AUD"],
          features: {
            recurringPayments: true,
            saveCards: false,
            refunds: true,
          },
        },
        {
          id: "square",
          name: "Square",
          enabled: false,
          mode: "test",
          configured: false,
          supportedCountries: ["US", "CA", "GB", "AU", "JP"],
          supportedCurrencies: ["USD", "CAD", "GBP", "AUD", "JPY"],
          features: {
            recurringPayments: false,
            saveCards: true,
            refunds: true,
          },
        },
        {
          id: "authorize",
          name: "Authorize.net",
          enabled: false,
          mode: "test",
          configured: false,
          supportedCountries: ["US", "CA", "GB", "AU", "EU"],
          supportedCurrencies: ["USD", "CAD", "GBP", "EUR", "AUD"],
          features: {
            recurringPayments: true,
            saveCards: true,
            refunds: true,
          },
        },
      ],
      activeGateway: "stripe",

      setActiveGateway: (id) => set({ activeGateway: id }),

      updateGateway: (id, updates) =>
        set((state) => ({
          gateways: state.gateways.map((gateway) => (gateway.id === id ? { ...gateway, ...updates } : gateway)),
        })),

      getAvailableGateways: (country, currency) => {
        return get().gateways.filter(
          (gateway) =>
            gateway.enabled &&
            gateway.configured &&
            gateway.supportedCountries.includes(country) &&
            gateway.supportedCurrencies.includes(currency),
        )
      },

      isGatewayAvailable: (id, country, currency) => {
        const gateway = get().gateways.find((g) => g.id === id)
        if (!gateway) return false

        return (
          gateway.enabled &&
          gateway.configured &&
          gateway.supportedCountries.includes(country) &&
          gateway.supportedCurrencies.includes(currency)
        )
      },
    }),
    {
      name: "asnprvctr-payment-gateway-store",
    },
  ),
)

