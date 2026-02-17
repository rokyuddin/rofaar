import { FilterSidebar } from "@/features/products/components/filter-sidebar";
import { Filter } from "lucide-react";
import { PRODUCTS } from "@/features/products/lib/utils";
import { ProductCard } from "@/features/products/components/product-card";

export default function Shop() {
    return (
        <main className="flex lg:flex-row flex-col min-h-svh layout-container">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden top-[73px] z-30 sticky flex justify-between items-center bg-secondary px-4 py-4 border-border border-b">
                <span className="font-display font-medium text-lg">Filters</span>
                <button className="flex items-center gap-2 font-bold text-primary text-sm uppercase tracking-wider">
                    <Filter className="w-4 h-4" />
                </button>
            </div>

            <FilterSidebar />

            {/* Product Grid Area */}
            <div className="flex flex-col flex-1 min-w-0">
                <div className="mx-auto px-6 lg:px-12 pt-12 pb-8 w-full max-w-4xl text-center">
                    <h1 className="mb-3 font-display font-medium text-foreground text-4xl lg:text-5xl">The Bazaar</h1>
                    <div className="bg-primary mx-auto mb-4 w-16 h-px"></div>
                    <p className="font-sans text-muted-foreground text-sm tracking-wide">Showing 32 curated artifacts from around the Ummah</p>
                </div>

                <div className="flex justify-end mb-6 px-6 lg:px-12">
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-sm">Sort by:</span>
                        <select className="bg-transparent py-0 pr-8 border-none focus:ring-0 font-medium text-foreground text-sm cursor-pointer">
                            <option>Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Newest</option>
                        </select>
                    </div>
                </div>
                <div className="@container px-6 lg:px-12 pb-20">
                    <div
                        className={`grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-6`}
                    >
                        {PRODUCTS.map((product) => (
                            <ProductCard
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                category={product.category}
                                image={product.image}
                                badge={product.badge}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
