import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <section className="items-center gap-12 grid grid-cols-1 @lg/main:grid-cols-2 min-h-[600px]">
            <div className="flex flex-col gap-8 order-2 @lg/main:order-1 max-w-xl">
                <div className="space-y-6">
                    <span className="inline-block font-bold text-primary text-xs uppercase tracking-[0.15em]">
                        Curated for the faithful
                    </span>
                    <h1 className="font-display font-bold text-5xl @md/main:text-6xl leading-[1.1] tracking-tight">
                        Tools for the <br />
                        <span className="text-primary italic">Productive Believer</span>
                    </h1>
                    <p className="max-w-md font-sans text-muted-foreground text-lg @md/main:text-xl leading-relaxed">
                        Reconnect with tradition through handcrafted goods designed for
                        spiritual focus and daily barakah.
                    </p>
                </div>
                <div className="pt-4">
                    <button
                        type="button"
                        className="group relative bg-transparent hover:bg-primary px-8 py-4 border border-primary rounded-sm overflow-hidden font-bold text-primary hover:text-white tracking-wide transition-all duration-300"
                    >
                        <span className="z-10 relative flex items-center gap-2">
                            Explore the Collection
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" />
                        </span>
                    </button>
                </div>
            </div>
            <div className="relative flex justify-center @lg/main:justify-end order-1 @lg/main:order-2 w-full h-[500px]">
                <div className="absolute inset-0 bg-accent/5 @lg/main:ml-auto rounded-t-full @lg/main:w-[480px] translate-x-4 translate-y-4 transform arch-mask" />
                <div className="group relative shadow-2xl shadow-primary/10 w-full @lg/main:w-[480px] h-full overflow-hidden arch-mask">
                    <div className="z-10 absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                    <Image
                        alt="Handcrafted open journal on a wooden desk"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s] ease-out"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT2De-SN9IBcCEcQPICXRt-dPcbwGUD6Px0SlCSqoV5U5VK0rBNcRDI2LMQaSc7VyBII-d3FIgEFNEj9ca_esPY4rTMmb88nf33DVPBwFWLC_-dkn_rXfxMC6CSlWSXNi0e5zkgnTl69vU0V-SSfyMXTmBuka3JMariBtqW081Dsz5hgsyVdKH9Hv2tphZa-gWIo70u13muam_FZDDxZHE-DTz272vYuSLUf-w7DbcC2KVvt1WT1ls1jdr7cqKrEjb2CYUqQBz9jRN"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 480px"
                    />
                    <div className="bottom-8 left-8 z-20 absolute text-white">
                        <p className="opacity-90 font-display text-lg italic">
                            Daily Reflections
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}