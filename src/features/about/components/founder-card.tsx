interface FounderCardProps {
    name: string;
    role: string;
    quote: string;
    imageSrc: string;
    imageAlt: string;
}

export function FounderCard({
    name,
    role,
    quote,
    imageSrc,
    imageAlt,
}: FounderCardProps) {
    return (
        <div className="group flex @md/main:flex-row flex-col items-center @md/main:items-start gap-8">
            <div className="shadow-sm grayscale group-hover:grayscale-0 rounded-none w-48 h-64 overflow-hidden transition-all duration-700 shrink-0">
                <img
                    alt={imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 transform"
                    src={imageSrc}
                />
            </div>
            <div className="pt-4 @md/main:text-left text-center">
                <h4 className="mb-2 font-display text-espresso dark:text-white text-2xl italic">
                    {name}
                </h4>
                <p className="mb-4 font-sans font-bold text-primary text-xs uppercase tracking-widest">
                    {role}
                </p>
                <p className="font-display text-espresso/70 dark:text-stone-400 italic leading-relaxed">
                    &quot;{quote}&quot;
                </p>
            </div>
        </div>
    );
}
