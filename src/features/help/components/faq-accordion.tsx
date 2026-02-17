"use client";

import { ChevronDown } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
    return (
        <div className="space-y-6 mx-auto px-6 py-12 max-w-4xl">
            {items.map((item, index) => (
                <details key={index} className="group border-espresso/10 border-b">
                    <summary className="flex justify-between items-center py-6 outline-none cursor-pointer list-none">
                        <span className="font-display text-espresso group-hover:text-primary text-xl transition-colors">
                            {item.question}
                        </span>
                        <ChevronDown className="w-6 h-6 text-primary group-open:rotate-180 transition-transform duration-300" />
                    </summary>
                    <div className="slide-in-from-top-2 pb-8 font-display text-espresso/70 leading-relaxed animate-in duration-300 fade-in">
                        {item.answer}
                    </div>
                </details>
            ))}
        </div>
    );
}
