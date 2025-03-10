import { RetailLayout } from "@/components/layouts/retail-layout"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <RetailLayout>
      <div className="container px-4 py-6 md:py-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wider mb-4">
              About{" "}
              <span className="inline-flex items-center">
                <span className="text-red-600 flex items-center">亞</span>
                <span className="ml-[0.3em]">ASNPRVCTR</span>
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Redefining the e-commerce experience with quality products and exceptional service since 2020.
            </p>
          </div>

          <div className="aspect-video relative mb-12 rounded-sm overflow-hidden">
            <Image src="/placeholder.svg?height=600&width=1200" alt="ASNPRVCTR Team" fill className="object-cover" />
          </div>

          {/* Vision Section */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold tracking-wider mb-4">Our Vision</h2>
                <p className="text-muted-foreground mb-4">
                  At{" "}
                  <span className="inline-flex items-center">
                    <span className="text-red-600 flex items-center">亞</span>
                    <span className="ml-[0.3em]">ASNPRVCTR</span>
                  </span>
                  , we envision a world where quality products are accessible to everyone, regardless of location or
                  background. We strive to create an e-commerce platform that not only delivers exceptional products but
                  also fosters a sense of community and trust.
                </p>
                <p className="text-muted-foreground">
                  We believe in a future where online shopping is not just a transaction but an experience that brings
                  joy, satisfaction, and connection. Our vision is to lead this transformation in the e-commerce
                  industry, setting new standards for quality, service, and sustainability.
                </p>
              </div>
              <div className="md:w-1/2">
                <Card className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image src="/placeholder.svg?height=400&width=400" alt="Our Vision" fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground italic">
                      "We're building more than just an e-commerce platform; we're creating a community of like-minded
                      individuals who value quality and authenticity."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <Separator className="my-16" />

          {/* Mission Section */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold tracking-wider mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-4">
                  Our mission is to provide a curated selection of high-quality products that enhance our customers'
                  lives while maintaining the highest standards of customer service and ethical business practices.
                </p>
                <p className="text-muted-foreground">We are committed to:</p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground mt-2">
                  <li>Sourcing products that meet our strict quality standards</li>
                  <li>Creating a seamless and enjoyable shopping experience</li>
                  <li>Building lasting relationships with our customers and partners</li>
                  <li>Operating with transparency and integrity in all aspects of our business</li>
                  <li>Minimizing our environmental impact through sustainable practices</li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <Card className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Our Mission"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground italic">
                      "Every day, we work to deliver on our promise of quality, service, and integrity. It's not just
                      what we do; it's who we are."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <Separator className="my-16" />

          {/* Community Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wider mb-8 text-center">Our Community</h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-10">
              We believe that business is about more than just transactions; it's about building a community of
              individuals who share our values and vision. Our community extends beyond our customers to include our
              team members, partners, suppliers, and the broader society we serve.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3">For Our Customers</h3>
                  <p className="text-muted-foreground">
                    We're dedicated to creating a welcoming space where customers can discover products that bring value
                    to their lives. We listen to your feedback, adapt to your needs, and strive to exceed your
                    expectations at every touchpoint.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3">For Our Partners</h3>
                  <p className="text-muted-foreground">
                    We collaborate with partners who share our commitment to quality and integrity. Together, we work to
                    create mutually beneficial relationships that drive innovation and growth in our respective
                    industries.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3">For Our Society</h3>
                  <p className="text-muted-foreground">
                    We recognize our responsibility to contribute positively to society. Through sustainable practices,
                    ethical sourcing, and community initiatives, we aim to make a meaningful impact beyond the realm of
                    e-commerce.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Join Us Section */}
          <section className="text-center py-12 bg-muted/50 rounded-sm">
            <h2 className="text-2xl md:text-3xl font-bold tracking-wider mb-4">Join Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              We're just getting started, and we invite you to be part of our story. Whether you're a customer, partner,
              or simply someone who shares our values, there's a place for you in the{" "}
              <span className="inline-flex items-center">
                <span className="text-red-600 flex items-center">亞</span>
                <span className="ml-[0.3em]">ASNPRVCTR</span>
              </span>{" "}
              community.
            </p>
            <Button size="lg">Contact Us</Button>
          </section>
        </div>
      </div>
    </RetailLayout>
  )
}

