import { Badge } from "@/components/atoms/badge";

interface StatusBadgeProps {
  status: string;
  type: "order" | "payment" | "refund";
}

const statusVariantMap: Record<
  string,
  React.ComponentProps<typeof Badge>["variant"]
> = {
  pending: "secondary",
  confirmed: "secondary",
  processing: "default",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
  returned: "destructive",
  paid: "default",
  unpaid: "destructive",
  approved: "default",
  rejected: "destructive",
  completed: "default",
};

export function StatusBadge({ status, type: _type }: StatusBadgeProps) {
  const variant = statusVariantMap[status] ?? "secondary";
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return <Badge variant={variant}>{label}</Badge>;
}
