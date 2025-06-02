"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export function AboutHero() {
  return <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary pt-24 pb-16 md:pb-24 md:pt-32" data-unique-id="c555b44a-6d36-4d4b-9445-09ea69be8c53" data-file-name="components/about/hero.tsx" data-dynamic-text="true">
    {/* Background pattern */}
    <div className="absolute inset-0 -z-10 opacity-5" data-unique-id="c2830ecd-8bcf-4a74-a7a9-abd3c80a6023" data-file-name="components/about/hero.tsx">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" data-unique-id="6665c752-ca61-484c-aa01-a1d9f4b4dafd" data-file-name="components/about/hero.tsx">
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <div className="container mx-auto px-6" data-unique-id="b6a2fcaf-8b40-415a-802e-892092a3b2df" data-file-name="components/about/hero.tsx">
      <div className="mx-auto max-w-3xl text-center" data-unique-id="594aaf35-5caf-4967-9448-13a535e88dc6" data-file-name="components/about/hero.tsx">
        <motion.div initial={{
          opacity: 0,
          y: -20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent" data-unique-id="cb378b1d-1d7e-426d-8d32-28300bfb9a6c" data-file-name="components/about/hero.tsx"><span className="editable-text" data-unique-id="a7fd90c2-ca27-4365-bb0c-3e5654fe819f" data-file-name="components/about/hero.tsx">
            Our Mission & Vision
          </span></motion.div>

        <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.2
        }} className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl" data-unique-id="630d7f21-1ff2-4354-b630-1df7062390c9" data-file-name="components/about/hero.tsx"><span className="editable-text" data-unique-id="6b3267b5-94ae-4f54-80c1-a2f127b05463" data-file-name="components/about/hero.tsx">
            About </span><span className="text-primary" data-unique-id="0f6b76ad-ecf1-47f1-b729-5bc49f12874a" data-file-name="components/about/hero.tsx"><span className="editable-text" data-unique-id="8f9f9d00-36bf-4684-8233-da959bc1da95" data-file-name="components/about/hero.tsx">PAN</span></span>
        </motion.h1>

        <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.3
        }} className="mb-8 text-lg text-foreground/80" data-unique-id="77dd913a-7bef-4b11-b47b-21e0a415c647" data-file-name="components/about/hero.tsx"><span className="editable-text" data-unique-id="a29be9fa-8438-4912-ad47-5349d3a790f5" data-file-name="components/about/hero.tsx">
            Founded in 2025, Pickleball Association Nagaland (PAN) is dedicated to promoting pickleball as a fun, inclusive, and competitive sport across the state. Inspired by the global rise of pickleball and the efforts of the All India Pickleball Association (AIPA), we aim to make Nagaland a hub for this exciting sport.

          </span></motion.p>

        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.7,
          delay: 0.4
        }} className="flex flex-wrap justify-center gap-4" data-unique-id="fa136c23-95f8-4944-8205-aeaf815a4221" data-file-name="components/about/hero.tsx">
          <Link href="/contact" data-unique-id="d295fe7e-ad52-4a24-b281-2418442d6482" data-file-name="components/about/hero.tsx">
            <Button motion variant="primary" size="lg" className="group" icon={<ArrowRight className="transition-transform group-hover:translate-x-1" />} iconPosition="right" data-unique-id="26b917d6-95a6-4d49-b01d-1406561b3d5c" data-file-name="components/about/hero.tsx"><span className="editable-text" data-unique-id="da5605e4-fafe-4267-be31-ac52727ef407" data-file-name="components/about/hero.tsx">
              Get Involved
            </span></Button>
          </Link>
          <Link href="#our-story" data-unique-id="16375e15-2e8d-4cee-b9cf-28b277416be1" data-file-name="components/about/hero.tsx">
            <Button motion variant="outline" size="lg" className="border-primary" data-unique-id="c5657a92-2aa8-498c-85f7-b6ae0464e10c" data-file-name="components/about/hero.tsx"><span className="editable-text" data-unique-id="84cb9bdd-a6a2-44ad-b700-b041da6dcab1" data-file-name="components/about/hero.tsx">
              Our Story
            </span></Button>
          </Link>
        </motion.div>
      </div>
    </div>
  </section>;
}