import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import DistillerySection from "@/components/sections/DistillerySection";
import LeadershipSection from "@/components/sections/LeadershipSection";
import InvestorsSection from "@/components/sections/InvestorsSection";
import ContactSection from "@/components/sections/ContactSection";

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
        <ContactSection />
      </main>
    </>
  );
}
