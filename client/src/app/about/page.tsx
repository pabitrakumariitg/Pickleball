import { Metadata } from "next";
import { AboutHero } from "@/components/about/hero";
import { OurMission } from "@/components/about/our-mission";
import { TeamSection } from "@/components/about/team-section";
import { StatsSection } from "@/components/about/stats-section";
import { PartnerSection } from "@/components/about/partner-section";
import { CTASection } from "@/components/home/cta-section";
import { AboutCTA } from "@/components/about/about-cta";
export const metadata: Metadata = {
  title: "About Us | Nagaland Pickleball Association",
  description: "Learn about Nagaland Pickleball Association, our mission, vision, team, and history."
};
export default function AboutPage() {
  return <>
    <AboutHero />
    <OurMission />
    <TeamSection />
    <StatsSection />

    <AboutCTA />
  </>;
}