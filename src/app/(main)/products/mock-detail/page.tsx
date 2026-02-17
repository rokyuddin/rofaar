import { ProductDetails } from "@/features/products/components/details/product-details";
import { HeritageCarousel } from "@/features/landing/components/heritage-carousel";

export default function ProductDetailPage() {
    return (
        <main className="@container/main flex flex-col gap-24 @lg/main:gap-32 mx-auto px-6 py-12 @lg/main:py-20 layout-container">
            <ProductDetails />

            {/* Upsell / Related */}
            <div className="space-y-12">
                <div className="flex items-center gap-8">
                    <h2 className="font-display font-bold text-4xl grow shrink-0">You May Also Seek</h2>
                    <div className="hidden @md/main:block bg-border-subtle h-px grow" />
                </div>
                <HeritageCarousel />
            </div>
        </main>
    );
}
