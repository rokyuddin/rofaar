import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { ApiResponse, ShippingZone } from "@/types/api";

export const useShippingZones = () => {
  return useQuery({
    queryKey: ["shipping-zones"],
    queryFn: async () => {
      const { data } =
        await apiClient.get<ApiResponse<ShippingZone[]>>("/shipping");
      return data;
    },
  });
};
