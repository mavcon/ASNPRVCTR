import { RetailLayout } from "@/components/layouts/retail-layout"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CookiesPage() {
  return (
    <RetailLayout>
      <div className="container px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-wider mb-2">Cookie Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: March 5, 2025</p>

          <div className="prose prose-sm max-w-none text-muted-foreground">
            <p>
              This Cookie Policy explains how <span className="text-red-600">亞</span> ASNPRVCTR uses cookies and
              similar technologies to recognize you when you visit our website. It explains what these technologies are
              and why we use them, as well as your rights to control our use of them.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">What Are Cookies?</h2>

            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website.
              Cookies are widely used by website owners to make their websites work, or to work more efficiently, as
              well as to provide reporting information.
            </p>

            <p>
              Cookies set by the website owner (in this case, <span className="text-red-600">亞</span> ASNPRVCTR) are
              called "first-party cookies." Cookies set by parties other than the website owner are called "third-party
              cookies." Third-party cookies enable third-party features or functionality to be provided on or through
              the website (e.g., advertising, interactive content, and analytics).
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Types of Cookies We Use</h2>

            <div className="my-6 overflow-hidden rounded-sm border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type of Cookie</TableHead>
                    <TableHead>Purpose</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Essential Cookies</TableCell>
                    <TableCell>
                      These cookies are necessary for the website to function and cannot be switched off in our systems.
                      They are usually only set in response to actions made by you which amount to a request for
                      services, such as setting your privacy preferences, logging in, or filling in forms.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Performance Cookies</TableCell>
                    <TableCell>
                      These cookies allow us to count visits and traffic sources so we can measure and improve the
                      performance of our site. They help us to know which pages are the most and least popular and see
                      how visitors move around the site.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Functional Cookies</TableCell>
                    <TableCell>
                      These cookies enable the website to provide enhanced functionality and personalization. They may
                      be set by us or by third-party providers whose services we have added to our pages.
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Targeting Cookies</TableCell>
                    <TableCell>
                      These cookies may be set through our site by our advertising partners. They may be used by those
                      companies to build a profile of your interests and show you relevant advertisements on other
                      sites.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">How Can You Control Cookies?</h2>

            <p>
              You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject
              cookies, you may still use our website though your access to some functionality and areas of our website
              may be restricted. As the means by which you can refuse cookies through your web browser controls vary
              from browser to browser, you should visit your browser's help menu for more information.
            </p>

            <p>
              In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would
              like to find out more information, please visit{" "}
              <a
                href="http://www.aboutads.info/choices/"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://www.aboutads.info/choices/
              </a>{" "}
              or
              <a
                href="http://www.youronlinechoices.com"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                http://www.youronlinechoices.com
              </a>
              .
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">
              Do You Use Flash Cookies or Local Shared Objects?
            </h2>

            <p>
              Our website may also use "Flash Cookies" (also known as Local Shared Objects or "LSOs") to collect and
              store information about your use of our services, fraud prevention, and for other site operations.
            </p>

            <p>
              If you do not want Flash Cookies stored on your computer, you can adjust the settings of your Flash player
              to block Flash Cookies storage using the tools contained in the{" "}
              <a
                href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website Storage Settings Panel
              </a>
              . You can also control Flash Cookies by going to the{" "}
              <a
                href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager03.html"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Global Storage Settings Panel
              </a>
              .
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Do You Serve Targeted Advertising?</h2>

            <p>
              Third parties may serve cookies on your computer or mobile device to serve advertising through our
              website. These companies may use information about your visits to this and other websites in order to
              provide relevant advertisements about goods and services that you may be interested in. They may also
              employ technology that is used to measure the effectiveness of advertisements.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">
              How Often Will You Update This Cookie Policy?
            </h2>

            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the
              cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this
              Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>

            <h2 className="text-xl font-bold mt-8 mb-4 text-foreground">Contact Us</h2>

            <p>
              If you have any questions about our use of cookies or other technologies, please{" "}
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

