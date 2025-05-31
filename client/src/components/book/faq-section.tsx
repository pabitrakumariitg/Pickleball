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
  const faqs: FAQ[] = [{
    question: "How far in advance can I book a court?",
    answer: "Members can book courts up to 14 days in advance, while non-members can book 7 days in advance. This gives our members priority access to preferred time slots."
  }, {
    question: "What happens if it rains and I've booked an outdoor court?",
    answer: "If weather conditions make outdoor courts unplayable, we'll offer you the option to reschedule your booking or move to an available indoor court (additional charges may apply if there's a price difference)."
  }, {
    question: "Can I bring my own equipment?",
    answer: "Absolutely! You're welcome to bring your own paddles and balls. If you don't have equipment, we offer rental options at all our locations."
  }, {
    question: "Is there a minimum booking time?",
    answer: "Yes, the minimum booking duration is 1 hour. You can book additional time in 30-minute increments after the first hour."
  }, {
    question: "How do I pay for my court booking?",
    answer: "We accept online payments through our booking system (credit/debit cards and mobile wallets). You can also pay at the venue before your session using cash or card."
  }];
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return <section className="py-20 bg-secondary" data-unique-id="dee40762-31d4-4492-b194-45f97eaf3905" data-file-name="components/book/faq-section.tsx">
      <div className="container mx-auto px-6" data-unique-id="e26b305a-61f0-4f57-ae25-3ff6ac47c384" data-file-name="components/book/faq-section.tsx">
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
      }} className="mb-12 text-center" data-unique-id="ccabd8bd-dd1e-4ea0-b257-3d5fcf118194" data-file-name="components/book/faq-section.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="9bfa4857-8b25-40b4-9b27-225b3569836b" data-file-name="components/book/faq-section.tsx">
            <span className="editable-text" data-unique-id="8150b4ca-1e2a-4724-bfb5-430cb32aa60c" data-file-name="components/book/faq-section.tsx">Frequently Asked </span>
            <span className="text-primary" data-unique-id="889427d8-f5dd-4f8f-a300-2460a9963dd8" data-file-name="components/book/faq-section.tsx"><span className="editable-text" data-unique-id="e1405bf5-0248-42ac-9f2a-32e6c72f1d64" data-file-name="components/book/faq-section.tsx">Questions</span></span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="11e8147a-fe0f-4757-973f-67ce757355fc" data-file-name="components/book/faq-section.tsx">
            <span className="editable-text" data-unique-id="462a62d5-d8da-4e64-9b09-e9dc25cd6aea" data-file-name="components/book/faq-section.tsx">
              Find answers to common questions about booking pickleball courts with us.
              If you don't see your question here, feel free to contact us.
            </span>
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl" data-unique-id="f07df2af-04eb-4e1d-9eb6-ad2598134f87" data-file-name="components/book/faq-section.tsx" data-dynamic-text="true">
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
        }} className="mb-4" data-unique-id="243c6ac7-9099-4b0a-98bc-befbdfae92f7" data-file-name="components/book/faq-section.tsx">
              <button onClick={() => toggleFAQ(index)} className="flex w-full items-center justify-between rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-background" data-unique-id="8163cfed-2ac7-4c62-9763-9ecff922d21f" data-file-name="components/book/faq-section.tsx">
                <span className="font-medium" data-unique-id="81e1ace9-4dd2-4b08-b640-b12782edf5b0" data-file-name="components/book/faq-section.tsx" data-dynamic-text="true">{faq.question}</span>
                <motion.div animate={{
              rotate: openIndex === index ? 180 : 0
            }} transition={{
              duration: 0.3
            }} data-unique-id="6538caea-315e-4574-a166-06614397b45e" data-file-name="components/book/faq-section.tsx">
                  <ChevronDown className="h-5 w-5 text-primary" data-unique-id="e3f755f2-609f-4b06-a967-fd64fd65be58" data-file-name="components/book/faq-section.tsx" data-dynamic-text="true" />
                </motion.div>
              </button>
              
              <AnimatePresence data-unique-id="4f3c1da1-6bfe-4601-b6c6-56be3cb1ae8c" data-file-name="components/book/faq-section.tsx" data-dynamic-text="true">
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
            }} className="overflow-hidden" data-unique-id="6c8bff87-dcb7-4708-a46e-3e9b0efdad70" data-file-name="components/book/faq-section.tsx">
                    <div className="rounded-b-lg border-x border-b border-border p-4 text-foreground/80" data-unique-id="17aff0c3-d9c8-4b4b-9b0b-e70765c89e28" data-file-name="components/book/faq-section.tsx" data-dynamic-text="true">
                      {faq.answer}
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </motion.div>)}
        </div>
      </div>
    </section>;
}