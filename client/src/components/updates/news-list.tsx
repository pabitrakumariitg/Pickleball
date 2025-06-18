"use client";

import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  slug: string;
}

export function NewsList() {
  const news: NewsItem[] = [
    {
      id: "1",
      title: "Nagaland Open 2025: Inaugural Tournament Success",
      excerpt:
        "Our inaugural tournament saw 50+ players compete, with local stars clinching gold in men’s and women’s doubles!",
      content:
        "Nagaland Open 2025 marked a milestone for our association as over 50 players from across the state participated. The event witnessed thrilling matches and outstanding sportsmanship, with local stars emerging victorious in both men’s and women’s doubles categories. Congratulations to all participants and winners!",
      date: "2025-06-01",
      author: "Editorial Team",
      category: "Tournaments",
      image:
        "/highlight1.jpg",
      slug: "nagaland-open-2025-inaugural-tournament",
    },
    {
      id: "2",
      title: "Beginner Clinics Launched Across Kohima",
      excerpt:
        "Free introductory sessions held every Saturday at Kohima Sports Complex.",
      content:
        "To encourage new players, we have launched free beginner clinics every Saturday at Kohima Sports Complex. These sessions are open to all ages and equipment is provided. Come join us and discover the fun of pickleball!",
      date: "2025-05-25",
      author: "Editorial Team",
      category: "Programs",
      image:
        "/highlight2.jpg",
      slug: "beginner-clinics-launched-kohima",
    },
    {
      id: "3",
      title: "New Court in Dimapur Doubles Capacity",
      excerpt:
        "A state-of-the-art indoor facility opened this month, doubling our capacity for year-round play.",
      content:
        "We are excited to announce the opening of a new indoor pickleball facility in Dimapur. This modern court will allow us to host more events and provide year-round access to the sport, rain or shine. Thank you to everyone who made this possible!",
      date: "2025-05-18",
      author: "Editorial Team",
      category: "Facilities",
      image: "/highlight2.jpg",
      slug: "new-court-dimapur-opens",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
            <span>Latest </span>
            <span className="text-primary">News</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70">
            Stay informed about the latest developments, announcements, and
            achievements from the Nagaland Pickleball Association.
          </p>
        </motion.div>


        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-10 md:gap-16"
        >
          {news.map((item) => (
            <motion.article
              key={item.id}
              variants={itemVariants}
              className="card card-hover overflow-hidden border border-border group"
            >
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="relative h-64 md:h-full w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="col-span-2 p-6 md:p-8">
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-foreground/70">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {formatDate(item.date)}
                    </div>
                    <div className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      {item.author}
                    </div>
                    <div className="flex items-center">
                      <Tag className="mr-1 h-4 w-4" />
                      {item.category}
                    </div>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold">{item.title}</h3>
                  <p className="mb-4 text-foreground/80">{item.excerpt}</p>
                  <Link href={`/news/${item.slug}`}>
                    <Button variant="link" className="p-0 text-primary">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
