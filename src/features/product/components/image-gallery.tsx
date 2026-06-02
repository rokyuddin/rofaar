"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/api";

interface ImageGalleryProps {
  images: ProductImage[];
  name: string;
}

export function ImageGallery({ images, name }: ImageGalleryProps) {
  const sorted = [...images].sort((a, b) => a.sortOrder - b.sortOrder);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = sorted[selectedIndex] ?? sorted[0];

  if (!selected) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={selected.url}
          alt={`${name} - image ${selected.sortOrder + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      {sorted.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {sorted.map((img, idx) => (
            <button
              type="button"
              key={img.id ?? img.sortOrder}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                "relative size-16 shrink-0 overflow-hidden bg-muted ring-offset-background transition-all",
                idx === selectedIndex
                  ? "ring-2 ring-foreground"
                  : "ring-1 ring-transparent hover:ring-foreground/30",
              )}
            >
              <Image
                src={img.url}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
