import { Star, ShieldCheck, Truck, RefreshCcw, Heart, Share2, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
export function ProductDetails() {
    return (
        <div className="gap-16 grid grid-cols-1 @lg/main:grid-cols-2">
            {/* Left: Image Gallery */}
            <div className="flex flex-col gap-4">
                <div className="group relative bg-secondary/10 shadow-sm ring-border/50 rounded-sm ring-1 aspect-square overflow-hidden">
                    <img
                        alt="The Fajr Journal - Close up"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjnt5ite2ri2wf_L78rMNAbdDEkIBpQZB_ROG3MQIHCL78EqLAK6Uo_cBanzqGt2Qr4suTIYPer-bhtfXRzqxHuCAz8rcBgM1CnlAD9pwz1pUuzpRTs504FJrSUyJwqRfpplyXvqmDLM-Oz7jUQlwKT2PKVE77I_WHYpBI5htIF3A0QrXIoBkh1eqwAQFcC8M7HckuUUKRBbYkSKn8EE7q_PxsJ2nIwKNH3LZseE0HY946XCZ3XRWFgb5kwKWRH62f8dTpP4TjR1iO"
                    />
                    <button className="top-4 right-4 absolute bg-background/80 hover:bg-background p-2 rounded-full text-muted-foreground hover:text-primary transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
                <div className="gap-4 grid grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="bg-secondary/10 ring-border rounded-sm ring-1 hover:ring-primary aspect-square overflow-hidden transition-all cursor-pointer"
                        >
                            <img
                                alt={`The Fajr Journal - Detail ${i}`}
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjnt5ite2ri2wf_L78rMNAbdDEkIBpQZB_ROG3MQIHCL78EqLAK6Uo_cBanzqGt2Qr4suTIYPer-bhtfXRzqxHuCAz8rcBgM1CnlAD9pwz1pUuzpRTs504FJrSUyJwqRfpplyXvqmDLM-Oz7jUQlwKT2PKVE77I_WHYpBI5htIF3A0QrXIoBkh1eqwAQFcC8M7HckuUUKRBbYkSKn8EE7q_PxsJ2nIwKNH3LZseE0HY946XCZ3XRWFgb5kwKWRH62f8dTpP4TjR1iO"
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Right: Info & Actions */}
            <div className="flex flex-col gap-8">
                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <h1 className="font-display font-bold text-foreground text-4xl">
                            The Fajr Journal
                        </h1>
                        <div className="flex items-center gap-1 text-primary">
                            <Star className="fill-primary w-4 h-4" />
                            <span className="font-bold text-sm">4.9</span>
                        </div>
                    </div>
                    <p className="font-sans font-bold text-primary text-2xl">$35.00</p>
                    <p className="text-muted-foreground leading-relaxed">
                        Designed for the productive believer, the Fajr Journal combines
                        tradition with purposeful action. Hand-stitched in Morocco using
                        premium, ethically sourced leather.
                    </p>
                </div>
                <div className="space-y-6 pt-6 border-border border-t">
                    {/* Options: Color/Texture */}
                    <div className="space-y-3">
                        <p className="font-bold text-muted-foreground text-xs uppercase tracking-widest">
                            Select Finish
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-secondary/20 px-4 py-2 border-2 border-primary rounded-sm font-medium text-foreground text-sm">
                                Saddle Brown
                            </button>
                            <button className="bg-background px-4 py-2 border-2 border-transparent hover:border-border rounded-sm font-medium text-muted-foreground text-sm transition-colors">
                                Midnight Black
                            </button>
                        </div>
                    </div>
                    {/* Quantity & Add to Cart */}
                    <div className="flex gap-4">
                        <div className="flex items-center gap-4 bg-secondary/10 p-1 border border-border rounded-sm">
                            <button className="hover:bg-background p-2 rounded-sm transition-colors">
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-4 font-bold text-center">1</span>
                            <button className="hover:bg-background p-2 rounded-sm transition-colors">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <button className="flex-1 bg-primary hover:bg-accent shadow-lg shadow-primary/20 rounded-sm font-bold text-primary-foreground tracking-wide transition-colors">
                            Add to Cart
                        </button>
                        <button className="hover:bg-secondary/20 p-4 border border-border rounded-sm transition-colors">
                            <Heart className="w-6 h-6" />
                        </button>
                    </div>
                    {/* Benefits/Info */}
                    <div className="gap-6 grid grid-cols-1 sm:grid-cols-3 pt-8 border-border border-t">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <Truck className="w-6 h-6 text-muted-foreground" />
                            <div className="flex flex-col">
                                <span className="font-bold text-[10px] text-foreground uppercase tracking-widest">
                                    Free Shipping
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                    Orders over $100
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 px-4 border-border border-x text-center">
                            <ShieldCheck className="w-6 h-6 text-muted-foreground" />
                            <div className="flex flex-col">
                                <span className="font-bold text-[10px] text-foreground uppercase tracking-widest">
                                    Authentic Goods
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                    Direct from artisans
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <RefreshCcw className="w-6 h-6 text-muted-foreground" />
                            <div className="flex flex-col">
                                <span className="font-bold text-[10px] text-foreground uppercase tracking-widest">
                                    30-Day returns
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                    No questions asked
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
