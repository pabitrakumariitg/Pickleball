import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { PickleballSection } from "@/components/home/pickleball-section";
import { OffersSection } from "@/components/home/offers-section";
import { EventsSection } from "@/components/home/events-section";
import { CTASection } from "@/components/home/cta-section";
import { InteractiveCourt } from "@/components/interactive-court";
import { Metadata } from "next";
import { MarqueeDemo } from "@/components/home/marquee-text";
export const metadata: Metadata = {
  title: "Home | Pickleball Association Nagaland",
  description: "Discover the fastest-growing sport in Nagaland. PAN promotes pickleball through community events, coaching, and accessible court facilities."
};
export default function HomePage() {
  return <>
    <HeroSection />
    <MarqueeDemo />
    <PickleballSection />
    <AboutSection />
    <div className="container mx-auto px-6 py-20" data-unique-id="436a1801-568f-4114-9b9e-10c80b7ef885" data-file-name="app/page.tsx">
      <div className="text-center mb-12" data-unique-id="df892e04-6b82-47e2-8fd4-a3e29e725a99" data-file-name="app/page.tsx">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="0dd88c2d-23b2-4b41-96c8-42076525c204" data-file-name="app/page.tsx">
          <span className="text-primary" data-unique-id="dd8f81f1-18ad-42cc-bd6e-251994556ff3" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="20cbf30e-02d3-49bb-ac0a-1b09236edcca" data-file-name="app/page.tsx">Interactive</span></span><span className="editable-text" data-unique-id="311e8cc1-edba-43e3-9acd-711f09c514b8" data-file-name="app/page.tsx"> Pickleball Court
          </span></h2>
        <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="d3a472d8-3890-47a2-a7c2-237d62d0fe28" data-file-name="app/page.tsx"><span className="editable-text" data-unique-id="be0f83f4-c610-4713-b9ad-d7f183139f54" data-file-name="app/page.tsx">
          Hover over different areas of the court to learn about pickleball rules and gameplay.
        </span></p>
      </div>
      <InteractiveCourt />
    </div>
    <OffersSection />

    <CTASection />
  </>;
}