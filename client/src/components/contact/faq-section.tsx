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
    question: "What are your office hours?",
    answer: "Our main office in Kohima is open Monday through Friday from 9:00 AM to 5:00 PM, and Saturday from 10:00 AM to 2:00 PM. We are closed on Sundays and public holidays."
  }, {
    question: "How long does it typically take to get a response?",
    answer: "We aim to respond to all inquiries within 24-48 business hours. For urgent matters related to court bookings or events, please call our office directly."
  }, {
    question: "Can I visit your office without an appointment?",
    answer: "Yes, walk-ins are welcome during our regular office hours. However, for specific inquiries or if you'd like to meet with a particular staff member, we recommend scheduling an appointment in advance."
  }, {
    question: "How can I apply for a partnership or sponsorship?",
    answer: "For partnership or sponsorship opportunities, please send us an email at partnerships@pickleballnagaland.org with details about your organization and proposal. Our team will review your request and get back to you."
  }, {
    question: "I want to volunteer with NPA. How do I get started?",
    answer: "We're always looking for volunteers! Please fill out our volunteer form on the website or send an email to volunteer@pickleballnagaland.org with your information, availability, and areas of interest."
  }];
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return <section className="py-20 bg-secondary" data-unique-id="07aa2da0-da14-4d66-840b-24d6689619de" data-file-name="components/contact/faq-section.tsx">
      <div className="container mx-auto px-6" data-unique-id="13a37465-bb98-47ab-a7c0-601da8c7dfdb" data-file-name="components/contact/faq-section.tsx">
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
      }} className="mb-12 text-center" data-unique-id="432859ee-5bcc-49bb-bf97-e8bb995876a4" data-file-name="components/contact/faq-section.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="41888abf-bc34-4f07-a3af-c9c7a669ac89" data-file-name="components/contact/faq-section.tsx"><span className="editable-text" data-unique-id="05a8c43d-05db-457a-a690-ed41be0112a4" data-file-name="components/contact/faq-section.tsx">
            Frequently Asked </span><span className="text-primary" data-unique-id="082e74de-bae3-4e3a-a172-e356a9dab082" data-file-name="components/contact/faq-section.tsx"><span className="editable-text" data-unique-id="fe9d2bda-26f9-4700-ab8f-6d65ef62a0b9" data-file-name="components/contact/faq-section.tsx">Questions</span></span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="ddb18bfa-ecfc-4230-8deb-460ebcc93db1" data-file-name="components/contact/faq-section.tsx"><span className="editable-text" data-unique-id="446341f4-0973-40c0-85f1-96599b5938b6" data-file-name="components/contact/faq-section.tsx">
            Find answers to common questions about contacting and working with the
            Nagaland Pickleball Association.
          </span></p>
        </motion.div>

        <div className="mx-auto max-w-3xl" data-unique-id="407edac4-ee13-4235-9d7a-ea87419a8d52" data-file-name="components/contact/faq-section.tsx" data-dynamic-text="true">
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
        }} className="mb-4" data-unique-id="9c702203-a266-40a3-8170-b92c12625254" data-file-name="components/contact/faq-section.tsx">
              <button onClick={() => toggleFAQ(index)} className="flex w-full items-center justify-between rounded-lg border border-border bg-card p-4 text-left transition-colors hover:bg-background" data-unique-id="e7477ee4-26ed-42cc-987e-fd02a795161b" data-file-name="components/contact/faq-section.tsx">
                <span className="font-medium" data-unique-id="cd74089d-5801-4d48-bc25-22a118ac4631" data-file-name="components/contact/faq-section.tsx" data-dynamic-text="true">{faq.question}</span>
                <motion.div animate={{
              rotate: openIndex === index ? 180 : 0
            }} transition={{
              duration: 0.3
            }} data-unique-id="9bdd4a47-babc-44be-8127-cdd51ba0d9b7" data-file-name="components/contact/faq-section.tsx">
                  <ChevronDown className="h-5 w-5 text-primary" data-unique-id="33da3b59-3c93-47f4-ac49-3b7e13c5e5eb" data-file-name="components/contact/faq-section.tsx" data-dynamic-text="true" />
                </motion.div>
              </button>
              
              <AnimatePresence data-unique-id="76314ff3-e304-42a6-b508-23dcc6e4e765" data-file-name="components/contact/faq-section.tsx" data-dynamic-text="true">
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
            }} className="overflow-hidden" data-unique-id="dbb4cfc3-3768-490b-ad33-02281b2804c5" data-file-name="components/contact/faq-section.tsx">
                    <div className="rounded-b-lg border-x border-b border-border p-4 text-foreground/80" data-unique-id="c9242e6d-d439-4f17-a61c-6d9d0dae5a32" data-file-name="components/contact/faq-section.tsx" data-dynamic-text="true">
                      {faq.answer}
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </motion.div>)}
        </div>
      </div>
    </section>;
}