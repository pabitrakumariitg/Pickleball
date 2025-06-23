"use client";

import { Calendar, Map, Trophy, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FeatureItem } from "@/types";
export function OffersSection() {
  const offers: FeatureItem[] = [{
    title: "Court Access",
    description: "Book courts easily at our affiliated venues.",
    icon: Map
  }, {
    title: "Events & Tournaments",
    description: "Participate in local tournaments, clinics, and social play sessions.",
    icon: Trophy
  }, {
    title: "Membership Benefits",
    description: " Unlock exclusive perks, coaching, and community events.",
    icon: UserPlus
  }, {
    title: "Skill Development",
    description: "From beginner lessons to advanced strategies, grow your game with us.",
    icon: Calendar
  }];

  // Animation variants for the staggered animation effect
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  return <section className="relative overflow-hidden py-20 md:py-32" data-unique-id="242aa7fc-b59b-4c34-ac45-09580c5b34d0" data-file-name="components/home/offers-section.tsx" data-dynamic-text="true">
      {/* Accent background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden" data-unique-id="5825c162-7912-467c-8e0d-a233759c1391" data-file-name="components/home/offers-section.tsx">
        <div className="absolute -top-[30%] right-[20%] h-[40%] w-[40%] rounded-full bg-primary/5" data-unique-id="6d9c1911-3698-4412-94e7-a824f0ab3fbb" data-file-name="components/home/offers-section.tsx"></div>
        <div className="absolute bottom-[10%] left-[10%] h-[20%] w-[20%] rounded-full bg-accent/5" data-unique-id="b1a4c692-38ef-4670-85e0-09c859de4fe5" data-file-name="components/home/offers-section.tsx"></div>
      </div>

      <div className="container mx-auto px-6" data-unique-id="0a648807-6161-4c56-9a5a-059ffcc83b2a" data-file-name="components/home/offers-section.tsx">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} className="mb-16 text-center" data-unique-id="1e7aa217-9092-49a0-93f6-c9570a33cb32" data-file-name="components/home/offers-section.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="d33db131-8b87-474e-9f9a-a5560814cfd1" data-file-name="components/home/offers-section.tsx"><span className="editable-text" data-unique-id="b3f3ccbe-875e-4a2b-bc3d-f4fb05d21bae" data-file-name="components/home/offers-section.tsx">
            What We </span><span className="text-primary" data-unique-id="ac119ef1-b32c-4784-b096-243d6112eaa5" data-file-name="components/home/offers-section.tsx"><span className="editable-text" data-unique-id="f7396e05-79ef-4e66-82c6-dcc949cd357f" data-file-name="components/home/offers-section.tsx">Offer</span></span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="4871facb-e544-4874-a3e1-33ffd4e98c0d" data-file-name="components/home/offers-section.tsx"><span className="editable-text" data-unique-id="27bdc21c-b561-40ca-aa68-178024e3a7b6" data-file-name="components/home/offers-section.tsx">
            NPA provides comprehensive programs and facilities to support
            players at every stage of their pickleball journey.
          </span></p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: "-100px"
      }} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" data-unique-id="3f66a312-2bf8-427d-826b-a850eb796e0f" data-file-name="components/home/offers-section.tsx" data-dynamic-text="true">
          {offers.map((offer, index) => <motion.div key={index} variants={itemVariants} className="group relative" style={{
          zIndex: offers.length - index,
          marginLeft: index > 0 ? "-1rem" : "0"
        }} data-unique-id="49246a2d-ec69-4655-b99c-fabcc19a24a3" data-file-name="components/home/offers-section.tsx">
              <div className="card card-hover border border-border bg-card group-hover:border-primary/20 relative h-full p-8 transition-all duration-300" data-unique-id="f16d0b39-41a0-43db-afcb-5429e53d1f54" data-file-name="components/home/offers-section.tsx">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary" data-unique-id="f1dcac04-c428-4fa9-9fbe-78399605234e" data-file-name="components/home/offers-section.tsx">
                  <offer.icon size={24} data-unique-id="a959b85d-f9a2-4920-9653-733bf708c386" data-file-name="components/home/offers-section.tsx" data-dynamic-text="true" />
                </div>
                <h3 className="mb-3 text-xl font-semibold" data-unique-id="8df08369-61c3-4435-acf1-9503819c42ee" data-file-name="components/home/offers-section.tsx" data-dynamic-text="true">{offer.title}</h3>
                <p className="text-foreground/70" data-unique-id="300ce260-1096-43d2-af98-35c1f6c596d4" data-file-name="components/home/offers-section.tsx" data-dynamic-text="true">{offer.description}</p>
              </div>
            </motion.div>)}
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.6
      }} className="mt-12 text-center" data-unique-id="7a244407-c88a-436c-82e9-5272df2e3696" data-file-name="components/home/offers-section.tsx">
          <Link href="/book" data-unique-id="3e17b0ee-e756-4e48-83c9-de9637ccdc08" data-file-name="components/home/offers-section.tsx">
            <Button variant="cta" size="lg" motion data-unique-id="4621602c-a4ba-4d13-aee7-74f5a7742684" data-file-name="components/home/offers-section.tsx"><span className="editable-text" data-unique-id="151741ba-70ad-4819-9c68-004ea0ac57bb" data-file-name="components/home/offers-section.tsx">
              Explore All Offerings
            </span></Button>
          </Link>
        </motion.div>
      </div>
    </section>;
}