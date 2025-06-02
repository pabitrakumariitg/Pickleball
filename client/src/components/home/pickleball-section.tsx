"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
export function PickleballSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  return <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-32 bg-secondary" data-unique-id="5f495944-b5ed-44b0-9a96-524480669c4a" data-file-name="components/home/pickleball-section.tsx" data-dynamic-text="true">
      {/* Decorative balls */}
      <motion.div style={{
      y: y1,
      opacity
    }} className="absolute -right-20 top-10 h-40 w-40 rounded-full bg-primary opacity-10" data-unique-id="b4160f4e-074e-4f9c-af56-862c6f6f0ebb" data-file-name="components/home/pickleball-section.tsx" />
      <motion.div style={{
      y: y2,
      opacity
    }} className="absolute -left-20 bottom-10 h-24 w-24 rounded-full bg-accent opacity-10" data-unique-id="95c490d5-c9a7-4086-87fb-672a833a0c2a" data-file-name="components/home/pickleball-section.tsx" />

      <div className="container mx-auto px-6" data-unique-id="04ae7460-70b1-461c-ae63-d22dc9b65bdb" data-file-name="components/home/pickleball-section.tsx">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center" data-unique-id="490d8a89-2c66-43cb-ab45-e45a91c3fa2a" data-file-name="components/home/pickleball-section.tsx" data-dynamic-text="true">
          {/* Image */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.6
        }} data-unique-id="36496e22-df15-4e24-90c9-24476227a635" data-file-name="components/home/pickleball-section.tsx">
            <div className="relative" data-unique-id="de45a4b8-87f2-42f5-b346-2b0a05b35275" data-file-name="components/home/pickleball-section.tsx" data-dynamic-text="true">
              <img src="/pickleball-what.jpg" alt="Pickleball equipment" className="rounded-lg shadow-lg" data-unique-id="3fc9901b-ca2a-43bb-8b9e-2d0c83871f74" data-file-name="components/home/pickleball-section.tsx" />
              {/* Overlay elements */}
              <div className="absolute -top-5 -right-5 h-20 w-20 rounded-full border-4 border-accent opacity-50" data-unique-id="65a39626-82dd-4bad-afd0-8c855926bdad" data-file-name="components/home/pickleball-section.tsx"></div>
              <div className="absolute -bottom-3 -left-3 h-16 w-16 bg-primary rounded-lg opacity-20" data-unique-id="5e8beb69-774e-4ea2-8759-85fc896ddf49" data-file-name="components/home/pickleball-section.tsx"></div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} data-unique-id="8728b4aa-34fa-4a5a-8fd7-e8c8b10ce537" data-file-name="components/home/pickleball-section.tsx">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl" data-unique-id="7c906b5a-6e9b-4584-b465-d93033606986" data-file-name="components/home/pickleball-section.tsx"><span className="editable-text" data-unique-id="916fc995-c2db-49b1-bb0a-0d75a6fe5587" data-file-name="components/home/pickleball-section.tsx">
              What is </span><span className="text-primary" data-unique-id="0df8c9d4-fcce-4a7f-b081-7d45a7102d98" data-file-name="components/home/pickleball-section.tsx"><span className="editable-text" data-unique-id="33e42aa3-5840-4fd1-9f2f-6620c0f76a43" data-file-name="components/home/pickleball-section.tsx">Pickleball?</span></span>
            </h2>
            <div className="space-y-4 text-lg" data-unique-id="5b457111-c8cb-492a-aa62-99c9a277651a" data-file-name="components/home/pickleball-section.tsx">
              <p data-unique-id="2cb16af8-a49b-4784-8e25-96d6557717bf" data-file-name="components/home/pickleball-section.tsx"><span className="editable-text" data-unique-id="84fc75a1-4123-4040-a433-cd537bdeccbf" data-file-name="components/home/pickleball-section.tsx">
                Pickleball is a paddleball sport that combines elements of
                tennis, badminton, and table tennis. It's played with a paddle
                and a plastic ball with holes on either a badminton-sized court
                or a modified tennis court.
              </span></p>
              <p className="text-foreground/70" data-unique-id="bbb917b9-8e35-4fb2-a3f1-0180e6c3dbb2" data-file-name="components/home/pickleball-section.tsx"><span className="editable-text" data-unique-id="b0639413-09c8-4a19-9a4e-6ebc2ca88812" data-file-name="components/home/pickleball-section.tsx">
                The sport has seen explosive growth worldwide and is now
                Nagaland's fastest-growing recreational activity, appealing to
                players of all ages and skill levels.
              </span></p>
            </div>
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
            delay: 0.4
          }} className="mt-8" data-unique-id="8dc2877d-39de-482d-b643-3d745ecc8b4f" data-file-name="components/home/pickleball-section.tsx">
              <Button variant="primary" size="lg" motion data-unique-id="1360b602-9b3c-4b80-81d5-d77b72323f42" data-file-name="components/home/pickleball-section.tsx"><span className="editable-text" data-unique-id="a06bcc48-e562-4f27-8b51-9261c8261632" data-file-name="components/home/pickleball-section.tsx">
                Learn the Rules
              </span></Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
}