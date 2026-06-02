"use client";

import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { ServiceCard } from "@/features/help/components/service-card";
import { FAQAccordion } from "@/features/help/components/faq-accordion";
import {
  Search,
  Truck,
  Sparkles,
  ScrollText,
  MessageSquare,
  Mail,
} from "lucide-react";

const faqItems = [
  {
    question: "How is my product ethically sourced?",
    answer:
      "We work directly with artisans across the Islamic world, ensuring fair living wages that exceed local standards. Every purchase includes a certificate of authenticity detailing the province of origin and the specific cooperative that crafted the item.",
  },
  {
    question: "What is your return policy for handcrafted goods?",
    answer:
      "Due to the bespoke nature of our items, we offer a 14-day return window for items in original condition. Please note that minor variations in texture and color are hallmarks of handcrafting and are not considered defects.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we provide international boutique shipping to over 40 countries. Each package is meticulously wrapped in sustainable materials that respect the sanctity of the artisanal work inside.",
  },
  {
    question: "Can I request a custom commission?",
    answer:
      "For select master artisans in calligraphy and rug weaving, we do offer private commissions. Please contact our Concierge via the sticky footer below to begin a consultation.",
  },
];

export default function HelpPage() {
  return (
    <>
      <Header />
      <main className="pb-32 grow">
        {/* Header Section */}
        <header className="relative px-4 py-24">
          <div className="z-10 relative mx-auto max-w-4xl text-center">
            <nav className="flex justify-center space-x-2 mb-6 font-sans font-medium text-primary text-xs uppercase tracking-[0.2em]">
              <a href="/" className="hover:text-espresso transition-colors">
                Home
              </a>
              <span>/</span>
              <span className="opacity-60 text-espresso">Concierge</span>
            </nav>
            <h1 className="mb-8 font-display text-espresso text-5xl md:text-7xl">
              The Concierge
            </h1>
            <p className="mb-12 font-display text-espresso/70 text-lg md:text-xl italic">
              How may we assist your journey through the Ummah?
            </p>
            <div className="group relative mx-auto max-w-2xl">
              <input
                className="bg-white/50 px-12 py-6 border-0 border-espresso/20 focus:border-primary border-b outline-none focus:ring-0 w-full font-display placeholder:text-espresso/30 text-xl transition-all duration-300"
                placeholder="Search for tracking, care guides, or heritage..."
                type="text"
              />
              <Search className="top-1/2 left-2 absolute w-8 h-8 text-primary group-hover:scale-110 transition-transform -translate-y-1/2 duration-300" />
            </div>
          </div>
        </header>

        {/* Service Cards */}
        <section className="mx-auto px-6 py-12 max-w-7xl">
          <div className="gap-10 grid grid-cols-1 md:grid-cols-3">
            <ServiceCard
              icon={Truck}
              title="Orders & Shipping"
              description="Track your artisanal pieces from the workshop to your doorstep with our white-glove delivery service."
              linkText="Explore Service"
            />
            <ServiceCard
              icon={Sparkles}
              title="Product Care"
              description="Preserving heritage. Detailed guides on maintaining the beauty of your hand-woven silks and ceramics."
              linkText="Care Guides"
            />
            <ServiceCard
              icon={ScrollText}
              title="Artisan Stories"
              description="Learn about the masters behind the craft, our ethical sourcing standards, and community impact."
              linkText="Our Ethics"
            />
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24">
          <h2 className="mb-16 font-display text-espresso text-4xl text-center">
            Frequently Asked Questions
          </h2>
          <FAQAccordion items={faqItems} />
        </section>

        {/* Subscribe */}
        <section className="mx-auto px-6 py-24 max-w-4xl text-center">
          <div className="bg-espresso/3 p-16 border border-border/50 rounded-sm">
            <h2 className="mb-6 font-display text-espresso text-3xl">
              Join the Ummah Circle
            </h2>
            <p className="mx-auto mb-10 max-w-md font-display text-espresso/60 italic">
              Receive quarterly journals on Islamic art, artisan spotlights, and
              early access to rare collections.
            </p>
            <form
              className="flex md:flex-row flex-col justify-center items-center gap-4 mx-auto max-w-lg"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="bg-transparent px-6 py-3 border-0 border-espresso/30 focus:border-primary border-b outline-none focus:ring-0 w-full md:w-80 font-display text-espresso"
                placeholder="Your email address"
                type="email"
              />
              <button className="bg-primary hover:bg-accent shadow-lg shadow-primary/20 px-10 py-3 rounded-none font-sans font-bold text-white text-xs uppercase tracking-widest transition-all cursor-pointer">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Sticky Concierge Footer */}
      <aside className="right-0 bottom-0 left-0 z-60 fixed flex md:flex-row flex-col justify-between items-center bg-espresso shadow-2xl px-12 py-6 border-primary/20 border-t text-white">
        <div className="flex items-center space-x-6 mb-4 md:mb-0">
          <div className="flex -space-x-3">
            <img
              alt="Support Specialist"
              className="border-2 border-espresso rounded-full w-10 h-10 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAc_m50kmmOrG5g8eFO-YQ6tFDOa4zMbBJB9qBWIbidwuWirGruXdqqtK31YpF_IDYCHEv_g91QyMQzmVKJOP1hSSrEFlw02BXn4_E63IzlO6BiuHhLB-Re2uQOi0PMjd-qk6lH_fmnLe0Lx7pvtYilBXf0yaXaBonGdngUeHxgaDJiulNhMo64x1hTztcMb_9BW9J1zwjOkunbLIwPUC81lro6PyHSHiltF4hC1aXoJeqt0xcUZs6jp8YwbCIfZgKy2axHpOwfj_K"
            />
            <img
              alt="Artisan Support"
              className="border-2 border-espresso rounded-full w-10 h-10 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChk8YUfNlv1BfGtXCFPL_da8ZGzp5AznbMfkAchaMnnyrK0uSoVCLwR7QlI2AkDvP8jbdW05RsisEkB463AtIz27tdOf4qdF2IRicNpKa0LG3LZPd5ftlhn06D1s-F1dT31F63sg5hg7JODgdpwSy0J8V8W2bmMuEowufwm8PPchNXEJ3YzAI7vJL1BVe-4WLloqJ1B9cGhMHmH5nQv7kEXI2clMBSI-RFUqeN0sLNkr6UuMYf9RDi3hhcj-DBluhhJqRxUlY6DDbV"
            />
          </div>
          <p className="font-display text-background-light/80 text-sm italic">
            &quot;How may we elevate your experience today?&quot;
          </p>
        </div>
        <div className="flex items-center space-x-10">
          <a
            className="group flex items-center space-x-3 text-primary hover:text-white transition-colors"
            href="#"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-sans font-bold text-sm uppercase tracking-[0.2em]">
              Chat Now
            </span>
          </a>
          <div className="hidden md:block bg-white/10 w-px h-6"></div>
          <a
            className="group flex items-center space-x-3 text-primary hover:text-white transition-colors"
            href="mailto:concierge@souqummah.com"
          >
            <Mail className="w-5 h-5" />
            <span className="font-sans font-bold text-sm uppercase tracking-[0.2em]">
              Email Concierge
            </span>
          </a>
        </div>
      </aside>
      <Footer />
    </>
  );
}
