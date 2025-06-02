"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface PricingTier {
  name: string;
  hourlyRate: string;
  features: string[];
  isPopular?: boolean;
}

export function PricingTable() {
  const pricingTiers: PricingTier[] = [
    {
      name: "Members",
      hourlyRate: "Free or Discounted",
      features: [
        "Climate controlled environment",
        "Professional flooring",
        "Lighting for evening play",
        "Changing rooms and lockers",
        "Equipment rental available",
        "Coaching available on request",
      ],
      isPopular: true,
    },
    {
      name: "Non-Members",
      hourlyRate: "₹200 -₹500/hour",
      features: [
        "Natural lighting",
        "Professional court surface",
        "Shaded viewing areas",
        "Water stations",
        "Equipment rental available",
        "Free parking",
      ],
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Court <span className="text-primary">Pricing</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70">
            Our transparent pricing structure ensures you know exactly what to expect.
            Members enjoy special discounted rates on all court bookings.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div
                className={`relative card h-full border ${
                  tier.isPopular ? "border-primary/30 shadow-lg shadow-primary/10" : "border-border"
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -right-3 top-6 rotate-45 bg-primary px-8 py-1 text-center text-xs font-semibold text-primary-foreground">
                    Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{tier.name}</h3>

                  <div className="mb-6 flex items-baseline">
                    <span className="text-4xl font-bold">
                      {tier.name === "Non-Members" }
                      {tier.hourlyRate}
                    </span>
                    
                  </div>

                  {/* <ul className="mb-6 space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="mr-2 h-5 w-5 shrink-0 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
