"use client";
import React from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "outline-blue";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-body font-semibold tracking-wide rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden transition-all duration-300";

  const variants: Record<string, string> = {
    primary: "btn-electric text-white",
    secondary: "btn-electric-blue text-white",
    outline:
      "bg-transparent border border-[var(--g400)] text-[var(--g400)] hover:bg-[rgba(74,222,128,0.08)] hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]",
    "outline-blue":
      "bg-transparent border border-[var(--b400)] text-[var(--b400)] hover:bg-[rgba(96,165,250,0.08)] hover:shadow-[0_0_20px_rgba(96,165,250,0.2)]",
    ghost:
      "bg-transparent text-[var(--g400)] hover:text-[var(--g300)] hover:bg-[rgba(74,222,128,0.06)]",
    danger:
      "bg-red-900/40 hover:bg-red-800/60 text-red-300 border border-red-800/50 hover:border-red-600/60",
  };

  const sizes: Record<string, string> = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-sm px-7 py-3 tracking-wider",
    xl: "text-base px-10 py-4 tracking-widest uppercase",
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          style={{ animation: "spin 0.7s linear infinite" }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
