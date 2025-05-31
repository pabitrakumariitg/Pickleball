import { Metadata } from "next";
import { AboutHero } from "@/components/about/hero";
import { OurStory } from "@/components/about/our-story";
import { TeamSection } from "@/components/about/team-section";
import { StatsSection } from "@/components/about/stats-section";
import { PartnerSection } from "@/components/about/partner-section";
import { CTASection } from "@/components/home/cta-section";
export const metadata: Metadata = {
  title: "About Us | Pickleball Association Nagaland",
  description: "Learn about Pickleball Association Nagaland, our mission, vision, team, and history."
};
export default function AboutPage() {
  return <>
      <AboutHero />
      <OurStory />
      <TeamSection />
      <StatsSection />
      <PartnerSection />
      <CTASection />
    </>;
}