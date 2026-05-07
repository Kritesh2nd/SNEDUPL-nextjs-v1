"use client";
import React from "react";
import { clsx } from "clsx";

interface Props {
  size?: "sm" | "md" | "lg";
  className?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = "md",
  className,
  fullScreen,
}: Props) {
  const sizes = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };
  const spinner = (
    <span
      className={clsx(
        "border-2 border-green-700/30 border-t-green-500 rounded-full inline-block",
        sizes[size],
        className,
      )}
      style={{ animation: "spin 0.7s linear infinite" }}
    />
  );
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          <p className="text-sm text-white/50 tracking-widest uppercase">
            Loading…
          </p>
        </div>
      </div>
    );
  }
  return spinner;
}
