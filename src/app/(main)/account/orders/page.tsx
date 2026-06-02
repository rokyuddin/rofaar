"use client";

import Link from "next/link";
import { useMyOrders } from "@/hooks/use-orders";
import { Button } from "@/components/atoms/button";
import { Card, CardContent, CardTitle } from "@/components/atoms/card";
import { EmptyState } from "@/components/atoms/empty-state";
import { Separator } from "@/components/atoms/separator";
import { StatusBadge } from "@/components/atoms/status-badge";
import { Skeleton } from "@/components/atoms/skeleton";
import { Package } from "lucide-react";

export default function OrdersPage() {
  const { data: orders, isLoading, error: ordersError, refetch: refetchOrders } = useMyOrders();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48 rounded-none" />
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-none" />
        ))}
      </div>
    );
  }

  if (ordersError) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-8 flex items-center gap-4">
            <div className="h-px w-16 bg-destructive/40" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-destructive">
              Error
            </span>
            <div className="h-px w-16 bg-destructive/40" />
          </div>
          <h1 className="mb-4 text-3xl font-bold font-heading text-foreground">
            Unable to Load Orders
          </h1>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            We encountered an issue while loading your order history. Please try
            again.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button onClick={() => refetchOrders()} size="lg" className="gap-2">
              Try Again
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No orders yet"
        description="When you place an order, it will appear here."
        action={{ label: "Start Shopping", href: "/products" }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Order History
      </h2>
      {orders.map((order) => (
        <Link key={order.id} href={`/account/orders/${order.id}`}>
          <Card className="rounded-none transition-colors hover:bg-muted/50">
            <CardContent className="pt-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-sm">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </CardTitle>
                    <StatusBadge status={order.status} type="order" />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">
                    &#৳;{Number(order.total).toLocaleString()}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex gap-2 overflow-x-auto pb-1">
                {order.items.slice(0, 4).map((item) => (
                  <img
                    key={item.id}
                    src={
                      item.product.images[0]?.url ||
                      "https://via.placeholder.com/48x60"
                    }
                    alt={item.product.name}
                    className="h-12 w-10 shrink-0 object-cover"
                  />
                ))}
                {order.items.length > 4 && (
                  <div className="flex h-12 w-10 shrink-0 items-center justify-center bg-muted text-[10px] text-muted-foreground">
                    +{order.items.length - 4}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
