"use client";

import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";


interface MembershipBenefitItem {
    id: number;
    title: string;
    description: string;
}

export function MembershipBenefits() {
    const benefits: MembershipBenefitItem[] = [
        {
            id: 1,
            title: "Priority Court Booking",
            description: "Reserve courts up to 7 days in advance.",
        },
        {
            id: 2,
            title: "Discounted Rates",
            description: "Enjoy free or reduced court fees at affiliated venues.",
        },
        {
            id: 3,
            title: "Exclusive Events",
            description: "Access member-only tournaments, clinics, and socials.",
        },
        {
            id: 4,
            title: "Coaching Discounts",
            description: "Save on lessons with our certified instructors.",
        },
        {
            id: 5,
            title: "Community Access",
            description: "Join our WhatsApp group for updates and player meetups.",
        },
    ];

    const animatedListItems = benefits.map((item) => `${item.title}: ${item.description}`);

    return (
        <section className="py-20 bg-secondary">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        <span>Membership </span>
                        <span className="text-primary">Benefits</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-foreground/70">
                        Stay informed about the latest developments, announcements, and achievements from the Pickleball Association of Nagaland.
                    </p>
                </motion.div>

                <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {benefits.map((item, idx) => (
                        <motion.li
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.08 }}
                            className="bg-white dark:bg-background rounded-xl shadow-md p-6 flex flex-col gap-3 border border-border hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                {/* Icon selection based on benefit id */}
                                {item.id === 1 && <Calendar className="text-primary w-6 h-6" />}
                                {item.id === 2 && <Tag className="text-primary w-6 h-6" />}
                                {item.id === 3 && <User className="text-primary w-6 h-6" />}
                                {item.id === 4 && <ArrowRight className="text-primary w-6 h-6" />}
                                {item.id === 5 && <User className="text-primary w-6 h-6" />}
                                <span className="font-semibold text-lg text-foreground">{item.title}</span>
                            </div>
                            <p className="text-foreground/80 text-base">{item.description}</p>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
