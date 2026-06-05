"use client";

import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/atoms/button";
import { Logo } from "@/components/molecules/logo";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useCounts } from "@/hooks/use-counts";

export function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cart & Wishlist count: API for logged in, Zustand for guest
  const { data: counts } = useCounts();
  const guestCartCount = useCartStore((s) => s.items.length);
  const guestWishlistCount = useWishlistStore((s) => s.items.length);
  const cartCount = session ? (counts?.cart ?? 0) : guestCartCount;
  const wishlistCount = session ? (counts?.wishlist ?? 0) : guestWishlistCount;

  const navLinks = [
    { name: "Shop All", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "New Arrivals", href: "/products?sort=newest" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            className="flex lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>

          {/* Logo */}
          <div className="flex-1 lg:flex-none">
            <Link
              href="/"
              className="flex items-center justify-center lg:justify-start"
            >
              <Logo className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:flex" aria-label="Search">
              <Search className="size-5" />
            </button>

            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/account" aria-label="Account">
                  <User className="size-5" />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="hidden md:flex"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login" aria-label="Login">
                <User className="size-5" />
              </Link>
            )}

            <Link href="/cart" className="relative" aria-label="Cart">
              <ShoppingCart className="size-5" />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/account/wishlist"
              className="relative"
              aria-label="Wishlist"
            >
              <Heart className="size-5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "border-b bg-background overflow-hidden transition-all duration-300 lg:hidden",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col space-y-4 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
          {!session && (
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full">Login / Register</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
