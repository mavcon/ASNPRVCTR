"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

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
  phone: string
}

export function CustomerAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call to fetch addresses
    const timer = setTimeout(() => {
      const mockAddresses: Address[] = [
        {
          id: "addr-1",
          name: "Home",
          line1: "123 Main Street",
          line2: "Apt 4B",
          city: "Toronto",
          state: "Ontario",
          postalCode: "M5V 2N4",
          country: "Canada",
          isDefault: true,
          phone: "+1 (416) 555-1234",
        },
        {
          id: "addr-2",
          name: "Work",
          line1: "456 Business Ave",
          city: "Toronto",
          state: "Ontario",
          postalCode: "M4B 1B3",
          country: "Canada",
          isDefault: false,
          phone: "+1 (416) 555-5678",
        },
      ]

      setAddresses(mockAddresses)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleAddAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // In a real app, this would be an API call
    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      name: formData.get("name") as string,
      line1: formData.get("line1") as string,
      line2: (formData.get("line2") as string) || undefined,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postalCode: formData.get("postalCode") as string,
      country: formData.get("country") as string,
      isDefault: addresses.length === 0 ? true : formData.get("isDefault") === "true",
      phone: formData.get("phone") as string,
    }

    if (newAddress.isDefault) {
      setAddresses((prev) => prev.map((addr) => ({ ...addr, isDefault: false })))
    }

    setAddresses((prev) => [...prev, newAddress])
    setIsAddDialogOpen(false)

    toast({
      title: "Address added",
      description: "Your new address has been saved successfully.",
    })
  }

  const handleEditAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!currentAddress) return

    const formData = new FormData(e.currentTarget)
    const makeDefault = formData.get("isDefault") === "true"

    // In a real app, this would be an API call
    setAddresses((prev) =>
      prev.map((addr) => {
        if (addr.id === currentAddress.id) {
          return {
            ...addr,
            name: formData.get("name") as string,
            line1: formData.get("line1") as string,
            line2: (formData.get("line2") as string) || undefined,
            city: formData.get("city") as string,
            state: formData.get("state") as string,
            postalCode: formData.get("postalCode") as string,
            country: formData.get("country") as string,
            isDefault: makeDefault ? true : addr.isDefault,
            phone: formData.get("phone") as string,
          }
        }
        return makeDefault ? { ...addr, isDefault: false } : addr
      }),
    )

    setIsEditDialogOpen(false)
    setCurrentAddress(null)

    toast({
      title: "Address updated",
      description: "Your address has been updated successfully.",
    })
  }

  const handleDeleteAddress = (id: string) => {
    // In a real app, this would be an API call
    setAddresses((prev) => {
      const filtered = prev.filter((addr) => addr.id !== id)

      // If we deleted the default address and there are other addresses,
      // make the first one the default
      if (prev.find((addr) => addr.id === id)?.isDefault && filtered.length > 0) {
        filtered[0].isDefault = true
      }

      return filtered
    })

    toast({
      title: "Address deleted",
      description: "Your address has been deleted successfully.",
    })
  }

  const handleSetDefault = (id: string) => {
    // In a real app, this would be an API call
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )

    toast({
      title: "Default address updated",
      description: "Your default address has been updated successfully.",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="animate-pulse p-3 border rounded-md">
            <div className="h-5 bg-muted rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  const AddressForm = ({
    address,
    onSubmit,
  }: { address?: Address; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) => (
    <form onSubmit={onSubmit}>
      <div className="grid gap-4 py-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Label</Label>
          <Input id="name" name="name" defaultValue={address?.name} placeholder="Home, Work, etc." required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="line1">Address Line 1</Label>
          <Input id="line1" name="line1" defaultValue={address?.line1} placeholder="Street address" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="line2">Address Line 2 (Optional)</Label>
          <Input id="line2" name="line2" defaultValue={address?.line2} placeholder="Apt, Suite, Unit, etc." />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" defaultValue={address?.city} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">State/Province</Label>
            <Input id="state" name="state" defaultValue={address?.state} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="grid gap-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input id="postalCode" name="postalCode" defaultValue={address?.postalCode} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Select name="country" defaultValue={address?.country || "Canada"}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="France">France</SelectItem>
                <SelectItem value="Japan">Japan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" defaultValue={address?.phone} placeholder="+1 (123) 456-7890" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="isDefault">Default Address</Label>
          <Select name="isDefault" defaultValue={address?.isDefault ? "true" : "false"}>
            <SelectTrigger>
              <SelectValue placeholder="Set as default?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes, use as default</SelectItem>
              <SelectItem value="false">No, keep current default</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter className="mt-4">
        <Button type="submit">Save Address</Button>
      </DialogFooter>
    </form>
  )

  return (
    <>
      {addresses.length === 0 ? (
        <div className="text-center py-6">
          <MapPin className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <h3 className="text-base font-medium">No addresses saved</h3>
          <p className="text-sm text-muted-foreground mt-1">Add an address to make checkout faster.</p>
          <Button className="mt-3" size="sm" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Add Address
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((address) => (
            <div key={address.id} className="p-3 border rounded-md">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <h3 className="font-medium text-sm">{address.name}</h3>
                  {address.isDefault && (
                    <Badge variant="outline" className="ml-2 text-xs py-0 px-1.5">
                      Default
                    </Badge>
                  )}
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => {
                      setCurrentAddress(address)
                      setIsEditDialogOpen(true)
                    }}
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleDeleteAddress(address.id)}
                    disabled={addresses.length === 1}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="text-xs text-muted-foreground space-y-0.5">
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
                <p>{address.phone}</p>
              </div>
              {!address.isDefault && (
                <Button variant="link" className="mt-1 h-auto p-0 text-xs" onClick={() => handleSetDefault(address.id)}>
                  Set as default
                </Button>
              )}
            </div>
          ))}

          <Button variant="outline" size="sm" className="w-full" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Add New Address
          </Button>
        </div>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
            <DialogDescription>Add a new shipping or billing address to your account.</DialogDescription>
          </DialogHeader>
          <AddressForm onSubmit={handleAddAddress} />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogDescription>Make changes to your address.</DialogDescription>
          </DialogHeader>
          {currentAddress && <AddressForm address={currentAddress} onSubmit={handleEditAddress} />}
        </DialogContent>
      </Dialog>
    </>
  )
}

