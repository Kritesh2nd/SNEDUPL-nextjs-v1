import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import DistillerySection from "@/components/sections/DistillerySection";
import LeadershipSection from "@/components/sections/LeadershipSection";
import InvestorsSection from "@/components/sections/InvestorsSection";
import SectionTitle from "@/components/ui/SectionTitle";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <TimelineSection />
        <DistillerySection />
        <LeadershipSection />
        <InvestorsSection />
        <section
          id="contact"
          className="relative py-24 md:py-32"
          style={{ background: "var(--dark3)" }}
        >
          <div className="flex flex-col justify-between max-w-6xl mx-auto px-6">
            <SectionTitle
              eyebrow="Get In Touch"
              title="Let's Connect"
              centered
              subtitle="Dealer inquiries, investor meetings, bulk orders, or just to say hello — we're here."
            />
            <div className="flex justify-center mt-5">
              <Link href="/contact" className="">
                <Button variant="outline" size="md">
                  Contact Us <ArrowRight size={13} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
