"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/components/ui/use-toast"
import { useUserStore } from "@/lib/user-store"
import { LoginForm } from "@/components/login-form"

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
}

export default function LoginPageClient() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const setCurrentUser = useUserStore((state) => state.setCurrentUser)
  const currentUser = useUserStore((state) => state.currentUser)
  const users = useUserStore((state) => state.users)
  const addUser = useUserStore((state) => state.addUser)
  const [selectedDemoAccount, setSelectedDemoAccount] = useState<keyof typeof demoAccounts | null>(null)

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      // Redirect based on user role
      if (currentUser.role === "Super-Admin") {
        router.push("/super-admin")
      } else if (currentUser.role === "Artist") {
        router.push("/artist")
      } else if (currentUser.role === "Admin") {
        router.push("/dashboard")
      } else if (currentUser.role === "Customer") {
        router.push("/account/dashboard")
      }
    }
  }, [currentUser, router])

  // Use useEffect to ensure demo accounts exist in the user store
  useEffect(() => {
    // Check if demo accounts already exist
    const customerExists = users.some((user) => user.email === demoAccounts.customer.email)
    const artistExists = users.some((user) => user.email === demoAccounts.artist.email)
    const adminExists = users.some((user) => user.email === demoAccounts.admin.email)

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
  }, [users, addUser])

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

        // Handle redirection
        const redirect = searchParams.get("redirect")

        if (redirect) {
          router.push(redirect)
        } else {
          // Route based on user role
          if (user.role === "Super-Admin") {
            router.push("/super-admin")
          } else if (user.role === "Artist") {
            router.push("/artist")
          } else if (user.role === "Admin") {
            router.push("/admin")
          } else if (user.role === "Customer") {
            router.push("/account/dashboard")
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

  return (
    // <RetailLayout>
    //   <div className="container flex min-h-[calc(100vh-80px)] w-screen flex-col items-center justify-center py-8">
    //     <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
    //       <h1 className="text-2xl font-semibold text-center">Login</h1>
    //       <Card>
    //         <CardContent className="pt-4">
    //           <Form {...form}>
    //             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
    //               <FormField
    //                 control={form.control}
    //                 name="email"
    //                 render={({ field }) => (
    //                   <FormItem>
    //                     <FormLabel>Email</FormLabel>
    //                     <FormControl>
    //                       <Input placeholder="email@example.com" type="email" {...field} />
    //                     </FormControl>
    //                     <FormMessage />
    //                   </FormItem>
    //                 )}
    //               />
    //               <FormField
    //                 control={form.control}
    //                 name="password"
    //                 render={({ field }) => (
    //                   <FormItem>
    //                     <FormLabel>Password</FormLabel>
    //                     <FormControl>
    //                       <Input type="password" {...field} />
    //                     </FormControl>
    //                     <FormMessage />
    //                   </FormItem>
    //                 )}
    //               />
    //               <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
    //                 {isLoading ? "Logging in..." : "Login"}
    //               </Button>
    //             </form>
    //           </Form>
    //         </CardContent>
    //         <CardFooter className="flex flex-col space-y-2 pt-0">
    //           <div className="text-sm text-muted-foreground">
    //             <Link href="/forgot-password" className="hover:text-primary">
    //               Forgot your password?
    //             </Link>
    //             {" · "}
    //             <Link href="/register" className="hover:text-primary">
    //               Register
    //             </Link>
    //           </div>
    //         </CardFooter>
    //       </Card>

    //       <div className="space-y-2">
    //         <div className="text-center text-sm text-muted-foreground">DEMO ACCOUNTS</div>
    //         <Tabs defaultValue="customer" className="w-full">
    //           <TabsList className="grid w-full grid-cols-3">
    //             <TabsTrigger value="customer">Customer</TabsTrigger>
    //             <TabsTrigger value="artist">Artist</TabsTrigger>
    //             <TabsTrigger value="admin">Admin</TabsTrigger>
    //           </TabsList>
    //           <TabsContent value="customer" className="mt-2">
    //             <div className="rounded-lg bg-muted/50 p-4">
    //               <div className="font-medium">Customer Account:</div>
    //               <div className="mt-2 space-y-1 text-sm">
    //                 <div>Email: {demoAccounts.customer.email}</div>
    //                 <div>Password: {demoAccounts.customer.password}</div>
    //               </div>
    //               <Button
    //                 variant="secondary"
    //                 className="mt-2 w-full"
    //                 onClick={() => handleDemoAccountClick("customer")}
    //               >
    //                 Use This Account
    //               </Button>
    //             </div>
    //           </TabsContent>
    //           <TabsContent value="artist" className="mt-2">
    //             <div className="rounded-lg bg-muted/50 p-4">
    //               <div className="font-medium">Artist Account:</div>
    //               <div className="mt-2 space-y-1 text-sm">
    //                 <div>Email: {demoAccounts.artist.email}</div>
    //                 <div>Password: {demoAccounts.artist.password}</div>
    //               </div>
    //               <Button variant="secondary" className="mt-2 w-full" onClick={() => handleDemoAccountClick("artist")}>
    //                 Use This Account
    //               </Button>
    //             </div>
    //           </TabsContent>
    //           <TabsContent value="admin" className="mt-2">
    //             <div className="rounded-lg bg-muted/50 p-4">
    //               <div className="font-medium">Admin Account:</div>
    //               <div className="mt-2 space-y-1 text-sm">
    //                 <div>Email: {demoAccounts.admin.email}</div>
    //                 <div>Password: {demoAccounts.admin.password}</div>
    //               </div>
    //               <Button variant="secondary" className="mt-2 w-full" onClick={() => handleDemoAccountClick("admin")}>
    //                 Use This Account
    //               </Button>
    //             </div>
    //           </TabsContent>
    //         </Tabs>
    //       </div>
    //     </div>
    //     <LoginHandler />
    //   </div>
    // </RetailLayout>
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="underline underline-offset-4 hover:text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

