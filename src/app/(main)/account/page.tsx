"use client";

import { useState } from "react";
import {
  useProfile,
  useUpdateProfile,
  useChangePassword,
} from "@/hooks/use-auth";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { Skeleton } from "@/components/atoms/skeleton";

export default function ProfilePage() {
  const {
    data: user,
    isLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useProfile();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileInitialized, setProfileInitialized] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48 rounded-none" />
        <Skeleton className="h-64 rounded-none" />
        <Skeleton className="h-64 rounded-none" />
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-8 flex items-center gap-4">
            <div className="h-px w-16 bg-destructive/40" />
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-destructive">
              Error
            </span>
            <div className="h-px w-16 bg-destructive/40" />
          </div>
          <h1 className="mb-4 text-3xl font-bold font-heading text-foreground">
            Unable to Load Profile
          </h1>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            We encountered an issue while loading your profile. Please try again
            or sign in again.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              onClick={() => refetchProfile()}
              size="lg"
              className="gap-2"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (user && !profileInitialized) {
    setName(user.name);
    setEmail(user.email);
    setProfileInitialized(true);
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate({ name, email });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    changePassword.mutate(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          setOldPassword("");
          setNewPassword("");
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-none">
        <CardHeader className="border-b">
          <CardTitle className="text-xs uppercase tracking-widest">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest">
                  Full Name
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-widest">
                  Email
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-none"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest">Phone</Label>
              <Input
                value={user?.phone ?? ""}
                disabled
                className="rounded-none"
              />
            </div>
            <Button
              type="submit"
              className="rounded-none"
              disabled={updateProfile.isPending}
            >
              {updateProfile.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-none">
        <CardHeader className="border-b">
          <CardTitle className="text-xs uppercase tracking-widest">
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest">
                Current Password
              </Label>
              <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="rounded-none"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest">
                New Password
              </Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded-none"
                required
              />
            </div>
            <Button
              type="submit"
              variant="outline"
              className="rounded-none"
              disabled={changePassword.isPending}
            >
              {changePassword.isPending ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
