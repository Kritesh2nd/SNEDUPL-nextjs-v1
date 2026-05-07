import AgeGate from "@/components/sections/AgeGate";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AgeGate />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
