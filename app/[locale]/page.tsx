import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { FooterSection } from "@/components/landing/FooterSection";
import { HeroLanding } from "@/components/landing/HeroLanding";
import { StatsSection } from "@/components/landing/StatsSection";

export default function LocaleHomePage() {
  return (
    <>
      <HeroLanding />
      <FeaturesSection />
      <StatsSection />
      <FooterSection />
    </>
  );
}
