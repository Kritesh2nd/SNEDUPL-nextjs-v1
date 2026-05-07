import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProductsSection from "@/components/sections/ProductsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import DistillerySection from "@/components/sections/DistillerySection";
import LeadershipSection from "@/components/sections/LeadershipSection";
import InvestorsSection from "@/components/sections/InvestorsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import AgeGate from "@/components/sections/AgeGate";

export default function HomePage() {
  return (
    <>
      <AgeGate />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductsSection />
        <TimelineSection />
        <DistillerySection />
        <LeadershipSection />
        <InvestorsSection />
        <ContactSection />
      </main>{" "}
      <Footer />
    </>
  );
}
