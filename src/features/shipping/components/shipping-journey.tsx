import { Package, Truck, MapPin, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Package,
    title: "Order Confirmed",
    description:
      "Your order is received and our artisans begin preparing your handcrafted items.",
  },
  {
    icon: Truck,
    title: "Carefully Packaged",
    description:
      "Each piece is wrapped in sustainable materials that respect the artisanal craftsmanship.",
  },
  {
    icon: MapPin,
    title: "In Transit",
    description:
      "Track your package in real-time as it makes its way to your doorstep.",
  },
  {
    icon: CheckCircle,
    title: "Delivered",
    description:
      "Your treasures arrive safely, ready to bring barakah to your home.",
  },
];

export function ShippingJourney() {
  return (
    <section className="py-16">
      <h2 className="mb-4 font-display font-bold text-espresso text-3xl">
        Your Shipping Journey
      </h2>
      <p className="mb-12 font-sans text-espresso/60">
        From our artisans to your home - every step is handled with care.
      </p>
      <div className="relative">
        <div className="absolute top-8 left-0 right-0 h-px bg-espresso/10 hidden md:block"></div>
        <div className="gap-8 grid grid-cols-1 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="inline-flex justify-center items-center bg-background mb-6 border-2 border-primary/20 rounded-full w-16 h-16">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="mb-2 font-sans font-bold text-primary text-xs uppercase tracking-widest">
                Step {index + 1}
              </div>
              <h3 className="mb-2 font-display font-bold text-espresso text-lg">
                {step.title}
              </h3>
              <p className="font-sans text-espresso/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
