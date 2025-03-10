"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, DollarSignIcon as PaypalLogo } from "lucide-react"

const paymentFormSchema = z.object({
  paymentMethod: z.enum(["new_card", "saved_card", "paypal"]),
  savedCardId: z.string().optional(),
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  saveCard: z.boolean().default(false),
})

export function PaymentForm({
  total,
  currency = "CAD",
  onPaymentComplete,
  isProcessing,
  setIsProcessing,
  savedPaymentMethods = [],
}) {
  const [paymentError, setPaymentError] = useState("")

  const form = useForm({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentMethod: savedPaymentMethods.length > 0 ? "saved_card" : "new_card",
      savedCardId: savedPaymentMethods.length > 0 ? savedPaymentMethods[0].id : "",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      saveCard: false,
    },
  })

  const watchPaymentMethod = form.watch("paymentMethod")

  const onSubmit = async (data) => {
    setIsProcessing(true)
    setPaymentError("")

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would process the payment here
      // and return the result from the payment gateway

      // Simulate successful payment
      onPaymentComplete({
        success: true,
        transactionId: `txn-${Date.now()}`,
      })
    } catch (error) {
      setPaymentError("Payment processing failed. Please try again.")
      setIsProcessing(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  {savedPaymentMethods.length > 0 && (
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="saved_card" id="saved_card" className="mt-1" />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="saved_card" className="font-medium">
                          Use a saved card
                        </Label>
                        <p className="text-sm text-muted-foreground">Select from your saved payment methods</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="new_card" id="new_card" className="mt-1" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="new_card" className="font-medium">
                        Credit or debit card
                      </Label>
                      <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" className="mt-1" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="paypal" className="font-medium">
                        PayPal
                      </Label>
                      <p className="text-sm text-muted-foreground">Pay with your PayPal account</p>
                    </div>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchPaymentMethod === "saved_card" && savedPaymentMethods.length > 0 && (
          <FormField
            control={form.control}
            name="savedCardId"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select Card</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-3"
                  >
                    {savedPaymentMethods.map((card) => (
                      <div key={card.id} className="flex items-start space-x-2">
                        <RadioGroupItem value={card.id} id={`card-${card.id}`} className="mt-1" />
                        <Label htmlFor={`card-${card.id}`} className="font-normal cursor-pointer flex-1">
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="font-medium">{card.cardType}</span>
                            <span className="ml-2 text-muted-foreground">•••• {card.lastFour}</span>
                            {card.isDefault && (
                              <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">Expires {card.expiryDate}</div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {watchPaymentMethod === "new_card" && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234 5678 9012 3456" {...field} autoComplete="cc-number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on Card</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} autoComplete="cc-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} autoComplete="cc-exp" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} autoComplete="cc-csc" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="saveCard"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Save this card for future purchases</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        )}

        {watchPaymentMethod === "paypal" && (
          <div className="flex flex-col items-center justify-center py-4 space-y-4">
            <PaypalLogo className="h-12 w-12" />
            <p className="text-sm text-muted-foreground text-center">
              You will be redirected to PayPal to complete your payment.
            </p>
          </div>
        )}

        {paymentError && <div className="text-sm text-red-500">{paymentError}</div>}

        <div className="flex flex-col space-y-2">
          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing ? "Processing..." : `Pay ${currency} ${total.toFixed(2)}`}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Your payment information is processed securely. We do not store your credit card details.
          </p>
        </div>
      </form>
    </Form>
  )
}

