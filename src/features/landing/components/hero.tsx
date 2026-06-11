"use client";

import { Button } from "@/components/atoms/button";
import Link from "next/link";
import type { Banner } from "@/types/api";

interface HeroProps {
  banner?: Banner | null;
}

export function Hero({ banner }: HeroProps) {
  const backgroundImage =
    banner?.imageUrl ??
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80";

  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-muted">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container relative mx-auto flex h-full flex-col justify-center px-4 text-white">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="mb-6 font-heading text-5xl font-bold leading-tight md:text-7xl">
            {banner?.title ? (
              banner.title
            ) : (
              <>
                Tools for the <br />
                <span className="text-primary-foreground">
                  Productive Believer
                </span>
              </>
            )}
          </h1>
          <p className="mb-8 text-lg text-gray-200 md:text-xl">
            {banner?.subtitle ??
              "Reconnect with tradition through handcrafted goods designed for spiritual focus and daily barakah."}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={banner?.linkUrl || "/products"}>
              <Button size="lg" className="h-12 px-8 text-base">
                Shop Now
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white px-8 text-base text-white hover:bg-white hover:text-black"
              >
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
