import React from "react";
import Link from "next/link";

export const ShippingCTA: React.FC = () => {
    return (
        <>
            {/* Featured Image / Texture */}
            <section className="relative mt-24 rounded-xl h-[400px] overflow-hidden">
                <img
                    alt="Artisan hands working on fabric"
                    className="opacity-40 dark:opacity-20 grayscale w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvnOmViOJBAEfvOz9_vAnoS9F1xD4Ka8N2FiJenpxuT05EHbsLA472Kcpcx4NkHpAybBEhkb59Ncz1DkhukC68hG_OgoWJEZxYUEXt76jgZX1CLLwAxucA_m5_2e0fbfgA2AiEQq2NNb8PNKPfvOmCemUMcmV6pcVP0WIUx--6JYfqG8UbBnXqH8pbFn3OkWhz-5wq6zMk5wT20i3wIpzUib5-qa2LIqtmmIMM-lbmMclX5_z2er_TChaNeC7VRE6HwD53lDe2Adja"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-center px-12 max-w-2xl">
                    <h3 className="mb-4 font-display font-bold text-foreground text-3xl italic">The artisan's touch in every box.</h3>
                    <p className="font-display text-muted-foreground">Our packaging uses recycled paper and organic cotton ties, reflecting our commitment to the Earth and traditional values.</p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-secondary/10 mt-24 py-16 border border-border rounded-xl text-center">
                <h2 className="mb-4 font-display font-bold text-foreground text-3xl">Need personalized assistance?</h2>
                <p className="mx-auto mb-8 max-w-xl font-display text-muted-foreground">Our Concierge team is available to assist with bespoke shipping requests or tracking inquiries.</p>
                <Link href="/concierge" className="inline-block bg-primary hover:bg-opacity-90 shadow-primary/20 shadow-xl px-10 py-4 rounded-sm font-sans font-bold text-primary-foreground text-sm uppercase tracking-widest transition-all">
                    Contact Concierge
                </Link>
            </section>
        </>
    );
};
