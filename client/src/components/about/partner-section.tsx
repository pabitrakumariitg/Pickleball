"use client";

import { motion } from "framer-motion";
interface Partner {
  name: string;
  logo: string;
}
export function PartnerSection() {
  const partners: Partner[] = [{
    name: "Nagaland Sports Authority",
    logo: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }, {
    name: "Kohima Municipal Council",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }, {
    name: "Northeast Sports Foundation",
    logo: "https://images.unsplash.com/photo-1598301257982-0cf014dabbcd?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }, {
    name: "Dimapur Sports Club",
    logo: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }];
  return <section className="py-20 bg-background" data-unique-id="42328ab1-ebdc-4e98-916e-6ecd2554752f" data-file-name="components/about/partner-section.tsx">
      <div className="container mx-auto px-6" data-unique-id="705346b2-4638-4035-8a0a-642c399050ce" data-file-name="components/about/partner-section.tsx">
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
      }} className="mb-16 text-center" data-unique-id="0901bbac-3615-4cb3-a60a-02cf53298745" data-file-name="components/about/partner-section.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="ab50837e-66ac-4f87-9436-8a993ae3f2cb" data-file-name="components/about/partner-section.tsx"><span className="editable-text" data-unique-id="ee90e651-aaf9-4a94-932f-a6bc9aa7bf1d" data-file-name="components/about/partner-section.tsx">
            Our </span><span className="text-primary" data-unique-id="dc30457d-7e2a-4331-b2c8-f1541e5b9b8f" data-file-name="components/about/partner-section.tsx"><span className="editable-text" data-unique-id="78c77090-cbfd-445d-a6da-e64d2b892d12" data-file-name="components/about/partner-section.tsx">Partners</span></span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="e768f54f-8c07-458e-909c-1965bc20a6e0" data-file-name="components/about/partner-section.tsx"><span className="editable-text" data-unique-id="4d3b534b-626f-4e6c-8a74-6b99737c3863" data-file-name="components/about/partner-section.tsx">
            We collaborate with organizations across Nagaland to promote pickleball
            and create opportunities for the community.
          </span></p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4" data-unique-id="30b404b5-63d9-4ad4-bc68-d4ca1dfe0ce0" data-file-name="components/about/partner-section.tsx" data-dynamic-text="true">
          {partners.map((partner, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true,
          margin: "-100px"
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} whileHover={{
          scale: 1.05
        }} className="flex flex-col items-center" data-unique-id="a3a08e02-d40c-4d51-8447-e84029193f9c" data-file-name="components/about/partner-section.tsx">
              <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-muted flex items-center justify-center p-2" data-unique-id="2cc08cf0-1a27-4e97-9c46-28c1aef928e8" data-file-name="components/about/partner-section.tsx">
                <img src={partner.logo} alt={partner.name} className="h-full w-full object-cover rounded-full" data-unique-id="9ac044b4-c4ac-41c9-a087-80ca703acf7c" data-file-name="components/about/partner-section.tsx" />
              </div>
              <h3 className="text-center text-lg font-medium" data-unique-id="ca92d139-6518-4578-8f92-50cbe7cb07e1" data-file-name="components/about/partner-section.tsx" data-dynamic-text="true">{partner.name}</h3>
            </motion.div>)}
        </div>
      </div>
    </section>;
}