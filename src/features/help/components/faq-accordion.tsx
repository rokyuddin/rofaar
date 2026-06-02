"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto px-6 max-w-3xl divide-y divide-border/50">
      {items.map((item, index) => (
        <div key={index} className="py-6">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex justify-between items-center w-full text-left group cursor-pointer"
          >
            <span className="pr-8 font-display font-bold text-espresso text-lg transition-colors group-hover:text-primary">
              {item.question}
            </span>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-primary shrink-0 transition-transform duration-300",
                openIndex === index && "rotate-180",
              )}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              openIndex === index
                ? "max-h-96 opacity-100 mt-4"
                : "max-h-0 opacity-0",
            )}
          >
            <p className="font-sans text-espresso/60 text-sm leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
