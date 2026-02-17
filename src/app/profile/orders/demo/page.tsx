import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";
import { ProfileSidebar } from "@/features/profile/components/profile-sidebar";
import { OrderDetail } from "@/features/profile/components/order-detail";
import { IconCheck, IconHome, IconMap, IconMessageCircle, IconPackage, IconPlaneDeparture, IconTruckDelivery, IconWallet } from "@tabler/icons-react";

export default function OrderPage() {
    return (
        <>
            <Header />
            <main className="flex lg:flex-row flex-col gap-16 mx-auto px-6 py-12 lg:py-20 max-w-[1440px]">
                <ProfileSidebar />
                {/* <OrderDetail /> */}
                <main className="mx-auto px-4 md:px-8 py-10 max-w-6xl">
                    <div className="flex md:flex-row flex-col justify-between md:items-end gap-4 mb-8 pb-6 border-primary/10 border-b">
                        <div>
                            <span className="block mb-1 font-semibold text-primary/60 text-xs uppercase tracking-widest">Purchase Confirmation</span>
                            <h2 className="font-display font-bold text-stone-900 dark:text-stone-50 text-3xl">Order #SU-10924</h2>
                            <p className="mt-1 text-stone-500 dark:text-stone-400 italic">Placed on October 24, 2023</p>
                        </div>
                        <div className="flex gap-3">
                            <a className="flex items-center hover:bg-primary/5 px-4 py-2 border border-primary/30 rounded-lg font-medium text-primary text-sm transition-colors" href="#">
                                Download Invoice
                            </a>
                            <button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 px-6 py-2 rounded-lg font-medium text-white text-sm transition-all">
                                Track Package
                            </button>
                        </div>
                    </div>
                    <section className="shadow-sm mb-12 border border-primary/10 rounded-xl overflow-hidden" id="tracking-section">
                        <div className="flex md:flex-row flex-col justify-between md:items-center gap-4 bg-alabaster/50 p-6 border-primary/10 border-b">
                            <h3 className="flex items-center font-bold text-espresso text-lg">
                                <IconMap />
                                Live Delivery Tracking
                            </h3>
                            <button className="group flex items-center gap-2 bg-primary hover:bg-primary/90 shadow-md px-5 py-2.5 rounded-lg font-display font-medium text-alabaster text-white text-sm active:scale-95 transition-all noise-button active:transform">
                                <IconMessageCircle />
                                <span>Contact Courier</span>
                            </button>
                        </div>
                        <div className="flex lg:flex-row flex-col">
                            <div className="relative border-primary/10 lg:border-r border-b lg:border-b-0 w-full lg:w-2/3 h-[450px] overflow-hidden map-bg">
                                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 400">
                                    <path className="opacity-40 dashed-route" d="M 100 300 Q 250 150 400 200 T 700 100" fill="none" stroke="#9d4e15" stroke-width="2"></path>
                                </svg>
                                <div className="bottom-[100px] left-[100px] absolute flex flex-col items-center -translate-x-1/2 translate-y-1/2">
                                    <div className="bg-stone-400 mb-1 rounded-full w-3 h-3"></div>
                                    <span className="font-bold text-[10px] text-stone-400 uppercase tracking-tighter">Casablanca Hub</span>
                                </div>
                                <div className="group top-[195px] left-[415px] absolute -translate-x-1/2 -translate-y-1/2">
                                    <div className="relative flex justify-center items-center">
                                        <div className="absolute bg-primary/20 rounded-full w-12 h-12 animate-ping"></div>
                                        <div className="z-10 flex justify-center items-center bg-primary shadow-xl border-2 border-white rounded-full w-10 h-10">
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icons-tabler-outline icon icon-tabler icon-tabler-truck-delivery"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /><path d="M3 9l4 0" /></svg> */}
                                            <IconTruckDelivery className="text-white" size={20} />
                                        </div>
                                    </div>
                                    <div className="bg-espresso mt-2 px-2 py-1 rounded-md font-medium text-[10px] text-white whitespace-nowrap">In Transit: Route P-12</div>
                                </div>
                                <div className="top-[100px] right-[100px] absolute flex flex-col items-center -translate-y-1/2 translate-x-1/2">
                                    <div className="flex justify-center items-center bg-espresso shadow-lg border-2 border-white rounded-full w-8 h-8">
                                        <IconHome className="text-white" size={20} />
                                    </div>
                                    <span className="bg-white/80 shadow-sm mt-2 px-2 py-0.5 rounded font-bold text-[10px] text-espresso uppercase tracking-tighter">Your Heirloom</span>
                                </div>
                                <div className="right-4 bottom-4 left-4 absolute flex sm:flex-row flex-col justify-between items-start sm:items-end gap-3">
                                    <div className="bg-white/90 shadow-sm backdrop-blur-sm p-4 border border-primary/10 rounded-lg max-w-sm">
                                        <p className="mb-1 font-bold text-[10px] text-primary uppercase tracking-widest">Current Status</p>
                                        <p className="font-bold text-espresso text-sm">Nearing Marrakesh Distribution Center</p>
                                        <p className="mt-1 text-stone-500 text-xs italic">Est. delivery: Tomorrow by 6:00 PM</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-alabaster/30 p-8 w-full lg:w-1/3">
                                <h4 className="mb-8 font-bold text-primary text-xs uppercase tracking-widest">Journey Updates</h4>
                                <div className="relative space-y-8">
                                    <div className="top-1 bottom-1 left-[15px] absolute bg-stone-200 dark:bg-stone-700 w-[1px]"></div>
                                    <div className="relative flex gap-4">
                                        <div className="z-10 flex flex-shrink-0 justify-center items-center bg-primary rounded-full ring-4 ring-alabaster w-8 h-8">
                                            <IconCheck className="text-white" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-stone-900 dark:text-stone-100 text-sm">Order Processed</p>
                                            <p className="text-stone-500 text-xs italic">Oct 25, 2023 • 09:12 AM</p>
                                            <p className="mt-1 text-stone-400 text-xs">Verified and prepared at Casablanca Boutique.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-4">
                                        <div className="z-10 flex flex-shrink-0 justify-center items-center bg-primary rounded-full ring-4 ring-alabaster w-8 h-8">
                                            <IconTruckDelivery className="text-white" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-stone-900 dark:text-stone-100 text-sm">In Transit</p>
                                            <p className="text-stone-500 text-xs italic">Oct 27, 2023 • 14:45 PM</p>
                                            <p className="mt-1 text-stone-400 text-xs">Departed sorting facility in Casablanca.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-4 bg-primary/5 -ml-[1px] py-2 pl-4 border-primary/40 border-l-2 rounded-r-lg">
                                        <div className="z-10 flex flex-shrink-0 justify-center items-center bg-primary shadow-sm rounded-full ring-4 ring-alabaster w-8 h-8">
                                            <IconTruckDelivery className="text-white" size={20} />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-bold text-stone-900 dark:text-stone-100 text-sm">Out for Delivery</p>
                                                    <p className="font-medium text-primary text-xs italic">In Progress</p>
                                                </div>
                                            </div>
                                            <p className="mt-2 text-stone-400 text-xs italic">Expected delivery today before sunset.</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-4 opacity-30">
                                        <div className="z-10 flex flex-shrink-0 justify-center items-center bg-stone-200 rounded-full ring-4 ring-alabaster w-8 h-8">
                                            <IconPackage className="text-white" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-stone-600 dark:text-stone-400 text-sm">Delivered</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="shadow-sm mb-12 p-8 border border-primary/5 rounded-xl">
                        <div className="relative flex justify-between items-center">
                            <div className="top-1/2 left-0 z-0 absolute bg-stone-200 w-full h-0.5 -translate-y-1/2"></div>
                            <div className="top-1/2 left-0 z-0 absolute bg-primary w-2/3 h-0.5 -translate-y-1/2"></div>
                            <div className="z-10 relative flex flex-col items-center">
                                <div className="flex justify-center items-center bg-primary rounded-full ring-8 ring-white w-10 h-10 text-white">
                                    <IconCheck className="text-white" size={20} />
                                </div>
                                <span className="mt-3 font-display font-bold text-primary text-sm">Ordered</span>
                                <span className="text-stone-400 text-xs italic">Oct 24</span>
                            </div>
                            <div className="z-10 relative flex flex-col items-center">
                                <div className="flex justify-center items-center bg-primary rounded-full ring-8 ring-white w-10 h-10 text-white">
                                    <IconCheck className="text-white" size={20} />
                                </div>
                                <span className="mt-3 font-display font-bold text-primary text-sm">Processed</span>
                                <span className="text-stone-400 text-xs italic">Oct 25</span>
                            </div>
                            <div className="z-10 relative flex flex-col items-center">
                                <div className="flex justify-center items-center bg-primary shadow-lg shadow-primary/30 rounded-full ring-8 ring-white w-10 h-10 text-white">
                                    <IconTruckDelivery className="text-white" size={20} />
                                </div>
                                <span className="mt-3 font-display font-bold text-primary text-sm">Shipped</span>
                                <span className="text-stone-400 text-xs italic">Oct 27</span>
                            </div>
                            <div className="z-10 relative flex flex-col items-center">
                                <div className="flex justify-center items-center bg-stone-200 rounded-full ring-8 ring-white w-10 h-10 text-stone-400">
                                    <IconPackage className="text-stone-400" size={20} />
                                </div>
                                <span className="mt-3 font-display font-medium text-stone-400 text-sm">Delivered</span>
                                <span className="text-stone-400 text-xs italic">Pending</span>
                            </div>
                        </div>
                    </div>
                    <div className="gap-10 grid grid-cols-1 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <h3 className="mb-6 pb-3 border-primary/10 border-b font-display font-bold text-lg">Items Purchased</h3>
                            <div className="group flex items-start gap-6 hover:bg-white p-4 border border-transparent hover:border-primary/5 rounded-xl transition-all">
                                <div className="flex-shrink-0 bg-stone-100 shadow-sm border border-primary/10 rounded-lg w-24 md:w-32 h-32 md:h-40 overflow-hidden">
                                    <img alt="Handcrafted Prayer Beads" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv62NTtpi_VyyFqcHJa90U8hoFVNHFe9ZrSxURIjJn82TwNuSxiUc_gEYAiHI5imrF7U925u5UtVeG2sXuWGg2qrhrP4ZLQzo3q7ONuXtQqVTHcgBDfBGpLJcC_Iak-3lOF8gttyB8bEAd4GnjUrOYw0lJErabCTzWbGkh6DwsaVWJmYkRVQQUaCAAICr1uiCcRDn86Lza8mpgnKY44HS66iZYGgf2CQPGYs5q4P5Kuh3QgG5mbiKE-rMvokax9Z3X6VVGhmHoBvd4" />
                                </div>
                                <div className="flex md:flex-row flex-col flex-grow md:justify-between md:items-center py-2">
                                    <div>
                                        <h4 className="mb-1 font-display font-bold text-stone-900 text-xl">Hand-Carved Oud Beads</h4>
                                        <p className="mb-2 text-stone-500 text-sm">Artisan: Al-Khalili Workshops</p>
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="bg-primary/10 px-2 py-1 rounded font-semibold text-primary text-xs uppercase tracking-wider">33 Beads</span>
                                            <span className="text-stone-400">Qty: 1</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 text-right">
                                        <p className="font-bold text-primary text-xl">$124.00</p>
                                        <button className="mt-1 font-medium text-primary/60 hover:text-primary text-xs underline underline-offset-4">Review Item</button>
                                    </div>
                                </div>
                            </div>
                            <div className="group flex items-start gap-6 hover:bg-white p-4 border border-transparent hover:border-primary/5 rounded-xl transition-all">
                                <div className="flex-shrink-0 bg-stone-100 shadow-sm border border-primary/10 rounded-lg w-24 md:w-32 h-32 md:h-40 overflow-hidden">
                                    <img alt="Handmade Ceramic Incense Burner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE1ghlXhoF7sw_1BBvIDsyGfOa2cF6XGrcAjSJrmwoz0vlFCuHyYwR2j3jUBxzu6U7cLZRIuCYHlEz0yov8hDVUWAwdfaCYvHhDJW6zErl7heZLLilWdWLI74TysmZxlgG0dCTBw8CbaURwvqHQRSeS8OYJJTRFp_DmdIT1q3fSaxGewk6nOpMMkm0la8XgoSdhKR5khLlIQ6U7aD69fpcfPgNPWtJjZK5h28U9pno94IR2ykZFgP29wUEwtLv6bf24zlY0WkonK9p" />
                                </div>
                                <div className="flex md:flex-row flex-col flex-grow md:justify-between md:items-center py-2">
                                    <div>
                                        <h4 className="mb-1 font-display font-bold text-stone-900 text-xl">Glazed Terracotta Burner</h4>
                                        <p className="mb-2 text-stone-500 text-sm">Collection: Desert Oasis</p>
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="bg-primary/10 px-2 py-1 rounded font-semibold text-primary text-xs uppercase tracking-wider">Sandstone</span>
                                            <span className="text-stone-400">Qty: 2</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 text-right">
                                        <p className="font-bold text-primary text-xl">$86.00</p>
                                        <button className="mt-1 font-medium text-primary/60 hover:text-primary text-xs underline underline-offset-4">Review Item</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="bg-white shadow-sm p-6 border border-primary/20 rounded-xl">
                                <h3 className="flex items-center mb-6 font-display font-bold text-espresso text-lg">
                                    <IconWallet className="mr-2 text-primary text-xl" />
                                    Order Summary
                                </h3>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-stone-500">Subtotal</span>
                                        <span className="font-bold">$255.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-500">Shipping (Express)</span>
                                        <span className="font-bold">$18.50</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-500">Estimated Tax</span>
                                        <span className="font-bold">$12.75</span>
                                    </div>
                                    <div className="flex justify-between pt-4 border-primary/10 border-t">
                                        <span className="font-bold text-lg">Total</span>
                                        <span className="font-display font-bold text-primary text-2xl">$286.25</span>
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 border-primary/10 border-t">
                                    <p className="text-stone-400 text-xs text-center italic">Thank you for supporting heritage artisans.</p>
                                </div>
                            </div>
                            <div className="gap-6 grid grid-cols-1">
                                <div className="bg-primary/5 p-6 border border-primary/10 rounded-xl">
                                    <h4 className="mb-4 font-display font-bold text-primary text-xs uppercase tracking-widest">Shipping Address</h4>
                                    <div className="space-y-1 text-stone-700 text-sm">
                                        <p className="font-bold text-stone-900">Zahra Al-Amir</p>
                                        <p>42 Heritage Way</p>
                                        <p>Apartment 4B</p>
                                        <p>Marrakesh, 40000</p>
                                        <p>Morocco</p>
                                        <p className="pt-2 text-stone-500 italic">+212 524 123456</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 border border-stone-200 rounded-xl">
                                <div className="flex justify-center items-center bg-stone-100 rounded-lg w-12 h-12 text-primary">
                                    <IconPlaneDeparture />
                                </div>
                                <div>
                                    <p className="text-stone-500 text-xs">Shipping Method</p>
                                    <p className="font-bold text-sm">Global Express Artisan</p>
                                    <p className="text-stone-400 text-xs">Tracking: #UM-99281-MA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto mt-16 pt-12 border-primary/10 border-t max-w-2xl text-center">
                        <h4 className="mb-4 font-display font-bold text-xl italic">Need assistance with your heirloom?</h4>
                        <p className="mb-8 text-stone-500 leading-relaxed">Our concierges are available to help you with care instructions, tracking inquiries, or any concerns regarding your order.</p>
                        <div className="flex sm:flex-row flex-col justify-center gap-4">
                            <a className="bg-espresso hover:opacity-90 px-8 py-3 rounded-lg font-medium text-white transition-opacity" href="#">Contact Concierge</a>
                            <a className="hover:bg-stone-100 px-8 py-3 border border-stone-300 rounded-lg font-medium transition-colors" href="#">Returns &amp; Exchanges</a>
                        </div>
                    </div>
                </main>
            </main>
            <Footer />
        </>
    );
}
