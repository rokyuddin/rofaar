import { Hero } from "@/features/landing/components/hero";
import { CategoryGrid } from "@/features/landing/components/category-grid";
import { HeritageCarousel } from "@/features/landing/components/heritage-carousel";
import { Newsletter } from "@/components/organisms/newsletter";

export default function Home() {
  return (
    <main className="@container/main flex flex-col gap-20 @lg/main:gap-32 py-12 layout-container grow">
      <Hero />

      <CategoryGrid />
      {/* Featured Story / Quote Break */}
      <section className="relative py-16 overflow-hidden">
        <div className="top-0 left-1/2 absolute bg-primary/5 blur-3xl rounded-full w-64 h-64 -translate-x-1/2 -translate-y-1/2" />
        <div className="z-10 relative space-y-6 mx-auto max-w-3xl text-center">
          <blockquote className="font-display text-2xl @md/main:text-3xl italic leading-relaxed">
            &quot;Take benefit of five before five: Your youth before your old age, your health before your sickness, your wealth before your poverty, your free time before your preoccupation, and your life before your death.&quot;
          </blockquote>
          <cite className="block font-bold text-muted-foreground text-sm not-italic uppercase tracking-widest">
            — Prophet Muhammad (ﷺ)
          </cite>
        </div>
      </section>

      <HeritageCarousel />
      <Newsletter />
    </main>
  );
}
