import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { ApiResponse, Category } from "@/types/api";

export const useCategories = (
  params: { page?: number; limit?: number; search?: string } = {},
) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Category[]>>(
        "/categories",
        {
          params,
        },
      );
      return data;
    },
  });
};

export const useCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["categories", slug],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Category>>(
        `/categories/${slug}`,
      );
      return data.data;
    },
    enabled: !!slug,
  });
};
