import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { ApiResponse, Product } from "@/types/api";

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: "newest" | "price-low" | "price-high" | "popular";
}

export const useProducts = (filters: ProductFilters = {}) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Product[]>>(
        "/products",
        {
          params: filters,
        },
      );
      return data;
    },
  });
};

export const useInfiniteProducts = (
  filters: Omit<ProductFilters, "page"> = {},
) => {
  return useInfiniteQuery({
    queryKey: ["products", "infinite", filters],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await apiClient.get<ApiResponse<Product[]>>(
        "/products",
        {
          params: { ...filters, page: pageParam },
        },
      );
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination) return undefined;
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
};

export const useProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Product>>(
        `/products/${slug}`,
      );
      return data.data;
    },
    enabled: !!slug,
  });
};

export const useRelatedProducts = (productId: string) => {
  return useQuery({
    queryKey: ["products", "related", productId],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Product[]>>(
        `/products/${productId}/related`,
      );
      return data;
    },
    enabled: !!productId,
  });
};

export const useRecentlyViewed = () => {
  return useQuery({
    queryKey: ["products", "recently-viewed"],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Product[]>>(
        "/products/recently-viewed",
      );
      return data;
    },
  });
};
