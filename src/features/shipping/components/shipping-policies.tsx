import Link from "next/link";
import type React from "react";

export const ShippingPolicies: React.FC = () => {
  return (
    <div className="gap-16 grid grid-cols-1 lg:grid-cols-3 pt-16 border-primary/10 border-t">
      {/* Shipping Rates */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-2">
          <span className="bg-primary w-8 h-px" />
          <h2 className="font-display font-bold text-stone-900 dark:text-stone-100 text-2xl">
            Shipping Rates
          </h2>
        </div>

        <div className="space-y-4 font-display">
          <div className="flex justify-between items-end pb-2 border-primary/10 border-b">
            <span className="text-stone-600 dark:text-stone-400">
              Domestic (Mainland)
            </span>
            <span className="font-bold text-primary">Free</span>
          </div>

          <div className="flex justify-between items-end pb-2 border-primary/10 border-b">
            <span className="text-stone-600 dark:text-stone-400">
              International Standard
            </span>
            <span className="font-bold text-primary">$25.00</span>
          </div>

          <div className="flex justify-between items-end pb-2 border-primary/10 border-b">
            <span className="text-stone-600 dark:text-stone-400">
              International Express
            </span>
            <span className="font-bold text-primary">$45.00</span>
          </div>

          <p className="font-display text-stone-500 text-sm italic">
            Complimentary express shipping on all orders over $250.
          </p>
        </div>
      </div>

      {/* Delivery Timelines */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-2">
          <span className="bg-primary w-8 h-px" />
          <h2 className="font-display font-bold text-stone-900 dark:text-stone-100 text-2xl">
            Timelines
          </h2>
        </div>

        <div className="space-y-6 font-display">
          <div>
            <h4 className="font-bold text-stone-800 dark:text-stone-200 text-sm uppercase tracking-wide">
              Preparation
            </h4>
            <p className="mt-1 text-stone-600 dark:text-stone-400">
              2–4 business days for artisanal finishing and quality checks.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-stone-800 dark:text-stone-200 text-sm uppercase tracking-wide">
              Transit
            </h4>
            <p className="mt-1 text-stone-600 dark:text-stone-400">
              Domestic: 3–5 days <br /> International: 7–12 days
            </p>
          </div>
        </div>
      </div>

      {/* Return Policy */}
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-2">
          <span className="bg-primary w-8 h-px" />
          <h2 className="font-display font-bold text-stone-900 dark:text-stone-100 text-2xl">
            Returns
          </h2>
        </div>

        <p className="font-display text-stone-600 dark:text-stone-400 leading-relaxed">
          We take pride in our craftsmanship. If your selection doesn't resonate
          with you, we offer a 30-day return window for all standard items in
          original condition.
        </p>

        <div className="pt-4">
          <Link
            className="group inline-flex items-center font-display font-bold text-primary text-xs uppercase tracking-widest"
            href="/returns"
          >
            Start a Return
            <span className="ml-2 text-sm transition-transform group-hover:translate-x-1 material-icons">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
