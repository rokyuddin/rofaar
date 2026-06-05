import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "@/components/molecules/error-fallback";
import { CategoryGrid } from "@/features/landing/components/category-grid";
import { HeroView } from "@/features/landing/components/hero-view";
import { NewArrivals } from "@/features/landing/components/new-arrivals";
import { ProductListing } from "@/features/landing/components/product-listing";
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

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <CategoryGrid categories={categoriesRes.data || []} />
      </ErrorBoundary>

      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense
          fallback={
            <div className="flex h-[400px] items-center justify-center">
              Loading new arrivals...
            </div>
          }
        >
          <NewArrivals limit={5} />
        </Suspense>
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
    </div>
  );
}
