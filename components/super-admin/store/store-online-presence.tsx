"use client"

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
import { Loader2, Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useStoreManagement } from "@/lib/store-management-store"

const onlinePresenceSchema = z.object({
  websiteUrl: z.string().url({ message: "Please enter a valid URL." }).or(z.literal("")),
  defaultLanguage: z.string().min(1, { message: "Please select a default language." }),
  supportedLanguages: z.array(z.string()).min(1, { message: "Please select at least one supported language." }),
  defaultCurrency: z.string().min(1, { message: "Please select a default currency." }),
  supportedCurrencies: z.array(z.string()).min(1, { message: "Please select at least one supported currency." }),
  metaTitle: z.string().min(1, { message: "Meta title is required." }),
  metaDescription: z.string().min(1, { message: "Meta description is required." }),
  googleAnalyticsId: z.string().optional(),
  facebookPixelId: z.string().optional(),
  enableMultiCurrency: z.boolean(),
  enableMultiLanguage: z.boolean(),
  enableGeoIpRedirect: z.boolean(),
})

const socialMediaSchema = z.object({
  facebook: z.string().url({ message: "Please enter a valid URL." }).or(z.literal("")),
  instagram: z.string().url({ message: "Please enter a valid URL." }).or(z.literal("")),
  twitter: z.string().url({ message: "Please enter a valid URL." }).or(z.literal("")),
  linkedin: z.string().url({ message: "Please enter a valid URL." }).or(z.literal("")),
  youtube: z.string().url({ message: "Please enter a valid URL." }).or(z.literal("")),
  pinterest: z.string().url({ message: "Please enter a valid URL." }).or(z.literal("")),
  tiktok: z.string().url({ message: "Please enter a valid URL." }).or(z.literal("")),
})

type OnlinePresenceValues = z.infer<typeof onlinePresenceSchema>
type SocialMediaValues = z.infer<typeof socialMediaSchema>

export function StoreOnlinePresence() {
  const [isLoading, setIsLoading] = useState(false)
  const { onlinePresence, updateOnlinePresence, socialMedia, updateSocialMedia } = useStoreManagement()

  const onlinePresenceForm = useForm<OnlinePresenceValues>({
    resolver: zodResolver(onlinePresenceSchema),
    defaultValues: onlinePresence,
  })

  const socialMediaForm = useForm<SocialMediaValues>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: socialMedia,
  })

  // Update forms when store settings change
  useEffect(() => {
    onlinePresenceForm.reset(onlinePresence)
  }, [onlinePresence, onlinePresenceForm])

  useEffect(() => {
    socialMediaForm.reset(socialMedia)
  }, [socialMedia, socialMediaForm])

  async function onOnlinePresenceSubmit(data: OnlinePresenceValues) {
    setIsLoading(true)
    try {
      updateOnlinePresence(data)
      toast({
        title: "Online presence settings updated",
        description: "Your online presence settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your online presence settings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onSocialMediaSubmit(data: SocialMediaValues) {
    setIsLoading(true)
    try {
      updateSocialMedia(data)
      toast({
        title: "Social media links updated",
        description: "Your social media links have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your social media links.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Online Store Settings</CardTitle>
          <CardDescription>Configure your international online store settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...onlinePresenceForm}>
            <form onSubmit={onlinePresenceForm.handleSubmit(onOnlinePresenceSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Website Configuration</h3>

                <FormField
                  control={onlinePresenceForm.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormDescription>Your store's primary website URL.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={onlinePresenceForm.control}
                    name="defaultLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Language</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select default language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="it">Italian</SelectItem>
                            <SelectItem value="ja">Japanese</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Primary language for your store.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={onlinePresenceForm.control}
                    name="defaultCurrency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Currency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select default currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="CAD">CAD ($)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                            <SelectItem value="AUD">AUD ($)</SelectItem>
                            <SelectItem value="JPY">JPY (¥)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Primary currency for your store.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">SEO Settings</h3>

                <FormField
                  control={onlinePresenceForm.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Your store name | Tagline" {...field} />
                      </FormControl>
                      <FormDescription>Title displayed in search engine results.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={onlinePresenceForm.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description of your store for search engines..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Description displayed in search engine results (150-160 characters recommended).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Analytics & Tracking</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={onlinePresenceForm.control}
                    name="googleAnalyticsId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Google Analytics ID</FormLabel>
                        <FormControl>
                          <Input placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX" {...field} />
                        </FormControl>
                        <FormDescription>Your Google Analytics tracking ID.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={onlinePresenceForm.control}
                    name="facebookPixelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook Pixel ID</FormLabel>
                        <FormControl>
                          <Input placeholder="XXXXXXXXXXXXXXXXXX" {...field} />
                        </FormControl>
                        <FormDescription>Your Facebook Pixel tracking ID.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">International Features</h3>

                <FormField
                  control={onlinePresenceForm.control}
                  name="enableMultiCurrency"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Enable Multi-Currency</FormLabel>
                        <FormDescription>Allow customers to shop in their preferred currency.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={onlinePresenceForm.control}
                  name="enableMultiLanguage"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Enable Multi-Language</FormLabel>
                        <FormDescription>Allow customers to browse in their preferred language.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={onlinePresenceForm.control}
                  name="enableGeoIpRedirect"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Enable GeoIP Redirect</FormLabel>
                        <FormDescription>
                          Automatically redirect customers to their local version of your store.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Online Store Settings
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>Connect your store to social media platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...socialMediaForm}>
            <form onSubmit={socialMediaForm.handleSubmit(onSocialMediaSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={socialMediaForm.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Facebook className="h-4 w-4" /> Facebook
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://facebook.com/yourbrand" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialMediaForm.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Instagram className="h-4 w-4" /> Instagram
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://instagram.com/yourbrand" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialMediaForm.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Twitter className="h-4 w-4" /> Twitter
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://twitter.com/yourbrand" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialMediaForm.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Linkedin className="h-4 w-4" /> LinkedIn
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/company/yourbrand" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialMediaForm.control}
                  name="youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Youtube className="h-4 w-4" /> YouTube
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://youtube.com/c/yourbrand" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialMediaForm.control}
                  name="pinterest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pinterest</FormLabel>
                      <FormControl>
                        <Input placeholder="https://pinterest.com/yourbrand" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={socialMediaForm.control}
                  name="tiktok"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TikTok</FormLabel>
                      <FormControl>
                        <Input placeholder="https://tiktok.com/@yourbrand" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Social Media Links
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

