import Link from "next/link";
import { Search, ShoppingBag, UserCircle, Menu } from "lucide-react";
import { Logo } from "../molecules/logo";

export function Header() {
    return (
        <header className="top-0 z-40 sticky bg-background/95 backdrop-blur-sm border-border border-b w-full transition-all duration-300">
            <div className="flex justify-between items-center mx-auto px-6 max-w-[1440px] h-20">
                {/* Left: Mobile Menu Trigger */}
                <button
                    type="button"
                    className="lg:hidden text-foreground hover:text-primary transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Center: Logo */}
                <Link className="group flex items-center gap-2" href="/">
                    <Logo />
                </Link>

                {/* Right: Navigation & Actions */}
                <div className="hidden lg:flex items-center gap-12">
                    <nav className="flex gap-8">
                        <Link
                            className="pb-0.5 border-transparent hover:border-primary border-b-2 font-medium hover:text-primary text-sm transition-colors"
                            href="/shop"
                        >
                            Shop
                        </Link>
                        <Link
                            className="pb-0.5 border-transparent hover:border-primary border-b-2 font-medium hover:text-primary text-sm transition-colors"
                            href="/journal"
                        >
                            Journal
                        </Link>
                        <Link
                            className="pb-0.5 border-transparent hover:border-primary border-b-2 font-medium hover:text-primary text-sm transition-colors"
                            href="/about"
                        >
                            About
                        </Link>
                    </nav>

                    <div className="bg-border-subtle w-px h-6" />

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            aria-label="Search"
                            className="hover:text-primary transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            aria-label="Cart"
                            className="group relative hover:text-primary transition-colors"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            <span className="-top-1 -right-1 absolute flex justify-center items-center bg-primary opacity-0 group-hover:opacity-100 rounded-full w-4 h-4 font-bold text-[10px] text-white transition-opacity">
                                2
                            </span>
                        </button>
                        <button
                            type="button"
                            aria-label="Profile"
                            className="hover:text-primary transition-colors"
                        >
                            <UserCircle className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Right: Mobile Cart */}
                <button
                    type="button"
                    className="lg:hidden hover:text-primary transition-colors"
                >
                    <ShoppingBag className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
}
