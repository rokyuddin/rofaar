import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/atoms/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Icon className="mb-4 size-10 text-muted-foreground" strokeWidth={1.5} />
      <h3 className="font-heading text-sm font-medium">{title}</h3>
      <p className="mt-1 max-w-xs text-xs text-muted-foreground">
        {description}
      </p>
      {action && (
        <Button asChild variant="outline" size="sm" className="mt-4">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}
