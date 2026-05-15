"use client";
import React, { useState } from "react";
import { useSite } from "@/context/SiteContext";
import SectionTitle from "@/components/ui/SectionTitle";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { MapPin, Phone, Mail, Building2, Factory } from "lucide-react";
import { postInquirie } from "@/app/admin/inquiries/action";
import toast from "react-hot-toast";

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactSection() {
  const { siteContent, addInquiry } = useSite();
  const { contactInfo } = siteContent;
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10)
      e.message = "At least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    const res = await postInquirie(form);

    if (res.ok) {
      toast.success("Message sent Successfully");
    }

    if (!res.ok) {
      toast.error("Message failed to sent");
    }

    setLoading(false);
    setSuccess(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const setF =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [k]: e.target.value }));
      if (errors[k as keyof FormErrors])
        setErrors((p) => ({ ...p, [k]: undefined }));
    };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32"
      style={{ background: "var(--dark3)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          eyebrow="Get In Touch"
          title="Let's Connect"
          centered
          subtitle="Dealer inquiries, investor meetings, bulk orders, or just to say hello — we're here."
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="glass-green rounded-xl p-8">
            {success ? (
              <div className="text-center py-10">
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center glow-green"
                  style={{
                    background: "rgba(22,163,74,0.15)",
                    border: "1px solid rgba(74,222,128,0.3)",
                  }}
                >
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="font-display text-2xl text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-white/45 text-sm">
                  We&apos;ll get back to you within 24 hours.
                </p>
                <Button
                  className="mt-6"
                  variant="outline"
                  onClick={() => setSuccess(false)}
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Names"
                    placeholder="Your name"
                    value={form.name}
                    onChange={setF("name")}
                    error={errors.name}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={setF("email")}
                    error={errors.email}
                  />
                </div>
                <Input
                  label="Phone (optional)"
                  placeholder="+977 98..."
                  value={form.phone}
                  onChange={setF("phone")}
                />
                <Input
                  label="Subject"
                  placeholder="What is this regarding?"
                  value={form.subject}
                  onChange={setF("subject")}
                  error={errors.subject}
                />
                <Textarea
                  label="Message"
                  placeholder="Tell us more..."
                  rows={5}
                  value={form.message}
                  onChange={setF("message")}
                  error={errors.message}
                />
                <Button
                  variant="primary"
                  size="lg"
                  loading={loading}
                  onClick={handleSubmit}
                  className="w-full mt-1"
                >
                  Send Message
                </Button>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="glass-green rounded-xl p-5 flex gap-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(22,163,74,0.12)",
                  border: "1px solid rgba(74,222,128,0.2)",
                }}
              >
                <Factory size={16} style={{ color: "var(--g400)" }} />
              </div>
              <div>
                <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">
                  Factory
                </p>
                <p className="text-sm text-white/70">
                  {contactInfo.factoryAddress}
                </p>
              </div>
            </div>
            <div className="glass-green rounded-xl p-5 flex gap-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(96,165,250,0.2)",
                }}
              >
                <Building2 size={16} style={{ color: "var(--b400)" }} />
              </div>
              <div>
                <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">
                  Corporate Office
                </p>
                <p className="text-sm text-white/70">
                  {contactInfo.officeAddress}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div
                className="glass rounded-xl p-5 flex gap-3 items-start"
                style={{ border: "1px solid rgba(74,222,128,0.1)" }}
              >
                <Phone
                  size={14}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "var(--g400)" }}
                />
                <div>
                  <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-xs text-white/65 hover:text-[var(--g400)] transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              <div
                className="glass rounded-xl p-5 flex gap-3 items-start"
                style={{ border: "1px solid rgba(74,222,128,0.1)" }}
              >
                <Mail
                  size={14}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "var(--g400)" }}
                />
                <div>
                  <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-xs text-white/65 hover:text-[var(--g400)] transition-colors break-all"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>
            <div
              className="glass rounded-xl p-5"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-[10px] text-white/35 uppercase tracking-wider mb-3">
                Follow Us
              </p>
              <div className="flex gap-2">
                {Object.entries(contactInfo.socialLinks).map(
                  ([p, url]) =>
                    url && (
                      <a
                        key={p}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] px-3 py-1.5 rounded-sm capitalize text-white/45 hover:text-[var(--g400)] transition-colors"
                        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </a>
                    ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
