"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { PhoneInput } from "@/components/atoms/phone-input";
import { Logo } from "@/components/molecules/logo";
import {
  useSendRegistrationOtp,
  useVerifyRegistrationOtp,
  useCompleteRegistration,
} from "@/hooks/use-auth";

type Step = "phone" | "otp" | "profile";

export default function RegisterPage() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [registrationToken, setRegistrationToken] = useState("");
  const router = useRouter();

  const sendOtpMutation = useSendRegistrationOtp();
  const verifyOtpMutation = useVerifyRegistrationOtp();
  const completeRegistrationMutation = useCompleteRegistration();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendOtpMutation.mutateAsync(phone);
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
        setRegistrationToken(result.data.token);
        setStep("profile");
      }
    } catch {
      // toast handles error
    }
  };

  const profileForm = useForm({
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
        await completeRegistrationMutation.mutateAsync({
          token: registrationToken,
          name: value.name,
          email: value.email,
          password: value.password,
        });
        toast.success("Registration successful! Please sign in.");
        router.push("/login");
      } catch {
        // toast handles error
      }
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
            {step === "phone" && "Enter your phone number to get started"}
            {step === "otp" && "Enter the code sent to your phone"}
            {step === "profile" && "Fill in your profile details"}
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
              <PhoneInput
                name="phone"
                value={phone}
                onChange={(val) => setPhone(val)}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base font-bold uppercase tracking-widest"
              disabled={sendOtpMutation.isPending}
            >
              {sendOtpMutation.isPending ? "Sending..." : "Send OTP"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign In
              </Link>
            </p>
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

        {step === "profile" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              profileForm.handleSubmit();
            }}
            className="mt-8 space-y-4"
          >
            <profileForm.Field
              name="name"
              validators={{
                onChange: z
                  .string()
                  .min(2, "Name must be at least 2 characters")
                  .max(100, "Name must be at most 100 characters"),
              }}
              children={(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    }
                  />
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-xs text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                </div>
              )}
            />

            <profileForm.Field
              name="email"
              validators={{
                onChange: z.string().email("Invalid email"),
              }}
              children={(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    }
                  />
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-xs text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                </div>
              )}
            />

            <profileForm.Field
              name="password"
              validators={{
                onChange: z
                  .string()
                  .min(6, "Password must be at least 6 characters"),
              }}
              children={(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Min. 6 characters"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    }
                  />
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-xs text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                </div>
              )}
            />

            <profileForm.Field
              name="confirmPassword"
              validators={{
                onChange: ({ value }) => {
                  if (value !== profileForm.state.values.password) {
                    return "Passwords do not match";
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={
                      field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0
                    }
                  />
                  {field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0 && (
                      <p className="text-xs text-destructive">
                        {field.state.meta.errors.join(", ")}
                      </p>
                    )}
                </div>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 text-base font-bold uppercase tracking-widest"
              disabled={completeRegistrationMutation.isPending}
            >
              {completeRegistrationMutation.isPending
                ? "Creating Account..."
                : "Complete Registration"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setStep("otp")}
            >
              Back to OTP
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
