"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Users, MapPin, Trophy, Calendar } from "lucide-react";
interface StatItem {
  icon: JSX.Element;
  value: string;
  label: string;
}
export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Achievements data
  const achievements = [
    {
      icon: <MapPin className="h-6 w-6 text-primary" />, // You can swap icons as you wish
      title: "Established 10+ courts",
      description: "Across Kohima, Dimapur, and Mokokchung."
    },
    {
      icon: <Trophy className="h-6 w-6 text-primary" />, // You can swap icons as you wish
      title: "Nagaland’s first pickleball tournament (2024)",
      description: "100+ participants."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />, // You can swap icons as you wish
      title: "20 local coaches trained (2025)",
      description: "Partnered with AIPA."
    }
  ];

  const stats: StatItem[] = [{
    icon: <Users className="h-8 w-8 text-primary" />,
    value: "500+",
    label: "Active Members"
  }, {
    icon: <MapPin className="h-8 w-8 text-primary" />,
    value: "12",
    label: "Courts Across Nagaland"
  }, {
    icon: <Trophy className="h-8 w-8 text-primary" />,
    value: "24",
    label: "Tournaments Hosted"
  }, {
    icon: <Calendar className="h-8 w-8 text-primary" data-unique-id="745e2811-f616-4ef0-baa7-80be07fb800b" data-file-name="components/about/stats-section.tsx" />,
    value: "180+",
    label: "Training Sessions Conducted"
  }];
  const counterVariants = {
    hidden: {
      opacity: 0
    },
    visible: (custom: number) => ({
      opacity: 1,
      transition: {
        delay: 0.1 * custom
      }
    })
  };
  return <section ref={sectionRef} className="py-20 relative overflow-hidden bg-gradient-to-r from-background to-secondary/50" data-unique-id="843bf9ae-e91a-4828-a2cc-eb078bb1c41e" data-file-name="components/about/stats-section.tsx" data-dynamic-text="true">
    {/* Decorative background elements */}
    <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-primary/5 blur-3xl" data-unique-id="6a4a8da4-4e20-43bc-93d0-4385a43be8a5" data-file-name="components/about/stats-section.tsx"></div>
    <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-accent/5 blur-3xl" data-unique-id="51bc06ab-510f-4430-b04e-6711a52cf20b" data-file-name="components/about/stats-section.tsx"></div>

    <motion.div className="container mx-auto px-6" style={{
      scale,
      opacity
    }} data-unique-id="ef37705e-6bc0-4b6c-a411-2c6949022fcb" data-file-name="components/about/stats-section.tsx">
      <motion.div initial={{
        opacity: 0,
        y: -20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} className="mb-16 text-center" data-unique-id="297e3a60-591b-4798-9907-87b1aa0f0bb4" data-file-name="components/about/stats-section.tsx">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="ffdac236-8b99-49c7-89ad-86dce1232d3d" data-file-name="components/about/stats-section.tsx"><span className="editable-text" data-unique-id="63a656c9-7321-4767-bd15-7ab13a41fe79" data-file-name="components/about/stats-section.tsx">
          Our </span><span className="text-primary" data-unique-id="6923f910-c373-4840-9679-ec7de89910de" data-file-name="components/about/stats-section.tsx"><span className="editable-text" data-unique-id="7a893d49-66cf-4b2a-9c82-4394397962a1" data-file-name="components/about/stats-section.tsx">Achievements</span></span>
        </h2>

      </motion.div>

      {/* Animated Achievements List */}
      <div className="flex flex-col items-center gap-6 mt-8">
        {achievements.map((ach, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
            className="flex items-center gap-4 bg-card/70 rounded-xl px-6 py-4 shadow-md w-full max-w-xl"
          >
            <span>{ach.icon}</span>
            <div>
              <div className="font-semibold text-lg text-foreground">{ach.title}</div>
              <div className="text-foreground/70 text-base">{ach.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>;
}

