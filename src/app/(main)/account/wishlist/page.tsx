"use client";

import Link from "next/link";
import {
  useWishlist,
  useRemoveFromWishlist,
  useMoveToCart,
} from "@/hooks/use-wishlist";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { EmptyState } from "@/components/atoms/empty-state";
import { PriceDisplay } from "@/components/atoms/price-display";
import { Skeleton } from "@/components/atoms/skeleton";
import { Heart, ShoppingCart, X } from "lucide-react";

export default function WishlistPage() {
  const { data: items, isLoading, error: wishlistError, refetch: refetchWishlist } = useWishlist();
  const removeFromWishlist = useRemoveFromWishlist();
  const moveToCart = useMoveToCart();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48 rounded-none" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-none" />
          ))}
        </div>
      </div>
    );
  }

  if (wishlistError) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-8 flex items-center gap-4">
            <div className="h-px w-16 bg-destructive/40" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-destructive">
              Error
            </span>
            <div className="h-px w-16 bg-destructive/40" />
          </div>
          <h1 className="mb-4 text-3xl font-bold font-heading text-foreground">
            Unable to Load Wishlist
          </h1>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            We encountered an issue while loading your wishlist. Please try
            again or continue shopping.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button onClick={() => refetchWishlist()} size="lg" className="gap-2">
              Try Again
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/products">Discover Products</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Wishlist is empty"
        description="Save items you love to your wishlist and come back anytime."
        action={{ label: "Discover Products", href: "/products" }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        My Wishlist ({items.length})
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="group rounded-none">
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
              <Link href={`/products/${item.product.slug}`}>
                <img
                  src={
                    item.product.images[0]?.url ||
                    "https://via.placeholder.com/300x400"
                  }
                  alt={item.product.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon-xs"
                className="absolute top-2 right-2 bg-background/80 text-muted-foreground hover:text-destructive"
                onClick={() => removeFromWishlist.mutate(item.id)}
                disabled={removeFromWishlist.isPending}
              >
                <X className="size-3" />
              </Button>
            </div>
            <CardContent className="space-y-3 pt-4">
              <div>
                <Link
                  href={`/products/${item.product.slug}`}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.product.name}
                </Link>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {item.product.category.name}
                </p>
              </div>
              <PriceDisplay
                price={item.product.price}
                discountPercentage={item.product.discountPercentage}
                finalPrice={item.product.finalPrice}
                size="sm"
              />
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-none"
                onClick={() => moveToCart.mutate(item.id)}
                disabled={moveToCart.isPending}
              >
                <ShoppingCart className="mr-1.5 size-3" />
                Move to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
