import { RetailLayout } from "@/components/layouts/retail-layout"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <RetailLayout>
      <div className="container px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-wider mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: March 5, 2025</p>

          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              At <span className="text-red-600">亞</span> ASNPRVCTR, we respect your privacy and are committed to
              protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard
              your information when you visit our website or make a purchase.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">1. Information We Collect</h2>

            <p>We collect several types of information from and about users of our website, including:</p>

            <ul className="list-disc pl-5 space-y-1 my-4">
              <li>
                <strong>Personal Data:</strong> Name, email address, postal address, phone number, payment information,
                and other information you provide when creating an account, making a purchase, or contacting us.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our website, products, and services.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type and version, time zone setting, browser
                plug-in types and versions, operating system and platform, and other technology on the devices you use
                to access our website.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">2. How We Collect Your Information</h2>

            <p>We collect information through:</p>

            <ul className="list-disc pl-5 space-y-1 my-4">
              <li>Direct interactions when you create an account, make a purchase, or contact us</li>
              <li>Automated technologies or interactions, including cookies and similar tracking technologies</li>
              <li>Third parties or publicly available sources</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">3. How We Use Your Information</h2>

            <p>We use your information to:</p>

            <ul className="list-disc pl-5 space-y-1 my-4">
              <li>Process and fulfill your orders</li>
              <li>Manage your account and provide customer support</li>
              <li>Send you order confirmations, updates, and marketing communications (if you've opted in)</li>
              <li>Improve our website, products, and services</li>
              <li>Detect, prevent, and address technical issues or fraudulent activities</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">4. How We Share Your Information</h2>

            <p>We may share your personal information with:</p>

            <ul className="list-disc pl-5 space-y-1 my-4">
              <li>
                Service providers who perform services on our behalf (payment processors, shipping companies, etc.)
              </li>
              <li>Business partners with your consent</li>
              <li>Law enforcement or other governmental authorities when required by law</li>
              <li>In connection with a business transaction such as a merger, acquisition, or sale of assets</li>
            </ul>

            <p>We do not sell your personal information to third parties.</p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">5. Data Security</h2>

            <p>
              We have implemented appropriate technical and organizational measures to secure your personal data from
              accidental loss, unauthorized access, alteration, and disclosure. All payment transactions are encrypted
              using SSL technology.
            </p>

            <p>
              While we use commercially reasonable efforts to protect your personal information, no method of
              transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute
              security.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">6. Your Data Protection Rights</h2>

            <p>Depending on your location, you may have certain rights regarding your personal data, including:</p>

            <ul className="list-disc pl-5 space-y-1 my-4">
              <li>The right to access your personal data</li>
              <li>The right to rectify inaccurate personal data</li>
              <li>The right to erasure (the "right to be forgotten")</li>
              <li>The right to restrict processing of your personal data</li>
              <li>The right to data portability</li>
              <li>The right to object to processing of your personal data</li>
              <li>The right to withdraw consent</li>
            </ul>

            <p>
              To exercise these rights, please contact us using the information provided in the "Contact Us" section.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">7. Children's Privacy</h2>

            <p>
              Our website is not intended for children under 16 years of age. We do not knowingly collect personal
              information from children under 16. If you are a parent or guardian and believe your child has provided us
              with personal information, please contact us.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">8. Changes to Our Privacy Policy</h2>

            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy
              Policy periodically for any changes.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">9. Contact Us</h2>

            <p>
              If you have any questions about this Privacy Policy, please{" "}
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

