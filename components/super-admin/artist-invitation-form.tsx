"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"

const invitationFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  message: z.string().optional(),
})

type InvitationFormValues = z.infer<typeof invitationFormSchema>

export function ArtistInvitationForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [invitedArtists, setInvitedArtists] = useState<{ email: string; name: string; date: string }[]>([
    { email: "john.smith@example.com", name: "John Smith", date: "2025-03-01" },
    { email: "maria.garcia@example.com", name: "Maria Garcia", date: "2025-02-28" },
    { email: "alex.wong@example.com", name: "Alex Wong", date: "2025-02-25" },
  ])

  const form = useForm<InvitationFormValues>({
    resolver: zodResolver(invitationFormSchema),
    defaultValues: {
      email: "",
      name: "",
      message:
        "We'd like to invite you to join our platform as an artist. You'll be able to showcase and sell your artwork to our global audience.",
    },
  })

  function onSubmit(data: InvitationFormValues) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Add to invited artists
      setInvitedArtists([
        {
          email: data.email,
          name: data.name,
          date: new Date().toISOString().split("T")[0],
        },
        ...invitedArtists,
      ])

      // Reset form
      form.reset({
        email: "",
        name: "",
        message:
          "We'd like to invite you to join our platform as an artist. You'll be able to showcase and sell your artwork to our global audience.",
      })

      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${data.name} (${data.email}).`,
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Send Artist Invitation</h3>
        <p className="text-sm text-muted-foreground">
          Invite new artists to join the platform. They will receive an email with instructions.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="artist@example.com" {...field} />
                  </FormControl>
                  <FormDescription>The artist's email address</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Artist Name" {...field} />
                  </FormControl>
                  <FormDescription>The artist's full name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invitation Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter a personalized message..." className="min-h-[100px]" {...field} />
                </FormControl>
                <FormDescription>A personalized message to include in the invitation email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Invitation"}
          </Button>
        </form>
      </Form>

      <Separator />

      <div>
        <h3 className="text-lg font-medium mb-4">Recent Invitations</h3>

        <div className="rounded-md border">
          <div className="grid grid-cols-3 p-4 font-medium border-b">
            <div>Name</div>
            <div>Email</div>
            <div>Date Sent</div>
          </div>

          {invitedArtists.map((artist, index) => (
            <div key={index} className="grid grid-cols-3 p-4 border-b last:border-0">
              <div>{artist.name}</div>
              <div>{artist.email}</div>
              <div>{new Date(artist.date).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

