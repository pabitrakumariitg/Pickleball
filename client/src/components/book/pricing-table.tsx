"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
interface PricingTier {
  name: string;
  hourlyRate: number;
  memberRate: number;
  features: string[];
  isPopular?: boolean;
}
export function PricingTable() {
  const pricingTiers: PricingTier[] = [{
    name: "Indoor Courts",
    hourlyRate: 300,
    memberRate: 200,
    features: ["Climate controlled environment", "Professional flooring", "Lighting for evening play", "Changing rooms and lockers", "Equipment rental available", "Coaching available on request"],
    isPopular: true
  }, {
    name: "Outdoor Courts",
    hourlyRate: 200,
    memberRate: 120,
    features: ["Natural lighting", "Professional court surface", "Shaded viewing areas", "Water stations", "Equipment rental available", "Free parking"]
  }];
  return <section className="py-20 bg-background" data-unique-id="d5efa992-d8b0-47d2-99f2-c9242d04869d" data-file-name="components/book/pricing-table.tsx">
      <div className="container mx-auto px-6" data-unique-id="1444b6d8-e48d-45a1-9971-b2d5f980ffdb" data-file-name="components/book/pricing-table.tsx">
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
      }} className="mb-12 text-center" data-unique-id="8ad358bc-2023-499b-bbb3-d3697bb3fd0d" data-file-name="components/book/pricing-table.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="61707054-3d60-4123-810c-ad7044e261cf" data-file-name="components/book/pricing-table.tsx">
            <span className="editable-text" data-unique-id="96d43565-a051-47f6-9814-9c7cf443e839" data-file-name="components/book/pricing-table.tsx">Court </span>
            <span className="text-primary" data-unique-id="ad068879-e68d-4701-b43c-a9e80adc2c1b" data-file-name="components/book/pricing-table.tsx"><span className="editable-text" data-unique-id="94198eae-6829-4515-bd77-5ebfc2e044d5" data-file-name="components/book/pricing-table.tsx">Pricing</span></span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="05f9f938-eaf6-4e48-97a7-085809380f28" data-file-name="components/book/pricing-table.tsx">
            <span className="editable-text" data-unique-id="bd44bc77-5ac2-41ef-89dc-5214b2efec14" data-file-name="components/book/pricing-table.tsx">
              Our transparent pricing structure ensures you know exactly what to expect.
              Members enjoy special discounted rates on all court bookings.
            </span>
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2" data-unique-id="1e2a6bc2-a4b2-4d4e-9864-c73c7045fcea" data-file-name="components/book/pricing-table.tsx" data-dynamic-text="true">
          {pricingTiers.map((tier, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.2
        }} data-unique-id="134bffa5-fb6c-4e85-bb82-1bc16fded18d" data-file-name="components/book/pricing-table.tsx">
              <div className={`card h-full border ${tier.isPopular ? "border-primary/30 shadow-lg shadow-primary/10" : "border-border"}`} data-unique-id="467afafc-7e35-4477-a355-68313864579b" data-file-name="components/book/pricing-table.tsx" data-dynamic-text="true">
                {tier.isPopular && <div className="absolute -right-3 top-6 rotate-45 bg-primary px-8 py-1 text-center text-xs font-semibold text-primary-foreground" data-unique-id="b110162c-5967-4172-9119-72b9c82a200e" data-file-name="components/book/pricing-table.tsx">
                    <span className="editable-text" data-unique-id="7ea378d9-a06d-4ad6-b171-77cb08b2ccb5" data-file-name="components/book/pricing-table.tsx">Popular</span>
                  </div>}
                
                <div className="p-6" data-unique-id="c02f785c-57e9-4422-8b26-cba6e10669ca" data-file-name="components/book/pricing-table.tsx">
                  <h3 className="mb-2 text-xl font-semibold" data-unique-id="6e3b41de-88c5-4a0b-8397-9d7061192edc" data-file-name="components/book/pricing-table.tsx" data-dynamic-text="true">{tier.name}</h3>
                  
                  <div className="mb-6 flex items-baseline" data-unique-id="d315b00d-b5b0-45a1-8255-ad7d78fad3a1" data-file-name="components/book/pricing-table.tsx">
                    <span className="text-4xl font-bold" data-unique-id="ae9f800c-7cc6-4ca0-8a0a-6724db50d8a8" data-file-name="components/book/pricing-table.tsx" data-dynamic-text="true"><span className="editable-text" data-unique-id="cd8ab250-67de-46cd-b27a-8fbb87ff1b50" data-file-name="components/book/pricing-table.tsx">₹</span>{tier.hourlyRate}</span>
                    <span className="ml-1 text-sm text-foreground/70" data-unique-id="8406f317-3972-4016-a1ff-4c00201fb92e" data-file-name="components/book/pricing-table.tsx">
                      <span className="editable-text" data-unique-id="cc2053fe-a0ca-41cf-969c-e30168656d96" data-file-name="components/book/pricing-table.tsx">/hour</span>
                    </span>
                  </div>
                  
                  <div className="mb-4 rounded-md bg-secondary p-3 text-sm" data-unique-id="a4dde9e4-3243-4176-a8db-26b00785c421" data-file-name="components/book/pricing-table.tsx" data-dynamic-text="true">
                    <span className="font-medium text-primary" data-unique-id="4abe6207-1d34-4e58-9f3f-dbec598f6716" data-file-name="components/book/pricing-table.tsx"><span className="editable-text" data-unique-id="50dd7f32-5957-471f-85ac-4ddb9d0bc43f" data-file-name="components/book/pricing-table.tsx">Members pay: </span></span><span className="editable-text" data-unique-id="254212d1-cfba-47f0-99c5-96dd11c710f4" data-file-name="components/book/pricing-table.tsx">
                    ₹</span>{tier.memberRate}<span className="editable-text" data-unique-id="ee6d6585-8c4c-41c9-8ccf-c9498014306c" data-file-name="components/book/pricing-table.tsx">/hour
                  </span></div>
                  
                  <ul className="mb-6 space-y-3" data-unique-id="a1902be4-90ca-4549-8e83-678473d1e407" data-file-name="components/book/pricing-table.tsx" data-dynamic-text="true">
                    {tier.features.map((feature, i) => <li key={i} className="flex items-start" data-unique-id="7bea0815-5eba-4e8b-9e3b-d51cb4f05d09" data-file-name="components/book/pricing-table.tsx">
                        <Check className="mr-2 h-5 w-5 shrink-0 text-primary" data-unique-id="464e0159-5ad5-462e-a7d9-a48ada0dd329" data-file-name="components/book/pricing-table.tsx" data-dynamic-text="true" />
                        <span className="text-sm" data-unique-id="1063f110-80bc-4292-a1e7-84a483c6783c" data-file-name="components/book/pricing-table.tsx" data-dynamic-text="true">{feature}</span>
                      </li>)}
                  </ul>
                </div>
              </div>
            </motion.div>)}
        </div>
        
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.4
      }} className="mt-12 rounded-lg bg-muted p-6" data-unique-id="8cba9abe-684a-4006-b69a-976cbe6f6f76" data-file-name="components/book/pricing-table.tsx">
          <h3 className="mb-4 text-center text-xl font-semibold" data-unique-id="fc87c681-2aa0-4d48-901d-8a53377f0d8f" data-file-name="components/book/pricing-table.tsx">
            <span className="editable-text" data-unique-id="778bb0f8-5636-41dc-997c-70ec91cd1ded" data-file-name="components/book/pricing-table.tsx">Additional Information</span>
          </h3>
          
          <div className="grid gap-6 md:grid-cols-3" data-unique-id="eb65ce47-1666-4cc0-9649-4cad4479a60b" data-file-name="components/book/pricing-table.tsx">
            <div className="rounded-lg bg-card p-4 shadow-sm" data-unique-id="663cd3af-17d7-46db-9fbe-f8ce7f072b2b" data-file-name="components/book/pricing-table.tsx">
              <h4 className="mb-2 font-medium" data-unique-id="af9a988b-5560-48dd-8867-9965675cf1f5" data-file-name="components/book/pricing-table.tsx"><span className="editable-text" data-unique-id="344465f6-341c-4d10-bbea-eb5f7ecf270b" data-file-name="components/book/pricing-table.tsx">Peak Hours</span></h4>
              <p className="text-sm text-foreground/70" data-unique-id="8247042a-d566-44ce-873f-fa86816bd606" data-file-name="components/book/pricing-table.tsx">
                <span className="editable-text" data-unique-id="52951a01-aae7-4696-8c9f-f15833a580a7" data-file-name="components/book/pricing-table.tsx">
                  Weekdays 5PM-9PM and weekends may have higher demand.
                  Book in advance to secure your preferred time.
                </span>
              </p>
            </div>
            
            <div className="rounded-lg bg-card p-4 shadow-sm" data-unique-id="a33db2bc-ceaf-42d9-83b3-6818cfc4df5e" data-file-name="components/book/pricing-table.tsx">
              <h4 className="mb-2 font-medium" data-unique-id="49cce778-01a3-42a3-890d-974dbca4e645" data-file-name="components/book/pricing-table.tsx"><span className="editable-text" data-unique-id="2b506b1d-7a3e-40bb-9761-b27a3bf72f29" data-file-name="components/book/pricing-table.tsx">Cancellation Policy</span></h4>
              <p className="text-sm text-foreground/70" data-unique-id="5d2e16b2-4923-46ef-9813-b307b63b3ed3" data-file-name="components/book/pricing-table.tsx">
                <span className="editable-text" data-unique-id="be86bb81-e80d-4aa0-b0a5-8307a9eaa185" data-file-name="components/book/pricing-table.tsx">
                  Free cancellation up to 24 hours before your booking.
                  Late cancellations incur a 50% fee.
                </span>
              </p>
            </div>
            
            <div className="rounded-lg bg-card p-4 shadow-sm" data-unique-id="9e7de80a-b28b-4ff0-8f76-776a267304f6" data-file-name="components/book/pricing-table.tsx">
              <h4 className="mb-2 font-medium" data-unique-id="58997f62-091e-4289-afa8-acea156fe3d9" data-file-name="components/book/pricing-table.tsx"><span className="editable-text" data-unique-id="a64df278-fcf2-4602-8ae4-3304451acfcf" data-file-name="components/book/pricing-table.tsx">Equipment Rental</span></h4>
              <p className="text-sm text-foreground/70" data-unique-id="e1eaeee9-1495-46fe-8d14-a962b0924181" data-file-name="components/book/pricing-table.tsx">
                <span className="editable-text" data-unique-id="c1a26793-26fd-416b-926b-62172e53a497" data-file-name="components/book/pricing-table.tsx">
                  Paddles: ₹50/hour
                  Balls: ₹20/hour
                  Full set: ₹60/hour
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>;
}