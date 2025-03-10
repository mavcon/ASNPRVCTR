"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CreditCard, PlusCircle, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { PaymentMethodModal, type PaymentMethodFormValues } from "@/components/payment-method-modal"

interface PaymentMethod {
  id: string
  last4: string
  brand: string
  expiryMonth: string
  expiryYear: string
  name: string
  isDefault: boolean
}

export default function PaymentMethodsPage() {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      last4: "4242",
      brand: "Visa",
      expiryMonth: "12",
      expiryYear: "2024",
      name: "John Doe",
      isDefault: true,
    },
  ])

  async function onSubmit(values: PaymentMethodFormValues) {
    try {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newMethod = {
        id: Date.now().toString(),
        last4: values.cardNumber.slice(-4),
        brand: "Visa", // In real app, determine from card number
        expiryMonth: values.expiryMonth,
        expiryYear: values.expiryYear,
        name: values.name,
        isDefault: values.setAsDefault || paymentMethods.length === 0,
      }

      if (values.setAsDefault) {
        setPaymentMethods((prev) => [...prev.map((method) => ({ ...method, isDefault: false })), newMethod])
      } else {
        setPaymentMethods((prev) => [...prev, newMethod])
      }

      setOpen(false)
      toast({
        title: "Payment method added",
        description: "Your new payment method has been added successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add payment method. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const removePaymentMethod = async (id: string) => {
    try {
      const filtered = paymentMethods.filter((method) => method.id !== id)
      setPaymentMethods(filtered)
      toast({
        title: "Payment method removed",
        description: "The payment method has been removed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove payment method. Please try again.",
        variant: "destructive",
      })
    }
  }

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )

    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Payment Methods</h3>
          <p className="text-sm text-muted-foreground">Manage your payment methods.</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Payment Method
        </Button>
      </div>

      <Separator />

      {paymentMethods.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">You don't have any payment methods yet.</p>
          <Button onClick={() => setOpen(true)}>Add Payment Method</Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {paymentMethods.map((method) => (
            <Card key={method.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-6 w-6" />
                    <div>
                      <p className="font-medium">
                        {method.brand} •••• {method.last4}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </p>
                      <p className="text-sm text-muted-foreground">{method.name}</p>
                    </div>
                  </div>
                  {method.isDefault && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Default</span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 p-6 flex justify-between">
                <Button variant="destructive" size="sm" onClick={() => removePaymentMethod(method.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
                {!method.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => setDefaultPaymentMethod(method.id)}>
                    Set as Default
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <PaymentMethodModal open={open} onOpenChange={setOpen} onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  )
}

