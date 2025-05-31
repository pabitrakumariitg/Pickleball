import { Metadata } from "next";
import { MembershipHero } from "@/components/membership/hero";
import { PricingSection } from "@/components/membership/pricing-section";
import { TestimonialsSection } from "@/components/membership/testimonials-section";
import { FAQSection } from "@/components/membership/faq-section";
import { CTASection } from "@/components/home/cta-section";
export const metadata: Metadata = {
  title: "Membership | Pickleball Association Nagaland",
  description: "Join the Pickleball Association Nagaland with our flexible membership options for individuals, families, and juniors."
};
export default function MembershipPage() {
  return <>
      <MembershipHero />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>;
}