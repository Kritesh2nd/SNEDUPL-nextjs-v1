"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-xl",
}: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative w-full ${maxWidth} rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto`}
        style={{
          background: "#0a1a0d",
          border: "1px solid rgba(74,222,128,0.15)",
          animation: "fadeUp 0.22s ease both",
        }}
      >
        {title && (
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h3 className="font-display text-xl text-white">{title}</h3>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors p-1 hover:rotate-90 transition-transform duration-200"
            >
              <X size={17} />
            </button>
          </div>
        )}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
