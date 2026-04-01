import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HeroLanding } from "@/components/landing/HeroLanding";
import { StatsSection } from "@/components/landing/StatsSection";

export default function LocaleHomePage() {
  return (
    <>
      <HeroLanding />
      <FeaturesSection />
      <StatsSection />
    </>
  );
}
