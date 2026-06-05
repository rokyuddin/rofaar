import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { WishlistItem } from "@/types/api";

export function useWishlist(options?: { enabled?: boolean }) {
  return useQuery<WishlistItem[]>({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const { data } = await apiClient.get<{ data: WishlistItem[] }>(
        "/wishlist",
      );
      return data.data ?? [];
    },
    enabled: options?.enabled ?? true,
  });
}

export function useAddToWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      apiClient.post("/wishlist", { productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
}

export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/wishlist/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
}

export function useMoveToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiClient.post(`/wishlist/move/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useMoveAllToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient.post("/wishlist/move"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
