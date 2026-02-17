import React from "react";

export const ShippingJourney: React.FC = () => {
    return (
        <section className="mb-24">
            <div className="relative pt-12">
                {/* Background Line */}
                <div className="hidden md:block top-1/2 left-0 absolute bg-primary/20 w-full h-px -translate-y-1/2"></div>
                <div className="relative gap-12 grid grid-cols-1 md:grid-cols-3">
                    {/* Step 1 */}
                    <div className="group flex flex-col items-center text-center">
                        <div className="z-10 relative flex justify-center items-center bg-background mb-6 border border-primary/30 group-hover:border-primary rounded-full w-16 h-16 transition-colors">
                            <span className="text-primary text-3xl material-icons">confirmation_number</span>
                        </div>
                        <h3 className="mb-2 font-display font-bold text-foreground text-xl">Order Received</h3>
                        <p className="max-w-[240px] font-display text-muted-foreground text-sm">Once your request is placed, our artisans are notified immediately to begin preparation.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="group flex flex-col items-center text-center">
                        <div className="z-10 relative flex justify-center items-center bg-primary shadow-lg shadow-primary/20 mb-6 rounded-full w-16 h-16 text-primary-foreground">
                            <span className="text-3xl material-icons">brush</span>
                        </div>
                        <h3 className="mb-2 font-display font-bold text-foreground text-xl">Handcrafted with Care</h3>
                        <p className="max-w-[240px] font-display text-muted-foreground text-sm">We meticulously inspect and wrap each piece using sustainable, premium materials.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="group flex flex-col items-center text-center">
                        <div className="z-10 relative flex justify-center items-center bg-background mb-6 border border-primary/30 group-hover:border-primary rounded-full w-16 h-16 transition-colors">
                            <span className="text-primary text-3xl material-icons">public</span>
                        </div>
                        <h3 className="mb-2 font-display font-bold text-foreground text-xl">Global Delivery</h3>
                        <p className="max-w-[240px] font-display text-muted-foreground text-sm">Your package travels through our trusted courier network to reach your doorstep.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
