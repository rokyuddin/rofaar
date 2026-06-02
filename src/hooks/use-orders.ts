import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Order, OrderTracking } from "@/types/api";

export function usePlaceOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      addressId: string;
      paymentMethod: string;
      couponCode?: string;
    }) => apiClient.post("/orders", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useMyOrders() {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: () => apiClient.get("/orders"),
  });
}

export function useOrderDetail(id: string) {
  return useQuery<Order>({
    queryKey: ["orders", id],
    queryFn: () => apiClient.get(`/orders/${id}`),
    enabled: !!id,
  });
}

export function useTrackOrder(id: string) {
  return useQuery<OrderTracking>({
    queryKey: ["orders", id, "track"],
    queryFn: () => apiClient.get(`/orders/${id}/track`),
    enabled: !!id,
  });
}

export function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.patch(`/orders/${id}/cancel`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
