import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "@/types/api";

export interface WishlistStoreItem {
  productId: string;
  product: Product;
}

interface WishlistStore {
  items: WishlistStoreItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  hasItem: (productId: string) => boolean;
  clear: () => void;
  getCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        set((state) => {
          const exists = state.items.some(
            (item) => item.productId === product.id,
          );
          if (exists) return state;
          return {
            items: [...state.items, { productId: product.id, product }],
          };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      toggleItem: (product: Product) => {
        set((state) => {
          const exists = state.items.some(
            (item) => item.productId === product.id,
          );
          if (exists) {
            return {
              items: state.items.filter(
                (item) => item.productId !== product.id,
              ),
            };
          }
          return {
            items: [...state.items, { productId: product.id, product }],
          };
        });
      },

      hasItem: (productId: string) => {
        return get().items.some((item) => item.productId === productId);
      },

      clear: () => {
        set({ items: [] });
      },

      getCount: () => {
        return get().items.length;
      },
    }),
    {
      name: "rofaar:wishlist",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
