"use client";

import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  error?: string;
}

export function PhoneInput({
  value = "",
  onChange,
  onBlur,
  placeholder = "01XXXXXXXXX",
  disabled = false,
  name,
  error,
}: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let cleaned = e.target.value.replace(/[\s-]/g, "");
    cleaned = cleaned.replace(/^\+?88/, "");
    cleaned = cleaned.replace(/\D/g, "");
    cleaned = cleaned.replace(/^0+/, "0");
    cleaned = cleaned.slice(0, 11);
    onChange?.(cleaned);
  };

  const isValid = value.length === 11 && /^01\d{9}$/.test(value);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-stretch">
        <div className="flex items-center gap-1.5 px-3 bg-surface/50 border border-r-0 border-border rounded-l-sm">
          <Image src="/bangladesh.png" alt="BD Flag" width={20} height={20} />
          <span className="font-semibold text-sm text-foreground">+88</span>
        </div>
        <input
          id={name}
          name={name}
          type="tel"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={!!error}
          className={`flex-1 bg-surface/50 px-3 py-3 border rounded-r-sm focus:outline-none focus:border-primary text-sm transition-colors ${
            error
              ? "border-error"
              : isValid
                ? "border-success"
                : "border-border"
          }`}
        />
        {isValid && (
          <div className="flex items-center px-3 text-success">
            <Check size={18} />
          </div>
        )}
      </div>
      {error && <p className="text-error text-xs">{error}</p>}
    </div>
  );
}
