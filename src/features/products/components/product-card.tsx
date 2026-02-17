import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  name: string;
  price: string;
  category: string;
  image: string;
  badge?: string;
  className?: string;
}

export function ProductCard({
  name,
  price,
  category,
  image,
  badge,
  className,
}: ProductCardProps) {
  return (
    <div className={cn("group flex flex-col gap-4 cursor-pointer", className)}>
      <div className="relative bg-gray-100 shadow-sm rounded ring-1 ring-black/5 aspect-4/5 overflow-hidden">
        <Image
          alt={name}
          className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-500"
          src={image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges */}
        {badge && (
          <div className="top-3 left-3 absolute flex flex-col gap-1">
            <span className="bg-white/90 group-hover:bg-primary shadow-sm backdrop-blur-sm px-2 py-1 rounded-sm font-bold text-[10px] group-hover:text-white uppercase tracking-wider transition-colors">
              {badge}
            </span>
          </div>
        )}

        <div className="top-3 right-3 absolute">
          <button
            type="button"
            className="flex justify-center items-center bg-white/80 hover:bg-white rounded-full size-8 text-muted-foreground hover:text-primary transition-colors"
          >
            <Heart className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Quick Add Overlay */}
        <div className="bottom-0 z-10 absolute inset-x-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 p-4 pb-6 transition-all translate-y-full group-hover:translate-y-0 duration-300 ease-out">
          <button
            type="button"
            className="flex justify-center items-center gap-2 bg-white hover:bg-surface shadow-lg py-3 rounded w-full font-bold text-sm transition-colors"
          >
            <ShoppingCart className="w-[18px] h-[18px]" />
            Quick Add
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="font-display font-medium group-hover:text-primary text-lg transition-colors">
            {name}
          </h3>
          <span className="font-sans font-medium">{price}</span>
        </div>
        <p className="text-muted-foreground text-sm">{category}</p>
      </div>
    </div>
  );
}
