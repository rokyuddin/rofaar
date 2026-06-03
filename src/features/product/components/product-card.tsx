"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from "@/hooks/use-wishlist";
import { useWishlistStore } from "@/stores/wishlist-store";
import type { Product } from "@/types/api";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  // API wishlist (logged in)
  const { data: apiWishlistItems } = useWishlist({ enabled: isLoggedIn });
  const addToApiWishlist = useAddToWishlist();
  const removeFromApiWishlist = useRemoveFromWishlist();

  // Zustand wishlist (guest)
  const guestHasItem = useWishlistStore((s) =>
    s.items.some((item) => item.productId === product.id),
  );
  const guestToggleItem = useWishlistStore((s) => s.toggleItem);

  const isInWishlist = isLoggedIn
    ? (apiWishlistItems ?? []).some((item) => item.productId === product.id)
    : guestHasItem;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoggedIn) {
      if (isInWishlist) {
        const apiItem = apiWishlistItems?.find(
          (i) => i.productId === product.id,
        );
        if (apiItem) {
          removeFromApiWishlist.mutate(apiItem.id);
        }
      } else {
        addToApiWishlist.mutate(product.id);
      }
    } else {
      guestToggleItem(product);
    }
  };

  return (
    <Card className={`group rounded-none p-0 ring-0 gap-0 ${className ?? ""}`}>
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/5] overflow-hidden bg-muted block"
      >
        <img
          src={product.images[0]?.url || "https://via.placeholder.com/400x500"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.discountPercentage > 0 && (
          <div className="absolute left-0 top-0 bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
            -{product.discountPercentage}%
          </div>
        )}
        <Button
          variant="ghost"
          size="icon-xs"
          className="absolute right-2 top-2 bg-background/80 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleWishlistToggle}
          disabled={
            isLoggedIn
              ? addToApiWishlist.isPending || removeFromApiWishlist.isPending
              : false
          }
        >
          <Heart
            className={`size-4 ${
              isInWishlist
                ? "fill-destructive text-destructive"
                : "text-muted-foreground"
            }`}
          />
        </Button>
      </Link>
      <CardContent className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {product.category.name}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {product.brand.name}
          </span>
        </div>
        <Link
          href={`/products/${product.slug}`}
          className="block text-sm font-medium leading-tight transition-colors hover:text-primary"
        >
          {product.name}
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-bold">
            &#৳;{(product.finalPrice ?? Number(product.price)).toLocaleString()}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              &#৳;{Number(product.price).toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
