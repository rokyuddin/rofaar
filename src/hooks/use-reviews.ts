import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Review } from "@/types/api";

export function useProductReviews(productId: string) {
  return useQuery<Review[]>({
    queryKey: ["reviews", productId],
    queryFn: () => apiClient.get(`/reviews/product/${productId}`),
    enabled: !!productId,
  });
}

export function useWriteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      productId: string;
      rating: number;
      comment?: string;
    }) => apiClient.post("/reviews", payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.productId],
      });
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: {
      id: string;
      productId: string;
      rating: number;
      comment?: string;
    }) =>
      apiClient.put(`/reviews/${payload.id}`, {
        rating: payload.rating,
        comment: payload.comment,
      }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.productId],
      });
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: string; productId: string }) =>
      apiClient.delete(`/reviews/${payload.id}`),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.productId],
      });
    },
  });
}

export function useMarkHelpful(reviewId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      apiClient.post(`/reviews/${reviewId}/helpful`),
    onSuccess: (_data, productId) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
  });
}
