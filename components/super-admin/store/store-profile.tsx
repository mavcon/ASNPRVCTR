"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Upload } from "lucide-react"
import { useStoreManagement } from "@/lib/store-management-store"

const storeProfileSchema = z.object({
  name: z.string().min(2, { message: "Store name must be at least 2 characters." }),
  legalName: z.string().min(2, { message: "Legal business name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  description: z.string().min(10, { message: "Store description must be at least 10 characters." }),
  taxId: z.string().optional(),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
})

type StoreProfileValues = z.infer<typeof storeProfileSchema>

export function StoreProfile() {
  const [isLoading, setIsLoading] = useState(false)
  const { storeProfile, updateStoreProfile } = useStoreManagement()
  const [logoUrl, setLogoUrl] = useState(storeProfile.logoUrl)

  const form = useForm<StoreProfileValues>({
    resolver: zodResolver(storeProfileSchema),
    defaultValues: {
      name: storeProfile.name,
      legalName: storeProfile.legalName,
      email: storeProfile.email,
      phone: storeProfile.phone,
      description: storeProfile.description,
      taxId: storeProfile.taxId,
      website: storeProfile.website,
    },
  })

  // Update form when store profile changes
  useEffect(() => {
    form.reset({
      name: storeProfile.name,
      legalName: storeProfile.legalName,
      email: storeProfile.email,
      phone: storeProfile.phone,
      description: storeProfile.description,
      taxId: storeProfile.taxId,
      website: storeProfile.website,
    })
    setLogoUrl(storeProfile.logoUrl)
  }, [storeProfile, form])

  async function onSubmit(data: StoreProfileValues) {
    setIsLoading(true)

    try {
      // Update the store profile in the store
      updateStoreProfile({
        ...data,
        logoUrl: logoUrl,
      })

      toast({
        title: "Store profile updated",
        description: "Your store profile has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your store profile.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you would upload this to your storage service
      // For now, we'll just create a local URL
      const url = URL.createObjectURL(file)
      setLogoUrl(url)
      updateStoreProfile({ logoUrl: url })

      toast({
        title: "Logo uploaded",
        description: "Your store logo has been uploaded successfully.",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Profile</CardTitle>
        <CardDescription>Manage your store's basic information and branding</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-40 h-40 rounded-md overflow-hidden border">
              <img
                src={logoUrl || "/placeholder.svg?height=200&width=200"}
                alt="Store logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="logo-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80">
                  <Upload className="h-4 w-4" />
                  <span>Upload Logo</span>
                </div>
                <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              </label>
            </div>
            <p className="text-xs text-muted-foreground text-center max-w-[200px]">
              Recommended: 512x512px PNG or JPG file, max 2MB
            </p>
          </div>

          <div className="flex-1">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your store name" {...field} />
                        </FormControl>
                        <FormDescription>This is the name displayed to customers.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="legalName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Legal Business Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Legal business name" {...field} />
                        </FormControl>
                        <FormDescription>Used for legal and tax documents.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@example.com" {...field} />
                        </FormControl>
                        <FormDescription>Primary contact email for your store.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (123) 456-7890" {...field} />
                        </FormControl>
                        <FormDescription>Primary contact phone for your store.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe your store..." className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormDescription>A brief description of your store for customers.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax ID / Business Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Tax ID or Business Number" {...field} />
                        </FormControl>
                        <FormDescription>Used for tax reporting purposes.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormDescription>Your store's website URL.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

