'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
export default function TermsConditionsPage() {
  return <>
      {/* Hero Section */}
      <section className="relative h-[30vh] flex items-center" data-unique-id="20cae26c-21a1-450a-a7a9-caf32c034753" data-file-name="app/terms-conditions/page.tsx">
        <div className="absolute inset-0 z-0" data-unique-id="e6fcc8fc-2003-43c0-85a9-b8b74aa4d5e3" data-file-name="app/terms-conditions/page.tsx">
          <Image src="https://images.unsplash.com/photo-1615840287214-7ff58936c4cf?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" alt="Terms and Conditions" fill style={{
          objectFit: 'cover'
        }} priority data-unique-id="bbba4fc9-6306-4081-a185-9866404bc362" data-file-name="app/terms-conditions/page.tsx" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" data-unique-id="e3259475-2608-4f32-b9fd-0baf44237796" data-file-name="app/terms-conditions/page.tsx"></div>
        </div>
        
        <div className="container relative z-10" data-unique-id="f76ee553-2526-4274-8392-93012b920766" data-file-name="app/terms-conditions/page.tsx">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="max-w-2xl text-white" data-unique-id="49030073-a482-496e-b2d4-4d207a390b06" data-file-name="app/terms-conditions/page.tsx">
            <h1 className="text-4xl font-bold mb-4" data-unique-id="36916743-4afe-4e1c-9b01-39f6f7f734c0" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="f4e4893e-41fc-46a6-bc96-66ef4216db3d" data-file-name="app/terms-conditions/page.tsx">Terms & Conditions</span></h1>
            <p className="text-xl mb-6" data-unique-id="164d9c89-a123-4d0d-9085-b17a39cf69ea" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="4ccaba93-bf13-4903-8c72-86fa3bf7e330" data-file-name="app/terms-conditions/page.tsx">
              The rules and guidelines governing the use of our services
            </span></p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16" data-unique-id="dc2d0041-3027-47be-aa01-2265c2a9c08b" data-file-name="app/terms-conditions/page.tsx">
        <div className="container" data-unique-id="84783660-dca7-4428-80d7-7a9abe30862d" data-file-name="app/terms-conditions/page.tsx">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" data-unique-id="b3f5dbf3-a95e-4935-8f1d-d16be72a15e0" data-file-name="app/terms-conditions/page.tsx" data-dynamic-text="true">
            {/* Sticky Sidebar Nav */}
            <div className="lg:col-span-1" data-unique-id="51932349-e4cf-440a-b2a6-ede348a348cd" data-file-name="app/terms-conditions/page.tsx">
              <div className="bg-white p-6 rounded-lg shadow-md sticky top-24" data-unique-id="733b0843-f464-4a16-90a7-9d3611faed7d" data-file-name="app/terms-conditions/page.tsx">
                <h3 className="font-semibold mb-4 text-lg" data-unique-id="2ad8efaf-394f-4aed-aa78-8454b48fdf82" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="ce02255b-67b3-483b-b752-9b8528f4deb5" data-file-name="app/terms-conditions/page.tsx">Quick Navigation</span></h3>
                <ul className="space-y-2" data-unique-id="c70bb54c-2168-472a-b8ef-16283d571d3e" data-file-name="app/terms-conditions/page.tsx" data-dynamic-text="true">
                  {[{
                  title: "Agreement to Terms",
                  href: "#agreement"
                }, {
                  title: "Intellectual Property",
                  href: "#intellectual-property"
                }, {
                  title: "User Representations",
                  href: "#user-representations"
                }, {
                  title: "Membership Terms",
                  href: "#membership-terms"
                }, {
                  title: "Booking & Cancellation",
                  href: "#booking"
                }, {
                  title: "Prohibited Activities",
                  href: "#prohibited-activities"
                }, {
                  title: "Liability Limitations",
                  href: "#liability"
                }, {
                  title: "Indemnification",
                  href: "#indemnification"
                }, {
                  title: "Term & Termination",
                  href: "#termination"
                }, {
                  title: "Modifications",
                  href: "#modifications"
                }, {
                  title: "Governing Law",
                  href: "#governing-law"
                }, {
                  title: "Contact Us",
                  href: "#contact-us"
                }].map((link, idx) => <li key={idx} data-unique-id="83e82274-847f-4e88-8148-29d40028b61b" data-file-name="app/terms-conditions/page.tsx">
                      <a href={link.href} className="block py-2 px-3 rounded-md hover:bg-secondary transition-colors hover:text-primary" data-unique-id="1116a9a7-c549-46b6-be4f-17aad2d4c194" data-file-name="app/terms-conditions/page.tsx" data-dynamic-text="true">
                        {link.title}
                      </a>
                    </li>)}
                </ul>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3" data-unique-id="c8504166-6bac-4960-864e-ab00b77cfac4" data-file-name="app/terms-conditions/page.tsx">
              <div className="bg-white p-8 rounded-lg shadow-md" data-unique-id="790a7e8a-ad4d-4c99-96cc-39f6e1a8c2f5" data-file-name="app/terms-conditions/page.tsx">
                <section id="agreement" className="mb-10" data-unique-id="86cf3f88-1f81-4879-bc66-a35aca3a91cf" data-file-name="app/terms-conditions/page.tsx">
                  <h2 className="text-2xl font-bold mb-4" data-unique-id="2b2a8f39-aa8b-4417-8efa-991de548501d" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="3c472d11-97fe-4f8b-b639-041be9e0ef61" data-file-name="app/terms-conditions/page.tsx">Agreement to Terms</span></h2>
                  <p className="text-muted-foreground mb-4" data-unique-id="d0cbedbf-467d-45d3-8c48-7d699ce8ac70" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="21867ef0-8b22-4161-9ba5-fb13929cb632" data-file-name="app/terms-conditions/page.tsx">
                    Last updated: May 1, 2025
                  </span></p>
                  <p className="mb-4" data-unique-id="db0ebbe7-c7f5-402c-bc08-9aa208b580a4" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="b4bde78d-5c20-43bd-809b-762a6477a3c7" data-file-name="app/terms-conditions/page.tsx">
                    These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Pickleball Association Nagaland ("PAN", "we", "us", or "our"), concerning your access to and use of our website, services, and facilities.
                  </span></p>
                  <p className="mb-4" data-unique-id="55f76f67-aff3-4d39-a4a1-35f38daec9db" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="48c624ab-ebe5-491c-8c6e-e2cbfdbdd3dc" data-file-name="app/terms-conditions/page.tsx">
                    By accessing our website, booking courts, registering for membership, or participating in our events, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you do not have permission to access our services.
                  </span></p>
                </section>
                
                <section id="intellectual-property" className="mb-10" data-unique-id="f46dbe83-bf97-4ad2-8ba2-3ce123eb4d9f" data-file-name="app/terms-conditions/page.tsx">
                  <h2 className="text-2xl font-bold mb-4" data-unique-id="d7208ac6-4867-46e0-b96e-78ad4186e059" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="5f606902-7980-42cf-adc1-88f5acd84314" data-file-name="app/terms-conditions/page.tsx">Intellectual Property Rights</span></h2>
                  <p className="mb-4" data-unique-id="1713b359-251e-44e7-b6c0-34a8fc4e0b6a" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="f0833faf-5742-4dc3-8336-76568a355343" data-file-name="app/terms-conditions/page.tsx">
                    Unless otherwise indicated, the website and all its contents, including but not limited to text, images, logos, button icons, images, audio clips, digital downloads, data compilations, and software, are the property of PAN or our content suppliers and protected by applicable copyright laws.
                  </span></p>
                  <p className="mb-4" data-unique-id="33ff0254-f7b0-450b-8997-b1d030edb026" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="6cd123be-30a5-45df-be0d-f35cf8de9664" data-file-name="app/terms-conditions/page.tsx">
                    You must not:
                  </span></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2" data-unique-id="274328ab-6207-4335-9bb7-f478d0ccdbaf" data-file-name="app/terms-conditions/page.tsx">
                    <li data-unique-id="9adf02a0-075e-4b01-92d6-96aec14921d1" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="6fde4e47-34ae-45a1-b101-7787ff4aa20f" data-file-name="app/terms-conditions/page.tsx">Republish material from our website</span></li>
                    <li data-unique-id="46102ae6-9c26-4a15-b32c-5f76031bff4d" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="9f8246a0-ced5-4a6a-86c0-b41d7346381d" data-file-name="app/terms-conditions/page.tsx">Sell, rent, or sub-license material from our website</span></li>
                    <li data-unique-id="68e3024a-0c6f-405b-bccc-732972e12d70" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="50348a80-44cf-4bcf-ad7d-dc718d025022" data-file-name="app/terms-conditions/page.tsx">Reproduce, duplicate or copy material from our website</span></li>
                    <li data-unique-id="a38315fc-8474-4665-a231-cf8addfa134b" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="0bf8967d-07b3-4408-88a9-f8ee75446d5e" data-file-name="app/terms-conditions/page.tsx">Redistribute content from our website</span></li>
                  </ul>
                </section>
                
                <section id="user-representations" className="mb-10" data-unique-id="15cb69b2-c1c5-425b-9b80-b2e1e5c8e386" data-file-name="app/terms-conditions/page.tsx">
                  <h2 className="text-2xl font-bold mb-4" data-unique-id="19c8ea17-2311-4f4a-9d6c-51de7f8cfa31" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="5e6a1755-6a8d-4d88-9b6b-536f6f5c673d" data-file-name="app/terms-conditions/page.tsx">User Representations</span></h2>
                  <p className="mb-4" data-unique-id="f1b872ff-6c72-4b31-9fa4-23ba08d27c45" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="326c5196-8206-4290-9d24-ff5c8d453da6" data-file-name="app/terms-conditions/page.tsx">
                    By using our services, you represent and warrant that:
                  </span></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2" data-unique-id="eeb4f266-b0e2-4d52-a575-28199140f73c" data-file-name="app/terms-conditions/page.tsx">
                    <li data-unique-id="c9fef30d-f873-4392-aa07-9889d5947f5a" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="080d56e5-17ee-42cf-8d05-bc53ebfcd715" data-file-name="app/terms-conditions/page.tsx">You have the legal capacity to agree to these Terms and Conditions</span></li>
                    <li data-unique-id="28a1b146-2e1d-48ec-81b4-af1b7a570c16" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="b6e135ab-ae4f-46c3-acd6-a0b070b864cd" data-file-name="app/terms-conditions/page.tsx">You are at least 18 years of age, or if under 18, you have parental consent to use our services</span></li>
                    <li data-unique-id="8efff6a4-d8ad-47e2-808d-25891a6f6fcd" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="1b5036ce-f677-4253-a96e-e60ac3fdc79c" data-file-name="app/terms-conditions/page.tsx">You will not access our services through automated or non-human means</span></li>
                    <li data-unique-id="e56e66f5-031a-426e-878c-77bf2e09e9ca" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="72b31943-17e9-4d14-a78c-e1de8e094166" data-file-name="app/terms-conditions/page.tsx">You will not use our services for any illegal or unauthorized purpose</span></li>
                    <li data-unique-id="680868c8-58a0-4c8c-92d7-b966416e719c" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="a122f636-3974-4744-836d-e450a5fd1c61" data-file-name="app/terms-conditions/page.tsx">Your use of our services will not violate any applicable law or regulation</span></li>
                  </ul>
                </section>
                
                <section id="membership-terms" className="mb-10" data-unique-id="7c9e0dc4-2598-4670-8b90-a45c3c6f4085" data-file-name="app/terms-conditions/page.tsx">
                  <h2 className="text-2xl font-bold mb-4" data-unique-id="f587505d-01fa-4de1-a98e-5a5680c65ef2" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="347a5a29-5c22-4cc5-8a18-b4cf8f6b299c" data-file-name="app/terms-conditions/page.tsx">Membership Terms</span></h2>
                  <p className="mb-4" data-unique-id="84e663d5-8d31-4ed0-95cb-06b4291cba63" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="98f5872c-29fa-4ee2-9442-f82579557404" data-file-name="app/terms-conditions/page.tsx">
                    Membership to PAN is subject to the following terms:
                  </span></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2" data-unique-id="201639be-54a0-4519-9852-fce029c4fe56" data-file-name="app/terms-conditions/page.tsx">
                    <li data-unique-id="28621a2a-1a56-4061-9bf1-1f289347660b" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="31956b2f-2088-462f-91a7-be31a139d977" data-file-name="app/terms-conditions/page.tsx">Membership fees must be paid in full at the time of registration</span></li>
                    <li data-unique-id="5f36af6c-0510-453d-9c33-e159eff35e68" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="6f6e7263-bf5c-4ef9-b08c-6c86bfa55e5b" data-file-name="app/terms-conditions/page.tsx">Membership is non-transferable and non-refundable</span></li>
                    <li data-unique-id="f3d58a4d-f209-4623-889d-6cee6ea9eecd" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="b280bb1c-09f6-4c5a-af27-f55ff3ee0a14" data-file-name="app/terms-conditions/page.tsx">Members must adhere to our code of conduct at all times</span></li>
                    <li data-unique-id="eda02a76-8621-4b6c-83fc-31533f04e963" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="d205176a-43d4-43c7-a319-e840dc294d69" data-file-name="app/terms-conditions/page.tsx">PAN reserves the right to revoke membership for violation of our terms</span></li>
                    <li data-unique-id="383da190-afa5-4d32-8be0-7ce274210183" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="1cdd766a-a0e3-430b-97a8-d6829c167b2c" data-file-name="app/terms-conditions/page.tsx">Membership benefits are subject to change with reasonable notice</span></li>
                  </ul>
                </section>
                
                <section id="booking" className="mb-10" data-unique-id="efd29ba6-3223-49b6-9047-b940a001cfed" data-file-name="app/terms-conditions/page.tsx">
                  <h2 className="text-2xl font-bold mb-4" data-unique-id="278ae93f-bab8-46e4-8249-f4e980e8b416" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="da28ccd0-0d41-4f54-92a9-445a90fd4ecb" data-file-name="app/terms-conditions/page.tsx">Booking & Cancellation Policy</span></h2>
                  <p className="mb-4" data-unique-id="136bfb7c-5237-4648-ae6a-fc2a4fb82626" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="834d42a1-2ead-4dc5-9493-a569d5058905" data-file-name="app/terms-conditions/page.tsx">
                    Court bookings and event registrations are subject to the following terms:
                  </span></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2" data-unique-id="a6df82a0-10d7-4978-8f34-3922a5a302d5" data-file-name="app/terms-conditions/page.tsx">
                    <li data-unique-id="cf822961-e642-4299-ab71-a854dc9cf068" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="033b846f-43eb-4a41-832b-d6dd3befc5bb" data-file-name="app/terms-conditions/page.tsx">Bookings must be made through our official website or at our facilities</span></li>
                    <li data-unique-id="b488c17e-3446-4dda-b67f-2ea0c6567477" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="cd4c3b9d-deff-44ad-a638-06b15f79e4bf" data-file-name="app/terms-conditions/page.tsx">Payment is required at the time of booking</span></li>
                    <li data-unique-id="6fb747cd-ebcb-4e4b-82e2-b7206ac34f2e" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="59f86f41-9a69-440e-84a7-72142789d1dc" data-file-name="app/terms-conditions/page.tsx">Cancellations must be made at least 24 hours in advance for a full refund</span></li>
                    <li data-unique-id="cc773123-a08e-496c-9724-95f353183811" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="e291f78e-4d9d-4025-8a07-74e376e65ef1" data-file-name="app/terms-conditions/page.tsx">Cancellations made less than 24 hours in advance will not be refunded</span></li>
                    <li data-unique-id="1f31e617-b97b-4cc1-8e04-b1055a47c210" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="31d04e72-0962-427e-bbaf-16c227a2d9bf" data-file-name="app/terms-conditions/page.tsx">PAN reserves the right to cancel bookings due to maintenance, weather conditions, or other circumstances beyond our control</span></li>
                  </ul>
                </section>
                
                <section id="prohibited-activities" className="mb-10" data-unique-id="ff4c3349-a4b6-4645-a4d2-714ced9c40f2" data-file-name="app/terms-conditions/page.tsx">
                  <h2 className="text-2xl font-bold mb-4" data-unique-id="5cc51e36-191e-4698-8e97-41c15946ddf0" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="ce8e0b76-b3cb-430c-805f-e8360ec73994" data-file-name="app/terms-conditions/page.tsx">Prohibited Activities</span></h2>
                  <p className="mb-4" data-unique-id="aca22616-22be-49e2-a078-99ae4b5db728" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="3abee965-c3cf-4be1-9284-e76978a9bfb0" data-file-name="app/terms-conditions/page.tsx">
                    You may not engage in any of the following prohibited activities:
                  </span></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2" data-unique-id="92c77116-74f2-449e-9f07-319c649a785e" data-file-name="app/terms-conditions/page.tsx">
                    <li data-unique-id="60151ea3-660e-402e-af90-74d863a943fc" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="97dbe42b-7ef7-4676-ba5c-959c910b7125" data-file-name="app/terms-conditions/page.tsx">Violating any applicable law, regulation, or court order</span></li>
                    <li data-unique-id="15d498b9-6f5d-45c8-9960-e3277e555346" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="5b26001b-c400-4ce4-b3f4-f6564a2bb850" data-file-name="app/terms-conditions/page.tsx">Infringing upon the intellectual property rights of others</span></li>
                    <li data-unique-id="7b12f180-36bf-4ada-bf88-49384446a5f8" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="6b714605-6e52-4325-b4d3-24732d63596f" data-file-name="app/terms-conditions/page.tsx">Engaging in unauthorized commercial activities on our premises</span></li>
                    <li data-unique-id="cd84def5-4a3e-477e-97a6-9ba47c5d28a4" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="db5338f3-4d93-4004-9285-14be3a9cc190" data-file-name="app/terms-conditions/page.tsx">Interfering with or disrupting our services or servers</span></li>
                    <li data-unique-id="996de9ba-fe2c-4289-94b7-f0514a703c34" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="10d078bb-60f5-4aaf-b8e3-eb8d9b94706c" data-file-name="app/terms-conditions/page.tsx">Harassing, threatening, or intimidating other members or staff</span></li>
                    <li data-unique-id="20044f66-6073-4b10-b96f-73eb1998aa84" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="10ba7962-5020-4964-9c23-346f04a7f395" data-file-name="app/terms-conditions/page.tsx">Using our facilities or services for any illegal purpose</span></li>
                  </ul>
                </section>
                
                <section id="liability" className="mb-10" data-unique-id="7d843dca-1009-42b3-8bad-cc09af73c3f6" data-file-name="app/terms-conditions/page.tsx">
                  <h2 className="text-2xl font-bold mb-4" data-unique-id="b688ba16-c0a1-4fdb-afd9-25309495139d" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="ccaaedd9-0847-43de-a647-29cdbbda628c" data-file-name="app/terms-conditions/page.tsx">Limitation of Liability</span></h2>
                  <p className="mb-4" data-unique-id="a5dfca00-58b7-42a2-a132-e6ba6e689a47" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="e419b7a9-e869-4649-ad09-f932846d6aba" data-file-name="app/terms-conditions/page.tsx">
                    PAN shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from:
                  </span></p>
                  <ul className="list-disc pl-6 mb-4 space-y-2" data-unique-id="91e5fcb8-15e8-414b-85b9-acf1c073764c" data-file-name="app/terms-conditions/page.tsx">
                    <li data-unique-id="56c6a666-5dda-432b-aac2-3b1b9b1cb606" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="00d7b1e5-5abe-4fed-9d11-b4c4a4d10879" data-file-name="app/terms-conditions/page.tsx">Your use or inability to use our services</span></li>
                    <li data-unique-id="78d9e285-1b3f-4e33-bf7b-41e3bd4a3b86" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="d6c00951-39ed-4152-9fa9-ec286b12c4bd" data-file-name="app/terms-conditions/page.tsx">Any injuries sustained while using our facilities</span></li>
                    <li data-unique-id="bdfb9997-511b-45e0-adb8-283d3d57ff59" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="76e80fb2-8e6e-49c8-8233-6caa53640f23" data-file-name="app/terms-conditions/page.tsx">Theft, damage, or loss of personal property</span></li>
                    <li data-unique-id="4d69b94c-d4cf-4bba-a49f-361a1fb87182" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="7c541202-3dc5-49b0-b23b-91761398a3f1" data-file-name="app/terms-conditions/page.tsx">Any actions or content of third parties</span></li>
                  </ul>
                  <p className="mb-4" data-unique-id="65ea27fb-b14c-43d3-91bc-e67e09ca696f" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="de0c8fd9-4fb1-4498-9157-65f64ad5244a" data-file-name="app/terms-conditions/page.tsx">
                    Our maximum liability shall be limited to the amount you paid for the specific service in question.
                  </span></p>
                </section>
                
                <section id="indemnification" className="mb-10" data-unique-id="870eea7f-5f4d-486a-a644-043a454a0aa0" data-file-name="app/terms-conditions/page.tsx">
                  <h2 className="text-2xl font-bold mb-4" data-unique-id="5c7473c7-3b4a-46cd-b9bd-8409fa665bca" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="99437a61-7bad-4816-be68-12e33c2035de" data-file-name="app/terms-conditions/page.tsx">Indemnification</span></h2>
                  <p className="mb-4" data-unique-id="017bf8e8-31cc-4d93-8558-fdc34927666c" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="f4783590-5511-4942-8661-74d7ee1bb786" data-file-name="app/terms-conditions/page.tsx">
                    You agree to indemnify, defend, and hold harmless PAN and our affiliates, directors, officers, employees, and agents from and against all claims, demands, actions, causes of action, damages, losses, costs, and expenses arising out of your use of our services or violation of these Terms and Conditions.
                  </span></p>
                </section>
                
                <section id="termination" className="mb-10" data-unique-id="c81953b9-1b4e-40de-867a-02840c7f294c" data-file-name="app/terms-conditions/page.tsx">
                  <h2 className="text-2xl font-bold mb-4" data-unique-id="53bba5eb-6d7e-463e-9dc2-b14c54dc54a4" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="212f82b6-9dcf-4f4e-bdc4-b1f1727339a7" data-file-name="app/terms-conditions/page.tsx">Term and Termination</span></h2>
                  <p className="mb-4" data-unique-id="d6e2ce66-527c-4d09-96d5-7786240bd534" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="b189f033-dedc-4d5d-8ae3-3525a4bcb051" data-file-name="app/terms-conditions/page.tsx">
                    These Terms and Conditions shall remain in full force and effect while you use our services. We reserve the right to terminate your access to our services for violation of these Terms and Conditions or for any other reason at our sole discretion.
                  </span></p>
                </section>
                
                <section id="modifications" className="mb-10" data-unique-id="b16e0b96-8817-41f8-9472-d759411da721" data-file-name="app/terms-conditions/page.tsx">
                  <h2 className="text-2xl font-bold mb-4" data-unique-id="dabec078-202b-45f2-8da3-9887bd42fe68" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="d9883279-b3ad-4c36-8a84-aa71fe497e72" data-file-name="app/terms-conditions/page.tsx">Modifications to Terms</span></h2>
                  <p className="mb-4" data-unique-id="893f6bca-7274-4b1a-b685-6df42119627b" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="f87c0d10-f5c3-4511-8d18-3a2d2e7cb972" data-file-name="app/terms-conditions/page.tsx">
                    We reserve the right to modify these Terms and Conditions at any time. We will notify you of any changes by posting the updated terms on our website. Your continued use of our services following the posting of revised Terms and Conditions means you accept and agree to the changes.
                  </span></p>
                </section>
                
                <section id="governing-law" className="mb-10" data-unique-id="79c4f939-7f88-4f61-9be9-1df406a23e02" data-file-name="app/terms-conditions/page.tsx">
                  <h2 className="text-2xl font-bold mb-4" data-unique-id="d270f3e0-a748-497a-8106-921282ebccaf" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="1079acf7-8a9a-4261-8ba4-d5836d961c5e" data-file-name="app/terms-conditions/page.tsx">Governing Law</span></h2>
                  <p className="mb-4" data-unique-id="b7328178-a3f5-430f-b700-6d397077752e" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="d47db3c1-71fe-440b-86d0-807a53047efe" data-file-name="app/terms-conditions/page.tsx">
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
                  </span></p>
                  <p className="mb-4" data-unique-id="b4c1e091-0db3-491b-8496-0efe93ba1778" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="0e76c2c7-709d-424b-b582-6c2f8e38cb6e" data-file-name="app/terms-conditions/page.tsx">
                    Any dispute arising under or relating to these Terms and Conditions shall be resolved exclusively in the courts of Nagaland, India.
                  </span></p>
                </section>
                
                <section id="contact-us" data-unique-id="8f30d9a6-1053-4572-929c-f4869cec0e76" data-file-name="app/terms-conditions/page.tsx">
                  <h2 className="text-2xl font-bold mb-4" data-unique-id="916819f1-6d42-4c33-a8f0-a385beb20e5d" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="47fd1799-62e6-462c-87cc-671699e65db4" data-file-name="app/terms-conditions/page.tsx">Contact Us</span></h2>
                  <p className="mb-4" data-unique-id="3d8f4500-88a6-4771-b3d7-29366d2bb616" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="ab8dd974-f137-41ad-9c4e-18258f6b6d80" data-file-name="app/terms-conditions/page.tsx">
                    If you have any questions about these Terms and Conditions, please contact us at:
                  </span></p>
                  <address className="not-italic" data-unique-id="75f931cb-98d4-4b36-801a-33bc507e3ca9" data-file-name="app/terms-conditions/page.tsx">
                    <p data-unique-id="343aa4ae-b22d-48c1-a452-cf58408c6335" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="aaf5690c-9abe-427c-ad19-2a84a86274c4" data-file-name="app/terms-conditions/page.tsx">Pickleball Association Nagaland</span></p>
                    <p data-unique-id="40c111cb-9d0e-42ba-8b2b-caf862065a43" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="0df752da-4e57-4955-8f4c-774346657a54" data-file-name="app/terms-conditions/page.tsx">123 Main Street, Kohima, Nagaland, 797001</span></p>
                    <p data-unique-id="d8dcf8d1-6ea6-4747-a2c3-bcf2c6cffa4d" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="fe37cf06-ee35-4e7f-bd7b-e5645a2c7363" data-file-name="app/terms-conditions/page.tsx">Email: legal@pickleballnagaland.org</span></p>
                    <p data-unique-id="19efcc1c-a868-4865-aaec-50a1749adf9e" data-file-name="app/terms-conditions/page.tsx"><span className="editable-text" data-unique-id="23891daa-89e6-4079-b6d8-7431a0bb526f" data-file-name="app/terms-conditions/page.tsx">Phone: +91 12345 67890</span></p>
                  </address>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>;
}