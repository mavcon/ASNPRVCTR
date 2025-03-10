"use client"

import type React from "react"
import { useState } from "react"
import { RetailLayout } from "@/components/layouts/retail-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsLoading(false)
    setIsSubmitted(true)

    toast({
      title: "Reset link sent",
      description: "Check your email for a link to reset your password.",
    })
  }

  return (
    <RetailLayout>
      <div className="container flex items-center justify-center py-10 md:py-16">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Reset your password</CardTitle>
              <CardDescription>
                {isSubmitted
                  ? "Check your email for a password reset link"
                  : "Enter your email address and we'll send you a link to reset your password"}
              </CardDescription>
            </CardHeader>
            {isSubmitted ? (
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    We've sent a password reset link to your email address. Please check your inbox and follow the
                    instructions.
                  </p>
                </div>
              </CardContent>
            ) : (
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="email@example.com" required />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </CardFooter>
              </form>
            )}
            <CardFooter className="pt-0">
              <Link href="/account" className="text-xs text-primary hover:underline flex items-center">
                <ArrowLeft className="h-3 w-3 mr-1" /> Back to login
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </RetailLayout>
  )
}

