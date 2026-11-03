import { Nav } from "@/components/hero/Nav";
import { Hero } from "@/components/hero/Hero";
import { WhoWeSupport } from "@/components/sections/WhoWeSupport";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { MarketingBand } from "@/components/sections/MarketingBand";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhyKeySpex } from "@/components/sections/WhyKeySpex";
import { PricingNote } from "@/components/sections/PricingNote";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f2ed] text-[#1a1a1f] antialiased selection:bg-[var(--brand)] selection:text-white">
      <Nav />
      <main>
        <Hero />
        <WhoWeSupport />
        <ServicesSection />
        <MarketingBand />
        <ProcessSection />
        <WhyKeySpex />
        <PricingNote />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
