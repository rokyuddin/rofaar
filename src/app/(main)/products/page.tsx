"use client";

import { Suspense } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/atoms/breadcrumb";
import { Button } from "@/components/atoms/button";
import { Checkbox } from "@/components/atoms/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/atoms/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import { Skeleton } from "@/components/atoms/skeleton";
import { useBrands } from "@/hooks/use-brands";
import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/types/api";

const ITEMS_PER_PAGE = 12;

function ProductsPageInner() {
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("newest"),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [categoryFilter, setCategoryFilter] = useQueryState(
    "category",
    parseAsString.withDefault(""),
  );
  const [brandFilter, setBrandFilter] = useQueryState(
    "brand",
    parseAsString.withDefault(""),
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data: productsData, isLoading: productsLoading } = useProducts({
    page,
    limit: ITEMS_PER_PAGE,
    sort: sort as "newest" | "price-low" | "price-high" | "popular",
    category: categoryFilter || undefined,
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useCategories({
    limit: 50,
  });
  const { data: brandsData, isLoading: brandsLoading } = useBrands({
    limit: 50,
  });

  const products = productsData?.data || [];
  const pagination = productsData?.pagination;
  const categories = categoriesData?.data || [];
  const brands = brandsData?.data || [];

  const handleCategoryChange = (slug: string) => {
    setCategoryFilter(categoryFilter === slug ? "" : slug);
    setPage(1);
  };

  const handleBrandChange = (slug: string) => {
    setBrandFilter(brandFilter === slug ? "" : slug);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  const clearFilters = () => {
    setCategoryFilter("");
    setBrandFilter("");
    setPage(1);
  };

  const hasActiveFilters = categoryFilter || brandFilter;

  const totalPages = pagination?.totalPages || 1;
  const pageNumbers: (number | "ellipsis")[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1);
    if (page > 3) pageNumbers.push("ellipsis");
    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pageNumbers.push(i);
    }
    if (page < totalPages - 2) pageNumbers.push("ellipsis");
    pageNumbers.push(totalPages);
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading tracking-tight lg:text-4xl">
              Products
            </h1>
            {pagination && (
              <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">
                {pagination.total} items
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden rounded-none"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <SlidersHorizontal className="mr-2 size-4" />
              Filters
            </Button>
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[160px] rounded-none">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="rounded-none">
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          <aside
            className={`
              ${mobileFiltersOpen ? "fixed inset-0 z-50 bg-background p-6" : "hidden"}
              lg:relative lg:block lg:w-64 lg:shrink-0
            `}
          >
            {mobileFiltersOpen && (
              <div className="mb-6 flex items-center justify-between lg:hidden">
                <h2 className="text-lg font-bold font-heading">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <X className="size-5" />
                </Button>
              </div>
            )}

            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
                  Category
                </h3>
                {categoriesLoading ? (
                  <div className="space-y-3">
                    {[...Array(4)].map((_item, i) => (
                      <Skeleton key={i} className="h-5 w-24" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className="flex cursor-pointer items-center gap-2 text-sm"
                      >
                        <Checkbox
                          checked={categoryFilter === category.slug}
                          onCheckedChange={() =>
                            handleCategoryChange(category.slug)
                          }
                        />
                        <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
                  Brand
                </h3>
                {brandsLoading ? (
                  <div className="space-y-3">
                    {[...Array(4)].map((_item, i) => (
                      <Skeleton key={i} className="h-5 w-20" />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {brands.map((brand) => (
                      <label
                        key={brand.id}
                        className="flex cursor-pointer items-center gap-2 text-sm"
                      >
                        <Checkbox
                          checked={brandFilter === brand.slug}
                          onCheckedChange={() => handleBrandChange(brand.slug)}
                        />
                        <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                          {brand.name}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-none"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </aside>

          <div className="flex-1">
            {hasActiveFilters && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {categoryFilter && (
                  <span className="inline-flex items-center gap-1 rounded-none border border-input bg-muted px-3 py-1 text-xs uppercase tracking-wider">
                    {categories.find((c) => c.slug === categoryFilter)?.name ||
                      categoryFilter}
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(categoryFilter)}
                      className="ml-1 hover:text-primary"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                )}
                {brandFilter && (
                  <span className="inline-flex items-center gap-1 rounded-none border border-input bg-muted px-3 py-1 text-xs uppercase tracking-wider">
                    {brands.find((b) => b.slug === brandFilter)?.name ||
                      brandFilter}
                    <button
                      type="button"
                      onClick={() => handleBrandChange(brandFilter)}
                      className="ml-1 hover:text-primary"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {productsLoading ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {[...Array(ITEMS_PER_PAGE)].map((_item, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-sm border border-border bg-card"
                  >
                    <Skeleton className="aspect-square w-full rounded-none" />
                    <div className="space-y-2 p-2.5">
                      <Skeleton className="h-3 w-full rounded-none" />
                      <Skeleton className="h-3 w-2/3 rounded-none" />
                      <Skeleton className="h-4 w-1/2 rounded-none" />
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-lg text-muted-foreground">
                  No products found.
                </p>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    className="mt-4 rounded-none"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) setPage(page - 1);
                        }}
                        className={
                          page <= 1 ? "pointer-events-none opacity-50" : ""
                        }
                      />
                    </PaginationItem>
                    {pageNumbers.map((num, _i) =>
                      num === "ellipsis" ? (
                        <PaginationItem key="ellipsis">
                          <span className="px-2 text-muted-foreground">
                            ...
                          </span>
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={num}>
                          <PaginationLink
                            href="#"
                            isActive={page === num}
                            onClick={(e) => {
                              e.preventDefault();
                              setPage(num);
                            }}
                          >
                            {num}
                          </PaginationLink>
                        </PaginationItem>
                      ),
                    )}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (page < totalPages) setPage(page + 1);
                        }}
                        className={
                          page >= totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-96 w-full" />
        </div>
      }
    >
      <ProductsPageInner />
    </Suspense>
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
