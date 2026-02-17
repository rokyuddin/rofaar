import React from "react";
import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { ConciergeHero } from "@/features/concierge/components/concierge-hero";
import { ConciergeDetails } from "@/features/concierge/components/concierge-details";
import { ConciergeForm } from "@/features/concierge/components/concierge-form";

export default function ConciergePage() {
    return (
        <main className="@container/main mx-auto px-6 py-16 @md/main:py-24 max-w-6xl min-h-screen layout-container">
            <ConciergeHero />
            <div className="items-start gap-12 grid grid-cols-1 @lg/main:grid-cols-12">
                <ConciergeDetails />
                <ConciergeForm />
            </div>

            {/* Global Presence */}
            <div className="relative shadow-2xl mt-24 rounded-xl h-64 overflow-hidden">
                <div className="z-10 absolute inset-0 flex flex-col justify-center items-center bg-primary/40 p-6 text-white text-center">
                    <h3 className="mb-2 font-display font-bold text-3xl">Our Global Presence</h3>
                    <p className="max-w-md font-display italic">From Istanbul to London, we source and serve the global Ummah with pride.</p>
                </div>
                <img
                    alt="World map silhouette on textured paper"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF9s_6wa3b6khZFn9wIEA3dxQU7d4sYIlP4N3MVwTRaU4uCv_9GRQpZauS4JWarWqnQzsnrNns__a1SASRmxZchYVPE3_oAepTzW8_HZakHovy91yasnTqHHmwB7rFAyfPeQgyTkaXe8GxlpRy4roFXtjDdToZIao9381ety5TC8hdDliTZq122SLvgZFy8UJ-DglDX1xTwGI-BLP16tRGXiFL2dT6rMgV9yQ1faWtmkysIFnGI_ACnuAKQPGXByGsn94bUnyrRDk-"
                />
            </div>
        </main>
    );
}
