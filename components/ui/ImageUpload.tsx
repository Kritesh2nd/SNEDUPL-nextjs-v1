"use client";
import React, { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { getBaseUrl } from "@/lib/utils";

interface ImageUploadProps {
  label?: string;
  value: string; // current URL or base64
  onChange: (dataUrl: string) => void;
  onClear?: () => void;
  className?: string;
  previewSize?: "sm" | "md" | "lg";
  circular?: boolean;
  setImage: (img: File | null) => void;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  onClear,
  className = "",
  previewSize = "md",
  circular = false,
  setImage,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [imageUpload, setImageUpload] = useState<boolean>(false);
  const [error, setError] = useState("");

  const previewSizes = { sm: "h-24", md: "h-40", lg: "h-56" };

  const processFile = (file: File) => {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
    };
    reader.readAsDataURL(file);
    setImage(file);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleClear = () => {
    onClear?.();
    onChange("");
    setError("");
    setImageUpload(false);
    setImage(null);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <span
          className="text-[11px] font-semibold tracking-[0.18em] uppercase"
          style={{ color: "var(--g300)" }}
        >
          {label}
        </span>
      )}
      {value ? (
        /* Preview */
        <div
          className={`relative ${previewSizes[previewSize]} ${circular ? "aspect-square" : "w-full"} group`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className={`w-full h-full object-cover ${circular ? "rounded-full" : "rounded-lg"} border border-white/10`}
          />
          {/* Overlay actions */}
          <div
            className={`absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 ${circular ? "rounded-full" : "rounded-lg"}`}
          >
            <button
              type="button"
              onClick={() => {
                inputRef.current?.click();
                setImageUpload(true);
              }}
              className="p-2 rounded-full bg-green-600/80 hover:bg-green-500 transition-colors text-white"
              title="Replace image"
            >
              <Upload size={14} />
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="p-2 rounded-full bg-red-700/80 hover:bg-red-600 transition-colors text-white"
              title="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        /* Drop zone */
        <div
          onClick={() => {
            inputRef.current?.click();
            setImageUpload(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`
            relative flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200
            ${previewSizes[previewSize]} ${circular ? "aspect-square rounded-full" : "w-full rounded-lg"}
            border-2 border-dashed
            ${
              dragging
                ? "border-[var(--g400)] bg-[rgba(34,197,94,0.08)]"
                : "border-white/15 hover:border-[var(--g500)] hover:bg-[rgba(34,197,94,0.04)]"
            }
          `}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(74,222,128,0.2)",
            }}
          >
            <ImageIcon size={18} style={{ color: "var(--g400)" }} />
          </div>
          <div className="text-center">
            <p className="text-xs text-white/50">
              {dragging ? "Drop to upload" : "Click or drag image here"}
            </p>
            <p className="text-[10px] text-white/25 mt-0.5">
              PNG, JPG, WEBP · Max 5 MB
            </p>
          </div>
        </div>
      )}
      {error && <p className="text-xs text-red-400">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
