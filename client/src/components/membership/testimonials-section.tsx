"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}
export function TestimonialsSection() {
  const testimonials: Testimonial[] = [{
    id: 1,
    name: "Kevi Zhimomi",
    role: "Family Membership",
    quote: "Joining NPA was the best decision for our family. The kids love the junior programs, and my wife and I enjoy the mixed doubles nights. The community is so welcoming!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }, {
    id: 2,
    name: "Alobo Naga",
    role: "Individual Membership",
    quote: "As a beginner, I was worried about fitting in, but the coaches and other members have been incredibly supportive. I've improved so much in just a few months!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }, {
    id: 3,
    name: "Tali Angh",
    role: "Junior Membership",
    quote: "The junior program has helped me develop not just pickleball skills but also discipline and sportsmanship. I've made so many friends here!",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  return <section className="py-20 bg-secondary" data-unique-id="dd4c911d-5b80-457b-b7bc-4def0c446329" data-file-name="components/membership/testimonials-section.tsx">
      <div className="container mx-auto px-6" data-unique-id="2556ba0b-9a08-4ecc-ab47-496201878df7" data-file-name="components/membership/testimonials-section.tsx">
        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} className="mb-12 text-center" data-unique-id="cf1605f6-e7ed-4c13-a856-235e4aa0a0e9" data-file-name="components/membership/testimonials-section.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="8eab445c-5400-471a-ba5b-915b2f092f55" data-file-name="components/membership/testimonials-section.tsx"><span className="editable-text" data-unique-id="784a74c9-ac42-4071-81af-63b2873fc292" data-file-name="components/membership/testimonials-section.tsx">
            What Our </span><span className="text-primary" data-unique-id="255ff1a8-8499-4b07-8021-611929fd821d" data-file-name="components/membership/testimonials-section.tsx"><span className="editable-text" data-unique-id="4ed9e889-b676-4d0c-80ea-3a3aaeb6259c" data-file-name="components/membership/testimonials-section.tsx">Members</span></span><span className="editable-text" data-unique-id="c5f022dc-566f-4f5b-9fd2-26dde6b87ab4" data-file-name="components/membership/testimonials-section.tsx"> Say
          </span></h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="7681290a-93f2-4e44-97fd-12d225acd935" data-file-name="components/membership/testimonials-section.tsx"><span className="editable-text" data-unique-id="4cf5df0c-38bc-4467-87b8-cde2ab93d77c" data-file-name="components/membership/testimonials-section.tsx">
            Hear from our community about their experiences with Nagaland Pickleball Association.
          </span></p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl" data-unique-id="619b37c6-42ac-496f-827d-306cada1fa58" data-file-name="components/membership/testimonials-section.tsx">
          <div className="absolute -left-8 -top-8 text-primary opacity-20" data-unique-id="e4e34337-c701-4c69-8f88-29d868040683" data-file-name="components/membership/testimonials-section.tsx">
            <Quote size={64} />
          </div>
          
          <div className="relative overflow-hidden rounded-lg bg-card p-8 shadow-md" data-unique-id="cca2993e-e126-4f96-b809-4b2066bd0481" data-file-name="components/membership/testimonials-section.tsx" data-dynamic-text="true">
            {testimonials.map((testimonial, index) => <motion.div key={testimonial.id} initial={{
            opacity: 0,
            x: 100
          }} animate={{
            opacity: active === index ? 1 : 0,
            x: active === index ? 0 : 100,
            position: active === index ? "relative" : "absolute"
          }} transition={{
            duration: 0.5
          }} className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left" data-unique-id="4d6c9a38-3b46-45e5-9216-947c00e7ec92" data-file-name="components/membership/testimonials-section.tsx">
                <div className="shrink-0" data-unique-id="40c0e39a-4eff-4276-91e8-55a770a940ef" data-file-name="components/membership/testimonials-section.tsx">
                  <img src={testimonial.image} alt={testimonial.name} className="h-24 w-24 rounded-full object-cover" data-unique-id="eaf11bb2-114b-41fd-9ce1-c8e11a9d65dc" data-file-name="components/membership/testimonials-section.tsx" />
                </div>
                <div data-unique-id="5823364a-42a6-42fe-b5a5-5d6aa5917619" data-file-name="components/membership/testimonials-section.tsx">
                  <p className="mb-4 text-lg italic text-foreground/90" data-unique-id="5894b993-1501-4c58-af9e-fa0dea9580a0" data-file-name="components/membership/testimonials-section.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="75c5e186-6749-49c5-a0cb-256fbafbf9af" data-file-name="components/membership/testimonials-section.tsx">"</span>{testimonial.quote}<span className="editable-text" data-unique-id="52d2d114-a9a5-43b9-b5d5-acfd3b51a1d0" data-file-name="components/membership/testimonials-section.tsx">"</span></p>
                  <div data-unique-id="054de4bb-3cae-459d-94ab-946f7cebfe2f" data-file-name="components/membership/testimonials-section.tsx">
                    <p className="font-semibold" data-unique-id="2ef14d5f-b712-41e5-8bfb-1207c9b45185" data-file-name="components/membership/testimonials-section.tsx" data-dynamic-text="true">{testimonial.name}</p>
                    <p className="text-sm text-foreground/70" data-unique-id="a9337ed7-fec8-4ec5-9b54-288089c1d10e" data-file-name="components/membership/testimonials-section.tsx" data-dynamic-text="true">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>)}
          </div>
          
          <div className="mt-6 flex justify-center gap-2" data-unique-id="b6edc510-2b99-48f5-adaf-3b6ed68a7061" data-file-name="components/membership/testimonials-section.tsx" data-dynamic-text="true">
            {testimonials.map((_, index) => <button key={index} onClick={() => setActive(index)} className={`h-2 w-8 rounded-full transition-colors ${active === index ? "bg-primary" : "bg-primary/30"}`} aria-label={`Go to testimonial ${index + 1}`} data-unique-id="553a7a3c-63b8-46d8-acfb-0fdb34bcf91c" data-file-name="components/membership/testimonials-section.tsx" />)}
          </div>
        </div>
      </div>
    </section>;
}