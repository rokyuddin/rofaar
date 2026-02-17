import { Mail, Phone, Calendar, MapPin, Edit2 } from "lucide-react";

export function ProfileArchive() {
    return (
        <div className="flex-1 space-y-12">
            <div className="flex justify-between items-end pb-8 border-border border-b">
                <div className="flex flex-col gap-2">
                    <h1 className="font-display font-bold text-4xl">The Archive</h1>
                    <p className="text-muted-foreground text-sm">A testament to your journey within our community.</p>
                </div>
                <button className="group flex items-center gap-2 hover:bg-surface px-6 py-3 border border-border rounded-sm font-bold text-xs uppercase tracking-widest transition-all">
                    <Edit2 className="w-4 h-4 group-hover:text-primary transition-colors" /> Refine Archive
                </button>
            </div>

            <div className="gap-12 grid grid-cols-1 md:grid-cols-2">
                <div className="space-y-8">
                    <section className="space-y-4">
                        <h2 className="flex items-center gap-2 font-display font-bold text-lg">
                            <span className="bg-primary w-6 h-px" /> Personal Anthology
                        </h2>
                        <div className="space-y-6 bg-surface/30 p-8 rounded-sm">
                            <div className="flex items-center gap-4">
                                <Mail className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <span className="block font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Correspondence</span>
                                    <span className="text-sm">ahmad.almansour@example.com</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <span className="block font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Direct Line</span>
                                    <span className="text-sm">+212 612-345678</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Calendar className="w-5 h-5 text-muted-foreground" />
                                <div>
                                    <span className="block font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Journey Began</span>
                                    <span className="text-sm">September 14, 2022</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="flex items-center gap-2 font-display font-bold text-lg">
                            <span className="bg-primary w-6 h-px" /> Primary Sanctuary
                        </h2>
                        <div className="flex items-start gap-4 bg-white p-8 border border-border rounded-sm">
                            <MapPin className="mt-1 w-6 h-6 text-primary" />
                            <div>
                                <span className="block mb-1 font-bold text-base">Residential Sanctuary</span>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    123 Cedar Lane, Sukoon District<br />
                                    Casablanca 20000, Morocco
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <section className="space-y-4">
                        <h2 className="flex items-center gap-2 font-display font-bold text-lg">
                            <span className="bg-primary w-6 h-px" /> Statistics of Devotion
                        </h2>
                        <div className="gap-4 grid grid-cols-2">
                            <div className="flex flex-col items-center gap-2 bg-primary/5 p-6 border border-primary/10 rounded-sm text-center">
                                <span className="font-sans font-bold text-primary text-2xl">12</span>
                                <span className="font-bold text-[10px] text-muted-foreground uppercase leading-tight tracking-widest">Artifacts<br />Acquired</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 bg-primary/5 p-6 border border-primary/10 rounded-sm text-center">
                                <span className="font-sans font-bold text-primary text-2xl">3</span>
                                <span className="font-bold text-[10px] text-muted-foreground uppercase leading-tight tracking-widest">Artisans<br />Supported</span>
                            </div>
                        </div>
                    </section>

                    <section className="group relative p-8 rounded-sm overflow-hidden bg-text-main text-white">
                        <div className="top-0 right-0 absolute bg-primary/20 group-hover:bg-primary/40 blur-2xl rounded-full w-32 h-32 transition-all -translate-y-1/2 translate-x-1/2 duration-700" />
                        <div className="z-10 relative space-y-4">
                            <h3 className="font-display font-bold text-xl">Member Level 2</h3>
                            <p className="text-white/70 text-xs uppercase leading-relaxed tracking-widest">You have unlocked early access to the upcoming &quot;Ottoman Heritage&quot; collection.</p>
                            <div className="bg-white/10 rounded-full w-full h-1.5 overflow-hidden">
                                <div className="bg-primary w-[65%] h-full" />
                            </div>
                            <p className="font-bold text-[10px] text-white/50 uppercase tracking-widest">350 Points until Level 3</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
