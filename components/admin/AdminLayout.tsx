"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  Phone,
  MessageSquare,
  Settings,
  ChevronLeft,
  Menu,
  Home,
  Edit3,
  Leaf,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero & About", icon: Edit3 },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/leadership", label: "Leadership", icon: Users },
  { href: "/admin/contact", label: "Contact Info", icon: Phone },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/profile", label: "My Profile", icon: Settings },
];

function SidebarContent({
  mobile,
  collapsed,
  onNavClick,
}: {
  mobile?: boolean;
  collapsed?: boolean;
  onNavClick?: () => void;
}) {
  const pathname = usePathname();
  const slim = !mobile && collapsed;

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: "#050d07",
        borderRight: "1px solid rgba(74,222,128,0.08)",
      }}
    >
      {/* Logo */}
      <div
        className="px-4 py-5 flex items-center gap-3"
        style={{ borderBottom: "1px solid rgba(74,222,128,0.07)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: "rgba(34,197,94,0.1)",
            border: "1px solid rgba(74,222,128,0.3)",
          }}
        >
          <Leaf size={14} style={{ color: "var(--g400)" }} />
        </div>
        {!slim && (
          <div className="overflow-hidden">
            <p className="text-sm font-display text-white leading-tight truncate">
              Everest Admin
            </p>
            <p
              className="text-[9px] tracking-[0.2em] uppercase"
              style={{ color: "var(--g500)" }}
            >
              Control Panel
            </p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                active
                  ? "text-black font-semibold"
                  : "text-white/40 hover:text-white/80"
              }`}
              style={
                active
                  ? {
                      background: "var(--g500)",
                      boxShadow: "0 0 12px rgba(34,197,94,0.25)",
                    }
                  : {}
              }
            >
              <Icon size={15} className="flex-shrink-0" />
              {!slim && <span className="text-xs truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="px-2 py-3 space-y-0.5"
        style={{ borderTop: "1px solid rgba(74,222,128,0.07)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/25 hover:text-white/55 transition-colors"
        >
          <Home size={14} />
          {!slim && <span className="text-xs">Back to Site</span>}
        </Link>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const currentLabel = NAV.find((n) => n.href === pathname)?.label || "Admin";

  return (
    <div
      className="min-h-screen flex"
      style={{
        fontFamily: "'Outfit',sans-serif",
        background: "#030c06",
        color: "var(--cream)",
      }}
    >
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}
      >
        <SidebarContent collapsed={collapsed} />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all hover:scale-110"
          style={{
            background: "#0a1a0d",
            border: "1px solid rgba(74,222,128,0.25)",
          }}
        >
          <ChevronLeft
            size={12}
            style={{
              color: "var(--g400)",
              transform: collapsed ? "rotate(180deg)" : "none",
              transition: "transform 0.3s",
            }}
          />
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-60 z-50">
            <SidebarContent mobile onNavClick={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <main
        className={`flex-1 min-h-screen transition-all duration-300 ${collapsed ? "lg:ml-16" : "lg:ml-60"}`}
      >
        {/* Topbar */}
        <div
          className="sticky top-0 z-20 px-4 py-3 flex items-center gap-4"
          style={{
            background: "rgba(3,12,6,0.92)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(74,222,128,0.06)",
          }}
        >
          <button
            className="lg:hidden text-white/50 hover:text-white transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div
            className="h-4 w-px hidden lg:block"
            style={{ background: "rgba(74,222,128,0.2)" }}
          />
          <p
            className="text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: "var(--g400)" }}
          >
            {currentLabel}
          </p>
        </div>

        <div className="p-5 md:p-8">{children}</div>
      </main>
    </div>
  );
}
