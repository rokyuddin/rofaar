import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { User, Truck, CreditCard, ShieldCheck, ArrowUp } from "lucide-react";

export default function PrivacyPage() {
    return (
        <>
            <Header />
            <main className="relative gap-16 grid grid-cols-12 mx-auto px-6 lg:px-12 py-16 max-w-7xl">
                {/* Sidebar Navigation */}
                <aside className="hidden lg:block top-32 sticky col-span-12 lg:col-span-3 h-fit">
                    <div className="py-2 pl-8 border-primary/20 border-l">
                        <h3 className="mb-8 font-sans font-bold text-[10px] text-espresso/40 uppercase tracking-[0.3em]">
                            Policy Sections
                        </h3>
                        <ul className="space-y-6 font-sans font-medium text-sm">
                            <li>
                                <a className="block text-primary transition-all hover:translate-x-1" href="#introduction">
                                    01. Our Commitment
                                </a>
                            </li>
                            <li>
                                <a className="block text-espresso/70 hover:text-primary transition-all hover:translate-x-1" href="#collection">
                                    02. What Data We Collect
                                </a>
                            </li>
                            <li>
                                <a className="block text-espresso/70 hover:text-primary transition-all hover:translate-x-1" href="#usage">
                                    03. Purpose & Use
                                </a>
                            </li>
                            <li>
                                <a className="block text-espresso/70 hover:text-primary transition-all hover:translate-x-1" href="#protection">
                                    04. Data Security
                                </a>
                            </li>
                            <li>
                                <a className="block text-espresso/70 hover:text-primary transition-all hover:translate-x-1" href="#rights">
                                    05. Your Data Rights
                                </a>
                            </li>
                            <li>
                                <a className="block text-espresso/70 hover:text-primary transition-all hover:translate-x-1" href="#contact">
                                    06. Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* Policy Content */}
                <article className="col-span-12 lg:col-span-9 max-w-3xl">
                    <header className="mb-16">
                        <div className="inline-flex items-center gap-2 mb-6 font-sans font-bold text-[10px] text-primary uppercase tracking-[0.4em]">
                            <span className="bg-primary/40 w-8 h-px"></span>
                            Legal Transparency
                        </div>
                        <h1 className="mb-8 font-display font-bold text-espresso text-5xl lg:text-6xl leading-[1.1] tracking-tight">
                            Privacy Policy
                        </h1>
                        <div className="flex items-center gap-6 mb-10 pb-10 border-espresso/10 border-b font-sans text-[11px] text-espresso/50 uppercase tracking-widest">
                            <span>Last Updated Oct 24, 2023</span>
                            <span className="bg-espresso/20 rounded-full w-1 h-1"></span>
                            <span>Version 2.4.0</span>
                        </div>
                        <p className="font-display text-espresso/70 text-xl italic leading-[1.75]">
                            Your privacy is a priority. This policy explains how we collect,
                            use, and protect your information when you interact with our
                            marketplace.
                        </p>
                    </header>

                    <div className="space-y-20 font-sans font-light text-[1.05rem] leading-[1.75]">
                        {/* Section 01 */}
                        <section className="scroll-mt-32" id="introduction">
                            <h2 className="mb-6 font-display font-bold text-espresso text-2xl">
                                01. Our Commitment
                            </h2>
                            <div className="space-y-4 text-espresso/80">
                                <p>
                                    Souq Ummah is committed to protecting your personal data. We
                                    manage your information according to ethical principles and
                                    international data protection standards, ensuring
                                    transparency in every interaction.
                                </p>
                                <p>
                                    We do not sell your personal data to third parties. Our goal
                                    is to provide a secure and respectful shopping experience
                                    tailored to your heritage and lifestyle needs.
                                </p>
                            </div>
                        </section>

                        {/* Section 02 */}
                        <section className="scroll-mt-32" id="collection">
                            <h2 className="mb-6 font-display font-bold text-espresso text-2xl">
                                02. What Data We Collect
                            </h2>
                            <p className="mb-8 text-espresso/80">
                                We collect only the information necessary to fulfill your orders
                                and improve our services.
                            </p>
                            <div className="space-y-6 bg-espresso/3 p-8 border border-espresso/5 rounded-xl">
                                <ul className="space-y-8">
                                    <li className="flex items-start gap-4">
                                        <User className="mt-1 w-6 h-6 text-primary shrink-0" />
                                        <div>
                                            <strong className="block mb-1 font-semibold text-espresso text-base">
                                                Account Information
                                            </strong>
                                            <span className="text-espresso/70 text-sm">
                                                Name, email address, and account preferences used to
                                                personalize your experience.
                                            </span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <Truck className="mt-1 w-6 h-6 text-primary shrink-0" />
                                        <div>
                                            <strong className="block mb-1 font-semibold text-espresso text-base">
                                                Shipping Details
                                            </strong>
                                            <span className="text-espresso/70 text-sm">
                                                Physical address and contact number for order
                                                fulfillment and delivery tracking.
                                            </span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <CreditCard className="mt-1 w-6 h-6 text-primary shrink-0" />
                                        <div>
                                            <strong className="block mb-1 font-semibold text-espresso text-base">
                                                Payment Data
                                            </strong>
                                            <span className="text-espresso/70 text-sm">
                                                Encrypted payment tokens processed through secure,
                                                PCI-compliant payment gateways.
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 03 */}
                        <section className="scroll-mt-32" id="usage">
                            <h2 className="mb-6 font-display font-bold text-espresso text-2xl">
                                03. Purpose & Use
                            </h2>
                            <div className="space-y-4 text-espresso/80">
                                <p>We use your data to:</p>
                                <ul className="space-y-2 pl-5 list-disc">
                                    <li>Process and deliver your orders efficiently.</li>
                                    <li>
                                        Communicate important updates regarding your account or
                                        purchases.
                                    </li>
                                    <li>
                                        Provide personalized product recommendations based on your
                                        interests.
                                    </li>
                                    <li>
                                        Maintain the security and integrity of our marketplace
                                        platform.
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 04 */}
                        <section className="scroll-mt-32" id="protection">
                            <h2 className="mb-6 font-display font-bold text-espresso text-2xl">
                                04. Data Security
                            </h2>
                            <p className="text-espresso/80">
                                We implement industry-standard security measures to protect your
                                information. This includes{" "}
                                <span className="font-semibold text-espresso">
                                    AES-256 encryption
                                </span>{" "}
                                for data at rest and SSL/TLS protocols for data in transit.
                                Regular security audits are conducted to identify and mitigate
                                potential vulnerabilities.
                            </p>
                        </section>

                        {/* Section 05 */}
                        <section className="scroll-mt-32" id="rights">
                            <h2 className="mb-6 font-display font-bold text-espresso text-2xl">
                                05. Your Data Rights
                            </h2>
                            <p className="mb-8 text-espresso/80">
                                You have full control over your personal information. Depending
                                on your location, you may have the right to:
                            </p>
                            <div className="gap-6 grid md:grid-cols-2">
                                <div className="bg-surface p-6 border border-espresso/10 rounded-xl">
                                    <h4 className="mb-2 font-display font-bold text-espresso text-lg">
                                        Access & Portability
                                    </h4>
                                    <p className="text-espresso/60 text-sm leading-relaxed">
                                        Request a copy of the personal data we hold about you in a
                                        structured format.
                                    </p>
                                </div>
                                <div className="bg-surface p-6 border border-espresso/10 rounded-xl">
                                    <h4 className="mb-2 font-display font-bold text-espresso text-lg">
                                        Correction & Deletion
                                    </h4>
                                    <p className="text-espresso/60 text-sm leading-relaxed">
                                        Update inaccurate information or request the permanent
                                        deletion of your account and data.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section 06 */}
                        <section className="pt-8 scroll-mt-32" id="contact">
                            <div className="bg-espresso shadow-2xl p-10 border border-primary/20 rounded-xl">
                                <h3 className="mb-4 font-display font-bold text-background-light text-2xl">
                                    Contact Us
                                </h3>
                                <p className="mb-8 max-w-xl font-sans font-light text-background-light/70">
                                    If you have questions about this Privacy Policy or wish to
                                    exercise your data rights, please contact our support team.
                                </p>
                                <div className="flex sm:flex-row flex-col gap-4">
                                    <a
                                        className="bg-primary hover:bg-accent shadow-lg shadow-primary/20 px-8 py-4 rounded-none font-sans font-semibold text-white text-sm text-center transition-all"
                                        href="mailto:privacy@souqummah.com"
                                    >
                                        Email Support
                                    </a>
                                    <a
                                        className="hover:bg-white/5 px-8 py-4 border border-background-light/20 hover:border-background-light/40 rounded-none font-sans font-semibold text-background-light text-sm text-center transition-all"
                                        href="#"
                                    >
                                        Inquiry Form
                                    </a>
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
