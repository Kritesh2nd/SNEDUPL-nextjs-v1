"use client";
import { useState } from "react";
import { LogOut, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeLocalStorage } from "@/lib/utils";

export default function LogoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    // setLoggedIn(false);
    // setAccessToken("");
    removeLocalStorage("token");
    // router.push("/login");
  };

  return (
    <div className="page-enter flex items-center justify-center min-h-[60vh]">
      <div
        className="glass-card rounded-sm p-12 max-w-md w-full text-center border border-red-500/10"
        style={{
          background: "#0a1a0d",
          border: "1px solid rgba(74,222,128,0.1)",
        }}
      >
        {/* Icon */}
        <div className="w-20 h-20 rounded-sm bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <LogOut size={32} className="text-red-400" />
        </div>

        <h1 className="font-display text-3xl font-bold text-white mb-3">
          Sign Out
        </h1>
        <p className="font-body text-sm text-slate-400 leading-relaxed mb-8">
          Are you sure you want to log out of the AURA Admin Panel? Any unsaved
          changes will be lost.
        </p>

        <div className="aura-divider mb-8" />

        <div className="flex flex-col gap-3">
          <button
            className="btn-danger justify-center w-full py-3 border "
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw size={15} className="animate-spin" />
                <span>Signing Out...</span>
              </>
            ) : (
              <>
                <LogOut size={15} />
                <span>Yes, Log Me Out</span>
              </>
            )}
          </button>

          <Link href="/dashboard">
            <button className="btn-outline w-full justify-center py-3 border">
              <ArrowLeft size={14} />
              <span>Return to Dashboard</span>
            </button>
          </Link>
        </div>

        <p className="font-body text-xs text-slate-600 mt-6">
          AURA Admin Panel · Secure Session
        </p>
      </div>
    </div>
  );
}
