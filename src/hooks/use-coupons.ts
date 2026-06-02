import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { CouponValidation } from "@/types/api";

export function useValidateCoupon() {
  return useMutation({
    mutationFn: (payload: { code: string; subtotal: number }) =>
      apiClient.post<CouponValidation>("/coupons/validate", payload),
  });
}
