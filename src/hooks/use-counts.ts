import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { ApiResponse, Counts } from "@/types/api";

export function useCounts() {
  return useQuery<Counts>({
    queryKey: ["counts"],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Counts>>("/counts");
      return data.data;
    },
    staleTime: 30000,
  });
}
