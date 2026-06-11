"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import type { ApiResponse, AuthResponse, User } from "@/types/api";

function getErrorMessage(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response
  ) {
    const data = (error.response as { data: ApiResponse<unknown> }).data;
    if (data?.message) return data.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

// ─── OTP ─────────────────────────────────────────────────────────────────────

export const useSendRegistrationOtp = () => {
  return useMutation({
    mutationFn: async (phone: string) => {
      const { data } = await apiClient.post<ApiResponse<void>>(
        "/auth/register/send-otp",
        { phone },
      );
      return data;
    },
    onSuccess: () => {
      toast.success("OTP sent to your phone number.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useVerifyRegistrationOtp = () => {
  return useMutation({
    mutationFn: async ({ phone, otp }: { phone: string; otp: string }) => {
      const { data } = await apiClient.post<ApiResponse<{ token: string }>>(
        "/auth/register/verify-otp",
        { phone, otp },
      );
      return data;
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

// ─── Registration ────────────────────────────────────────────────────────────

export const useCompleteRegistration = () => {
  return useMutation({
    mutationFn: async (payload: {
      token: string;
      name: string;
      email: string;
      password: string;
    }) => {
      const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
        "/auth/register/complete",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Registration completed successfully!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
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
    onSuccess: () => {
      toast.success("Welcome back!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

// ─── Forgot Password ───────────────────────────────────────────────────────

export const useSendForgotPasswordOtp = () => {
  return useMutation({
    mutationFn: async (phone: string) => {
      const { data } = await apiClient.post<ApiResponse<void>>(
        "/auth/forgot-password",
        { phone },
      );
      return data;
    },
    onSuccess: () => {
      toast.success(
        "If an account exists, a password reset OTP has been sent.",
      );
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

export const useVerifyForgotPasswordOtp = () => {
  return useMutation({
    mutationFn: async ({ phone, otp }: { phone: string; otp: string }) => {
      const { data } = await apiClient.post<
        ApiResponse<{ resetToken: string }>
      >("/auth/forgot-password/verify-otp", { phone, otp });
      return data;
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
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
        { resetToken, newPassword },
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Password has been reset successfully.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
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
    onError: (error) => {
      toast.error(getErrorMessage(error));
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
        { oldPassword, newPassword },
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};

// ─── Token ───────────────────────────────────────────────────────────────────

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async (refreshToken: string) => {
      const { data } = await apiClient.post<
        ApiResponse<{ token: string; refreshToken: string }>
      >("/auth/refresh", { refreshToken });
      return data;
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
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
      toast.success("Logged out successfully");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
};
