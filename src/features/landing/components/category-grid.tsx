import Link from "next/link";
import type { Category } from "@/types/api";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-3xl font-bold font-heading">Shop by Category</h2>
          <Link
            href="/categories"
            className="text-sm font-medium underline-offset-4 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative aspect-square overflow-hidden bg-muted"
            >
              <img
                src={category.imageUrl || "https://via.placeholder.com/300"}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <span className="text-sm font-bold uppercase tracking-widest text-white md:text-base">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
