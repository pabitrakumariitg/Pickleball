"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MembershipTier } from "@/types";
import { cn } from "@/lib/utils";

interface PricingSectionProps {
  onSelectPlan?: (tier: MembershipTier) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const membershipTiers: MembershipTier[] = [{
    id: "individual",
    name: "Individual (Annual)",
    price: billingCycle === "monthly" ? 0 : 2000, // Only annual available
    benefits: ["Perfect for solo players.", "Unlimited court access during regular hours", "10% discount on equipment purchases", "Access to members-only events", "Online court booking", "Monthly newsletter"],
    isPopular: false
  }, {
    id: "family",
    name: "Family (Annual)",
    price: billingCycle === "monthly" ? 0 : 4500, // Only annual available
    benefits: ["Covers up to 4 family members.", "Unlimited court access during regular hours", "15% discount on equipment purchases", "Access to members-only events", "Priority court booking", "Monthly newsletter", "Free guest passes (2 per month)"],
    isPopular: true
  }, {
    id: "junior",
    name: "Junior (Under 18)",
    price: billingCycle === "monthly" ? 0 : 1000, // Only annual available
    benefits: ["Encouraging young talent.", "For players under 18 years", "Unlimited court access during regular hours", "5% discount on equipment purchases", "Access to junior training programs", "Monthly newsletter"],
    isPopular: false
  }, {
    id: "visitor",
    name: "Visitor Pass",
    price: billingCycle === "monthly" ? 500 : 500, // Only monthly available
    benefits: ["Try us out for 30 days!", "30-day access to all facilities", "No long-term commitment", "Access to open play sessions", "Equipment rental included"],
    isPopular: false
  }];

  const handleSelectPlan = (tier: MembershipTier) => {
    if (onSelectPlan) {
      onSelectPlan(tier);
    }
  };

  // Animation variants
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
  const toggleVariants = {
    monthly: {
      x: 0
    },
    annual: {
      x: 28
    }
  };
  return <section className="py-20 bg-background" data-section="pricing" data-unique-id="73d02262-d6cc-4d35-9543-846bd0c9386f" data-file-name="components/membership/pricing-section.tsx">
    <div className="container mx-auto px-6" data-unique-id="b4c9f826-53a2-41e0-aa2a-5bb4e6f6ac9b" data-file-name="components/membership/pricing-section.tsx" data-dynamic-text="true">
      <div className="mb-16 text-center" data-unique-id="174e450b-d5f5-4c3b-ac38-08dacb332a14" data-file-name="components/membership/pricing-section.tsx" data-dynamic-text="true">
        <motion.h2 initial={{
          opacity: 0,
          y: -20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }} className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="eed8a131-a64a-4c2e-99cf-34a0fd88586b" data-file-name="components/membership/pricing-section.tsx"><span className="editable-text" data-unique-id="c85e3689-2175-4c61-ab4f-c466816de61e" data-file-name="components/membership/pricing-section.tsx">
            Choose Your </span><span className="text-primary" data-unique-id="0340a4f7-084e-48de-8ac6-f07f45629d63" data-file-name="components/membership/pricing-section.tsx"><span className="editable-text" data-unique-id="bee2f886-f32d-458b-8881-ca92ed9de5d7" data-file-name="components/membership/pricing-section.tsx">Membership</span></span>
        </motion.h2>
        <motion.p initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="995ea4bf-a57a-4e96-a1b0-255e41efaf87" data-file-name="components/membership/pricing-section.tsx"><span className="editable-text" data-unique-id="56b6dafe-c864-4b87-8d8e-5a810edf9e9c" data-file-name="components/membership/pricing-section.tsx">
            Select the plan that best fits your needs. All memberships include access to our courts and community events.
          </span></motion.p>

        {/* Billing toggle */}
        <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="mt-8 flex items-center justify-center" data-unique-id="9e0038da-84c8-477d-bee7-eaa03be22853" data-file-name="components/membership/pricing-section.tsx">
          <span className={cn("mr-3 text-sm font-medium", billingCycle === "monthly" ? "text-foreground" : "text-foreground/60")} data-unique-id="48e640eb-b6eb-4292-b2b5-92ffd5b48228" data-file-name="components/membership/pricing-section.tsx"><span className="editable-text" data-unique-id="0841eb80-c2e9-48f7-a0c5-7506d923fee8" data-file-name="components/membership/pricing-section.tsx">
            Monthly
          </span></span>

          <button onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")} className="relative h-6 w-12 rounded-full bg-primary/20 p-1" aria-label={`Switch to ${billingCycle === "monthly" ? "annual" : "monthly"} billing`} data-unique-id="150f2d6a-2ebf-4aa8-b764-c261167bd35d" data-file-name="components/membership/pricing-section.tsx">
            <motion.div className="h-4 w-4 rounded-full bg-primary" variants={toggleVariants} animate={billingCycle} transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }} data-unique-id="848106d8-dd9f-4edb-8df1-272b1450fc11" data-file-name="components/membership/pricing-section.tsx" />
          </button>

          <span className={cn("ml-3 text-sm font-medium", billingCycle === "annual" ? "text-foreground" : "text-foreground/60")} data-unique-id="7c7e99b1-ce8f-49c9-b207-27fad5739010" data-file-name="components/membership/pricing-section.tsx"><span className="editable-text" data-unique-id="f70ceb67-42fe-46b8-8e04-8f2d7cf747cb" data-file-name="components/membership/pricing-section.tsx">
            Annual </span><span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent" data-unique-id="54f25b84-4232-4952-8ca8-7f82810c192b" data-file-name="components/membership/pricing-section.tsx"><span className="editable-text" data-unique-id="bd720e3f-103d-4989-a1a4-18d7b490241b" data-file-name="components/membership/pricing-section.tsx">Save 15%</span></span>
          </span>
        </motion.div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: "-100px"
      }} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" data-unique-id="ccf4bf60-3b94-4acc-93c9-33dceeac5763" data-file-name="components/membership/pricing-section.tsx" data-dynamic-text="true">
        {membershipTiers.map(tier => <motion.div key={tier.id} variants={itemVariants} className="relative" data-unique-id="8c07343f-69ca-48e7-b85b-e73c2974fc4c" data-file-name="components/membership/pricing-section.tsx">
          <AnimatePresence mode="wait">
            <motion.div key={`${tier.id}-${billingCycle}`} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -10
            }} transition={{
              duration: 0.3
            }} className={cn("card h-full overflow-hidden border", tier.isPopular ? "border-primary/30 shadow-lg shadow-primary/10" : "border-border")} data-unique-id="9f6cfc3b-5f46-4c72-965a-38486b36eb9a" data-file-name="components/membership/pricing-section.tsx" data-dynamic-text="true">
              {tier.isPopular && <div className="absolute -right-12 top-6 rotate-45 bg-primary px-12 py-1 text-center text-xs font-semibold text-primary-foreground" data-unique-id="d069e1d9-9610-47f3-a7ac-70503496417e" data-file-name="components/membership/pricing-section.tsx"><span className="editable-text" data-unique-id="be335939-61f5-4f4b-8e15-0e5032eeb492" data-file-name="components/membership/pricing-section.tsx">
                Most Popular
              </span></div>}

              <div className="p-6" data-unique-id="84ff2d63-8a99-47af-9ae6-78a5d17d1416" data-file-name="components/membership/pricing-section.tsx" data-dynamic-text="true">
                <h3 className="mb-2 text-xl font-semibold" data-unique-id="8c9b9b65-a0a8-42a6-b639-67cf113c1402" data-file-name="components/membership/pricing-section.tsx" data-dynamic-text="true">{tier.name}</h3>

                <div className="mb-6 flex items-baseline" data-unique-id="15421707-94e3-429c-b6ec-bab1ab251d3b" data-file-name="components/membership/pricing-section.tsx" data-dynamic-text="true">
                  <span className="text-4xl font-bold" data-unique-id="9043338d-4d31-44d7-93f3-b4d196b1759f" data-file-name="components/membership/pricing-section.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="5c859a52-300e-4c03-9803-9d57dd61dbc4" data-file-name="components/membership/pricing-section.tsx">₹</span>{tier.price}</span>
                  {tier.id === "visitor"
                    ? <span className="ml-1 text-sm text-foreground/70">/month</span>
                    : <span className="ml-1 text-sm text-foreground/70">/year</span>
                  }
                </div>

                {(tier.id === "visitor" && billingCycle === "monthly") || (tier.id !== "visitor" && billingCycle === "annual") ? (
                  <Button 
                    variant={tier.isPopular ? "primary" : "outline"} 
                    className="mb-6 w-full" 
                    motion
                    onClick={() => handleSelectPlan(tier)}
                  >
                    Get Started
                  </Button>
                ) : (
                  <div className="mb-6 rounded-md bg-muted p-2 text-center text-sm">
                    {tier.id === "visitor"
                      ? "Available as monthly only"
                      : "Available as annual only"
                    }
                  </div>
                )}

                <ul className="space-y-3" data-unique-id="3a48cb42-3594-47e9-983c-5928fe6d2c65" data-file-name="components/membership/pricing-section.tsx" data-dynamic-text="true">
                  {tier.benefits.map((benefit, index) => <li key={index} className="flex items-start" data-unique-id="5bbd2cf9-ed1e-4fae-80a0-a9215d13e82b" data-file-name="components/membership/pricing-section.tsx">
                    <Check className="mr-2 h-5 w-5 shrink-0 text-primary" data-unique-id="7349699b-6769-401c-b1ef-a290ccec761a" data-file-name="components/membership/pricing-section.tsx" data-dynamic-text="true" />
                    <span className="text-sm" data-unique-id="cf28b1f6-70e3-48b3-b225-47321e1b18df" data-file-name="components/membership/pricing-section.tsx" data-dynamic-text="true">{benefit}</span>
                  </li>)}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>)}
      </motion.div>


    </div>
  </section>;
}