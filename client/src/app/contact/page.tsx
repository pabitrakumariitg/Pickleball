'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Twitter, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PartnerWithUs } from "@/components/contact/partner-withus";
import { ConnectOnSocialMedia } from '@/components/contact/connect-on-social-media';
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  return <>
    {/* Hero Section */}


    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary pt-24 pb-16 md:pb-24 md:pt-32" data-unique-id="c555b44a-6d36-4d4b-9445-09ea69be8c53" data-file-name="components/about/hero.tsx" data-dynamic-text="true">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-5" data-unique-id="c2830ecd-8bcf-4a74-a7a9-abd3c80a6023" data-file-name="components/about/hero.tsx">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" data-unique-id="6665c752-ca61-484c-aa01-a1d9f4b4dafd" data-file-name="components/about/hero.tsx">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6" data-unique-id="b6a2fcaf-8b40-415a-802e-892092a3b2df" data-file-name="components/about/hero.tsx">
        <div className="mx-auto max-w-3xl text-center" data-unique-id="594aaf35-5caf-4967-9448-13a535e88dc6" data-file-name="components/about/hero.tsx">
          <motion.div initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} className="mb-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent" data-unique-id="cb378b1d-1d7e-426d-8d32-28300bfb9a6c" data-file-name="components/about/hero.tsx"><span className="editable-text" data-unique-id="a7fd90c2-ca27-4365-bb0c-3e5654fe819f" data-file-name="components/about/hero.tsx">
              Our Mission & Vision
            </span></motion.div>

          <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7,
            delay: 0.2
          }} className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl" data-unique-id="630d7f21-1ff2-4354-b630-1df7062390c9" data-file-name="components/about/hero.tsx"><span className="editable-text" data-unique-id="6b3267b5-94ae-4f54-80c1-a2f127b05463" data-file-name="components/about/hero.tsx">
              Contact </span><span className="text-primary" data-unique-id="0f6b76ad-ecf1-47f1-b729-5bc49f12874a" data-file-name="components/about/hero.tsx"><span className="editable-text" data-unique-id="8f9f9d00-36bf-4684-8233-da959bc1da95" data-file-name="components/about/hero.tsx"> Us</span></span>
          </motion.h1>

          <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7,
            delay: 0.3
          }} className="mb-8 text-lg text-foreground/80" data-unique-id="77dd913a-7bef-4b11-b47b-21e0a415c647" data-file-name="components/about/hero.tsx"><span className="editable-text" data-unique-id="a29be9fa-8438-4912-ad47-5349d3a790f5" data-file-name="components/about/hero.tsx">
              Get in Touch with Nagaland Pickleball Association
              <br />
              Have questions? Want to collaborate or share your pickleball passion?
              <br />
              We’d love to hear from you!

            </span></motion.p>

          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7,
            delay: 0.4
          }} className="flex flex-wrap justify-center gap-4" data-unique-id="fa136c23-95f8-4944-8205-aeaf815a4221" data-file-name="components/about/hero.tsx">
            <Link href="/contact" data-unique-id="d295fe7e-ad52-4a24-b281-2418442d6482" data-file-name="components/about/hero.tsx">
              <Button motion variant="primary" size="lg" className="group" icon={<ArrowRight className="transition-transform group-hover:translate-x-1" />} iconPosition="right" data-unique-id="26b917d6-95a6-4d49-b01d-1406561b3d5c" data-file-name="components/about/hero.tsx"><span className="editable-text" data-unique-id="da5605e4-fafe-4267-be31-ac52727ef407" data-file-name="components/about/hero.tsx">
                Get Involved
              </span></Button>
            </Link>
            <Link href="#our-story" data-unique-id="16375e15-2e8d-4cee-b9cf-28b277416be1" data-file-name="components/about/hero.tsx">
              <Button motion variant="outline" size="lg" className="border-primary" data-unique-id="c5657a92-2aa8-498c-85f7-b6ae0464e10c" data-file-name="components/about/hero.tsx"><span className="editable-text" data-unique-id="84cb9bdd-a6a2-44ad-b700-b041da6dcab1" data-file-name="components/about/hero.tsx">
                Our Story
              </span></Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Contact Details & Form */}
    <section className="py-16" data-unique-id="8b099d9f-5580-4d20-9cba-4008a56363bd" data-file-name="app/contact/page.tsx">
      <div className="container" data-unique-id="0a2f1c2f-7887-4546-841b-d98545af533c" data-file-name="app/contact/page.tsx">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10" data-unique-id="ba4c5005-b7a3-47da-80a1-8d3588aaa8bc" data-file-name="app/contact/page.tsx" data-dynamic-text="true">
          {/* Contact Information */}
          <div className="lg:col-span-1" data-unique-id="97a325ec-ee89-459b-af76-9c70727984b3" data-file-name="app/contact/page.tsx">
            <div className="bg-white p-8 rounded-lg shadow-md" data-unique-id="d7b061f2-ac0c-4724-be4d-42c5d36e2466" data-file-name="app/contact/page.tsx">
              <h2 className="text-2xl font-bold mb-6" data-unique-id="507768db-5264-46e0-ac46-e5ed32b3ac27" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="5d1883a2-9e27-46dd-a67f-6186b8a76cdc" data-file-name="app/contact/page.tsx">Get In Touch</span></h2>

              <div className="space-y-6" data-unique-id="d2aa43ec-3a5f-4dda-a6c5-883d1d89f30e" data-file-name="app/contact/page.tsx">
                <div className="flex items-start" data-unique-id="376fbb87-0521-4bd1-a177-112329b47e9b" data-file-name="app/contact/page.tsx">
                  <div className="mt-1 mr-4" data-unique-id="033b9ec9-4d65-4c0f-8661-cb3e5c824e7e" data-file-name="app/contact/page.tsx">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center" data-unique-id="5eea4266-20d2-4fab-ac88-207b7a44bc2d" data-file-name="app/contact/page.tsx">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div data-unique-id="8eae0ab4-d36d-4e55-8520-4e9c736f15ce" data-file-name="app/contact/page.tsx">
                    <h3 className="font-semibold text-lg" data-unique-id="607d67f5-d320-40f4-82dd-864dfa82b5fb" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="0dda2dc9-7802-4dda-8bb0-19150b500212" data-file-name="app/contact/page.tsx">Our Location</span></h3>
                    <p className="text-muted-foreground">132B Darogapathar , Dimapur , Nagaland 797115</p>
                  </div>
                </div>

                <div className="flex items-start" data-unique-id="37a40b67-9650-45b4-b677-3e24b44ce556" data-file-name="app/contact/page.tsx">
                  <div className="mt-1 mr-4" data-unique-id="b23b68f4-62cc-4927-895d-08aee5d86434" data-file-name="app/contact/page.tsx">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center" data-unique-id="0ebb8641-3bb2-43fe-9c0d-5a6b643d3b58" data-file-name="app/contact/page.tsx">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div data-unique-id="ab30ce5f-694d-40a1-8463-4b10008c520c" data-file-name="app/contact/page.tsx">
                    <h3 className="font-semibold text-lg" data-unique-id="b2a2e418-4922-43df-b278-379227c0a4d9" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="653a2b3f-8476-4fda-8ded-d97a5cd3557d" data-file-name="app/contact/page.tsx">Phone Number</span></h3>
                    <p className="text-muted-foreground">+91 8837402472</p>
                  </div>
                </div>

                <div className="flex items-start" data-unique-id="0db4dc48-ee31-40a4-b99a-ab35c437801b" data-file-name="app/contact/page.tsx">
                  <div className="mt-1 mr-4" data-unique-id="bbc84c82-c74c-42cc-ad8b-2c95280ebb7e" data-file-name="app/contact/page.tsx">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center" data-unique-id="69c4a35c-1979-454b-8d2f-2e353e3f38e8" data-file-name="app/contact/page.tsx">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div data-unique-id="036095b1-4c31-4961-8aa7-b915ecfee246" data-file-name="app/contact/page.tsx">
                    <h3 className="font-semibold text-lg" data-unique-id="588c9f74-ef09-4c45-b952-7bddafd980f1" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="0eb44d36-383f-4ed9-abd6-219e3e9a24ae" data-file-name="app/contact/page.tsx">Email Address</span></h3>
                    <p className="text-muted-foreground">nagalandpickleball@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start" data-unique-id="149054b7-1763-4cca-af59-d65d78dc7eaa" data-file-name="app/contact/page.tsx">
                  <div className="mt-1 mr-4" data-unique-id="37bcbe7d-52a8-4981-a9e9-5633362a3e4a" data-file-name="app/contact/page.tsx">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center" data-unique-id="a8ea144d-2de1-4adb-8b2e-56f671856e9c" data-file-name="app/contact/page.tsx">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div data-unique-id="bc443687-1ee9-403b-8791-daf67ae529a7" data-file-name="app/contact/page.tsx">
                    <h3 className="font-semibold text-lg" data-unique-id="ff7b1174-1c4f-4810-bed8-13eb71347d1f" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="9787685c-cc7e-41ef-b453-af461f1f294f" data-file-name="app/contact/page.tsx">Office Hours</span></h3>
                    <p className="text-muted-foreground">Monday - Friday: 10:00 AM - 5:00 PM</p>
                    <p className="text-muted-foreground">Saturday: 9:00 AM - 1:00 PM</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t" data-unique-id="37bd471d-c004-4243-8a60-d966b034592f" data-file-name="app/contact/page.tsx">
                <h3 className="font-semibold text-lg mb-4" data-unique-id="5651366a-dc63-4e94-a2de-ca2015fc3e69" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="253cbfc7-9048-4167-bb0a-de35b20adb28" data-file-name="app/contact/page.tsx">Follow Us</span></h3>
                <div className="flex space-x-4" data-unique-id="f62be16c-ca4c-4063-b605-fcc458b8b30d" data-file-name="app/contact/page.tsx">
                  <motion.a href="https://facebook.com" target="_blank" rel="noopener noreferrer" whileHover={{
                    scale: 1.1
                  }} className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors" data-unique-id="69a68724-8de0-422d-b812-0778250cdf18" data-file-name="app/contact/page.tsx">
                    <Facebook size={18} />
                  </motion.a>
                  <motion.a href="https://instagram.com" target="_blank" rel="noopener noreferrer" whileHover={{
                    scale: 1.1
                  }} className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors" data-unique-id="11c4979c-7776-4aad-9595-4a599780c543" data-file-name="app/contact/page.tsx">
                    <Instagram size={18} />
                  </motion.a>
                  <motion.a href="https://twitter.com" target="_blank" rel="noopener noreferrer" whileHover={{
                    scale: 1.1
                  }} className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors" data-unique-id="96c23f49-6998-4db7-ad6c-4e33901768a8" data-file-name="app/contact/page.tsx">
                    <Twitter size={18} />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2" data-unique-id="18911e2c-a6ca-4f2a-973f-070cbe339e8b" data-file-name="app/contact/page.tsx">
            <div className="bg-white p-8 rounded-lg shadow-md" data-unique-id="89e6dde9-6c6b-44f1-9c68-30c91497ab4f" data-file-name="app/contact/page.tsx" data-dynamic-text="true">
              <h2 className="text-2xl font-bold mb-6" data-unique-id="561a48ae-ac47-4f9a-bdcf-dde859fd672f" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="ebe3b72f-597e-42d3-9f9a-4c7459951e82" data-file-name="app/contact/page.tsx">Send Us a Message</span></h2>

              {formStatus === 'success' ? <motion.div initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center" data-unique-id="97b82aab-ebda-4f6c-8090-76334a78b1f8" data-file-name="app/contact/page.tsx">
                <div className="flex justify-center mb-4" data-unique-id="a2e1420d-4bba-4750-8fa5-a5852e8474de" data-file-name="app/contact/page.tsx">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center" data-unique-id="f7aac98c-e020-4caf-b48c-25ade560ba44" data-file-name="app/contact/page.tsx">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2" data-unique-id="3c9618b0-daa4-40aa-af00-b997b32298c1" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="efc36d6d-a377-4edc-b3ce-2e72ad1cf4f6" data-file-name="app/contact/page.tsx">Thank You!</span></h3>
                <p data-unique-id="14e7c098-408e-417d-9645-8c150e733d4a" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="87e8262d-e4a9-4894-8090-92cc5703c263" data-file-name="app/contact/page.tsx">Your message has been sent successfully. We'll get back to you soon.</span></p>
                <button onClick={() => setFormStatus('idle')} className="mt-4 text-primary hover:text-cta" data-unique-id="0e84ace9-9de8-43eb-805b-94a661f3d5a7" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="8481acd1-5f8c-4b95-9680-c244c7c8c644" data-file-name="app/contact/page.tsx">
                  Send another message
                </span></button>
              </motion.div> : <form onSubmit={handleSubmit} data-unique-id="89896b62-3f58-44cd-972f-5498deb5f1a3" data-file-name="app/contact/page.tsx">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" data-unique-id="e6b9cc33-d9ea-4f9b-bbaa-a0a4db9ed107" data-file-name="app/contact/page.tsx">
                  <div data-unique-id="56d27984-59e6-4764-8936-e303675eb636" data-file-name="app/contact/page.tsx">
                    <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1" data-unique-id="54d37441-18e4-48d8-ad22-fb2867176dc7" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="431a4f6e-4805-48b8-8893-09d83dd456fe" data-file-name="app/contact/page.tsx">
                      Your Name *
                    </span></label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="John Doe" data-unique-id="4c00f257-f884-4ca1-90e5-a5ed06a76299" data-file-name="app/contact/page.tsx" />
                  </div>

                  <div data-unique-id="df5cea2e-2cdb-4ca0-ac0d-dc11ec873216" data-file-name="app/contact/page.tsx">
                    <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1" data-unique-id="1e5f6b1d-ee48-46a2-acef-f3d75ca1d00e" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="243ac6b5-4b44-4d49-aa11-3b6dc9e7f03d" data-file-name="app/contact/page.tsx">
                      Email Address *
                    </span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="john@example.com" data-unique-id="4f3c3c32-b95e-4571-8900-5863687dec8f" data-file-name="app/contact/page.tsx" />
                  </div>

                  <div data-unique-id="2595e38c-8faa-4478-ae36-7c4b4403d62a" data-file-name="app/contact/page.tsx">
                    <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground mb-1" data-unique-id="1db9fecc-fb4e-4ddc-ba61-abbc48b2d859" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="26da912d-50ca-48d8-be78-d1fe6b3f627a" data-file-name="app/contact/page.tsx">
                      Phone Number
                    </span></label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="+91 98765 43210" data-unique-id="0725c7b4-7ba1-4f12-b372-3a17cb5d381b" data-file-name="app/contact/page.tsx" />
                  </div>

                  <div data-unique-id="3101706a-c6a3-4fb8-a7ef-9bab24d4e56c" data-file-name="app/contact/page.tsx">
                    <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-1" data-unique-id="bdeee18f-fce2-4141-8777-355bd7328699" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="aa145a5c-cd1a-486e-a5da-4f491cba4fba" data-file-name="app/contact/page.tsx">
                      Subject *
                    </span></label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" data-unique-id="452dcb1f-e138-4682-910d-736c157545a4" data-file-name="app/contact/page.tsx">
                      <option value="" disabled data-unique-id="75e2d731-a228-497a-aec8-c41dd9a9668c" data-file-name="app/contact/page.tsx">Select a subject</option>
                      <option value="General Inquiry" data-unique-id="5f532b02-d881-4d0b-b812-e4bf3d068b47" data-file-name="app/contact/page.tsx">General Inquiry</option>
                      <option value="Membership" data-unique-id="1ec2f41a-f3a6-451c-a7af-719a41782f40" data-file-name="app/contact/page.tsx">Membership</option>
                      <option value="Court Booking" data-unique-id="73219c48-7f9b-43c8-b57f-f989e299f766" data-file-name="app/contact/page.tsx">Court Booking</option>
                      <option value="Events & Tournaments" data-unique-id="758bfbc7-b747-48b5-9d30-816fa9d83e9d" data-file-name="app/contact/page.tsx">Events & Tournaments</option>
                      <option value="Partnership & Sponsorship" data-unique-id="fe84596a-88dc-4513-a1e9-bc1c83dd24e7" data-file-name="app/contact/page.tsx">Partnership & Sponsorship</option>
                      <option value="Other" data-unique-id="6a7a73bc-b2d5-41ef-9e3e-6dc152dfb10e" data-file-name="app/contact/page.tsx">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6" data-unique-id="900948cf-e1a3-4805-861a-036814263b3d" data-file-name="app/contact/page.tsx">
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1" data-unique-id="dcd0c261-d6f4-4071-b3c3-59a93015b6a0" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="dc72839e-2579-41e4-a48a-383ff4cecec8" data-file-name="app/contact/page.tsx">
                    Message *
                  </span></label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full p-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="How can we help you?" data-unique-id="9b552e5c-831b-434d-b90b-141064b82c4c" data-file-name="app/contact/page.tsx" />
                </div>

                <motion.button whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }} type="submit" disabled={formStatus === 'submitting'} className={cn("w-full bg-primary text-white py-3 px-6 rounded-md font-medium flex items-center justify-center", formStatus === 'submitting' ? "opacity-70 cursor-not-allowed" : "hover:bg-cta transition-colors")} data-unique-id="82950918-7c8f-44b5-9df9-f55fadf55a64" data-file-name="app/contact/page.tsx" data-dynamic-text="true">
                  {formStatus === 'submitting' ? <>
                    <span className="mr-2" data-unique-id="d9b7b1d1-3867-49ae-a4b4-a9e2947c22ee" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="f86a0e18-33af-421f-8d40-e635a8938bbe" data-file-name="app/contact/page.tsx">Sending...</span></span>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" data-unique-id="a923f836-db17-4947-9972-ec841e77e43a" data-file-name="app/contact/page.tsx"></div>
                  </> : <>
                    <span data-unique-id="97598970-015d-44e5-a2a2-117493bf370a" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="45d659c4-05a1-40cb-bce7-bac0d25b858e" data-file-name="app/contact/page.tsx">Send Message</span></span>
                    <Send size={16} className="ml-2" />
                  </>}
                </motion.button>
              </form>}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Map Section */}
    <section className="py-10" data-unique-id="d74ce965-199b-44cc-839c-32d0e3d279ae" data-file-name="app/contact/page.tsx">
      <div className="container" data-unique-id="390c4ee7-83ff-4a8e-aff1-37f84abe1d81" data-file-name="app/contact/page.tsx">
        <div className="bg-white p-4 rounded-lg shadow-md" data-unique-id="9d15e0af-0220-4ed4-a01b-f5550955ca59" data-file-name="app/contact/page.tsx">
          <div className="aspect-[16/9] w-full relative" data-unique-id="55832762-ac27-45aa-b9f5-0b366dc25c92" data-file-name="app/contact/page.tsx">
            <Image src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" alt="Map location" fill style={{
              objectFit: 'cover'
            }} className="rounded-md" data-unique-id="bddce85a-ce1d-4489-8b53-e58b1eea3a78" data-file-name="app/contact/page.tsx" />
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center" data-unique-id="8cc2c742-879b-4e8b-bfb0-3b3a978ebde0" data-file-name="app/contact/page.tsx">
              <div className="bg-white p-4 rounded-lg shadow-lg" data-unique-id="5ddb4c78-d2c9-4e66-83c3-3ec4d270160c" data-file-name="app/contact/page.tsx">
                <h3 className="font-bold" data-unique-id="01d2be87-577c-46eb-a82e-8a025e6259ec" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="10c7bae7-843d-4478-a450-d12d56ecc127" data-file-name="app/contact/page.tsx">Nagaland Pickleball Association</span></h3>
                <p className="text-sm text-muted-foreground" data-unique-id="d201d6e4-4bdc-41ba-a931-ea55ac3ee76a" data-file-name="app/contact/page.tsx"><span className="editable-text" data-unique-id="6344df64-b885-4e95-b59d-8cc4b8d32fab" data-file-name="app/contact/page.tsx">132B Darogapathar , Dimapur , Nagaland 797115
                </span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ConnectOnSocialMedia />
    <PartnerWithUs />

  </>;
}

