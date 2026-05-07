"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { isTokenExpired, setLocalStorage } from "@/lib/utils";
import { AdminLogin, LoginResponseDto } from "@/types";
import { Leaf } from "lucide-react";
import { loginUser } from "./action";
import { useSite } from "@/context/SiteContext";
import { useRouter } from "next/navigation";
import Loading from "@/components/sections/Loading";
import toast from "react-hot-toast";

const AdminLoginRender = () => {
  const route = useRouter();

  const [form, setForm] = useState<AdminLogin>({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateAdminProfile, setToken } = useSite();

  const handleLogin = async () => {
    if (!form.username.trim() || !form.password.trim()) {
      setError("Please enter credentials");
      return;
    }
    setLoading(true);

    const res = await loginUser(form);

    if (res.status == 200) {
      const userResponse: LoginResponseDto = await res.json();

      console.log("userResponse", userResponse);
      setToken(userResponse.token);
      updateAdminProfile(userResponse.user);
      setLocalStorage("token", userResponse.token);
      route.push("/admin");
      toast.success("Logged In");
    }
    if (!res.ok) {
      toast.error("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "radial-gradient(ellipse at 40% 30%, rgba(22,163,74,0.1) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(37,99,235,0.07) 0%, transparent 50%), #030c06",
        fontFamily: "'Outfit',sans-serif",
      }}
    >
      {/* Dot grid */}
      <div className="fixed inset-0 dot-grid opacity-25 pointer-events-none" />

      <div className="relative w-full max-w-sm fade-up">
        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(74,222,128,0.15)",
            background: "#0a1a0d",
          }}
        >
          {/* Top band */}
          <div
            className="relative h-20 flex items-center justify-center overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(22,163,74,0.1) 0%, rgba(37,99,235,0.1) 100%)",
            }}
          >
            <div className="absolute inset-0 dot-grid opacity-40" />
            <div className="relative flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center glow-green"
                style={{
                  background: "rgba(34,197,94,0.15)",
                  border: "1.5px solid rgba(74,222,128,0.4)",
                }}
              >
                <Leaf size={16} style={{ color: "var(--g400)" }} />
              </div>
              <div>
                <p className="font-display text-lg text-white leading-none">
                  Everest Admin
                </p>
                <p
                  className="text-[9px] tracking-[0.2em] uppercase"
                  style={{ color: "var(--g500)" }}
                >
                  Secure Access
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-4">
            <Input
              label="Username"
              value={form.username}
              onChange={(e) => {
                setForm((p) => ({ ...p, username: e.target.value }));
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => {
                setForm((p) => ({ ...p, password: e.target.value }));
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              error={error}
            />
            <Button
              variant="primary"
              size="lg"
              loading={loading}
              onClick={handleLogin}
              className="w-full mt-2"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminLoginPage = () => {
  const route = useRouter();
  const { token, hydration } = useSite();

  if (!hydration) return <Loading />;

  if (token != "" && !isTokenExpired(token)) {
    route.push("/admin");
  } else {
    return <AdminLoginRender />;
  }
};

export default AdminLoginPage;
