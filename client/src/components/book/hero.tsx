"use client";

import { motion } from "framer-motion";
import { CalendarDays, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
export function BookHero() {
  return <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary pt-24 pb-16 md:pb-24 md:pt-32" data-unique-id="975ab03a-d208-4d50-a56f-7fc87cb2d502" data-file-name="components/book/hero.tsx" data-dynamic-text="true">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-5" data-unique-id="1d375c0e-595c-4fcd-ae9e-74953c03dbe0" data-file-name="components/book/hero.tsx">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" data-unique-id="e4597a56-4fc5-4875-994e-ddfd476a1d7c" data-file-name="components/book/hero.tsx">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6" data-unique-id="d7c217af-722f-441c-b0d4-141d1d3661bd" data-file-name="components/book/hero.tsx">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16" data-unique-id="2f6423be-0420-47de-a2b1-6a778063d780" data-file-name="components/book/hero.tsx" data-dynamic-text="true">
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
        }} data-unique-id="40a7369a-3112-4653-bd0c-5620f1d245b6" data-file-name="components/book/hero.tsx">
            <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.8,
            delay: 0.3
          }} className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent" data-unique-id="99035b98-0a95-4efb-848a-e508371d4680" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="39db2617-85eb-45af-8785-64f645553a97" data-file-name="components/book/hero.tsx">
              Easy Online Booking
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
          }} className="mb-4 max-w-xl text-4xl font-bold md:text-5xl lg:text-6xl" data-unique-id="1fbbdc2d-e9dc-44b1-ab92-cc918ff1cac4" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="3989f792-c5ec-4d38-b5c1-2eacf1aff031" data-file-name="components/book/hero.tsx">
              Book Your </span><span className="text-primary" data-unique-id="8785b5e2-fcb1-434d-89d5-230094485228" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="717f33f9-dea5-4767-9eea-b4cb7b51580c" data-file-name="components/book/hero.tsx">Court</span></span>
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
          }} className="mb-8 max-w-xl text-lg text-foreground/80" data-unique-id="d1730c7b-af98-44d5-a49a-5fb74fc1135f" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="a6944a8b-5b8c-4949-85c4-8412e48440b9" data-file-name="components/book/hero.tsx">
              Reserve your pickleball court in just a few clicks. Choose from indoor
              and outdoor facilities across Nagaland. Members enjoy special rates
              and priority booking.
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
          }} className="flex flex-wrap gap-4" data-unique-id="1ea6b443-7a0a-4ae1-8b1b-0817c4ed367c" data-file-name="components/book/hero.tsx">
              <Button motion variant="cta" size="lg" className="group" icon={<ChevronDown className="transition-transform group-hover:translate-y-1" />} iconPosition="right" data-unique-id="4f061f7a-5a90-4c1d-9a3e-87203dd267b1" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="675153dd-c658-44e1-b408-7f602af6f3a5" data-file-name="components/book/hero.tsx">
                See Available Courts
              </span></Button>
              <Button motion variant="outline" size="lg" className="border-primary" data-unique-id="11534e83-fec1-46e1-b9f9-4146f9f49c29" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="9490223b-f358-45c9-8016-360887fd1729" data-file-name="components/book/hero.tsx">
                Learn About Pricing
              </span></Button>
            </motion.div>
          </motion.div>

          {/* Booking panel preview */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.8,
          delay: 0.6,
          ease: [0, 0.71, 0.2, 1.01]
        }} className="relative" data-unique-id="bb18feae-9a39-4de4-b67a-24c2a179c0ec" data-file-name="components/book/hero.tsx">
            <div className="relative rounded-xl bg-card border border-border p-6 shadow-lg" data-unique-id="7f09808c-2c59-4c2e-ad64-a93a15005e78" data-file-name="components/book/hero.tsx" data-dynamic-text="true">
              <h3 className="mb-4 text-xl font-semibold" data-unique-id="586d12e1-41a5-460f-870e-62e704fb5c23" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="2a0d1a8e-7ec3-41d1-9105-a56958efad6b" data-file-name="components/book/hero.tsx">Quick Reservation</span></h3>
              
              <div className="space-y-4" data-unique-id="7f8e7531-a3f9-4d6f-8e96-7c3613c79a34" data-file-name="components/book/hero.tsx">
                <div data-unique-id="2917f4b6-6400-4dda-b514-4043291f0bc2" data-file-name="components/book/hero.tsx">
                  <label className="mb-1 block text-sm font-medium" data-unique-id="fd6f0eeb-ef8d-4e0c-abc6-6d6bc1b8b9d2" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="51158cf5-3eaf-4e3c-995e-8ee2f99e43f1" data-file-name="components/book/hero.tsx">Location</span></label>
                  <select className="w-full rounded-md border border-border bg-card px-3 py-2" data-unique-id="9bb2f332-da29-4eec-9c34-d96aa6a2b9fa" data-file-name="components/book/hero.tsx">
                    <option data-unique-id="5220d72e-553b-49c1-9daa-f101f97b15a9" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="fd6a4343-9a3f-4643-af04-fe7f14e1fa0b" data-file-name="components/book/hero.tsx">Kohima Sports Complex</span></option>
                    <option data-unique-id="a500309b-7ff6-4fcb-8444-3860631f226b" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="f78e26ed-5bff-493a-82e5-3c31f1a64c66" data-file-name="components/book/hero.tsx">Dimapur Indoor Courts</span></option>
                    <option data-unique-id="f7c3648a-5dda-4adc-b342-0c3d3eca4c86" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="9e625007-f8a2-4313-985f-2effd95c3d67" data-file-name="components/book/hero.tsx">Mokokchung Community Center</span></option>
                  </select>
                </div>
                
                <div data-unique-id="e78143d3-4b02-4f08-806a-ef7f2990b589" data-file-name="components/book/hero.tsx">
                  <label className="mb-1 block text-sm font-medium" data-unique-id="6569436b-b209-4ace-b322-09cc9a8dee77" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="ebaab949-71fa-476f-8ff5-48bb398c78ad" data-file-name="components/book/hero.tsx">Date</span></label>
                  <div className="relative" data-unique-id="72ef1537-d536-41a7-a22a-bf223dde0198" data-file-name="components/book/hero.tsx">
                    <input type="text" placeholder="Select date" className="w-full rounded-md border border-border bg-card px-3 py-2 pl-10" data-unique-id="0d377c9b-1e36-49dc-9241-2dc29adb82da" data-file-name="components/book/hero.tsx" />
                    <CalendarDays className="absolute left-3 top-2.5 h-5 w-5 text-foreground/50" />
                  </div>
                </div>
                
                <div data-unique-id="2a919fd6-5c65-400f-94e3-9fb222eba126" data-file-name="components/book/hero.tsx">
                  <label className="mb-1 block text-sm font-medium" data-unique-id="d8db8142-a644-4bac-b719-80f562a30a44" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="5878198b-9675-4336-a616-561517124c7d" data-file-name="components/book/hero.tsx">Time Slot</span></label>
                  <select className="w-full rounded-md border border-border bg-card px-3 py-2" data-unique-id="5dd6ef07-56c5-4d1c-a6a9-1d5cadf3d7ef" data-file-name="components/book/hero.tsx">
                    <option data-unique-id="379bcb55-1c6e-47a5-9a2b-33ccd57b527b" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="1c0cc45b-246b-46fc-a9ad-a1cc4a23cb1b" data-file-name="components/book/hero.tsx">9:00 AM - 10:00 AM</span></option>
                    <option data-unique-id="17107378-c741-4ddb-aa39-f1ac9f92f346" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="40300a66-c0e7-46a6-843d-c29a93682203" data-file-name="components/book/hero.tsx">10:00 AM - 11:00 AM</span></option>
                    <option data-unique-id="711adfdd-f758-49c5-8f09-e0765ff071eb" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="c058c348-9477-40de-9be2-9bf4a50fe0b1" data-file-name="components/book/hero.tsx">11:00 AM - 12:00 PM</span></option>
                    <option data-unique-id="47da7cc2-44e5-466c-acdf-9e5e74fe6044" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="03bc545e-d076-4837-85db-84d610016236" data-file-name="components/book/hero.tsx">5:00 PM - 6:00 PM</span></option>
                  </select>
                </div>
                
                <div data-unique-id="d0e52602-277d-4f8e-a15d-4f13df6a965e" data-file-name="components/book/hero.tsx">
                  <label className="mb-1 block text-sm font-medium" data-unique-id="5b634a5a-d7bc-4833-a341-ac5aa11febf4" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="2af3ceeb-6ea2-43d8-906d-4d9d10def48a" data-file-name="components/book/hero.tsx">Number of Courts</span></label>
                  <select className="w-full rounded-md border border-border bg-card px-3 py-2" data-unique-id="87ffdc69-c4d0-4672-8bbf-40c73adc262f" data-file-name="components/book/hero.tsx">
                    <option data-unique-id="a4208062-602b-43fe-8f5a-7d84f71ed012" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="b3367ced-1dd1-4320-af7c-4bed2a9ec269" data-file-name="components/book/hero.tsx">1</span></option>
                    <option data-unique-id="8330c642-7690-4914-aa55-d722813ae990" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="65d422b0-5924-4c8d-b4c1-578a9f2ce95b" data-file-name="components/book/hero.tsx">2</span></option>
                    <option data-unique-id="a3629dea-99c1-4db0-a6ea-961c1bf925b1" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="ab6f03b5-74cc-4d9c-87b2-68746e4cd058" data-file-name="components/book/hero.tsx">3</span></option>
                  </select>
                </div>
                
                <Button variant="primary" className="w-full" motion data-unique-id="e53bd029-bebc-4024-9e3f-d4637d30f220" data-file-name="components/book/hero.tsx"><span className="editable-text" data-unique-id="a8a228d2-22c2-4e18-8b55-d94c6e19b4e1" data-file-name="components/book/hero.tsx">
                  Check Availability
                </span></Button>
              </div>

              {/* Accent elements */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary opacity-10 blur-xl" data-unique-id="be013b68-5851-4912-957c-5b88a6b95532" data-file-name="components/book/hero.tsx"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}