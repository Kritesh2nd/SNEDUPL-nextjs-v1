"use client";

import { useSite } from "@/context/SiteContext";
import { Shield, User, Mail, AtSign } from "lucide-react";
import { getBaseUrl } from "@/lib/utils";
import Image from "next/image";

export default function AdminProfilePage() {
  const { adminProfile } = useSite();

  return (
    <div className="space-y-8 max-w-xl">
      <div>
        <h1 className="font-display text-3xl text-white">Admin Profile</h1>
        <p className="text-white/40 text-sm mt-1">
          Profile data is managed from the backend environment file
        </p>
      </div>

      {/* Profile display card – read-only */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid rgba(74,222,128,0.15)" }}
      >
        {/* Header band */}
        <div
          className="relative h-24 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(22,163,74,0.15) 0%, rgba(37,99,235,0.15) 100%)",
          }}
        >
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(74,222,128,0.3), transparent)",
            }}
          />
        </div>

        {/* Avatar */}
        <div className="px-6 pb-6" style={{ background: "#0a1a0d" }}>
          <div className="relative -mt-10 mb-4 inline-block">
            {/* {`${getBaseUrl()}${adminProfile.avatarUrl}`} */}
            <div
              className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(22,163,74,1), rgba(37,99,235,1))",
                border: "3px solid #0a1a0d",
                boxShadow: "0 0 0 1px rgba(74,222,128,0.25)",
              }}
            >
              {adminProfile.avatarUrl ? (
                <div className="relative w-20 h-20">
                  <Image
                    unoptimized
                    src={"/public/images/leadership/admin-profile.png"}
                    fill
                    className="object-cover rounded-full"
                    alt={adminProfile.name}
                  />
                </div>
              ) : (
                <span
                  className="font-display text-3xl"
                  style={{ color: "var(--g400)" }}
                >
                  {adminProfile.name[0]}
                </span>
              )}
            </div>
            <div
              className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "var(--g600)", border: "2px solid #0a1a0d" }}
            >
              <Shield size={10} className="text-white" />
            </div>
          </div>

          <div className="flex items-start justify-between flex-wrap gap-2 mb-5">
            <div>
              <h2 className="font-display text-2xl text-white">
                {adminProfile.name}
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block tag-green">
                Administrator
              </span>
            </div>
            <div className="text-[10px] text-white/25 text-right leading-relaxed">
              <p>Profile managed via</p>
              <p className="font-mono" style={{ color: "var(--g500)" }}>
                ENV configuration
              </p>
            </div>
          </div>

          {/* Info rows */}
          <div className="space-y-3">
            {[
              { icon: User, label: "Display Name", value: adminProfile.name },
              { icon: Mail, label: "Email", value: adminProfile.email },
              { icon: AtSign, label: "Username", value: adminProfile.username },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Icon
                  size={14}
                  className="flex-shrink-0"
                  style={{ color: "var(--g400)" }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white/35 uppercase tracking-wider">
                    {label}
                  </p>
                  <p className="text-sm text-white/75 mt-0.5">{value}</p>
                </div>
                <span className="text-[9px] text-white/20 uppercase tracking-wider flex-shrink-0">
                  Read-only
                </span>
              </div>
            ))}
          </div>

          <div
            className="mt-4 px-4 py-3 rounded-lg"
            style={{
              background: "rgba(59,130,246,0.06)",
              border: "1px solid rgba(96,165,250,0.12)",
            }}
          >
            <p
              className="text-[11px] leading-relaxed"
              style={{ color: "rgba(147,197,253,0.7)" }}
            >
              💡 Profile information (name, email, username, avatar) is
              configured in your backend environment variables and cannot be
              edited from this panel. Contact your system administrator to
              update profile details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
