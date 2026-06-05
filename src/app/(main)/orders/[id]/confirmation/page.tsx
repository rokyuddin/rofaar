"use client";

import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  MapPin,
  Package,
} from "lucide-react";
import Link from "next/link";
import { Suspense, use } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/atoms/breadcrumb";
import { Button } from "@/components/atoms/button";
import { Card, CardContent } from "@/components/atoms/card";
import { Separator } from "@/components/atoms/separator";
import { Skeleton } from "@/components/atoms/skeleton";
import { StatusBadge } from "@/components/atoms/status-badge";
import { useOrderDetail } from "@/hooks/use-orders";

export default function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <Skeleton className="h-6 w-48 rounded-none" />
          <Skeleton className="h-64 rounded-none" />
        </div>
      }
    >
      <OrderConfirmationInner params={params} />
    </Suspense>
  );
}

function OrderConfirmationInner({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: order, isLoading, error } = useOrderDetail(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-6 w-48 rounded-none" />
        <Skeleton className="h-64 rounded-none" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="mb-4 text-3xl font-bold font-heading">
            Order not found
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">
            We couldn&apos;t locate that order. It may still be processing — try
            again in a moment.
          </p>
          <Button asChild size="lg">
            <Link href="/account/orders">View All Orders</Link>
          </Button>
        </div>
      </div>
    );
  }

  const shortId = order.id.slice(0, 8).toUpperCase();

  return (
    <div className="space-y-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/account/orders">Orders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Confirmation</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-9" />
        </div>
        <h1 className="mb-2 text-3xl font-bold font-heading tracking-tight lg:text-4xl">
          Order placed!
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Thanks for shopping with us. We&apos;ll send a confirmation to your
          phone shortly. Your order number is{" "}
          <span className="font-bold text-foreground">#{shortId}</span>.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card className="rounded-none">
            <CardContent className="flex items-center gap-3 pt-6">
              <Package className="size-5 shrink-0 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Order
                </p>
                <p className="text-sm font-bold">#{shortId}</p>
              </div>
              <StatusBadge status={order.status} type="order" />
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center gap-3">
                <MapPin className="size-5 shrink-0 text-muted-foreground" />
                <p className="text-xs font-bold uppercase tracking-widest">
                  Shipping to
                </p>
              </div>
              <div className="space-y-0.5 text-sm">
                <p className="font-medium">{order.address.recipientName}</p>
                <p className="text-muted-foreground">{order.address.phone}</p>
                <p className="text-muted-foreground">
                  {order.address.address}, {order.address.area},{" "}
                  {order.address.city}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-none">
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center gap-3">
                <CreditCard className="size-5 shrink-0 text-muted-foreground" />
                <p className="text-xs font-bold uppercase tracking-widest">
                  Payment
                </p>
              </div>
              <p className="text-sm font-medium capitalize">
                {order.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "On-Air Payment"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Status:{" "}
                <span className="capitalize">{order.paymentStatus}</span>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <Card className="rounded-none">
            <CardContent className="space-y-3 pt-6 text-xs">
              <p className="text-xs font-bold uppercase tracking-widest">
                Order summary
              </p>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {item.product.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-bold">
                      &#৳;{Number(item.totalPrice).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  &#৳;{Number(order.subtotal).toLocaleString()}
                </span>
              </div>
              {Number(order.discountAmount) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">
                    -&#৳;{Number(order.discountAmount).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">
                  &#৳;{Number(order.shippingFee).toLocaleString()}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm font-bold">
                <span>Total</span>
                <span>&#৳;{Number(order.total).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-col gap-3">
            <Button asChild size="lg" className="w-full rounded-none">
              <Link href={`/account/orders/${order.id}`}>
                View Order Details
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full rounded-none"
            >
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
