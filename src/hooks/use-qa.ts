import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Question } from "@/types/api";

export function useProductQuestions(productId: string) {
  return useQuery<Question[]>({
    queryKey: ["questions", productId],
    queryFn: async () => {
      const { data } = await apiClient.get<{ data: Question[] }>(
        `/qa/product/${productId}`,
      );
      return data.data ?? [];
    },
    enabled: !!productId,
  });
}

export function useAskQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { productId: string; question: string }) =>
      apiClient.post("/qa", payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["questions", variables.productId],
      });
    },
  });
}
