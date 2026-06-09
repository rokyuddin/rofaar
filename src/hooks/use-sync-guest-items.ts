import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import type { CartSyncResponse, WishlistSyncResponse } from "@/types/api";

export function useSyncGuestItems() {
  const { status } = useSession();
  const queryClient = useQueryClient();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (status !== "authenticated" || hasSynced.current) return;

    const syncItems = async () => {
      const cartItems = useCartStore.getState().items;
      const wishlistItems = useWishlistStore.getState().items;

      if (cartItems.length === 0 && wishlistItems.length === 0) {
        hasSynced.current = true;
        return;
      }

      hasSynced.current = true;
      const messages: string[] = [];

      // Sync cart
      if (cartItems.length > 0) {
        try {
          const { data: res } = await apiClient.post<{ data: CartSyncResponse }>(
            "/cart/sync",
            {
              items: cartItems.map((item) => ({
                variantId: item.variantId,
                quantity: item.quantity,
              })),
            },
          );
          const result = res.data;
          useCartStore.getState().clearCart();
          queryClient.invalidateQueries({ queryKey: ["cart"] });

          if (result.synced.length > 0) {
            messages.push(
              `${result.synced.length} cart item${result.synced.length > 1 ? "s" : ""} saved`,
            );
          }
          if (result.skipped.length > 0) {
            messages.push(
              `${result.skipped.length} cart item${result.skipped.length > 1 ? "s" : ""} skipped`,
            );
          }
        } catch (error) {
          console.error("Failed to sync cart:", error);
        }
      }

      // Sync wishlist
      if (wishlistItems.length > 0) {
        try {
          const { data: res } = await apiClient.post<{
            data: WishlistSyncResponse;
          }>("/wishlist/sync", {
            items: wishlistItems.map((item) => ({
              productId: item.productId,
            })),
          });
          const result = res.data;
          useWishlistStore.getState().clear();
          queryClient.invalidateQueries({ queryKey: ["wishlist"] });

          if (result.synced.length > 0) {
            messages.push(
              `${result.synced.length} wishlist item${result.synced.length > 1 ? "s" : ""} saved`,
            );
          }
          if (result.skipped.length > 0) {
            messages.push(
              `${result.skipped.length} wishlist item${result.skipped.length > 1 ? "s" : ""} skipped`,
            );
          }
        } catch (error) {
          console.error("Failed to sync wishlist:", error);
        }
      }

      if (messages.length > 0) {
        toast.success(messages.join(". ") + "!");
      }
    };

    syncItems();
  }, [status, queryClient]);
}
