import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import type { CartItem, WishlistItem } from "@/types/api";

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
      let cartSynced = 0;
      let wishlistSynced = 0;

      // Sync cart items
      if (cartItems.length > 0) {
        try {
          // Fetch existing API cart for merge
          const { data: existingCart } = await apiClient.get<{
            data: CartItem[];
          }>("/cart");
          const existingCartItems = existingCart.data ?? [];
          const existingCartMap = new Map(
            existingCartItems.map((item) => [item.productId, item]),
          );

          for (const storeItem of cartItems) {
            const existing = existingCartMap.get(storeItem.productId);
            if (existing) {
              // Merge: sum quantities
              const newQty = existing.quantity + storeItem.quantity;
              await apiClient.put(`/cart/${existing.id}`, {
                quantity: newQty,
              });
            } else {
              // Add new item
              await apiClient.post("/cart", {
                productId: storeItem.productId,
                quantity: storeItem.quantity,
              });
            }
            cartSynced++;
          }
          useCartStore.getState().clearCart();
          queryClient.invalidateQueries({ queryKey: ["cart"] });
        } catch (error) {
          console.error("Failed to sync cart:", error);
        }
      }

      // Sync wishlist items
      if (wishlistItems.length > 0) {
        try {
          // Fetch existing API wishlist for dedup
          const { data: existingWishlist } = await apiClient.get<{
            data: WishlistItem[];
          }>("/wishlist");
          const existingWishlistIds = new Set(
            (existingWishlist.data ?? []).map((item) => item.productId),
          );

          for (const storeItem of wishlistItems) {
            if (!existingWishlistIds.has(storeItem.productId)) {
              await apiClient.post("/wishlist", {
                productId: storeItem.productId,
              });
              wishlistSynced++;
            }
          }
          useWishlistStore.getState().clear();
          queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        } catch (error) {
          console.error("Failed to sync wishlist:", error);
        }
      }

      const totalSynced = cartSynced + wishlistSynced;
      if (totalSynced > 0) {
        toast.success(
          `${totalSynced} item${totalSynced > 1 ? "s" : ""} saved to your account!`,
        );
      }
    };

    syncItems();
  }, [status, queryClient]);
}
