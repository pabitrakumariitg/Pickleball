import { Metadata } from "next";
import { HowToPlayHero } from "@/components/how-to-play/hero";
import { RulesSection } from "@/components/how-to-play/rules-section";
import { EquipmentSection } from "@/components/how-to-play/equipment-section";
import { CourtGuide } from "@/components/how-to-play/court-guide";
import { TipsSection } from "@/components/how-to-play/tips-section";
import { VideoTutorial } from "@/components/how-to-play/video-tutorial";
import { CTASection } from "@/components/home/cta-section";
export const metadata: Metadata = {
  title: "How to Play | Pickleball Association Nagaland",
  description: "Learn the basics of pickleball including rules, scoring, equipment, and strategy guides."
};
export default function HowToPlayPage() {
  return <>
      <HowToPlayHero />
      <RulesSection />
      <EquipmentSection />
      <CourtGuide />
      <TipsSection />
      <VideoTutorial />
      <CTASection />
    </>;
}