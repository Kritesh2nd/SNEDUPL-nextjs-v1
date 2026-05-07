import ContactSection from "@/components/sections/ContactSection";
import SectionTitle from "@/components/ui/SectionTitle";
import { MessageSquare, Package, TrendingUp, Handshake } from "lucide-react";

const INQUIRY_TYPES = [
  {
    icon: Handshake,
    title: "Dealer Partnership",
    desc: "Become an authorized Everest Distillery dealer in your region.",
  },
  {
    icon: Package,
    title: "Bulk / Wholesale",
    desc: "Large volume orders for hotels, restaurants, and events.",
  },
  {
    icon: TrendingUp,
    title: "Investor Inquiry",
    desc: "Pre-IPO investment and partnership opportunities.",
  },
  {
    icon: MessageSquare,
    title: "General Inquiry",
    desc: "Product information, feedback, and anything else.",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 page-hero-bg overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span
            className="text-[11px] font-semibold tracking-[0.28em] uppercase"
            style={{ color: "var(--g400)" }}
          >
            Get In Touch
          </span>
          <h1 className="font-display text-5xl md:text-6xl xl:text-7xl text-white mt-4 mb-6">
            Let&apos;s
            <br />
            <span className="text-electric-green">Connect</span>
          </h1>
          <p className="text-white/45 text-base max-w-xl mx-auto">
            Whether you&apos;re a dealer, investor, hospitality partner, or just
            curious — we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Inquiry types */}
      <section className="py-12" style={{ background: "var(--dark2)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INQUIRY_TYPES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="glass-green rounded-xl p-5 text-center hover-lift group"
                style={{ border: "1px solid rgba(74,222,128,0.1)" }}
              >
                <div
                  className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(74,222,128,0.2)",
                  }}
                >
                  <Icon size={17} style={{ color: "var(--g400)" }} />
                </div>
                <h4 className="font-display text-base text-white mb-1 group-hover:text-[var(--g300)] transition-colors">
                  {title}
                </h4>
                <p className="text-[11px] text-white/40 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main contact section */}
      <ContactSection />
    </div>
  );
}
