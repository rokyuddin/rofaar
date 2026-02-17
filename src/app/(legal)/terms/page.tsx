"use client";

import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { User, ShieldAlert, CreditCard, Scale, ArrowUp, MessageSquare, HelpCircle } from "lucide-react";

const sections = [
    { id: "account", title: "01. Your Account" },
    { id: "rules", title: "02. Rules for Use" },
    { id: "payments", title: "03. Payments & Refunds" },
    { id: "legal", title: "04. Legal Information" },
];

export default function TermsPage() {
    return (
        <>
            <Header />
            <main className="relative gap-16 grid grid-cols-12 bg-background-light mx-auto px-6 lg:px-12 py-16 max-w-7xl">
                {/* Sidebar Navigation */}
                <aside className="hidden lg:block top-32 sticky col-span-12 lg:col-span-3 h-fit">
                    <div className="py-2 pl-8 border-primary/20 border-l">
                        <h3 className="mb-8 font-sans font-bold text-[10px] text-espresso/40 uppercase tracking-[0.3em]">
                            Table of Contents
                        </h3>
                        <ul className="space-y-6 font-sans font-medium text-sm">
                            {sections.map((section) => (
                                <li key={section.id}>
                                    <a
                                        className="block text-espresso/70 hover:text-primary transition-all hover:translate-x-1"
                                        href={`#${section.id}`}
                                    >
                                        {section.title.split(". ")[1]}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-12 pl-8 border-primary/10 border-l">
                        <p className="font-sans text-[11px] text-espresso/40 italic leading-relaxed">
                            "Tell me what you have done today so I may tell you what you will be tomorrow."
                        </p>
                    </div>
                </aside>

                {/* Terms Content */}
                <article className="col-span-12 lg:col-span-9 max-w-3xl">
                    <header className="mb-16">
                        <div className="inline-flex items-center gap-2 mb-6 font-sans font-bold text-[10px] text-primary uppercase tracking-[0.4em]">
                            <span className="bg-primary/40 w-8 h-px"></span>
                            Policy Update
                        </div>
                        <h1 className="mb-8 font-display font-bold text-espresso text-5xl lg:text-7xl leading-[1.1] tracking-tight">
                            Terms of Service
                        </h1>
                        <div className="flex items-center gap-6 mb-10 pb-10 border-espresso/10 border-b font-sans text-[11px] text-espresso/50 uppercase tracking-widest">
                            <span>Last Updated Dec 15, 2023</span>
                            <span className="bg-espresso/20 rounded-full w-1 h-1"></span>
                            <span>Version 2.0</span>
                        </div>
                        <div className="bg-surface/50 p-8 border-primary/30 border-l-4 font-display text-espresso/80 text-xl italic leading-[1.75]">
                            These terms define our commitment to you and your responsibilities
                            as a member of our community. By using our platform, you agree to
                            follow these guidelines.
                        </div>
                    </header>

                    <div className="space-y-24 font-sans font-light text-[1.05rem] leading-[1.85]">
                        {/* Section 01: Your Account */}
                        <section className="scroll-mt-32" id="account">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="font-display text-primary/40 text-4xl">01/</span>
                                <h2 className="font-display font-bold text-espresso text-3xl">
                                    Your Account
                                </h2>
                            </div>
                            <div className="space-y-6 text-espresso/80">
                                <p>
                                    To access certain features of our marketplace, you will need to
                                    create an account. You agree to provide accurate, current, and
                                    complete information during the registration process.
                                </p>
                                <p>
                                    You are solely responsible for maintaining the confidentiality of
                                    your account credentials and for all activities that occur under
                                    your account. If you suspect any unauthorized use, please notify
                                    us immediately.
                                </p>
                            </div>
                        </section>

                        {/* Section 02: Rules for Use */}
                        <section className="scroll-mt-32" id="rules">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="font-display text-primary/40 text-4xl">02/</span>
                                <h2 className="font-display font-bold text-espresso text-3xl">
                                    Rules for Use
                                </h2>
                            </div>
                            <p className="mb-10 text-espresso/80">
                                We strive to maintain a respectful and honest marketplace. By
                                using our services, you agree to the following:
                            </p>

                            <div className="space-y-4">
                                <div className="bg-white shadow-sm hover:shadow-md p-8 border border-espresso/5 transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-2 rounded-sm text-primary">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <h4 className="mb-2 font-sans font-bold text-[11px] text-espresso uppercase tracking-widest">
                                                Honest Representation
                                            </h4>
                                            <p className="font-sans text-espresso/70 text-sm leading-relaxed">
                                                All artisans must represent their heritage goods
                                                transparently. Buyers must provide truthful reviews and
                                                feedback.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white shadow-sm hover:shadow-md p-8 border border-espresso/5 transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-2 rounded-sm text-primary">
                                            <ShieldAlert size={18} />
                                        </div>
                                        <div>
                                            <h4 className="mb-2 font-sans font-bold text-[11px] text-espresso uppercase tracking-widest">
                                                Prohibited Conduct
                                            </h4>
                                            <p className="font-sans text-espresso/70 text-sm leading-relaxed">
                                                The use of automated scrapers, attempts to bypass security,
                                                or the distribution of harmful content is strictly prohibited.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white shadow-sm hover:shadow-md p-8 border border-espresso/5 transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-2 rounded-sm text-primary">
                                            <Scale size={18} />
                                        </div>
                                        <div>
                                            <h4 className="mb-2 font-sans font-bold text-[11px] text-espresso uppercase tracking-widest">
                                                Community Respect
                                            </h4>
                                            <p className="font-sans text-espresso/70 text-sm leading-relaxed">
                                                All communications within the marketplace must remain
                                                dignified and courteous. Harassment is never tolerated.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 03: Payments & Refunds */}
                        <section className="scroll-mt-32" id="payments">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="font-display text-primary/40 text-4xl">03/</span>
                                <h2 className="font-display font-bold text-espresso text-3xl">
                                    Payments & Refunds
                                </h2>
                            </div>
                            <div className="space-y-6 text-espresso/80">
                                <p>
                                    All payments are processed through secure third-party providers.
                                    We do not store your full credit card information on our servers.
                                </p>
                                <div className="bg-surface/30 p-8 border-primary/20 border-l-2 rounded-sm">
                                    <p className="text-sm leading-relaxed">
                                        <strong className="text-espresso">Refund Policy:</strong>{" "}
                                        Because many items are handcrafted or made-to-order, refund
                                        policies are set by individual artisans. However, if an item is
                                        significantly different from its description, our support team
                                        will step in to ensure a fair resolution.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 04: Legal Information */}
                        <section className="scroll-mt-32" id="legal">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="font-display text-primary/40 text-4xl">04/</span>
                                <h2 className="font-display font-bold text-espresso text-3xl">
                                    Legal Information
                                </h2>
                            </div>
                            <div className="space-y-10 bg-espresso/[0.02] p-10 border border-espresso/5">
                                <div>
                                    <h4 className="mb-4 font-sans font-bold text-[11px] text-primary uppercase tracking-[0.2em]">
                                        Intellectual Property
                                    </h4>
                                    <p className="font-sans text-espresso/70 text-sm leading-relaxed">
                                        Our platform's layout, design, and curated assets are our
                                        property. Artisans retain full rights to their original
                                        photography and product designs.
                                    </p>
                                </div>
                                <div className="pt-10 border-espresso/5 border-t">
                                    <h4 className="mb-4 font-sans font-bold text-[11px] text-primary uppercase tracking-[0.2em]">
                                        Limitation of Liability
                                    </h4>
                                    <p className="font-sans text-espresso/70 text-sm leading-relaxed">
                                        We provide the platform "as is". While we strive for excellence,
                                        we cannot guarantee constant uptime or that the site will
                                        always be error-free.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Clarification CTA */}
                        <section className="pt-12">
                            <div className="relative bg-[#211811] shadow-2xl p-12 overflow-hidden text-center">
                                {/* Decorative Pattern / Texture could go here */}
                                <div className="z-10 relative">
                                    <h3 className="mb-6 font-display font-bold text-white text-3xl md:text-4xl">
                                        Need Clarification?
                                    </h3>
                                    <p className="mx-auto mb-10 max-w-md font-sans font-light text-white/70 italic">
                                        If any part of these terms is unclear, or if you require
                                        further assistance, our support team is ready to help you.
                                    </p>
                                    <div className="flex sm:flex-row flex-col justify-center gap-4">
                                        <a
                                            className="flex justify-center items-center gap-3 bg-primary hover:bg-accent shadow-lg shadow-primary/20 px-8 py-4 font-sans font-bold text-white text-sm uppercase tracking-widest transition-colors"
                                            href="mailto:support@souqummah.com"
                                        >
                                            <MessageSquare size={18} />
                                            Contact Support
                                        </a>
                                        <a
                                            className="flex justify-center items-center gap-3 bg-white/5 hover:bg-white/10 px-8 py-4 border border-white/20 font-sans font-bold text-white text-sm uppercase tracking-widest transition-colors"
                                            href="/help"
                                        >
                                            <HelpCircle size={18} />
                                            Help Center
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </article>
            </main>

            {/* Back to top FAB */}
            <a
                className="group right-8 bottom-8 z-50 fixed flex justify-center items-center bg-white hover:bg-background-light shadow-xl border border-espresso/10 rounded-full w-12 h-12 text-primary transition-all hover:-translate-y-1"
                href="#"
            >
                <ArrowUp className="w-5 h-5 font-light" />
            </a>
            <Footer />
        </>
    );
}
