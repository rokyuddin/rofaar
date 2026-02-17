import type React from "react";

export const ConciergeForm: React.FC = () => {
  return (
    <div className="@lg/main:col-span-7 bg-white p-8 @md/main:p-12 border border-primary/10 rounded-xl">
      <h2 className="mb-8 font-display font-bold text-2xl">
        Send us a Message
      </h2>
      <form action="#" className="space-y-6">
        <div className="gap-6 grid grid-cols-1 @md/main:grid-cols-2">
          <div className="space-y-2">
            <label
              className="block font-sans font-medium text-neutral-heritage/60 text-sm uppercase tracking-widest"
              htmlFor="name"
            >
              Your Name
            </label>
            <input
              className="bg-background-light p-4 border border-primary/10 focus:border-primary rounded focus:ring-primary w-full font-display transition-all"
              id="name"
              name="name"
              placeholder="Bilal Al-Farsi"
              type="text"
            />
          </div>

          <div className="space-y-2">
            <label
              className="block font-sans font-medium text-neutral-heritage/60 text-sm uppercase tracking-widest"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="bg-background-light p-4 border border-primary/10 focus:border-primary rounded focus:ring-primary w-full font-display transition-all"
              id="email"
              name="email"
              placeholder="bilal@example.com"
              type="email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            className="block font-sans font-medium text-neutral-heritage/60 text-sm uppercase tracking-widest"
            htmlFor="subject"
          >
            Subject
          </label>
          <select
            className="bg-background-light p-4 border border-primary/10 focus:border-primary rounded focus:ring-primary w-full font-display transition-all"
            id="subject"
            name="subject"
          >
            <option>Product Inquiry</option>
            <option>Custom Orders</option>
            <option>Shipping & Returns</option>
            <option>Wholesale</option>
            <option>Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            className="block font-sans font-medium text-neutral-heritage/60 text-sm uppercase tracking-widest"
            htmlFor="message"
          >
            How can we assist you?
          </label>
          <textarea
            className="bg-background-light p-4 border border-primary/10 focus:border-primary rounded focus:ring-primary w-full font-display transition-all resize-none"
            id="message"
            name="message"
            placeholder="Tell us how we can help..."
            rows={5}
          />
        </div>

        <div className="pt-4">
          <button
            className="flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 py-4 rounded-lg w-full font-sans font-bold text-white uppercase tracking-widest transition-all duration-300"
            type="submit"
          >
            Send Message
            <span className="text-xl material-icons">send</span>
          </button>
        </div>

        <p className="mt-4 font-display text-neutral-heritage/50 text-xs text-center italic">
          Our concierge team usually responds within 24 hours.
        </p>
      </form>
    </div>
  );
};
