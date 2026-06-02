import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { ApiResponse, UploadResponse } from "@/types/api";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await apiClient.post<ApiResponse<UploadResponse>>(
        "/uploads/image",
        formData,
        {
          headers: { "Content-Type": undefined },
        },
      );
      return data;
    },
  });
};
