"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export function HowToPlayHero() {
  return <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary pt-24 pb-16 md:pb-24 md:pt-32" data-unique-id="565a01e9-d323-4e97-89db-8fff4ca847fe" data-file-name="components/how-to-play/hero.tsx" data-dynamic-text="true">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-5" data-unique-id="151d2c93-841b-45e6-8b2f-345e9f897a16" data-file-name="components/how-to-play/hero.tsx">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" data-unique-id="12282ce7-8cec-45ad-9c72-432a97a520cf" data-file-name="components/how-to-play/hero.tsx">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative court lines */}
      <div className="absolute inset-0 -z-10" data-unique-id="ebbb67eb-cb00-4745-a10f-acf169597fce" data-file-name="components/how-to-play/hero.tsx">
        <svg width="100%" height="100%" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg" data-unique-id="26e49651-f181-450d-a1c4-466ccfeb076a" data-file-name="components/how-to-play/hero.tsx">
          <rect x="300" y="100" width="400" height="300" stroke="currentColor" strokeWidth="2" fill="none" className="opacity-5" />
          <line x1="500" y1="100" x2="500" y2="400" stroke="currentColor" strokeWidth="2" className="opacity-5" />
          <line x1="300" y1="250" x2="700" y2="250" stroke="currentColor" strokeWidth="2" className="opacity-5" />
          <rect x="340" y="140" width="320" height="60" stroke="currentColor" strokeWidth="2" fill="none" className="opacity-5" />
          <rect x="340" y="300" width="320" height="60" stroke="currentColor" strokeWidth="2" fill="none" className="opacity-5" />
        </svg>
      </div>

      <div className="container mx-auto px-6" data-unique-id="bd0e3d02-3621-4e24-ba49-b56046014501" data-file-name="components/how-to-play/hero.tsx">
        <div className="mx-auto max-w-3xl text-center" data-unique-id="f536c863-29b7-458f-9fa0-c79ece5f555a" data-file-name="components/how-to-play/hero.tsx">
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent" data-unique-id="46cc1407-e1bf-4021-9de7-6cc991c95fbc" data-file-name="components/how-to-play/hero.tsx"><span className="editable-text" data-unique-id="17b71b63-3374-41f0-a977-3ddf0ca9e5da" data-file-name="components/how-to-play/hero.tsx">
            Beginner Friendly
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
        }} className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl" data-unique-id="37626bd2-9bf5-4384-8e4b-6c84e06471f1" data-file-name="components/how-to-play/hero.tsx"><span className="editable-text" data-unique-id="a389c6ca-9812-4516-a04d-17463075daf6" data-file-name="components/how-to-play/hero.tsx">
            How to Play </span><span className="text-primary" data-unique-id="2cd4082f-bf7f-4ced-ae6d-df3dca974978" data-file-name="components/how-to-play/hero.tsx"><span className="editable-text" data-unique-id="14de735d-28a1-4bff-bb91-1031bebdbc83" data-file-name="components/how-to-play/hero.tsx">Pickleball</span></span>
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
        }} className="mb-8 text-lg text-foreground/80" data-unique-id="98f8aaac-c091-4b2f-8c50-c5a637605932" data-file-name="components/how-to-play/hero.tsx"><span className="editable-text" data-unique-id="ad991b3e-cc5d-476e-8a59-8719febfdc8f" data-file-name="components/how-to-play/hero.tsx">
            Learn the basics of pickleball, from rules and scoring to equipment and
            strategy. This comprehensive guide will help you get started with the
            fastest-growing sport in Nagaland.
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
        }} className="flex flex-wrap justify-center gap-4" data-unique-id="cb190189-6851-4df0-8557-6bc9bac9f4f8" data-file-name="components/how-to-play/hero.tsx">
            <Link href="#rules" data-unique-id="be102a10-e178-475b-85d7-19eba3a99452" data-file-name="components/how-to-play/hero.tsx">
              <Button motion variant="primary" size="lg" className="group" icon={<ChevronDown className="transition-transform group-hover:translate-y-1" />} iconPosition="right" data-unique-id="329704a1-0a8e-4149-be5a-937291227862" data-file-name="components/how-to-play/hero.tsx"><span className="editable-text" data-unique-id="6b17136d-1f79-4c61-8694-b42eb9becaf8" data-file-name="components/how-to-play/hero.tsx">
                Start Learning
              </span></Button>
            </Link>
            <Link href="/book" data-unique-id="a6e1d5e4-7713-43e0-a7ce-29026a0063df" data-file-name="components/how-to-play/hero.tsx">
              <Button motion variant="outline" size="lg" className="border-primary" data-unique-id="ccf26369-3fc0-4252-84df-3f329452338b" data-file-name="components/how-to-play/hero.tsx"><span className="editable-text" data-unique-id="f760c98e-83c7-4923-acf2-da02b842dc7f" data-file-name="components/how-to-play/hero.tsx">
                Book a Court
              </span></Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>;
}