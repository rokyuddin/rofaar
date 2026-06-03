"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { PhoneInput } from "@/components/atoms/phone-input";
import { Logo } from "@/components/molecules/logo";
import { useRegister } from "@/hooks/use-auth";

const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  phone: z.string().min(11, "Phone must be 11 digits"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
});

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: registerSchema,
    },
    onSubmit: async ({ value }) => {
      if (value.password !== value.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      try {
        await registerMutation.mutateAsync({
          name: value.name,
          phone: value.phone,
          password: value.password,
          email: value.email || undefined,
        });
        toast.success("Registration successful! Please sign in.");
        router.push("/login");
      } catch (_error) {}
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
            Fill in the details below to get started
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="mt-8 space-y-4"
        >
          <form.Field
            name="name"
            validators={{
              onChange: registerSchema.shape.name,
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

          <form.Field
            name="phone"
            validators={{
              onChange: registerSchema.shape.phone,
            }}
            children={(field) => (
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <PhoneInput
                  name="phone"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(val) => field.handleChange(val)}
                  error={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                      ? field.state.meta.errors.join(", ")
                      : undefined
                  }
                />
              </div>
            )}
          />

          <form.Field
            name="email"
            validators={{
              onChange: registerSchema.shape.email,
            }}
            children={(field) => (
              <div className="space-y-1.5">
                <Label htmlFor="email">
                  Email Address{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
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

          <form.Field
            name="password"
            validators={{
              onChange: registerSchema.shape.password,
            }}
            children={(field) => (
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="text"
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

          <form.Field
            name="confirmPassword"
            validators={{
              onChange: ({ value }) => {
                if (value !== form.state.values.password) {
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
                  type="text"
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
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

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
