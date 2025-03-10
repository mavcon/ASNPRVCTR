import { create } from "zustand"
import { persist } from "zustand/middleware"
import { getTaxRate as getDefaultTaxRate } from "./countries-data"

export interface TaxOverride {
  countryCode: string
  regionCode?: string
  rate: number // Stored as percentage (e.g., 7.5 for 7.5%)
  name?: string
  description?: string
}

interface TaxStore {
  overrides: TaxOverride[]
  addOverride: (override: TaxOverride) => void
  updateOverride: (countryCode: string, regionCode: string | undefined, rate: number) => void
  removeOverride: (countryCode: string, regionCode: string | undefined) => void
  getTaxRate: (countryCode: string, regionCode?: string) => number
}

export const useTaxStore = create<TaxStore>()(
  persist(
    (set, get) => ({
      overrides: [
        // Set Ontario HST rate (13%)
        { countryCode: "CA", regionCode: "ON", rate: 13, name: "HST", description: "Harmonized Sales Tax" },
        // Set other Canadian provinces with HST
        { countryCode: "CA", regionCode: "NB", rate: 15, name: "HST", description: "Harmonized Sales Tax" },
        { countryCode: "CA", regionCode: "NL", rate: 15, name: "HST", description: "Harmonized Sales Tax" },
        { countryCode: "CA", regionCode: "NS", rate: 15, name: "HST", description: "Harmonized Sales Tax" },
        { countryCode: "CA", regionCode: "PE", rate: 15, name: "HST", description: "Harmonized Sales Tax" },
        // Set GST+PST provinces
        { countryCode: "CA", regionCode: "BC", rate: 12, name: "GST+PST", description: "GST (5%) + PST (7%)" },
        { countryCode: "CA", regionCode: "MB", rate: 12, name: "GST+PST", description: "GST (5%) + PST (7%)" },
        { countryCode: "CA", regionCode: "QC", rate: 14.975, name: "GST+QST", description: "GST (5%) + QST (9.975%)" },
        { countryCode: "CA", regionCode: "SK", rate: 11, name: "GST+PST", description: "GST (5%) + PST (6%)" },
        // GST-only regions
        { countryCode: "CA", regionCode: "AB", rate: 5, name: "GST", description: "Goods and Services Tax" },
        { countryCode: "CA", regionCode: "NT", rate: 5, name: "GST", description: "Goods and Services Tax" },
        { countryCode: "CA", regionCode: "NU", rate: 5, name: "GST", description: "Goods and Services Tax" },
        { countryCode: "CA", regionCode: "YT", rate: 5, name: "GST", description: "Goods and Services Tax" },
        // Set US tax to 0 for all states (will be calculated based on nexus)
        { countryCode: "US", rate: 0, name: "Sales Tax", description: "US Sales Tax based on nexus" },
      ],

      addOverride: (override) => {
        set((state) => {
          // Check if override already exists
          const existingIndex = state.overrides.findIndex(
            (o) => o.countryCode === override.countryCode && o.regionCode === override.regionCode,
          )

          if (existingIndex >= 0) {
            // Update existing override
            const newOverrides = [...state.overrides]
            newOverrides[existingIndex] = override
            return { overrides: newOverrides }
          } else {
            // Add new override
            return { overrides: [...state.overrides, override] }
          }
        })
      },

      updateOverride: (countryCode, regionCode, rate) => {
        set((state) => {
          const existingIndex = state.overrides.findIndex(
            (o) => o.countryCode === countryCode && o.regionCode === regionCode,
          )

          if (existingIndex >= 0) {
            // Update existing override
            const newOverrides = [...state.overrides]
            newOverrides[existingIndex] = {
              ...newOverrides[existingIndex],
              rate,
            }
            return { overrides: newOverrides }
          } else {
            // Add new override
            return {
              overrides: [...state.overrides, { countryCode, regionCode, rate }],
            }
          }
        })
      },

      removeOverride: (countryCode, regionCode) => {
        set((state) => ({
          overrides: state.overrides.filter((o) => !(o.countryCode === countryCode && o.regionCode === regionCode)),
        }))
      },

      getTaxRate: (countryCode, regionCode) => {
        const { overrides } = get()

        // Check for specific region override
        if (regionCode) {
          const regionOverride = overrides.find((o) => o.countryCode === countryCode && o.regionCode === regionCode)
          if (regionOverride) return regionOverride.rate / 100
        }

        // Check for country-wide override
        const countryOverride = overrides.find((o) => o.countryCode === countryCode && !o.regionCode)
        if (countryOverride) return countryOverride.rate / 100

        // Fall back to default tax rates
        return getDefaultTaxRate(countryCode, regionCode)
      },
    }),
    {
      name: "asnprvctr-tax-store",
    },
  ),
)

