import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "@/types/api";

export interface CartStoreItem {
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
}

interface CartStore {
  items: CartStoreItem[];
  addItem: (product: Product, variantId: string, quantity?: number) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, variantId: string, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.variantId === variantId,
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.variantId === variantId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { productId: product.id, variantId, quantity, product },
            ],
          };
        });
      },

      updateQuantity: (variantId: string, quantity: number) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === variantId ? { ...item, quantity } : item,
          ),
        }));
      },

      removeItem: (variantId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== variantId),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) =>
            sum +
            Number(item.product.finalPrice ?? item.product.price) *
              item.quantity,
          0,
        );
      },
    }),
    {
      name: "rofaar:cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
