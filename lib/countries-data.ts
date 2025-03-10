export interface Region {
  code: string
  name: string
  taxRate?: number
}

export interface Country {
  code: string
  name: string
  regions: Region[]
  addressFormat: string
  phoneFormat?: string
  postalCodeFormat?: string
  postalCodeLabel?: string
  defaultTaxRate: number
}

export const countries: Country[] = [
  {
    code: "US",
    name: "United States",
    defaultTaxRate: 0,
    addressFormat: "street, city, region, postalCode",
    postalCodeLabel: "ZIP Code",
    regions: [
      { code: "AL", name: "Alabama", taxRate: 4 },
      { code: "AK", name: "Alaska", taxRate: 0 },
      { code: "AZ", name: "Arizona", taxRate: 5.6 },
      { code: "AR", name: "Arkansas", taxRate: 6.5 },
      { code: "CA", name: "California", taxRate: 7.25 },
      { code: "CO", name: "Colorado", taxRate: 2.9 },
      { code: "CT", name: "Connecticut", taxRate: 6.35 },
      { code: "DE", name: "Delaware", taxRate: 0 },
      { code: "FL", name: "Florida", taxRate: 6 },
      { code: "GA", name: "Georgia", taxRate: 4 },
      { code: "HI", name: "Hawaii", taxRate: 4 },
      { code: "ID", name: "Idaho", taxRate: 6 },
      { code: "IL", name: "Illinois", taxRate: 6.25 },
      { code: "IN", name: "Indiana", taxRate: 7 },
      { code: "IA", name: "Iowa", taxRate: 6 },
      { code: "KS", name: "Kansas", taxRate: 6.5 },
      { code: "KY", name: "Kentucky", taxRate: 6 },
      { code: "LA", name: "Louisiana", taxRate: 4.45 },
      { code: "ME", name: "Maine", taxRate: 5.5 },
      { code: "MD", name: "Maryland", taxRate: 6 },
      { code: "MA", name: "Massachusetts", taxRate: 6.25 },
      { code: "MI", name: "Michigan", taxRate: 6 },
      { code: "MN", name: "Minnesota", taxRate: 6.875 },
      { code: "MS", name: "Mississippi", taxRate: 7 },
      { code: "MO", name: "Missouri", taxRate: 4.225 },
      { code: "MT", name: "Montana", taxRate: 0 },
      { code: "NE", name: "Nebraska", taxRate: 5.5 },
      { code: "NV", name: "Nevada", taxRate: 6.85 },
      { code: "NH", name: "New Hampshire", taxRate: 0 },
      { code: "NJ", name: "New Jersey", taxRate: 6.625 },
      { code: "NM", name: "New Mexico", taxRate: 5.125 },
      { code: "NY", name: "New York", taxRate: 4 },
      { code: "NC", name: "North Carolina", taxRate: 4.75 },
      { code: "ND", name: "North Dakota", taxRate: 5 },
      { code: "OH", name: "Ohio", taxRate: 5.75 },
      { code: "OK", name: "Oklahoma", taxRate: 4.5 },
      { code: "OR", name: "Oregon", taxRate: 0 },
      { code: "PA", name: "Pennsylvania", taxRate: 6 },
      { code: "RI", name: "Rhode Island", taxRate: 7 },
      { code: "SC", name: "South Carolina", taxRate: 6 },
      { code: "SD", name: "South Dakota", taxRate: 4.5 },
      { code: "TN", name: "Tennessee", taxRate: 7 },
      { code: "TX", name: "Texas", taxRate: 6.25 },
      { code: "UT", name: "Utah", taxRate: 6.1 },
      { code: "VT", name: "Vermont", taxRate: 6 },
      { code: "VA", name: "Virginia", taxRate: 5.3 },
      { code: "WA", name: "Washington", taxRate: 6.5 },
      { code: "WV", name: "West Virginia", taxRate: 6 },
      { code: "WI", name: "Wisconsin", taxRate: 5 },
      { code: "WY", name: "Wyoming", taxRate: 4 },
    ],
  },
  {
    code: "CA",
    name: "Canada",
    defaultTaxRate: 5, // GST
    addressFormat: "street, city, region, postalCode",
    postalCodeLabel: "Postal Code",
    regions: [
      { code: "AB", name: "Alberta", taxRate: 5 },
      { code: "BC", name: "British Columbia", taxRate: 12 },
      { code: "MB", name: "Manitoba", taxRate: 12 },
      { code: "NB", name: "New Brunswick", taxRate: 15 },
      { code: "NL", name: "Newfoundland and Labrador", taxRate: 15 },
      { code: "NT", name: "Northwest Territories", taxRate: 5 },
      { code: "NS", name: "Nova Scotia", taxRate: 15 },
      { code: "NU", name: "Nunavut", taxRate: 5 },
      { code: "ON", name: "Ontario", taxRate: 13 },
      { code: "PE", name: "Prince Edward Island", taxRate: 15 },
      { code: "QC", name: "Quebec", taxRate: 14.975 },
      { code: "SK", name: "Saskatchewan", taxRate: 11 },
      { code: "YT", name: "Yukon", taxRate: 5 },
    ],
  },
  {
    code: "UK",
    name: "United Kingdom",
    defaultTaxRate: 20, // VAT
    addressFormat: "street, city, postalCode",
    postalCodeLabel: "Postal Code",
    regions: [
      { code: "ENG", name: "England" },
      { code: "NIR", name: "Northern Ireland" },
      { code: "SCT", name: "Scotland" },
      { code: "WLS", name: "Wales" },
    ],
  },
  {
    code: "AU",
    name: "Australia",
    defaultTaxRate: 10, // GST
    addressFormat: "street, city, region, postalCode",
    postalCodeLabel: "Postal Code",
    regions: [
      { code: "ACT", name: "Australian Capital Territory" },
      { code: "NSW", name: "New South Wales" },
      { code: "NT", name: "Northern Territory" },
      { code: "QLD", name: "Queensland" },
      { code: "SA", name: "South Australia" },
      { code: "TAS", name: "Tasmania" },
      { code: "VIC", name: "Victoria" },
      { code: "WA", name: "Western Australia" },
    ],
  },
  {
    code: "DE",
    name: "Germany",
    defaultTaxRate: 19, // VAT
    addressFormat: "street, postalCode, city",
    postalCodeLabel: "Postal Code",
    regions: [],
  },
  {
    code: "FR",
    name: "France",
    defaultTaxRate: 20, // VAT
    addressFormat: "street, postalCode, city",
    postalCodeLabel: "Postal Code",
    regions: [],
  },
  {
    code: "JP",
    name: "Japan",
    defaultTaxRate: 10,
    addressFormat: "postalCode, region, city, street",
    postalCodeLabel: "Postal Code",
    regions: [
      { code: "01", name: "Hokkaido" },
      { code: "02", name: "Aomori" },
      { code: "03", name: "Iwate" },
      { code: "04", name: "Miyagi" },
      { code: "05", name: "Akita" },
      { code: "06", name: "Yamagata" },
      { code: "07", name: "Fukushima" },
      { code: "08", name: "Ibaraki" },
      { code: "09", name: "Tochigi" },
      { code: "10", name: "Gunma" },
      { code: "11", name: "Saitama" },
      { code: "12", name: "Chiba" },
      { code: "13", name: "Tokyo" },
      { code: "14", name: "Kanagawa" },
      // Additional prefectures omitted for brevity
    ],
  },
]

export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find((country) => country.code === code)
}

export const getRegionByCode = (countryCode: string, regionCode: string): Region | undefined => {
  const country = getCountryByCode(countryCode)
  if (!country) return undefined
  return country.regions.find((region) => region.code === regionCode)
}

export const getTaxRate = (countryCode: string, regionCode?: string): number => {
  const country = getCountryByCode(countryCode)
  if (!country) return 0

  if (regionCode && country.regions.length > 0) {
    const region = getRegionByCode(countryCode, regionCode)
    if (region && typeof region.taxRate === "number") {
      return region.taxRate / 100
    }
  }

  return country.defaultTaxRate / 100
}

