import "@/styles/globals.css";
import React from "react";
import { Poppins, Inter } from 'next/font/google';
import { type Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from "@/lib/auth";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export const metadata: Metadata = {
  title: {
    default: "Pickleball Association Nagaland",
    template: "%s | Pickleball Association Nagaland"
  },
  description: "Promoting pickleball across Nagaland through community events, coaching, and accessible court facilities.",
  applicationName: "PAN",
  keywords: ["pickleball", "nagaland", "sports", "community", "courts", "tournaments"],
  authors: [{
    name: "Pickleball Association Nagaland"
  }],
  creator: "Pickleball Association Nagaland",
  publisher: "Pickleball Association Nagaland",
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
    title: "PAN"
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
  return <html suppressHydrationWarning lang="en" className={`${poppins.variable} ${inter.variable}`} data-unique-id="9acd336b-e224-4731-bd48-86d62db54c18" data-file-name="app/layout.tsx">
    <body className="bg-background text-foreground antialiased min-h-screen flex flex-col" data-unique-id="d35276d9-8eb1-4a07-a0d6-5901df38ad32" data-file-name="app/layout.tsx">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow" data-unique-id="eb3f05f2-8739-4342-bbd5-66ab763345a3" data-file-name="app/layout.tsx" data-dynamic-text="true">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </body>
  </html>;
}