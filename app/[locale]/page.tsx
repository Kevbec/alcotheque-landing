import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CTASection } from "@/components/landing/CTASection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { FooterSection } from "@/components/landing/FooterSection";
import { HeroLanding } from "@/components/landing/HeroLanding";
import { ScreenshotsSection } from "@/components/landing/ScreenshotsSection";
import { StatsSection } from "@/components/landing/StatsSection";

export default function LocaleHomePage() {
  return (
    <>
      <main id="main-content">
        <HeroLanding />
        <ScreenshotsSection />
        <FeaturesSection />
        <StatsSection />
        <ReviewsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <FooterSection />
    </>
  );
}
