import { Badge } from "@/components/atoms/badge";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price: string;
  discountPercentage?: number;
  finalPrice?: number;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

export function PriceDisplay({
  price,
  discountPercentage,
  finalPrice,
  size = "md",
}: PriceDisplayProps) {
  const hasDiscount =
    discountPercentage && discountPercentage > 0 && finalPrice;

  return (
    <div
      className={cn("flex items-center gap-2 font-medium", sizeClasses[size])}
    >
      <span className="text-foreground">
        ৳
        {hasDiscount
          ? finalPrice?.toLocaleString()
          : Number(price).toLocaleString()}
      </span>
      {hasDiscount && (
        <>
          <span className="text-muted-foreground line-through">
            ৳{Number(price).toLocaleString()}
          </span>
          <Badge variant="destructive" className="text-[10px] px-1.5">
            -{discountPercentage}%
          </Badge>
        </>
      )}
    </div>
  );
}
