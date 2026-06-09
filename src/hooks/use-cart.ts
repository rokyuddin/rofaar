import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { CartItem } from "@/types/api";

export interface AddToCartPayload {
  variantId: string;
  quantity: number;
}

export interface UpdateCartPayload {
  id: string;
  quantity: number;
}

export function useCart() {
  return useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await apiClient.get<{ data: CartItem[] }>("/cart");
      return data.data ?? [];
    },
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddToCartPayload) => apiClient.post("/cart", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCartPayload) =>
      apiClient.put(`/cart/${payload.id}`, { quantity: payload.quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/cart/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient.delete("/cart"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
