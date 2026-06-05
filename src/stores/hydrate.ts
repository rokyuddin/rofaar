import { useCartStore } from "./cart-store";
import { useCheckoutStore } from "./checkout-store";
import { useWishlistStore } from "./wishlist-store";

let hydrated = false;

export function hydrateStores() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  useCartStore.persist.rehydrate();
  useCheckoutStore.persist.rehydrate();
  useWishlistStore.persist.rehydrate();
}
