"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Logo } from "@/components/molecules/logo";
import {
  useSendForgotPasswordOtp,
  useResetPassword,
  useVerifyForgotPasswordOtp,
} from "@/hooks/use-auth";

type Step = "phone" | "otp" | "reset";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const router = useRouter();

  const forgotPasswordMutation = useSendForgotPasswordOtp();
  const verifyOtpMutation = useVerifyForgotPasswordOtp();
  const resetPasswordMutation = useResetPassword();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPasswordMutation.mutateAsync(phone);
      toast.success("OTP sent to your phone");
      setStep("otp");
    } catch {
      // toast handles error
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await verifyOtpMutation.mutateAsync({ phone, otp });
      if (result.success && result.data) {
        setResetToken(result.data.resetToken);
        setStep("reset");
      }
    } catch {
      // toast handles error
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPasswordMutation.mutateAsync({
        resetToken,
        newPassword,
      });
      toast.success("Password reset successful! Please login.");
      router.push("/login");
    } catch {
      // toast handles error
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-background p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <Link href="/">
            <Logo className="h-10 w-auto" />
          </Link>
          <h2 className="mt-6 text-3xl font-bold font-heading">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {step === "phone" && "Enter your phone number to get started"}
            {step === "otp" && "Enter the code sent to your phone"}
            {step === "reset" && "Choose a new password for your account"}
          </p>
        </div>

        {step === "phone" && (
          <form onSubmit={handleSendOtp} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-muted-foreground"
              >
                Phone Number
              </Label>
              <Input
                id="phone"
                type="text"
                required
                placeholder="01xxxxxxxxx"
                className="h-10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base font-bold uppercase tracking-widest"
              disabled={forgotPasswordMutation.isPending}
            >
              {forgotPasswordMutation.isPending ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="mt-8 space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="otp"
                className="text-sm font-medium text-muted-foreground"
              >
                Verification Code
              </Label>
              <Input
                id="otp"
                type="text"
                maxLength={6}
                required
                placeholder="123456"
                className="h-10 text-center text-2xl tracking-[0.5em]"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base font-bold uppercase tracking-widest"
              disabled={otp.length !== 6 || verifyOtpMutation.isPending}
            >
              {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setStep("phone")}
            >
              Back to Phone
            </Button>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleResetPassword} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="newPassword"
                className="text-sm font-medium text-muted-foreground"
              >
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                required
                placeholder="••••••••"
                className="h-10"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-muted-foreground"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                placeholder="••••••••"
                className="h-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base font-bold uppercase tracking-widest"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending
                ? "Resetting..."
                : "Reset Password"}
            </Button>
          </form>
        )}

        <p className="text-center text-sm text-muted-foreground mt-6">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
