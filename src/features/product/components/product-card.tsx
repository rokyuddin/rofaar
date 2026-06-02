import Link from "next/link";
import { Card, CardContent } from "@/components/atoms/card";
import type { Product } from "@/types/api";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
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
      </Link>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {product.category.name}
          </span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            {product.brand.name}
          </span>
        </div>
        <Link
          href={`/products/${product.slug}`}
          className="text-sm font-medium leading-tight transition-colors hover:text-primary block"
        >
          {product.name}
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-bold">
            &#৳;{product.finalPrice.toLocaleString()}
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
