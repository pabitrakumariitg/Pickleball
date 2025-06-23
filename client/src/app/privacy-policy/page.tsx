'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
export default function PrivacyPolicyPage() {
  return <>
    {/* Hero Section */}
    <section className="relative h-[30vh] flex items-center" data-unique-id="1fab9d43-ba44-4ae6-85f7-ca6668b67b52" data-file-name="app/privacy-policy/page.tsx">
      <div className="absolute inset-0 z-0" data-unique-id="73cce6b8-d2ac-4e48-bf64-ce2de9b60582" data-file-name="app/privacy-policy/page.tsx">
        <Image src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&q=80" alt="Privacy Policy" fill style={{
          objectFit: 'cover'
        }} priority data-unique-id="5fa9bc24-30e7-48c4-91c2-92a993eb9915" data-file-name="app/privacy-policy/page.tsx" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" data-unique-id="86edf688-0e46-42eb-a55e-cec7657427a7" data-file-name="app/privacy-policy/page.tsx"></div>
      </div>

      <div className="container relative z-10" data-unique-id="8f93fa17-b6b2-4cd7-9fd1-c6a1bc5bfcc9" data-file-name="app/privacy-policy/page.tsx">
        <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="max-w-2xl text-white" data-unique-id="7fd4c9ab-01e2-4867-9309-334321a4efbe" data-file-name="app/privacy-policy/page.tsx">
          <h1 className="text-4xl font-bold mb-4" data-unique-id="09ee4d65-4f19-4087-ac82-616bdc92a770" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="bf4bfd38-2784-4aca-8df1-673cb2be4ce0" data-file-name="app/privacy-policy/page.tsx">Privacy Policy</span></h1>
          <p className="text-xl mb-6" data-unique-id="fc03dbf4-eb0f-4040-aa77-9e29672e53ff" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="0fdbc298-3b21-4cdf-9f0a-e6b22e737be8" data-file-name="app/privacy-policy/page.tsx">
            How we collect, use, and protect your personal information
          </span></p>
        </motion.div>
      </div>
    </section>

    {/* Content Section */}
    <section className="py-16" data-unique-id="3421f3a0-361b-4bf4-a282-5375ad757bfb" data-file-name="app/privacy-policy/page.tsx">
      <div className="container" data-unique-id="1c70b000-19e4-48a6-8ad5-44ea77fa34ba" data-file-name="app/privacy-policy/page.tsx">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" data-unique-id="5e74087c-090c-48f4-bf53-5fecda31fd74" data-file-name="app/privacy-policy/page.tsx" data-dynamic-text="true">
          {/* Sticky Sidebar Nav */}
          <div className="lg:col-span-1" data-unique-id="6fcfcc89-29b7-4e73-a6b9-b46270019a45" data-file-name="app/privacy-policy/page.tsx">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24" data-unique-id="1731e031-cbdc-4e79-ae91-81295b4dc58b" data-file-name="app/privacy-policy/page.tsx">
              <h3 className="font-semibold mb-4 text-lg" data-unique-id="81112fb6-f509-4d45-9830-e331f58ae4bd" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="d2aa0dd7-185d-4b9c-b6d4-50b68e4ea70c" data-file-name="app/privacy-policy/page.tsx">Quick Navigation</span></h3>
              <ul className="space-y-2" data-unique-id="eb42b7cd-106e-4e1c-a555-07454c998485" data-file-name="app/privacy-policy/page.tsx" data-dynamic-text="true">
                {[{
                  title: "Introduction",
                  href: "#introduction"
                }, {
                  title: "Information Collection",
                  href: "#information-collection"
                }, {
                  title: "Use of Information",
                  href: "#use-of-information"
                }, {
                  title: "Information Sharing",
                  href: "#information-sharing"
                }, {
                  title: "Data Security",
                  href: "#data-security"
                }, {
                  title: "Your Rights",
                  href: "#your-rights"
                }, {
                  title: "Cookie Policy",
                  href: "#cookie-policy"
                }, {
                  title: "Changes to Policy",
                  href: "#changes-to-policy"
                }, {
                  title: "Contact Us",
                  href: "#contact-us"
                }].map((link, idx) => <li key={idx} data-unique-id="5f109efc-6ea1-408e-ae22-0314d02b87b8" data-file-name="app/privacy-policy/page.tsx">
                  <a href={link.href} className="block py-2 px-3 rounded-md hover:bg-secondary transition-colors hover:text-primary" data-unique-id="a6fce002-32dc-45d4-a1c8-c43b4dc88a36" data-file-name="app/privacy-policy/page.tsx" data-dynamic-text="true">
                    {link.title}
                  </a>
                </li>)}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3" data-unique-id="7399b666-914b-44ef-9374-a7a7b5502e05" data-file-name="app/privacy-policy/page.tsx">
            <div className="bg-white p-8 rounded-lg shadow-md" data-unique-id="527d3d13-8853-4e7f-b904-0241b7ff255d" data-file-name="app/privacy-policy/page.tsx">
              <section id="introduction" className="mb-10" data-unique-id="fd07e2b6-1066-4d0b-85b9-25fa8ccd68b2" data-file-name="app/privacy-policy/page.tsx">
                <h2 className="text-2xl font-bold mb-4" data-unique-id="4be4788a-51b0-4034-951b-77c147cc0783" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="05e61884-d38b-4ff8-8a92-0ed96e3659d9" data-file-name="app/privacy-policy/page.tsx">Introduction</span></h2>
                <p className="text-muted-foreground mb-4" data-unique-id="563021a3-3fd3-4513-ab89-e98c210123fe" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="7baee0cb-a197-403e-80da-c6933c80959c" data-file-name="app/privacy-policy/page.tsx">
                  Last updated: May 1, 2025
                </span></p>
                <p className="mb-4" data-unique-id="7a3321ad-a05c-4a0d-88c6-fa444b06b0f1" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="f68a327e-7f7e-4108-81ca-94e298a946f2" data-file-name="app/privacy-policy/page.tsx">
                  Nagaland Pickleball Association ("PAN", "we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </span></p>
                <p data-unique-id="d87ec070-f560-406f-b284-63eab2b3c94e" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="4bea7495-3095-451c-a0ef-220a9ad3bdd9" data-file-name="app/privacy-policy/page.tsx">
                  Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                </span></p>
              </section>

              <section id="information-collection" className="mb-10" data-unique-id="616da1d9-171b-4522-95d7-0248dff4e87b" data-file-name="app/privacy-policy/page.tsx">
                <h2 className="text-2xl font-bold mb-4" data-unique-id="f25c95a0-64c4-4b62-827b-9119d2d62bd7" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="4241bf9c-1b83-4d19-bfcb-7a7d9ecad1a4" data-file-name="app/privacy-policy/page.tsx">Information We Collect</span></h2>

                <h3 className="text-xl font-semibold mb-3" data-unique-id="1adb7e28-c495-498a-a9ec-35c3c29d567e" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="7e9ba56b-187c-4717-be44-924b658d140b" data-file-name="app/privacy-policy/page.tsx">Personal Information</span></h3>
                <p className="mb-4" data-unique-id="6fca2ab2-0a1b-4dd7-9a0d-6c7259e366ef" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="592a3d8d-289f-4d3a-aced-8c829ccc883b" data-file-name="app/privacy-policy/page.tsx">
                  We may collect personal information that you voluntarily provide to us when you:
                </span></p>
                <ul className="list-disc pl-6 mb-4 space-y-2" data-unique-id="514c8e4f-29c3-4107-9f22-d41c286d8473" data-file-name="app/privacy-policy/page.tsx">
                  <li data-unique-id="24751451-b0b2-4571-a50a-d0c870f0d4b9" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="637e63af-3985-44ca-b7c1-4c011f3c45cf" data-file-name="app/privacy-policy/page.tsx">Register for membership</span></li>
                  <li data-unique-id="313b4bd4-eef3-4023-b7c0-1e192a0ac60f" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="6f86683c-438b-4a45-bdc0-ec56d9c0c9d0" data-file-name="app/privacy-policy/page.tsx">Book a court</span></li>
                  <li data-unique-id="6e3c0ada-3547-4290-b3a3-9b6c4a1a01c1" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="51781867-c1fd-4c66-ac35-4f92b88cc6ad" data-file-name="app/privacy-policy/page.tsx">Sign up for events or tournaments</span></li>
                  <li data-unique-id="eea3d283-1cdc-4b19-8606-88270a0413b3" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="f883ff38-7cf6-48de-b836-94ee4425f00d" data-file-name="app/privacy-policy/page.tsx">Fill out a form or send us an inquiry</span></li>
                  <li data-unique-id="b2a9bb14-52ab-47da-aeed-217ea7ac0100" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="effe6a49-bde4-4d1b-bbca-26ca4bdc5e77" data-file-name="app/privacy-policy/page.tsx">Subscribe to our newsletter</span></li>
                </ul>
                <p className="mb-4" data-unique-id="5950ced5-8b06-45e8-a025-5e67d8ec9b84" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="a78edb2b-fac1-493b-9cb5-7c19bf54534a" data-file-name="app/privacy-policy/page.tsx">
                  The personal information we collect may include your name, email address, phone number, mailing address, and payment information.
                </span></p>

                <h3 className="text-xl font-semibold mb-3" data-unique-id="c163ce81-899b-4f58-b92d-7e5b62d154a5" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="8ae2904d-f09a-43ef-b28b-75adf4260f70" data-file-name="app/privacy-policy/page.tsx">Automatically Collected Information</span></h3>
                <p className="mb-4" data-unique-id="2bd8ba32-31a5-4e35-bfa4-a0284604c4bf" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="190ed1bc-69ca-4096-8967-bb4cd2ed9870" data-file-name="app/privacy-policy/page.tsx">
                  When you visit our website, we may automatically collect certain information about your device, including:
                </span></p>
                <ul className="list-disc pl-6 mb-4 space-y-2" data-unique-id="a7ce2394-48dd-46a2-991e-38e631d8e16f" data-file-name="app/privacy-policy/page.tsx">
                  <li data-unique-id="aa6e503c-05d1-403a-8e86-d3db5cd39b4d" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="773d63c9-c4d9-4498-8465-d6d5a604081e" data-file-name="app/privacy-policy/page.tsx">IP address</span></li>
                  <li data-unique-id="f34a88cb-e7c0-4f31-be68-68bc83076059" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="9799fb4c-dcb6-435d-9865-5d31510457da" data-file-name="app/privacy-policy/page.tsx">Browser type</span></li>
                  <li data-unique-id="cc4e4738-a2e0-4c68-9486-9a1bb3aca262" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="aab0e38f-c97c-45c4-95a5-b5b49549c8db" data-file-name="app/privacy-policy/page.tsx">Operating system</span></li>
                  <li data-unique-id="70554934-4fb8-44f2-a7b2-33cf1c9baf7b" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="76818d84-1c23-485c-ac0e-079cb924c67c" data-file-name="app/privacy-policy/page.tsx">Access times</span></li>
                  <li data-unique-id="633a9e60-e75c-449c-b4b5-86529d060f3d" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="6a9b0299-e99a-4c46-8e41-6fcdc7169717" data-file-name="app/privacy-policy/page.tsx">Pages viewed</span></li>
                  <li data-unique-id="886b0423-6919-4ff0-b83a-33beea84dbc4" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="8529d942-0361-4a3f-a941-1c1caae1c995" data-file-name="app/privacy-policy/page.tsx">Referring website addresses</span></li>
                </ul>
              </section>

              <section id="use-of-information" className="mb-10" data-unique-id="7d80a71f-a470-4d56-b471-80eae196fcec" data-file-name="app/privacy-policy/page.tsx">
                <h2 className="text-2xl font-bold mb-4" data-unique-id="9a8d5297-4112-45f8-94c5-8c13d8a0a2a9" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="11c394ac-83f4-4a43-b679-7cb972a78f5f" data-file-name="app/privacy-policy/page.tsx">How We Use Your Information</span></h2>
                <p className="mb-4" data-unique-id="b7136032-173b-4360-8d17-dcb98db20e4d" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="c18c2a75-1adb-4644-921e-886189e2b20d" data-file-name="app/privacy-policy/page.tsx">
                  We may use the information we collect from you for various purposes, including to:
                </span></p>
                <ul className="list-disc pl-6 mb-4 space-y-2" data-unique-id="893c113c-bdb7-4dc3-9789-bd5985349617" data-file-name="app/privacy-policy/page.tsx">
                  <li data-unique-id="11818d85-6ba1-4d3d-aa9f-608fcc23ee51" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="1668858a-8e20-4430-a71d-5bbbc271d6e0" data-file-name="app/privacy-policy/page.tsx">Process transactions and bookings</span></li>
                  <li data-unique-id="74d5bf8a-40b8-4362-ab16-5b22531a43d8" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="a0fe13bd-eb62-4edc-af60-e6b067b17a05" data-file-name="app/privacy-policy/page.tsx">Send administrative information</span></li>
                  <li data-unique-id="8d4eef0a-a6bb-4c33-a5ed-720a3f6fb43e" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="e954ee07-127e-4ea8-aa79-df41bba2c91a" data-file-name="app/privacy-policy/page.tsx">Send promotional communications (with your consent)</span></li>
                  <li data-unique-id="711b0f6c-6309-43a7-9243-2d5c9d540c62" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="6eb8135c-83ce-483b-845f-cc91854c347c" data-file-name="app/privacy-policy/page.tsx">Respond to inquiries and offer support</span></li>
                  <li data-unique-id="511963cc-ca56-4053-9f61-f4b8b4ba21a2" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="28c87922-7817-4c1a-ba02-10b0737257d3" data-file-name="app/privacy-policy/page.tsx">Facilitate participation in events</span></li>
                  <li data-unique-id="8940f37f-c003-480e-9139-c7a5773ea425" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="e6c1b95f-fb1f-4500-82be-8432534d4737" data-file-name="app/privacy-policy/page.tsx">Improve our website and services</span></li>
                  <li data-unique-id="9e7334a4-256b-4775-9475-82b88d5fdf75" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="f17ab532-fdbe-4ee7-85c5-c168d284e580" data-file-name="app/privacy-policy/page.tsx">Ensure the security of our services</span></li>
                </ul>
              </section>

              <section id="information-sharing" className="mb-10" data-unique-id="0c07dee9-8f00-41ef-9c9f-d9e0fa999049" data-file-name="app/privacy-policy/page.tsx">
                <h2 className="text-2xl font-bold mb-4" data-unique-id="acc23752-e0cf-4121-8ca9-7a70774bd7b2" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="031abf05-5955-4ff8-b8ba-781c94d00650" data-file-name="app/privacy-policy/page.tsx">Information Sharing</span></h2>
                <p className="mb-4" data-unique-id="7a6872e7-2d47-4f41-a5cc-f9a3fb61fef2" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="57d8d6b0-b49a-4aaf-af59-fb8c7fe3bc0d" data-file-name="app/privacy-policy/page.tsx">
                  We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:
                </span></p>
                <ul className="list-disc pl-6 mb-4 space-y-2" data-unique-id="ab864683-7955-4ebd-a082-641012fba516" data-file-name="app/privacy-policy/page.tsx">
                  <li data-unique-id="de166062-9b88-499c-9840-5cceccbedd49" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="d9b91db0-bd15-44dc-9f7e-912937de817f" data-file-name="app/privacy-policy/page.tsx">To trusted third parties who assist us in operating our website, conducting our business, or servicing you</span></li>
                  <li data-unique-id="7ff90659-7676-44d0-a534-ca276210dcaa" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="ce0d52f3-37da-41b0-8a88-29a0c155655a" data-file-name="app/privacy-policy/page.tsx">When required by law or to protect our legal rights</span></li>
                  <li data-unique-id="1b46c9aa-4ebc-471a-ba04-99398c8f05f7" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="a9d3ea0d-bf29-4f1a-aad8-aef46daf7750" data-file-name="app/privacy-policy/page.tsx">To enforce our website policies</span></li>
                  <li data-unique-id="2c56d4c7-17e2-47d3-9365-b985351603a8" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="d90e123e-a356-43a7-bb9c-74d41f3cd1fa" data-file-name="app/privacy-policy/page.tsx">To protect the safety or rights of others</span></li>
                </ul>
              </section>

              <section id="data-security" className="mb-10" data-unique-id="f54d08b6-924d-4e5c-93fa-0450887333df" data-file-name="app/privacy-policy/page.tsx">
                <h2 className="text-2xl font-bold mb-4" data-unique-id="686415c0-0ec1-496b-a8f3-839772ebd668" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="e387289e-d37c-4c70-a9d2-16ff19b72fd1" data-file-name="app/privacy-policy/page.tsx">Data Security</span></h2>
                <p className="mb-4" data-unique-id="fda9c299-5763-4bf3-aa02-43233005f396" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="0649ac8f-6b58-4760-bc8a-9fd6d683c4a5" data-file-name="app/privacy-policy/page.tsx">
                  We implement appropriate technical and organizational measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
                </span></p>
              </section>

              <section id="your-rights" className="mb-10" data-unique-id="1f8e3023-54ce-46c0-932a-61621981d098" data-file-name="app/privacy-policy/page.tsx">
                <h2 className="text-2xl font-bold mb-4" data-unique-id="c5918e1b-16ba-4680-aae9-d18de3d8d211" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="90b3132c-ff9f-4d2f-a23b-46fe1da42492" data-file-name="app/privacy-policy/page.tsx">Your Rights</span></h2>
                <p className="mb-4" data-unique-id="3d5c2761-96d2-4a07-ae38-a29a49c9424d" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="4391f65f-f9cd-4ade-a6a1-8a6bc4e9ea86" data-file-name="app/privacy-policy/page.tsx">
                  You have certain rights regarding your personal information, including:
                </span></p>
                <ul className="list-disc pl-6 mb-4 space-y-2" data-unique-id="acd55caf-d47f-43a6-8645-e4fac2c7c190" data-file-name="app/privacy-policy/page.tsx">
                  <li data-unique-id="6bcf0d5f-1d02-4930-bd31-b300bdb2363d" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="28c06341-830f-4902-a7af-1025cd724392" data-file-name="app/privacy-policy/page.tsx">The right to access the personal information we hold about you</span></li>
                  <li data-unique-id="002f2044-4d4f-4053-b770-7e899ea87a38" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="57d695e8-a8da-471d-a6fd-7ef982c5403d" data-file-name="app/privacy-policy/page.tsx">The right to request correction of inaccurate information</span></li>
                  <li data-unique-id="93ba6232-ef94-40a3-9f20-18dd41e025cb" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="0bdeb273-b3f1-418f-b647-c363d5f0893d" data-file-name="app/privacy-policy/page.tsx">The right to request deletion of your information</span></li>
                  <li data-unique-id="9653f725-b1a9-4416-bab9-f0c98a1e6d7d" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="8139857a-6dbc-44f0-ac7e-ff2b8282ce64" data-file-name="app/privacy-policy/page.tsx">The right to opt out of marketing communications</span></li>
                </ul>
              </section>

              <section id="cookie-policy" className="mb-10" data-unique-id="b79a46c6-bcda-42ac-a35d-20493f9d7d13" data-file-name="app/privacy-policy/page.tsx">
                <h2 className="text-2xl font-bold mb-4" data-unique-id="d69da6aa-c004-4de6-8532-79fbcda72b5c" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="725f3f26-755d-4052-8fa6-d94fedf42328" data-file-name="app/privacy-policy/page.tsx">Cookie Policy</span></h2>
                <p className="mb-4" data-unique-id="05cd38cb-c353-4d01-b5b1-be8d9b4c6a78" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="8d7f961e-023f-418b-834f-6609b257a14d" data-file-name="app/privacy-policy/page.tsx">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amounts of data that may include an anonymous unique identifier.
                </span></p>
                <p className="mb-4" data-unique-id="9433fe5d-0c91-438a-98bd-d4470ea6f3d7" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="bb1afc4e-8daa-4c98-8c09-4b2f9e32c87f" data-file-name="app/privacy-policy/page.tsx">
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </span></p>
              </section>

              <section id="changes-to-policy" className="mb-10" data-unique-id="61827e46-05ed-4f8a-8e71-77fd4ee2374a" data-file-name="app/privacy-policy/page.tsx">
                <h2 className="text-2xl font-bold mb-4" data-unique-id="9ec54e11-35af-47ef-9381-9ee036a72070" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="d6247483-98d3-4fe3-9a15-ebaa2709f7de" data-file-name="app/privacy-policy/page.tsx">Changes to This Privacy Policy</span></h2>
                <p className="mb-4" data-unique-id="5e107f18-1b36-45a7-a091-a79332eaeb4b" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="4674edf8-1634-4e19-9c46-3cf87f3d0853" data-file-name="app/privacy-policy/page.tsx">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </span></p>
                <p className="mb-4" data-unique-id="bdbdffc4-6c56-4a38-8dc5-c37ae70d31b5" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="edda0c87-a581-43c1-bb50-671767ccd756" data-file-name="app/privacy-policy/page.tsx">
                  You are advised to review this Privacy Policy periodically for any changes.
                </span></p>
              </section>

              <section id="contact-us" data-unique-id="3f719715-c7d7-49bd-8f35-7a7fb45e6a6c" data-file-name="app/privacy-policy/page.tsx">
                <h2 className="text-2xl font-bold mb-4" data-unique-id="e7eac3d8-1bf6-48f1-93a1-ecd125070e93" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="95734a8b-e3e5-4150-9076-b27f8695c383" data-file-name="app/privacy-policy/page.tsx">Contact Us</span></h2>
                <p className="mb-4" data-unique-id="0dc868ed-7105-43ea-9a40-743bf720a3f0" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="3a9047ba-ca0e-4e03-8846-3dec40a4eb87" data-file-name="app/privacy-policy/page.tsx">
                  If you have any questions about this Privacy Policy, please contact us at:
                </span></p>
                <address className="not-italic" data-unique-id="9e4fcd85-a00c-4aba-98de-9915f4f6aed6" data-file-name="app/privacy-policy/page.tsx">
                  <p data-unique-id="61e36659-6482-4f8b-a214-54f4cf47c05d" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="f9544868-e74b-4793-8b42-c7c74558128d" data-file-name="app/privacy-policy/page.tsx">Nagaland Pickleball Association</span></p>
                  <p data-unique-id="5ea0ebfc-5915-4861-883d-c260c32a1ab2" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="1baf0f35-5c22-494b-b2d9-751e52207c4f" data-file-name="app/privacy-policy/page.tsx">132B Darogapathar , Dimapur , Nagaland 797115
                  </span></p>
                  <p data-unique-id="fb0d2ab8-c0db-4e69-b5f9-ab9bda161b20" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="ef788f74-e5e4-474a-a133-53d40aee32f4" data-file-name="app/privacy-policy/page.tsx">Email: pickleballnagaland@gmail.com</span></p>
                  <p data-unique-id="a8b25edf-ae9f-4ee7-8949-a21e81761c48" data-file-name="app/privacy-policy/page.tsx"><span className="editable-text" data-unique-id="737946f3-ede1-43f7-8af6-35ff7d234a2f" data-file-name="app/privacy-policy/page.tsx">Phone: +91 8837402472</span></p>
                </address>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>;
}