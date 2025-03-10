import { RetailLayout } from "@/components/layouts/retail-layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ReturnsPage() {
  return (
    <RetailLayout>
      <div className="container px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-wider mb-2">Returns & Refunds</h1>
          <p className="text-muted-foreground mb-8">Last updated: March 5, 2025</p>

          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              At <span className="text-red-600">亞</span> ASNPRVCTR, we want you to be completely satisfied with your
              purchase. If you're not entirely happy with your order, we're here to help.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Return Policy</h2>

            <p>
              You may return most new, unopened items within 30 days of delivery for a full refund. We'll also pay the
              return shipping costs if the return is a result of our error (you received an incorrect or defective item,
              etc.).
            </p>

            <p>
              You should expect to receive your refund within 2-3 weeks of giving your package to the return shipper;
              however, in many cases you will receive a refund more quickly. This time period includes the transit time
              for us to receive your return from the shipper (5 to 10 business days), the time it takes us to process
              your return once we receive it (3 to 5 business days), and the time it takes your bank to process our
              refund request (5 to 10 business days).
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Return Process</h2>

            <ol className="list-decimal pl-5 space-y-2">
              <li>Log in to your account and visit the order history section.</li>
              <li>Select the order containing the item(s) you wish to return.</li>
              <li>Select the specific item(s) and reason for return.</li>
              <li>Print the prepaid return shipping label.</li>
              <li>Package the item(s) securely with all original packaging and tags.</li>
              <li>Attach the return shipping label to the outside of the package.</li>
              <li>Drop off the package at the designated shipping carrier.</li>
            </ol>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Refund Information</h2>

            <p>
              Once your return is received and inspected, we will send you an email to notify you that we have received
              your returned item. We will also notify you of the approval or rejection of your refund.
            </p>

            <p>
              If approved, your refund will be processed, and a credit will automatically be applied to your original
              method of payment within 3-5 business days.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Frequently Asked Questions</h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What items cannot be returned?</AccordionTrigger>
                <AccordionContent>
                  <p>Certain items cannot be returned, including:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Gift cards</li>
                    <li>Downloadable software products</li>
                    <li>Personal care items that have been opened or used</li>
                    <li>Items marked as "Final Sale" or "Non-Returnable"</li>
                    <li>Custom or personalized orders</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Can I exchange an item instead of returning it?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer exchanges for items of equal value. To request an exchange, follow the same return
                  process but select "Exchange" instead of "Return" and specify the item you'd like to receive instead.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What if my item arrives damaged?</AccordionTrigger>
                <AccordionContent>
                  If your item arrives damaged, please contact our customer service team within 48 hours of receiving
                  your order. Please include photos of the damaged item and packaging to help us process your claim
                  quickly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How long do refunds take to process?</AccordionTrigger>
                <AccordionContent>
                  Once we receive your return, refunds typically take 3-5 business days to process. After processing, it
                  may take an additional 5-10 business days for the refund to appear in your account, depending on your
                  payment provider.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 p-6 bg-muted/30 rounded-sm">
              <h3 className="font-bold mb-2">Need Help?</h3>
              <p className="mb-4">
                If you have any questions about our return policy or need assistance with a return, please don't
                hesitate to contact us.
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

