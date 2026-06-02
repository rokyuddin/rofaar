import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ShippingCTA() {
  return (
    <div className="relative overflow-hidden bg-espresso py-20 px-6 text-center">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="mb-6 font-display font-bold text-white text-3xl md:text-4xl">
          Ready to discover something extraordinary?
        </h2>
        <p className="mb-10 font-sans text-white/70 text-lg italic">
          Explore our curated collection of artisanal goods that bring beauty
          and barakah to your life.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-accent px-10 py-4 rounded-none font-sans font-bold text-white text-sm uppercase tracking-widest transition-all group"
          >
            Shop All Products
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/20 px-10 py-4 rounded-none font-sans font-bold text-white text-sm uppercase tracking-widest transition-all"
          >
            Our Story
          </Link>
        </div>
      </div>
    </div>
  );
}
