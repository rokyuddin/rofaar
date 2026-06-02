import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import {
  ApiResponse,
  AutocompleteResult,
  Product,
  SortOption,
} from "@/types/api";

export const useAutocomplete = (q: string) => {
  return useQuery({
    queryKey: ["search", "autocomplete", q],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<AutocompleteResult[]>>(
        "/search/autocomplete",
        {
          params: { q },
        },
      );
      return data;
    },
    enabled: q.length > 0,
  });
};

export const useSearch = (
  params: {
    q?: string;
    minPrice?: number;
    maxPrice?: number;
    categoryId?: string;
    brandId?: string;
    sortBy?: SortOption;
    page?: number;
    limit?: number;
  } = {},
) => {
  return useQuery({
    queryKey: ["search", params],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Product[]>>("/search", {
        params,
      });
      return data;
    },
  });
};
