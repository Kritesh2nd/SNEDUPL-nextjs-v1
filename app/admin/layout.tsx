"use client";
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Leaf, Shield } from "lucide-react";

const DUMMY = { username:"admin", password:"admin123" };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed]   = useState(false);
  const [form, setForm]       = useState({ username:"", password:"" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!form.username.trim() || !form.password.trim()) { setError("Please enter credentials"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    if (form.username === DUMMY.username && form.password === DUMMY.password) {
      setAuthed(true);
    } else {
      setError("Invalid username or password");
    }
    setLoading(false);
  };

  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background:"radial-gradient(ellipse at 40% 30%, rgba(22,163,74,0.1) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(37,99,235,0.07) 0%, transparent 50%), #030c06", fontFamily:"'Outfit',sans-serif" }}>
      {/* Dot grid */}
      <div className="fixed inset-0 dot-grid opacity-25 pointer-events-none" />

      <div className="relative w-full max-w-sm fade-up">
        {/* Card */}
        <div className="rounded-2xl overflow-hidden" style={{ border:"1px solid rgba(74,222,128,0.15)", background:"#0a1a0d" }}>
          {/* Top band */}
          <div className="relative h-20 flex items-center justify-center overflow-hidden"
            style={{ background:"linear-gradient(135deg, rgba(22,163,74,0.1) 0%, rgba(37,99,235,0.1) 100%)" }}>
            <div className="absolute inset-0 dot-grid opacity-40" />
            <div className="relative flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center glow-green"
                style={{ background:"rgba(34,197,94,0.15)", border:"1.5px solid rgba(74,222,128,0.4)" }}>
                <Leaf size={16} style={{ color:"var(--g400)" }} />
              </div>
              <div>
                <p className="font-display text-lg text-white leading-none">Everest Admin</p>
                <p className="text-[9px] tracking-[0.2em] uppercase" style={{ color:"var(--g500)" }}>Secure Access</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={12} style={{ color:"var(--g400)" }} />
              <p className="text-[11px] text-white/40">
                Demo credentials: <code className="font-mono" style={{ color:"var(--g400)" }}>admin / admin123</code>
              </p>
            </div>
            <Input label="Username" value={form.username}
              onChange={e => { setForm(p=>({...p,username:e.target.value})); setError(""); }}
              onKeyDown={e => e.key==="Enter" && handleLogin()} />
            <Input label="Password" type="password" value={form.password}
              onChange={e => { setForm(p=>({...p,password:e.target.value})); setError(""); }}
              onKeyDown={e => e.key==="Enter" && handleLogin()}
              error={error} />
            <Button variant="primary" size="lg" loading={loading} onClick={handleLogin} className="w-full mt-2">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return <AdminLayout>{children}</AdminLayout>;
}
