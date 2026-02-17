import { Plus, Edit2, Trash2, Home, Briefcase, MapPin } from "lucide-react";
import Link from "next/link";

export function AddressList() {
    const addresses = [
        {
            id: 1,
            type: "Home",
            icon: <Home className="w-4 h-4" />,
            name: "Residential Sanctuary",
            address: "123 Cedar Lane, Sukoon District, Casablanca 20000, Morocco",
            isDefault: true,
        },
        {
            id: 2,
            type: "Office",
            icon: <Briefcase className="w-4 h-4" />,
            name: "The Creative Studio",
            address: "45 Artisan Way, Medina Hub, Casablanca 20150, Morocco",
            isDefault: false,
        },
    ];

    return (
        <div className="flex-1 space-y-8">
            <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                    <h1 className="font-display font-bold text-foreground text-3xl">The Quarter</h1>
                    <p className="text-muted-foreground text-sm">Manage your delivery locations and designated sanctuaries.</p>
                </div>
                <Link
                    href="/profile/addresses/new"
                    className="flex items-center gap-2 bg-primary hover:bg-accent shadow-lg shadow-primary/20 px-6 py-3 rounded-sm font-bold text-primary-foreground text-xs uppercase tracking-widest transition-all"
                >
                    <Plus className="w-4 h-4" /> Add New Location
                </Link>
            </div>

            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                {addresses.map((addr) => (
                    <div key={addr.id} className="group relative flex flex-col gap-6 bg-background p-8 border border-border hover:border-primary/50 rounded-sm transition-colors">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="flex justify-center items-center bg-secondary/10 rounded-full ring-1 ring-primary/10 size-10 text-primary">
                                    {addr.icon}
                                </div>
                                <div>
                                    <h3 className="font-display font-bold text-foreground text-lg leading-none">{addr.name}</h3>
                                    <span className="block mt-1 text-[10px] text-muted-foreground uppercase tracking-wider">{addr.type}</span>
                                </div>
                            </div>
                            {addr.isDefault && (
                                <span className="bg-primary/10 px-2 py-1 rounded-sm font-bold text-[10px] text-primary uppercase tracking-wide">
                                    Main Location
                                </span>
                            )}
                        </div>

                        <p className="font-sans text-muted-foreground text-sm leading-relaxed">{addr.address}</p>

                        <div className="flex gap-4 mt-auto pt-4 border-border/50 border-t">
                            <button className="flex items-center gap-2 font-bold text-foreground hover:text-primary text-xs uppercase tracking-widest transition-colors">
                                <Edit2 className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button className="flex items-center gap-2 font-bold text-muted-foreground hover:text-accent text-xs uppercase tracking-widest transition-colors">
                                <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                        </div>
                    </div>
                ))}

                {/* Placeholder for empty state / dotted Add card */}
                <Link
                    href="/profile/addresses/new"
                    className="group flex flex-col justify-center items-center gap-4 hover:bg-secondary/10 py-12 border-2 border-border hover:border-primary/40 border-dashed rounded-sm text-muted-foreground hover:text-primary transition-all"
                >
                    <div className="flex justify-center items-center border border-muted-foreground group-hover:border-primary border-dashed rounded-full size-12">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-xs uppercase tracking-widest">Connect New Location</span>
                </Link>
            </div>
        </div>
    );
}
