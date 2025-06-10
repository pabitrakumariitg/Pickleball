"use client";

import { motion } from "framer-motion";
import { CalendarDays, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BookHero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-background to-secondary pt-24 pb-16 md:pb-24 md:pt-32"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center min-h-[60vh] text-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent"
            >
              Easy Online Booking
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mb-4 max-w-3xl text-4xl font-bold md:text-5xl lg:text-6xl mx-auto"
            >
              Book Your <span className="text-primary">Court</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mb-8 max-w-2xl text-lg text-foreground/80 mx-auto"
            >
              Reserve your pickleball court in just a few clicks. Choose from indoor
              and outdoor facilities across Nagaland. Members enjoy special rates
              and priority booking.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                motion
                variant="cta"
                size="lg"
                className="group"
                icon={<ChevronDown className="transition-transform group-hover:translate-y-1" />}
                iconPosition="right"
              >
                See Available Courts
              </Button>
              <Button
                motion
                variant="outline"
                size="lg"
                className="border-primary"
              >
                Learn About Pricing
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
