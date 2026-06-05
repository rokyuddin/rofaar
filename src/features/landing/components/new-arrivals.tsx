import { fetchNewArrivals } from "@/lib/api-server";
import { NewArrivalsClient } from "./new-arrivals-client";

export async function NewArrivals({ limit = 5 }: { limit: number }) {
  const newArrivalsRes = await fetchNewArrivals(limit);

  return <NewArrivalsClient initialProducts={newArrivalsRes.data || []} limit={limit} />;
}