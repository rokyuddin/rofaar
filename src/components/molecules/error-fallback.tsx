"use client";

import { Button } from "@/components/atoms/button";

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: unknown;
  resetErrorBoundary: () => void;
}) {
  const message =
    error instanceof Error ? error.message : "An unknown error occurred";
  return (
    <div className="flex h-[400px] flex-col items-center justify-center p-4 text-center">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong</h2>
      <p className="mb-6 text-muted-foreground">{message}</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}
