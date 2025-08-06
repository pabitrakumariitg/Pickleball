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
    const highlights: MembershipBenefitItem[] = [
        {
            id: 1,
            title: "Mandatory Registration",
            description: "Required for participation in all NPA-organized tournaments and events."
        },
        {
            id: 2,
            title: "State Ranking Portal Entry",
            description: "Grants access to the Nagaland State Ranking Portal, tracking performance and ranks."
        },
        {
            id: 3,
            title: "1-Year Validity",
            description: "Registration is valid for 1 year from the date of approval."
        },
        {
            id: 4,
            title: "State Team Selection Gateway",
            description: "Registered players are eligible for official Nagaland State Pickleball Team selection."
        },
        {
            id: 5,
            title: "National & International Pathways",
            description: "Potential for national and international representation through recognized selection."
        },
        {
            id: 6,
            title: "Exclusive Player Benefits",
            description: "Access to training camps, early-bird tournament entries, and partner discounts."
        }
    ];

    const eligibility: MembershipBenefitItem[] = [
        {
            id: 7,
            title: "Nagaland Residency",
            description: "Must be a resident of Nagaland (proof required)."
        },
        {
            id: 8,
            title: "Minimum Age",
            description: "Must be at least 10 years old (minors require parental consent)."
        },
        {
            id: 9,
            title: "Code of Conduct",
            description: "Must agree to abide by NPA's Code of Conduct and tournament regulations."
        }
    ];

    // const animatedListItems = benefits.map((item) => `${item.title}: ${item.description}`);

    return (
        <section className="py-20 bg-secondary" data-section="benefits">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        <span>Key </span>
                        <span className="text-primary">Highlights</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-foreground/70">
                        Discover the essential features and requirements of the NPA Player Registration.
                    </p>
                </motion.div>

                <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
                    {highlights.map((item, idx) => (
                        <motion.li
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.08 }}
                            className="bg-white dark:bg-background rounded-xl shadow-md p-6 flex flex-col gap-3 border border-border hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold text-lg text-foreground">{item.title}</span>
                            </div>
                            <p className="text-foreground/80 text-base">{item.description}</p>
                        </motion.li>
                    ))}
                </ul>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 text-center"
                >
                    <h2 className="mb-4 text-2xl font-bold md:text-3xl">
                        <span>Eligibility </span>
                        <span className="text-primary">Criteria</span>
                    </h2>
                </motion.div>
                <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {eligibility.map((item, idx) => (
                        <motion.li
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.08 }}
                            className="bg-white dark:bg-background rounded-xl shadow-md p-6 flex flex-col gap-3 border border-border hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center gap-3 mb-2">
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
