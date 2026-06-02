import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { ApiResponse, Banner } from "@/types/api";

export const useBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<Banner[]>>("/banners");
      return data;
    },
  });
};
