"use client";

import { Heart, MessageCircle, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Suspense, use, useState } from "react";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { QuantityInput } from "@/components/atoms/quantity-input";
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
import type { Product } from "@/types/api";

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < rating
              ? "fill-primary text-primary"
              : "text-muted-foreground/30"
          }
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
      <div className="aspect-[4/5] w-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
        No image available
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        <img
          src={sorted[selectedIndex]?.url}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      {sorted.length > 1 && (
        <div className="flex gap-2">
          {sorted.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`aspect-square w-16 overflow-hidden border-2 transition-colors ${
                i === selectedIndex
                  ? "border-primary"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
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
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-8 h-4 w-64" />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <Skeleton className="aspect-[4/5] w-full" />
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-16" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
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

  // Cart: API for logged-in, Zustand for guest
  const addToCartApi = useAddToCart();
  const guestAddToCart = useCartStore((s) => s.addItem);

  // Wishlist: API for logged-in, Zustand for guest
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

  const originalPrice = Number(product.price);
  const hasDiscount = product.discountPercentage > 0;

  const isInWishlist = isLoggedIn
    ? (apiWishlistItems ?? []).some((item) => item.productId === product.id)
    : guestWishlistHasItem;

  const handleAddToCart = () => {
    if (isLoggedIn) {
      addToCartApi.mutate({ productId: product.id, quantity });
    } else {
      guestAddToCart(product, quantity);
    }
  };

  const handleWishlistToggle = () => {
    if (isLoggedIn) {
      if (isInWishlist) {
        const apiItem = apiWishlistItems?.find(
          (i) => i.productId === product.id,
        );
        if (apiItem) {
          removeFromWishlistApi.mutate(apiItem.id);
        }
      } else {
        addToWishlistApi.mutate(product.id);
      }
    } else {
      guestWishlistToggle(product);
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
        },
      },
    );
  };

  const handleAskQuestion = () => {
    if (!product || !questionText.trim()) return;
    askQuestion.mutate(
      { productId: product.id, question: questionText },
      { onSuccess: () => setQuestionText("") },
    );
  };

  const relatedProducts = relatedData?.data ?? [];

  return (
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-3">
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
                  <Link href="/products">Products</Link>
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
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Product Main Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <ImageGallery images={product.images} name={product.name} />

          {/* Product Info */}
          <div className="flex flex-col gap-4">
            {product.brand && (
              <Badge
                variant="secondary"
                className="w-fit uppercase tracking-widest"
              >
                {product.brand.name}
              </Badge>
            )}

            <h1 className="text-2xl font-bold font-heading md:text-3xl">
              {product.name}
            </h1>

            {product.category && (
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {product.category.name}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-2">
              <StarRating
                rating={Math.round(
                  reviews.length > 0
                    ? reviews.reduce((sum, r) => sum + r.rating, 0) /
                        reviews.length
                    : 0,
                )}
              />
              <span className="text-xs text-muted-foreground">
                ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold">
                ৳{(product.finalPrice ?? originalPrice).toLocaleString()}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm text-muted-foreground line-through">
                    ৳{originalPrice.toLocaleString()}
                  </span>
                  <Badge variant="destructive">
                    -{product.discountPercentage}%
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            {/* Stock */}
            <div className="text-xs text-muted-foreground">
              {product.stock > 0 ? (
                <span className="text-green-600">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-destructive">Out of Stock</span>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuantityInput
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={product.stock}
              />
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={
                  isLoggedIn
                    ? addToCartApi.isPending
                    : false || product.stock === 0
                }
                className="flex-1 gap-2"
              >
                <ShoppingCart size={16} />
                {isLoggedIn && addToCartApi.isPending
                  ? "Adding..."
                  : "Add to Cart"}
              </Button>
            </div>

            {/* Wishlist */}
            <Button
              variant="outline"
              size="lg"
              onClick={handleWishlistToggle}
              disabled={
                isLoggedIn
                  ? addToWishlistApi.isPending ||
                    removeFromWishlistApi.isPending
                  : false
              }
              className="gap-2"
            >
              <Heart
                size={16}
                className={
                  isInWishlist ? "fill-destructive text-destructive" : ""
                }
              />
              {isLoggedIn &&
              (addToWishlistApi.isPending || removeFromWishlistApi.isPending)
                ? "Updating..."
                : isInWishlist
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
            </Button>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="description" className="w-full">
            <TabsList variant="line" className="w-full justify-start border-b">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">
                Reviews ({reviews.length})
              </TabsTrigger>
              <TabsTrigger value="qa">Q&A ({questions.length})</TabsTrigger>
            </TabsList>

            {/* Description Tab */}
            <TabsContent value="description" className="pt-6">
              <div className="max-w-3xl">
                <h3 className="mb-4 text-lg font-bold font-heading">
                  About this product
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {product.description ||
                    "No description available for this product."}
                </p>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="pt-6">
              <div className="max-w-3xl space-y-8">
                {/* Review Summary */}
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold">
                      {reviews.length > 0
                        ? (
                            reviews.reduce((sum, r) => sum + r.rating, 0) /
                            reviews.length
                          ).toFixed(1)
                        : "0.0"}
                    </div>
                    <StarRating
                      rating={Math.round(
                        reviews.length > 0
                          ? reviews.reduce((sum, r) => sum + r.rating, 0) /
                              reviews.length
                          : 0,
                      )}
                      size={14}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {reviews.length} reviews
                    </p>
                  </div>
                </div>

                {/* Write a Review */}
                <Card>
                  <CardHeader>
                    <CardTitle>Write a Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="mb-2 block text-xs font-medium">
                        Rating
                      </label>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setReviewRating(i + 1)}
                          >
                            <Star
                              size={20}
                              className={
                                i < reviewRating
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground/30"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium">
                        Comment (optional)
                      </label>
                      <Textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your experience..."
                        rows={3}
                      />
                    </div>
                    <Button
                      onClick={handleWriteReview}
                      disabled={writeReview.isPending}
                    >
                      {writeReview.isPending
                        ? "Submitting..."
                        : "Submit Review"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                {reviewsLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-2/3" />
                      </div>
                    ))}
                  </div>
                ) : reviews.length === 0 ? (
                  <p className="text-center py-8 text-sm text-muted-foreground">
                    No reviews yet. Be the first to review this product!
                  </p>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-border pb-6 last:border-0"
                      >
                        <div className="mb-2 flex items-center gap-3">
                          <StarRating rating={review.rating} size={12} />
                          <span className="text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-sm text-muted-foreground">
                            {review.comment}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Q&A Tab */}
            <TabsContent value="qa" className="pt-6">
              <div className="max-w-3xl space-y-8">
                {/* Ask a Question */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ask a Question</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="Ask about this product..."
                      rows={3}
                    />
                    <Button
                      onClick={handleAskQuestion}
                      disabled={askQuestion.isPending || !questionText.trim()}
                      className="gap-2"
                    >
                      <MessageCircle size={16} />
                      {askQuestion.isPending
                        ? "Submitting..."
                        : "Submit Question"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Questions List */}
                {questionsLoading ? (
                  <div className="space-y-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    ))}
                  </div>
                ) : questions.length === 0 ? (
                  <p className="text-center py-8 text-sm text-muted-foreground">
                    No questions yet. Be the first to ask!
                  </p>
                ) : (
                  <div className="space-y-6">
                    {questions.map((q) => (
                      <div
                        key={q.id}
                        className="border-b border-border pb-6 last:border-0"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <span className="text-xs font-medium">Q:</span>
                          <span className="text-sm">{q.question}</span>
                        </div>
                        <p className="mb-3 ml-5 text-xs text-muted-foreground">
                          by {q.user.name} &middot;{" "}
                          {new Date(q.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        {q.answers.length > 0 && (
                          <div className="ml-5 space-y-3">
                            {q.answers.map((a) => (
                              <div
                                key={a.id}
                                className="border-l-2 border-primary pl-3"
                              >
                                <div className="mb-1 flex items-center gap-2">
                                  <span className="text-xs font-medium">
                                    A:
                                  </span>
                                  {a.isOfficial && (
                                    <Badge
                                      variant="default"
                                      className="text-[10px]"
                                    >
                                      Official
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {a.answer}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground/60">
                                  by {a.user.name}
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
        <section className="border-t border-border">
          <div className="container mx-auto px-4 py-8">
            <h2 className="mb-6 text-xl font-bold font-heading">
              Related Products
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((item: Product) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <img
                      src={
                        item.images[0]?.url ||
                        "https://via.placeholder.com/400x500"
                      }
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {item.discountPercentage > 0 && (
                      <div className="absolute left-2 top-2 bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                        -{item.discountPercentage}%
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      {item.category?.name}
                    </span>
                    <span className="text-sm font-semibold transition-colors group-hover:text-primary">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">
                        ৳
                        {(
                          item.finalPrice ?? Number(item.price)
                        ).toLocaleString()}
                      </span>
                      {item.discountPercentage > 0 && (
                        <span className="text-xs text-muted-foreground line-through">
                          ৳{Number(item.price).toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
