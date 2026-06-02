import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Refund } from "@/types/api";

export function useRequestRefund() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { orderId: string; reason: string }) =>
      apiClient.post("/refunds", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["refunds"] });
    },
  });
}

export function useMyRefunds() {
  return useQuery<Refund[]>({
    queryKey: ["refunds"],
    queryFn: () => apiClient.get("/refunds/my"),
  });
}
