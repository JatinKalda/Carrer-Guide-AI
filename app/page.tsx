import { SiteNavbar } from "@/components/marketing/site-navbar";
import { Hero } from "@/components/marketing/hero";
import { FeatureCards } from "@/components/marketing/feature-cards";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Testimonials } from "@/components/marketing/testimonials";
import { Pricing } from "@/components/marketing/pricing";
import { Faq } from "@/components/marketing/faq";
import { Footer } from "@/components/marketing/footer";

export default function LandingPage() {
  return (
    <div className="bg-background">
      <SiteNavbar />
      <Hero />
      <FeatureCards />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Faq />
      <Footer />
    </div>
  );
}
