"use client";
import Link from "next/link";

import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureItem {
    title: string;
    icon: JSX.Element;
    url: string;
}

export function ConnectOnSocialMedia() {
    const offers: FeatureItem[] = [
        {
            title: "Instagram",
            icon: <Instagram className="h-6 w-6" />,
            url: "https://instagram.com/yourprofile",
        },
        {
            title: "Facebook",
            icon: <Facebook className="h-6 w-6" />,
            url: "https://facebook.com/yourpage",
        },
        {
            title: "Whatsapp Community",
            icon: <MessageCircle className="h-6 w-6" />,
            url: "https://chat.whatsapp.com/yourcommunitylink",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section
            className="relative overflow-hidden py-20 md:py-32"
            data-unique-id="242aa7fc-b59b-4c34-ac45-09580c5b34d0"
            data-file-name="components/home/offers-section.tsx"
            data-dynamic-text="true"
        >
            {/* Accent background elements */}
            <div
                className="absolute inset-0 -z-10 overflow-hidden"
                data-unique-id="5825c162-7912-467c-8e0d-a233759c1391"
                data-file-name="components/home/offers-section.tsx"
            >
                <div
                    className="absolute -top-[30%] right-[20%] h-[40%] w-[40%] rounded-full bg-primary/5"
                    data-unique-id="6d9c1911-3698-4412-94e7-a824f0ab3fbb"
                    data-file-name="components/home/offers-section.tsx"
                ></div>
                <div
                    className="absolute bottom-[10%] left-[10%] h-[20%] w-[20%] rounded-full bg-accent/5"
                    data-unique-id="b1a4c692-38ef-4670-85e0-09c859de4fe5"
                    data-file-name="components/home/offers-section.tsx"
                ></div>
            </div>

            <div
                className="container mx-auto px-6"
                data-unique-id="0a648807-6161-4c56-9a5a-059ffcc83b2a"
                data-file-name="components/home/offers-section.tsx"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                    data-unique-id="1e7aa217-9092-49a0-93f6-c9570a33cb32"
                    data-file-name="components/home/offers-section.tsx"
                >
                    <h2
                        className="mb-4 text-3xl font-bold md:text-4xl"
                        data-unique-id="d33db131-8b87-474e-9f9a-a5560814cfd1"
                        data-file-name="components/home/offers-section.tsx"
                    >
                        <span
                            className="editable-text"
                            data-unique-id="b3f3ccbe-875e-4a2b-bc3d-f4fb05d21bae"
                            data-file-name="components/home/offers-section.tsx"
                        >
                            Connect On
                        </span>
                        <span
                            className="text-primary"
                            data-unique-id="ac119ef1-b32c-4784-b096-243d6112eaa5"
                            data-file-name="components/home/offers-section.tsx"
                        >
                            <span
                                className="editable-text"
                                data-unique-id="f7396e05-79ef-4e66-82c6-dcc949cd357f"
                                data-file-name="components/home/offers-section.tsx"
                            >
                                Social Media
                            </span>
                        </span>
                    </h2>
                </motion.div>

                <motion.ul
                    className="flex flex-col gap-6 max-w-md mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {offers.map(({ title, icon, url }, index) => (
                        <motion.li
                            key={title}
                            variants={itemVariants}
                            className="flex items-center gap-4 rounded-lg border border-gray-300 p-4 hover:bg-primary/10 transition cursor-pointer"
                        >
                            <span className="text-primary">{icon}</span>
                            <Link href={url} target="_blank" className="text-lg font-semibold text-gray-700 hover:text-primary">
                                {title}
                            </Link>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </section>
    );
}
