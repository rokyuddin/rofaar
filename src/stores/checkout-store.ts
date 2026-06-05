import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface AppliedCoupon {
  code: string;
  discount: number;
}

interface CheckoutStore {
  coupon: AppliedCoupon | null;
  setCoupon: (coupon: AppliedCoupon) => void;
  clearCoupon: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      coupon: null,
      setCoupon: (coupon) => set({ coupon }),
      clearCoupon: () => set({ coupon: null }),
    }),
    {
      name: "rofaar:checkout",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
