import { PRODUCTS } from "@/features/products/lib/utils";
import { ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";



export function HeritageCarousel() {
  return (
    <section>
      <div className="flex justify-between items-center mb-10">
        <h3 className="font-display font-bold text-3xl">
          Heritage Essentials
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex justify-center items-center hover:bg-surface border border-border hover:border-primary rounded-full w-10 h-10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            className="flex justify-center items-center hover:bg-surface border border-border hover:border-primary rounded-full w-10 h-10 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-6 -mx-6 px-6 pb-8 overflow-x-auto scroll-smooth no-scrollbar">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="group w-[280px] min-w-[280px] cursor-pointer"
          >
            <div className="relative bg-surface mb-4 rounded-sm aspect-4/5 overflow-hidden">
              {product.badge && (
                <div className="top-3 left-3 z-20 absolute">
                  <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-sm font-bold text-[10px] uppercase tracking-wide">
                    {product.badge}
                  </span>
                </div>
              )}
              <Image
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={product.image}
                fill
                sizes="280px"
              />
              <button
                type="button"
                className="right-4 bottom-4 z-20 absolute bg-primary hover:bg-accent opacity-0 group-hover:opacity-100 shadow-lg p-3 rounded-full text-white transition-all translate-y-12 group-hover:translate-y-0 duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold group-hover:text-primary text-lg transition-colors">
                {product.name}
              </h4>
              <p className="text-muted-foreground text-sm">{product.description}</p>
              <p className="mt-2 font-bold text-primary">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
