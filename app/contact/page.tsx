import { RetailLayout } from "@/components/layouts/retail-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <RetailLayout>
      <div className="container px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold tracking-wider mb-6">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-muted-foreground mb-8">
                We're here to help. Fill out the form below, and our team will get back to you as soon as possible.
              </p>

              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email address" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order">Order Inquiry</SelectItem>
                      <SelectItem value="return">Return Request</SelectItem>
                      <SelectItem value="product">Product Information</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="How can we help you?" rows={5} required />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-muted/30 p-6 rounded-sm">
                <h2 className="text-xl font-medium mb-4">Contact Information</h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:support@asnprvctr.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        support@asnprvctr.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+18001234567" className="text-muted-foreground hover:text-primary transition-colors">
                        +1 (800) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">
                        123 Commerce Street
                        <br />
                        Suite 100
                        <br />
                        San Francisco, CA 94103
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM PST
                        <br />
                        Saturday: 10:00 AM - 4:00 PM PST
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-medium mb-4">Response Time</h2>
                <p className="text-muted-foreground">
                  We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please
                  contact us by phone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RetailLayout>
  )
}

