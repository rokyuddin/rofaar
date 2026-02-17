import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    linkText: string;
}

export function ServiceCard({
    icon: Icon,
    title,
    description,
    linkText,
}: ServiceCardProps) {
    return (
        <div className="group flex flex-col items-center bg-white/40 shadow-sm hover:shadow-xl backdrop-blur-sm p-12 border border-espresso/5 hover:border-primary/20 text-center transition-all hover:-translate-y-1 duration-500 cursor-pointer">
            <div className="flex justify-center items-center mb-8 w-16 h-16 text-primary group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-10 h-10" />
            </div>
            <h3 className="mb-4 font-display text-espresso text-2xl">
                {title}
            </h3>
            <p className="mb-6 font-display text-espresso/60 leading-relaxed">
                {description}
            </p>
            <span className="pb-1 border-primary/0 group-hover:border-primary border-b font-bold text-primary text-xs uppercase tracking-widest transition-all duration-300">
                {linkText}
            </span>
        </div>
    );
}
