"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event } from "@/types";
export function EventsSection() {
  // Sample upcoming events
  const events: Event[] = [{
    id: "1",
    title: "Kohima Open Tournament",
    date: "June 15, 2025",
    location: "City Sports Complex, Kohima",
    description: "Annual open tournament with categories for all skill levels.",
    image: "https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }, {
    id: "2",
    title: "Beginner's Clinic",
    date: "June 22, 2025",
    location: "NPA Training Center, Dimapur",
    description: "Learn the basics of pickleball in this 3-hour instructional clinic.",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }, {
    id: "3",
    title: "Mixed Doubles Night",
    date: "July 1, 2025",
    location: "Indoor Courts, Mokokchung",
    description: "Social play and friendly competition for mixed doubles teams.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }];
  return <section className="py-20 bg-secondary" data-unique-id="3fb6e0db-ca75-404b-9137-d6d3c57f19fa" data-file-name="components/home/events-section.tsx">
      <div className="container mx-auto px-6" data-unique-id="47f6a174-81d9-4cb0-83ce-9ca96ef252f5" data-file-name="components/home/events-section.tsx">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12" data-unique-id="e22ee540-dcf1-418d-bd4a-db8990246a4e" data-file-name="components/home/events-section.tsx">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }} data-unique-id="5c37f757-fe78-4ff9-8578-c8e0ae4b118c" data-file-name="components/home/events-section.tsx">
            <h2 className="text-3xl font-bold md:text-4xl" data-unique-id="6ea268cd-6a57-4d4e-945d-935d10dafc58" data-file-name="components/home/events-section.tsx"><span className="editable-text" data-unique-id="0ac1d882-f9be-4855-835c-f3c781f9b825" data-file-name="components/home/events-section.tsx">
              Upcoming </span><span className="text-primary" data-unique-id="29839a99-f654-4bfe-be7a-ed9cc35567d2" data-file-name="components/home/events-section.tsx"><span className="editable-text" data-unique-id="7f3eed7e-7ea3-4871-a322-f717a8e9fae4" data-file-name="components/home/events-section.tsx">Events</span></span>
            </h2>
            <p className="mt-2 text-foreground/70" data-unique-id="b42aea09-b786-47a2-a53b-f31b3b951346" data-file-name="components/home/events-section.tsx"><span className="editable-text" data-unique-id="ea95318b-4617-4cc6-a4c7-fcf022f7014e" data-file-name="components/home/events-section.tsx">
              Join us for tournaments, clinics, and social play
            </span></p>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} data-unique-id="10d551e1-43c5-4fb7-a1bd-16a5341db16f" data-file-name="components/home/events-section.tsx">
            <Link href="/updates" data-unique-id="b0b539a2-055a-4b1a-a862-23740697f8ad" data-file-name="components/home/events-section.tsx">
              <Button variant="outline" className="group" data-unique-id="feba5706-b0aa-4e2e-9822-2f95d44dedc9" data-file-name="components/home/events-section.tsx"><span className="editable-text" data-unique-id="bdfc7395-eaec-4654-bb31-83db65bbbc52" data-file-name="components/home/events-section.tsx">
                View All Events
                </span><ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-unique-id="df282b72-102f-4663-b4ff-8f6d12ec1b81" data-file-name="components/home/events-section.tsx" data-dynamic-text="true">
          {events.map((event, index) => <motion.div key={event.id} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true,
          margin: "-50px"
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} data-unique-id="c94f3535-bc0c-45f8-831a-8d04390f1ad8" data-file-name="components/home/events-section.tsx">
              <div className="card card-hover group h-full overflow-hidden" data-unique-id="fd6546ff-94b5-4b92-a1fa-b699d3a8ad64" data-file-name="components/home/events-section.tsx">
                <div className="relative h-48 w-full overflow-hidden" data-unique-id="cb55baf9-5524-4238-950d-1eb96f467f70" data-file-name="components/home/events-section.tsx">
                  <img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" data-unique-id="b3b261f3-7289-4d68-92e8-f02acc3f74a9" data-file-name="components/home/events-section.tsx" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4" data-unique-id="65b32f9e-f44f-4adc-9cdc-da7489087d3c" data-file-name="components/home/events-section.tsx">
                    <p className="text-sm font-medium text-white" data-unique-id="ecc19f9b-91b0-40b6-ba20-fdbd68df565f" data-file-name="components/home/events-section.tsx" data-dynamic-text="true">
                      {event.date}
                    </p>
                  </div>
                </div>
                <div className="p-6" data-unique-id="cb9bec47-1b2d-4396-a8b5-34012243641a" data-file-name="components/home/events-section.tsx">
                  <h3 className="mb-2 text-xl font-semibold" data-unique-id="7c7d7e82-d4f7-40da-9c18-dff0a585ac5e" data-file-name="components/home/events-section.tsx" data-dynamic-text="true">{event.title}</h3>
                  <p className="mb-3 text-sm text-foreground/70" data-unique-id="1320ef4f-df9a-4ec5-94cf-dcee43074624" data-file-name="components/home/events-section.tsx" data-dynamic-text="true">
                    {event.location}
                  </p>
                  <p className="mb-4 text-foreground/80" data-unique-id="d8c1107b-7b2c-4276-9967-f448a50aa524" data-file-name="components/home/events-section.tsx" data-dynamic-text="true">
                    {event.description}
                  </p>
                  <Link href={`/updates/${event.id}`} data-unique-id="58be0642-154e-4d4a-acdd-afe7781402fa" data-file-name="components/home/events-section.tsx">
                    <Button variant="ghost" className="mt-2 text-primary group" data-unique-id="2281b8a1-b491-43c7-b7b1-e377e3aede47" data-file-name="components/home/events-section.tsx"><span className="editable-text" data-unique-id="f1946086-2cf1-4f4a-b212-0b1b6034dae6" data-file-name="components/home/events-section.tsx">
                      Learn More
                      </span><ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" data-unique-id="886aa7b4-2701-4e4e-a742-173dbf6d69dc" data-file-name="components/home/events-section.tsx" data-dynamic-text="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
}