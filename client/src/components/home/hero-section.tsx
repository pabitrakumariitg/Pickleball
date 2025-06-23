"use client";

import { ChevronRight, CalendarDays, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export function HeroSection() {
  return <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary pt-24 pb-16 md:pb-24 md:pt-32" data-unique-id="a9837602-122e-4da5-a25c-25717b99aa56" data-file-name="components/home/hero-section.tsx" data-dynamic-text="true">
    {/* Background pattern */}
    <div className="absolute inset-0 -z-10 opacity-5" data-unique-id="3a7abc0e-1fcf-495a-bfbe-a5f8cbbde097" data-file-name="components/home/hero-section.tsx">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" data-unique-id="4c68407d-6159-4ca8-ac72-b1f58b403e70" data-file-name="components/home/hero-section.tsx">
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div className="container mx-auto px-6" data-unique-id="d3495761-7ffb-4cdd-9375-5caaaa51dfe8" data-file-name="components/home/hero-section.tsx">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16" data-unique-id="26646c1e-6146-43a4-a07b-d7980f08b750" data-file-name="components/home/hero-section.tsx" data-dynamic-text="true">
        {/* Text content */}
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="order-2 lg:order-1" data-unique-id="620a51be-2b36-4c2b-bff7-f3660c263f6f" data-file-name="components/home/hero-section.tsx" data-dynamic-text="true">
          <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.8,
            delay: 0.3
          }} className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent" data-unique-id="59b3d028-440f-42e1-a922-7b557bce65e9" data-file-name="components/home/hero-section.tsx"><span className="editable-text" data-unique-id="091c06d5-6f11-406b-ad9a-25ea6c4d070d" data-file-name="components/home/hero-section.tsx">
              Nagaland's Premier Pickleball Community
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
          }} className="mb-4 max-w-xl text-4xl font-bold md:text-5xl lg:text-6xl" data-unique-id="8f821307-0cd4-4094-860d-0a0f4e7a4cb3" data-file-name="components/home/hero-section.tsx"><span className="editable-text" data-unique-id="b256d4c9-8fcc-44d0-98ad-f90507602183" data-file-name="components/home/hero-section.tsx">
              Discover the Fastest-Growing Sport in</span>{" "}
            <span className="text-primary" data-unique-id="d9c5bc61-769e-4c54-b5de-9308f8fcf522" data-file-name="components/home/hero-section.tsx"><span className="editable-text" data-unique-id="1cc5444b-4065-4ca9-b15a-cb6fbd08667b" data-file-name="components/home/hero-section.tsx">Nagaland!</span></span>
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
          }} className="mb-8 max-w-xl text-lg text-foreground/80" data-unique-id="6e5b03e9-cfb9-45f7-8356-4ece6812a994" data-file-name="components/home/hero-section.tsx"><span className="editable-text" data-unique-id="4f8d7ea8-8df5-4a82-9f7f-827d2b349c00" data-file-name="components/home/hero-section.tsx">
              Swing into action with Nagaland Pickleball Association (NPA)! From Dimapur, we’re bringing this exciting sport to your doorstep—perfect for friends, family, and fitness lovers. </span></motion.p>

          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7,
            delay: 0.6
          }} className="flex flex-wrap gap-4" data-unique-id="bb263209-9c8d-435a-8e38-18046ab95d63" data-file-name="components/home/hero-section.tsx">
            <Link href="/book">
              <Button motion variant="cta" size="lg" className="group" icon={<ChevronRight className="transition-transform group-hover:translate-x-1" />} iconPosition="right" data-unique-id="9e53adfb-b67a-43a1-8225-7eb32f6ab81f" data-file-name="components/home/hero-section.tsx"><span className="editable-text" data-unique-id="abf03461-147f-4874-830b-d93de87d7b13" data-file-name="components/home/hero-section.tsx">
                Book a Court
              </span></Button>
            </Link>
            <Link href="/register">
              <Button motion variant="outline" size="lg" className="border-primary" data-unique-id="cbdb438f-1a80-4004-b0e5-92478941efae" data-file-name="components/home/hero-section.tsx"><span className="editable-text" data-unique-id="2523558b-5b26-4cd8-8dd1-f5e74f7bd78e" data-file-name="components/home/hero-section.tsx">
                Join Now
              </span></Button>
            </Link>
            <Link href="/business/auth/login">
              <Button motion variant="outline" size="lg" className="border-primary" data-unique-id="cbdb438f-1a80-4004-b0e5-92478941efae" data-file-name="components/home/hero-section.tsx"><span className="editable-text" data-unique-id="2523558b-5b26-4cd8-8dd1-f5e74f7bd78e" data-file-name="components/home/hero-section.tsx">
                Business Join
              </span></Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7,
            delay: 0.7
          }} className="mt-10 flex flex-wrap gap-6 text-foreground/80" data-unique-id="3f24995a-ff71-4b2a-bcde-6d936a2198cf" data-file-name="components/home/hero-section.tsx">
            <div className="flex items-center gap-2" data-unique-id="e6d77005-710d-4dd9-9099-8136726c5087" data-file-name="components/home/hero-section.tsx">
              <CalendarDays className="h-5 w-5 text-primary" />
              <span data-unique-id="271ff93d-69a6-4424-af5c-077a5a104836" data-file-name="components/home/hero-section.tsx"><span className="editable-text" data-unique-id="b2d7fc6e-f8c5-49f4-bee2-c23df5a2898c" data-file-name="components/home/hero-section.tsx">Weekly events across Nagaland</span></span>
            </div>
            <div className="flex items-center gap-2" data-unique-id="ff82d6a9-a336-45a1-9bac-0c10d019832a" data-file-name="components/home/hero-section.tsx">
              <Users className="h-5 w-5 text-primary" />
              <span data-unique-id="623cf378-0692-47db-b11e-cbdda4bd8e4c" data-file-name="components/home/hero-section.tsx"><span className="editable-text" data-unique-id="824e3a74-94a7-494e-8c35-89c37a1a3826" data-file-name="components/home/hero-section.tsx">500+ active members</span></span>
            </div>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01]
        }} className="order-1 lg:order-2 relative" data-unique-id="9d3eaaf6-af30-4cd3-9415-a3aa81f9a824" data-file-name="components/home/hero-section.tsx" data-dynamic-text="true">
          <div className="relative aspect-square overflow-hidden rounded-2xl md:aspect-[4/3]" data-unique-id="a4341486-58e3-4bfe-bdd5-8fbae8560df1" data-file-name="components/home/hero-section.tsx" data-dynamic-text="true">
            <img src="/Pickleball-herosection.jpg" alt="People playing pickleball" className="h-full w-full object-cover" data-unique-id="95037511-a884-4608-b89f-781ec1106cbe" data-file-name="components/home/hero-section.tsx" />

            {/* Accent elements */}
            <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-primary opacity-20 blur-3xl" data-unique-id="b7acb0a6-8e73-43be-beae-fdb6504d02dc" data-file-name="components/home/hero-section.tsx"></div>
            <div className="absolute -left-4 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-accent opacity-20 blur-3xl" data-unique-id="6be537a3-a6e6-4c9a-8b0d-ae987a1f2b6c" data-file-name="components/home/hero-section.tsx"></div>
          </div>

          {/* Floating card */}
          {/* <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7,
            delay: 0.9
          }} className="absolute bottom-6 -left-10 hidden rounded-lg bg-card p-4 shadow-lg md:flex" data-unique-id="44fba2ff-d446-4925-86bf-49b8743612e1" data-file-name="components/home/hero-section.tsx">
              <div className="flex items-center gap-4" data-unique-id="83db3fcb-1765-4094-b091-867a699cea17" data-file-name="components/home/hero-section.tsx">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10" data-unique-id="c661f112-ff67-4287-bf01-b949a04c8377" data-file-name="components/home/hero-section.tsx">
                  <CalendarDays className="h-6 w-6 text-primary" />
                </div>
                <div data-unique-id="e76868c0-c753-48df-bcde-3313b4397783" data-file-name="components/home/hero-section.tsx">
                  <p className="font-medium" data-unique-id="a43a715a-29eb-4b9f-a279-34d30b205c03" data-file-name="components/home/hero-section.tsx"><span className="editable-text" data-unique-id="b97b5f60-18d5-45be-a1b0-354f55cb2fcc" data-file-name="components/home/hero-section.tsx">Next Tournament</span></p>
                  <p className="text-sm text-foreground/70" data-unique-id="1421b7b9-dc9a-409a-b05a-423390a5936f" data-file-name="components/home/hero-section.tsx"><span className="editable-text" data-unique-id="5ec6ab0b-6fbe-479a-aaa7-6ab381f56277" data-file-name="components/home/hero-section.tsx">June 15, 2025</span></p>
                </div>
              </div>
            </motion.div> */}
        </motion.div>
      </div>
    </div>
  </section>;
}