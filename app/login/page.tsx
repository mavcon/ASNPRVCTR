"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useUserStore } from "@/lib/user-store"
import { RetailLayout } from "@/components/layouts/retail-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
})

// Demo accounts for testing
const demoAccounts = {
  customer: {
    email: "customer@example.com",
    password: "password123",
    role: "Customer",
  },
  artist: {
    email: "artist@example.com",
    password: "password123",
    role: "Artist",
  },
  admin: {
    email: "admin@example.com",
    password: "password123",
    role: "Admin",
  },
  superadmin: {
    email: "super-admin@example.com",
    password: "password123",
    role: "Super-Admin",
  },
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const setCurrentUser = useUserStore((state) => state.setCurrentUser)
  const currentUser = useUserStore((state) => state.currentUser)
  const users = useUserStore((state) => state.users)
  const addUser = useUserStore((state) => state.addUser)
  const [selectedDemoAccount, setSelectedDemoAccount] = useState<keyof typeof demoAccounts | null>(null)
  const [redirecting, setRedirecting] = useState(false)

  // Use useEffect to ensure demo accounts exist in the user store
  useEffect(() => {
    // Check if demo accounts already exist
    const customerExists = users.some((user) => user.email === demoAccounts.customer.email)
    const artistExists = users.some((user) => user.email === demoAccounts.artist.email)
    const adminExists = users.some((user) => user.email === demoAccounts.admin.email)
    const superAdminExists = users.some((user) => user.email === demoAccounts.superadmin.email)

    // Add demo accounts if they don't exist
    if (!customerExists) {
      addUser({
        id: `user-customer-demo`,
        name: "Demo Customer",
        email: demoAccounts.customer.email,
        role: demoAccounts.customer.role,
        status: "Active",
        joinDate: new Date().toISOString(),
        verifiedEmail: true,
        lastLogin: new Date().toISOString(),
      })
    }

    if (!artistExists) {
      addUser({
        id: `user-artist-demo`,
        name: "Demo Artist",
        email: demoAccounts.artist.email,
        role: demoAccounts.artist.role,
        status: "Active",
        joinDate: new Date().toISOString(),
        verifiedEmail: true,
        lastLogin: new Date().toISOString(),
      })
    }

    if (!adminExists) {
      addUser({
        id: `user-admin-demo`,
        name: "Demo Admin",
        email: demoAccounts.admin.email,
        role: demoAccounts.admin.role,
        status: "Active",
        joinDate: new Date().toISOString(),
        verifiedEmail: true,
        lastLogin: new Date().toISOString(),
      })
    }

    if (!superAdminExists) {
      addUser({
        id: `user-superadmin-demo`,
        name: "Demo Super Admin",
        email: demoAccounts.superadmin.email,
        role: "Super-Admin",
        status: "Active",
        joinDate: new Date().toISOString(),
        verifiedEmail: true,
        lastLogin: new Date().toISOString(),
      })
    }
  }, [users, addUser])

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser && !redirecting) {
      setRedirecting(true)

      // Redirect based on user role
      if (currentUser.role === "Super-Admin") {
        router.replace("/super-admin")
      } else if (currentUser.role === "Artist") {
        router.replace("/artist")
      } else if (currentUser.role === "Admin") {
        router.replace("/admin")
      } else if (currentUser.role === "Customer") {
        router.replace("/account/dashboard")
      }
    }
  }, [currentUser, router, redirecting])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    if (selectedDemoAccount) {
      form.setValue("email", demoAccounts[selectedDemoAccount].email)
      form.setValue("password", demoAccounts[selectedDemoAccount].password)
      setSelectedDemoAccount(null) // Reset after setting values
    }
  }, [selectedDemoAccount, form])

  const handleDemoAccountClick = (type: keyof typeof demoAccounts) => {
    setSelectedDemoAccount(type)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Find user with matching email
      const user = users.find((u) => u.email === values.email)

      // In a real app, you would verify the password here
      if (user) {
        // Set the current user in the store
        setCurrentUser(user)

        // Update last login time (would be done server-side in a real app)
        const updatedUser = {
          ...user,
          lastLogin: new Date().toISOString(),
        }

        // Show success toast
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}`,
        })

        setRedirecting(true)

        // Handle redirection
        const redirect = searchParams.get("redirect")

        if (redirect) {
          router.replace(redirect)
        } else {
          // Route based on user role
          if (user.role === "Super-Admin") {
            router.replace("/super-admin")
          } else if (user.role === "Artist") {
            router.replace("/artist")
          } else if (user.role === "Admin") {
            router.replace("/admin")
          } else if (user.role === "Customer") {
            router.replace("/account/dashboard")
          }
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // If already redirecting, show a loading state
  if (redirecting) {
    return (
      <RetailLayout>
        <div className="container flex min-h-[calc(100vh-80px)] w-screen flex-col items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Redirecting to your dashboard...</p>
          </div>
        </div>
      </RetailLayout>
    )
  }

  return (
    <RetailLayout>
      <div className="container flex min-h-[calc(100vh-80px)] w-screen flex-col items-center justify-center py-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
          <h1 className="text-2xl font-semibold text-center">Login</h1>
          <Card>
            <CardContent className="pt-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 pt-0">
              <div className="text-sm text-muted-foreground">
                <Link href="/forgot-password" className="hover:text-primary">
                  Forgot your password?
                </Link>
                {" · "}
                <Link href="/register" className="hover:text-primary">
                  Register
                </Link>
              </div>
            </CardFooter>
          </Card>

          <div className="space-y-2">
            <div className="text-center text-sm text-muted-foreground">DEMO ACCOUNTS</div>
            <Tabs defaultValue="customer" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="customer">Customer</TabsTrigger>
                <TabsTrigger value="artist">Artist</TabsTrigger>
                <TabsTrigger value="admin">Admin</TabsTrigger>
                <TabsTrigger value="superadmin">Super Admin</TabsTrigger>
              </TabsList>
              <TabsContent value="customer" className="mt-2">
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="font-medium">Customer Account:</div>
                  <div className="mt-2 space-y-1 text-sm">
                    <div>Email: {demoAccounts.customer.email}</div>
                    <div>Password: {demoAccounts.customer.password}</div>
                  </div>
                  <Button
                    variant="secondary"
                    className="mt-2 w-full"
                    onClick={() => handleDemoAccountClick("customer")}
                  >
                    Use This Account
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="artist" className="mt-2">
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="font-medium">Artist Account:</div>
                  <div className="mt-2 space-y-1 text-sm">
                    <div>Email: {demoAccounts.artist.email}</div>
                    <div>Password: {demoAccounts.artist.password}</div>
                  </div>
                  <Button variant="secondary" className="mt-2 w-full" onClick={() => handleDemoAccountClick("artist")}>
                    Use This Account
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="admin" className="mt-2">
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="font-medium">Admin Account:</div>
                  <div className="mt-2 space-y-1 text-sm">
                    <div>Email: {demoAccounts.admin.email}</div>
                    <div>Password: {demoAccounts.admin.password}</div>
                  </div>
                  <Button variant="secondary" className="mt-2 w-full" onClick={() => handleDemoAccountClick("admin")}>
                    Use This Account
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="superadmin" className="mt-2">
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="font-medium">Super Admin Account:</div>
                  <div className="mt-2 space-y-1 text-sm">
                    <div>Email: {demoAccounts.superadmin.email}</div>
                    <div>Password: {demoAccounts.superadmin.password}</div>
                  </div>
                  <Button
                    variant="secondary"
                    className="mt-2 w-full"
                    onClick={() => handleDemoAccountClick("superadmin")}
                  >
                    Use This Account
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </RetailLayout>
  )
}

