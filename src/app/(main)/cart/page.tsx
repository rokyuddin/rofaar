"use client";

import { ArrowRight, LogIn, Minus, Plus, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Badge } from "@/components/atoms/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/atoms/breadcrumb";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Separator } from "@/components/atoms/separator";
import { Skeleton } from "@/components/atoms/skeleton";
import {
  useCart,
  useClearCart,
  useRemoveCartItem,
  useUpdateCartItem,
} from "@/hooks/use-cart";
import { useValidateCoupon } from "@/hooks/use-coupons";
import { useLoginPrompt } from "@/providers/login-prompt-provider";
import { useCartStore } from "@/stores/cart-store";
import { useCheckoutStore } from "@/stores/checkout-store";

interface CartPageItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: string;
  variantName?: string;
  product: {
    id: string;
    name: string;
    slug: string;
    images: { url: string }[];
    category: { name: string };
    price: string;
    finalPrice: number | null;
  };
}

export default function CartPage() {
  const { data: session } = useSession();
  const { openPrompt } = useLoginPrompt();

  // API cart (logged in)
  const {
    data: apiCartItems,
    isLoading: apiLoading,
    error: cartError,
    refetch: refetchCart,
  } = useCart();
  const updateApiItem = useUpdateCartItem();
  const removeApiItem = useRemoveCartItem();
  const clearApiCart = useClearCart();

  // Zustand cart (guest)
  const guestItems = useCartStore((s) => s.items);
  const guestUpdateQuantity = useCartStore((s) => s.updateQuantity);
  const guestRemoveItem = useCartStore((s) => s.removeItem);
  const guestClearCart = useCartStore((s) => s.clearCart);

  const isLoggedIn = !!session;
  const isLoading = isLoggedIn ? apiLoading : false;
  const cartErrorState = isLoggedIn ? cartError : null;

  // Unified cart items
  const cartItems: CartPageItem[] = isLoggedIn
    ? (apiCartItems ?? []).map((item) => ({
        id: item.id,
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price,
        variantName: item.variant?.name,
        product: {
          id: item.product.id,
          name: item.product.name,
          slug: item.product.slug,
          images: item.product.images,
          category: item.product.category,
          price: item.product.price,
          finalPrice: item.product.finalPrice,
        },
      }))
    : guestItems.map((item) => ({
        id: item.variantId,
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        price: String(item.product.finalPrice ?? item.product.price),
        product: {
          id: item.product.id,
          name: item.product.name,
          slug: item.product.slug,
          images: item.product.images,
          category: item.product.category,
          price: item.product.price,
          finalPrice: item.product.finalPrice,
        },
      }));

  const [couponCode, setCouponCode] = useState("");

  const appliedCoupon = useCheckoutStore((s) => s.coupon);
  const setAppliedCoupon = useCheckoutStore((s) => s.setCoupon);
  const clearAppliedCoupon = useCheckoutStore((s) => s.clearCoupon);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );
  const discount = appliedCoupon?.discount ?? 0;
  const total = subtotal - discount;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const validateCoupon = useValidateCoupon();

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    validateCoupon.mutate(
      { code: couponCode, subtotal },
      {
        onSuccess: (response) => {
          const coupon = response.data;
          setAppliedCoupon({ code: coupon.code, discount: coupon.discount });
        },
        onError: () => {
          clearAppliedCoupon();
        },
      },
    );
  };

  const handleQuantityChange = (
    cartItemId: string,
    currentQty: number,
    delta: number,
  ) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;

    if (isLoggedIn) {
      updateApiItem.mutate({ id: cartItemId, quantity: newQty });
    } else {
      guestUpdateQuantity(cartItemId, newQty);
    }
  };

  const handleRemoveItem = (cartItemId: string) => {
    if (isLoggedIn) {
      removeApiItem.mutate(cartItemId);
    } else {
      guestRemoveItem(cartItemId);
    }
  };

  const handleClearCart = () => {
    if (isLoggedIn) {
      clearApiCart.mutate();
    } else {
      guestClearCart();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="mb-8 h-6 w-48 rounded-none" />
          <Skeleton className="mb-4 h-8 w-64 rounded-none" />
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4 border p-4">
                  <Skeleton className="h-24 w-20 rounded-none" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32 rounded-none" />
                    <Skeleton className="h-3 w-20 rounded-none" />
                    <Skeleton className="h-6 w-24 rounded-none" />
                  </div>
                </div>
              ))}
            </div>
            <Skeleton className="h-80 rounded-none" />
          </div>
        </div>
      </div>
    );
  }

  if (cartErrorState) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Shopping Bag</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

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
                Unable to Load Cart
              </h1>
              <p className="mb-8 text-base leading-relaxed text-muted-foreground">
                We encountered an issue while loading your shopping bag. Please
                try again or continue shopping.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  onClick={() => refetchCart()}
                  size="lg"
                  className="gap-2"
                >
                  Try Again
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Shopping Bag</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag className="mb-6 size-16 text-muted-foreground" />
            <h1 className="mb-2 text-2xl font-bold font-heading">
              Your bag is empty
            </h1>
            <p className="mb-8 text-sm text-muted-foreground">
              Looks like you haven&apos;t added anything to your bag yet.
            </p>
            <Button asChild className="rounded-none">
              <Link href="/products">
                Start Shopping
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Shopping Bag</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Guest login banner */}
        {!isLoggedIn && (
          <div className="mb-6 flex items-center justify-between rounded-none border border-border bg-muted/50 p-4">
            <div className="flex items-center gap-3">
              <LogIn className="size-5 text-muted-foreground" />
              <p className="text-sm">
                <span className="font-medium">Sign in</span> to save your bag
                and check out faster.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-none"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        )}

        <div className="mb-8 flex items-end justify-between">
          <h1 className="text-3xl font-bold font-heading tracking-tight lg:text-4xl">
            Shopping Bag
          </h1>
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="rounded-none text-xs uppercase tracking-widest"
            >
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </Badge>
            {cartItems.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearCart}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-0 divide-y divide-border">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 py-6 first:pt-0 last:pb-0"
              >
                <Link
                  href={`/products/${item.product.slug}`}
                  className="relative h-28 w-24 shrink-0 overflow-hidden bg-muted"
                >
                  <img
                    src={
                      item.product.images[0]?.url ||
                      "https://via.placeholder.com/200x240"
                    }
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="text-sm font-medium leading-tight transition-colors hover:text-primary"
                      >
                        {item.product.name}
                      </Link>
                      {item.variantName && (
                        <p className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                          {item.variantName}
                        </p>
                      )}
                      <p className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                        {item.product.category.name}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={isLoggedIn ? removeApiItem.isPending : false}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="size-3" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0 border border-border">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.quantity,
                            -1,
                          )
                        }
                        disabled={
                          item.quantity <= 1 ||
                          (isLoggedIn ? updateApiItem.isPending : false)
                        }
                      >
                        <Minus className="size-3" />
                      </Button>
                      <span className="w-8 text-center text-xs font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity, 1)
                        }
                        disabled={isLoggedIn ? updateApiItem.isPending : false}
                      >
                        <Plus className="size-3" />
                      </Button>
                    </div>
                    <span className="text-sm font-bold">
                      &#৳;
                      {(Number(item.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="border p-6">
              <h2 className="mb-6 text-sm font-bold uppercase tracking-widest">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">
                    &#৳;{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-muted-foreground">
                    Calculated at checkout
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-medium">
                      -&#৳;{discount.toLocaleString()}
                    </span>
                  </div>
                )}

                <Separator className="my-2" />

                <div className="flex justify-between text-sm font-bold">
                  <span>Total</span>
                  <span>&#৳;{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="rounded-none flex-1"
                    disabled={!!appliedCoupon}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-none shrink-0"
                    onClick={handleApplyCoupon}
                    disabled={
                      validateCoupon.isPending ||
                      !!appliedCoupon ||
                      !couponCode.trim()
                    }
                  >
                    {validateCoupon.isPending ? "Checking..." : "Apply"}
                  </Button>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-600">
                      &quot;{appliedCoupon.code}&quot; applied
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        clearAppliedCoupon();
                        setCouponCode("");
                      }}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                )}
                {validateCoupon.isError && (
                  <p className="text-xs text-destructive">
                    Invalid coupon code
                  </p>
                )}
              </div>

              <div className="mt-6 space-y-3">
                {isLoggedIn ? (
                  <Button asChild className="w-full rounded-none" size="lg">
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    className="w-full rounded-none"
                    size="lg"
                    onClick={openPrompt}
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                )}
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-none"
                  size="lg"
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
