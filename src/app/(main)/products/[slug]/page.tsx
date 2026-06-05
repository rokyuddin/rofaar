"use client";

import {
  Check,
  ChevronRight,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Suspense, use, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/atoms/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/atoms/breadcrumb";
import { Button } from "@/components/atoms/button";
import { Skeleton } from "@/components/atoms/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import { Textarea } from "@/components/atoms/textarea";
import {
  ProductLoadError,
  ProductNotFound,
} from "@/components/molecules/product-error";
import { useAddToCart } from "@/hooks/use-cart";
import { useProductBySlug, useRelatedProducts } from "@/hooks/use-products";
import { useAskQuestion, useProductQuestions } from "@/hooks/use-qa";
import { useProductReviews, useWriteReview } from "@/hooks/use-reviews";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from "@/hooks/use-wishlist";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/api";

function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={cn(
            i < rating
              ? "fill-primary text-primary"
              : "fill-muted text-muted/40",
          )}
        />
      ))}
    </div>
  );
}

function ImageGallery({
  images,
  name,
}: {
  images: { url: string }[];
  name: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sorted = [...images].sort((a, b) => {
    const ai = images.indexOf(a);
    const bi = images.indexOf(b);
    return ai - bi;
  });

  if (sorted.length === 0) {
    return (
      <div className="aspect-[4/5] w-full bg-muted/50 flex items-center justify-center text-muted-foreground text-sm">
        No image available
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row md:gap-5">
      {/* Vertical Thumbnails */}
      {sorted.length > 1 && (
        <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto no-scrollbar md:max-h-[640px]">
          {sorted.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "relative aspect-square w-16 shrink-0 overflow-hidden border transition-all duration-200",
                i === selectedIndex
                  ? "border-foreground"
                  : "border-border opacity-60 hover:opacity-100 hover:border-foreground/40",
              )}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={img.url}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="relative flex-1 overflow-hidden bg-muted/30 aspect-[4/5]">
        <img
          src={sorted[selectedIndex]?.url}
          alt={name}
          className="h-full w-full object-cover transition-opacity duration-300"
        />
        {sorted.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-medium tracking-widest uppercase text-foreground/70">
            {selectedIndex + 1} / {sorted.length}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <Skeleton className="mb-8 h-4 w-64" />
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7 flex gap-4">
          <div className="flex flex-col gap-2.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="size-16" />
            ))}
          </div>
          <Skeleton className="flex-1 aspect-[4/5]" />
        </div>
        <div className="lg:col-span-5 space-y-5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center border border-border h-12">
      <button
        type="button"
        onClick={() => value > min && onChange(value - 1)}
        disabled={value <= min}
        className="h-full w-12 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus size={14} strokeWidth={1.5} />
      </button>
      <span className="h-full w-14 flex items-center justify-center text-sm font-medium tabular-nums border-x border-border">
        {value}
      </span>
      <button
        type="button"
        onClick={() => value < max && onChange(value + 1)}
        disabled={value >= max}
        className="h-full w-12 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <Plus size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}

function ReviewStars({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i + 1)}
          onMouseEnter={() => setHover(i + 1)}
          onMouseLeave={() => setHover(0)}
          className="p-1 -m-1 transition-transform hover:scale-110"
          aria-label={`Rate ${i + 1} stars`}
        >
          <Star
            size={22}
            strokeWidth={1.5}
            className={cn(
              i < (hover || value)
                ? "fill-primary text-primary"
                : "fill-muted text-muted/40",
            )}
          />
        </button>
      ))}
    </div>
  );
}

function RelatedProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted/30 mb-3">
        <img
          src={product.images[0]?.url || "https://via.placeholder.com/400x500"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute top-3 left-3 bg-foreground text-background px-2 py-1 text-[10px] font-bold tracking-widest uppercase">
            -{product.discountPercentage}%
          </span>
        )}
      </div>
      <div className="space-y-1.5">
        {product.category && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {product.category.name}
          </p>
        )}
        <h3 className="text-sm font-medium leading-snug transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm font-semibold text-foreground">
            ৳{(product.finalPrice ?? Number(product.price)).toLocaleString()}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              ৳{Number(product.price).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetailPageInner params={params} />
    </Suspense>
  );
}

function ProductDetailPageInner({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [questionText, setQuestionText] = useState("");

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
    refetch: refetchProduct,
  } = useProductBySlug(slug);
  const { data: relatedData } = useRelatedProducts(product?.id ?? "");
  const { data: reviews = [], isLoading: reviewsLoading } = useProductReviews(
    product?.id ?? "",
  );
  const { data: questions = [], isLoading: questionsLoading } =
    useProductQuestions(product?.id ?? "");

  const isLoggedIn = !!session;

  const addToCartApi = useAddToCart();
  const guestAddToCart = useCartStore((s) => s.addItem);

  const { data: apiWishlistItems } = useWishlist({ enabled: isLoggedIn });
  const addToWishlistApi = useAddToWishlist();
  const removeFromWishlistApi = useRemoveFromWishlist();
  const guestWishlistHasItem = useWishlistStore((s) =>
    product ? s.items.some((item) => item.productId === product.id) : false,
  );
  const guestWishlistToggle = useWishlistStore((s) => s.toggleItem);

  const writeReview = useWriteReview();
  const askQuestion = useAskQuestion();

  if (productLoading) return <ProductSkeleton />;
  if (productError)
    return <ProductLoadError onRetry={() => refetchProduct()} />;
  if (!product) {
    return <ProductNotFound />;
  }

  const reviewsList = Array.isArray(reviews) ? reviews : [];
  const questionsList = Array.isArray(questions) ? questions : [];

  const originalPrice = Number(product.price);
  const hasDiscount = product.discountPercentage > 0;
  const inStock = product.stock > 0;
  const avgRating =
    reviewsList.length > 0
      ? reviewsList.reduce((sum, r) => sum + (r.rating || 0), 0) /
        reviewsList.length
      : 0;

  const isInWishlist = isLoggedIn
    ? (apiWishlistItems ?? []).some((item) => item.productId === product.id)
    : guestWishlistHasItem;

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      guestAddToCart(product, quantity);
      toast.success("Added to cart");
      return;
    }
    addToCartApi.mutate(
      { productId: product.id, quantity },
      {
        onError: () => toast.error("Failed to add to cart. Please try again."),
      },
    );
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    if (!isLoggedIn) {
      guestWishlistToggle(product);
      toast.success(
        isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      );
      return;
    }
    if (isInWishlist) {
      removeFromWishlistApi.mutate(product.id, {
        onError: () =>
          toast.error("Failed to remove from wishlist. Please try again."),
      });
    } else {
      addToWishlistApi.mutate(product.id, {
        onError: () =>
          toast.error("Failed to add to wishlist. Please try again."),
      });
    }
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator
        .share({ title: product.name, url: window.location.href })
        .catch(() => {});
    } else if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handleWriteReview = () => {
    if (!product) return;
    writeReview.mutate(
      {
        productId: product.id,
        rating: reviewRating,
        comment: reviewComment || undefined,
      },
      {
        onSuccess: () => {
          setReviewComment("");
          setReviewRating(5);
          toast.success("Review submitted successfully!");
        },
        onError: () =>
          toast.error("Failed to submit review. Please try again."),
      },
    );
  };

  const handleAskQuestion = () => {
    if (!product || !questionText.trim()) return;
    askQuestion.mutate(
      { productId: product.id, question: questionText },
      {
        onSuccess: () => {
          setQuestionText("");
          toast.success("Question submitted successfully!");
        },
        onError: () =>
          toast.error("Failed to submit question. Please try again."),
      },
    );
  };

  const relatedProducts = relatedData?.data ?? [];

  return (
    <div className="flex flex-col bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border/60">
        <div className="container mx-auto px-4 md:px-6 py-3.5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/products">Shop</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {product.category && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href={`/products?category=${product.category.slug}`}
                      >
                        {product.category.name}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 max-w-[200px] md:max-w-[300px]">
                  {product.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Product Main Section */}
      <section className="container mx-auto px-4 md:px-6 py-8 md:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Image Gallery */}
          <div className="lg:col-span-7">
            <ImageGallery images={product.images} name={product.name} />
          </div>

          {/* Product Info - Sticky on desktop */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-20 space-y-7">
              {/* Brand & Category */}
              <div className="flex items-center gap-3 flex-wrap">
                {product.brand && (
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
                    {product.brand.name}
                  </span>
                )}
                {product.brand && product.category && (
                  <span className="size-1 rounded-full bg-muted-foreground/40" />
                )}
                {product.category && (
                  <Link
                    href={`/products?category=${product.category.slug}`}
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {product.category.name}
                  </Link>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-2xl md:text-3xl lg:text-[2rem] font-medium font-heading leading-[1.2] tracking-tight">
                {product.name}
              </h1>

              {/* Rating */}
              {reviewsList.length > 0 && (
                <div className="flex items-center gap-2.5">
                  <StarRating rating={Math.round(avgRating)} />
                  <span className="text-xs text-muted-foreground">
                    {avgRating.toFixed(1)} · {reviewsList.length}{" "}
                    {reviewsList.length === 1 ? "review" : "reviews"}
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl md:text-3xl font-semibold tabular-nums text-foreground">
                  ৳{(product.finalPrice ?? originalPrice).toLocaleString()}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-base text-muted-foreground line-through tabular-nums">
                      ৳{originalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                      Save {product.discountPercentage}%
                    </span>
                  </>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-border" />

              {/* Description */}
              {product.description && (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              )}

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {inStock ? (
                  <>
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-600" />
                    </span>
                    <span className="text-xs font-medium text-emerald-700">
                      In Stock
                      {product.stock <= 10 && (
                        <span className="text-muted-foreground">
                          {" "}
                          · Only {product.stock} left
                        </span>
                      )}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="size-2 rounded-full bg-destructive" />
                    <span className="text-xs font-medium text-destructive">
                      Out of Stock
                    </span>
                  </>
                )}
              </div>

              {/* Quantity + Add to Cart */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Quantity
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <QuantityStepper
                    value={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={product.stock}
                  />
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={
                      !inStock || (isLoggedIn && addToCartApi.isPending)
                    }
                    className="flex-1 h-12 gap-2.5 text-sm font-medium tracking-wide"
                  >
                    <ShoppingCart size={16} strokeWidth={1.5} />
                    {isLoggedIn && addToCartApi.isPending
                      ? "Adding..."
                      : inStock
                        ? "Add to Cart"
                        : "Unavailable"}
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleWishlistToggle}
                  disabled={
                    isLoggedIn &&
                    (addToWishlistApi.isPending ||
                      removeFromWishlistApi.isPending)
                  }
                  className="w-full h-12 gap-2.5 text-sm font-medium tracking-wide"
                >
                  <Heart
                    size={16}
                    strokeWidth={1.5}
                    className={cn(
                      "transition-all",
                      isInWishlist && "fill-destructive text-destructive",
                    )}
                  />
                  {isInWishlist ? "Saved to Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 border border-border/60 bg-muted/20">
                  <Truck
                    size={18}
                    strokeWidth={1.5}
                    className="text-foreground/70 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-medium">Free Shipping</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      On orders over ৳2,000
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 border border-border/60 bg-muted/20">
                  <ShieldCheck
                    size={18}
                    strokeWidth={1.5}
                    className="text-foreground/70 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-medium">Authentic</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      Handcrafted by artisans
                    </p>
                  </div>
                </div>
              </div>

              {/* Share */}
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Share2 size={14} strokeWidth={1.5} />
                Share this product
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="border-t border-border/60 bg-muted/10">
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList
              variant="line"
              className="w-full justify-start border-b border-border mb-10 overflow-x-auto"
            >
              <TabsTrigger
                value="description"
                className="text-sm font-medium px-4 h-12"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="text-sm font-medium px-4 h-12"
              >
                Reviews
                <span className="ml-1.5 text-xs text-muted-foreground">
                  ({reviewsList.length})
                </span>
              </TabsTrigger>
              <TabsTrigger value="qa" className="text-sm font-medium px-4 h-12">
                Q&A
                <span className="ml-1.5 text-xs text-muted-foreground">
                  ({questionsList.length})
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-0">
              <div className="max-w-2xl">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                  About this piece
                </h3>
                <p className="text-base leading-[1.8] text-foreground/85 whitespace-pre-line">
                  {product.description ||
                    "No description available for this product."}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <div className="grid gap-12 lg:grid-cols-12">
                {/* Review Summary */}
                <div className="lg:col-span-4">
                  <div className="border border-border bg-card p-6 md:p-8">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                      Customer Rating
                    </h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-5xl font-semibold tabular-nums">
                        {avgRating > 0 ? avgRating.toFixed(1) : "—"}
                      </span>
                      <span className="text-sm text-muted-foreground">/ 5</span>
                    </div>
                    <StarRating rating={Math.round(avgRating)} size={16} />
                    <p className="mt-4 text-xs text-muted-foreground">
                      Based on {reviewsList.length}{" "}
                      {reviewsList.length === 1 ? "review" : "reviews"}
                    </p>
                  </div>
                </div>

                {/* Write a Review + List */}
                <div className="lg:col-span-8 space-y-10">
                  {/* Write a Review */}
                  <div className="border border-border bg-card p-6 md:p-8">
                    <h3 className="text-base font-medium font-heading mb-1">
                      Write a review
                    </h3>
                    <p className="text-xs text-muted-foreground mb-6">
                      Share your experience with this piece
                    </p>
                    <div className="space-y-5">
                      <div>
                        <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          Your Rating
                        </label>
                        <ReviewStars
                          value={reviewRating}
                          onChange={setReviewRating}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                          Your Review
                        </label>
                        <Textarea
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="Tell us what you think..."
                          rows={4}
                          className="resize-none"
                        />
                      </div>
                      <Button
                        onClick={handleWriteReview}
                        disabled={writeReview.isPending}
                        size="lg"
                        className="h-11 px-6"
                      >
                        {writeReview.isPending
                          ? "Submitting..."
                          : "Submit Review"}
                      </Button>
                    </div>
                  </div>

                  {/* Reviews List */}
                  {reviewsLoading ? (
                    <div className="space-y-6">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="space-y-3 border-b border-border pb-6"
                        >
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      ))}
                    </div>
                  ) : reviewsList.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border">
                      <MessageCircle
                        size={32}
                        strokeWidth={1.2}
                        className="mx-auto text-muted-foreground/40 mb-3"
                      />
                      <p className="text-sm text-muted-foreground">
                        No reviews yet. Be the first to share your thoughts.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {reviewsList.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-border pb-6 last:border-0"
                        >
                          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                            <div className="flex items-center gap-3">
                              <StarRating
                                rating={review.rating || 0}
                                size={13}
                              />
                              <span className="text-xs font-medium">
                                {review.rating}.0
                              </span>
                            </div>
                            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                              {formatDate(review.createdAt)}
                            </span>
                          </div>
                          {review.comment && (
                            <p className="text-sm leading-relaxed text-foreground/80">
                              {review.comment}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="qa" className="mt-0">
              <div className="max-w-3xl space-y-10">
                {/* Ask a Question */}
                <div className="border border-border bg-card p-6 md:p-8">
                  <h3 className="text-base font-medium font-heading mb-1">
                    Ask a question
                  </h3>
                  <p className="text-xs text-muted-foreground mb-5">
                    Have a question about this piece? We're here to help.
                  </p>
                  <Textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Type your question here..."
                    rows={3}
                    className="resize-none mb-3"
                  />
                  <Button
                    onClick={handleAskQuestion}
                    disabled={askQuestion.isPending || !questionText.trim()}
                    size="lg"
                    className="h-11 px-6 gap-2"
                  >
                    <MessageCircle size={15} strokeWidth={1.5} />
                    {askQuestion.isPending
                      ? "Submitting..."
                      : "Submit Question"}
                  </Button>
                </div>

                {/* Questions List */}
                {questionsLoading ? (
                  <div className="space-y-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="space-y-2 border-b border-border pb-6"
                      >
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    ))}
                  </div>
                ) : questionsList.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-border">
                    <MessageCircle
                      size={32}
                      strokeWidth={1.2}
                      className="mx-auto text-muted-foreground/40 mb-3"
                    />
                    <p className="text-sm text-muted-foreground">
                      No questions yet. Be the first to ask.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {questionsList.map((q) => (
                      <div
                        key={q.id}
                        className="border-b border-border pb-6 last:border-0"
                      >
                        <div className="mb-2 flex items-start gap-3">
                          <span className="text-xs font-bold uppercase tracking-widest text-primary mt-0.5">
                            Q
                          </span>
                          <p className="text-sm font-medium text-foreground flex-1">
                            {q.question}
                          </p>
                        </div>
                        <p className="ml-7 text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
                          {q.user?.name || "Anonymous"} ·{" "}
                          {formatDate(q.createdAt)}
                        </p>
                        {Array.isArray(q.answers) && q.answers.length > 0 && (
                          <div className="ml-7 space-y-4">
                            {q.answers.map((a) => (
                              <div
                                key={a.id}
                                className="border-l-2 border-primary/40 pl-4"
                              >
                                <div className="mb-2 flex items-center gap-2">
                                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                                    A
                                  </span>
                                  {a.isOfficial && (
                                    <Badge
                                      variant="default"
                                      className="text-[9px] tracking-widest uppercase"
                                    >
                                      <Check size={10} className="mr-1" />
                                      Official
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-foreground/85 leading-relaxed">
                                  {a.answer}
                                </p>
                                <p className="mt-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                                  {a.user?.name || "Anonymous"}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-border/60">
          <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <div className="flex items-end justify-between mb-8 md:mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-medium font-heading tracking-tight">
                  You may also like
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Pieces from the same collection
                </p>
              </div>
              <Link
                href="/products"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors group"
              >
                View All
                <ChevronRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6">
              {relatedProducts.map((item: Product) => (
                <RelatedProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
