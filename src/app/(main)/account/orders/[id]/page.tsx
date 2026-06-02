"use client";

import { Suspense, use } from "react";
import Link from "next/link";
import {
  useOrderDetail,
  useTrackOrder,
  useCancelOrder,
} from "@/hooks/use-orders";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { StatusBadge } from "@/components/atoms/status-badge";
import { Separator } from "@/components/atoms/separator";
import { Skeleton } from "@/components/atoms/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/atoms/breadcrumb";
import { ArrowLeft, Truck, XCircle } from "lucide-react";

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <Skeleton className="h-6 w-48 rounded-none" />
          <Skeleton className="h-8 w-64 rounded-none" />
          <Skeleton className="h-96 rounded-none" />
        </div>
      }
    >
      <OrderDetailPageInner params={params} />
    </Suspense>
  );
}

function OrderDetailPageInner({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: order, isLoading, error: orderError, refetch: refetchOrder } = useOrderDetail(id);
  const { data: tracking } = useTrackOrder(id);
  const cancelOrder = useCancelOrder();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-6 w-48 rounded-none" />
        <Skeleton className="h-8 w-64 rounded-none" />
        <Skeleton className="h-96 rounded-none" />
      </div>
    );
  }

  if (orderError) {
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
            Order Not Found
          </h1>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            We couldn't locate this order. It may have been removed or you may not have permission to view it.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button onClick={() => refetchOrder()} size="lg" className="gap-2">
              Try Again
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/account/orders">
                <ArrowLeft size={16} />
                Back to Orders
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) return null;

  const canCancel = ["pending", "confirmed"].includes(order.status);

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/account">Account</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/account/orders">Orders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              #{order.id.slice(0, 8).toUpperCase()}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon-sm">
            <Link href="/account/orders">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-lg font-bold font-heading">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Placed on{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <StatusBadge status={order.status} type="order" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card className="rounded-none">
            <CardHeader className="border-b">
              <CardTitle className="text-xs uppercase tracking-widest">
                Items
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border pt-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <img
                    src={
                      item.product.images[0]?.url ||
                      "https://via.placeholder.com/80x100"
                    }
                    alt={item.product.name}
                    className="h-20 w-16 object-cover"
                  />
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-sm font-medium transition-colors hover:text-primary"
                    >
                      {item.product.name}
                    </Link>
                    <p className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                      {item.product.category.name}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-sm font-bold">
                        &#৳;{Number(item.totalPrice).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {tracking?.history && tracking.history.length > 0 && (
            <Card className="rounded-none">
              <CardHeader className="border-b">
                <CardTitle className="text-xs uppercase tracking-widest">
                  Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {tracking.history.map((entry) => (
                    <div key={entry.id} className="flex gap-4">
                      <div className="relative flex flex-col items-center">
                        <div className="size-2 rounded-full bg-primary" />
                        <div className="w-px flex-1 bg-border" />
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-medium capitalize">
                          {entry.action.replace(/_/g, " ")}
                        </p>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          {new Date(entry.createdAt).toLocaleString()}
                        </p>
                        {entry.note && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {entry.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
          <Card className="rounded-none">
            <CardHeader className="border-b">
              <CardTitle className="text-xs uppercase tracking-widest">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4 text-xs">
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

          <Card className="rounded-none">
            <CardHeader className="border-b">
              <CardTitle className="text-xs uppercase tracking-widest">
                Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4 text-xs">
              <div>
                <span className="text-muted-foreground">Payment</span>
                <p className="mt-0.5 font-medium capitalize">
                  {order.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "On Air"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Payment Status</span>
                <div className="mt-0.5">
                  <StatusBadge status={order.paymentStatus} type="payment" />
                </div>
              </div>
              {order.trackingNumber && (
                <div>
                  <span className="text-muted-foreground">Tracking</span>
                  <p className="mt-0.5 font-medium">{order.trackingNumber}</p>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">Ship To</span>
                <div className="mt-0.5 space-y-0.5">
                  <p className="font-medium">{order.address.recipientName}</p>
                  <p>{order.address.phone}</p>
                  <p>
                    {order.address.address}, {order.address.area},{" "}
                    {order.address.city}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {canCancel && (
            <Button
              variant="destructive"
              className="w-full rounded-none"
              disabled={cancelOrder.isPending}
              onClick={() => cancelOrder.mutate(id)}
            >
              <XCircle className="mr-2 size-4" />
              {cancelOrder.isPending ? "Cancelling..." : "Cancel Order"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
