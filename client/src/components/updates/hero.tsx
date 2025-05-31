"use client";

import { motion } from "framer-motion";
import { ArrowRight, RssIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export function UpdatesHero() {
  return <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary pt-24 pb-16 md:pb-24 md:pt-32" data-unique-id="227c84fc-71b8-4884-b932-adfeaa2c159e" data-file-name="components/updates/hero.tsx" data-dynamic-text="true">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-5" data-unique-id="e5e853c6-18fb-4e45-a470-cfbf4eaf96a9" data-file-name="components/updates/hero.tsx">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" data-unique-id="33cc8ddc-1771-4e31-abcb-3234be89c345" data-file-name="components/updates/hero.tsx">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6" data-unique-id="15d98c36-7fee-4a81-8239-581847e79f3d" data-file-name="components/updates/hero.tsx">
        <div className="mx-auto max-w-3xl text-center" data-unique-id="f1595ddb-a6b2-4f08-be4a-bb909cb9fb29" data-file-name="components/updates/hero.tsx">
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent" data-unique-id="8d584768-e08d-4993-8e62-0abb59ec469e" data-file-name="components/updates/hero.tsx">
            <span className="editable-text" data-unique-id="cf015725-c6a1-40a5-88a2-3748742b61c1" data-file-name="components/updates/hero.tsx">Stay Informed</span>
          </motion.div>
          
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.4
        }} className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl" data-unique-id="092ec9ac-01f1-4eea-809c-7f807d831a48" data-file-name="components/updates/hero.tsx">
            <span className="editable-text" data-unique-id="4ad5bd11-bfa2-4ef3-a32a-f67e396bd4c9" data-file-name="components/updates/hero.tsx">Events & </span>
            <span className="text-primary" data-unique-id="c83fbbd3-4b12-4f91-9b40-6f6bdf995712" data-file-name="components/updates/hero.tsx">
              <span className="editable-text" data-unique-id="1e0da397-0ffc-4867-9a44-9de9dfd355bb" data-file-name="components/updates/hero.tsx">Updates</span>
            </span>
          </motion.h1>
          
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.5
        }} className="mb-8 text-lg text-foreground/80" data-unique-id="d29dda5b-2554-4ea5-aaad-6939c5974aa6" data-file-name="components/updates/hero.tsx">
            <span className="editable-text" data-unique-id="2a83c094-28a2-4a05-928d-f901259296dd" data-file-name="components/updates/hero.tsx">
              Stay up-to-date with the latest pickleball events, tournaments, and news
              from across Nagaland. Subscribe to our newsletter to never miss an update.
            </span>
          </motion.p>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.6
        }} className="flex flex-wrap justify-center gap-4" data-unique-id="bde3aa1a-1de5-4079-b130-9fec9431d2a9" data-file-name="components/updates/hero.tsx">
            <Button motion variant="primary" size="lg" className="group" icon={<RssIcon className="h-4 w-4" />} iconPosition="left" data-unique-id="91c5c706-03ec-47de-9c73-518f07c76bdd" data-file-name="components/updates/hero.tsx">
              <span className="editable-text" data-unique-id="3f4a4835-5fe6-4dc0-ae74-0f1585a1a6dc" data-file-name="components/updates/hero.tsx">Subscribe to Updates</span>
            </Button>
            
            <Link href="#upcoming-events" data-unique-id="0489045c-95af-4751-956d-1870a40afa6b" data-file-name="components/updates/hero.tsx">
              <Button motion variant="outline" size="lg" className="border-primary group" icon={<ArrowRight className="transition-transform group-hover:translate-x-1" />} iconPosition="right" data-unique-id="da98b257-60f2-4bad-9d12-afdb1a76d1f8" data-file-name="components/updates/hero.tsx">
                <span className="editable-text" data-unique-id="43b618cd-4574-4d2b-a8d3-d586182f5ac1" data-file-name="components/updates/hero.tsx">Upcoming Events</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>;
}