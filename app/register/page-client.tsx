"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useUserStore } from "@/lib/user-store"
import { toast } from "sonner"
import { RetailLayout } from "@/components/layouts/retail-layout"
import Link from "next/link"

export default function RegisterPageClient() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const addUser = useUserStore((state) => state.addUser)
  const users = useUserStore((state) => state.users)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    // Check if email already exists
    if (users.some((user) => user.email === email)) {
      toast.error("An account with this email already exists")
      return
    }

    setIsSubmitting(true)

    try {
      // Create new user (Customer role only)
      const newUser = {
        id: `user-${Math.random().toString(36).substring(2, 10)}`,
        name: email.split("@")[0], // Simple name from email
        email,
        role: "Customer",
        status: "Active",
        joinDate: new Date().toISOString().split("T")[0],
        verifiedEmail: false,
        lastLogin: new Date().toISOString(),
      }

      addUser(newUser)
      toast.success("Account created successfully")

      // Redirect to login after a short delay
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    } catch (error) {
      toast.error("Failed to create account")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <RetailLayout>
      <div className="container flex min-h-[calc(100vh-80px)] w-screen flex-col items-center justify-center py-8">
        <div className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
          <h1 className="text-2xl font-semibold text-center mb-4">Create Account</h1>
          <Card>
            <CardContent className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Account"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="text-sm text-muted-foreground w-full text-center">
                Already have an account?{" "}
                <Link href="/login" className="hover:text-primary">
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </RetailLayout>
  )
}

