"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/types/api";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const hasDiscount = product.discountPercentage > 0;
  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-sm border border-border bg-card ${className ?? ""}`}
    >
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
