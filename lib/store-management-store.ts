import { create } from "zustand"
import { persist } from "zustand/middleware"

// Store Profile Types
export type StoreProfileData = {
  name: string
  legalName: string
  email: string
  phone: string
  description: string
  taxId: string
  website: string
  logoUrl: string
}

// Store Appearance Types
export type ColorSettings = {
  primary: string
  secondary: string
  accent: string
  background: string
}

export type FontSettings = {
  headingFont: string
  bodyFont: string
  fontSize: string
}

export type LayoutSettings = {
  headerStyle: string
  footerStyle: string
  productGridColumns: string
  showBreadcrumbs: boolean
  enableQuickView: boolean
  showQuantitySelector: boolean
}

// Store Policies Types
export type ReturnPolicy = {
  returnWindow: string
  returnPolicy: string
  exchangePolicy: string
  refundMethod: string
  restockingFee: string
}

export type ShippingPolicy = {
  domesticShippingPolicy: string
  internationalShippingPolicy: string
  processingTime: string
  freeShippingThreshold: string
}

export type PrivacyPolicy = {
  privacyPolicy: string
  cookiePolicy: string
  dataRetentionPolicy: string
}

export type TermsOfService = {
  termsOfService: string
  intellectualProperty: string
  disputeResolution: string
}

// Online Presence Types
export type OnlinePresence = {
  websiteUrl: string
  defaultLanguage: string
  supportedLanguages: string[]
  defaultCurrency: string
  supportedCurrencies: string[]
  metaTitle: string
  metaDescription: string
  googleAnalyticsId: string
  facebookPixelId: string
  enableMultiCurrency: boolean
  enableMultiLanguage: boolean
  enableGeoIpRedirect: boolean
}

export type SocialMedia = {
  facebook: string
  instagram: string
  twitter: string
  linkedin: string
  youtube: string
  pinterest: string
  tiktok: string
}

// Store Management State
type StoreManagementState = {
  storeProfile: StoreProfileData
  updateStoreProfile: (data: Partial<StoreProfileData>) => void

  colorSettings: ColorSettings
  updateColorSettings: (data: Partial<ColorSettings>) => void

  fontSettings: FontSettings
  updateFontSettings: (data: Partial<FontSettings>) => void

  layoutSettings: LayoutSettings
  updateLayoutSettings: (data: Partial<LayoutSettings>) => void

  returnPolicy: ReturnPolicy
  updateReturnPolicy: (data: Partial<ReturnPolicy>) => void

  shippingPolicy: ShippingPolicy
  updateShippingPolicy: (data: Partial<ShippingPolicy>) => void

  privacyPolicy: PrivacyPolicy
  updatePrivacyPolicy: (data: Partial<PrivacyPolicy>) => void

  termsOfService: TermsOfService
  updateTermsOfService: (data: Partial<TermsOfService>) => void

  onlinePresence: OnlinePresence
  updateOnlinePresence: (data: Partial<OnlinePresence>) => void

  socialMedia: SocialMedia
  updateSocialMedia: (data: Partial<SocialMedia>) => void
}

// Default values
const defaultStoreProfile: StoreProfileData = {
  name: "ASNPRVCTR",
  legalName: "ASNPRVCTR Inc.",
  email: "contact@asnprvctr.com",
  phone: "+1 (416) 555-1234",
  description: "Premium boutique clothing and accessories store based in Toronto, Canada.",
  taxId: "123456789",
  website: "https://asnprvctr.com",
  logoUrl: "/placeholder.svg?height=200&width=200",
}

const defaultColorSettings: ColorSettings = {
  primary: "#FF0000",
  secondary: "#000000",
  accent: "#3B82F6",
  background: "#FFFFFF",
}

const defaultFontSettings: FontSettings = {
  headingFont: "inter",
  bodyFont: "inter",
  fontSize: "medium",
}

const defaultLayoutSettings: LayoutSettings = {
  headerStyle: "standard",
  footerStyle: "standard",
  productGridColumns: "4",
  showBreadcrumbs: true,
  enableQuickView: true,
  showQuantitySelector: true,
}

const defaultReturnPolicy: ReturnPolicy = {
  returnWindow: "30",
  returnPolicy:
    "We accept returns within 30 days of purchase. Items must be in original condition with tags attached. To initiate a return, please contact our customer service team.",
  exchangePolicy:
    "Exchanges can be made within 30 days of purchase. Items must be in original condition with tags attached. To initiate an exchange, please contact our customer service team.",
  refundMethod: "original",
  restockingFee: "0",
}

const defaultShippingPolicy: ShippingPolicy = {
  domesticShippingPolicy:
    "We offer standard shipping (3-5 business days) and express shipping (1-2 business days) within Canada. Shipping costs are calculated at checkout based on weight and destination.",
  internationalShippingPolicy:
    "We ship to select international destinations. Shipping costs and delivery times vary by country. Import duties and taxes are the responsibility of the recipient.",
  processingTime: "1-2",
  freeShippingThreshold: "100",
}

const defaultPrivacyPolicy: PrivacyPolicy = {
  privacyPolicy:
    "We collect personal information to process orders and improve our services. We do not sell your information to third parties. For more details, please see our full privacy policy.",
  cookiePolicy:
    "Our website uses cookies to enhance your browsing experience. By using our site, you consent to our use of cookies in accordance with our cookie policy.",
  dataRetentionPolicy:
    "We retain customer data for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time.",
}

const defaultTermsOfService: TermsOfService = {
  termsOfService:
    "By using our website and services, you agree to these terms of service. We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.",
  intellectualProperty:
    "All content on this website, including text, images, and logos, is the property of ASNPRVCTR and is protected by copyright laws. Unauthorized use is prohibited.",
  disputeResolution:
    "Any disputes arising from the use of our services will be resolved through arbitration in accordance with the laws of Ontario, Canada.",
}

const defaultOnlinePresence: OnlinePresence = {
  websiteUrl: "https://asnprvctr.com",
  defaultLanguage: "en",
  supportedLanguages: ["en", "fr", "es"],
  defaultCurrency: "USD",
  supportedCurrencies: ["USD", "CAD", "EUR", "GBP"],
  metaTitle: "ASNPRVCTR | Premium Boutique Clothing",
  metaDescription: "Discover premium boutique clothing and accessories at ASNPRVCTR. International shipping available.",
  googleAnalyticsId: "UA-123456789-1",
  facebookPixelId: "987654321",
  enableMultiCurrency: true,
  enableMultiLanguage: true,
  enableGeoIpRedirect: true,
}

const defaultSocialMedia: SocialMedia = {
  facebook: "https://facebook.com/asnprvctr",
  instagram: "https://instagram.com/asnprvctr",
  twitter: "https://twitter.com/asnprvctr",
  linkedin: "https://linkedin.com/company/asnprvctr",
  youtube: "https://youtube.com/c/asnprvctr",
  pinterest: "",
  tiktok: "https://tiktok.com/@asnprvctr",
}

// Create the store
export const useStoreManagement = create<StoreManagementState>()(
  persist(
    (set) => ({
      storeProfile: defaultStoreProfile,
      updateStoreProfile: (data) =>
        set((state) => ({
          storeProfile: { ...state.storeProfile, ...data },
        })),

      colorSettings: defaultColorSettings,
      updateColorSettings: (data) =>
        set((state) => ({
          colorSettings: { ...state.colorSettings, ...data },
        })),

      fontSettings: defaultFontSettings,
      updateFontSettings: (data) =>
        set((state) => ({
          fontSettings: { ...state.fontSettings, ...data },
        })),

      layoutSettings: defaultLayoutSettings,
      updateLayoutSettings: (data) =>
        set((state) => ({
          layoutSettings: { ...state.layoutSettings, ...data },
        })),

      returnPolicy: defaultReturnPolicy,
      updateReturnPolicy: (data) =>
        set((state) => ({
          returnPolicy: { ...state.returnPolicy, ...data },
        })),

      shippingPolicy: defaultShippingPolicy,
      updateShippingPolicy: (data) =>
        set((state) => ({
          shippingPolicy: { ...state.shippingPolicy, ...data },
        })),

      privacyPolicy: defaultPrivacyPolicy,
      updatePrivacyPolicy: (data) =>
        set((state) => ({
          privacyPolicy: { ...state.privacyPolicy, ...data },
        })),

      termsOfService: defaultTermsOfService,
      updateTermsOfService: (data) =>
        set((state) => ({
          termsOfService: { ...state.termsOfService, ...data },
        })),

      onlinePresence: defaultOnlinePresence,
      updateOnlinePresence: (data) =>
        set((state) => ({
          onlinePresence: { ...state.onlinePresence, ...data },
        })),

      socialMedia: defaultSocialMedia,
      updateSocialMedia: (data) =>
        set((state) => ({
          socialMedia: { ...state.socialMedia, ...data },
        })),
    }),
    {
      name: "store-management-storage",
    },
  ),
)

