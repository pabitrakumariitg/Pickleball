"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event } from "@/types";
import { formatDate } from "@/lib/utils";
export function EventsList() {
  // Sample upcoming events
  const events: Event[] = [{
    id: "1",
    title: "Kohima Open Tournament",
    date: "2025-06-15",
    location: "City Sports Complex, Kohima",
    description: "Annual open tournament with categories for all skill levels. Join us for a weekend of competitive play and community building.",
    image: "https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }, {
    id: "2",
    title: "Beginner's Clinic",
    date: "2025-06-22",
    location: "PAN Training Center, Dimapur",
    description: "Learn the basics of pickleball in this 3-hour instructional clinic. Equipment provided. Perfect for those new to the sport.",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }, {
    id: "3",
    title: "Mixed Doubles Night",
    date: "2025-07-01",
    location: "Indoor Courts, Mokokchung",
    description: "Social play and friendly competition for mixed doubles teams. All skill levels welcome. Refreshments provided.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }, {
    id: "4",
    title: "Youth Summer Camp",
    date: "2025-07-10",
    location: "Community Center, Wokha",
    description: "Five-day camp for young players ages 8-16. Learn skills, strategy, and sportsmanship in a fun, supportive environment.",
    image: "https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }, {
    id: "5",
    title: "Seniors Tournament",
    date: "2025-07-20",
    location: "Kohima Sports Complex",
    description: "Special tournament for players 55+. Singles and doubles divisions available. Experience the joy of competition with your peers.",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }, {
    id: "6",
    title: "Nagaland State Championships",
    date: "2025-08-15",
    location: "State Indoor Stadium, Dimapur",
    description: "The premier pickleball event in Nagaland. Three days of competition across all divisions. Registration required by August 1.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }];
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
  return <section id="upcoming-events" className="py-20 bg-background" data-unique-id="7a940c37-d23f-4b8b-9a89-2cb752297dee" data-file-name="components/updates/events-list.tsx">
      <div className="container mx-auto px-6" data-unique-id="cdb82d1c-67b9-4596-a1a1-80f894d559b8" data-file-name="components/updates/events-list.tsx">
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
      }} className="mb-12 text-center" data-unique-id="7d5dde39-a527-40a6-8429-6ccb406ea137" data-file-name="components/updates/events-list.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="6e051f5a-7b0b-4ca9-a79a-5add3898e571" data-file-name="components/updates/events-list.tsx">
            <span className="editable-text" data-unique-id="04888abe-5777-429a-b774-7a35d7b79d8f" data-file-name="components/updates/events-list.tsx">Upcoming </span>
            <span className="text-primary" data-unique-id="0a6eee9d-9174-4b6d-a884-70262cb95bba" data-file-name="components/updates/events-list.tsx">
              <span className="editable-text" data-unique-id="4f2dffb9-8ae7-4a7c-a500-9a89ab49e7db" data-file-name="components/updates/events-list.tsx">Events</span>
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="2296f344-9d6b-43a1-b528-e6ce98b37129" data-file-name="components/updates/events-list.tsx">
            <span className="editable-text" data-unique-id="4dd7bf4a-0074-4503-b72b-ea22dadb66b4" data-file-name="components/updates/events-list.tsx">
              Join us for tournaments, clinics, and social play across Nagaland. 
              Pre-registration is recommended for most events.
            </span>
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true
      }} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-unique-id="e13e6ca7-70f4-4eb6-8048-0e8b9d161dc9" data-file-name="components/updates/events-list.tsx" data-dynamic-text="true">
          {events.map(event => <motion.div key={event.id} variants={itemVariants} data-unique-id="f3a37e11-d558-45e0-bef6-f6d60971e786" data-file-name="components/updates/events-list.tsx">
              <div className="card card-hover group h-full overflow-hidden" data-unique-id="525d143c-18be-41e7-8e10-f886e707f5ac" data-file-name="components/updates/events-list.tsx">
                <div className="relative h-48 w-full overflow-hidden" data-unique-id="8d9756b2-adce-4ec5-9f43-36364bfd9af8" data-file-name="components/updates/events-list.tsx">
                  <img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" data-unique-id="e9ff04a7-66ce-49cd-8b40-a36ae0103f9c" data-file-name="components/updates/events-list.tsx" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4" data-unique-id="a2f4c01c-a35c-4fcd-b85e-354375305d8a" data-file-name="components/updates/events-list.tsx">
                    <p className="text-sm font-medium text-white" data-unique-id="388ec19e-0568-487f-845c-2884b6370a3e" data-file-name="components/updates/events-list.tsx" data-dynamic-text="true">
                      {formatDate(event.date)}
                    </p>
                  </div>
                </div>
                <div className="p-6" data-unique-id="9caea7a5-6c69-42de-960c-7cb45761977c" data-file-name="components/updates/events-list.tsx">
                  <h3 className="mb-2 text-xl font-semibold" data-unique-id="8036f0b5-66b0-4e33-a870-bb41a6e9aa80" data-file-name="components/updates/events-list.tsx" data-dynamic-text="true">{event.title}</h3>
                  <div className="mb-3 flex items-center text-sm text-foreground/70" data-unique-id="1f1a3552-5a4d-4292-b29e-18ad168e2cea" data-file-name="components/updates/events-list.tsx" data-dynamic-text="true">
                    <MapPin className="mr-1 h-4 w-4" />
                    {event.location}
                  </div>
                  <p className="mb-4 text-foreground/80" data-unique-id="ad9d4aaa-0106-4858-962a-884d91e1b02d" data-file-name="components/updates/events-list.tsx" data-dynamic-text="true">{event.description}</p>
                  <div className="mt-auto flex justify-between items-center" data-unique-id="0f62d6fb-521c-41d0-80d4-021bae5470f4" data-file-name="components/updates/events-list.tsx">
                    <Link href={`/updates/events/${event.id}`} data-unique-id="a69f6f8a-29bc-4c5e-af6e-d74f31e3e195" data-file-name="components/updates/events-list.tsx">
                      <Button variant="ghost" className="text-primary group" data-unique-id="164c26f0-473e-4a2e-b19f-1faed1a0faa4" data-file-name="components/updates/events-list.tsx">
                        <span className="editable-text" data-unique-id="79954048-16ad-483b-8dd5-66cc2548ddde" data-file-name="components/updates/events-list.tsx">Learn More</span>
                        <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm" data-unique-id="c75a94e9-da96-4368-a795-58e2782da4d6" data-file-name="components/updates/events-list.tsx">
                      <span className="editable-text" data-unique-id="9a9dd01f-411e-487f-8e06-3c5924c31e12" data-file-name="components/updates/events-list.tsx">Register</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>)}
        </motion.div>

        <div className="mt-12 text-center" data-unique-id="c82dc177-b329-4555-89b5-55c0db98282c" data-file-name="components/updates/events-list.tsx">
          <Button variant="primary" size="lg" motion data-unique-id="4f58c26b-89fb-4294-81a4-facb0693c3f6" data-file-name="components/updates/events-list.tsx">
            <Calendar className="mr-2 h-4 w-4" data-unique-id="e1d770c1-52fd-4110-ae03-3c4f730dddbc" data-file-name="components/updates/events-list.tsx" />
            <span className="editable-text" data-unique-id="e6e44d75-12bb-492d-9b83-7ee8329fbee3" data-file-name="components/updates/events-list.tsx">View Full Calendar</span>
          </Button>
        </div>
      </div>
    </section>;
}