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
import { Card, CardContent } from "@/components/atoms/card";
import { Skeleton } from "@/components/atoms/skeleton";
import { useCategories } from "@/hooks/use-categories";

export default function CategoriesPage() {
  const { data: categoriesData, isLoading } = useCategories({ limit: 50 });

  const categories = categoriesData?.data || [];

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

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_item, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <Skeleton className="h-5 w-2/3 rounded-none" />
                <Skeleton className="h-3 w-full rounded-none" />
                <Skeleton className="h-3 w-1/3 rounded-none" />
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-lg text-muted-foreground">
              No categories found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
              >
                <Card className="group rounded-none p-0 gap-0 h-full">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={
                        category.imageUrl ||
                        "https://via.placeholder.com/400x300"
                      }
                      alt={category.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 flex flex-col flex-1">
                    <h2 className="text-base font-bold font-heading">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                    )}
                    <div className="mt-auto pt-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                        View Collection
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
