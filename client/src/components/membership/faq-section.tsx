"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
interface FAQ {
  question: string;
  answer: string;
}
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs: FAQ[] = [
    {
      question: "Who needs to register?",
      answer: "All players who wish to participate in any event organized or recognized by the NPA must register."
    },
    {
      question: "How long is the registration valid?",
      answer: "It is valid for 1 year from the date of approval. You must renew annually."
    },
    {
      question: "Is there a registration fee?",
      answer: "Yes, a nominal registration fee will be applicable. The details will be provided in the registration form."
    },
    {
      question: "What benefits do I get from registering?",
      answer: "• Entry to official NPA events\n• State ranking inclusion\n• Eligibility for state team selection\n• Invitations to camps and special programs\n• Exclusive updates, training, and partner benefits"
    },
    {
      question: "Can I register on behalf of someone else?",
      answer: "Minors may be registered by their parent/guardian. All others must register themselves."
    },
    {
      question: "What documents are required for registration?",
      answer: "• Valid ID proof\n• Address proof (e.g., Aadhaar, Voter ID)\n• Passport-size photo\n• Consent form (for minors)"
    },
    {
      question: "What happens if I don’t register?",
      answer: "You will not be eligible to play in any NPA tournaments, ranking events, or be considered for the state team."
    },
    {
      question: "How do I get selected for the state team?",
      answer: "Selections are based on performance, ranking points, and selection trials conducted by NPA. Only registered players are eligible."
    },
    {
      question: "Will I be notified about upcoming events?",
      answer: "Yes, registered players will receive priority updates and notifications through WhatsApp, email, and the official NPA channels."
    }
  ];
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return <section className="py-20 bg-background" data-unique-id="0e522804-20d8-47cf-8794-8d10c14e8042" data-file-name="components/membership/faq-section.tsx">
      <div className="container mx-auto px-6" data-unique-id="0682710c-3698-4f62-b20e-a8004ea10231" data-file-name="components/membership/faq-section.tsx">
        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} className="mb-12 text-center" data-unique-id="e2c28c79-28f8-4c2e-a16d-53499516b8ff" data-file-name="components/membership/faq-section.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="e85a0e42-481f-4069-a98e-cfde00ed9eae" data-file-name="components/membership/faq-section.tsx"><span className="editable-text" data-unique-id="5489eb86-7d6a-46cf-82bb-5131a988e0ca" data-file-name="components/membership/faq-section.tsx">
            Frequently Asked </span><span className="text-primary" data-unique-id="4790bb90-bdb6-437c-a533-61c83d72d536" data-file-name="components/membership/faq-section.tsx"><span className="editable-text" data-unique-id="808b906a-f962-4076-9c15-ab468dfd9e61" data-file-name="components/membership/faq-section.tsx">Questions</span></span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="7c52e15d-3735-4d19-af75-54f546d8cf29" data-file-name="components/membership/faq-section.tsx"><span className="editable-text" data-unique-id="3ce9374a-9526-4987-a01f-ee2a79ad134b" data-file-name="components/membership/faq-section.tsx">
            Find answers to common questions about our membership options and benefits.
          </span></p>
        </motion.div>

        <div className="mx-auto max-w-3xl" data-unique-id="54ea318f-ed95-465a-a308-a60076a8aaf5" data-file-name="components/membership/faq-section.tsx" data-dynamic-text="true">
          {faqs.map((faq, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} className="mb-4" data-unique-id="cec84106-b519-4cc7-84b6-bc3930724bfc" data-file-name="components/membership/faq-section.tsx">
              <button onClick={() => toggleFAQ(index)} className="flex w-full items-center justify-between rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-secondary" data-unique-id="ddde754d-8c12-412f-a825-4e09c87dbd63" data-file-name="components/membership/faq-section.tsx">
                <span className="font-medium" data-unique-id="a5f17f0b-7ab8-4867-bfa0-16be50458ac4" data-file-name="components/membership/faq-section.tsx" data-dynamic-text="true">{faq.question}</span>
                <motion.div animate={{
              rotate: openIndex === index ? 180 : 0
            }} transition={{
              duration: 0.3
            }} data-unique-id="87cd63de-b8d3-4c40-8951-c621908302e9" data-file-name="components/membership/faq-section.tsx">
                  <ChevronDown className="h-5 w-5 text-primary" data-unique-id="a0ce5830-0d4b-463a-8648-f89d5f386240" data-file-name="components/membership/faq-section.tsx" data-dynamic-text="true" />
                </motion.div>
              </button>
              
              <AnimatePresence data-unique-id="3613c3ce-87f1-45d1-860a-26e15835ad8c" data-file-name="components/membership/faq-section.tsx" data-dynamic-text="true">
                {openIndex === index && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: "auto",
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} transition={{
              duration: 0.3
            }} className="overflow-hidden" data-unique-id="4bdbdfed-7e69-4136-b26f-bd8b93fc052e" data-file-name="components/membership/faq-section.tsx">
                    <div className="rounded-b-lg border-x border-b border-border p-4 text-foreground/80" data-unique-id="f74e65a7-96d5-49f3-a28c-d7e44bf45366" data-file-name="components/membership/faq-section.tsx" data-dynamic-text="true">
                      {faq.answer}
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </motion.div>)}
        </div>
      </div>
    </section>;
}