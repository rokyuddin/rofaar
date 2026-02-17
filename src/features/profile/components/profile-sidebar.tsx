"use client";

import {
    IconDashboard,
    IconHeart,
    IconHistory,
    IconLogout,
    IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";

export function ProfileSidebar() {
    return (
        <aside className="space-y-8 w-full lg:w-80 shrink-0">
            <div className="top-32 sticky space-y-8">
                <div className="flex flex-col items-center bg-surface p-8 ring-border-subtle/50 rounded-sm ring-1 text-center">
                    <div className="flex justify-center items-center bg-primary/10 mb-4 rounded-full ring-2 ring-primary/20 size-20">
                        <span className="text-primary text-4xl material-symbols-outlined">
                            person
                        </span>
                    </div>
                    <h2 className="font-display font-bold text-xl">
                        Ahmad Al-Mansour
                    </h2>
                    <p className="mt-1 text-muted-foreground text-xs uppercase tracking-widest">
                        Level 2 Traveller
                    </p>
                </div>
                <nav className="space-y-1">
                    <Link
                        className="group flex items-center gap-3 bg-surface-light px-4 py-3 border-primary border-l-4 rounded-r-sm font-medium text-primary"
                        href="/profile"
                    >
                        <IconDashboard />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        className="group flex items-center gap-3 hover:bg-surface-light px-4 py-3 rounded-sm text-muted-foreground transition-all duration-200 hover:"
                        href="/profile/orders"
                    >
                        <IconHistory />
                        <span>Order History</span>
                    </Link>
                    <Link
                        className="group flex items-center gap-3 hover:bg-surface-light px-4 py-3 rounded-sm text-muted-foreground transition-all duration-200 hover:"
                        href="/profile/wishlist"
                    >
                        <IconHeart />
                        <span>Wishlist</span>
                    </Link>
                    <Link
                        className="group flex items-center gap-3 hover:bg-surface-light px-4 py-3 rounded-sm text-muted-foreground transition-all duration-200 hover:"
                        href="/profile/settings"
                    >
                        <IconSettings />
                        <span>Settings</span>
                    </Link>
                    <button
                        type="button"
                        className="flex items-center gap-3 hover:bg-surface-light mt-4 px-4 py-3 rounded-sm w-full text-muted-foreground hover:text-red-600 text-left transition-all duration-200"
                    >
                        <IconLogout />
                        <span>Sign Out</span>
                    </button>
                </nav>
            </div>
        </aside>
    );
}
