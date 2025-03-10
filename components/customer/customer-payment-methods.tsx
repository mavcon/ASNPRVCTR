"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Plus, Trash2, Edit, Check, Shield } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface PaymentMethod {
  id: string
  type: "credit" | "debit" | "paypal"
  cardNumber?: string
  cardholderName?: string
  expiryMonth?: string
  expiryYear?: string
  isDefault: boolean
  paypalEmail?: string
}

export function CustomerPaymentMethods() {
  const { toast } = useToast()
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm-1",
      type: "credit",
      cardNumber: "4111 •••• •••• 1111",
      cardholderName: "John Doe",
      expiryMonth: "12",
      expiryYear: "2025",
      isDefault: true,
    },
    {
      id: "pm-2",
      type: "paypal",
      paypalEmail: "john.doe@example.com",
      isDefault: false,
    },
  ])

  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null)
  const [isAddingPayment, setIsAddingPayment] = useState(false)
  const [newPaymentType, setNewPaymentType] = useState<"credit" | "debit" | "paypal">("credit")
  const [newPayment, setNewPayment] = useState<Partial<PaymentMethod>>({
    type: "credit",
    isDefault: false,
  })

  const handleSetDefault = (paymentId: string) => {
    setPaymentMethods(
      paymentMethods.map((payment) => ({
        ...payment,
        isDefault: payment.id === paymentId,
      })),
    )

    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated.",
    })
  }

  const handleDeletePayment = (paymentId: string) => {
    // Don't allow deleting the default payment method
    if (paymentMethods.find((p) => p.id === paymentId)?.isDefault) {
      toast({
        title: "Cannot delete default payment method",
        description: "Please set another payment method as default before deleting this one.",
        variant: "destructive",
      })
      return
    }

    setPaymentMethods(paymentMethods.filter((payment) => payment.id !== paymentId))
    toast({
      title: "Payment method deleted",
      description: "The payment method has been removed from your account.",
    })
  }

  const handleSavePayment = () => {
    if (editingPayment) {
      // Update existing payment method
      setPaymentMethods(paymentMethods.map((payment) => (payment.id === editingPayment.id ? editingPayment : payment)))
      setEditingPayment(null)
      toast({
        title: "Payment method updated",
        description: "Your payment method has been updated successfully.",
      })
    } else if (isAddingPayment) {
      // Add new payment method
      const id = `pm-${Date.now()}`
      const paymentToAdd = {
        ...newPayment,
        id,
        type: newPaymentType,
      } as PaymentMethod

      // If this is the first payment method or marked as default, make it default
      if (paymentMethods.length === 0 || paymentToAdd.isDefault) {
        paymentToAdd.isDefault = true
        setPaymentMethods((prev) => prev.map((p) => ({ ...p, isDefault: false })).concat(paymentToAdd))
      } else {
        setPaymentMethods((prev) => [...prev, paymentToAdd])
      }

      setIsAddingPayment(false)
      setNewPayment({
        type: "credit",
        isDefault: false,
      })

      toast({
        title: "Payment method added",
        description: "Your new payment method has been added successfully.",
      })
    }
  }

  const renderCardForm = (payment: Partial<PaymentMethod>, isEditing: boolean) => (
    <>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="cardholderName">Cardholder Name</Label>
          <Input
            id="cardholderName"
            value={payment.cardholderName || ""}
            onChange={(e) =>
              isEditing
                ? setEditingPayment({ ...(editingPayment as PaymentMethod), cardholderName: e.target.value })
                : setNewPayment({ ...newPayment, cardholderName: e.target.value })
            }
            placeholder="Name on card"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            value={payment.cardNumber || ""}
            onChange={(e) => {
              // Format card number with spaces every 4 digits
              const value = e.target.value
                .replace(/\s/g, "")
                .replace(/(\d{4})/g, "$1 ")
                .trim()
              if (isEditing) {
                setEditingPayment({ ...(editingPayment as PaymentMethod), cardNumber: value })
              } else {
                setNewPayment({ ...newPayment, cardNumber: value })
              }
            }}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="expiryMonth">Expiry Month</Label>
            <Select
              value={payment.expiryMonth || ""}
              onValueChange={(value) =>
                isEditing
                  ? setEditingPayment({ ...(editingPayment as PaymentMethod), expiryMonth: value })
                  : setNewPayment({ ...newPayment, expiryMonth: value })
              }
            >
              <SelectTrigger id="expiryMonth">
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = (i + 1).toString().padStart(2, "0")
                  return (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expiryYear">Expiry Year</Label>
            <Select
              value={payment.expiryYear || ""}
              onValueChange={(value) =>
                isEditing
                  ? setEditingPayment({ ...(editingPayment as PaymentMethod), expiryYear: value })
                  : setNewPayment({ ...newPayment, expiryYear: value })
              }
            >
              <SelectTrigger id="expiryYear">
                <SelectValue placeholder="YYYY" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = (new Date().getFullYear() + i).toString()
                  return (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" type="password" maxLength={4} placeholder="123" />
          <p className="text-xs text-muted-foreground">For security reasons, CVV is never stored.</p>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="isDefault"
            checked={payment.isDefault}
            onCheckedChange={(checked) =>
              isEditing
                ? setEditingPayment({ ...(editingPayment as PaymentMethod), isDefault: checked })
                : setNewPayment({ ...newPayment, isDefault: checked })
            }
          />
          <Label htmlFor="isDefault">Set as default payment method</Label>
        </div>
      </div>
    </>
  )

  const renderPayPalForm = (payment: Partial<PaymentMethod>, isEditing: boolean) => (
    <>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="paypalEmail">PayPal Email</Label>
          <Input
            id="paypalEmail"
            type="email"
            value={payment.paypalEmail || ""}
            onChange={(e) =>
              isEditing
                ? setEditingPayment({ ...(editingPayment as PaymentMethod), paypalEmail: e.target.value })
                : setNewPayment({ ...newPayment, paypalEmail: e.target.value })
            }
            placeholder="your-email@example.com"
          />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="isDefault"
            checked={payment.isDefault}
            onCheckedChange={(checked) =>
              isEditing
                ? setEditingPayment({ ...(editingPayment as PaymentMethod), isDefault: checked })
                : setNewPayment({ ...newPayment, isDefault: checked })
            }
          />
          <Label htmlFor="isDefault">Set as default payment method</Label>
        </div>
      </div>
    </>
  )

  const renderPaymentMethodForm = (payment: Partial<PaymentMethod>, isEditing: boolean) => {
    const type = isEditing ? payment.type : newPaymentType

    return (
      <>
        {!isEditing && (
          <div className="grid gap-2 mb-4">
            <Label htmlFor="paymentType">Payment Method Type</Label>
            <Select
              value={newPaymentType}
              onValueChange={(value: "credit" | "debit" | "paypal") => setNewPaymentType(value)}
            >
              <SelectTrigger id="paymentType">
                <SelectValue placeholder="Select payment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit">Credit Card</SelectItem>
                <SelectItem value="debit">Debit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {(type === "credit" || type === "debit") && renderCardForm(payment, isEditing)}
        {type === "paypal" && renderPayPalForm(payment, isEditing)}
      </>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Payment Methods</h2>
        <Dialog open={isAddingPayment} onOpenChange={setIsAddingPayment}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8">
              <Plus className="h-4 w-4 mr-1" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Payment Method</DialogTitle>
              <DialogDescription>Add a new payment method to your account.</DialogDescription>
            </DialogHeader>
            {renderPaymentMethodForm(newPayment, false)}
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsAddingPayment(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePayment}>Save Payment Method</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {paymentMethods.map((payment) => (
          <Card key={payment.id} className={payment.isDefault ? "border-primary" : ""}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-base">
                    {payment.type === "credit" ? "Credit Card" : payment.type === "debit" ? "Debit Card" : "PayPal"}
                  </CardTitle>
                </div>
                {payment.isDefault && (
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                    Default
                  </Badge>
                )}
              </div>
              <CardDescription className="text-xs">
                {payment.type === "paypal" ? payment.paypalEmail : payment.cardholderName}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="text-sm">
                {payment.type !== "paypal" && (
                  <>
                    <p>{payment.cardNumber}</p>
                    <p>
                      Expires: {payment.expiryMonth}/{payment.expiryYear?.slice(-2)}
                    </p>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Edit Payment Method</DialogTitle>
                    <DialogDescription>Make changes to your payment method.</DialogDescription>
                  </DialogHeader>
                  {editingPayment && editingPayment.id === payment.id ? (
                    renderPaymentMethodForm(editingPayment, true)
                  ) : (
                    <div className="py-4 text-center text-muted-foreground">Loading payment details...</div>
                  )}
                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setEditingPayment(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSavePayment}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={() => setEditingPayment(payment)}
                  style={{ display: "none" }} // This is just to set the editing payment when dialog opens
                />
              </Dialog>
              <div className="flex">
                {!payment.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-primary"
                    onClick={() => handleSetDefault(payment.id)}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Set Default
                  </Button>
                )}
                {!payment.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-destructive"
                    onClick={() => handleDeletePayment(payment.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {paymentMethods.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <CreditCard className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-muted-foreground mb-4">You don't have any saved payment methods yet.</p>
            <Button onClick={() => setIsAddingPayment(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Your First Payment Method
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Shield className="h-4 w-4" />
        <p>Your payment information is encrypted and securely stored</p>
      </div>
    </div>
  )
}

