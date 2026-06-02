import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "The quality of the prayer rug exceeded my expectations. You can feel the craftsmanship in every thread. It has truly enhanced my daily focus.",
    author: "Omar K.",
    role: "Verified Customer",
  },
  {
    quote:
      "Finally, a brand that combines modern aesthetics with traditional values. The Miswak holder is both practical and beautiful.",
    author: "Fatima S.",
    role: "Interior Designer",
  },
  {
    quote:
      "Rofaar's attention to detail is remarkable. From the packaging to the product itself, everything feels premium and intentional.",
    author: "Zaid A.",
    role: "Artisan Enthusiast",
  },
];

export function Testimonials() {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-4xl font-bold">Community Voices</h2>
          <p className="mt-4 text-muted-foreground">
            Stories of barakah from those who have joined our journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col bg-background p-8 shadow-sm transition-transform hover:-translate-y-1"
            >
              <Quote className="mb-6 size-8 text-primary opacity-20" />
              <p className="mb-8 flex-1 italic text-muted-foreground">
                "{t.quote}"
              </p>
              <div>
                <p className="font-bold">{t.author}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
