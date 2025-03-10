"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronUp, Edit, Filter, MoreHorizontal, Plus, Search, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { countries } from "@/lib/countries-data"
import { useShippingStore, type ShippingMethod } from "@/lib/shipping-store"

export function ShippingManagement() {
  const {
    methods,
    countryShipping,
    addMethod,
    updateMethod,
    removeMethod,
    setCountryAvailability,
    setCountryMethodAvailability,
    updateCountryMethod,
  } = useShippingStore()

  // State for search, filter, and sort
  const [searchQuery, setSearchQuery] = useState("")
  const [showMethods, setShowMethods] = useState<Record<string, boolean>>({})
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: "ascending" | "descending"
  }>({ key: "name", direction: "ascending" })
  const [filterConfig, setFilterConfig] = useState<{
    onlyAvailable: boolean
    shippingMethod?: string
  }>({
    onlyAvailable: false,
    shippingMethod: undefined,
  })

  // Dialog states
  const [methodDialogOpen, setMethodDialogOpen] = useState(false)
  const [editingMethod, setEditingMethod] = useState<ShippingMethod | null>(null)
  const [isNewMethod, setIsNewMethod] = useState(false)

  const [countryMethodDialogOpen, setCountryMethodDialogOpen] = useState(false)
  const [editingCountryMethod, setEditingCountryMethod] = useState<{
    countryCode: string
    methodId: string
    priceMultiplier: number
    additionalFee: number
    available: boolean
  } | null>(null)

  // Filter dialog state
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)

  // Toggle methods visibility
  const toggleMethodsVisibility = (countryCode: string) => {
    setShowMethods((prev) => ({
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
        (country) => country.name.toLowerCase().includes(query) || country.code.toLowerCase().includes(query),
      )
    }

    // Apply availability filter
    if (filterConfig.onlyAvailable) {
      result = result.filter((country) => {
        const countryShippingInfo = countryShipping.find((cs) => cs.countryCode === country.code)
        return countryShippingInfo?.available === true
      })
    }

    // Apply shipping method filter
    if (filterConfig.shippingMethod) {
      result = result.filter((country) => {
        const countryShippingInfo = countryShipping.find((cs) => cs.countryCode === country.code)
        if (!countryShippingInfo) return false

        return countryShippingInfo.methods.some((m) => m.methodId === filterConfig.shippingMethod && m.available)
      })
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0

      if (sortConfig.key === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortConfig.key === "code") {
        comparison = a.code.localeCompare(b.code)
      } else if (sortConfig.key === "availability") {
        const availA = countryShipping.find((cs) => cs.countryCode === a.code)?.available || false
        const availB = countryShipping.find((cs) => cs.countryCode === b.code)?.available || false
        comparison = availA === availB ? 0 : availA ? -1 : 1
      }

      return sortConfig.direction === "ascending" ? comparison : -comparison
    })

    return result
  }, [countries, searchQuery, sortConfig, filterConfig, countryShipping])

  // Open method dialog
  const openMethodDialog = (method?: ShippingMethod) => {
    if (method) {
      setEditingMethod({ ...method })
      setIsNewMethod(false)
    } else {
      setEditingMethod({
        id: `method-${Date.now()}`,
        name: "",
        description: "",
        estimatedDeliveryDays: 5,
        price: 9.99,
      })
      setIsNewMethod(true)
    }
    setMethodDialogOpen(true)
  }

  // Save shipping method
  const saveShippingMethod = () => {
    if (!editingMethod) return

    if (isNewMethod) {
      addMethod(editingMethod)
    } else {
      updateMethod(editingMethod.id, editingMethod)
    }

    setMethodDialogOpen(false)
    setEditingMethod(null)
  }

  // Open country method dialog
  const openCountryMethodDialog = (countryCode: string, methodId: string) => {
    const countryInfo = countryShipping.find((cs) => cs.countryCode === countryCode)
    if (!countryInfo) return

    const methodInfo = countryInfo.methods.find((m) => m.methodId === methodId)

    setEditingCountryMethod({
      countryCode,
      methodId,
      priceMultiplier: methodInfo?.priceMultiplier || 1,
      additionalFee: methodInfo?.additionalFee || 0,
      available: methodInfo?.available || false,
    })

    setCountryMethodDialogOpen(true)
  }

  // Save country method
  const saveCountryMethod = () => {
    if (!editingCountryMethod) return

    const { countryCode, methodId, priceMultiplier, additionalFee, available } = editingCountryMethod

    updateCountryMethod(countryCode, methodId, {
      priceMultiplier,
      additionalFee,
      available,
    })

    setCountryMethodDialogOpen(false)
    setEditingCountryMethod(null)
  }

  // Toggle country availability
  const toggleCountryAvailability = (countryCode: string, available: boolean) => {
    setCountryAvailability(countryCode, available)
  }

  // Toggle method availability for a country
  const toggleMethodAvailability = (countryCode: string, methodId: string, available: boolean) => {
    setCountryMethodAvailability(countryCode, methodId, available)
  }

  // Apply filters
  const applyFilters = (filters: typeof filterConfig) => {
    setFilterConfig(filters)
    setFilterDialogOpen(false)
  }

  // Get shipping price for a country and method
  const getShippingPrice = (countryCode: string, methodId: string) => {
    const method = methods.find((m) => m.id === methodId)
    if (!method) return null

    const countryInfo = countryShipping.find((cs) => cs.countryCode === countryCode)
    if (!countryInfo) return method.price

    const methodInfo = countryInfo.methods.find((m) => m.methodId === methodId)
    if (!methodInfo) return method.price

    return method.price * methodInfo.priceMultiplier + methodInfo.additionalFee
  }

  return (
    <div className="space-y-4">
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Shipping Origin</h3>
              <p className="text-sm text-muted-foreground">Toronto, Ontario, Canada</p>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Primary Location
            </Badge>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search countries..."
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

          <Button variant="default" size="sm" onClick={() => openMethodDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Add Method
          </Button>
        </div>
      </div>

      {(filterConfig.onlyAvailable || filterConfig.shippingMethod) && (
        <div className="flex flex-wrap gap-2">
          {filterConfig.onlyAvailable && <Badge variant="outline">Only available countries</Badge>}

          {filterConfig.shippingMethod && (
            <Badge variant="outline">Method: {methods.find((m) => m.id === filterConfig.shippingMethod)?.name}</Badge>
          )}
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
                  <Button variant="ghost" onClick={() => requestSort("availability")} className="flex items-center">
                    Available
                    {sortConfig.key === "availability" &&
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
              {filteredCountries.map((country) => {
                const countryInfo = countryShipping.find((cs) => cs.countryCode === country.code)
                const isAvailable = countryInfo?.available || false

                return (
                  <>
                    <TableRow key={country.code}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mr-2 p-0 h-6 w-6"
                            onClick={() => toggleMethodsVisibility(country.code)}
                          >
                            {showMethods[country.code] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronUp className="h-4 w-4" />
                            )}
                          </Button>
                          {country.name}
                        </div>
                      </TableCell>
                      <TableCell>{country.code}</TableCell>
                      <TableCell>
                        <Switch
                          checked={isAvailable}
                          onCheckedChange={(checked) => toggleCountryAvailability(country.code, checked)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toggleMethodsVisibility(country.code)}>
                              {showMethods[country.code] ? "Hide Methods" : "Show Methods"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleCountryAvailability(country.code, !isAvailable)}>
                              {isAvailable ? "Disable Shipping" : "Enable Shipping"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>

                    {/* Render shipping methods if expanded */}
                    {showMethods[country.code] &&
                      methods.map((method) => {
                        const countryMethod = countryInfo?.methods.find((m) => m.methodId === method.id)
                        const isMethodAvailable = countryMethod?.available || false
                        const price = getShippingPrice(country.code, method.id)

                        return (
                          <TableRow key={`${country.code}-${method.id}`} className="bg-muted/50">
                            <TableCell className="font-medium pl-10">
                              {method.name}
                              <div className="text-xs text-muted-foreground">{method.description}</div>
                            </TableCell>
                            <TableCell>
                              {isMethodAvailable ? (
                                <Badge variant="outline" className="bg-green-50">
                                  <Check className="mr-1 h-3 w-3 text-green-500" />
                                  Active
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-50">
                                  <X className="mr-1 h-3 w-3 text-red-500" />
                                  Inactive
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{price ? `$${price.toFixed(2)}` : "N/A"}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openCountryMethodDialog(country.code, method.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                  </>
                )
              })}

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

      {/* Shipping Method Dialog */}
      <Dialog open={methodDialogOpen} onOpenChange={setMethodDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isNewMethod ? "Add Shipping Method" : "Edit Shipping Method"}</DialogTitle>
            <DialogDescription>
              {isNewMethod
                ? "Create a new shipping method for your store"
                : "Update the details of this shipping method"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="method-name">Method Name</Label>
              <Input
                id="method-name"
                value={editingMethod?.name || ""}
                onChange={(e) => setEditingMethod((prev) => (prev ? { ...prev, name: e.target.value } : null))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="method-description">Description</Label>
              <Input
                id="method-description"
                value={editingMethod?.description || ""}
                onChange={(e) => setEditingMethod((prev) => (prev ? { ...prev, description: e.target.value } : null))}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="delivery-days">Estimated Delivery (Days)</Label>
                <Input
                  id="delivery-days"
                  type="number"
                  min="1"
                  value={editingMethod?.estimatedDeliveryDays || 1}
                  onChange={(e) =>
                    setEditingMethod((prev) =>
                      prev ? { ...prev, estimatedDeliveryDays: Number.parseInt(e.target.value) } : null,
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="base-price">Base Price ($)</Label>
                <Input
                  id="base-price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={editingMethod?.price || 0}
                  onChange={(e) =>
                    setEditingMethod((prev) => (prev ? { ...prev, price: Number.parseFloat(e.target.value) } : null))
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setMethodDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveShippingMethod}>{isNewMethod ? "Add Method" : "Save Changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Country Method Dialog */}
      <Dialog open={countryMethodDialogOpen} onOpenChange={setCountryMethodDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Shipping Method for Country</DialogTitle>
            <DialogDescription>
              {editingCountryMethod && (
                <>
                  Configure {methods.find((m) => m.id === editingCountryMethod.methodId)?.name}
                  for {countries.find((c) => c.code === editingCountryMethod.countryCode)?.name}
                </>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="method-available">Available</Label>
              <Switch
                id="method-available"
                checked={editingCountryMethod?.available || false}
                onCheckedChange={(checked) =>
                  setEditingCountryMethod((prev) => (prev ? { ...prev, available: checked } : null))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price-multiplier">Price Multiplier</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="price-multiplier"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={editingCountryMethod?.priceMultiplier || 1}
                  onChange={(e) =>
                    setEditingCountryMethod((prev) =>
                      prev ? { ...prev, priceMultiplier: Number.parseFloat(e.target.value) } : null,
                    )
                  }
                />
                <span className="text-sm text-muted-foreground">x base price</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Use this to adjust the base price for this country (e.g., 1.5 = 50% more)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional-fee">Additional Fee ($)</Label>
              <Input
                id="additional-fee"
                type="number"
                step="0.01"
                min="0"
                value={editingCountryMethod?.additionalFee || 0}
                onChange={(e) =>
                  setEditingCountryMethod((prev) =>
                    prev ? { ...prev, additionalFee: Number.parseFloat(e.target.value) } : null,
                  )
                }
              />
              <p className="text-xs text-muted-foreground">Fixed amount added to the adjusted base price</p>
            </div>

            {editingCountryMethod && (
              <div className="rounded-md bg-muted p-4">
                <h4 className="font-medium mb-2">Final Price Calculation</h4>
                <p className="text-sm">
                  Base price: ${methods.find((m) => m.id === editingCountryMethod.methodId)?.price.toFixed(2) || "0.00"}
                </p>
                <p className="text-sm">× Multiplier: {editingCountryMethod.priceMultiplier.toFixed(2)}</p>
                <p className="text-sm">+ Additional fee: ${editingCountryMethod.additionalFee.toFixed(2)}</p>
                <Separator className="my-2" />
                <p className="font-medium">
                  = Final price: $
                  {(
                    (methods.find((m) => m.id === editingCountryMethod.methodId)?.price || 0) *
                      editingCountryMethod.priceMultiplier +
                    editingCountryMethod.additionalFee
                  ).toFixed(2)}
                </p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCountryMethodDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveCountryMethod}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Shipping Options</DialogTitle>
            <DialogDescription>Set filters to narrow down the countries displayed</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="only-available"
                checked={filterConfig.onlyAvailable}
                onCheckedChange={(checked) =>
                  setFilterConfig((prev) => ({
                    ...prev,
                    onlyAvailable: checked === true,
                  }))
                }
              />
              <Label htmlFor="only-available">Only show countries with shipping enabled</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="shipping-method">Filter by Shipping Method</Label>
              <Select
                value={filterConfig.shippingMethod}
                onValueChange={(value) =>
                  setFilterConfig((prev) => ({
                    ...prev,
                    shippingMethod: value || undefined,
                  }))
                }
              >
                <SelectTrigger id="shipping-method">
                  <SelectValue placeholder="All shipping methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All shipping methods</SelectItem>
                  {methods.map((method) => (
                    <SelectItem key={method.id} value={method.id || "method-default"}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() =>
                setFilterConfig({
                  onlyAvailable: false,
                  shippingMethod: undefined,
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

