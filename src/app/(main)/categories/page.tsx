"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/atoms/breadcrumb";
import { Button } from "@/components/atoms/button";
import { Skeleton } from "@/components/atoms/skeleton";
import { useCategories } from "@/hooks/use-categories";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import type { Category } from "@/types/api";

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group flex flex-col items-center gap-3"
    >
      <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-white p-4 shadow-sm transition-shadow group-hover:shadow-md sm:h-36 sm:w-36 sm:p-5">
        <img
          src={category.imageUrl || "https://via.placeholder.com/144"}
          alt={category.name}
          className="h-full w-full object-contain"
        />
      </div>
      <span className="text-center text-xs font-medium text-foreground sm:text-sm">
        {category.name}
      </span>
    </Link>
  );
}

export default function CategoriesPage() {
  const { data: categoriesData, isLoading } = useCategories({ limit: 50 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const categories = categoriesData?.data || [];

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [categories]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.6;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

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
              <BreadcrumbPage>Categories</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-12">
          <h1 className="text-3xl font-bold font-heading tracking-tight lg:text-4xl">
            Categories
          </h1>
          <p className="mt-2 text-sm text-muted-foreground uppercase tracking-widest">
            Browse our collections
          </p>
        </div>

        <div className="rounded-2xl bg-[#fdf6ed] px-4 py-10 sm:px-8">
          {isLoading ? (
            <div className="flex gap-6">
              {[...Array(8)].map((_item, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <Skeleton className="h-28 w-28 rounded-2xl sm:h-36 sm:w-36" />
                  <Skeleton className="h-4 w-16 rounded-none" />
                </div>
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-lg text-muted-foreground">
                No categories found.
              </p>
            </div>
          ) : (
            <div className="relative">
              {canScrollLeft && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -left-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-orange-200 bg-white text-orange-500 shadow-md hover:bg-orange-50 hover:text-orange-600 sm:-left-5"
                  onClick={() => scroll("left")}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}

              <div
                ref={scrollRef}
                className="no-scrollbar flex items-start justify-start gap-6 overflow-x-auto scroll-smooth"
              >
                {categories.map((category) => (
                  <div key={category.id} className="flex-none">
                    <CategoryCard category={category} />
                  </div>
                ))}
              </div>

              {canScrollRight && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -right-4 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-orange-200 bg-white text-orange-500 shadow-md hover:bg-orange-50 hover:text-orange-600 sm:-right-5"
                  onClick={() => scroll("right")}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
