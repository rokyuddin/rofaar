import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { ApiResponse, Review } from "@/types/api";

export function useProductReviews(productId: string) {
  return useQuery<Review[]>({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<Review[]>>(
        `/reviews/product/${productId}`,
      );
      return res.data?.data ?? [];
    },
    enabled: !!productId,
  });
}

export function useWriteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      productId: string;
      rating: number;
      comment?: string;
    }) => {
      const res = await apiClient.post<ApiResponse<Review>>(
        "/reviews",
        payload,
      );
      return res.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.productId],
      });
    },
    onError: () => {
      // handled by the component
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      id: string;
      productId: string;
      rating: number;
      comment?: string;
    }) => {
      const res = await apiClient.put<ApiResponse<Review>>(
        `/reviews/${payload.id}`,
        {
          rating: payload.rating,
          comment: payload.comment,
        },
      );
      return res.data;
    },
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
    mutationFn: async (payload: { id: string; productId: string }) => {
      const res = await apiClient.delete<ApiResponse<void>>(
        `/reviews/${payload.id}`,
      );
      return res.data;
    },
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
    mutationFn: async (productId: string) => {
      const res = await apiClient.post<ApiResponse<void>>(
        `/reviews/${reviewId}/helpful`,
      );
      return res.data;
    },
    onSuccess: (_data, productId) => {
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
    },
  });
}
