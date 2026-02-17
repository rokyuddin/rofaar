

import { ValueCard } from "@/features/about/components/value-card";
import { FounderCard } from "@/features/about/components/founder-card";
import { ShieldCheck, Hammer, Users } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="@container/main">
            {/* Hero Section */}
            <section className="relative flex items-center pt-12 min-h-[85vh]">
                <div className="z-0 absolute inset-0">
                    <img
                        alt="Craftsman at work"
                        className="brightness-75 grayscale-20 w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVMQbR7HGLc9W6vtJVnvEFjl3hcWw_Y8UgTNMXU4J38RJk49R_27zwFSYNuNxnSyUYE8ALirEMXq3wltMooRcspojrQJ0qkOxQq9x1CJ511HAnE5cbV5-4ikqdKjZbr8Bi__ThwuKPcwa0ulJqXnsvkgbuv6qbd63nEcweYhoUhqPhjJZPEYHtmhguXLGS9GDrvk7nQppNIEA4SHOKXZoI0JogWfAyqXZ_o_xVxm_xxGdWPlIpUXyCnle6rBE-tUozJmKu882k-HNl"
                    />
                    <div className="absolute inset-0 bg-background/30 mix-blend-multiply"></div>
                </div>
                <div className="z-10 relative mx-auto px-6 w-full max-w-7xl">
                    <div className="bg-background/98 shadow-2xl backdrop-blur-sm p-12 @lg/main:p-20 border-primary border-l-4 @md/main:w-1/2">
                        <span className="block mb-6 font-sans font-bold text-primary text-sm uppercase tracking-[0.3em]">
                            Our Mission
                        </span>
                        <h1 className="mb-8 font-display text-4xl @md/main:text-5xl @lg/main:text-5xl italic leading-tight">
                            Preserving the soul of tradition.
                        </h1>
                        <p className="font-sans text-muted-foreground text-lg leading-relaxed">
                            At Souq Ummah, we believe that every thread, every stroke of the
                            pen, and every carved piece of wood carries a legacy. We are
                            more than a marketplace; we are a digital caravan connecting the
                            timeless craftsmanship of the Islamic world with the modern
                            home.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="layout-container">
                <div className="items-center gap-20 grid @md/main:grid-cols-2">
                    <div className="space-y-8 order-2 @md/main:order-1">
                        <h2 className="font-display text-primary text-3xl italic">
                            The Ancestral Thread
                        </h2>
                        <div className="space-y-6 font-sans text-muted-foreground text-lg leading-relaxed">
                            <p>
                                Our journey began in the narrow alleys of old medinas, where
                                the rhythmic sound of copper being hammered and the sweet
                                scent of aged musk defined the air. We realized that these
                                ancestral skills were not just techniques—they were forms of
                                worship and expressions of cultural identity.
                            </p>
                            <p>
                                Souq Ummah was born out of a desire to ensure these lineages
                                continue. By curating only the most authentic,
                                ethically-sourced lifestyle goods, we provide global artisans
                                with the platform they deserve while bringing sacred beauty
                                into your daily life.
                            </p>
                        </div>
                    </div>
                    <div className="order-1 @md/main:order-2">
                        <div className="group relative bg-secondary shadow-xl border border-border/20 aspect-4/5 overflow-hidden">
                            <img
                                alt="Ancient manuscript"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 transform"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_VBs2QMuFFh3-wj-8R3YWf5SHTVVq2prpURonciWYcfpOzQ-0P6eIZQQMA8uhKTodSYFFn3ioIIcPn9PzFfTas-BHPuW0qXFmd99sidVbLWltDGGgdjJZhynfZ6-AxybKfNWno2edshCcMtTKXl0fODacYncQKRy8PheoURXljJyHt6Al8_6C86S-zKS0W0EYO3TKFBTr-7oVAHCuwtBLkevHrLga9suCi79YvQeZcj8txYwVl6PnqGnAcx8Om9Lm_l6OHSoppEOc"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Gold Separator */}
            <div className="mx-auto px-6 max-w-5xl">
                <div className="bg-linear-to-r from-transparent via-primary/40 to-transparent my-16 w-full h-px"></div>
            </div>

            {/* Values Section */}
            <section className="bg-secondary px-6 py-24">
                <div className="layout-container">
                    <div className="mb-20 text-center">
                        <h2 className="mb-4 font-display text-foreground text-4xl italic">
                            Our Foundational Values
                        </h2>
                        <div className="bg-primary mx-auto w-24 h-px"></div>
                    </div>
                    <div className="gap-12 grid @md/main:grid-cols-3">
                        <ValueCard
                            icon={ShieldCheck}
                            title="Authenticity"
                            description="Every piece in our collection is vetted for its heritage. We do not mass-produce; we curate stories rooted in history."
                        />
                        <ValueCard
                            icon={Hammer}
                            title="Craftsmanship"
                            description="We celebrate the 'imperfections' of the hand. Our focus is on materials that age beautifully and designs that endure."
                        />
                        <ValueCard
                            icon={Users}
                            title="Community"
                            description="Sustainable trade is our pillar. We ensure fair wages and reinvest in the artisan communities that sustain our heritage."
                        />
                    </div>
                </div>
            </section>

            {/* Gold Separator */}
            <div className="mx-auto px-6 max-w-5xl">
                <div className="bg-linear-to-r from-transparent via-primary/40 to-transparent my-16 w-full h-px"></div>
            </div>

            {/* Founders Section */}
            <section className="layout-container">
                <div className="mb-16">
                    <span className="block mb-4 font-sans font-bold text-primary text-sm uppercase tracking-[0.3em]">
                        The Stewards
                    </span>
                    <h2 className="font-display text-foreground text-4xl italic">
                        Meet the Founders
                    </h2>
                </div>
                <div className="gap-16 grid @md/main:grid-cols-2">
                    <FounderCard
                        name="Omar Al-Farsi"
                        role="Creative Director"
                        quote="Souq Ummah is the realization of a lifelong dream to showcase the intellectual and artistic depth of our heritage to the modern world."
                        imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAJOaTbPVx7Hcsan-V5tK-4DJkSzUloGD5LOH2UtWI8PbB8WCqrHgRW3rQgIAnEsOkixjXEVzB-FHO28LyRegRGsMVAEVocOkArbstI7Eb3I-OZo8Jns7YGbU5eZpUxLeHX2quDCWsLQOVHMHnMo2YwDVpJCDaYH5p6VUqy5QZ1nCes2Z1hYDL_Ey4QNgCgs7vQvVEB5oKXB4Axb0iuZy0-sLRwgNF9VsTcmqSSo6ZifLJTKdCwylYEbfZ2T0G6JoN0CDoa-4ffe62d"
                        imageAlt="Portrait of Omar Al-Farsi"
                    />
                    <FounderCard
                        name="Zaynab Malik"
                        role="Operations Lead"
                        quote="Connecting artisans with people who truly appreciate their craft is a spiritual endeavor for me. We are building more than a business; we are building bridges."
                        imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuABlhYdpwx8dib2cCxdPMla_wIjtNVFKl_B4ecsxyXRLn8se_P8L0PMREljpGhWLxVIT28cHr1OAhjNjgObfRriqu59mQS_cLLAtwb-IxdJYydDhqg3ylj3i_U0KIvGTPsx1OS77wZxTWmv0LWl2kbdXDfxQ_YXvImxMfFcGdG1W1pD_ZTMZwzVEUUzqX3rw1Da1xBWHyC4zg37ETF5o_czpEx8yRevA-MSowNNCPQlvH5KZ2w4dD9HZ4y6wrunDhqAb2Gr6Jf5mbWr"
                        imageAlt="Portrait of Zaynab Malik"
                    />
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-background py-24 border-primary/5 border-t">
                <div className="mx-auto px-6 max-w-4xl text-center">
                    <h2 className="mb-6 font-display text-foreground text-3xl @md/main:text-5xl italic">
                        Join the Caravan
                    </h2>
                    <p className="mb-10 font-sans text-muted-foreground text-lg">
                        Be the first to hear about new artisan drops, heritage stories,
                        and community events.
                    </p>
                    <form
                        className="flex @md/main:flex-row flex-col gap-4 mx-auto max-w-lg"
                    // onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            className="bg-white px-6 py-4 border border-border focus:border-primary rounded-none outline-none focus:ring-1 focus:ring-primary font-sans text-foreground transition-all grow"
                            placeholder="Your email address"
                            type="email"
                        />
                        <button
                            className="bg-primary hover:bg-accent shadow-lg shadow-primary/20 px-10 py-4 rounded-none font-sans font-bold text-white uppercase tracking-widest transition-colors"
                            type="submit"
                        >
                            Subscribe
                        </button>
                    </form>
                    <p className="mt-6 font-sans text-muted-foreground text-xs italic uppercase tracking-widest">
                        Sacred aesthetics, delivered to your inbox.
                    </p>
                </div>
            </section>
        </main>
    );
}
