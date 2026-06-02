"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/button";
import { Logo } from "@/components/molecules/logo";
import Link from "next/link";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import {
  useSendOtp,
  useVerifyOtp,
  useRegisterComplete,
} from "@/hooks/use-auth";

type Step = "phone" | "otp" | "complete";

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [regToken, setRegToken] = useState("");
  const router = useRouter();

  const sendOtpMutation = useSendOtp();
  const verifyOtpMutation = useVerifyOtp();
  const registerCompleteMutation = useRegisterComplete();

  // Step 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendOtpMutation.mutateAsync(phone);
      toast.success("OTP sent to your phone");
      setStep("otp");
    } catch (error) {}
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (otp: string) => {
    try {
      const result = await verifyOtpMutation.mutateAsync({ phone, otp });
      if (result.success && result.data) {
        setRegToken(result.data.token);
        setStep("complete");
      }
    } catch (error) {}
  };

  // Step 3: Complete Registration
  const completeForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      if (value.password !== value.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      try {
        await registerCompleteMutation.mutateAsync({
          token: regToken,
          name: value.name,
          email: value.email,
          password: value.password,
        });
        toast.success("Registration successful! Please login.");
        router.push("/login");
      } catch (error) {}
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-background p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <Link href="/">
            <Logo className="h-10 w-auto" />
          </Link>
          <h2 className="mt-6 text-3xl font-bold font-heading">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {step === "phone" && "Enter your phone to get started"}
            {step === "otp" && "Enter the code sent to your phone"}
            {step === "complete" && "Tell us a bit about yourself"}
          </p>
        </div>

        {step === "phone" && (
          <form onSubmit={handleSendOtp} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-muted-foreground"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="text"
                required
                placeholder="01xxxxxxxxx"
                className="mt-1 block w-full border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12"
              disabled={sendOtpMutation.isPending}
            >
              {sendOtpMutation.isPending ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        )}

        {step === "otp" && (
          <div className="mt-8 space-y-6">
            <OtpInput
              onComplete={handleVerifyOtp}
              isLoading={verifyOtpMutation.isPending}
            />
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setStep("phone")}
            >
              Back to Phone
            </Button>
          </div>
        )}

        {step === "complete" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              completeForm.handleSubmit();
            }}
            className="mt-8 space-y-4"
          >
            <completeForm.Field
              name="name"
              validators={{
                onChange: z
                  .string()
                  .min(2, "Name must be at least 2 characters"),
              }}
              children={(field) => (
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 block w-full border border-input bg-background px-3 py-2 text-sm"
                    placeholder="John Doe"
                  />
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-xs text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                </div>
              )}
            />

            <completeForm.Field
              name="email"
              validators={{
                onChange: z.string().email("Invalid email address"),
              }}
              children={(field) => (
                <div>
                  <label className="block text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 block w-full border border-input bg-background px-3 py-2 text-sm"
                    placeholder="john@example.com"
                  />
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-xs text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                </div>
              )}
            />

            <completeForm.Field
              name="password"
              validators={{
                onChange: z
                  .string()
                  .min(8, "Password must be at least 8 characters"),
              }}
              children={(field) => (
                <div>
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 block w-full border border-input bg-background px-3 py-2 text-sm"
                    placeholder="••••••••"
                  />
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="mt-1 text-xs text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                </div>
              )}
            />

            <completeForm.Field
              name="confirmPassword"
              children={(field) => (
                <div>
                  <label className="block text-sm font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="mt-1 block w-full border border-input bg-background px-3 py-2 text-sm"
                    placeholder="••••••••"
                  />
                </div>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12"
              disabled={registerCompleteMutation.isPending}
            >
              {registerCompleteMutation.isPending
                ? "Creating Account..."
                : "Complete Registration"}
            </Button>
          </form>
        )}

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
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

function OtpInput({
  onComplete,
  isLoading,
}: {
  onComplete: (otp: string) => void;
  isLoading: boolean;
}) {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      onComplete(otp);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        maxLength={6}
        required
        placeholder="123456"
        className="block w-full border border-input bg-background px-3 py-3 text-center text-2xl tracking-[1em] focus:outline-none focus:ring-2 focus:ring-primary/20"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <Button
        type="submit"
        className="w-full"
        disabled={otp.length !== 6 || isLoading}
      >
        {isLoading ? "Verifying..." : "Verify OTP"}
      </Button>
    </form>
  );
}
