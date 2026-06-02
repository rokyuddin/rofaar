"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { useAddresses, useCreateAddress } from "@/hooks/use-addresses";
import { useShippingZones } from "@/hooks/use-shipping";
import { usePlaceOrder } from "@/hooks/use-orders";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Textarea } from "@/components/atoms/textarea";
import { Separator } from "@/components/atoms/separator";
import { Skeleton } from "@/components/atoms/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/atoms/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/atoms/breadcrumb";
import type { Address, ShippingMethod } from "@/types/api";
import {
  MapPin,
  Truck,
  CreditCard,
  Check,
  Plus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: cartItems, isLoading: cartLoading, error: cartError, refetch: refetchCart } = useCart();
  const { data: addresses, isLoading: addressesLoading } = useAddresses();
  const { data: shippingData, isLoading: shippingLoading } = useShippingZones();
  const placeOrder = usePlaceOrder();
  const createAddress = useCreateAddress();

  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "on_air">("cod");
  const [expandedSection, setExpandedSection] = useState<
    "address" | "shipping" | "payment"
  >("address");
  const [showNewAddressDialog, setShowNewAddressDialog] = useState(false);
  const [newAddress, setNewAddress] = useState({
    recipientName: "",
    phone: "",
    altPhone: "",
    address: "",
    city: "",
    area: "",
    label: "Home",
    isDefault: false,
  });

  const subtotal =
    cartItems?.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    ) ?? 0;

  const shippingZone = shippingData?.data?.[0];
  const shippingMethods: ShippingMethod[] =
    shippingZone?.methods?.filter((m: ShippingMethod) => m.isActive) ?? [];
  const selectedMethod = shippingMethods.find(
    (m: ShippingMethod) => m.id === selectedShippingMethod,
  );
  const shippingCost = selectedMethod ? Number(selectedMethod.cost) : 0;
  const total = subtotal + shippingCost;

  const selectedAddress = addresses?.find((a) => a.id === selectedAddressId);

  const handleCreateAddress = () => {
    createAddress.mutate(newAddress, {
      onSuccess: (created) => {
        setSelectedAddressId(created.data.id);
        setShowNewAddressDialog(false);
        setNewAddress({
          recipientName: "",
          phone: "",
          altPhone: "",
          address: "",
          city: "",
          area: "",
          label: "Home",
          isDefault: false,
        });
      },
    });
  };

  const handlePlaceOrder = () => {
    if (!selectedAddressId || !selectedShippingMethod) return;
    placeOrder.mutate(
      {
        addressId: selectedAddressId,
        paymentMethod,
        couponCode: undefined,
      },
      {
        onSuccess: (order) => {
          router.push(`/orders/${order.data.id}/confirmation`);
        },
      },
    );
  };

  const isLoading = cartLoading || addressesLoading || shippingLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="mb-8 h-6 w-48 rounded-none" />
          <Skeleton className="mb-4 h-8 w-48 rounded-none" />
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-none" />
              ))}
            </div>
            <Skeleton className="h-80 rounded-none" />
          </div>
        </div>
      </div>
    );
  }

  if (cartError) {
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
                <BreadcrumbPage>Checkout</BreadcrumbPage>
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
                Unable to Load Checkout
              </h1>
              <p className="mb-8 text-base leading-relaxed text-muted-foreground">
                We encountered an issue while loading your checkout details.
                Please try again or return to your cart.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button onClick={() => refetchCart()} size="lg" className="gap-2">
                  Try Again
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link href="/cart">Back to Cart</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
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
                <BreadcrumbPage>Checkout</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="mb-2 text-lg font-medium font-heading">
              Your cart is empty
            </p>
            <p className="mb-6 text-sm text-muted-foreground">
              Add some items before checking out.
            </p>
            <Button asChild className="rounded-none">
              <Link href="/products">Browse Products</Link>
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
              <BreadcrumbLink href="/cart">Shopping Bag</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="mb-8 text-3xl font-bold font-heading tracking-tight lg:text-4xl">
          Checkout
        </h1>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-0 divide-y divide-border">
            {/* Address Section */}
            <CheckoutSection
              number={1}
              title="Address"
              icon={MapPin}
              isExpanded={expandedSection === "address"}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === "address" ? "shipping" : "address",
                )
              }
              isCompleted={!!selectedAddressId}
            >
              <div className="space-y-3">
                {addressesLoading ? (
                  [...Array(2)].map((_, i) => (
                    <Skeleton key={i} className="h-28 rounded-none" />
                  ))
                ) : (
                  <>
                    {addresses?.map((address) => (
                      <div
                        key={address.id}
                        className={`cursor-pointer border p-4 transition-colors ${
                          selectedAddressId === address.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-muted-foreground/30"
                        }`}
                        onClick={() => {
                          setSelectedAddressId(address.id);
                          setExpandedSection("shipping");
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                                {address.label || "Address"}
                              </span>
                              {address.isDefault && (
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm font-medium">
                              {address.recipientName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {address.phone}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {address.address}, {address.area}, {address.city}
                            </p>
                          </div>
                          {selectedAddressId === address.id && (
                            <div className="flex size-5 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                              <Check className="size-3" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => setShowNewAddressDialog(true)}
                      className="flex w-full items-center justify-center gap-2 border border-dashed border-border p-4 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      <Plus className="size-4" />
                      Add New Address
                    </button>
                  </>
                )}
              </div>
            </CheckoutSection>

            {/* Shipping Section */}
            <CheckoutSection
              number={2}
              title="Shipping"
              icon={Truck}
              isExpanded={expandedSection === "shipping"}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === "shipping" ? "payment" : "shipping",
                )
              }
              isCompleted={!!selectedShippingMethod}
              disabled={!selectedAddressId}
            >
              <RadioGroup
                value={selectedShippingMethod}
                onValueChange={(value) => {
                  setSelectedShippingMethod(value);
                  setExpandedSection("payment");
                }}
                className="space-y-3"
              >
                {shippingMethods.map((method: ShippingMethod) => (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-center justify-between border p-4 transition-colors ${
                      selectedShippingMethod === method.id
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={method.id} />
                      <div>
                        <p className="text-sm font-medium">{method.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {method.estimatedDays} business days
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold">
                      &#৳;{Number(method.cost).toLocaleString()}
                    </span>
                  </label>
                ))}
              </RadioGroup>
            </CheckoutSection>

            {/* Payment Section */}
            <CheckoutSection
              number={3}
              title="Payment"
              icon={CreditCard}
              isExpanded={expandedSection === "payment"}
              onToggle={() =>
                setExpandedSection(
                  expandedSection === "payment" ? "payment" : "payment",
                )
              }
              isCompleted={false}
              disabled={!selectedShippingMethod}
            >
              <RadioGroup
                value={paymentMethod}
                onValueChange={(v) => setPaymentMethod(v as "cod" | "on_air")}
                className="space-y-3"
              >
                <label
                  className={`flex cursor-pointer items-center gap-3 border p-4 transition-colors ${
                    paymentMethod === "cod"
                      ? "border-primary bg-primary/5"
                      : "hover:border-muted-foreground/30"
                  }`}
                >
                  <RadioGroupItem value="cod" />
                  <div>
                    <p className="text-sm font-medium">Cash on Delivery</p>
                    <p className="text-xs text-muted-foreground">
                      Pay when your order arrives
                    </p>
                  </div>
                </label>
                <label
                  className={`flex cursor-pointer items-center gap-3 border p-4 transition-colors ${
                    paymentMethod === "on_air"
                      ? "border-primary bg-primary/5"
                      : "hover:border-muted-foreground/30"
                  }`}
                >
                  <RadioGroupItem value="on_air" />
                  <div>
                    <p className="text-sm font-medium">On-Air Payment</p>
                    <p className="text-xs text-muted-foreground">
                      Pay via mobile banking or card
                    </p>
                  </div>
                </label>
              </RadioGroup>
            </CheckoutSection>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="border p-6">
              <h2 className="mb-6 text-sm font-bold uppercase tracking-widest">
                Your Order
              </h2>

              <div className="max-h-60 space-y-3 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-16 w-14 shrink-0 overflow-hidden bg-muted">
                      <img
                        src={
                          item.product.images[0]?.url ||
                          "https://via.placeholder.com/120x140"
                        }
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 items-start justify-between">
                      <div>
                        <p className="text-xs font-medium leading-tight">
                          {item.product.name}
                        </p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-xs font-bold">
                        &#৳;
                        {(Number(item.price) * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">
                    &#৳;{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {selectedMethod
                      ? `&#৳;${Number(selectedMethod.cost).toLocaleString()}`
                      : "—"}
                  </span>
                </div>

                <Separator className="my-2" />

                <div className="flex justify-between text-sm font-bold">
                  <span>Total</span>
                  <span>&#৳;{total.toLocaleString()}</span>
                </div>
              </div>

              <Button
                className="mt-6 w-full rounded-none"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={
                  !selectedAddressId ||
                  !selectedShippingMethod ||
                  placeOrder.isPending
                }
              >
                {placeOrder.isPending ? "Placing Order..." : "Place Order"}
              </Button>

              {placeOrder.isError && (
                <p className="mt-2 text-center text-xs text-destructive">
                  Failed to place order. Please try again.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* New Address Dialog */}
      <Dialog
        open={showNewAddressDialog}
        onOpenChange={setShowNewAddressDialog}
      >
        <DialogContent className="rounded-none sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Add New Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Label</Label>
                <select
                  value={newAddress.label}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, label: e.target.value })
                  }
                  className="h-8 w-full rounded-none border border-input bg-transparent px-2.5 text-xs outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Recipient Name</Label>
                <Input
                  value={newAddress.recipientName}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      recipientName: e.target.value,
                    })
                  }
                  placeholder="Full name"
                  className="rounded-none"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input
                  value={newAddress.phone}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                  placeholder="01XXXXXXXXX"
                  className="rounded-none"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Alt Phone (optional)</Label>
                <Input
                  value={newAddress.altPhone}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, altPhone: e.target.value })
                  }
                  placeholder="01XXXXXXXXX"
                  className="rounded-none"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Address</Label>
              <Textarea
                value={newAddress.address}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, address: e.target.value })
                }
                placeholder="House No, Road, Street, Building..."
                className="rounded-none"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>City</Label>
                <Input
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  placeholder="e.g. Dhaka"
                  className="rounded-none"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Area</Label>
                <Input
                  value={newAddress.area}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, area: e.target.value })
                  }
                  placeholder="e.g. Banani"
                  className="rounded-none"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-none"
              onClick={() => setShowNewAddressDialog(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-none"
              onClick={handleCreateAddress}
              disabled={
                createAddress.isPending ||
                !newAddress.recipientName ||
                !newAddress.phone ||
                !newAddress.address ||
                !newAddress.city ||
                !newAddress.area
              }
            >
              {createAddress.isPending ? "Saving..." : "Save Address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CheckoutSection({
  number,
  title,
  icon: Icon,
  isExpanded,
  onToggle,
  isCompleted,
  disabled,
  children,
}: {
  number: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  isExpanded: boolean;
  onToggle: () => void;
  isCompleted: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`py-6 ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 text-left"
        disabled={disabled}
      >
        <div
          className={`flex size-8 shrink-0 items-center justify-center text-xs font-bold ${
            isCompleted
              ? "bg-primary text-primary-foreground"
              : "border border-border text-muted-foreground"
          }`}
        >
          {isCompleted ? <Check className="size-4" /> : number}
        </div>
        <div className="flex flex-1 items-center gap-2">
          <Icon className="size-4 text-muted-foreground" />
          <span className="text-sm font-bold uppercase tracking-widest">
            {title}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="size-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="size-4 text-muted-foreground" />
        )}
      </button>
      {isExpanded && <div className="mt-4 pl-11">{children}</div>}
    </div>
  );
}
