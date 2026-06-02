"use client";

import { useInfiniteProducts } from "@/hooks/use-products";
import { Button } from "@/components/atoms/button";
import Link from "next/link";
import { Skeleton } from "@/components/atoms/skeleton";
import { Product } from "@/types/api";
import { useQueryState, parseAsStringLiteral } from "nuqs";

const sortOptions = ["newest", "price-low", "price-high", "popular"] as const;

export function ProductListing() {
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsStringLiteral(sortOptions).withDefault("newest"),
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteProducts({ limit: 20, sort: sort as any });

  if (isLoading) {
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

  const products = data?.pages.flatMap((page) => page.data) || [];

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

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
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
  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/5] overflow-hidden bg-muted"
      >
        <img
          src={product.images[0]?.url || "https://via.placeholder.com/400x500"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute left-2 top-2 bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            -{product.discountPercentage}%
          </div>
        )}
      </Link>
      <div className="mt-4 flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">
            {product.category.name}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {product.brand.name}
          </span>
        </div>
        <Link
          href={`/products/${product.slug}`}
          className="text-base font-semibold transition-colors hover:text-primary"
        >
          {product.name}
        </Link>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold">
            ৳{product.finalPrice.toLocaleString()}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              ৳{Number(product.price).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
