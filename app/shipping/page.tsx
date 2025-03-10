import { RetailLayout } from "@/components/layouts/retail-layout"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ShippingPage() {
  return (
    <RetailLayout>
      <div className="container px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-wider mb-2">Shipping Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: March 5, 2025</p>

          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              At <span className="text-red-600">亞</span> ASNPRVCTR, we strive to provide reliable, fast shipping for
              all orders. This policy outlines our shipping procedures, timeframes, and costs.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Processing Time</h2>

            <p>
              All orders are processed within 1-2 business days (Monday-Friday, excluding holidays) after receiving your
              order confirmation email. Orders placed after 12 PM EST will be considered received the following business
              day.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Shipping Methods & Delivery Times</h2>

            <p>We offer several shipping methods to meet your needs. Estimated delivery times are as follows:</p>

            <div className="my-6 overflow-hidden rounded-sm border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shipping Method</TableHead>
                    <TableHead>Estimated Delivery Time</TableHead>
                    <TableHead>Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Standard Shipping</TableCell>
                    <TableCell>3-5 business days</TableCell>
                    <TableCell>$5.99 (Free on orders over $50)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Express Shipping</TableCell>
                    <TableCell>1-2 business days</TableCell>
                    <TableCell>$12.99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>International Shipping</TableCell>
                    <TableCell>7-14 business days</TableCell>
                    <TableCell>Varies by location</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <p>
              Please note that these are estimated delivery times and are not guaranteed. Delivery times may be affected
              by factors outside our control, such as customs processing for international shipments, weather
              conditions, or carrier delays.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Shipping Locations</h2>

            <p>
              We currently ship to all 50 U.S. states, Canada, and select international destinations. For international
              orders, please note that you may be responsible for duties, taxes, and customs clearance fees. These
              charges are not included in the shipping cost or product price.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Order Tracking</h2>

            <p>
              Once your order ships, you will receive a shipping confirmation email with a tracking number. You can
              track your order by clicking the tracking link in the email or by logging into your account on our
              website.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Shipping Restrictions</h2>

            <p>
              Certain products cannot be shipped to international destinations due to local laws and regulations. If you
              have placed an order for an item that cannot be shipped to your location, we will notify you and provide a
              full refund.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Lost or Damaged Packages</h2>

            <p>
              If your package appears to be lost or damaged during transit, please contact our customer service team
              within 14 days of the expected delivery date. We will work with the shipping carrier to locate your
              package or process a claim for damaged items.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Address Changes</h2>

            <p>
              If you need to change your shipping address after placing your order, please contact us immediately. We
              cannot guarantee that we will be able to change the address if your order has already been processed, but
              we will do our best.
            </p>

            <div className="mt-8 p-6 bg-muted/30 rounded-sm">
              <h3 className="font-bold mb-2">Questions About Shipping?</h3>
              <p className="mb-4">
                If you have any questions about our shipping policy or need assistance with a specific order, please
                don't hesitate to contact our customer service team.
              </p>
              <Link href="/contact">
                <Button>Contact Customer Service</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </RetailLayout>
  )
}

