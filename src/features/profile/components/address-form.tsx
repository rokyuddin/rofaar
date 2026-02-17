import { MapPin, Globe, Check } from "lucide-react";

export function AddressForm() {
    return (
        <div className="flex-1 space-y-8">
            <div className="flex flex-col gap-2">
                <h1 className="font-display font-bold text-3xl">Map a New Location</h1>
                <p className="text-muted-foreground text-sm">Define the coordinates for your next delivery from the Souq.</p>
            </div>

            <div className="space-y-8 bg-white p-8 lg:p-12 border border-border rounded-sm max-w-2xl">
                <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="ml-1 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Location Label</label>
                        <input
                            className="bg-surface/50 p-3 border border-border focus:border-primary rounded-sm focus:outline-none w-full text-sm transition-colors"
                            placeholder="e.g. Home Sanctuary, Riverside Office"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="ml-1 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Resident Name</label>
                        <input
                            className="bg-surface/50 p-3 border border-border focus:border-primary rounded-sm focus:outline-none w-full text-sm transition-colors"
                            placeholder="Ahmad Al-Mansour"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="ml-1 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Street Address</label>
                    <input
                        className="bg-surface/50 p-3 border border-border focus:border-primary rounded-sm focus:outline-none w-full text-sm transition-colors"
                        placeholder="123 Cedar Lane, Sukoon District"
                    />
                </div>

                <div className="gap-6 grid grid-cols-2 md:grid-cols-3">
                    <div className="space-y-2 col-span-1">
                        <label className="ml-1 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">City</label>
                        <input
                            className="bg-surface/50 p-3 border border-border focus:border-primary rounded-sm focus:outline-none w-full text-sm transition-colors"
                            placeholder="Casablanca"
                        />
                    </div>
                    <div className="space-y-2 col-span-1">
                        <label className="ml-1 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Zip Code</label>
                        <input
                            className="bg-surface/50 p-3 border border-border focus:border-primary rounded-sm focus:outline-none w-full text-sm transition-colors"
                            placeholder="20000"
                        />
                    </div>
                    <div className="space-y-2 col-span-2 md:col-span-1">
                        <label className="ml-1 font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Country</label>
                        <div className="relative">
                            <select className="bg-surface/50 p-3 border border-border focus:border-primary rounded-sm focus:outline-none w-full text-sm transition-colors appearance-none">
                                <option>Morocco</option>
                                <option>Turkey</option>
                                <option>UAE</option>
                            </select>
                            <Globe className="top-3.5 right-3 absolute w-4 h-4 text-muted-foreground pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 pt-4">
                    <label className="group flex items-center gap-3 w-fit cursor-pointer">
                        <div className="flex justify-center items-center bg-white border border-border group-hover:border-primary rounded size-5 transition-colors">
                            <Check className="opacity-0 group-has-checked:opacity-100 w-3.5 h-3.5 text-primary" />
                            <input type="checkbox" className="peer hidden" defaultChecked />
                        </div>
                        <span className="font-bold text-xs uppercase tracking-widest">Set as Main Sanctuary</span>
                    </label>
                </div>

                <div className="flex gap-4 pt-4">
                    <button className="flex-1 bg-primary hover:bg-accent shadow-lg shadow-primary/20 py-4 rounded-sm font-bold text-white uppercase tracking-widest transition-all">
                        Confirm Mapping
                    </button>
                    <button className="hover:bg-surface px-8 border border-border rounded-sm font-bold text-muted-foreground uppercase tracking-widest transition-all">
                        Discard
                    </button>
                </div>
            </div>
        </div>
    );
}
