import { Trash2, Plus, Minus, ShieldCheck } from "lucide-react";
import Link from "next/link";
const cartItems = [
    {
        id: 1,
        name: "The Fajr Journal",
        variant: "Saddle Brown finish",
        price: 35.0,
        quantity: 1,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjnt5ite2ri2wf_L78rMNAbdDEkIBpQZB_ROG3MQIHCL78EqLAK6Uo_cBanzqGt2Qr4suTIYPer-bhtfXRzqxHuCAz8rcBgM1CnlAD9pwz1pUuzpRTs504FJrSUyJwqRfpplyXvqmDLM-Oz7jUQlwKT2PKVE77I_WHYpBI5htIF3A0QrXIoBkh1eqwAQFcC8M7HckuUUKRBbYkSKn8EE7q_PxsJ2nIwKNH3LZseE0HY946XCZ3XRWFgb5kwKWRH62f8dTpP4TjR1iO",
    },
    {
        id: 2,
        name: "Olive Wood Misbaha",
        variant: "33 beads",
        price: 28.0,
        quantity: 2,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBU0u0_sp8pKeeY4avkpLNTT3SDW59_SWz0UYFQbsVl0WkQFVPtNwKk8QhXtDBhrKh8dqT2j-NMQ0J3tvtDdWLtY3H-vYHNVspx0cPlPladOjxgJE26v0-gj5ln_I0yQjYrIS_xdSaZVEvdU4jUFxenHs7hkXjMpjUPMvgQgnUDv5YbYaqSpcf81s7JNXsVmOZmts1OTkvz-zxkr0cqdQwyz0dOOJFShRG4drciEhHWXA0Sd0yYZMx_gPrqxTutbBwSYetV-fZHwXab",
    },
];
export function CartView() {
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    return (
        <div className="gap-12 grid grid-cols-1 @lg/main:grid-cols-3">
            {/* Left: Cart Items */}
            <div className="space-y-8 @lg/main:col-span-2">
                <div className="flex justify-between items-end pb-6 border-border border-b">
                    <h1 className="font-display font-bold text-3xl">
                        The Exchange{" "}
                        <span className="ml-2 font-normal text-muted-foreground text-lg">
                            (2 items)
                        </span>
                    </h1>
                    <button className="font-bold text-primary hover:text-accent text-sm uppercase tracking-widest transition-colors">
                        Clear All
                    </button>
                </div>
                <div className="space-y-6">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-6 pb-6 border-border/50 border-b"
                        >
                            <div className="bg-surface rounded-sm w-24 h-32 overflow-hidden shrink-0">
                                <img
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    src={item.image}
                                />
                            </div>
                            <div className="flex flex-col flex-1 justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-display font-bold hover:text-primary text-lg transition-colors cursor-pointer">
                                            {item.name}
                                        </h3>
                                        <p className="mt-1 text-muted-foreground text-xs uppercase tracking-wider">
                                            {item.variant}
                                        </p>
                                    </div>
                                    <p className="font-sans font-bold">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4 bg-surface p-1 border border-border rounded-sm">
                                        <button className="hover:bg-white p-1 rounded-sm transition-colors">
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="w-4 font-bold text-xs text-center">
                                            {item.quantity}
                                        </span>
                                        <button className="hover:bg-white p-1 rounded-sm transition-colors">
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <button className="text-muted-foreground hover:text-accent transition-colors">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Link
                    href="/shop"
                    className="inline-flex justify-center items-center gap-2 py-4 text-muted-foreground hover:text-primary transition-colors"
                >
                    <span className="text-lg material-symbols-outlined">arrow_back</span>
                    <span className="font-bold text-sm uppercase tracking-widest">
                        Return to Bazaar
                    </span>
                </Link>
            </div>
            {/* Right: Order Summary */}
            <div className="@lg/main:col-span-1">
                <div className="top-32 sticky space-y-8 bg-surface p-8 ring-border-subtle/50 rounded-sm ring-1">
                    <h2 className="font-display font-bold text-xl">Order Summary</h2>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between text-muted-foreground">
                            <span>Subtotal</span>
                            <span className="font-sans font-bold">
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                            <span>Shipping</span>
                            <span className="font-bold text-primary">Standard - Free</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                            <span>Estimated Tax</span>
                            <span className="font-sans font-bold">$2.40</span>
                        </div>
                        <div className="flex justify-between items-end pt-4 border-border border-t">
                            <span className="font-display font-bold text-lg">Total</span>
                            <span className="font-sans font-bold text-primary text-2xl">
                                ${(subtotal + 2.4).toFixed(2)}
                            </span>
                        </div>
                        <button className="bg-primary hover:bg-accent shadow-lg shadow-primary/20 py-4 rounded-sm w-full font-bold text-white uppercase tracking-widest transition-all">
                            Proceed to Checkout
                        </button>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                <span className="font-bold text-[10px] uppercase tracking-widest">
                                    Secure Checkout
                                </span>
                            </div>
                            <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-wider">
                                All transactions are encrypted and processed through our secure
                                gateway.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}