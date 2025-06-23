import "@/styles/globals.css";
import React from "react";
import { Poppins, Inter } from 'next/font/google';
import { type Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from "@/lib/auth";
import { RootLayoutWrapper } from "@/components/layout/root-layout-wrapper";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export const metadata: Metadata = {
  title: {
    default: "Nagaland Pickleball Association",
    template: "%s | Nagaland Pickleball Association"
  },
  description: "Promoting pickleball across Nagaland through community events, coaching, and accessible court facilities.",
  applicationName: "NPA",
  keywords: ["pickleball", "nagaland", "sports", "community", "courts", "tournaments"],
  authors: [{
    name: "Nagaland Pickleball Association"
  }],
  creator: "Nagaland Pickleball Association",
  publisher: "Nagaland Pickleball Association",
  icons: {
    icon: [{
      url: "/NPA-logo.png",
      sizes: "16x16",
      type: "image/png"
    }, {
      url: "/NPA-logo.png",
      sizes: "32x32",
      type: "image/png"
    }, {
      url: "/NPA-logo.png",
      sizes: "48x48",
      type: "image/x-icon"
    }],
    apple: [{
      url: "/NPA-logo.png",
      sizes: "180x180",
      type: "image/png"
    }]
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NPA"
  },
  formatDetection: {
    telephone: false
  }
};

// Define fonts
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap'
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <RootLayoutWrapper>
              {children}
            </RootLayoutWrapper>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}