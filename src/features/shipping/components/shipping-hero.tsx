import { Truck, Globe, ShieldCheck } from "lucide-react";

export function ShippingHero() {
  return (
    <section className="py-16">
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-2 mb-6 font-sans font-bold text-[10px] text-primary uppercase tracking-[0.4em]">
          <span className="bg-primary/40 w-8 h-px"></span>
          Delivery Information
        </div>
        <h1 className="mb-8 font-display font-bold text-espresso text-5xl lg:text-6xl leading-[1.1] tracking-tight">
          Shipping & Delivery
        </h1>
        <p className="mb-12 font-display text-espresso/70 text-xl italic leading-[1.75]">
          We deliver our handcrafted treasures worldwide with the care and
          attention each piece deserves.
        </p>
        <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
          <div className="flex items-center gap-4 p-6 bg-espresso/3 rounded-xl">
            <Truck className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-sans font-bold text-espresso text-sm">
                Free Shipping
              </h3>
              <p className="font-sans text-espresso/60 text-xs">
                On orders over $150
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-espresso/3 rounded-xl">
            <Globe className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-sans font-bold text-espresso text-sm">
                40+ Countries
              </h3>
              <p className="font-sans text-espresso/60 text-xs">
                Worldwide delivery
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-espresso/3 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-sans font-bold text-espresso text-sm">
                Insured Packages
              </h3>
              <p className="font-sans text-espresso/60 text-xs">
                Full coverage protection
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
