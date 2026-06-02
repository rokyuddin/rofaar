"use cache";

import type { Metadata } from "next";
import {
  Noto_Serif,
  Karla,
  JetBrains_Mono,
  Outfit,
  DM_Sans,
} from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/organisms/json-ld";
import { cn } from "@/lib/utils";

const dmSansHeading = DM_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rofaar.com"), // Placeholder URL, update with actual domain
  title: {
    default: "Rofaar - Tools for the Productive Believer",
    template: "%s | Rofaar",
  },
  description:
    "Reconnect with tradition through handcrafted goods designed for spiritual focus and daily barakah.",
  keywords: [
    "Islamic lifestyle",
    "productive believer",
    "handcrafted goods",
    "spiritual focus",
    "barakah",
    "Muslim lifestyle",
    "Islamic goods",
    "Islamic Products",
  ],
  authors: [{ name: "Rofaar Team" }],
  creator: "Rofaar",
  publisher: "Rofaar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rofaar.com",
    title: "Rofaar - Tools for the Productive Believer",
    description:
      "Reconnect with tradition through handcrafted goods designed for spiritual focus and daily barakah.",
    siteName: "Rofaar",
    images: [
      {
        url: "/og-image.png", // Ensure this exists or add to tasks
        width: 1200,
        height: 630,
        alt: "Rofaar - Tools for the Productive Believer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rofaar - Tools for the Productive Believer",
    description:
      "Reconnect with tradition through handcrafted goods designed for spiritual focus and daily barakah.",
    images: ["/og-image.png"],
    creator: "@rofaar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/logo.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/atoms/tooltip";
import { QueryProvider } from "@/providers/query-provider";
import { SessionProvider } from "@/providers/session-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        jetbrainsMono.variable,
        "font-sans",
        outfit.variable,
        dmSansHeading.variable,
      )}
    >
      <body
        className={`${notoSerif.variable} ${karla.variable} antialiased`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <QueryProvider>
            <NuqsAdapter>
              <TooltipProvider>
                <JsonLd />
                {children}
                <Toaster position="top-center" richColors />
              </TooltipProvider>
            </NuqsAdapter>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
