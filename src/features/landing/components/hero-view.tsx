import { fetchActiveBanners } from "@/lib/api-server";
import { Hero } from "./hero";

export async function HeroView() {
  const bannersRes = await fetchActiveBanners();
  const banner = bannersRes.data?.[0];

  return <Hero banner={banner ?? null} />;
}
