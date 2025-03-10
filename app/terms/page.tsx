import { RetailLayout } from "@/components/layouts/retail-layout"
import Link from "next/link"

export default function TermsPage() {
  return (
    <RetailLayout>
      <div className="container px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-wider mb-2">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8">Last updated: March 5, 2025</p>

          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              Please read these Terms and Conditions ("Terms") carefully before using the{" "}
              <span className="text-red-600">亞</span> ASNPRVCTR website and services.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">1. Agreement to Terms</h2>

            <p>
              By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of
              the terms, you may not access the website or use our services.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">2. Intellectual Property Rights</h2>

            <p>
              Unless otherwise stated, <span className="text-red-600">亞</span> ASNPRVCTR and/or its licensors own the
              intellectual property rights for all material on the website. All intellectual property rights are
              reserved. You may access this material for your personal use subject to restrictions set in these Terms.
            </p>

            <p>You must not:</p>
            <ul className="list-disc pl-5 space-y-1 my-4">
              <li>Republish material from our website</li>
              <li>Sell, rent, or sub-license material from our website</li>
              <li>Reproduce, duplicate, or copy material from our website</li>
              <li>Redistribute content from our website</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">3. User Accounts</h2>

            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current
              at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate
              termination of your account.
            </p>

            <p>
              You are responsible for safeguarding the password that you use to access the website and for any
              activities or actions under your password. You agree not to disclose your password to any third party. You
              must notify us immediately upon becoming aware of any breach of security or unauthorized use of your
              account.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">4. Products and Services</h2>

            <p>
              All products and services are subject to availability. We reserve the right to discontinue any product or
              service at any time. Prices for our products are subject to change without notice. We reserve the right to
              modify or discontinue the service without notice at any time.
            </p>

            <p>
              We shall not be liable to you or to any third-party for any modification, price change, suspension, or
              discontinuance of the service.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">5. Accuracy of Information</h2>

            <p>
              We are not responsible if information made available on this website is not accurate, complete, or
              current. The material on this website is provided for general information only and should not be relied
              upon or used as the sole basis for making decisions without consulting primary, more accurate, more
              complete, or more timely sources of information.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">6. Prohibited Uses</h2>

            <p>
              You may use our website only for lawful purposes and in accordance with these Terms. You agree not to use
              our website:
            </p>

            <ul className="list-disc pl-5 space-y-1 my-4">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
              <li>
                To transmit, or procure the sending of, any advertising or promotional material, including any "junk
                mail," "chain letter," "spam," or any other similar solicitation
              </li>
              <li>
                To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other
                person or entity
              </li>
              <li>
                To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website, or
                which may harm the Company or users of the website
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">7. Limitation of Liability</h2>

            <p>
              In no event shall <span className="text-red-600">亞</span> ASNPRVCTR, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special,
              consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or
              other intangible losses, resulting from your access to or use of or inability to access or use the
              website.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">8. Governing Law</h2>

            <p>
              These Terms shall be governed and construed in accordance with the laws of the United States, without
              regard to its conflict of law provisions.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">9. Changes to Terms</h2>

            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What
              constitutes a material change will be determined at our sole discretion.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">10. Contact Us</h2>

            <p>
              If you have any questions about these Terms, please{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </RetailLayout>
  )
}

