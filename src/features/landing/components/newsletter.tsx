"use client";

import { Button } from "@/components/atoms/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <Mail className="mx-auto mb-6 size-12 opacity-50" />
          <h2 className="mb-4 font-heading text-4xl font-bold">
            Join the Rofaar Community
          </h2>
          <p className="mb-10 text-lg opacity-80">
            Receive updates on new collections, spiritual insights, and
            exclusive community offers.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 border-none bg-white px-6 py-3 text-black focus:outline-none focus:ring-2 focus:ring-white/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={isSubmitting}
              className="h-12 px-8 text-base font-bold uppercase tracking-widest"
            >
              {isSubmitting ? "Joining..." : "Subscribe"}
            </Button>
          </form>
          <p className="mt-4 text-xs opacity-50">
            By subscribing, you agree to our Privacy Policy and Terms of
            Service.
          </p>
        </div>
      </div>
    </section>
  );
}
