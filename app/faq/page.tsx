import { RetailLayout } from "@/components/layouts/retail-layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function FAQPage() {
  return (
    <RetailLayout>
      <div className="container px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-wider mb-4">Frequently Asked Questions</h1>

          <div className="relative mb-8">
            <Input type="search" placeholder="Search FAQs..." className="w-full pl-10" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="w-full justify-start mb-6 overflow-auto">
              <TabsTrigger value="orders">Orders & Shipping</TabsTrigger>
              <TabsTrigger value="returns">Returns & Refunds</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="account">Account & Payment</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I track my order?</AccordionTrigger>
                  <AccordionContent>
                    Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can
                    also track your order by logging into your account and viewing your order history. Click on the
                    specific order to see its current status and tracking information.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How long will it take to receive my order?</AccordionTrigger>
                  <AccordionContent>
                    Standard shipping typically takes 3-5 business days after processing. Express shipping takes 1-2
                    business days. International orders may take 7-14 business days. Please note that these are
                    estimates and actual delivery times may vary based on your location and other factors.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we ship to select international destinations. International customers may be responsible for
                    duties, taxes, and customs clearance fees. These charges are not included in the shipping cost or
                    product price.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I change or cancel my order?</AccordionTrigger>
                  <AccordionContent>
                    You can request to change or cancel your order within 1 hour of placing it by contacting our
                    customer service team. After this window, we begin processing orders and cannot guarantee changes or
                    cancellations, though we'll do our best to accommodate your request.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>What if my package is lost or damaged?</AccordionTrigger>
                  <AccordionContent>
                    If your package appears to be lost or damaged during transit, please contact our customer service
                    team within 14 days of the expected delivery date. We'll work with the shipping carrier to locate
                    your package or process a claim for damaged items.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="returns" className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is your return policy?</AccordionTrigger>
                  <AccordionContent>
                    We accept returns of most new, unopened items within 30 days of delivery for a full refund. Some
                    items, such as personalized products, gift cards, and certain personal care items, cannot be
                    returned. Please see our{" "}
                    <Link href="/returns" className="text-primary hover:underline">
                      Returns & Refunds
                    </Link>{" "}
                    page for complete details.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I return an item?</AccordionTrigger>
                  <AccordionContent>
                    To return an item, log in to your account, go to your order history, select the order containing the
                    item(s) you wish to return, and follow the return instructions. You'll receive a prepaid return
                    shipping label to print. Package the item securely with all original packaging and tags, attach the
                    label, and drop it off at the designated shipping carrier.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>How long does it take to process a refund?</AccordionTrigger>
                  <AccordionContent>
                    Once we receive your return, refunds typically take 3-5 business days to process. After processing,
                    it may take an additional 5-10 business days for the refund to appear in your account, depending on
                    your payment provider.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I exchange an item instead of returning it?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer exchanges for items of equal value. To request an exchange, follow the same return
                    process but select "Exchange" instead of "Return" and specify the item you'd like to receive
                    instead.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="products" className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How can I find product dimensions and specifications?</AccordionTrigger>
                  <AccordionContent>
                    Detailed product dimensions and specifications can be found on each product's page under the
                    "Specifications" or "Details" tab. If you need additional information, please contact our customer
                    service team.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Are your products eco-friendly?</AccordionTrigger>
                  <AccordionContent>
                    We are committed to sustainability and offer many eco-friendly products. Look for the "Eco-Friendly"
                    badge on product pages. We're continuously working to expand our selection of sustainable products
                    and reduce our environmental impact.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Do you offer product warranties?</AccordionTrigger>
                  <AccordionContent>
                    Many of our products come with manufacturer warranties. Warranty information is listed on the
                    product page under "Warranty Information." For warranty claims, please contact our customer service
                    team with your order number and details about the issue.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I care for and maintain my products?</AccordionTrigger>
                  <AccordionContent>
                    Care and maintenance instructions are provided on product pages and included with your purchase.
                    Following these instructions will help ensure the longevity and performance of your products. If
                    you've lost your care instructions, please contact us for assistance.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="account" className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I create an account?</AccordionTrigger>
                  <AccordionContent>
                    To create an account, click on the "Register" button in the top right corner of the website. Fill in
                    your email address, create a password, and provide the required information. You'll receive a
                    confirmation email to verify your account.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                  <AccordionContent>
                    We accept major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and
                    Google Pay. All transactions are securely processed and your payment information is never stored on
                    our servers.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Is my personal information secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we take data security seriously. We use industry-standard encryption and security measures to
                    protect your personal information. For more details, please review our
                    <Link href="/privacy" className="text-primary hover:underline ml-1">
                      Privacy Policy
                    </Link>
                    .
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    To reset your password, click on "Login," then select "Forgot Password." Enter the email address
                    associated with your account, and we'll send you a password reset link. Follow the instructions in
                    the email to create a new password.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>

          <div className="mt-12 p-6 bg-muted/30 rounded-sm text-center">
            <h3 className="font-bold mb-2">Can't find what you're looking for?</h3>
            <p className="mb-4 text-muted-foreground">
              Our customer service team is ready to assist you with any questions you may have.
            </p>
            <Link href="/contact">
              <Button>Contact Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </RetailLayout>
  )
}

