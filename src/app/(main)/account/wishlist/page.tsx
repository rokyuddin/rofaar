"use client";

import { Heart, LogIn, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { EmptyState } from "@/components/atoms/empty-state";
import { PriceDisplay } from "@/components/atoms/price-display";
import { Skeleton } from "@/components/atoms/skeleton";
import {
  useMoveToCart,
  useRemoveFromWishlist,
  useWishlist,
} from "@/hooks/use-wishlist";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";

interface WishlistPageItem {
  id: string;
  productId: string;
  product: {
    id: string;
    name: string;
    slug: string;
    images: { url: string }[];
    category: { name: string };
    price: string;
    finalPrice: number | null;
    discountPercentage: number;
  };
}

export default function WishlistPage() {
  const { data: session } = useSession();

  // API wishlist (logged in)
  const isLoggedIn = !!session;
  const {
    data: apiWishlistItems,
    isLoading: apiLoading,
    error: wishlistError,
    refetch: refetchWishlist,
  } = useWishlist({ enabled: isLoggedIn });
  const removeFromApiWishlist = useRemoveFromWishlist();
  const moveToApiCart = useMoveToCart();

  // Zustand wishlist (guest)
  const guestItems = useWishlistStore((s) => s.items);
  const guestRemoveItem = useWishlistStore((s) => s.removeItem);
  const guestAddToCart = useCartStore((s) => s.addItem);

  const isLoading = isLoggedIn ? apiLoading : false;
  const wishlistErrorState = isLoggedIn ? wishlistError : null;

  // Unified wishlist items
  const items: WishlistPageItem[] = isLoggedIn
    ? (apiWishlistItems ?? []).map((item) => ({
        id: item.id,
        productId: item.productId,
        product: {
          id: item.product.id,
          name: item.product.name,
          slug: item.product.slug,
          images: item.product.images,
          category: item.product.category,
          price: item.product.price,
          finalPrice: item.product.finalPrice,
          discountPercentage: item.product.discountPercentage,
        },
      }))
    : guestItems.map((item) => ({
        id: item.productId,
        productId: item.productId,
        product: {
          id: item.product.id,
          name: item.product.name,
          slug: item.product.slug,
          images: item.product.images,
          category: item.product.category,
          price: item.product.price,
          finalPrice: item.product.finalPrice,
          discountPercentage: item.product.discountPercentage,
        },
      }));

  const handleRemove = (productId: string) => {
    if (isLoggedIn) {
      const apiItem = apiWishlistItems?.find((i) => i.productId === productId);
      if (apiItem) {
        removeFromApiWishlist.mutate(apiItem.id);
      }
    } else {
      guestRemoveItem(productId);
    }
  };

  const handleMoveToCart = (item: WishlistPageItem) => {
    if (isLoggedIn) {
      const apiItem = apiWishlistItems?.find(
        (i) => i.productId === item.productId,
      );
      if (apiItem) {
        moveToApiCart.mutate(apiItem.id);
      }
    } else {
      // Guest: remove from wishlist store, add to cart store
      guestRemoveItem(item.productId);
      guestAddToCart(item.product, 1);
    }
  };

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

  if (wishlistErrorState) {
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
            <Button
              onClick={() => refetchWishlist()}
              size="lg"
              className="gap-2"
            >
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
      {/* Guest login banner */}
      {!isLoggedIn && (
        <div className="flex items-center justify-between rounded-none border border-border bg-muted/50 p-4">
          <div className="flex items-center gap-3">
            <LogIn className="size-5 text-muted-foreground" />
            <p className="text-sm">
              <span className="font-medium">Sign in</span> to save your wishlist
              permanently.
            </p>
          </div>
          <Button asChild variant="outline" size="sm" className="rounded-none">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      )}

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
                onClick={() => handleRemove(item.productId)}
                disabled={isLoggedIn ? removeFromApiWishlist.isPending : false}
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
                onClick={() => handleMoveToCart(item)}
                disabled={isLoggedIn ? moveToApiCart.isPending : false}
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
