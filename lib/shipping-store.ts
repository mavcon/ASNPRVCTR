import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface ShippingMethod {
  id: string
  name: string
  description?: string
  estimatedDeliveryDays: number
  price: number // Base price
}

export interface CountryShipping {
  countryCode: string
  available: boolean
  methods: {
    methodId: string
    available: boolean
    priceMultiplier: number // Multiplier for the base price (1 = no change)
    additionalFee: number // Additional fee specific to this country
    restrictions?: {
      maxWeight?: number
      maxDimensions?: {
        length: number
        width: number
        height: number
      }
      prohibitedItems?: string[]
    }
  }[]
}

interface ShippingStore {
  methods: ShippingMethod[]
  countryShipping: CountryShipping[]

  // Method management
  addMethod: (method: ShippingMethod) => void
  updateMethod: (id: string, updates: Partial<ShippingMethod>) => void
  removeMethod: (id: string) => void

  // Country shipping management
  setCountryAvailability: (countryCode: string, available: boolean) => void
  setCountryMethodAvailability: (countryCode: string, methodId: string, available: boolean) => void
  updateCountryMethod: (countryCode: string, methodId: string, updates: Partial<CountryShipping["methods"][0]>) => void

  // Getters
  getAvailableCountries: () => string[]
  getAvailableMethodsForCountry: (countryCode: string) => ShippingMethod[]
  getShippingPrice: (countryCode: string, methodId: string) => number | null
}

export const useShippingStore = create<ShippingStore>()(
  persist(
    (set, get) => ({
      methods: [
        {
          id: "standard",
          name: "Standard Shipping",
          description: "Delivery within 3-7 business days",
          estimatedDeliveryDays: 5,
          price: 9.99,
        },
        {
          id: "express",
          name: "Express Shipping",
          description: "Delivery within 1-3 business days",
          estimatedDeliveryDays: 2,
          price: 14.99,
        },
        {
          id: "overnight",
          name: "Overnight Shipping",
          description: "Next business day delivery (Canada only)",
          estimatedDeliveryDays: 1,
          price: 24.99,
        },
      ],

      countryShipping: [
        {
          countryCode: "CA",
          available: true,
          methods: [
            { methodId: "standard", available: true, priceMultiplier: 1, additionalFee: 0 },
            { methodId: "express", available: true, priceMultiplier: 1, additionalFee: 0 },
            { methodId: "overnight", available: true, priceMultiplier: 1, additionalFee: 0 },
          ],
        },
        {
          countryCode: "US",
          available: true,
          methods: [
            { methodId: "standard", available: true, priceMultiplier: 1.2, additionalFee: 5 },
            { methodId: "express", available: true, priceMultiplier: 1.2, additionalFee: 10 },
            { methodId: "overnight", available: false, priceMultiplier: 0, additionalFee: 0 },
          ],
        },
        {
          countryCode: "UK",
          available: true,
          methods: [
            { methodId: "standard", available: true, priceMultiplier: 2, additionalFee: 15 },
            { methodId: "express", available: true, priceMultiplier: 2, additionalFee: 25 },
            { methodId: "overnight", available: false, priceMultiplier: 0, additionalFee: 0 },
          ],
        },
        {
          countryCode: "AU",
          available: true,
          methods: [
            { methodId: "standard", available: true, priceMultiplier: 2.5, additionalFee: 20 },
            { methodId: "express", available: true, priceMultiplier: 2.5, additionalFee: 30 },
            { methodId: "overnight", available: false, priceMultiplier: 0, additionalFee: 0 },
          ],
        },
        {
          countryCode: "DE",
          available: true,
          methods: [
            { methodId: "standard", available: true, priceMultiplier: 2, additionalFee: 15 },
            { methodId: "express", available: true, priceMultiplier: 2, additionalFee: 25 },
            { methodId: "overnight", available: false, priceMultiplier: 0, additionalFee: 0 },
          ],
        },
        {
          countryCode: "FR",
          available: true,
          methods: [
            { methodId: "standard", available: true, priceMultiplier: 2, additionalFee: 15 },
            { methodId: "express", available: true, priceMultiplier: 2, additionalFee: 25 },
            { methodId: "overnight", available: false, priceMultiplier: 0, additionalFee: 0 },
          ],
        },
        {
          countryCode: "JP",
          available: true,
          methods: [
            { methodId: "standard", available: true, priceMultiplier: 2.5, additionalFee: 25 },
            { methodId: "express", available: true, priceMultiplier: 2.5, additionalFee: 35 },
            { methodId: "overnight", available: false, priceMultiplier: 0, additionalFee: 0 },
          ],
        },
      ],

      addMethod: (method) => {
        set((state) => ({
          methods: [...state.methods, method],
        }))
      },

      updateMethod: (id, updates) => {
        set((state) => ({
          methods: state.methods.map((method) => (method.id === id ? { ...method, ...updates } : method)),
        }))
      },

      removeMethod: (id) => {
        set((state) => ({
          methods: state.methods.filter((method) => method.id !== id),
        }))
      },

      setCountryAvailability: (countryCode, available) => {
        set((state) => {
          const existingIndex = state.countryShipping.findIndex((cs) => cs.countryCode === countryCode)

          if (existingIndex >= 0) {
            const newCountryShipping = [...state.countryShipping]
            newCountryShipping[existingIndex] = {
              ...newCountryShipping[existingIndex],
              available,
            }
            return { countryShipping: newCountryShipping }
          } else if (available) {
            // Create new entry if country doesn't exist and we're enabling it
            return {
              countryShipping: [
                ...state.countryShipping,
                {
                  countryCode,
                  available: true,
                  methods: state.methods.map((method) => ({
                    methodId: method.id,
                    available: true,
                    priceMultiplier: 1.5, // Default international multiplier
                    additionalFee: 5, // Default international fee
                  })),
                },
              ],
            }
          }

          return state
        })
      },

      setCountryMethodAvailability: (countryCode, methodId, available) => {
        set((state) => {
          const countryIndex = state.countryShipping.findIndex((cs) => cs.countryCode === countryCode)

          if (countryIndex < 0) return state

          const newCountryShipping = [...state.countryShipping]
          const country = newCountryShipping[countryIndex]

          const methodIndex = country.methods.findIndex((m) => m.methodId === methodId)

          if (methodIndex >= 0) {
            // Update existing method
            country.methods[methodIndex] = {
              ...country.methods[methodIndex],
              available,
            }
          } else if (available) {
            // Add new method if it doesn't exist and we're enabling it
            country.methods.push({
              methodId,
              available: true,
              priceMultiplier: 1.5,
              additionalFee: 5,
            })
          }

          return { countryShipping: newCountryShipping }
        })
      },

      updateCountryMethod: (countryCode, methodId, updates) => {
        set((state) => {
          const countryIndex = state.countryShipping.findIndex((cs) => cs.countryCode === countryCode)

          if (countryIndex < 0) return state

          const newCountryShipping = [...state.countryShipping]
          const country = newCountryShipping[countryIndex]

          const methodIndex = country.methods.findIndex((m) => m.methodId === methodId)

          if (methodIndex >= 0) {
            // Update existing method
            country.methods[methodIndex] = {
              ...country.methods[methodIndex],
              ...updates,
            }

            return { countryShipping: newCountryShipping }
          }

          return state
        })
      },

      getAvailableCountries: () => {
        return get()
          .countryShipping.filter((cs) => cs.available)
          .map((cs) => cs.countryCode)
      },

      getAvailableMethodsForCountry: (countryCode) => {
        const { methods, countryShipping } = get()

        const country = countryShipping.find((cs) => cs.countryCode === countryCode)
        if (!country || !country.available) return []

        const availableMethodIds = country.methods.filter((m) => m.available).map((m) => m.methodId)

        return methods.filter((method) => availableMethodIds.includes(method.id))
      },

      getShippingPrice: (countryCode, methodId) => {
        const { methods, countryShipping } = get()

        const method = methods.find((m) => m.id === methodId)
        if (!method) return null

        const country = countryShipping.find((cs) => cs.countryCode === countryCode)
        if (!country || !country.available) return null

        const countryMethod = country.methods.find((m) => m.methodId === methodId)
        if (!countryMethod || !countryMethod.available) return null

        return method.price * countryMethod.priceMultiplier + countryMethod.additionalFee
      },
    }),
    {
      name: "asnprvctr-shipping-store",
    },
  ),
)

