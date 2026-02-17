import { Filter } from "lucide-react";

const categories = ["Prayer Mats", "Journals & Planners", "Misbaha (Tasbih)", "Attar & Scents"];
const materials = ["Genuine Leather", "Natural Wool", "Olive Wood", "Brass"];
const origins = ["Turkey", "Morocco", "Indonesia"];

export function FilterSidebar() {
    return (
        <aside className="hidden lg:block top-20 z-20 sticky bg-secondary border-border border-r w-72 h-[calc(100vh-80px)] overflow-y-auto shrink-0">
            <div className="flex flex-col gap-8 p-8">
                {/* Sidebar Header */}
                <div className="flex flex-col gap-2">
                    <h2 className="font-display font-medium text-xl">Filters</h2>
                    <p className="font-bold text-muted-foreground text-xs uppercase tracking-wider">
                        Refine your search
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-display font-medium text-base">Category</h3>
                    <div className="flex flex-col gap-3">
                        {categories.map((item) => (
                            <label key={item} className="group flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="border-gray-300 rounded focus:ring-primary/20 size-4 text-primary transition duration-150 ease-in-out accent-primary cursor-pointer"
                                />
                                <span className="group-hover:text-primary text-sm transition-colors">
                                    {item}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Material Filter */}
                <div className="flex flex-col gap-4 pt-4 border-border/50 border-t">
                    <h3 className="font-display font-medium text-base">Material</h3>
                    <div className="flex flex-col gap-3">
                        {materials.map((item) => (
                            <label key={item} className="group flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="border-gray-300 rounded focus:ring-primary/20 size-4 text-primary transition duration-150 ease-in-out accent-primary cursor-pointer"
                                />
                                <span className="group-hover:text-primary text-sm transition-colors">
                                    {item}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Origin Filter */}
                <div className="flex flex-col gap-4 pt-4 border-border/50 border-t">
                    <h3 className="font-display font-medium text-base">Origin</h3>
                    <div className="flex flex-col gap-3">
                        {origins.map((item) => (
                            <label key={item} className="group flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="border-gray-300 rounded focus:ring-primary/20 size-4 text-primary transition duration-150 ease-in-out accent-primary cursor-pointer"
                                />
                                <span className="group-hover:text-primary text-sm transition-colors">
                                    {item}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Reset Button */}
                <button className="hover:bg-primary mt-4 px-4 py-2.5 border border-primary/30 rounded w-full font-bold text-primary hover:text-white text-xs uppercase tracking-widest transition-all duration-300">
                    Reset Filters
                </button>
            </div>
        </aside>
    );
}
