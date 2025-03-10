"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp, Edit, Filter, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { countries } from "@/lib/countries-data"
import { useTaxStore } from "@/lib/tax-store"

export function TaxManagement() {
  const { overrides, addOverride, removeOverride, getTaxRate } = useTaxStore()

  // State for search, filter, and sort
  const [searchQuery, setSearchQuery] = useState("")
  const [showRegions, setShowRegions] = useState<Record<string, boolean>>({})
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "ascending" | "descending"
  }>({ key: "name", direction: "ascending" })
  const [filterConfig, setFilterConfig] = useState<{
    minRate: number | null
    maxRate: number | null
    onlyWithOverrides: boolean
  }>({
    minRate: null,
    maxRate: null,
    onlyWithOverrides: false,
  })

  // Dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingTax, setEditingTax] = useState<{
    countryCode: string
    regionCode?: string
    rate: number
  } | null>(null)

  // Filter dialog state
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)

  // Toggle region visibility
  const toggleRegionVisibility = (countryCode: string) => {
    setShowRegions((prev) => ({
      ...prev,
      [countryCode]: !prev[countryCode],
    }))
  }

  // Handle sort
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Filtered and sorted data
  const filteredCountries = useMemo(() => {
    let result = [...countries]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (country) =>
          country.name.toLowerCase().includes(query) ||
          country.code.toLowerCase().includes(query) ||
          country.regions.some(
            (region) => region.name.toLowerCase().includes(query) || region.code.toLowerCase().includes(query),
          ),
      )
    }

    // Apply rate filters
    if (filterConfig.minRate !== null || filterConfig.maxRate !== null || filterConfig.onlyWithOverrides) {
      result = result.filter((country) => {
        // Check if country has any overrides if that filter is active
        if (filterConfig.onlyWithOverrides) {
          const hasCountryOverride = overrides.some((o) => o.countryCode === country.code && !o.regionCode)
          const hasRegionOverride = overrides.some((o) => o.countryCode === country.code && o.regionCode)

          if (!hasCountryOverride && !hasRegionOverride) {
            return false
          }
        }

        // Check rate range if those filters are active
        if (filterConfig.minRate !== null || filterConfig.maxRate !== null) {
          const countryRate = getTaxRate(country.code) * 100

          if (filterConfig.minRate !== null && countryRate < filterConfig.minRate) {
            return false
          }

          if (filterConfig.maxRate !== null && countryRate > filterConfig.maxRate) {
            return false
          }
        }

        return true
      })
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0

      if (sortConfig.key === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortConfig.key === "code") {
        comparison = a.code.localeCompare(b.code)
      } else if (sortConfig.key === "rate") {
        const rateA = getTaxRate(a.code) * 100
        const rateB = getTaxRate(b.code) * 100
        comparison = rateA - rateB
      }

      return sortConfig.direction === "ascending" ? comparison : -comparison
    })

    return result
  }, [countries, searchQuery, sortConfig, filterConfig, overrides, getTaxRate])

  // Open edit dialog
  const openEditDialog = (countryCode: string, regionCode?: string) => {
    const currentRate = getTaxRate(countryCode, regionCode) * 100
    setEditingTax({
      countryCode,
      regionCode,
      rate: currentRate,
    })
    setEditDialogOpen(true)
  }

  // Save tax rate
  const saveTaxRate = () => {
    if (!editingTax) return

    addOverride({
      countryCode: editingTax.countryCode,
      regionCode: editingTax.regionCode,
      rate: editingTax.rate,
    })

    setEditDialogOpen(false)
    setEditingTax(null)
  }

  // Reset tax rate to default
  const resetTaxRate = () => {
    if (!editingTax) return

    removeOverride(editingTax.countryCode, editingTax.regionCode)
    setEditDialogOpen(false)
    setEditingTax(null)
  }

  // Apply filters
  const applyFilters = (filters: typeof filterConfig) => {
    setFilterConfig(filters)
    setFilterDialogOpen(false)
  }

  // Check if a tax rate is overridden
  const isOverridden = (countryCode: string, regionCode?: string) => {
    return overrides.some((o) => o.countryCode === countryCode && o.regionCode === regionCode)
  }

  return (
    <div className="space-y-4">
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Tax Registration</h3>
              <p className="text-sm text-muted-foreground">Business registered in Ontario, Canada</p>
              <div className="flex gap-4 mt-2">
                <div>
                  <p className="text-xs font-medium">GST/HST Registration</p>
                  <p className="text-sm">123456789 RT0001</p>
                </div>
                <div>
                  <p className="text-xs font-medium">PST/QST Registration</p>
                  <p className="text-sm">Not applicable in Ontario</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              HST Registered
            </Badge>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search countries or regions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setFilterDialogOpen(true)}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSortConfig({
                key: "name",
                direction: "ascending",
              })
              setFilterConfig({
                minRate: null,
                maxRate: null,
                onlyWithOverrides: false,
              })
              setSearchQuery("")
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      {(filterConfig.minRate !== null || filterConfig.maxRate !== null || filterConfig.onlyWithOverrides) && (
        <div className="flex flex-wrap gap-2">
          {filterConfig.onlyWithOverrides && <Badge variant="outline">Only with overrides</Badge>}

          {filterConfig.minRate !== null && <Badge variant="outline">Min rate: {filterConfig.minRate}%</Badge>}

          {filterConfig.maxRate !== null && <Badge variant="outline">Max rate: {filterConfig.maxRate}%</Badge>}
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <Button variant="ghost" onClick={() => requestSort("name")} className="flex items-center">
                    Country
                    {sortConfig.key === "name" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
                <TableHead className="w-[100px]">
                  <Button variant="ghost" onClick={() => requestSort("code")} className="flex items-center">
                    Code
                    {sortConfig.key === "code" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
                <TableHead className="w-[150px]">
                  <Button variant="ghost" onClick={() => requestSort("rate")} className="flex items-center">
                    Tax Rate
                    {sortConfig.key === "rate" &&
                      (sortConfig.direction === "ascending" ? (
                        <ChevronUp className="ml-2 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-2 h-4 w-4" />
                      ))}
                  </Button>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCountries.map((country) => (
                <>
                  <TableRow key={country.code}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {country.regions.length > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mr-2 p-0 h-6 w-6"
                            onClick={() => toggleRegionVisibility(country.code)}
                          >
                            {showRegions[country.code] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronUp className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                        {country.name}
                      </div>
                    </TableCell>
                    <TableCell>{country.code}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {(getTaxRate(country.code) * 100).toFixed(2)}%
                        {isOverridden(country.code) && (
                          <Badge variant="secondary" className="ml-2">
                            Custom
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(country.code)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Render regions if expanded */}
                  {showRegions[country.code] &&
                    country.regions.map((region) => (
                      <TableRow key={`${country.code}-${region.code}`} className="bg-muted/50">
                        <TableCell className="font-medium pl-10">{region.name}</TableCell>
                        <TableCell>{region.code}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {(getTaxRate(country.code, region.code) * 100).toFixed(2)}%
                            {isOverridden(country.code, region.code) && (
                              <Badge variant="secondary" className="ml-2">
                                Custom
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(country.code, region.code)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              ))}

              {filteredCountries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    No countries found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Tax Rate Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Tax Rate</DialogTitle>
            <DialogDescription>
              {editingTax && (
                <>
                  {editingTax.regionCode
                    ? `Update tax rate for ${countries.find((c) => c.code === editingTax.countryCode)?.name} - 
                     ${countries.find((c) => c.code === editingTax.countryCode)?.regions.find((r) => r.code === editingTax.regionCode)?.name}`
                    : `Update tax rate for ${countries.find((c) => c.code === editingTax.countryCode)?.name}`}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tax-rate">Tax Rate (%)</Label>
              <Input
                id="tax-rate"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={editingTax?.rate || 0}
                onChange={(e) =>
                  setEditingTax((prev) => (prev ? { ...prev, rate: Number.parseFloat(e.target.value) } : null))
                }
              />
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between">
            <Button variant="outline" onClick={resetTaxRate}>
              Reset to Default
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveTaxRate}>Save Changes</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Tax Rates</DialogTitle>
            <DialogDescription>Set filters to narrow down the tax rates displayed</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Tax Rate Range (%)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  min="0"
                  max="100"
                  value={filterConfig.minRate !== null ? filterConfig.minRate : ""}
                  onChange={(e) =>
                    setFilterConfig((prev) => ({
                      ...prev,
                      minRate: e.target.value ? Number.parseFloat(e.target.value) : null,
                    }))
                  }
                />
                <span>to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  min="0"
                  max="100"
                  value={filterConfig.maxRate !== null ? filterConfig.maxRate : ""}
                  onChange={(e) =>
                    setFilterConfig((prev) => ({
                      ...prev,
                      maxRate: e.target.value ? Number.parseFloat(e.target.value) : null,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="only-overrides"
                checked={filterConfig.onlyWithOverrides}
                onCheckedChange={(checked) =>
                  setFilterConfig((prev) => ({
                    ...prev,
                    onlyWithOverrides: checked === true,
                  }))
                }
              />
              <Label htmlFor="only-overrides">Only show countries with custom tax rates</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setFilterConfig({
                  minRate: null,
                  maxRate: null,
                  onlyWithOverrides: false,
                })
              }
            >
              Reset Filters
            </Button>
            <Button onClick={() => applyFilters(filterConfig)}>Apply Filters</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

