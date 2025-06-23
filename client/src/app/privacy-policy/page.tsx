"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy – Pickleball Nagaland</h1>
      <p className="mb-2 text-sm text-gray-500">Effective Date: [Insert Date]</p>
      <p className="mb-4">Pickleball Nagaland respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and safeguard your data.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li><b>Personal Information:</b> Name, email address, phone number, and any other details submitted through registration or contact forms.</li>
        <li><b>Usage Data:</b> Information on how you interact with our website, including pages visited, time spent, and device/browser details.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To provide event updates and communicate important announcements.</li>
        <li>To process registrations and manage participation.</li>
        <li>To improve our website's performance and user experience.</li>
        <li>To respond to inquiries and feedback.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing and Security</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>We do not sell or rent personal information to third parties.</li>
        <li>We may share information with trusted service providers only for purposes directly related to our operations.</li>
        <li>We implement reasonable security measures to protect your data.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies and Tracking Technologies</h2>
      <p className="mb-4">Our website may use cookies to enhance your experience. You can control cookie preferences through your browser settings.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">You may request access, correction, or deletion of your personal data by contacting us at <b>[Insert Email Address]</b>.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">6. Changes to This Policy</h2>
      <p className="mb-4">This policy may be updated periodically. We encourage you to review it regularly.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">7. Contact Us</h2>
      <p>Email: <b>nagalandpickleball@gmail.com</b></p>
      <p>Phone: <b>+91 8837402472</b></p>
      <p>Address: <b>132B Darogapathar,Dimapur,Nagaland 797115</b></p>
    </div>
  );
}