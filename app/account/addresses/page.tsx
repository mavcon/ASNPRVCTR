"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2, Home } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { AddressEditModal } from "@/components/address-edit-modal"
import { useUserStore } from "@/lib/user-store"

interface Address {
  id: string
  name: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

export default function AddressesPage() {
  const { toast } = useToast()
  const currentUser = useUserStore((state) => state.currentUser)

  // Sample addresses - in a real app, these would come from the user's data
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr-1",
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: "addr-2",
      name: "John Doe",
      street: "456 Park Ave",
      city: "Los Angeles",
      state: "CA",
      postalCode: "90001",
      country: "United States",
      isDefault: false,
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null)

  const handleAddAddress = () => {
    setCurrentAddress(null)
    setIsModalOpen(true)
  }

  const handleEditAddress = (address: Address) => {
    setCurrentAddress(address)
    setIsModalOpen(true)
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((address) => address.id !== id))
    toast({
      title: "Address Deleted",
      description: "The address has been removed from your account.",
    })
  }

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map((address) => ({ ...address, isDefault: address.id === id })))
    toast({
      title: "Default Address Updated",
      description: "Your default shipping address has been updated.",
    })
  }

  const handleSaveAddress = (address: Address) => {
    if (currentAddress) {
      // Edit existing address
      setAddresses(addresses.map((a) => (a.id === address.id ? address : a)))
    } else {
      // Add new address
      setAddresses([...addresses, address])
    }
  }

  if (!currentUser) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Shipping Addresses</h3>
          <p className="text-sm text-muted-foreground">Manage your shipping addresses for faster checkout.</p>
        </div>
        <Button onClick={handleAddAddress}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Address
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  {address.name}
                </CardTitle>
                {address.isDefault && <Badge>Default</Badge>}
              </div>
              <CardDescription>Shipping Address</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-sm">
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEditAddress(address)}>
                  <Pencil className="mr-2 h-3 w-3" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteAddress(address.id)}
                  disabled={address.isDefault}
                >
                  <Trash2 className="mr-2 h-3 w-3" />
                  Delete
                </Button>
              </div>
              {!address.isDefault && (
                <Button variant="secondary" size="sm" onClick={() => handleSetDefault(address.id)}>
                  Set as Default
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {addresses.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="mb-4 text-muted-foreground">You don't have any saved addresses yet.</p>
            <Button onClick={handleAddAddress}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Your First Address
            </Button>
          </CardContent>
        </Card>
      )}

      <AddressEditModal
        address={currentAddress}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAddress}
      />
    </div>
  )
}

