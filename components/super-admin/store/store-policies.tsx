"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStoreManagement } from "@/lib/store-management-store"

const returnPolicySchema = z.object({
  returnWindow: z.string(),
  returnPolicy: z.string().min(10, { message: "Return policy must be at least 10 characters." }),
  exchangePolicy: z.string().min(10, { message: "Exchange policy must be at least 10 characters." }),
  refundMethod: z.string(),
  restockingFee: z.string(),
})

const shippingPolicySchema = z.object({
  domesticShippingPolicy: z.string().min(10, { message: "Domestic shipping policy must be at least 10 characters." }),
  internationalShippingPolicy: z
    .string()
    .min(10, { message: "International shipping policy must be at least 10 characters." }),
  processingTime: z.string(),
  freeShippingThreshold: z.string(),
})

const privacyPolicySchema = z.object({
  privacyPolicy: z.string().min(10, { message: "Privacy policy must be at least 10 characters." }),
  cookiePolicy: z.string().min(10, { message: "Cookie policy must be at least 10 characters." }),
  dataRetentionPolicy: z.string().min(10, { message: "Data retention policy must be at least 10 characters." }),
})

const termsSchema = z.object({
  termsOfService: z.string().min(10, { message: "Terms of service must be at least 10 characters." }),
  intellectualProperty: z.string().min(10, { message: "Intellectual property policy must be at least 10 characters." }),
  disputeResolution: z.string().min(10, { message: "Dispute resolution policy must be at least 10 characters." }),
})

type ReturnPolicyValues = z.infer<typeof returnPolicySchema>
type ShippingPolicyValues = z.infer<typeof shippingPolicySchema>
type PrivacyPolicyValues = z.infer<typeof privacyPolicySchema>
type TermsValues = z.infer<typeof termsSchema>

export function StorePolicies() {
  const [isLoading, setIsLoading] = useState(false)
  const {
    returnPolicy,
    updateReturnPolicy,
    shippingPolicy,
    updateShippingPolicy,
    privacyPolicy,
    updatePrivacyPolicy,
    termsOfService,
    updateTermsOfService,
  } = useStoreManagement()

  const returnForm = useForm<ReturnPolicyValues>({
    resolver: zodResolver(returnPolicySchema),
    defaultValues: returnPolicy,
  })

  const shippingForm = useForm<ShippingPolicyValues>({
    resolver: zodResolver(shippingPolicySchema),
    defaultValues: shippingPolicy,
  })

  const privacyForm = useForm<PrivacyPolicyValues>({
    resolver: zodResolver(privacyPolicySchema),
    defaultValues: privacyPolicy,
  })

  const termsForm = useForm<TermsValues>({
    resolver: zodResolver(termsSchema),
    defaultValues: termsOfService,
  })

  // Update forms when store settings change
  useEffect(() => {
    returnForm.reset(returnPolicy)
  }, [returnPolicy, returnForm])

  useEffect(() => {
    shippingForm.reset(shippingPolicy)
  }, [shippingPolicy, shippingForm])

  useEffect(() => {
    privacyForm.reset(privacyPolicy)
  }, [privacyPolicy, privacyForm])

  useEffect(() => {
    termsForm.reset(termsOfService)
  }, [termsOfService, termsForm])

  async function onReturnSubmit(data: ReturnPolicyValues) {
    setIsLoading(true)
    try {
      updateReturnPolicy(data)
      toast({
        title: "Return policy updated",
        description: "Your return policy has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your return policy.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onShippingSubmit(data: ShippingPolicyValues) {
    setIsLoading(true)
    try {
      updateShippingPolicy(data)
      toast({
        title: "Shipping policy updated",
        description: "Your shipping policy has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your shipping policy.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onPrivacySubmit(data: PrivacyPolicyValues) {
    setIsLoading(true)
    try {
      updatePrivacyPolicy(data)
      toast({
        title: "Privacy policy updated",
        description: "Your privacy policy has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your privacy policy.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onTermsSubmit(data: TermsValues) {
    setIsLoading(true)
    try {
      updateTermsOfService(data)
      toast({
        title: "Terms of service updated",
        description: "Your terms of service have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your terms of service.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Policies</CardTitle>
        <CardDescription>Manage your store's policies, terms, and legal documents</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="returns" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="returns">Returns & Refunds</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          </TabsList>

          <TabsContent value="returns">
            <Form {...returnForm}>
              <form onSubmit={returnForm.handleSubmit(onReturnSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={returnForm.control}
                    name="returnWindow"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Return Window (Days)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select return window" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="14">14 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>How long customers have to return items.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={returnForm.control}
                    name="refundMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Refund Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select refund method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="original">Original payment method</SelectItem>
                            <SelectItem value="store_credit">Store credit only</SelectItem>
                            <SelectItem value="both">Customer choice</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>How refunds are processed.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={returnForm.control}
                    name="restockingFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Restocking Fee (%)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select restocking fee" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">0% (No fee)</SelectItem>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="10">10%</SelectItem>
                            <SelectItem value="15">15%</SelectItem>
                            <SelectItem value="20">20%</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Fee charged for returned items.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={returnForm.control}
                  name="returnPolicy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Return Policy</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your return policy..." className="min-h-[150px]" {...field} />
                      </FormControl>
                      <FormDescription>Detailed policy for returns.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={returnForm.control}
                  name="exchangePolicy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exchange Policy</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your exchange policy..." className="min-h-[150px]" {...field} />
                      </FormControl>
                      <FormDescription>Detailed policy for exchanges.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Return Policy
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="shipping">
            <Form {...shippingForm}>
              <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={shippingForm.control}
                    name="processingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Processing Time (Business Days)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select processing time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 day</SelectItem>
                            <SelectItem value="1-2">1-2 days</SelectItem>
                            <SelectItem value="2-3">2-3 days</SelectItem>
                            <SelectItem value="3-5">3-5 days</SelectItem>
                            <SelectItem value="5-7">5-7 days</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Time to process orders before shipping.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={shippingForm.control}
                    name="freeShippingThreshold"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Free Shipping Threshold ($)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select threshold" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">$0 (Always free)</SelectItem>
                            <SelectItem value="50">$50</SelectItem>
                            <SelectItem value="75">$75</SelectItem>
                            <SelectItem value="100">$100</SelectItem>
                            <SelectItem value="150">$150</SelectItem>
                            <SelectItem value="200">$200</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Order amount for free shipping.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={shippingForm.control}
                  name="domesticShippingPolicy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domestic Shipping Policy</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your domestic shipping policy..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Shipping policy for domestic orders.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={shippingForm.control}
                  name="internationalShippingPolicy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>International Shipping Policy</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your international shipping policy..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Shipping policy for international orders.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Shipping Policy
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="privacy">
            <Form {...privacyForm}>
              <form onSubmit={privacyForm.handleSubmit(onPrivacySubmit)} className="space-y-4">
                <FormField
                  control={privacyForm.control}
                  name="privacyPolicy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Privacy Policy</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your privacy policy..." className="min-h-[200px]" {...field} />
                      </FormControl>
                      <FormDescription>Your store's privacy policy.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={privacyForm.control}
                  name="cookiePolicy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cookie Policy</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your cookie policy..." className="min-h-[150px]" {...field} />
                      </FormControl>
                      <FormDescription>Your store's cookie policy.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={privacyForm.control}
                  name="dataRetentionPolicy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Retention Policy</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your data retention policy..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>How long you retain customer data.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Privacy Policies
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="terms">
            <Form {...termsForm}>
              <form onSubmit={termsForm.handleSubmit(onTermsSubmit)} className="space-y-4">
                <FormField
                  control={termsForm.control}
                  name="termsOfService"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Terms of Service</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your terms of service..." className="min-h-[200px]" {...field} />
                      </FormControl>
                      <FormDescription>Your store's terms of service.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={termsForm.control}
                  name="intellectualProperty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Intellectual Property Policy</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your intellectual property policy..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Your intellectual property rights policy.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={termsForm.control}
                  name="disputeResolution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dispute Resolution Policy</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your dispute resolution policy..."
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>How disputes with customers are handled.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Terms of Service
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

