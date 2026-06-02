import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { ApiResponse, Brand } from "@/types/api";

export const useBrands = (
  params: { page?: number; limit?: number; search?: string } = {},
) => {
  return useQuery({
    queryKey: ["brands", params],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Brand[]>>("/brands", {
        params,
      });
      return data;
    },
  });
};

export const useBrandBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["brands", slug],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Brand>>(
        `/brands/${slug}`,
      );
      return data.data;
    },
    enabled: !!slug,
  });
};
