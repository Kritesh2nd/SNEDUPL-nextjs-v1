"use client";
import React from "react";
import Link from "next/link";
import { useSite } from "@/context/SiteContext";
import { Package, Users, MessageSquare, Mail, Edit3, Phone, ArrowRight, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  const { siteContent, inquiries, adminProfile } = useSite();
  const unread = inquiries.filter(q => !q.read).length;
  const featured = siteContent.products.filter(p => p.featured).length;

  const stats = [
    { label:"Total Products",     value:siteContent.products.length, icon:Package,      href:"/admin/products",  color:"var(--g400)", bg:"rgba(34,197,94,0.08)",   border:"rgba(74,222,128,0.15)" },
    { label:"Leadership Profiles",value:siteContent.leadership.length,icon:Users,        href:"/admin/leadership",color:"var(--b400)", bg:"rgba(59,130,246,0.08)",  border:"rgba(96,165,250,0.15)" },
    { label:"Total Inquiries",    value:inquiries.length,             icon:MessageSquare,href:"/admin/inquiries", color:"var(--g300)", bg:"rgba(134,239,172,0.08)", border:"rgba(134,239,172,0.15)" },
    { label:"Unread Messages",    value:unread,                       icon:Mail,          href:"/admin/inquiries", color:"#fbbf24",     bg:"rgba(251,191,36,0.08)",  border:"rgba(251,191,36,0.15)" },
  ];

  const quickLinks = [
    { href:"/admin/products",   label:"Manage Products",   desc:`${siteContent.products.length} products · ${featured} featured`, icon:Package },
    { href:"/admin/leadership", label:"Leadership",         desc:`${siteContent.leadership.length} profiles`,                      icon:Users },
    { href:"/admin/hero",       label:"Hero & About",       desc:"Edit homepage messaging",                                        icon:Edit3 },
    { href:"/admin/contact",    label:"Contact Info",       desc:"Update addresses & social links",                                icon:Phone },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl text-white">
            Welcome back, <span style={{ color:"var(--g400)" }}>{adminProfile.name}</span>
          </h1>
          <p className="text-white/35 text-sm mt-1">Here&apos;s an overview of your site content</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background:"rgba(34,197,94,0.06)", border:"1px solid rgba(74,222,128,0.12)" }}>
          <TrendingUp size={13} style={{ color:"var(--g400)" }} />
          <span className="text-xs" style={{ color:"var(--g400)" }}>All systems operational</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(s => (
          <Link key={s.label} href={s.href}>
            <div className="rounded-xl p-5 hover:scale-[1.02] transition-transform cursor-pointer group"
              style={{ background:s.bg, border:`1px solid ${s.border}` }}>
              <div className="flex items-start justify-between mb-3">
                <s.icon size={18} style={{ color:s.color }} />
                <ArrowRight size={13} className="text-white/20 group-hover:text-white/50 transition-colors" />
              </div>
              <p className="font-display text-4xl mb-1" style={{ color:s.color }}>{s.value}</p>
              <p className="text-[11px] text-white/40 tracking-wider uppercase">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xs text-white/35 tracking-[0.2em] uppercase mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickLinks.map(a => (
            <Link key={a.href} href={a.href}>
              <div className="rounded-xl p-4 hover:border-[rgba(74,222,128,0.2)] transition-all cursor-pointer group"
                style={{ background:"#0a1a0d", border:"1px solid rgba(255,255,255,0.06)" }}>
                <a.icon size={16} className="mb-2" style={{ color:"var(--g400)" }} />
                <p className="text-sm text-white group-hover:text-[var(--g300)] transition-colors">{a.label}</p>
                <p className="text-[11px] text-white/35 mt-1">{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent inquiries */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs text-white/35 tracking-[0.2em] uppercase">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-xs transition-colors" style={{ color:"var(--g400)" }}>
            View All →
          </Link>
        </div>
        <div className="space-y-2">
          {inquiries.slice(0, 5).map((inq, i) => (
            <Link key={i} href="/admin/inquiries">
              <div className="rounded-xl px-4 py-3 flex items-center gap-4 hover:border-[rgba(74,222,128,0.15)] transition-all"
                style={{ background:inq.read?"rgba(10,26,13,0.5)":"#0a1a0d", border:`1px solid ${inq.read?"rgba(255,255,255,0.05)":"rgba(74,222,128,0.15)"}` }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm truncate ${inq.read?"text-white/50":"text-white font-medium"}`}>{inq.name}</p>
                    {!inq.read && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 pulse-glow" style={{ background:"var(--g400)" }} />}
                  </div>
                  <p className="text-xs text-white/30 truncate mt-0.5">{inq.subject}</p>
                </div>
                <p className="text-xs text-white/20 flex-shrink-0 hidden sm:block">
                  {new Date(inq.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
          {inquiries.length === 0 && (
            <p className="text-white/25 text-sm text-center py-8">No inquiries yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
