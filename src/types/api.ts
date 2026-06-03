export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  code: string;
  message: string;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  phone?: string;
  isVerified?: boolean;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

// ─── Products ────────────────────────────────────────────────────────────────

export interface ProductImage {
  id?: string;
  productId?: string;
  url: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  costPrice: string;
  discountPercentage: number;
  finalPrice: number;
  stock: number;
  lowStockThreshold?: number;
  isActive: boolean;
  categoryId?: string;
  brandId?: string;
  category: Category;
  brand: Brand;
  images: ProductImage[];
  createdAt?: string;
  updatedAt?: string;
}

// ─── Categories ──────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

// ─── Brands ──────────────────────────────────────────────────────────────────

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logoUrl: string;
  createdAt: string;
}

// ─── Cart ────────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  price: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

// ─── Addresses ───────────────────────────────────────────────────────────────

export interface Address {
  id: string;
  label?: string;
  recipientName: string;
  phone: string;
  altPhone?: string;
  address: string;
  city: string;
  area: string;
  zone?: string;
  isDefault: boolean;
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  product: Product;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";
export type PaymentStatus = "unpaid" | "paid" | "pending";
export type PaymentMethod = "cod" | "on_air";

export interface OrderHistoryEntry {
  id: string;
  action: string;
  previousStatus: string | null;
  newStatus: string;
  note: string | null;
  createdAt: string;
  performedBy: { name: string };
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: string;
  discountAmount: string;
  total: string;
  shippingFee: string;
  trackingNumber: string | null;
  trackingUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  address: Address;
  coupon?: Coupon | null;
}

export interface OrderTracking {
  order: Order;
  history: OrderHistoryEntry[];
}

// ─── Counts ──────────────────────────────────────────────────────────────────

export interface Counts {
  cart: number;
  wishlist: number;
}

// ─── Wishlist ────────────────────────────────────────────────────────────────

export interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  createdAt: string;
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

// ─── Q&A ─────────────────────────────────────────────────────────────────────

export interface Answer {
  id: string;
  answer: string;
  isOfficial: boolean;
  createdAt: string;
  user: { name: string };
}

export interface Question {
  id: string;
  question: string;
  createdAt: string;
  user: { name: string };
  answers: Answer[];
}

// ─── Refunds ─────────────────────────────────────────────────────────────────

export type RefundStatus = "pending" | "approved" | "rejected" | "completed";

export interface Refund {
  id: string;
  orderId: string;
  userId: string;
  status: RefundStatus;
  reason: string;
  adminNote: string | null;
  createdAt: string;
}

// ─── Payments ────────────────────────────────────────────────────────────────

export type PaymentProvider = "manual" | "sslcommerz" | "bkash" | "nagad";
export type PaymentRecordStatus =
  | "initiated"
  | "verified"
  | "failed"
  | "refunded";

export interface Payment {
  id: string;
  orderId: string;
  provider: PaymentProvider;
  transactionId: string;
  amount: string;
  status: PaymentRecordStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Coupons ─────────────────────────────────────────────────────────────────

export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: string;
  minOrderAmount?: string;
  isActive: boolean;
  expiresAt?: string;
  createdAt: string;
}

export interface CouponValidation {
  id: string;
  code: string;
  discount: number;
}

// ─── Shipping ────────────────────────────────────────────────────────────────

export interface ShippingMethod {
  id: string;
  name: string;
  cost: string;
  estimatedDays: string;
  isActive: boolean;
}

export interface ShippingZone {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  methods: ShippingMethod[];
}

// ─── Banners ─────────────────────────────────────────────────────────────────

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl: string;
  isActive: boolean;
  sortOrder: number;
}

// ─── Advertisements ──────────────────────────────────────────────────────────

export interface Advertisement {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  position: string;
  isActive: boolean;
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  createdAt: string;
}

// ─── Search ──────────────────────────────────────────────────────────────────

export interface AutocompleteResult {
  id: string;
  name: string;
  slug: string;
}

export type SortOption = "newest" | "price_asc" | "price_desc" | "popular";

// ─── Uploads ─────────────────────────────────────────────────────────────────

export interface UploadResponse {
  url: string;
}

// ─── Health ──────────────────────────────────────────────────────────────────

export interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: number;
}
