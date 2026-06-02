"use client";

import Link from "next/link";
import { Logo } from "@/components/molecules/logo";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Share2,
  MessageCircle,
} from "lucide-react";

export function Footer() {
  const currentYear = 2026;

  const footerLinks = {
    shop: [
      { name: "All Products", href: "/products" },
      { name: "Categories", href: "/categories" },
      { name: "New Arrivals", href: "/products?sort=newest" },
      { name: "Featured", href: "/products?sort=popular" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Shipping Policy", href: "/shipping" },
      { name: "Returns & Exchanges", href: "/returns" },
      { name: "Track Order", href: "/orders" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="border-t bg-muted/30 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="flex flex-col space-y-6">
            <Logo className="h-8 w-auto" />
            <p className="max-w-xs text-sm text-muted-foreground">
              Premium handcrafted goods designed for spiritual focus and daily
              barakah. Reconnect with tradition.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Globe className="size-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Share2 className="size-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <MessageCircle className="size-5" />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="mb-6 text-sm font-semibold uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4" />
                <span>123 Barakah St, Faith City, 54321</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="size-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="size-4" />
                <span>salam@rofaar.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Rofaar. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              {/* Payment Method Icons Placeholder */}
              <div className="flex space-x-2 grayscale opacity-50">
                <div className="h-6 w-10 rounded bg-muted"></div>
                <div className="h-6 w-10 rounded bg-muted"></div>
                <div className="h-6 w-10 rounded bg-muted"></div>
                <div className="h-6 w-10 rounded bg-muted"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
