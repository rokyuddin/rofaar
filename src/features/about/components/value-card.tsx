import { LucideIcon } from "lucide-react";

interface ValueCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
    return (
        <div className="bg-background p-8 border border-primary/10 hover:border-primary/30 rounded text-center transition-all">
            <div className="flex justify-center items-center bg-primary shadow-lg shadow-primary/20 mx-auto mb-6 rounded-full w-16 h-16 text-white">
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="mb-4 font-bold text-primary text-xl uppercase tracking-widest">
                {title}
            </h3>
            <p className="font-sans text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>
    );
}
