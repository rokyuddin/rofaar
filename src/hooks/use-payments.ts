import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { Payment } from "@/types/api";

export function useSubmitPayment(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { provider: string; transactionId?: string }) =>
      apiClient.post(`/payments/orders/${orderId}/pay`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments", orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useOrderPayments(orderId: string) {
  return useQuery<Payment[]>({
    queryKey: ["payments", orderId],
    queryFn: () => apiClient.get(`/payments/orders/${orderId}/payment`),
    enabled: !!orderId,
  });
}
