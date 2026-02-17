import { IconArrowUpRight, IconMail, IconMessageCircle, IconPhone } from "@tabler/icons-react";
import React from "react";

export const ConciergeDetails: React.FC = () => {
    return (
        <div className="space-y-10 @lg/main:col-span-5">
            <div className="space-y-8">
                {/* Email Contact */}
                <div className="group flex gap-6">
                    <div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary rounded-lg w-14 h-14 group-hover:text-white transition-all duration-300 shrink-0">
                        <IconMail className="text-primary group-hover:text-white" />
                    </div>
                    <div className="flex flex-col font-display">
                        <h3 className="mb-1 font-bold text-xl">Send an Email</h3>
                        <p className="mb-2 text-neutral-heritage/70">For detailed inquiries about orders and collections.</p>
                        <div className="flex items-center gap-3">
                            <span className="font-medium text-primary">concierge@heritage.com</span>
                            <button className="flex items-center gap-1 text-neutral-heritage/40 hover:text-primary dark:text-background-light/40 text-xs uppercase tracking-tighter">
                                <span className="text-sm material-icons">content_copy</span> Copy
                            </button>
                        </div>
                    </div>
                </div>
                {/* Phone Contact */}
                <div className="group flex gap-6">
                    <div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary rounded-lg w-14 h-14 group-hover:text-white transition-all duration-300 shrink-0">
                        <IconPhone className="text-primary group-hover:text-white" />
                    </div>
                    <div className="flex flex-col font-display">
                        <h3 className="mb-1 font-bold text-xl">Phone Support</h3>
                        <p className="mb-2 text-neutral-heritage/70">Available Mon-Fri, 9am - 6pm (GMT+3).</p>
                        <span className="font-medium text-primary">+1 (800) 456-7890</span>
                    </div>
                </div>
                {/* WhatsApp Contact */}
                <div className="group flex gap-6">
                    <div className="flex justify-center items-center bg-primary/10 group-hover:bg-primary rounded-lg w-14 h-14 group-hover:text-white transition-all duration-300 shrink-0">
                        <IconMessageCircle className="text-primary group-hover:text-white" />
                    </div>
                    <div className="flex flex-col font-display">
                        <h3 className="mb-1 font-bold text-xl">WhatsApp Concierge</h3>
                        <p className="mb-3 text-neutral-heritage/70">Quick questions and instant assistance.</p>
                        <a className="inline-flex items-center font-bold text-primary hover:underline" href="#">
                            Chat Now <IconArrowUpRight className="ml-1 text-sm" />
                        </a>
                    </div>
                </div>
            </div>
            {/* Heritage Note */}
            <div className="bg-primary/5 mt-12 p-8 border-primary border-l-4 rounded-xl">
                <p className="font-display text-neutral-heritage/80 italic leading-relaxed">
                    "Hospitality is an act of faith. We treat every inquiry with the same reverence we give our finest handcrafted goods."
                </p>
                <p className="mt-4 font-display font-bold text-primary text-sm uppercase tracking-widest">— The Heritage Team</p>
            </div>
        </div>
    );
};
