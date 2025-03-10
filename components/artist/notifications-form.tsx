"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"

const notificationsFormSchema = z.object({
  salesNotifications: z.boolean().default(true),
  newReviewsNotifications: z.boolean().default(true),
  messageNotifications: z.boolean().default(true),
  promotionalEmails: z.boolean().default(false),
  newsletterEmails: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
})

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

const defaultValues: Partial<NotificationsFormValues> = {
  salesNotifications: true,
  newReviewsNotifications: true,
  messageNotifications: true,
  promotionalEmails: false,
  newsletterEmails: true,
  smsNotifications: false,
}

export function ArtistNotificationsForm() {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  })

  function onSubmit(data: NotificationsFormValues) {
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been updated successfully.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="mb-4 text-sm font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="salesNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Sales notifications</FormLabel>
                    <FormDescription>Receive notifications when your artwork is sold.</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newReviewsNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>New reviews</FormLabel>
                    <FormDescription>Receive notifications when someone reviews your artwork.</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="messageNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Messages</FormLabel>
                    <FormDescription>Receive notifications when you get a new message.</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-medium">Marketing Emails</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="promotionalEmails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Promotional emails</FormLabel>
                    <FormDescription>Receive emails about promotions and special offers.</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newsletterEmails"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Newsletter</FormLabel>
                    <FormDescription>
                      Receive our monthly newsletter with art tips and platform updates.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-medium">SMS Notifications</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="smsNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>SMS notifications</FormLabel>
                    <FormDescription>
                      Receive text messages for important updates like sales and messages.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Save preferences</Button>
      </form>
    </Form>
  )
}

