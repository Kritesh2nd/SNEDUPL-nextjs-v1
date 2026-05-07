"use client";
import React, { useState } from "react";
import { useSite } from "@/context/SiteContext";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Shield, User, Mail, AtSign } from "lucide-react";

const DUMMY_PASSWORD = "admin123";

export default function AdminProfilePage() {
  const { adminProfile } = useSite();
  const [pwForm, setPwForm] = useState({ current:"", next:"", confirm:"" });
  const [pwErrors, setPwErrors] = useState<Record<string,string>>({});
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);

  const changePassword = async () => {
    const e: Record<string,string> = {};
    if (pwForm.current !== DUMMY_PASSWORD) e.current = "Incorrect current password";
    if (!pwForm.next || pwForm.next.length < 6) e.next = "Minimum 6 characters";
    if (pwForm.next !== pwForm.confirm) e.confirm = "Passwords do not match";
    setPwErrors(e);
    if (Object.keys(e).length) return;
    setPwLoading(true);
    await new Promise(r => setTimeout(r, 900));
    console.log("Password change requested (backend integration pending)");
    setPwLoading(false); setPwSuccess(true);
    setPwForm({ current:"", next:"", confirm:"" });
    setTimeout(() => setPwSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-xl">
      <div>
        <h1 className="font-display text-3xl text-white">Admin Profile</h1>
        <p className="text-white/40 text-sm mt-1">Profile data is managed from the backend environment file</p>
      </div>

      {/* Profile display card – read-only */}
      <div className="rounded-xl overflow-hidden" style={{ border:"1px solid rgba(74,222,128,0.15)" }}>
        {/* Header band */}
        <div className="relative h-24 overflow-hidden" style={{
          background:"linear-gradient(135deg, rgba(22,163,74,0.15) 0%, rgba(37,99,235,0.15) 100%)"
        }}>
          <div className="absolute inset-0 dot-grid opacity-40" />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background:"linear-gradient(90deg, transparent, rgba(74,222,128,0.3), transparent)" }} />
        </div>

        {/* Avatar */}
        <div className="px-6 pb-6" style={{ background:"#0a1a0d" }}>
          <div className="relative -mt-10 mb-4 inline-block">
            <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center"
              style={{ background:"linear-gradient(135deg, rgba(22,163,74,0.3), rgba(37,99,235,0.3))", border:"3px solid #0a1a0d", boxShadow:"0 0 0 1px rgba(74,222,128,0.25)" }}>
              {adminProfile.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={adminProfile.avatarUrl} alt={adminProfile.name} className="w-full h-full object-cover rounded-full" />
              ) : (
                <span className="font-display text-3xl" style={{ color:"var(--g400)" }}>{adminProfile.name[0]}</span>
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background:"var(--g600)", border:"2px solid #0a1a0d" }}>
              <Shield size={10} className="text-white" />
            </div>
          </div>

          <div className="flex items-start justify-between flex-wrap gap-2 mb-5">
            <div>
              <h2 className="font-display text-2xl text-white">{adminProfile.name}</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block tag-green">Administrator</span>
            </div>
            <div className="text-[10px] text-white/25 text-right leading-relaxed">
              <p>Profile managed via</p>
              <p className="font-mono" style={{ color:"var(--g500)" }}>ENV configuration</p>
            </div>
          </div>

          {/* Info rows */}
          <div className="space-y-3">
            {[
              { icon: User,   label:"Display Name", value: adminProfile.name },
              { icon: Mail,   label:"Email",         value: adminProfile.email },
              { icon: AtSign, label:"Username",      value: adminProfile.username },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3 rounded-lg" style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)" }}>
                <Icon size={14} className="flex-shrink-0" style={{ color:"var(--g400)" }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white/35 uppercase tracking-wider">{label}</p>
                  <p className="text-sm text-white/75 mt-0.5">{value}</p>
                </div>
                <span className="text-[9px] text-white/20 uppercase tracking-wider flex-shrink-0">Read-only</span>
              </div>
            ))}
          </div>

          <div className="mt-4 px-4 py-3 rounded-lg" style={{ background:"rgba(59,130,246,0.06)", border:"1px solid rgba(96,165,250,0.12)" }}>
            <p className="text-[11px] leading-relaxed" style={{ color:"rgba(147,197,253,0.7)" }}>
              💡 Profile information (name, email, username, avatar) is configured in your backend environment variables and cannot be edited from this panel. Contact your system administrator to update profile details.
            </p>
          </div>
        </div>
      </div>

      {/* Password change */}
      <div className="rounded-xl p-6 space-y-4" style={{ background:"#0a1a0d", border:"1px solid rgba(74,222,128,0.1)" }}>
        <div>
          <h2 className="text-sm font-semibold text-white tracking-wide">Change Password</h2>
          <p className="text-xs text-white/35 mt-1">
            Demo hint: current password is <code className="font-mono px-1 py-0.5 rounded text-[11px]" style={{ background:"rgba(74,222,128,0.1)", color:"var(--g400)" }}>admin123</code>
          </p>
        </div>
        <Input label="Current Password" type="password" value={pwForm.current}
          onChange={e => { setPwForm(p=>({...p,current:e.target.value})); setPwErrors(p=>({...p,current:""})); }}
          error={pwErrors.current} />
        <Input label="New Password" type="password" value={pwForm.next}
          onChange={e => { setPwForm(p=>({...p,next:e.target.value})); setPwErrors(p=>({...p,next:""})); }}
          error={pwErrors.next} />
        <Input label="Confirm New Password" type="password" value={pwForm.confirm}
          onChange={e => { setPwForm(p=>({...p,confirm:e.target.value})); setPwErrors(p=>({...p,confirm:""})); }}
          error={pwErrors.confirm} />
        <div className="flex items-center gap-3 pt-1">
          <Button variant="secondary" loading={pwLoading} onClick={changePassword}>Update Password</Button>
          {pwSuccess && <span className="text-xs fade-up" style={{ color:"var(--g400)" }}>✓ Password updated</span>}
        </div>
      </div>
    </div>
  );
}
