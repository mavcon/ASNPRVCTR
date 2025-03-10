"use client"

import type React from "react"

import { useState } from "react"
import { useUserStore } from "@/lib/user-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const currentUser = useUserStore((state) => state.currentUser)
  const updateUser = useUserStore((state) => state.updateUser)

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentUser) return

    const updatedUser = {
      ...currentUser,
      name: formData.name,
      phone: formData.phone,
    }

    updateUser(updatedUser)

    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    })
  }

  // Get initials from user's name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (!currentUser) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">Manage your personal information and preferences.</p>
      </div>

      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback className="text-lg">{getInitials(currentUser.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-xl font-semibold">{currentUser.name}</h4>
          <p className="text-sm text-muted-foreground">{currentUser.email}</p>
          <p className="text-sm text-muted-foreground">
            Member since {new Date(currentUser.joinDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details and contact information.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" value={formData.email} disabled className="bg-muted" />
              <p className="text-xs text-muted-foreground">Email cannot be changed. Contact support for assistance.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

