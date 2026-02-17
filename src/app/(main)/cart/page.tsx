import { CartView } from "@/features/cart/components/cart-view";

export default function CartPage() {
    return (
        <main className="@container/main flex flex-col gap-24 mx-auto px-6 py-12 @lg/main:py-20 max-w-[1440px] layout-container">
            <CartView />
        </main>
    );
}
