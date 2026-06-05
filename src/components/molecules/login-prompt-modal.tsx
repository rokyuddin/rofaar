"use client";

import { Check, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginPromptModal({ isOpen, onClose }: LoginPromptModalProps) {
  const cartCount = useCartStore((s) => s.items.length);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const totalItems = cartCount + wishlistCount;

  if (totalItems === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Don&apos;t lose your items!</DialogTitle>
          <DialogDescription>
            {"You have "}
            {cartCount > 0 &&
              `${cartCount} item${cartCount > 1 ? "s" : ""} in your bag`}
            {cartCount > 0 && wishlistCount > 0 && " and "}
            {wishlistCount > 0 &&
              `${wishlistCount} item${wishlistCount > 1 ? "s" : ""} in your wishlist`}
            {". Sign in to save them permanently and check out faster."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {cartCount > 0 && (
            <div className="flex items-center gap-3 text-sm">
              <ShoppingBag className="size-4 text-primary" />
              <span>
                {cartCount} item{cartCount > 1 ? "s" : ""} in your bag
              </span>
            </div>
          )}
          {wishlistCount > 0 && (
            <div className="flex items-center gap-3 text-sm">
              <Heart className="size-4 text-primary" />
              <span>
                {wishlistCount} item{wishlistCount > 1 ? "s" : ""} saved to
                wishlist
              </span>
            </div>
          )}
          <div className="border-t border-border pt-3 space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="size-3" />
              <span>Save your bag for later</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="size-3" />
              <span>Track your orders</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="size-3" />
              <span>Faster checkout</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="size-3" />
              <span>Get exclusive deals</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button asChild className="w-full">
            <Link href="/login" onClick={onClose}>
              Sign In
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/register" onClick={onClose}>
              Create an Account
            </Link>
          </Button>
          <button
            type="button"
            onClick={onClose}
            className="mt-1 text-center text-xs text-muted-foreground hover:text-foreground"
          >
            Maybe later
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
