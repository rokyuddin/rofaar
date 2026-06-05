import { cacheTag } from "next/cache";
import type { ApiResponse, Banner, Category, Product } from "@/types/api";

export async function fetchCategories(limit = 6) {
  "use cache";
  cacheTag("categories");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/categories?limit=${limit}`,
  );
  return res.json() as Promise<ApiResponse<Category[]>>;
}

export async function fetchProducts(limit = 20, sort = "newest") {
  "use cache";
  cacheTag("products");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?limit=${limit}&sort=${sort}`,
  );
  return res.json() as Promise<ApiResponse<Product[]>>;
}

export async function fetchActiveBanners() {
  "use cache";
  cacheTag("banners");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners/active`);
  return res.json() as Promise<ApiResponse<Banner[]>>;
}

export async function fetchNewArrivals(limit = 5) {
  "use cache";
  cacheTag("new-arrivals");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/new-arrivals?limit=${limit}`,
  );
  return res.json() as Promise<ApiResponse<Product[]>>;
}
