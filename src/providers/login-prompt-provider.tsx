"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoginPromptModal } from "@/components/molecules/login-prompt-modal";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";

interface LoginPromptContextValue {
  isOpen: boolean;
  openPrompt: () => void;
  closePrompt: () => void;
}

const LoginPromptContext = createContext<LoginPromptContextValue | null>(null);

export function useLoginPrompt() {
  const ctx = useContext(LoginPromptContext);
  if (!ctx)
    throw new Error("useLoginPrompt must be used within LoginPromptProvider");
  return ctx;
}

const checkLocalItems = () => {
  if (typeof window === "undefined") return false;
  const cartItems = useCartStore.getState().items;
  const wishlistItems = useWishlistStore.getState().items;
  return cartItems.length > 0 || wishlistItems.length > 0;
};

export function LoginPromptProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [hasShownForSession, setHasShownForSession] = useState(false);

  const openPrompt = useCallback(() => setIsOpen(true), []);
  const closePrompt = useCallback(() => setIsOpen(false), []);

  // beforeunload listener
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!session && checkLocalItems()) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [session]);

  // Mouse leave viewport (desktop exit intent)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        !session &&
        !isOpen &&
        !hasShownForSession &&
        e.clientY <= 0 &&
        checkLocalItems()
      ) {
        setIsOpen(true);
        setHasShownForSession(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [session, isOpen, hasShownForSession]);

  // Reset hasShownForSession when session changes
  useEffect(() => {
    if (session) {
      setHasShownForSession(false);
    }
  }, [session]);

  return (
    <LoginPromptContext.Provider value={{ isOpen, openPrompt, closePrompt }}>
      {children}
      <LoginPromptModal isOpen={isOpen} onClose={closePrompt} />
    </LoginPromptContext.Provider>
  );
}
