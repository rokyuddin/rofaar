import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import type { ApiResponse, AuthResponse, User } from "@/types/api";

// ─── Registration ────────────────────────────────────────────────────────────

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      phone: string;
      password: string;
      email?: string;
    }) => {
      const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
        "/auth/register",
        payload,
      );
      return data;
    },
  });
};

// ─── Login ───────────────────────────────────────────────────────────────────

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({
      phone,
      password,
    }: {
      phone: string;
      password: string;
    }) => {
      const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        { phone, password },
      );
      return data;
    },
  });
};

// ─── Profile ─────────────────────────────────────────────────────────────────

export const useProfile = () => {
  return useQuery({
    queryKey: ["auth", "profile"],
    queryFn: async () => {
      const { data } = await apiClient.get<ApiResponse<User>>("/auth/me");
      return data.data;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { name?: string; email?: string }) => {
      const { data } = await apiClient.patch<ApiResponse<void>>(
        "/auth/profile",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
      toast.success("Profile updated");
    },
  });
};

// ─── Password ────────────────────────────────────────────────────────────────

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async ({
      oldPassword,
      newPassword,
    }: {
      oldPassword: string;
      newPassword: string;
    }) => {
      const { data } = await apiClient.post<ApiResponse<void>>(
        "/auth/change-password",
        {
          oldPassword,
          newPassword,
        },
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (phone: string) => {
      const { data } = await apiClient.post<ApiResponse<void>>(
        "/auth/forgot-password",
        { phone },
      );
      return data;
    },
  });
};

export const useVerifyForgotOtp = () => {
  return useMutation({
    mutationFn: async ({ phone, otp }: { phone: string; otp: string }) => {
      const { data } = await apiClient.post<
        ApiResponse<{ resetToken: string }>
      >("/auth/forgot-password/verify-otp", {
        phone,
        otp,
      });
      return data;
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({
      resetToken,
      newPassword,
    }: {
      resetToken: string;
      newPassword: string;
    }) => {
      const { data } = await apiClient.post<ApiResponse<void>>(
        "/auth/forgot-password/reset",
        {
          resetToken,
          newPassword,
        },
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Password reset successful");
    },
  });
};

// ─── Token ───────────────────────────────────────────────────────────────────

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async (refreshToken: string) => {
      const { data } = await apiClient.post<
        ApiResponse<{ token: string; refreshToken: string }>
      >("/auth/refresh", {
        refreshToken,
      });
      return data;
    },
  });
};

// ─── Logout ──────────────────────────────────────────────────────────────────

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (refreshToken: string) => {
      const { data } = await apiClient.post<ApiResponse<void>>("/auth/logout", {
        refreshToken,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.clear();
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      }
    },
  });
};
