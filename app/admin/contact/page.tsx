"use client";
import React, { useState } from "react";
import { useSite } from "@/context/SiteContext";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import type { ContactInfo } from "@/types";

export default function AdminContactPage() {
  const { siteContent, updateContact } = useSite();
  const [form, setForm] = useState<ContactInfo>({ ...siteContent.contactInfo });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.factoryAddress.trim()) e.factoryAddress = "Factory address required";
    if (!form.officeAddress.trim())  e.officeAddress  = "Office address required";
    if (!form.phone.trim())          e.phone          = "Phone required";
    if (!form.email.trim())          e.email          = "Email required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    updateContact(form);
    console.log("Contact info updated:", form);
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const setField = (key: keyof ContactInfo, value: string) =>
    setForm(p => ({ ...p, [key]: value }));
  const setSocial = (key: string, value: string) =>
    setForm(p => ({ ...p, socialLinks: { ...p.socialLinks, [key]: value } }));
  const clearErr  = (key: string) => setErrors(p => ({ ...p, [key]: "" }));

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display text-3xl text-white">Contact Information</h1>
        <p className="text-white/40 text-sm mt-1">Update public contact details shown across the website</p>
      </div>

      {/* Addresses */}
      <div className="rounded-xl p-6 space-y-4" style={{ background:"#0a1a0d", border:"1px solid rgba(74,222,128,0.1)" }}>
        <h2 className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase">Addresses</h2>
        <Textarea label="Factory Address"
          value={form.factoryAddress}
          onChange={e => { setField("factoryAddress", e.target.value); clearErr("factoryAddress"); }}
          error={errors.factoryAddress} rows={2}
          placeholder="Kohalpur, Banke, Nepal" />
        <Textarea label="Corporate Office Address"
          value={form.officeAddress}
          onChange={e => { setField("officeAddress", e.target.value); clearErr("officeAddress"); }}
          error={errors.officeAddress} rows={2}
          placeholder="Koteshwor, Kathmandu, Nepal" />
      </div>

      {/* Contact details */}
      <div className="rounded-xl p-6 space-y-4" style={{ background:"#0a1a0d", border:"1px solid rgba(74,222,128,0.1)" }}>
        <h2 className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase">Contact Details</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Phone"
            value={form.phone}
            onChange={e => { setField("phone", e.target.value); clearErr("phone"); }}
            error={errors.phone}
            placeholder="+977 9768534235" />
          <Input label="Email" type="email"
            value={form.email}
            onChange={e => { setField("email", e.target.value); clearErr("email"); }}
            error={errors.email}
            placeholder="info.everestdistillery@gmail.com" />
        </div>
      </div>

      {/* Social links */}
      <div className="rounded-xl p-6 space-y-4" style={{ background:"#0a1a0d", border:"1px solid rgba(74,222,128,0.1)" }}>
        <h2 className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase">Social Links</h2>
        {(["facebook","instagram","linkedin","twitter"] as const).map(platform => (
          <Input key={platform}
            label={platform.charAt(0).toUpperCase() + platform.slice(1)}
            value={form.socialLinks[platform] || ""}
            onChange={e => setSocial(platform, e.target.value)}
            placeholder={`https://${platform}.com/everestdistillery`} />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="primary" loading={loading} onClick={handleSave}>Save Contact Info</Button>
        {saved && <span className="text-xs fade-up" style={{ color:"var(--g400)" }}>✓ Saved successfully</span>}
      </div>
    </div>
  );
}
