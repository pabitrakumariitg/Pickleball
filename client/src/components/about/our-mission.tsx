"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
export function OurMission() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  return <section ref={sectionRef} id="our-story" className="relative overflow-hidden py-20 md:py-32 bg-background" data-unique-id="af2f0f0b-83cf-4096-a36c-6138512506ca" data-file-name="components/about/our-story.tsx" data-dynamic-text="true">
    {/* Decorative elements */}
    <motion.div style={{
      y,
      opacity
    }} className="absolute top-20 -right-20 h-64 w-64 rounded-full bg-primary/5" data-unique-id="b11c8ac2-3d9c-45ea-a2f0-18da5fc1d893" data-file-name="components/about/our-story.tsx" />
    <motion.div style={{
      y: useTransform(scrollYProgress, [0, 1], [0, -100]),
      opacity
    }} className="absolute -left-20 bottom-20 h-48 w-48 rounded-full bg-accent/5" data-unique-id="be8d8fe2-5179-4452-be93-57ee069d659b" data-file-name="components/about/our-story.tsx" />

    <div className="container mx-auto px-6" data-unique-id="97ed7589-4d0e-4001-af1b-4a57a2016aae" data-file-name="components/about/our-story.tsx">
      <div className="grid gap-12 md:grid-cols-2 items-center" data-unique-id="b73ff53c-99c9-457f-904a-baa38c56d6db" data-file-name="components/about/our-story.tsx">
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
        }} data-unique-id="a99b7a1d-7651-453c-ad17-47a739ff0476" data-file-name="components/about/our-story.tsx">
          <div className="relative" data-unique-id="0b5cafe7-b354-44ff-a501-a59a7a4b9311" data-file-name="components/about/our-story.tsx">
            <img src="/pickleball-mission.jpg" alt="Pickleball players in Nagaland" className="rounded-lg shadow-lg" data-unique-id="d1d7b407-0288-4f94-ac04-9774031b48d0" data-file-name="components/about/our-story.tsx" />
            <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-lg border-4 border-accent/20 -z-10" data-unique-id="5a670eaf-792a-446c-906e-47cc48039d19" data-file-name="components/about/our-story.tsx"></div>
            <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-primary/10 -z-10" data-unique-id="b71310fc-29b0-46a2-a6c0-c49fd4b9bf7a" data-file-name="components/about/our-story.tsx"></div>
          </div>
        </motion.div>

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
        }} data-unique-id="e1e77f53-9482-4b6a-a73a-7c1abe21077c" data-file-name="components/about/our-story.tsx">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl" data-unique-id="f9bbdedc-c033-4ed7-ab49-726e5883d540" data-file-name="components/about/our-story.tsx"><span className="editable-text" data-unique-id="a7d37e5d-484d-42f6-908b-cd73a986a20f" data-file-name="components/about/our-story.tsx">
            Our </span><span className="text-primary" data-unique-id="1429e46d-e7e7-48d1-84e7-05e4057598d1" data-file-name="components/about/our-story.tsx"><span className="editable-text" data-unique-id="45dc94bf-dcf0-43ec-917c-3e5a22477811" data-file-name="components/about/our-story.tsx">Mission</span></span>
          </h2>

          <div className="space-y-6" data-unique-id="74d0979c-4447-4cc6-9f9a-502823250ec5" data-file-name="components/about/our-story.tsx">
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
              delay: 0.3
            }} data-unique-id="3f142240-54f5-4e95-9a00-4e567253ea10" data-file-name="components/about/our-story.tsx">
              <h3 className="text-xl font-semibold mb-2" data-unique-id="6fdcbd93-b1a2-46b3-abd3-aada03a033f0" data-file-name="components/about/our-story.tsx"><span className="editable-text" data-unique-id="475556bd-4d0e-4597-9d61-ed9e4f084f5e" data-file-name="components/about/our-story.tsx">Grow the Sport</span></h3>
              <p className="text-foreground/80" data-unique-id="916cde69-5987-4a03-8d6c-5a3f76b12d0b" data-file-name="components/about/our-story.tsx"><span className="editable-text" data-unique-id="8fdf5c96-bdbd-4184-8726-368be143fe0c" data-file-name="components/about/our-story.tsx">
                Introduce pickleball to schools, colleges, and communities.
              </span></p>
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
              delay: 0.4
            }} data-unique-id="e872fbfe-4a79-41ce-ba88-3651ceb4719a" data-file-name="components/about/our-story.tsx">
              <h3 className="text-xl font-semibold mb-2" data-unique-id="ccb4d02a-c451-4a21-9307-2b6a9ef80bab" data-file-name="components/about/our-story.tsx"><span className="editable-text" data-unique-id="2905ce0f-7455-4b19-aa2b-f77911dbcc9c" data-file-name="components/about/our-story.tsx"> Build Infrastructure</span></h3>
              <p className="text-foreground/80" data-unique-id="4639cca4-7e54-4665-af8e-ec4acea8c191" data-file-name="components/about/our-story.tsx"><span className="editable-text" data-unique-id="5a63417c-bd31-4bba-ab09-6c6685999da9" data-file-name="components/about/our-story.tsx">
                Advocate for more courts and facilities across Nagaland.
              </span></p>
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
              delay: 0.5
            }} data-unique-id="5838847c-ae6f-4c8e-84fb-03d473d49170" data-file-name="components/about/our-story.tsx">
              <h3 className="text-xl font-semibold mb-2" data-unique-id="b4415572-12ec-459d-907b-c94de63e6f6e" data-file-name="components/about/our-story.tsx"><span className="editable-text" data-unique-id="c6a88c5c-bd61-4c58-941a-dcaecb149d2f" data-file-name="components/about/our-story.tsx">Foster Community</span></h3>
              <p className="text-foreground/80" data-unique-id="e6d7929c-c431-432f-b31a-51d2e45afbc0" data-file-name="components/about/our-story.tsx"><span className="editable-text" data-unique-id="e75994f5-35e5-4c93-964d-9d2d852294be" data-file-name="components/about/our-story.tsx">
                Create a welcoming environment for players of all ages and skill levels.

              </span></p>
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
              delay: 0.5
            }} data-unique-id="5838847c-ae6f-4c8e-84fb-03d473d49170" data-file-name="components/about/our-story.tsx">
              <h3 className="text-xl font-semibold mb-2" data-unique-id="b4415572-12ec-459d-907b-c94de63e6f6e" data-file-name="components/about/our-story.tsx"><span className="editable-text" data-unique-id="c6a88c5c-bd61-4c58-941a-dcaecb149d2f" data-file-name="components/about/our-story.tsx">Compete Nationally</span></h3>
              <p className="text-foreground/80" data-unique-id="e6d7929c-c431-432f-b31a-51d2e45afbc0" data-file-name="components/about/our-story.tsx"><span className="editable-text" data-unique-id="e75994f5-35e5-4c93-964d-9d2d852294be" data-file-name="components/about/our-story.tsx">
                Support players to represent Nagaland in national and international tournaments.
              </span></p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>;
}