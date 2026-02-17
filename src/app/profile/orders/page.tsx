import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { ProfileSidebar } from "@/features/profile/components/profile-sidebar";
import { OrderHistory } from "@/features/profile/components/order-history";

export default function OrdersPage() {
    return (
        <>
            <Header />
            {/* <main className="flex lg:flex-row flex-col gap-16 mx-auto px-6 py-12 lg:py-20 max-w-[1440px]">
                <ProfileSidebar />
                <OrderHistory />
            </main> */}

            <main className="flex lg:flex-row flex-col gap-16 mx-auto mx-auto px-6 py-12 lg:py-20 container">
                {/* <aside className="flex-shrink-0 w-full lg:w-64">
                        <div className="top-32 sticky">
                            <h2 className="mb-8 pb-4 border-primary/10 border-b font-serif text-2xl italic">My Account</h2>
                            <nav className="space-y-1">
                                <a className="group flex items-center hover:bg-primary/5 px-4 py-3 font-medium text-sm transition-all" href="#">
                                    <span className="mr-3 text-primary/60 group-hover:text-primary material-icons">person</span>
                                    Profile
                                </a>
                                <a className="flex items-center px-4 py-3 font-medium text-primary text-sm sidebar-item-active" href="#">
                                    <span className="mr-3 text-primary material-icons">receipt_long</span>
                                    The Ledger
                                </a>
                                <a className="group flex items-center hover:bg-primary/5 px-4 py-3 font-medium text-sm transition-all" href="#">
                                    <span className="mr-3 text-primary/60 group-hover:text-primary material-icons">favorite_border</span>
                                    Wishlist
                                </a>
                                <a className="group flex items-center hover:bg-primary/5 px-4 py-3 font-medium text-sm transition-all" href="#">
                                    <span className="mr-3 text-primary/60 group-hover:text-primary material-icons">location_on</span>
                                    Addresses
                                </a>
                                <a className="group flex items-center hover:bg-primary/5 mt-8 px-4 py-3 font-medium text-red-800 dark:text-red-400 text-sm transition-all" href="#">
                                    <span className="mr-3 material-icons">logout</span>
                                    Sign Out
                                </a>
                            </nav>
                        </div>
                    </aside> */}
                <ProfileSidebar />

                <div className="flex-1">
                    <header className="mb-10">
                        <h1 className="mb-2 font-serif font-medium text-primary text-4xl">The Ledger</h1>
                        <p className="font-light text-espresso/60 dark:text-alabaster/60 italic">Your history of curated acquisitions and timeless goods.</p>
                    </header>
                    <div className="flex justify-between items-center mb-6 pb-4 border-primary/10 border-b">
                        <h3 className="font-serif text-espresso dark:text-alabaster text-lg italic">Recent Orders</h3>
                        <div className="flex gap-4">
                            <select className="bg-transparent border-primary/20 focus:border-primary rounded-none focus:ring-primary text-xs uppercase tracking-widest">
                                <option>Last 3 Months</option>
                                <option>2023</option>
                                <option>2022</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="group relative shadow-sm p-6 border border-primary/20 hover:border-primary/40 rounded-sm overflow-hidden transition-all">
                            <div className="absolute inset-0 noise-texture"></div>
                            <div className="z-10 relative">
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                                    <div>
                                        <span className="font-bold text-[10px] text-espresso/40 dark:text-alabaster/40 uppercase tracking-[0.2em]">Order Reference</span>
                                        <h4 className="font-medium text-primary text-lg">#SU-88294</h4>
                                        <p className="mt-1 text-espresso/60 dark:text-alabaster/60 text-xs">14th Ramadan, 1445 • March 24, 2024</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-flex items-center bg-primary/10 px-3 py-1 rounded-full font-bold text-[10px] text-primary uppercase tracking-widest">
                                            Shipped
                                        </span>
                                        <p className="mt-2 font-serif text-espresso dark:text-alabaster text-lg italic">$284.50</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mb-6 pb-2 overflow-x-auto scrollbar-hide">
                                    <div className="flex-shrink-0 bg-background-light dark:bg-background-dark/50 p-1 border border-primary/10 w-16 h-16">
                                        <img className="grayscale-[0.3] group-hover:grayscale-0 w-full h-full object-cover transition-all" data-alt="Handcrafted ceramic prayer beads" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDro68krzYzaD1IE1j18_E5fPmgqEQ7nLn3JsxC4_V8IhTo3zkDjXoSBZ0XhtwCFTCRGp0Z1ON0X7dX15QZ9tMk09foi3vFDVV7a7verylf-n1vnfb76APnX-_rNRRBd6DWvtIfz0-wP9PfWZkll3YFLlAusbG00alYNifZD3BHD-w74Nj5jgBBt_RgDcB0kJCuACECeXm6afcmXx5e7SED3a9k8PyGmVyCtCgY1n2OuQZ7riGxb78EAJCgjxAi6w7NJ5zkRCQ3b8nM" />
                                    </div>
                                    <div className="flex-shrink-0 bg-background-light dark:bg-background-dark/50 p-1 border border-primary/10 w-16 h-16">
                                        <img className="grayscale-[0.3] group-hover:grayscale-0 w-full h-full object-cover transition-all" data-alt="Traditional patterned woven prayer mat" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMu8ezjthfcb2g-IZQSQbJ4olaBfjjNUgCqzoN_X5lPo6PbYPcvS6GDu2lwc09jSxCVl-5IALN1bxYtV6VcFRufp_0OzWFqvuNZA_PQYtvko74WCmL2uHGfgsbHdxJ6MoOQN4bzr4Tqt0ZBJ1UG9tKGGaJNEWgHN7ZLAM3d4-FeziyBVTK93EVpolZiLyP4g6x5iqGPatRDfQJazVbTzGAbq4AcCNv_1B0FwVO5a6omQE_qWdPNffFHOzFpa83k5XMk021UnTZUNHB" />
                                    </div>
                                    <div className="flex flex-shrink-0 justify-center items-center p-1 border border-primary/10 w-16 h-16 font-medium text-[10px] text-espresso/40 dark:text-alabaster/40">
                                        +1 more
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <button className="bg-primary px-6 py-3 border border-border font-bold text-white text-xs uppercase tracking-widest transition-all">
                                        Reorder
                                    </button>
                                    <button className="hover:bg-primary px-6 py-3 border border-primary/30 rounded-sm font-bold text-primary hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="group relative shadow-sm p-6 border border-primary/20 hover:border-primary/40 rounded-sm overflow-hidden transition-all">
                            <div className="absolute inset-0 noise-texture"></div>
                            <div className="z-10 relative">
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                                    <div>
                                        <span className="font-bold text-[10px] text-espresso/40 dark:text-alabaster/40 uppercase tracking-[0.2em]">Order Reference</span>
                                        <h4 className="font-medium text-primary text-lg">#SU-88120</h4>
                                        <p className="mt-1 text-espresso/60 dark:text-alabaster/60 text-xs">2nd Rajab, 1445 • January 14, 2024</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-flex items-center bg-espresso/5 px-3 py-1 rounded-full font-bold text-[10px] text-espresso/60 dark:text-alabaster/60 uppercase tracking-widest">
                                            Delivered
                                        </span>
                                        <p className="mt-2 font-serif text-espresso dark:text-alabaster text-lg italic">$145.00</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mb-6 pb-2 overflow-x-auto scrollbar-hide">
                                    <div className="flex-shrink-0 bg-background-light dark:bg-background-dark/50 p-1 border border-primary/10 w-16 h-16">
                                        <img className="grayscale-[0.3] group-hover:grayscale-0 w-full h-full object-cover transition-all" data-alt="Minimalist wooden incense holder set" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm97gsOZoHkgvS0AyNMxWFnDCM4e7fuEpIPL3S2dopm5qoiWwKqhhfMD7DsvlAKF9OsCnabxi41PSAKx2lS47f4V2QQbazd2KX3m5hVXI58jfJ3lGLpF1Dvw8dWHltL7LUgBsj9qhknzJ1hYQwGntDQ8easd8r9T3I7aZAMEL1cKDMJVbloiNJaPC74dChTWSJphBbm0O73LnIo3vmsz-uFOF7ucjnwS21VcrlkSlWC4cUE7oWtFSz21C5SWR3UToKNSpsX3goqSjM" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <button className="bg-primary px-6 py-3 border border-border font-bold text-white text-xs uppercase tracking-widest transition-all">
                                        Reorder
                                    </button>
                                    <button className="hover:bg-primary px-6 py-3 border border-primary/30 rounded-sm font-bold text-primary hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="group relative shadow-sm p-6 border border-primary/20 hover:border-primary/40 rounded-sm overflow-hidden transition-all">
                            <div className="absolute inset-0 noise-texture"></div>
                            <div className="z-10 relative">
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                                    <div>
                                        <span className="font-bold text-[10px] text-espresso/40 dark:text-alabaster/40 uppercase tracking-[0.2em]">Order Reference</span>
                                        <h4 className="font-medium text-primary text-lg">#SU-87652</h4>
                                        <p className="mt-1 text-espresso/60 dark:text-alabaster/60 text-xs">15th Jumada al-awwal, 1445 • November 29, 2023</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-flex items-center bg-espresso/5 px-3 py-1 rounded-full font-bold text-[10px] text-espresso/60 dark:text-alabaster/60 uppercase tracking-widest">
                                            Delivered
                                        </span>
                                        <p className="mt-2 font-serif text-espresso dark:text-alabaster text-lg italic">$520.00</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mb-6 pb-2 overflow-x-auto scrollbar-hide">
                                    <div className="flex-shrink-0 bg-background-light dark:bg-background-dark/50 p-1 border border-primary/10 w-16 h-16">
                                        <img className="grayscale-[0.3] group-hover:grayscale-0 w-full h-full object-cover transition-all" data-alt="Traditional Arabic calligraphy wall art" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTpNp6_purLKyFHe5RlCkCmNFuVS9YSlaTvhP44yJ2JV15wHhHbcuy568nvs5DEHgh8Xm4yTP2Br39o6oh8GWAtvcouacHrqfPU5CVyI1f-2v2zlq_nU271ELobckPvIK_0HlwFeyPJDwxb6dtdfV2lTA8p23-jqhcfD8fQCf0F9l2dd73rOnN3TSJ-AAgJlE8gTatYuGfsXAao0dSjfZ3B9MTiz3r_6fSzzHo0Bx85byKnZ1vsJHD4A8cgACCSuvFJHkaHrrLGxYv" />
                                    </div>
                                    <div className="flex-shrink-0 bg-background-light dark:bg-background-dark/50 p-1 border border-primary/10 w-16 h-16">
                                        <img className="grayscale-[0.3] group-hover:grayscale-0 w-full h-full object-cover transition-all" data-alt="Pure linen lifestyle products" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUzWiTW-DNc2ZIP1WLJbGdB6o2lwQHkZNswrYqEhtPYC2778xUm5Ye101QzV2XPTAYj_GdiV3B1L9p-jmUqhsUQcuBh-kFLkxx4FKTAkFRcDA61bN4GSxEf75LDH6Y5JAcF0zmq3s1oHIw3nWrhNfisapo7ynFJ81KOqI39UcFdBUkGfRN5sUmqZwcHhmbSHiU6DAq5kI-Li8GkLRHedx0E0n0OfoEOec2B7-EUvJpaqE8vgCVqh-kvmgtCVtUP46JGGwpFCJ6qJoD" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <button className="bg-primary px-6 py-3 border border-border font-bold text-white text-xs uppercase tracking-widest transition-all">
                                        Reorder
                                    </button>
                                    <button className="hover:bg-primary px-6 py-3 border border-primary/30 rounded-sm font-bold text-primary hover:text-white text-xs uppercase tracking-[0.2em] transition-colors">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-12">
                        <button className="group flex items-center gap-2 font-medium text-primary text-sm uppercase tracking-[0.3em]">
                            <span>Retrieve Older Records</span>
                            <span className="transition-transform group-hover:translate-y-1 material-icons">expand_more</span>
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
