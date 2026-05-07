import DistillerySection from "@/components/sections/DistillerySection";
import TimelineSection from "@/components/sections/TimelineSection";
import SectionTitle from "@/components/ui/SectionTitle";
import { DEFAULT_DISTILLERY_DETAILS } from "@/lib/constants";

const PROCESS_STEPS = [
  { step:"01", title:"Grain Selection",    desc:"Only the finest locally-sourced grain and imported malted barley pass our rigorous quality checks before entering production." },
  { step:"02", title:"Mashing & Cooking",  desc:"Precisely controlled mashing breaks down starches into fermentable sugars. Our automated temperature monitoring ensures consistency batch after batch." },
  { step:"03", title:"Fermentation",       desc:"Proprietary yeast strains cultivated over 15 years of refinement are used in our stainless steel fermentation vessels for 48–72 hours." },
  { step:"04", title:"Multi-Column Distillation", desc:"Our 6-column distillation setup achieves exceptional purity. Each column removes specific congeners, building the final spirit profile with precision." },
  { step:"05", title:"Purification & Blending", desc:"Himalayan spring water is introduced for dilution and polishing. Master blenders balance the final profile to our house specification." },
  { step:"06", title:"Bottling & Quality Check", desc:"Every batch undergoes spectrometric analysis in our in-house lab before bottling. Only passing batches are released under the Everest Distillery name." },
];

export default function DistilleryPage() {
  const d = DEFAULT_DISTILLERY_DETAILS;
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 page-hero-bg overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[11px] font-semibold tracking-[0.28em] uppercase" style={{ color:"var(--b400)" }}>Our Facility</span>
          <h1 className="font-display text-5xl md:text-6xl xl:text-7xl text-white mt-4 mb-6">
            Where Precision<br /><span className="text-electric-blue">Meets Passion</span>
          </h1>
          <p className="text-white/45 text-base max-w-2xl mx-auto leading-relaxed">
            Established in 2018, our {d.area} state-of-the-art distillery in {d.location} is the heart of everything we create.
          </p>
        </div>
      </section>

      {/* Distillery section embedded */}
      <DistillerySection />

      {/* Production Process */}
      <section className="py-20" style={{ background:"var(--dark2)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <SectionTitle eyebrow="How We Craft" title="The Production Process" centered accentColor="blue" />
          <div className="mt-14 space-y-0">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.step} className={`flex gap-8 items-start py-6 ${i < PROCESS_STEPS.length - 1 ? "border-b" : ""}`}
                style={{ borderColor:"rgba(74,222,128,0.07)" }}>
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background:`rgba(34,197,94,0.06)`, border:"1px solid rgba(74,222,128,0.2)" }}>
                  <span className="font-display text-sm font-bold" style={{ color:"var(--g400)" }}>{step.step}</span>
                </div>
                <div>
                  <h3 className="font-display text-xl text-white mb-2">{step.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key numbers */}
      <section className="py-16" style={{ background:"var(--dark)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: d.area,       label:"Facility Area" },
              { value: d.capacity,   label:"Monthly Capacity" },
              { value:`${d.columns} Columns`, label:"Distillation" },
              { value:"2018",        label:"Facility Year" },
            ].map((m) => (
              <div key={m.label} className="glass-blue rounded-xl p-5 text-center hover-lift">
                <p className="font-display text-3xl text-white mb-1">{m.value}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
