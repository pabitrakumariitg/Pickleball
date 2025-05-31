"use client";

import { motion } from "framer-motion";
import { InteractiveCourt } from "@/components/interactive-court";
export function CourtGuide() {
  return <section className="py-20 bg-background" data-unique-id="87f6e328-1d21-4848-9e1d-588e4ca93d00" data-file-name="components/how-to-play/court-guide.tsx">
      <div className="container mx-auto px-6" data-unique-id="ceec83c8-2a81-424c-b6e3-2f3c46091fd5" data-file-name="components/how-to-play/court-guide.tsx">
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
      }} className="mb-12 text-center" data-unique-id="f716f408-5ef4-4e4a-a5e4-5f7567eb7954" data-file-name="components/how-to-play/court-guide.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="8e85c60a-3a43-40d0-b684-25e5745d9a51" data-file-name="components/how-to-play/court-guide.tsx">
            <span className="text-primary" data-unique-id="bb399eee-7766-4678-b49a-1acabec18b09" data-file-name="components/how-to-play/court-guide.tsx"><span className="editable-text" data-unique-id="c63e9277-1341-4e5e-9b36-689bfe979c39" data-file-name="components/how-to-play/court-guide.tsx">Court</span></span><span className="editable-text" data-unique-id="32b345a1-e0ac-4ebc-879b-9184cd498427" data-file-name="components/how-to-play/court-guide.tsx"> Layout
          </span></h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="500ae5bc-4b5c-4f96-967c-6b6708f6a553" data-file-name="components/how-to-play/court-guide.tsx"><span className="editable-text" data-unique-id="7f0d0387-f16f-4ae6-aad4-72eda94150a7" data-file-name="components/how-to-play/court-guide.tsx">
            Understanding the pickleball court layout is essential for learning
            proper positioning and strategy. Explore the interactive court below
            to learn about the different zones.
          </span></p>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} data-unique-id="0a6b99fd-a8da-44af-a024-b86c0b645da1" data-file-name="components/how-to-play/court-guide.tsx">
          <InteractiveCourt />
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
        delay: 0.3
      }} className="mt-10 mx-auto max-w-3xl" data-unique-id="99050691-b582-4f70-a3a7-cbb8c94aa42d" data-file-name="components/how-to-play/court-guide.tsx">
          <h3 className="mb-4 text-xl font-semibold" data-unique-id="2b168cd4-2767-4ce5-bf11-1b87b1ec1e38" data-file-name="components/how-to-play/court-guide.tsx"><span className="editable-text" data-unique-id="8d07bddd-3684-425b-bb48-d01c700ec44c" data-file-name="components/how-to-play/court-guide.tsx">Court Dimensions</span></h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-foreground/80" data-unique-id="7fe129a9-470e-4e4a-894b-50d69c8ad0d3" data-file-name="components/how-to-play/court-guide.tsx">
            <li className="flex items-center gap-2" data-unique-id="2ebea00c-c2f5-42ea-94d1-c28af8a5958b" data-file-name="components/how-to-play/court-guide.tsx">
              <span className="h-2 w-2 rounded-full bg-primary" data-unique-id="8247acb4-e1fe-4a94-b4ad-944d10059c1f" data-file-name="components/how-to-play/court-guide.tsx"></span><span className="editable-text" data-unique-id="283c6533-efd3-41a4-a39f-d8b553046d39" data-file-name="components/how-to-play/court-guide.tsx">
              Total Court Size: 20' × 44' (same as a doubles badminton court)
            </span></li>
            <li className="flex items-center gap-2" data-unique-id="d6e85c03-8c0b-4a1a-ba5f-b2c30f206cc2" data-file-name="components/how-to-play/court-guide.tsx">
              <span className="h-2 w-2 rounded-full bg-primary" data-unique-id="7555d0f1-840e-42ac-a5f2-3940bc312ed5" data-file-name="components/how-to-play/court-guide.tsx"></span><span className="editable-text" data-unique-id="e4f68c61-42d1-4e53-ab8b-883f3a50f535" data-file-name="components/how-to-play/court-guide.tsx">
              Playing Area: 20' × 44'
            </span></li>
            <li className="flex items-center gap-2" data-unique-id="6c0acbda-9c5b-418f-b81a-0cb51c165056" data-file-name="components/how-to-play/court-guide.tsx">
              <span className="h-2 w-2 rounded-full bg-primary" data-unique-id="2008fecd-9280-4e4c-923a-05c477e8a33f" data-file-name="components/how-to-play/court-guide.tsx"></span><span className="editable-text" data-unique-id="fbadfa42-a13d-4709-a6d5-e24a2d239c34" data-file-name="components/how-to-play/court-guide.tsx">
              Non-Volley Zone: 7' from the net on both sides
            </span></li>
            <li className="flex items-center gap-2" data-unique-id="1701c283-67cd-444f-9d01-68d8bb04a10e" data-file-name="components/how-to-play/court-guide.tsx">
              <span className="h-2 w-2 rounded-full bg-primary" data-unique-id="be2c9103-6620-4980-a0c4-49a96e640355" data-file-name="components/how-to-play/court-guide.tsx"></span><span className="editable-text" data-unique-id="2a56245f-2a79-4591-b2ab-b7c21d5dfabe" data-file-name="components/how-to-play/court-guide.tsx">
              Net Height: 36" at sidelines, 34" in the middle
            </span></li>
          </ul>
        </motion.div>
      </div>
    </section>;
}