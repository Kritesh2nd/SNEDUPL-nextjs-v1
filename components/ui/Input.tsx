"use client";
import React from "react";
import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; error?: string; helpText?: string;
}
export function Input({ label, error, helpText, className, id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={inputId} className="text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--g300)" }}>{label}</label>}
      <input id={inputId} className={clsx(
        "bg-white/4 rounded-sm px-4 py-2.5 text-sm outline-none transition-all duration-200",
        "placeholder:text-white/25 text-white/90",
        "focus:bg-white/6 focus:ring-1",
        error
          ? "border border-red-500/60 focus:ring-red-500/30"
          : "border border-white/10 hover:border-white/20 focus:border-[var(--g500)] focus:ring-[rgba(34,197,94,0.2)]",
        className
      )} {...props} />
      {error    && <p className="text-xs text-red-400">{error}</p>}
      {helpText && !error && <p className="text-xs text-white/35">{helpText}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string; error?: string;
}
export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={inputId} className="text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--g300)" }}>{label}</label>}
      <textarea id={inputId} className={clsx(
        "bg-white/4 rounded-sm px-4 py-2.5 text-sm outline-none transition-all duration-200 resize-none",
        "placeholder:text-white/25 text-white/90",
        "focus:bg-white/6 focus:ring-1",
        error
          ? "border border-red-500/60 focus:ring-red-500/30"
          : "border border-white/10 hover:border-white/20 focus:border-[var(--g500)] focus:ring-[rgba(34,197,94,0.2)]",
        className
      )} {...props} />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string; error?: string; options: { value: string; label: string }[];
}
export function Select({ label, error, options, className, id, ...props }: SelectProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={inputId} className="text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: "var(--g300)" }}>{label}</label>}
      <select id={inputId} className={clsx(
        "bg-[#0d1a0f] rounded-sm px-4 py-2.5 text-sm text-white/90 outline-none transition-all duration-200",
        error ? "border border-red-500/60" : "border border-white/10 hover:border-white/20 focus:border-[var(--g500)]",
        className
      )} {...props}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
