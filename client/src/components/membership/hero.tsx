"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
export function MembershipHero() {
  return <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary pt-24 pb-16 md:pb-24 md:pt-32" data-unique-id="ea35bf8d-9d67-4730-9257-186b4576afbf" data-file-name="components/membership/hero.tsx" data-dynamic-text="true">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-5" data-unique-id="02e9e951-b17f-42d6-9b5d-b4b7eebc920c" data-file-name="components/membership/hero.tsx">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" data-unique-id="50876e49-2625-4b01-8c4b-be17cd4cfcf4" data-file-name="components/membership/hero.tsx">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6" data-unique-id="a7f32afd-6d46-464b-acf1-3c225d46698a" data-file-name="components/membership/hero.tsx">
        <div className="mx-auto max-w-3xl text-center" data-unique-id="8fc2ff6e-efe9-4593-a25d-49d5aa68a949" data-file-name="components/membership/hero.tsx">
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent" data-unique-id="bff3b69b-be75-4587-9fc8-a4a4bdab867a" data-file-name="components/membership/hero.tsx"><span className="editable-text" data-unique-id="6b2672f8-68a6-4a54-8cf0-6fc561bf29ab" data-file-name="components/membership/hero.tsx">
            Join Our Community
          </span></motion.div>
          
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.4
        }} className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl" data-unique-id="726a8426-eb1b-4da2-81ae-6630c1154d4b" data-file-name="components/membership/hero.tsx"><span className="editable-text" data-unique-id="91bc4d22-5f2f-496c-b5ba-464425d85c98" data-file-name="components/membership/hero.tsx">
            Membership </span><span className="text-primary" data-unique-id="f8e3e4c3-6185-4757-8e6f-7903378de607" data-file-name="components/membership/hero.tsx"><span className="editable-text" data-unique-id="4a0e6e7d-338f-4ed2-a296-ce6484dcb27c" data-file-name="components/membership/hero.tsx">Benefits</span></span>
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
        }} className="mb-8 text-lg text-foreground/80" data-unique-id="a712873e-a0b3-4665-a7fe-3cfffb30e304" data-file-name="components/membership/hero.tsx"><span className="editable-text" data-unique-id="49c088fd-350c-4489-931b-73964fb7a5d4" data-file-name="components/membership/hero.tsx">
            Join the Pickleball Association Nagaland and enjoy exclusive benefits, 
            discounted court rates, and access to members-only events and tournaments.
          </span></motion.p>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.6
        }} className="flex flex-wrap justify-center gap-4" data-unique-id="9e9d9e70-bb0f-4d58-b0de-6b35d6efdfa7" data-file-name="components/membership/hero.tsx">
            <Button motion variant="cta" size="lg" className="group" icon={<ChevronRight className="transition-transform group-hover:translate-x-1" />} iconPosition="right" data-unique-id="796cf066-3db1-46b4-b377-17ee36b36dab" data-file-name="components/membership/hero.tsx"><span className="editable-text" data-unique-id="9d62a2fa-1260-4fed-adcd-a69457d5059f" data-file-name="components/membership/hero.tsx">
              View Pricing
            </span></Button>
            <Button motion variant="outline" size="lg" className="border-primary" data-unique-id="bf34778e-b21d-4016-940e-50a91f3d9063" data-file-name="components/membership/hero.tsx"><span className="editable-text" data-unique-id="92a6b58e-59ca-4c1e-bc39-3c8966875d76" data-file-name="components/membership/hero.tsx">
              Learn More
            </span></Button>
          </motion.div>
        </div>
      </div>
    </section>;
}