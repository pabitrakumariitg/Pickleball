"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
interface Equipment {
  name: string;
  description: string;
  image: string;
}
export function EquipmentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);
  const equipment: Equipment[] = [{
    name: "Paddle",
    description: "Pickleball paddles are larger than ping-pong paddles but smaller than tennis rackets. They're typically made from wood, composite materials, or graphite. Beginners should look for a mid-weight paddle that balances power and control.",
    image: "/pickleball-pad.jpg"
  }, {
    name: "Ball",
    description: "Pickleball uses a perforated plastic ball similar to a wiffle ball. Indoor and outdoor pickleballs differ slightly - indoor balls have larger holes and are lighter, while outdoor balls are heavier and have smaller holes to resist wind.",
    image: "/pickleball-ball.jpg"
  }, 
  {
    name: "Court Shoes",
    description: "Court-specific athletic shoes provide the right support and grip for pickleball movements. Look for shoes with good lateral support, cushioning, and non-marking soles. Tennis or volleyball shoes work well for pickleball.",
    image: "/pickleball-shoes.jpg"
  }];
  return <section ref={sectionRef} id="equipment" className="relative overflow-hidden py-20 bg-secondary" data-unique-id="9b1fc1e2-e7ed-4dee-a12f-f9f854b4997c" data-file-name="components/how-to-play/equipment-section.tsx" data-dynamic-text="true">
      {/* Decorative background elements */}
      <motion.div style={{
      y,
      opacity
    }} className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-primary/5" data-unique-id="771957ee-a993-41e6-a916-cb8fa0d54a13" data-file-name="components/how-to-play/equipment-section.tsx" />
      <motion.div style={{
      y: useTransform(scrollYProgress, [0, 1], [0, -100]),
      opacity
    }} className="absolute -left-20 bottom-20 h-48 w-48 rounded-full bg-accent/5" data-unique-id="c81ac6e0-eee7-471c-8169-f26e2fe4927d" data-file-name="components/how-to-play/equipment-section.tsx" />

      <div className="container mx-auto px-6" data-unique-id="bb9e2fa7-1804-43ac-8a4e-1bf2961abdb8" data-file-name="components/how-to-play/equipment-section.tsx">
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
      }} className="mb-16 text-center" data-unique-id="3f6f3e08-df65-459c-966d-e41ed78f70ab" data-file-name="components/how-to-play/equipment-section.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="b4ee26e6-4b8a-470f-a133-6bdb5ebaea74" data-file-name="components/how-to-play/equipment-section.tsx"><span className="editable-text" data-unique-id="7a51f845-e70d-43ff-9a2d-829896b291a2" data-file-name="components/how-to-play/equipment-section.tsx">
            Essential </span><span className="text-primary" data-unique-id="96c4a840-6942-4c4e-9b5d-ae179b2e8bc3" data-file-name="components/how-to-play/equipment-section.tsx"><span className="editable-text" data-unique-id="9e104e6f-3f0e-4d0c-8cc0-3fd5c9dfdc56" data-file-name="components/how-to-play/equipment-section.tsx">Equipment</span></span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="b6269061-0e4e-4a83-96f2-b351b9acbaf5" data-file-name="components/how-to-play/equipment-section.tsx"><span className="editable-text" data-unique-id="e501d567-c988-4b63-b678-496c52f823bf" data-file-name="components/how-to-play/equipment-section.tsx">
            Get familiar with the basic equipment you'll need to start playing pickleball.
          </span></p>
        </motion.div>

        <div className="space-y-16" data-unique-id="9e15b3f8-0f7d-46cb-a476-c4aa3e07d2a9" data-file-name="components/how-to-play/equipment-section.tsx" data-dynamic-text="true">
          {equipment.map((item, index) => <motion.div key={index} initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.6
        }} className={`flex flex-col gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`} data-unique-id="af22046d-c640-4904-99fe-1fc3534b023f" data-file-name="components/how-to-play/equipment-section.tsx">
              <motion.div initial={{
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true,
            margin: "-100px"
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="w-full md:w-1/2" data-unique-id="0512be6a-ea5c-45c6-ace8-11c1c9dedc86" data-file-name="components/how-to-play/equipment-section.tsx">
                <div className="relative overflow-hidden rounded-lg" data-unique-id="15af9f26-5961-447f-ab89-a11da1b37b0a" data-file-name="components/how-to-play/equipment-section.tsx">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" data-unique-id="afc62c45-b978-44c8-b50c-64ec9ca236a6" data-file-name="components/how-to-play/equipment-section.tsx" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end" data-unique-id="a181417d-dd2f-4890-bcfe-1224b7f576f8" data-file-name="components/how-to-play/equipment-section.tsx">
                    <h3 className="p-6 text-2xl font-bold text-white" data-unique-id="5896144e-c2d5-410a-a6df-a331d24f21a0" data-file-name="components/how-to-play/equipment-section.tsx" data-dynamic-text="true">{item.name}</h3>
                  </div>
                </div>
              </motion.div>
              
              <motion.div initial={{
            opacity: 0,
            x: index % 2 === 0 ? 50 : -50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true,
            margin: "-100px"
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }} className="w-full md:w-1/2" data-unique-id="538d7381-1b99-43e3-a33d-16ef52b34ed0" data-file-name="components/how-to-play/equipment-section.tsx">
                <p className="text-lg text-foreground/80" data-unique-id="b5b2eaba-4091-4d2a-b583-18a997f03fad" data-file-name="components/how-to-play/equipment-section.tsx" data-dynamic-text="true">{item.description}</p>
              </motion.div>
            </motion.div>)}
        </div>
      </div>
    </section>;
}