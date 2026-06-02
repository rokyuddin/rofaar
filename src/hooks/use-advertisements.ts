import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { ApiResponse, Advertisement } from "@/types/api";

export const useAdvertisements = (position?: string) => {
  return useQuery({
    queryKey: ["advertisements", position],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Advertisement[]>>(
        "/advertisements",
        {
          params: position ? { position } : undefined,
        },
      );
      return data;
    },
  });
};
