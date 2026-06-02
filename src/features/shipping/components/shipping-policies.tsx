import { Clock, RotateCcw, AlertCircle } from "lucide-react";

const policies = [
  {
    icon: Clock,
    title: "Processing Time",
    description:
      "Most orders are processed within 2-3 business days. Handmade or custom items may require 5-7 business days for artisan preparation.",
  },
  {
    icon: RotateCcw,
    title: "Returns & Exchanges",
    description:
      "Due to the bespoke nature of our items, we offer a 14-day return window for items in original condition. Minor variations are hallmarks of handcrafting.",
  },
  {
    icon: AlertCircle,
    title: "Important Notes",
    description:
      "International orders may be subject to customs duties and taxes. These are the responsibility of the recipient and vary by country.",
  },
];

export function ShippingPolicies() {
  return (
    <section className="py-16">
      <h2 className="mb-4 font-display font-bold text-espresso text-3xl">
        Shipping Policies
      </h2>
      <p className="mb-12 font-sans text-espresso/60">
        Important information about our shipping services.
      </p>
      <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
        {policies.map((policy, index) => (
          <div key={index} className="p-8 border border-border/50 rounded-xl">
            <div className="mb-4 text-primary">
              <policy.icon className="w-6 h-6" />
            </div>
            <h3 className="mb-3 font-display font-bold text-espresso text-lg">
              {policy.title}
            </h3>
            <p className="font-sans text-espresso/60 text-sm leading-relaxed">
              {policy.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
