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
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
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
            Our </span><span className="text-primary" data-unique-id="6923f910-c373-4840-9679-ec7de89910de" data-file-name="components/about/stats-section.tsx"><span className="editable-text" data-unique-id="7a893d49-66cf-4b2a-9c82-4394397962a1" data-file-name="components/about/stats-section.tsx">Impact</span></span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="b935a785-1a12-424f-88a2-75e8bd788407" data-file-name="components/about/stats-section.tsx"><span className="editable-text" data-unique-id="04a943e9-2d21-4ed1-98b4-cee47354b5bd" data-file-name="components/about/stats-section.tsx">
            Since our founding, we've made significant strides in growing
            pickleball across Nagaland and building an active community.
          </span></p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" data-unique-id="266ffb98-ca37-405e-9b7a-51a0da3f8c95" data-file-name="components/about/stats-section.tsx" data-dynamic-text="true">
          {stats.map((stat, index) => <motion.div key={index} custom={index} variants={counterVariants} initial="hidden" whileInView="visible" viewport={{
          once: true,
          margin: "-100px"
        }} className="card flex flex-col items-center text-center p-6 shadow-md" data-unique-id="0afc6272-4a77-4f8b-a75a-413d054f9f13" data-file-name="components/about/stats-section.tsx">
              <div className="mb-4" data-unique-id="611a97a6-abf6-4500-9685-21ca5e13d5e5" data-file-name="components/about/stats-section.tsx" data-dynamic-text="true">{stat.icon}</div>
              <h3 className="text-3xl font-bold mb-2" data-unique-id="74936ed6-367c-457b-84e1-3864482f629c" data-file-name="components/about/stats-section.tsx">
                <motion.span initial={{
              opacity: 0,
              scale: 0.8
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.3 + 0.1 * index,
              type: "spring",
              stiffness: 100
            }} data-unique-id="c28a68e6-2e8d-48cb-85b1-233ac35c04ad" data-file-name="components/about/stats-section.tsx" data-dynamic-text="true">
                  {stat.value}
                </motion.span>
              </h3>
              <p className="text-foreground/70" data-unique-id="5c1e07c1-d71f-4253-a9d1-4268d1f1296b" data-file-name="components/about/stats-section.tsx" data-dynamic-text="true">{stat.label}</p>
            </motion.div>)}
        </div>
      </motion.div>
    </section>;
}