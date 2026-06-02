import { Button } from "@/components/atoms/button";
import Link from "next/link";

export function AdSection() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Ad 1 */}
          <div className="group relative overflow-hidden rounded-none bg-muted h-64">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
              <h3 className="mb-2 text-2xl font-bold">Ramadan Essentials</h3>
              <p className="mb-4 max-w-[200px] text-sm text-gray-200">
                Get ready for the blessed month with our curated collection.
              </p>
              <Link href="/products?category=ramadan">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-fit border-white text-white hover:bg-white hover:text-black"
                >
                  Explore Collection
                </Button>
              </Link>
            </div>
          </div>

          {/* Ad 2 */}
          <div className="group relative overflow-hidden rounded-none bg-muted h-64">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80')] bg-cover bg-center transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
              <h3 className="mb-2 text-2xl font-bold">New Arrivals</h3>
              <p className="mb-4 max-w-[200px] text-sm text-gray-200">
                Handcrafted tools designed for your daily journey.
              </p>
              <Link href="/products?sort=newest">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-fit border-white text-white hover:bg-white hover:text-black"
                >
                  Shop New
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
