import { Metadata } from "next";
import { UpdatesHero } from "@/components/updates/hero";
import { NewsList } from "@/components/updates/news-list";
import { EventsList } from "@/components/updates/events-list";
import { CTASection } from "@/components/home/cta-section";
import { CommunitySpotlight } from "@/components/updates/community-spotlight";
import { Subscribe } from "@/components/updates/subscribe";
export const metadata: Metadata = {
  title: "Events & Updates | Nagaland Pickleball Association",
  description: "Stay informed about the latest pickleball events, tournaments, and news from Nagaland Pickleball Association."
};
export default function UpdatesPage() {
  return <>
      <UpdatesHero />
      <EventsList />
      <NewsList />
      <CommunitySpotlight />
      <Subscribe/>
    </>;
}