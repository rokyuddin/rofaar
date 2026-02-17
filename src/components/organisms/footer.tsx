import { Instagram, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { Logo } from "../molecules/logo";

export function Footer() {
  return (
    <footer className="bg-background-light mt-auto pt-16 pb-8 border-border border-t">
      <div className="mx-auto px-6 max-w-[1440px]">
        <div className="gap-12 grid grid-cols-1 md:grid-cols-4 mb-16">
          <div className="space-y-4 col-span-1 md:col-span-1">
            <Link
              className="flex items-center gap-2 mb-4"
              href="/"
            >
              <Logo />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Elevating Islamic lifestyle goods beyond the generic. A curated
              marketplace for the productive believer.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
                href="#"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary transition-colors"
                href="#"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                aria-label="Email"
                className="text-muted-foreground hover:text-primary transition-colors"
                href="#"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-bold text-lg">
              Shop
            </h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/shop"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/shop/prayer-mats"
                >
                  Prayer Mats
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/shop/journals"
                >
                  Journals
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/shop/misbaha"
                >
                  Misbaha
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/shop/fragrance"
                >
                  Home Fragrance
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-bold text-lg">
              Company
            </h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/story"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/journal"
                >
                  The Journal
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/artisans"
                >
                  Artisan Network
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/sustainability"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/careers"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-display font-bold text-lg">
              Support
            </h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/help"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/shipping"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/orders/status"
                >
                  Order Status
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary transition-colors"
                  href="/contact"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex md:flex-row flex-col justify-between items-center gap-4 pt-8 border-border border-t text-muted-foreground text-xs">
          <p>© {new Date().getFullYear()} Rofaar. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              className="hover:text-primary transition-colors"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            <Link
              className="hover:text-primary transition-colors"
              href="/terms"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
