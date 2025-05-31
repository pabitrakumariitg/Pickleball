"use client";

import { motion } from "framer-motion";
import { Search, Calendar, CreditCard, CheckCircle } from "lucide-react";
interface Step {
  icon: JSX.Element;
  title: string;
  description: string;
}
export function BookingGuide() {
  const steps: Step[] = [{
    icon: <Search className="h-8 w-8 text-primary" />,
    title: "Choose Venue",
    description: "Browse our list of pickleball courts across Nagaland and select your preferred location."
  }, {
    icon: <Calendar className="h-8 w-8 text-primary" data-unique-id="260596c9-663b-42f9-883f-3ead235475c8" data-file-name="components/book/booking-guide.tsx" />,
    title: "Pick Time",
    description: "Select an available date and time slot that works with your schedule."
  }, {
    icon: <CreditCard className="h-8 w-8 text-primary" />,
    title: "Confirm & Pay",
    description: "Complete your booking by making a secure online payment or pay at the venue."
  }, {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "Play!",
    description: "Arrive 10 minutes before your scheduled time and enjoy your game."
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
  return <section className="py-20 bg-background" data-unique-id="7f9e369f-5ea9-47a3-95e9-5bc004797476" data-file-name="components/book/booking-guide.tsx">
      <div className="container mx-auto px-6" data-unique-id="15588609-ce9e-4733-acfd-71011eb15602" data-file-name="components/book/booking-guide.tsx">
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
      }} className="mb-16 text-center" data-unique-id="71fae1fa-23e4-4f9d-a613-01b7aec4af22" data-file-name="components/book/booking-guide.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="52494c9e-0705-493f-aa02-4ca72a4f9703" data-file-name="components/book/booking-guide.tsx"><span className="editable-text" data-unique-id="c50367a1-17a4-44bb-8103-46b27dc4fcd7" data-file-name="components/book/booking-guide.tsx">
            How to </span><span className="text-primary" data-unique-id="29c9441e-2d65-4195-8241-1c1a4d73525d" data-file-name="components/book/booking-guide.tsx"><span className="editable-text" data-unique-id="bfb5d702-42a4-4660-95d3-bfb11cb453ea" data-file-name="components/book/booking-guide.tsx">Book</span></span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="9e46a7f5-8463-442c-b483-e786667858a8" data-file-name="components/book/booking-guide.tsx"><span className="editable-text" data-unique-id="8a87d7d3-354f-48b5-83f2-007eeb946c3c" data-file-name="components/book/booking-guide.tsx">
            Booking a pickleball court is simple. Just follow these easy steps to
            reserve your spot.
          </span></p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true
      }} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" data-unique-id="651e09f5-d6b8-43b2-b557-8dbc1522fe91" data-file-name="components/book/booking-guide.tsx" data-dynamic-text="true">
          {steps.map((step, index) => <motion.div key={index} variants={itemVariants} className="relative" data-unique-id="69a27721-16dd-44d6-890a-451c9bf50a1d" data-file-name="components/book/booking-guide.tsx" data-dynamic-text="true">
              <div className="card h-full border border-border p-6 text-center" data-unique-id="282f43b7-fb19-4015-a329-6ddd0d8cf243" data-file-name="components/book/booking-guide.tsx" data-dynamic-text="true">
                {/* Step number indicator */}
                <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold" data-unique-id="912c1d3c-221f-4e74-b7fe-72459ed7cf46" data-file-name="components/book/booking-guide.tsx" data-dynamic-text="true">
                  {index + 1}
                </div>
                
                <div className="mb-4 flex justify-center" data-unique-id="e7800d7e-1508-432c-a1fd-f8d216a5ecfc" data-file-name="components/book/booking-guide.tsx">
                  <div className="rounded-full bg-primary/10 p-4" data-unique-id="838e04b8-784a-4795-a7f1-3072a1f7f7f1" data-file-name="components/book/booking-guide.tsx" data-dynamic-text="true">
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="mb-2 text-xl font-semibold" data-unique-id="5d8bf403-a22a-400c-b8a8-8f54ca237197" data-file-name="components/book/booking-guide.tsx" data-dynamic-text="true">{step.title}</h3>
                <p className="text-foreground/70" data-unique-id="fbf14e2f-8e5f-49ae-bc97-fad98c8ba766" data-file-name="components/book/booking-guide.tsx" data-dynamic-text="true">{step.description}</p>
              </div>

              {/* Connector line for all but last item */}
              {index < steps.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-primary/30 z-10" data-unique-id="e37fc92e-8255-4e10-a5b0-d4ac39610f25" data-file-name="components/book/booking-guide.tsx"></div>}
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
}