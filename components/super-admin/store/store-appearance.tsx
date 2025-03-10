"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Palette, Layout, Type } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useStoreManagement } from "@/lib/store-management-store"

const colorSchema = z.object({
  primary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  secondary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  accent: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
  background: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Please enter a valid hex color code.",
  }),
})

const fontSchema = z.object({
  headingFont: z.string().min(1, { message: "Please select a heading font." }),
  bodyFont: z.string().min(1, { message: "Please select a body font." }),
  fontSize: z.string().min(1, { message: "Please select a base font size." }),
})

const layoutSchema = z.object({
  headerStyle: z.string().min(1, { message: "Please select a header style." }),
  footerStyle: z.string().min(1, { message: "Please select a footer style." }),
  productGridColumns: z.string().min(1, { message: "Please select product grid columns." }),
  showBreadcrumbs: z.boolean(),
  enableQuickView: z.boolean(),
  showQuantitySelector: z.boolean(),
})

type ColorValues = z.infer<typeof colorSchema>
type FontValues = z.infer<typeof fontSchema>
type LayoutValues = z.infer<typeof layoutSchema>

export function StoreAppearance() {
  const [isLoading, setIsLoading] = useState(false)
  const { colorSettings, updateColorSettings, fontSettings, updateFontSettings, layoutSettings, updateLayoutSettings } =
    useStoreManagement()

  const colorForm = useForm<ColorValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: colorSettings,
  })

  const fontForm = useForm<FontValues>({
    resolver: zodResolver(fontSchema),
    defaultValues: fontSettings,
  })

  const layoutForm = useForm<LayoutValues>({
    resolver: zodResolver(layoutSchema),
    defaultValues: layoutSettings,
  })

  // Update forms when store settings change
  useEffect(() => {
    colorForm.reset(colorSettings)
  }, [colorSettings, colorForm])

  useEffect(() => {
    fontForm.reset(fontSettings)
  }, [fontSettings, fontForm])

  useEffect(() => {
    layoutForm.reset(layoutSettings)
  }, [layoutSettings, layoutForm])

  async function onColorSubmit(data: ColorValues) {
    setIsLoading(true)
    try {
      updateColorSettings(data)
      toast({
        title: "Color settings updated",
        description: "Your store color settings have been updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your color settings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onFontSubmit(data: FontValues) {
    setIsLoading(true)
    try {
      updateFontSettings(data)
      toast({
        title: "Font settings updated",
        description: "Your store font settings have been updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your font settings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onLayoutSubmit(data: LayoutValues) {
    setIsLoading(true)
    try {
      updateLayoutSettings(data)
      toast({
        title: "Layout settings updated",
        description: "Your store layout settings have been updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your layout settings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Appearance</CardTitle>
        <CardDescription>Customize your store's visual appearance and layout</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors" className="space-y-4">
          <TabsList>
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              Typography
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Layout
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors">
            <Form {...colorForm}>
              <form onSubmit={colorForm.handleSubmit(onColorSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={colorForm.control}
                    name="primary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Color</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <div className="w-10 h-10 rounded border" style={{ backgroundColor: field.value }} />
                        </div>
                        <FormDescription>Main brand color used for buttons and accents.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={colorForm.control}
                    name="secondary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Secondary Color</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <div className="w-10 h-10 rounded border" style={{ backgroundColor: field.value }} />
                        </div>
                        <FormDescription>Used for secondary elements and accents.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={colorForm.control}
                    name="accent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accent Color</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <div className="w-10 h-10 rounded border" style={{ backgroundColor: field.value }} />
                        </div>
                        <FormDescription>Used for highlights and call-to-actions.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={colorForm.control}
                    name="background"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Background Color</FormLabel>
                        <div className="flex gap-2">
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <div className="w-10 h-10 rounded border" style={{ backgroundColor: field.value }} />
                        </div>
                        <FormDescription>Main background color for your store.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="p-4 border rounded-md bg-muted/50">
                  <h3 className="font-medium mb-2">Color Preview</h3>
                  <div className="flex flex-wrap gap-2">
                    <div
                      className="w-full h-16 rounded-md flex items-center justify-center text-white"
                      style={{ backgroundColor: colorForm.watch("primary") }}
                    >
                      Primary
                    </div>
                    <div
                      className="w-full h-16 rounded-md flex items-center justify-center text-white"
                      style={{ backgroundColor: colorForm.watch("secondary") }}
                    >
                      Secondary
                    </div>
                    <div
                      className="w-full h-16 rounded-md flex items-center justify-center text-white"
                      style={{ backgroundColor: colorForm.watch("accent") }}
                    >
                      Accent
                    </div>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Color Settings
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="typography">
            <Form {...fontForm}>
              <form onSubmit={fontForm.handleSubmit(onFontSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={fontForm.control}
                    name="headingFont"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heading Font</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a heading font" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="inter">Inter</SelectItem>
                            <SelectItem value="roboto">Roboto</SelectItem>
                            <SelectItem value="opensans">Open Sans</SelectItem>
                            <SelectItem value="montserrat">Montserrat</SelectItem>
                            <SelectItem value="lato">Lato</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Font used for headings and titles.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={fontForm.control}
                    name="bodyFont"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body Font</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a body font" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="inter">Inter</SelectItem>
                            <SelectItem value="roboto">Roboto</SelectItem>
                            <SelectItem value="opensans">Open Sans</SelectItem>
                            <SelectItem value="montserrat">Montserrat</SelectItem>
                            <SelectItem value="lato">Lato</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Font used for body text and paragraphs.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={fontForm.control}
                  name="fontSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base Font Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a base font size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Base size for all text in your store.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="p-4 border rounded-md bg-muted/50">
                  <h3 className="font-medium mb-2">Typography Preview</h3>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold" style={{ fontFamily: fontForm.watch("headingFont") }}>
                      This is a heading in {fontForm.watch("headingFont")}
                    </div>
                    <div style={{ fontFamily: fontForm.watch("bodyFont") }}>
                      This is body text in {fontForm.watch("bodyFont")}. It shows how paragraphs will look on your
                      store.
                    </div>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Typography Settings
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="layout">
            <Form {...layoutForm}>
              <form onSubmit={layoutForm.handleSubmit(onLayoutSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={layoutForm.control}
                    name="headerStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Header Style</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a header style" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="centered">Centered</SelectItem>
                            <SelectItem value="expanded">Expanded</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Style of your store's header.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={layoutForm.control}
                    name="footerStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Footer Style</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a footer style" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="expanded">Expanded</SelectItem>
                            <SelectItem value="multicolumn">Multi-Column</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Style of your store's footer.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={layoutForm.control}
                  name="productGridColumns"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Grid Columns</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select number of columns" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2">2 Columns</SelectItem>
                          <SelectItem value="3">3 Columns</SelectItem>
                          <SelectItem value="4">4 Columns</SelectItem>
                          <SelectItem value="5">5 Columns</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Number of columns in product grid on desktop.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Display Options</h3>

                  <FormField
                    control={layoutForm.control}
                    name="showBreadcrumbs"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Show Breadcrumbs</FormLabel>
                          <FormDescription>
                            Display navigation breadcrumbs on product and category pages.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={layoutForm.control}
                    name="enableQuickView"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Enable Quick View</FormLabel>
                          <FormDescription>
                            Allow customers to preview products without leaving the current page.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={layoutForm.control}
                    name="showQuantitySelector"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel>Show Quantity Selector</FormLabel>
                          <FormDescription>Display quantity selector on product cards in grid view.</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Layout Settings
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

