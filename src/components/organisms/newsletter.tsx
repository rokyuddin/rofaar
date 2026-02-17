"use client";

import Image from "next/image";

export function Newsletter() {
    return (
        <section className="relative bg-surface mt-8 rounded-sm overflow-hidden">
            <div className="grid grid-cols-1 @md/main:grid-cols-2">
                <div className="relative h-64 @md/main:h-auto">
                    <Image
                        alt="Artisan working on calligraphy"
                        className="absolute inset-0 w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSqkxkHr7exYLbX2CI7Z0ReD5L8dqbPIwEB4ozRb1aiwK6_4a7BOTrtdmgqSUwunn4efC0CbhPjuVKeOC9-74xNpCkDk7lGA3PuFuh2gIiG9NKcQ6abnx-Tw48uSmfU4yFgknxBtQvREk5FoWnSFX17Nj2jjQ1wZbqxIE-X-f1UqdI5k75cpXuOzGNV2zjxiQWBeEQEyBTDjnadn6kX324-w9JeceWSjY-dtF17vot57Xtr6sbvb3m-KDdmzDxAZkinUTy32KiZRA4"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                </div>
                <div className="flex flex-col justify-center space-y-6 bg-secondary p-10 @md/main:p-16">
                    <h3 className="font-display font-bold text-3xl">
                        Join the Caravan
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        Subscribe to receive our weekly journal, featuring reflections on
                        productivity, heritage design, and exclusive early access to new
                        collections.
                    </p>
                    <form
                        className="flex sm:flex-row flex-col gap-3 pt-2"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            className="flex-1 bg-background px-4 py-3 border border-border focus:border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary text-muted-foreground/60 transition-colors placeholder:"
                            placeholder="Your email address"
                            type="email"
                        />
                        <button
                            className="bg-primary hover:bg-accent shadow-lg shadow-primary/20 px-6 py-3 rounded-sm font-bold text-primary-foreground tracking-wide transition-colors"
                            type="submit"
                        >
                            Subscribe
                        </button>
                    </form>
                    <p className="opacity-60 text-muted-foreground text-xs">
                        We respect your inbox. No spam, ever.
                    </p>
                </div>
            </div>
        </section>
    );
}