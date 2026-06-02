import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Button } from "@/components/atoms/button";

interface ProductErrorProps {
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  showHomeButton?: boolean;
}

export function ProductNotFound({
  title = "Product Not Found",
  description = "The piece you're looking for doesn't exist or has been moved to our archives.",
  backHref = "/products",
  backLabel = "Back to Collection",
  showHomeButton = true,
}: ProductErrorProps) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-lg text-center">
        {/* Decorative Line */}
        <div className="mx-auto mb-8 flex items-center gap-4">
          <div className="h-px w-16 bg-primary/40" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Error
          </span>
          <div className="h-px w-16 bg-primary/40" />
        </div>

        {/* Main Heading */}
        <h1 className="mb-4 text-4xl font-bold font-heading text-foreground md:text-5xl">
          {title}
        </h1>

        {/* Description */}
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href={backHref}>
              <ArrowLeft size={16} />
              {backLabel}
            </Link>
          </Button>
          {showHomeButton && (
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/">
                <Home size={16} />
                Return Home
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProductLoadError({
  onRetry,
}: {
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="mx-auto max-w-lg text-center">
        {/* Decorative Line */}
        <div className="mx-auto mb-8 flex items-center gap-4">
          <div className="h-px w-16 bg-destructive/40" />
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-destructive">
            Error
          </span>
          <div className="h-px w-16 bg-destructive/40" />
        </div>

        {/* Main Heading */}
        <h1 className="mb-4 text-4xl font-bold font-heading text-foreground md:text-5xl">
          Something Went Wrong
        </h1>

        {/* Description */}
        <p className="mb-10 text-base leading-relaxed text-muted-foreground">
          We encountered an unexpected issue while loading this product. Please
          try again or contact our support team if the problem persists.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {onRetry && (
            <Button onClick={onRetry} size="lg" className="gap-2">
              <Search size={16} />
              Try Again
            </Button>
          )}
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="/products">
              <ArrowLeft size={16} />
              Back to Collection
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
