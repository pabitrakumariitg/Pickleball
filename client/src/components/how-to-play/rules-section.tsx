"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
interface Rule {
  title: string;
  description: string;
}
export function RulesSection() {
  const rules: Rule[] = [{
    title: "Serving",
    description: "The serve must be made underhand and paddle contact with the ball must be below the server's waist. The serve is made diagonally crosscourt and must land within the opposite diagonal court."
  }, {
    title: "Two-Bounce Rule",
    description: "After the serve, each side must make one groundstroke before volleying the ball (hitting it before it bounces). This means the serving side must let the return bounce, and the receiving side must let the serve bounce."
  }, {
    title: "Non-Volley Zone (Kitchen)",
    description: "Players cannot volley the ball while standing within the non-volley zone (7 feet from the net). If a player's momentum causes them to touch the non-volley zone after hitting a volley, it's a fault."
  }, {
    title: "Scoring",
    description: "Points are only scored by the serving side. Games are typically played to 11, 15, or 21 points, and you must win by 2 points. In doubles, each player serves before the serve passes to the opponents."
  }, {
    title: "Line Calls",
    description: "A ball contacting any line except the non-volley zone line on a serve is considered in. If any part of the ball touches the line, it's good."
  }, {
    title: "Faults",
    description: "A fault occurs when: the ball is hit out of bounds, the ball does not clear the net, the ball is volleyed from the non-volley zone, or the ball is volleyed before a bounce has occurred on each side."
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
  return <section id="rules" className="py-20 bg-background" data-unique-id="f6ef086d-34a8-489d-9e15-9981abd3b3f3" data-file-name="components/how-to-play/rules-section.tsx">
      <div className="container mx-auto px-6" data-unique-id="5dd5ce66-fd34-410c-b70f-fb510ad21899" data-file-name="components/how-to-play/rules-section.tsx">
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
      }} className="mb-16 text-center" data-unique-id="74866afb-7bf4-4cf1-8bbe-a1faf65c7cd5" data-file-name="components/how-to-play/rules-section.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="bdf22f23-5c59-4866-bb16-897b09ffa8ec" data-file-name="components/how-to-play/rules-section.tsx"><span className="editable-text" data-unique-id="027ba2a6-2b96-46a8-b898-c655476544d6" data-file-name="components/how-to-play/rules-section.tsx">
            Basic </span><span className="text-primary" data-unique-id="fc45f534-1a37-4797-9b55-4997955a800b" data-file-name="components/how-to-play/rules-section.tsx"><span className="editable-text" data-unique-id="1947e498-5503-4383-96cb-bbb3aeebf5d5" data-file-name="components/how-to-play/rules-section.tsx">Rules</span></span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="8da4f3c9-fc6f-4141-b2fe-bd91c3007e15" data-file-name="components/how-to-play/rules-section.tsx"><span className="editable-text" data-unique-id="59379336-c0d9-4585-8545-23e2816c9092" data-file-name="components/how-to-play/rules-section.tsx">
            Understanding the fundamental rules of pickleball will help you get
            started quickly and enjoy the game from day one.
          </span></p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: "-100px"
      }} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-unique-id="f874278a-79fa-4ef1-97d2-0741b4f5ec97" data-file-name="components/how-to-play/rules-section.tsx" data-dynamic-text="true">
          {rules.map((rule, index) => <motion.div key={index} variants={itemVariants} className="card h-full border border-border p-6" data-unique-id="5a39b662-4db0-4c48-8970-d80b33e0eb81" data-file-name="components/how-to-play/rules-section.tsx">
              <div className="mb-4 flex items-start gap-3" data-unique-id="3aa7f101-f3eb-46c7-9d14-e9dc5c678f81" data-file-name="components/how-to-play/rules-section.tsx">
                <CheckCircle className="mt-1 h-6 w-6 shrink-0 text-primary" data-unique-id="b095df17-4d92-4166-af01-dece5b9468d6" data-file-name="components/how-to-play/rules-section.tsx" data-dynamic-text="true" />
                <h3 className="text-xl font-semibold" data-unique-id="7f3416da-28da-4de3-8434-c13797f6a0a1" data-file-name="components/how-to-play/rules-section.tsx" data-dynamic-text="true">{rule.title}</h3>
              </div>
              <p className="text-foreground/70" data-unique-id="16dce1e7-a6c9-446c-b74f-7ffb41f055be" data-file-name="components/how-to-play/rules-section.tsx" data-dynamic-text="true">{rule.description}</p>
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
}