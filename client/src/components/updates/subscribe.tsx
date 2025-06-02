"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export function Subscribe() {
    return <section className="py-20" data-unique-id="f05d44e0-9548-4a4a-a4dc-0d0009a3b26b" data-file-name="components/home/cta-section.tsx">
        <div className="container mx-auto px-6" data-unique-id="4e3fbb28-2b53-4a9b-906b-353929691b8d" data-file-name="components/home/cta-section.tsx">
            <motion.div initial={{
                opacity: 0,
                y: 20
            }} whileInView={{
                opacity: 1,
                y: 0
            }} viewport={{
                once: true
            }} transition={{
                duration: 0.6
            }} className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground" data-unique-id="afb6fd98-07f9-47f4-be9e-7d111044e2ec" data-file-name="components/home/cta-section.tsx" data-dynamic-text="true">
                {/* Background gradient effects */}
                <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-accent opacity-20 blur-3xl" data-unique-id="24795507-55c9-4a9b-a46a-4eb298949f1e" data-file-name="components/home/cta-section.tsx"></div>
                <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-primary-foreground opacity-10 blur-3xl" data-unique-id="f713c040-b6f2-42ad-9ee5-ac441e259517" data-file-name="components/home/cta-section.tsx"></div>

                <div className="relative px-6 py-16 md:px-12 md:py-20" data-unique-id="373ae19e-2a6f-4938-963d-ab44ec96dd26" data-file-name="components/home/cta-section.tsx">
                    <div className="mx-auto max-w-3xl text-center" data-unique-id="5c068bbd-2cfa-43e0-8002-b8dfc2981fb3" data-file-name="components/home/cta-section.tsx">
                        <motion.h2 initial={{
                            opacity: 0,
                            y: 20
                        }} whileInView={{
                            opacity: 1,
                            y: 0
                        }} viewport={{
                            once: true
                        }} transition={{
                            duration: 0.6,
                            delay: 0.2
                        }} className="mb-6 text-3xl font-bold md:text-5xl" data-unique-id="9522abe2-2fb9-42f2-8e78-8044a4961dba" data-file-name="components/home/cta-section.tsx"><span className="editable-text" data-unique-id="4e3e9214-d369-4c8f-b873-179aec5395c1" data-file-name="components/home/cta-section.tsx">
                                Subscribe Now!
                            </span></motion.h2>

                        <motion.p initial={{
                            opacity: 0,
                            y: 20
                        }} whileInView={{
                            opacity: 1,
                            y: 0
                        }} viewport={{
                            once: true
                        }} transition={{
                            duration: 0.6,
                            delay: 0.3
                        }} className="mb-10 text-lg opacity-90" data-unique-id="cb3326f8-d689-4b9a-a147-ebd3c458498a" data-file-name="components/home/cta-section.tsx"><span className="editable-text" data-unique-id="dec055bb-28af-4fb2-9c92-ed85e261d39f" data-file-name="components/home/cta-section.tsx">
                                Subscribe to our newsletter for real-time updates or follow us on social media.
                            </span></motion.p>

                        <motion.div initial={{
                            opacity: 0,
                            y: 20
                        }} whileInView={{
                            opacity: 1,
                            y: 0
                        }} viewport={{
                            once: true
                        }} transition={{
                            duration: 0.6,
                            delay: 0.4
                        }} className="flex flex-wrap justify-center gap-4" data-unique-id="5c6bec71-4dac-4834-83cd-19ae18229a91" data-file-name="components/home/cta-section.tsx">
                            <Link href="/book" data-unique-id="ce4d8dfb-0bac-4fb7-b782-c228a992977c" data-file-name="components/home/cta-section.tsx">
                                <Button variant="accent" size="lg" motion data-unique-id="ecfef4c1-3835-4378-b253-faa03637f6e2" data-file-name="components/home/cta-section.tsx"><span className="editable-text" data-unique-id="96419b7b-dca9-43e7-b558-91617763d546" data-file-name="components/home/cta-section.tsx">
                                    Subscribe
                                </span></Button>
                            </Link>
                            <Link href="/book" data-unique-id="ce4d8dfb-0bac-4fb7-b782-c228a992977c" data-file-name="components/home/cta-section.tsx">
                                <Button variant="accent" size="lg" motion data-unique-id="ecfef4c1-3835-4378-b253-faa03637f6e2" data-file-name="components/home/cta-section.tsx"><span className="editable-text" data-unique-id="96419b7b-dca9-43e7-b558-91617763d546" data-file-name="components/home/cta-section.tsx">
                                    Follow us On Instagram
                                </span></Button>
                            </Link>


                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>;
}