"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin } from "lucide-react";
interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}
export function TeamSection() {
  const teamMembers: TeamMember[] = [{
    name: "Kevi Meyase",
    role: "President",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Former badminton champion with a passion for growing racket sports in Nagaland.",
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com"
    }
  }, {
    name: "Arenla Jamir",
    role: "Vice President",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Sports administrator and advocate for women's participation in athletics.",
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com"
    }
  }, {
    name: "Imkong Tzudir",
    role: "Head Coach",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Certified pickleball instructor with 10+ years of coaching experience.",
    social: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com"
    }
  }, {
    name: "Sashimenla Ao",
    role: "Tournament Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    bio: "Experienced event organizer and former national-level athlete.",
    social: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com"
    }
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
  return <section className="py-20 bg-secondary" data-unique-id="f18a50c5-fb67-463e-9a81-f04f23517285" data-file-name="components/about/team-section.tsx">
      <div className="container mx-auto px-6" data-unique-id="b073d596-7abb-46ad-ac57-2bf474198e3b" data-file-name="components/about/team-section.tsx">
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
      }} className="mb-16 text-center" data-unique-id="37d67ccb-538f-4330-a31c-e86ebb92f157" data-file-name="components/about/team-section.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="679e1eaf-aff7-4fcb-b8f8-9f694c1e3739" data-file-name="components/about/team-section.tsx"><span className="editable-text" data-unique-id="5ff9e08e-6cd4-42b8-a1ce-4c808b051b9b" data-file-name="components/about/team-section.tsx">
            Meet Our </span><span className="text-primary" data-unique-id="015cb5f8-e2ea-4f37-af7f-f0f8fa19178c" data-file-name="components/about/team-section.tsx"><span className="editable-text" data-unique-id="63f8da9d-4e95-4124-9d22-1dffb88c92dd" data-file-name="components/about/team-section.tsx">Team</span></span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="68269cb7-656c-4541-b1b2-58c7f8fb0f23" data-file-name="components/about/team-section.tsx"><span className="editable-text" data-unique-id="720a9777-78e5-4253-9c0c-2afd8ae1961d" data-file-name="components/about/team-section.tsx">
            Get to know the passionate individuals leading Pickleball Association Nagaland
            and driving our mission forward.
          </span></p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: "-100px"
      }} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4" data-unique-id="1f8eb353-965f-4475-bece-a3ed35f42069" data-file-name="components/about/team-section.tsx" data-dynamic-text="true">
          {teamMembers.map((member, index) => <motion.div key={index} variants={itemVariants} data-unique-id="450b846c-f6cd-40c5-a142-cddc82a7e8d3" data-file-name="components/about/team-section.tsx">
              <div className="card card-hover h-full overflow-hidden border border-border group" data-unique-id="230568b0-7e39-488a-9f31-f6f6380b5e02" data-file-name="components/about/team-section.tsx">
                <div className="relative h-72 w-full overflow-hidden" data-unique-id="f39e8e57-d962-45c7-b524-f3adafaa59f9" data-file-name="components/about/team-section.tsx">
                  <img src={member.image} alt={member.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-unique-id="f8c4bf46-3a5f-45d0-ba16-c067d51b594b" data-file-name="components/about/team-section.tsx" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4" data-unique-id="8c967764-8da4-4e1d-9ada-dd3091b0f1a1" data-file-name="components/about/team-section.tsx">
                    <div className="flex gap-3" data-unique-id="def22db4-ef2c-4c96-b06b-32cc88ea94fc" data-file-name="components/about/team-section.tsx" data-dynamic-text="true">
                      {member.social.facebook && <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors" data-unique-id="e70fe044-49ab-46f0-9ecf-49bd04adbb65" data-file-name="components/about/team-section.tsx">
                          <Facebook size={18} data-unique-id="04795263-69a7-4897-b0d2-ae097daadeb1" data-file-name="components/about/team-section.tsx" data-dynamic-text="true" />
                        </a>}
                      {member.social.instagram && <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors" data-unique-id="66a00341-6fa7-4b7a-8e05-96244263feaa" data-file-name="components/about/team-section.tsx">
                          <Instagram size={18} data-unique-id="b3b746eb-8317-4366-8310-159d37093322" data-file-name="components/about/team-section.tsx" data-dynamic-text="true" />
                        </a>}
                      {member.social.linkedin && <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition-colors" data-unique-id="be35df1b-4a40-4b1c-9944-9bb9dafbe575" data-file-name="components/about/team-section.tsx">
                          <Linkedin size={18} data-unique-id="32b037b4-7e7f-418b-b036-76d1b47d6169" data-file-name="components/about/team-section.tsx" data-dynamic-text="true" />
                        </a>}
                    </div>
                  </div>
                </div>
                <div className="p-5" data-unique-id="a229190e-9b01-4791-93ac-7e03392e5e38" data-file-name="components/about/team-section.tsx">
                  <h3 className="mb-1 text-xl font-semibold" data-unique-id="3d9b544c-b9ff-497f-a2a4-711674f2b563" data-file-name="components/about/team-section.tsx" data-dynamic-text="true">{member.name}</h3>
                  <p className="mb-3 text-sm font-medium text-primary" data-unique-id="db70f948-ce8d-40cb-9f49-64acd71a9da4" data-file-name="components/about/team-section.tsx" data-dynamic-text="true">{member.role}</p>
                  <p className="text-foreground/70" data-unique-id="3799de7d-e550-4410-bed8-aac7bc027be0" data-file-name="components/about/team-section.tsx" data-dynamic-text="true">{member.bio}</p>
                </div>
              </div>
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
}