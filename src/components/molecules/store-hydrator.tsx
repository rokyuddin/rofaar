"use client";

import { useEffect } from "react";
import { useSyncGuestItems } from "@/hooks/use-sync-guest-items";
import { hydrateStores } from "@/stores/hydrate";

export function StoreHydrator() {
  useSyncGuestItems();

  useEffect(() => {
    hydrateStores();
  }, []);

  return null;
}
