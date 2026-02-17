import { ArrowLeft, Printer, Download, MapPin, Package, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function OrderDetail() {
    return (
        <div className="flex-1 space-y-12">
            <div className="flex md:flex-row flex-col justify-between items-start md:items-end gap-6 pb-8 border-border border-b">
                <div className="space-y-2">
                    <Link href="/profile/orders" className="flex items-center gap-2 mb-2 font-bold text-primary hover:text-accent text-xs uppercase tracking-widest transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Ledger
                    </Link>
                    <h1 className="font-display font-bold text-foreground text-4xl">The Receipt <span className="ml-2 font-sans font-normal text-muted-foreground text-2xl">#OU-1082</span></h1>
                    <p className="text-muted-foreground text-sm">Issued on February 12, 2023 • Delivered to Casablanca</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 hover:bg-secondary/20 px-4 py-3 border border-border rounded-sm font-bold text-xs uppercase tracking-widest transition-all">
                        <Printer className="w-4 h-4" /> Print
                    </button>
                    <button className="flex items-center gap-2 bg-foreground hover:bg-primary shadow-lg px-4 py-3 rounded-sm font-bold text-primary-foreground text-xs uppercase tracking-widest transition-all">
                        <Download className="w-4 h-4" /> Export PDF
                    </button>
                </div>
            </div>

            <div className="gap-12 grid grid-cols-1 lg:grid-cols-2">
                {/* Left: Items & Total */}
                <div className="space-y-10">
                    <div className="space-y-6">
                        <h2 className="flex items-center gap-3 font-display font-bold text-foreground text-xl">
                            <Package className="w-5 h-5 text-primary" /> Acquired Treasures
                        </h2>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex gap-4 bg-secondary/5 p-4 border border-border/30 rounded-sm">
                                    <div className="bg-secondary/10 rounded-sm size-16 overflow-hidden shrink-0">
                                        <img alt="Product" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjnt5ite2ri2wf_L78rMNAbdDEkIBpQZB_ROG3MQIHCL78EqLAK6Uo_cBanzqGt2Qr4suTIYPer-bhtfXRzqxHuCAz8rcBgM1CnlAD9pwz1pUuzpRTs504FJrSUyJwqRfpplyXvqmDLM-Oz7jUQlwKT2PKVE77I_WHYpBI5htIF3A0QrXIoBkh1eqwAQFcC8M7HckuUUKRBbYkSKn8EE7q_PxsJ2nIwKNH3LZseE0HY946XCZ3XRWFgb5kwKWRH62f8dTpP4TjR1iO" />
                                    </div>
                                    <div className="flex flex-1 justify-between">
                                        <div>
                                            <span className="block font-bold text-foreground text-sm">The Fajr Journal</span>
                                            <span className="block bg-background mt-1 px-1.5 py-0.5 border border-border rounded-sm w-fit text-[10px] text-muted-foreground uppercase tracking-wider">Saddle Brown</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block font-bold text-foreground text-sm">$35.00</span>
                                            <span className="block mt-1 text-[10px] text-muted-foreground uppercase tracking-wider">Qty: 1</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 bg-secondary/10 p-8 ring-border/30 rounded-sm ring-1">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span className="font-bold text-foreground">$70.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Shipping</span>
                            <span className="font-bold text-primary italic">Complimentary</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Tax</span>
                            <span className="font-bold text-foreground">$2.40</span>
                        </div>
                        <div className="flex justify-between items-end pt-4 border-border border-t">
                            <span className="font-display font-bold text-foreground text-lg uppercase tracking-widest">Total Value</span>
                            <span className="font-sans font-bold text-primary text-2xl">$72.40</span>
                        </div>
                    </div>
                </div>

                {/* Right: Logistics & Payment */}
                <div className="space-y-8">
                    <div className="space-y-6 bg-background p-8 border border-border rounded-sm">
                        <h3 className="flex items-center gap-3 font-display font-bold text-foreground text-lg">
                            <MapPin className="w-5 h-5 text-primary" /> Logistics
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <span className="block mb-1 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Shipping Sanctuary</span>
                                <p className="text-foreground text-sm leading-relaxed">
                                    Ahmad Al-Mansour<br />
                                    123 Cedar Lane, Sukoon District<br />
                                    Casablanca 20000, Morocco
                                </p>
                            </div>
                            <div>
                                <span className="block mb-1 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Estimated Journey</span>
                                <p className="text-foreground text-sm">3-5 Lunar Days (Customs clearance pending)</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 bg-background p-8 border border-border rounded-sm">
                        <h3 className="flex items-center gap-3 font-display font-bold text-foreground text-lg">
                            <CreditCard className="w-5 h-5 text-primary" /> The Exchange
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex justify-center items-center bg-secondary/10 rounded size-10">
                                    <span className="text-primary material-symbols-outlined">credit_card</span>
                                </div>
                                <div>
                                    <span className="block font-bold text-foreground text-sm leading-none">Visa •••• 4242</span>
                                    <span className="block mt-1 text-[10px] text-muted-foreground uppercase tracking-wider">Processed Securely</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-green-50 p-4 border border-green-100 rounded-sm">
                                <ShieldCheck className="w-5 h-5 text-green-600" />
                                <span className="font-bold text-[10px] text-green-700 uppercase tracking-widest">Transaction Fully Settled</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
