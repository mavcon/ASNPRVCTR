"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

const paymentFormSchema = z.object({
  accountName: z.string().min(2, {
    message: "Account name must be at least 2 characters.",
  }),
  accountNumber: z.string().min(8, {
    message: "Account number must be at least 8 characters.",
  }),
  bankName: z.string().min(2, {
    message: "Bank name must be at least 2 characters.",
  }),
  routingNumber: z.string().min(9, {
    message: "Routing number must be at least 9 characters.",
  }),
  paymentMethod: z.enum(["bankTransfer", "paypal", "stripe"], {
    required_error: "Please select a payment method.",
  }),
  paypalEmail: z.string().email().optional(),
})

type PaymentFormValues = z.infer<typeof paymentFormSchema>

const defaultValues: Partial<PaymentFormValues> = {
  accountName: "Sarah Thompson",
  accountNumber: "123456789",
  bankName: "First National Bank",
  routingNumber: "987654321",
  paymentMethod: "bankTransfer",
}

export function ArtistPaymentForm() {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const paymentMethod = form.watch("paymentMethod")

  function onSubmit(data: PaymentFormValues) {
    toast({
      title: "Payment information updated",
      description: "Your payment information has been updated successfully.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bankTransfer">Bank Transfer</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select how you would like to receive payments.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {paymentMethod === "bankTransfer" && (
          <>
            <FormField
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Account holder name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your account number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="routingNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Routing Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your routing number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your bank name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {paymentMethod === "paypal" && (
          <FormField
            control={form.control}
            name="paypalEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PayPal Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your PayPal email" {...field} />
                </FormControl>
                <FormDescription>The email address associated with your PayPal account.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {paymentMethod === "stripe" && (
          <div className="rounded-md bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              You'll need to connect your Stripe account. Click the button below to set up your Stripe Connect account.
            </p>
            <Button className="mt-4" variant="outline">
              Connect with Stripe
            </Button>
          </div>
        )}

        <Button type="submit">Save payment information</Button>
      </form>
    </Form>
  )
}

