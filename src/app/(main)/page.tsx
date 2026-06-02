"use client";

import { Suspense } from "react";
import { Hero } from "@/features/landing/components/hero";
import { AdSection } from "@/features/landing/components/ad-section";
import { CategoryGrid } from "@/features/landing/components/category-grid";
import { ProductListing } from "@/features/landing/components/product-listing";
import { Testimonials } from "@/features/landing/components/testimonials";
import { Newsletter } from "@/features/landing/components/newsletter";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/atoms/button";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: unknown;
  resetErrorBoundary: () => void;
}) {
  const message =
    error instanceof Error ? error.message : "An unknown error occurred";
  return (
    <div className="flex h-[400px] flex-col items-center justify-center p-4 text-center">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong</h2>
      <p className="mb-6 text-muted-foreground">{message}</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <AdSection />

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <CategoryGrid />
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense
          fallback={
            <div className="h-[400px] flex items-center justify-center">
              Loading products...
            </div>
          }
        >
          <ProductListing />
        </Suspense>
      </ErrorBoundary>

      <Testimonials />
      <Newsletter />
    </div>
  );
}
