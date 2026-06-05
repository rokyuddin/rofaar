"use client";

import { useInfiniteProducts } from "@/hooks/use-products";
import { Button } from "@/components/atoms/button";
import Link from "next/link";
import { Skeleton } from "@/components/atoms/skeleton";
import { Product } from "@/types/api";
import type { ApiResponse } from "@/types/api";
import { useQueryState, parseAsStringLiteral } from "nuqs";

const sortOptions = ["newest", "price-low", "price-high", "popular"] as const;

export function ProductListing({
  initialProducts,
  initialPagination,
}: {
  initialProducts: Product[];
  initialPagination?: ApiResponse<Product[]>["pagination"];
}) {
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringLiteral(sortOptions).withDefault("newest"),
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteProducts({ limit: 20, sort: sort as any });

  const products = data?.pages.flatMap((page) => page.data) ?? initialProducts;

  if (isLoading && !data) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-3xl font-bold font-heading">Our Products</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col space-y-4 md:flex-row md:items-end md:justify-between md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold font-heading">
              Rofaar Collections
            </h2>
            <div className="mt-2 flex items-center space-x-4">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="bg-transparent text-sm font-medium focus:outline-none"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {(hasNextPage ||
          (!data &&
            initialPagination &&
            initialPagination.page < initialPagination.totalPages)) && (
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
  const hasDiscount = product.discountPercentage > 0;
  return (
    <div className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <img
          src={product.images[0]?.url || "https://via.placeholder.com/400x500"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-2.5">
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 min-h-[2.5rem] text-xs font-medium leading-snug text-foreground transition-colors hover:text-primary"
        >
          {product.name}
        </Link>
        <div className="mt-1 flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-orange-600">
            ৳{product.finalPrice.toLocaleString()}
          </span>
          {hasDiscount && (
            <span className="text-[11px] text-muted-foreground line-through">
              ৳{Number(product.price).toLocaleString()}
            </span>
          )}
        </div>
        {hasDiscount && (
          <span className="text-[11px] font-medium text-muted-foreground">
            -{product.discountPercentage}%
          </span>
        )}
      </div>
    </div>
  );
}
