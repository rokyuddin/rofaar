import React from "react";
import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { ShippingHero } from "@/features/shipping/components/shipping-hero";
import { ShippingJourney } from "@/features/shipping/components/shipping-journey";
import { ShippingPolicies } from "@/features/shipping/components/shipping-policies";
import { ShippingCTA } from "@/features/shipping/components/shipping-cta";
import Link from "next/link";

export default function ShippingPage() {
    return (
        <>
            <Header />
            <main className="mx-auto px-6 pb-24 min-h-screen container">
                {/* Breadcrumbs */}
                <nav className="py-8">
                    <ol className="flex space-x-2 font-display text-stone-500 text-xs uppercase tracking-widest">
                        <li><Link className="hover:text-primary transition-colors" href="/">Home</Link></li>
                        <li>/</li>
                        <li className="font-bold text-primary">Shipping & Delivery</li>
                    </ol>
                </nav>

                <ShippingHero />
                <ShippingJourney />
                <ShippingPolicies />
                <ShippingCTA />
            </main>
            <Footer />
        </>
    );
}
