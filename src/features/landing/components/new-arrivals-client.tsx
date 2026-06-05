"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/atoms/button";
import { Skeleton } from "@/components/atoms/skeleton";
import { useInfiniteProducts } from "@/hooks/use-products";
import type { Product } from "@/types/api";

export function NewArrivalsClient({
  initialProducts,
  limit = 5,
}: {
  initialProducts: Product[];
  limit?: number;
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteProducts({ limit: 20, sort: "newest" });

  const products = data?.pages.flatMap((page) => page.data) ?? initialProducts;

  if (isLoading && !data) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-3xl font-bold font-heading">New Arrivals</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full rounded-sm" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col space-y-4 md:flex-row md:items-end md:justify-between md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold font-heading">New Arrivals</h2>
          </div>
          <Link
            href="/products?sort=newest"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, limit).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {hasNextPage && (
          <div className="mt-12 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="min-w-[200px]"
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasDiscount = product.discountPercentage > 0;
  const hasMultipleImages = product.images && product.images.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + product.images.length) % product.images.length,
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const getStockStatus = () => {
    if (product.stock === 0) {
      return { label: "Out of Stock", class: "text-red-500 bg-red-50" };
    }
    const threshold = product.lowStockThreshold || 10;
    if (product.stock <= threshold) {
      return {
        label: `Low Stock (${product.stock})`,
        class: "text-amber-600 bg-amber-50",
      };
    }
    return { label: "In Stock", class: "text-emerald-600 bg-emerald-50" };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {hasDiscount && (
        <span className="absolute top-2.5 left-2.5 z-10 rounded bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          -{product.discountPercentage}% OFF
        </span>
      )}

      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <img
          src={
            product.images[currentImageIndex]?.url ||
            "https://via.placeholder.com/400x400"
          }
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
        />

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute top-1/2 left-2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-foreground shadow-sm opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-foreground shadow-sm opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1 rounded-full bg-black/25 px-2 py-1 opacity-0 transition-opacity group-hover:opacity-100">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <div className="flex items-center justify-between text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
          <span>{product.brand?.name || "Brand"}</span>
          <span>{product.category?.name || "Category"}</span>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-foreground transition-colors hover:text-primary"
        >
          {product.name}
        </Link>

        <div className="mt-1 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-orange-600">
              ৳{product.finalPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                ৳{Number(product.price).toLocaleString()}
              </span>
            )}
          </div>

          <span
            className={`rounded px-1.5 py-0.5 text-[9px] font-semibold tracking-wider uppercase ${stockStatus.class}`}
          >
            {stockStatus.label}
          </span>
        </div>
      </div>
    </div>
  );
}