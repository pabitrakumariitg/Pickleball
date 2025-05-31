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
  const news: NewsItem[] = [{
    id: "1",
    title: "Pickleball Association Nagaland Expands to Five New Districts",
    excerpt: "PAN announces exciting expansion plans to bring pickleball courts to five additional districts across Nagaland.",
    content: "In an exciting development for pickleball enthusiasts across Nagaland, the Pickleball Association Nagaland (PAN) has announced plans to expand its presence to five new districts in the coming months. This expansion will include the construction of new courts, training programs for local coaches, and community outreach initiatives to introduce the sport to new players. The move comes after a successful two-year period that saw membership increase by over 200%.",
    date: "2025-05-20",
    author: "Kevishe Thong",
    category: "Announcements",
    image: "https://picsum.photos/200",
    slug: "pan-expands-to-five-new-districts"
  }, {
    id: "2",
    title: "National Pickleball Team to Represent Nagaland at Regional Championships",
    excerpt: "Selected players from PAN will compete at the upcoming Northeast India Regional Pickleball Championships.",
    content: "A team of twelve talented pickleball players from across Nagaland has been selected to represent the state at the upcoming Northeast India Regional Pickleball Championships to be held in Guwahati next month. The team, comprising both veterans and rising stars, has been undergoing intensive training sessions at the Kohima Sports Complex under the guidance of Head Coach Imkong Tzudir.",
    date: "2025-05-15",
    author: "Arenla Jamir",
    category: "Competitions",
    image: "https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    slug: "national-team-to-represent-nagaland"
  }, {
    id: "3",
    title: "New Youth Development Program Launched for Aspiring Pickleball Players",
    excerpt: "PAN introduces specialized training program for players aged 8-16 to develop the next generation of talent.",
    content: "The Pickleball Association Nagaland is proud to announce the launch of its Youth Development Program, a comprehensive training initiative designed specifically for players between the ages of 8 and 16. The program aims to identify and nurture young talent, fostering not only technical skills but also sportsmanship, discipline, and a lifelong love for the sport.",
    date: "2025-05-08",
    author: "Sashimenla Ao",
    category: "Programs",
    image: "https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    slug: "youth-development-program-launched"
  }];
  const containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
  return <section className="py-20 bg-secondary" data-unique-id="dd692af3-0d2b-4e5e-b070-4b8996c65bde" data-file-name="components/updates/news-list.tsx">
      <div className="container mx-auto px-6" data-unique-id="98b52e51-d289-4dab-b521-9cb9ba8b3dd9" data-file-name="components/updates/news-list.tsx">
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
      }} className="mb-12 text-center" data-unique-id="324b5e24-3d48-4ed7-969d-38e0dcb6ba9d" data-file-name="components/updates/news-list.tsx">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl" data-unique-id="b7fc02f7-3700-4dbd-977d-4dd3098e878f" data-file-name="components/updates/news-list.tsx">
            <span className="editable-text" data-unique-id="0233f569-8702-4310-a846-30dde8008671" data-file-name="components/updates/news-list.tsx">Latest </span>
            <span className="text-primary" data-unique-id="f0ba04c0-2ebe-49a6-a3dd-68ed8d59c09a" data-file-name="components/updates/news-list.tsx">
              <span className="editable-text" data-unique-id="442d645f-2e39-4de8-9e42-381b1bb8364e" data-file-name="components/updates/news-list.tsx">News</span>
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-foreground/70" data-unique-id="8db286cc-6cac-4264-9af8-8f853d4628b7" data-file-name="components/updates/news-list.tsx">
            <span className="editable-text" data-unique-id="720f294d-dc31-4520-84d4-4e6578c794be" data-file-name="components/updates/news-list.tsx">
              Stay informed about the latest developments, announcements, and
              achievements from the Pickleball Association Nagaland.
            </span>
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true
      }} className="grid gap-10 md:gap-16" data-unique-id="afc5b767-65ed-4ab0-a28c-3267b99587aa" data-file-name="components/updates/news-list.tsx" data-dynamic-text="true">
          {news.map(item => <motion.article key={item.id} variants={itemVariants} className="card card-hover overflow-hidden border border-border group" data-unique-id="5abf234b-b892-4190-92d7-3078bed150bc" data-file-name="components/updates/news-list.tsx">
              <div className="md:grid md:grid-cols-3 md:gap-6" data-unique-id="56d7f887-5ec4-4226-a047-6eb913a9e16d" data-file-name="components/updates/news-list.tsx">
                <div className="relative h-64 md:h-full w-full overflow-hidden" data-unique-id="4e7496ee-d614-41cc-bad2-e2508bb02b75" data-file-name="components/updates/news-list.tsx">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-unique-id="f505f839-7ff4-41da-9b84-dfd3d3869f85" data-file-name="components/updates/news-list.tsx" />
                </div>
                <div className="col-span-2 p-6 md:p-8" data-unique-id="3c3f6bf3-3f41-43df-b502-544892d4c93c" data-file-name="components/updates/news-list.tsx">
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-foreground/70" data-unique-id="74b84d53-1777-42ed-9c27-da92d406a496" data-file-name="components/updates/news-list.tsx">
                    <div className="flex items-center" data-unique-id="08ad162f-39a2-4a18-a809-a745378d1f9c" data-file-name="components/updates/news-list.tsx" data-dynamic-text="true">
                      <Calendar className="mr-1 h-4 w-4" data-unique-id="2db0c961-5076-4f63-a786-02878ee60c72" data-file-name="components/updates/news-list.tsx" />
                      {formatDate(item.date)}
                    </div>
                    <div className="flex items-center" data-unique-id="4c7543a8-de80-4e87-b71f-8c8f105ee7da" data-file-name="components/updates/news-list.tsx" data-dynamic-text="true">
                      <User className="mr-1 h-4 w-4" />
                      {item.author}
                    </div>
                    <div className="flex items-center" data-unique-id="18815647-1a78-482b-abd3-7d05cf2b8fc9" data-file-name="components/updates/news-list.tsx" data-dynamic-text="true">
                      <Tag className="mr-1 h-4 w-4" />
                      {item.category}
                    </div>
                  </div>
                  
                  <h3 className="mb-3 text-2xl font-bold" data-unique-id="f790ae61-0320-48f0-8e3b-bf7822e2ce4b" data-file-name="components/updates/news-list.tsx" data-dynamic-text="true">{item.title}</h3>
                  <p className="mb-4 text-foreground/80" data-unique-id="cc30e728-2b4a-406a-bbc0-e710c63e9f3b" data-file-name="components/updates/news-list.tsx" data-dynamic-text="true">{item.excerpt}</p>
                  <p className="mb-6 text-foreground/80" data-unique-id="a90acf0b-98da-4070-8903-60d66201758e" data-file-name="components/updates/news-list.tsx" data-dynamic-text="true">
                    {item.content.substring(0, 150)}<span className="editable-text" data-unique-id="2d7e1a2b-9666-4043-9cc0-b89c39fd00b3" data-file-name="components/updates/news-list.tsx">...
                  </span></p>
                  
                  <Link href={`/updates/news/${item.slug}`} data-unique-id="30a5e688-b605-4518-bb7c-c0f01cf5939d" data-file-name="components/updates/news-list.tsx">
                    <Button variant="primary" className="group" data-unique-id="d340b7dc-6147-41a9-9bb6-23cf1cb2fc40" data-file-name="components/updates/news-list.tsx">
                      <span className="editable-text" data-unique-id="f59c80dd-8ef0-4594-9f3f-e61ed434b19a" data-file-name="components/updates/news-list.tsx">Read More</span>
                      <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.article>)}
        </motion.div>

        <div className="mt-12 text-center" data-unique-id="8d0c1307-0109-4a38-88d5-a5e269352ec3" data-file-name="components/updates/news-list.tsx">
          <Button variant="outline" size="lg" className="border-primary" motion data-unique-id="d3966495-d27c-4aa1-995b-a4980b9b2434" data-file-name="components/updates/news-list.tsx">
            <span className="editable-text" data-unique-id="0d65070b-bcb6-49d1-b351-e19c96126bd8" data-file-name="components/updates/news-list.tsx">View All News</span>
          </Button>
        </div>
      </div>
    </section>;
}