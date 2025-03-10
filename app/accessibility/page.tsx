import { RetailLayout } from "@/components/layouts/retail-layout"
import Link from "next/link"

export default function AccessibilityPage() {
  return (
    <RetailLayout>
      <div className="container px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-wider mb-2">Accessibility Statement</h1>
          <p className="text-muted-foreground mb-8">Last updated: March 5, 2025</p>

          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              <span className="text-red-600">亞</span> ASNPRVCTR is committed to ensuring digital accessibility for
              people with disabilities. We are continually improving the user experience for everyone and applying the
              relevant accessibility standards.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Conformance Status</h2>

            <p>
              The Web Content Accessibility Guidelines (WCAG) define requirements for designers and developers to
              improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level
              AA, and Level AAA.
            </p>

            <p>
              <span className="text-red-600">亞</span> ASNPRVCTR is partially conformant with WCAG 2.1 level AA.
              Partially conformant means that some parts of the content do not fully conform to the accessibility
              standard.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Accessibility Features</h2>

            <p>
              <span className="text-red-600">亞</span> ASNPRVCTR website includes the following accessibility features:
            </p>

            <ul className="list-disc pl-5 space-y-1 my-4">
              <li>Semantic HTML structure for better screen reader navigation</li>
              <li>Keyboard navigation support for all interactive elements</li>
              <li>Sufficient color contrast for text and important graphics</li>
              <li>Text alternatives for non-text content</li>
              <li>Resizable text without loss of functionality</li>
              <li>Clear and consistent navigation</li>
              <li>Form labels and error messages</li>
              <li>ARIA landmarks and attributes where appropriate</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Limitations and Alternatives</h2>

            <p>
              Despite our best efforts to ensure the accessibility of <span className="text-red-600">亞</span>{" "}
              ASNPRVCTR, there may be some limitations. Below is a description of known limitations, and potential
              solutions:
            </p>

            <ul className="list-disc pl-5 space-y-1 my-4">
              <li>
                <strong>PDF Documents:</strong> Some of our older PDF documents may not be fully accessible. We are
                working to remediate these documents, but if you encounter an inaccessible PDF, please contact us for
                assistance.
              </li>
              <li>
                <strong>Third-Party Content:</strong> Some content provided by third parties may not be fully
                accessible. We are working with our partners to improve the accessibility of this content.
              </li>
              <li>
                <strong>Video Content:</strong> Some older video content may not have captions or audio descriptions. We
                are working to update these videos, but if you need assistance accessing video content, please contact
                us.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Feedback</h2>

            <p>
              We welcome your feedback on the accessibility of <span className="text-red-600">亞</span> ASNPRVCTR.
              Please let us know if you encounter accessibility barriers:
            </p>

            <ul className="list-disc pl-5 space-y-1 my-4">
              <li>Phone: +1 (800) 123-4567</li>
              <li>
                E-mail:{" "}
                <a href="mailto:accessibility@asnprvctr.com" className="text-primary hover:underline">
                  accessibility@asnprvctr.com
                </a>
              </li>
              <li>Postal address: 123 Commerce Street, Suite 100, San Francisco, CA 94103, United States</li>
            </ul>

            <p>We try to respond to feedback within 2 business days.</p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Assessment Approach</h2>

            <p>
              <span className="text-red-600">亞</span> ASNPRVCTR assessed the accessibility of this website by the
              following approaches:
            </p>

            <ul className="list-disc pl-5 space-y-1 my-4">
              <li>Self-evaluation</li>
              <li>External evaluation by accessibility experts</li>
              <li>User testing with assistive technologies</li>
            </ul>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">
              Compatibility with Browsers and Assistive Technology
            </h2>

            <p>
              <span className="text-red-600">亞</span> ASNPRVCTR is designed to be compatible with the following
              assistive technologies:
            </p>

            <ul className="list-disc pl-5 space-y-1 my-4">
              <li>Screen readers (including JAWS, NVDA, VoiceOver, and TalkBack)</li>
              <li>Speech recognition software</li>
              <li>Screen magnification software</li>
              <li>Alternative keyboard and mouse input devices</li>
            </ul>

            <p>
              <span className="text-red-600">亞</span> ASNPRVCTR is compatible with recent versions of major browsers,
              including Chrome, Firefox, Safari, and Edge.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Technical Specifications</h2>

            <p>
              Accessibility of <span className="text-red-600">亞</span> ASNPRVCTR relies on the following technologies
              to work with the particular combination of web browser and any assistive technologies or plugins installed
              on your computer:
            </p>

            <ul className="list-disc pl-5 space-y-1 my-4">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>WAI-ARIA</li>
            </ul>

            <p>These technologies are relied upon for conformance with the accessibility standards used.</p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Contact Us</h2>

            <p>
              If you have any questions about our accessibility efforts, need assistance, or want to report an
              accessibility issue, please{" "}
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

