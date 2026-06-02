import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import type { ApiResponse, ContactForm, ContactResponse } from "@/types/api";

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: async (payload: ContactForm) => {
      const { data } = await apiClient.post<ApiResponse<ContactResponse>>(
        "/contact",
        payload,
      );
      return data;
    },
  });
};
