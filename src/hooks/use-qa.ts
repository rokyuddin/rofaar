import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { ApiResponse, Question } from "@/types/api";

export function useProductQuestions(productId: string) {
  return useQuery<Question[]>({
    queryKey: ["questions", productId],
    queryFn: async () => {
      const res = await apiClient.get<ApiResponse<Question[]>>(
        `/qa/product/${productId}`,
      );
      return res.data?.data ?? [];
    },
    enabled: !!productId,
  });
}

export function useAskQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { productId: string; question: string }) => {
      const res = await apiClient.post<ApiResponse<Question>>("/qa", payload);
      return res.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["questions", variables.productId],
      });
    },
  });
}
