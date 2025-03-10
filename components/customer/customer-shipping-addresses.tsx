"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface Address {
  id: string
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
  phone?: string
}

export function CustomerShippingAddresses() {
  const { toast } = useToast()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    country: "US",
    isDefault: false,
  })

  const handleSaveAddress = () => {
    if (editingAddress) {
      setAddresses(
        addresses.map((addr) => {
          if (addr.id === editingAddress.id) {
            return editingAddress
          }
          // If the edited address is being set as default, remove default from others
          return editingAddress.isDefault ? { ...addr, isDefault: false } : addr
        }),
      )
      setEditingAddress(null)
      toast({
        title: "Address updated",
        description: "Your shipping address has been updated successfully.",
      })
    } else if (isAddingAddress) {
      if (addresses.length >= 3) {
        toast({
          title: "Address limit reached",
          description: "You can only have up to 3 shipping addresses. Please remove one before adding another.",
          variant: "destructive",
        })
        return
      }

      const id = `addr-${Date.now()}`
      const addressToAdd = {
        ...newAddress,
        id,
        isDefault: addresses.length === 0, // Make first address default
      } as Address

      setAddresses((prev) => {
        // If this is the first address or explicitly set as default, update other addresses
        if (addressToAdd.isDefault) {
          return [...prev.map((a) => ({ ...a, isDefault: false })), addressToAdd]
        }
        return [...prev, addressToAdd]
      })
      setIsAddingAddress(false)
      setNewAddress({ country: "US", isDefault: false })

      toast({
        title: "Address added",
        description: "Your new shipping address has been added successfully.",
      })
    }
  }

  const handleDeleteAddress = (id: string) => {
    const addressToDelete = addresses.find((addr) => addr.id === id)
    setAddresses((prev) => {
      const filtered = prev.filter((addr) => addr.id !== id)

      // If we deleted the default address and there are other addresses,
      // make the first one the default
      if (addressToDelete?.isDefault && filtered.length > 0) {
        filtered[0].isDefault = true
      }

      return filtered
    })

    toast({
      title: "Address removed",
      description: "The shipping address has been deleted.",
    })
  }

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )

    toast({
      title: "Default address updated",
      description: "Your default shipping address has been updated.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Shipping Addresses</h2>
        <Button
          onClick={() => setIsAddingAddress(true)}
          variant="outline"
          className="gap-2"
          disabled={addresses.length >= 3}
        >
          <Plus className="h-4 w-4" />
          Add Address
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {addresses.map((address) => (
          <Card key={address.id} className="relative">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium">{address.name}</h3>
                  {address.isDefault && (
                    <Badge variant="secondary" className="mt-1">
                      Default
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditingAddress(address)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
                {address.phone && <p>{address.phone}</p>}
              </div>

              {!address.isDefault && (
                <Button variant="link" className="mt-4 h-auto p-0 text-sm" onClick={() => handleSetDefault(address.id)}>
                  Set as default
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        {addresses.length < 3 && (
          <Card className="border-dashed">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="h-full w-full min-h-[200px] flex flex-col items-center gap-2"
                onClick={() => setIsAddingAddress(true)}
              >
                <Plus className="h-8 w-8" />
                <span>Add Address</span>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog
        open={isAddingAddress || !!editingAddress}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddingAddress(false)
            setEditingAddress(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
          </DialogHeader>
          <form
            className="grid gap-4 py-4"
            autoComplete="on"
            onSubmit={(e) => {
              e.preventDefault()
              handleSaveAddress()
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="shipping-name">Address Name</Label>
              <Input
                id="shipping-name"
                name="shipping-name"
                placeholder="Home, Work, etc."
                value={editingAddress?.name || newAddress.name || ""}
                onChange={(e) => {
                  if (editingAddress) {
                    setEditingAddress({ ...editingAddress, name: e.target.value })
                  } else {
                    setNewAddress({ ...newAddress, name: e.target.value })
                  }
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address-line1">Street Address</Label>
              <Input
                id="address-line1"
                name="address-line1"
                autoComplete="shipping address-line1"
                placeholder="123 Main St"
                value={editingAddress?.line1 || newAddress.line1 || ""}
                onChange={(e) => {
                  if (editingAddress) {
                    setEditingAddress({ ...editingAddress, line1: e.target.value })
                  } else {
                    setNewAddress({ ...newAddress, line1: e.target.value })
                  }
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address-line2">Apartment, Suite, etc. (optional)</Label>
              <Input
                id="address-line2"
                name="address-line2"
                autoComplete="shipping address-line2"
                placeholder="Apt 4B"
                value={editingAddress?.line2 || newAddress.line2 || ""}
                onChange={(e) => {
                  if (editingAddress) {
                    setEditingAddress({ ...editingAddress, line2: e.target.value })
                  } else {
                    setNewAddress({ ...newAddress, line2: e.target.value })
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="address-level2">City</Label>
                <Input
                  id="address-level2"
                  name="address-level2"
                  autoComplete="shipping address-level2"
                  placeholder="Toronto"
                  value={editingAddress?.city || newAddress.city || ""}
                  onChange={(e) => {
                    if (editingAddress) {
                      setEditingAddress({ ...editingAddress, city: e.target.value })
                    } else {
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address-level1">State/Province</Label>
                <Input
                  id="address-level1"
                  name="address-level1"
                  autoComplete="shipping address-level1"
                  placeholder="Ontario"
                  value={editingAddress?.state || newAddress.state || ""}
                  onChange={(e) => {
                    if (editingAddress) {
                      setEditingAddress({ ...editingAddress, state: e.target.value })
                    } else {
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="postal-code">Postal Code</Label>
                <Input
                  id="postal-code"
                  name="postal-code"
                  autoComplete="shipping postal-code"
                  placeholder="M5V 2H1"
                  value={editingAddress?.postalCode || newAddress.postalCode || ""}
                  onChange={(e) => {
                    if (editingAddress) {
                      setEditingAddress({ ...editingAddress, postalCode: e.target.value })
                    } else {
                      setNewAddress({ ...newAddress, postalCode: e.target.value })
                    }
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={editingAddress?.country || newAddress.country || "US"}
                  onValueChange={(value) => {
                    if (editingAddress) {
                      setEditingAddress({ ...editingAddress, country: value })
                    } else {
                      setNewAddress({ ...newAddress, country: value })
                    }
                  }}
                >
                  <SelectTrigger id="country" name="country" autoComplete="shipping country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tel">Phone Number (optional)</Label>
              <Input
                id="tel"
                name="tel"
                type="tel"
                autoComplete="shipping tel"
                placeholder="(123) 456-7890"
                value={editingAddress?.phone || newAddress.phone || ""}
                onChange={(e) => {
                  if (editingAddress) {
                    setEditingAddress({ ...editingAddress, phone: e.target.value })
                  } else {
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                }}
              />
            </div>
            {!editingAddress?.isDefault && addresses.length === 0 && (
              <div className="flex items-center space-x-2">
                <Label htmlFor="isDefault" className="text-sm font-normal">
                  This will be set as your default shipping address
                </Label>
              </div>
            )}
            <DialogFooter className="mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddingAddress(false)
                  setEditingAddress(null)
                }}
              >
                Cancel
              </Button>
              <Button type="submit">{editingAddress ? "Save Changes" : "Add Address"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

