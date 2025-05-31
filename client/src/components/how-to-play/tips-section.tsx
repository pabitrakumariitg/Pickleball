"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
interface Tip {
  title: string;
  description: string;
}
export function TipsSection() {
  const beginnerTips: Tip[] = [{
    title: "Master the Dink",
    description: "The soft 'dink' shot that just clears the net and drops into the non-volley zone is fundamental. Practice this shot to control rallies and set up offensive opportunities."
  }, {
    title: "Get to the Kitchen Line",
    description: "In doubles, try to advance to the non-volley zone line (kitchen line) as quickly as possible. This positioning gives you the best offensive opportunities."
  }, {
    title: "Let Serves Bounce",
    description: "Remember the two-bounce rule! The serve and return of serve must both bounce before being volleyed. New players often forget this unique rule."
  }, {
    title: "Watch Your Feet",
    description: "Pay attention to the non-volley zone line. Stepping into this area while volleying (or after volleying due to momentum) results in a fault."
  }, {
    title: "Communication is Key",
    description: "In doubles, call out 'mine' or 'yours' for balls that could be played by either partner. Good communication prevents confusion and missed shots."
  }, {
    title: "Third Shot Drop",
    description: "When serving, focus on developing a good 'third shot drop' - a soft shot that lands in the opponent's non-volley zone, allowing your team to move up to the kitchen line."
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
  return <section className="py-20 bg-secondary" data-unique-id="d4123f3d-5830-4de2-a5ea-f1e67ddd3525" data-file-name="components/how-to-play/tips-section.tsx">
      <div className="container mx-auto px-6" data-unique-id="75266617-12f8-49e5-9384-b45d25d1f4fe" data-file-name="components/how-to-play/tips-section.tsx">
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
      }} className="mb-16 text-center" data-unique-id="53bd44be-878a-45d5-92ac-f221fae960dd" data-file-name="components/how-to-play/tips-section.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="f581fdb8-ed69-4fb6-9508-e49e2b09ba25" data-file-name="components/how-to-play/tips-section.tsx"><span className="editable-text" data-unique-id="0b715050-58a3-4064-a532-2f349c620dc6" data-file-name="components/how-to-play/tips-section.tsx">
            Beginner </span><span className="text-primary" data-unique-id="40c7bd2c-97d1-47ec-ad23-7a785f4ed935" data-file-name="components/how-to-play/tips-section.tsx"><span className="editable-text" data-unique-id="43faa436-3141-40fb-a79f-3d83b3e0b56e" data-file-name="components/how-to-play/tips-section.tsx">Tips</span></span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="f692c082-af76-452d-98fe-8437f710adc0" data-file-name="components/how-to-play/tips-section.tsx"><span className="editable-text" data-unique-id="2cfa53e1-694b-428f-bdad-1fcc4061a93d" data-file-name="components/how-to-play/tips-section.tsx">
            Improve your game quickly with these helpful tips for new pickleball players.
          </span></p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: "-100px"
      }} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-unique-id="12c68cfe-fa5f-4d60-add9-8dd84e36e5a2" data-file-name="components/how-to-play/tips-section.tsx" data-dynamic-text="true">
          {beginnerTips.map((tip, index) => <motion.div key={index} variants={itemVariants} className="card card-hover h-full border border-border p-6" data-unique-id="4243c177-00fd-41bd-85b2-903d490e4bb5" data-file-name="components/how-to-play/tips-section.tsx">
              <div className="mb-4 flex items-start gap-3" data-unique-id="f57d50fd-f47a-4230-86f3-2feeea83f803" data-file-name="components/how-to-play/tips-section.tsx">
                <Lightbulb className="mt-1 h-6 w-6 shrink-0 text-accent" data-unique-id="7592adfe-9574-415b-8b83-4e9b4d609f58" data-file-name="components/how-to-play/tips-section.tsx" data-dynamic-text="true" />
                <h3 className="text-xl font-semibold" data-unique-id="73272aa5-b4f4-4bff-b710-564c4099a1c2" data-file-name="components/how-to-play/tips-section.tsx" data-dynamic-text="true">{tip.title}</h3>
              </div>
              <p className="text-foreground/70" data-unique-id="d8c0b58c-3bc2-4c06-9f60-128d756b5bbf" data-file-name="components/how-to-play/tips-section.tsx" data-dynamic-text="true">{tip.description}</p>
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
}