"use client";

import { Activity, Users, Calendar, Heart } from "lucide-react";
import { motion } from "framer-motion";
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}
const FeatureCard = ({
  icon,
  title,
  description,
  index
}: FeatureCardProps) => {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    margin: "-50px"
  }} transition={{
    duration: 0.5,
    delay: index * 0.1
  }} className="card card-hover flex flex-col items-center text-center p-6" data-unique-id="aefdffb2-8347-46fd-954d-fb232ed15fd8" data-file-name="components/home/about-section.tsx">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10" data-unique-id="af7232d3-a631-4f25-93e2-9973f36a2582" data-file-name="components/home/about-section.tsx">
        <div className="text-primary" data-unique-id="27e88c0b-2705-43da-b8b5-2cb2be1f99a5" data-file-name="components/home/about-section.tsx" data-dynamic-text="true">{icon}</div>
      </div>
      <h3 className="mb-2 text-lg font-medium" data-unique-id="b2a9ce50-c617-426f-bfc7-79a71d184008" data-file-name="components/home/about-section.tsx" data-dynamic-text="true">{title}</h3>
      <p className="text-foreground/70" data-unique-id="a9f6c451-ab13-4c41-af2c-91bd54f22b09" data-file-name="components/home/about-section.tsx" data-dynamic-text="true">{description}</p>
    </motion.div>;
};
export function AboutSection() {
  const features = [{
    icon: <Activity size={24} />,
    title: "Easy to Learn",
    description: "Pick up the basics in just one session and start playing immediately."
  }, {
    icon: <Users size={24} />,
    title: "Family Friendly",
    description: "A perfect activity for all ages and abilities to enjoy together."
  }, {
    icon: <Calendar size={24} data-unique-id="1ce57bf5-aa81-40b8-a40f-b1542b27cddf" data-file-name="components/home/about-section.tsx" />,
    title: "Community Events",
    description: "Regular tournaments, social mixers, and training sessions across Nagaland."
  }, {
    icon: <Heart size={24} />,
    title: "Active Lifestyle",
    description: "Improve fitness, coordination and mental well-being through regular play."
  }];
  return <section className="py-20 bg-background" data-unique-id="7749d732-56ab-4e7b-a72d-a09117236840" data-file-name="components/home/about-section.tsx">
      <div className="container mx-auto px-6" data-unique-id="796d7800-ddc4-48d3-87a7-b658b30c4d21" data-file-name="components/home/about-section.tsx">
        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} className="mb-16 text-center" data-unique-id="543840cd-7813-4525-b15e-255cf2b2b7ad" data-file-name="components/home/about-section.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="b963ce7a-ced1-4c7c-9e8b-6ae0f6dab0c2" data-file-name="components/home/about-section.tsx"><span className="editable-text" data-unique-id="9c485205-8559-4c2f-8ca9-693efd91d8f3" data-file-name="components/home/about-section.tsx">
            About </span><span className="text-primary" data-unique-id="082799a5-4e0b-489c-ac74-e924c3975492" data-file-name="components/home/about-section.tsx"><span className="editable-text" data-unique-id="80644d1e-876b-4549-85b0-ceb430aff212" data-file-name="components/home/about-section.tsx">Pickleball Association Nagaland</span></span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="9b57b586-e75b-41d1-9632-467ed6e00e32" data-file-name="components/home/about-section.tsx"><span className="editable-text" data-unique-id="d6344049-9448-42ae-b34e-be6bbc398413" data-file-name="components/home/about-section.tsx">
            Founded in 2022, we're dedicated to promoting pickleball throughout
            Nagaland by providing facilities, education, and a welcoming
            community for players of all skill levels.
          </span></p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" data-unique-id="cf82090b-31a3-44ef-9d27-23f0e61619ca" data-file-name="components/home/about-section.tsx" data-dynamic-text="true">
          {features.map((feature, index) => <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} index={index} data-unique-id="61639633-70e1-45ee-b8a5-f8ec5bd56049" data-file-name="components/home/about-section.tsx" data-dynamic-text="true" />)}
        </div>
      </div>
    </section>;
}