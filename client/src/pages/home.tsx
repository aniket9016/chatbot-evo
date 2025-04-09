import MainLayout from "@/layouts/main-layout";
import HeroSection from "@/sections/hero-section";
import EvolutionSection from "@/sections/evolution-section";
import FunctionalitySection from "@/sections/functionality-section";
import DemoSection from "@/sections/demo-section";
import ApplicationsSection from "@/sections/applications-section";
import NlpSection from "@/sections/nlp-section";
import FooterSection from "@/sections/footer-section";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <EvolutionSection />
      <FunctionalitySection />
      <DemoSection />
      <ApplicationsSection />
      <NlpSection />
      <FooterSection />
    </MainLayout>
  );
}
