"use client";

import { motion } from "framer-motion";
import { ShieldCheck,  Users, Ban } from "lucide-react"; // icons for visual context

interface Step {
    icon: JSX.Element;
    title: string;
}

export function CourtRules() {
    const steps: Step[] = [
        {
            icon: <ShieldCheck className="h-6 w-6 text-primary" />,
            title: "Respect all players and follow fair play at all times.",
        },
        {
            icon: <ShieldCheck className="h-6 w-6 text-primary" />,
            title: "Wear non-marking court shoes to protect the surface.",
        },
        {
            icon: <Users className="h-6 w-6 text-primary" />,
            title: "Limit play to 4 players per court for doubles games.",
        },
        {
            icon: <Ban className="h-6 w-6 text-primary" />,
            title: "No food, drinks, or unauthorized coaching allowed on court.",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        Court <span className="text-primary">Rules</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-foreground/70">
                        Please follow these court rules to ensure a safe and enjoyable experience for everyone.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                >
                    {steps.map((step, index) => (
                        <motion.div key={index} variants={itemVariants} className="relative">
                            <div className="card h-full border border-border p-6 text-center">
                                <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                                    {index + 1}
                                </div>

                                <div className="mb-4 flex justify-center">
                                    <div className="rounded-full bg-primary/10 p-4">
                                        {step.icon}
                                    </div>
                                </div>

                                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                            </div>

                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-primary/30 z-10"></div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
