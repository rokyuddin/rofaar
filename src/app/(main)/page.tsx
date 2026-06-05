import { Suspense } from "react";
import { HeroView } from "@/features/landing/components/hero-view";
import { AdSection } from "@/features/landing/components/ad-section";
import { CategoryGrid } from "@/features/landing/components/category-grid";
import { ProductListing } from "@/features/landing/components/product-listing";
import { Testimonials } from "@/features/landing/components/testimonials";
import { Newsletter } from "@/features/landing/components/newsletter";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/molecules/error-fallback";
import { fetchCategories, fetchProducts } from "@/lib/api-server";

export default async function LandingPage() {
  "use cache";

  const [categoriesRes, productsRes] = await Promise.all([
    fetchCategories(6),
    fetchProducts(20, "newest"),
  ]);

  return (
    <div className="flex flex-col">
      <HeroView />
      <AdSection />

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <CategoryGrid categories={categoriesRes.data || []} />
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense
          fallback={
            <div className="flex h-[400px] items-center justify-center">
              Loading products...
            </div>
          }
        >
          <ProductListing
            initialProducts={productsRes.data || []}
            initialPagination={productsRes.pagination}
          />
        </Suspense>
      </ErrorBoundary>

      <Testimonials />
      <Newsletter />
    </div>
  );
}
