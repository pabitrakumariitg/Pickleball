import { Metadata } from "next";
import { BookHero } from "@/components/book/hero";
import { BookingGuide } from "@/components/book/booking-guide";
import { CourtsList } from "@/components/book/courts-list";
import { PricingTable } from "@/components/book/pricing-table";
import { FAQSection } from "@/components/book/faq-section";
import { CTASection } from "@/components/book/cta-sections-book";
import { CourtRules } from "@/components/book/court-rules";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const metadata: Metadata = {
  title: "Book a Court | Nagaland Pickleball Association",
  description: "Reserve a pickleball court in Nagaland. Choose your venue, time, and make your booking online."
};

export default function BookPage() {
  return (
    <ProtectedRoute>
      <>
        <BookHero />
        <BookingGuide />
        <CourtsList />
        <PricingTable />
        <CourtRules/>
        <CTASection />
        <FAQSection />
      </>
    </ProtectedRoute>
  );
}