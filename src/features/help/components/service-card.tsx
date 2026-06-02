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
    <div className="group p-8 border border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
      <div className="mb-6 text-primary">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="mb-4 font-display font-bold text-espresso text-xl">
        {title}
      </h3>
      <p className="mb-6 font-sans text-espresso/60 text-sm leading-relaxed">
        {description}
      </p>
      <a
        href="#"
        className="inline-block font-sans font-bold text-primary text-xs uppercase tracking-widest transition-colors hover:text-accent"
      >
        {linkText}
      </a>
    </div>
  );
}
