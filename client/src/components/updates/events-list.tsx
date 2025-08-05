"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export function EventsList() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Hardcoded featured event
  const event = {
    id: "101",
    title: "Kohima Open Tournament 2025",
    date: "2025-08-16",
    time: "9:00 AM",
    location: "Akim Astro Turf Arena, Kohima",
    description:
      "Perfect for beginners! Learn the basics of pickleball in a friendly, supportive environment.",
    image:
      "https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  };

  return (
    <section id="upcoming-events" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Upcoming <span className="text-primary">Events</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70">
            Join us for tournaments, clinics, and social play across Nagaland.
            Pre-registration is recommended for most events.
          </p>
        </motion.div>

        {/* Single Featured Event */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants}>
            <div className="rounded-xl overflow-hidden shadow-lg border border-border bg-card transition-transform duration-300 hover:scale-[1.01]">
              {/* Image Banner */}
              <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-sm sm:text-base font-medium text-white">
                    {formatDate(event.date)} at {event.time}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="p-8 space-y-4">
                <h3 className="text-3xl font-bold">{event.title}</h3>
                <div className="flex items-center text-foreground/70 text-base">
                  <MapPin className="mr-2 h-5 w-5" />
                  {event.location}
                </div>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {event.description}
                </p>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row justify-start gap-4">
                  <Link
                    href={`/updates/events/register?eventId=${event.id}&eventName=${encodeURIComponent(
                      event.title
                    )}&eventDate=${encodeURIComponent(
                      formatDate(event.date)
                    )}&eventLocation=${encodeURIComponent(event.location)}`}
                  >
                    <Button variant="outline" size="lg">
                      Register Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* View Full Calendar Button */}
        {/* <div className="mt-12 text-center">
          <Button variant="primary" size="lg">
            <Calendar className="mr-2 h-4 w-4" />
            View Full Calendar
          </Button>
        </div> */}
      </div>
    </section>
  );
}
