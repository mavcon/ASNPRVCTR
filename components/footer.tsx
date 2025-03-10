import Link from "next/link"
import { Facebook, Twitter, Instagram } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left section - Copyright and socials */}
        <div className="space-y-4">
          <p className="text-sm">© {new Date().getFullYear()} 亞 ASNPRVCTR</p>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="https://instagram.com" className="text-muted-foreground hover:text-foreground">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>

        {/* Help section */}
        <div>
          <h3 className="font-medium mb-4">Help</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal section */}
        <div>
          <h3 className="font-medium mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </li>
          </ul>
        </div>

        {/* Payment Methods & Theme Toggle */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-4">Payment Methods</h3>
            <div className="flex space-x-2">
              <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                <span className="text-xs">Visa</span>
              </div>
              <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                <span className="text-xs">MC</span>
              </div>
              <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                <span className="text-xs">Amex</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <span className="text-sm text-muted-foreground">Toggle theme</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

