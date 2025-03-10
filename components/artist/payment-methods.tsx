"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, BanknoteIcon as Bank, Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState("bank")
  const [isAddingNew, setIsAddingNew] = useState(false)

  const handleSave = () => {
    toast({
      title: "Payment method updated",
      description: "Your payment preferences have been saved successfully.",
    })
    setIsAddingNew(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Payment Methods</h3>
        {!isAddingNew && (
          <Button onClick={() => setIsAddingNew(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Method
          </Button>
        )}
      </div>

      {!isAddingNew ? (
        <div className="space-y-4">
          <RadioGroup defaultValue="bank" onValueChange={setSelectedMethod} value={selectedMethod}>
            <div className="flex items-start space-x-3 space-y-0">
              <RadioGroupItem value="bank" id="bank" />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="bank" className="flex items-center">
                  <Bank className="mr-2 h-4 w-4" />
                  Bank Account (Primary)
                </Label>
                <p className="text-sm text-muted-foreground">Chase Bank •••• 4567</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 space-y-0 mt-4">
              <RadioGroupItem value="card" id="card" />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="card" className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Credit Card
                </Label>
                <p className="text-sm text-muted-foreground">Visa •••• 8901</p>
              </div>
            </div>
          </RadioGroup>

          <div className="pt-4">
            <Button onClick={handleSave}>Save Preferences</Button>
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Add Payment Method</CardTitle>
            <CardDescription>Add a new way to receive your earnings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="method-type">Method Type</Label>
              <Select defaultValue="bank">
                <SelectTrigger id="method-type">
                  <SelectValue placeholder="Select method type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank Account</SelectItem>
                  <SelectItem value="card">Credit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-name">Account Holder Name</Label>
              <Input id="account-name" placeholder="John Doe" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-number">Account Number</Label>
              <Input id="account-number" placeholder="XXXX XXXX XXXX XXXX" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="routing">Routing Number</Label>
                <Input id="routing" placeholder="XXXXXXXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-type">Account Type</Label>
                <Select defaultValue="checking">
                  <SelectTrigger id="account-type">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsAddingNew(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Method</Button>
          </CardFooter>
        </Card>
      )}

      <div className="rounded-md border p-4 bg-muted/50">
        <h4 className="font-medium mb-2">Payment Schedule</h4>
        <p className="text-sm text-muted-foreground">
          Payments are processed twice monthly on the 1st and 15th. There is a minimum payout threshold of $50. Funds
          below this amount will roll over to the next payment period.
        </p>
      </div>
    </div>
  )
}

