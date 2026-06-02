import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { ApiResponse, HealthStatus } from "@/types/api";

export const useHealthCheck = () => {
  return useQuery({
    queryKey: ["health"],
    staleTime: 30000,
    queryFn: async () => {
      const { data } =
        await apiClient.get<ApiResponse<HealthStatus>>("/health");
      return data;
    },
  });
};
