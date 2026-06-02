import { Button } from "@/components/atoms/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-muted">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container relative mx-auto flex h-full flex-col justify-center px-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="mb-6 font-heading text-5xl font-bold leading-tight md:text-7xl">
            Tools for the <br />
            <span className="text-primary-foreground">Productive Believer</span>
          </h1>
          <p className="mb-8 text-lg text-gray-200 md:text-xl">
            Reconnect with tradition through handcrafted goods designed for
            spiritual focus and daily barakah.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products">
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
        </motion.div>
      </div>
    </section>
  );
}
