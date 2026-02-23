import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google"; // Import fonts
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import Navbar
import Footer from "@/components/Footer"; // Import Footer

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading", // Map to --font-heading
});

export const metadata: Metadata = {
  title: "NextStop - AI Powered Transit Ecosystem",
  description: "Sri Lanka's First AI-Powered Real-Time Transit Ecosystem. Predictability in Motion.",
  icons: {
    icon: "/nextstop-logo.png",
    shortcut: "/nextstop-logo.png",
    apple: "/nextstop-logo.png",
  },
  openGraph: {
    title: "NextStop - AI Powered Transit Ecosystem",
    description: "Sri Lanka's First AI-Powered Real-Time Transit Ecosystem. Predictability in Motion.",
    url: "https://nextstop-sl.vercel.app",
    siteName: "NextStop",
    images: [
      {
        url: "/nextstop-banner-og.png",
        width: 1200,
        height: 630,
        alt: "NextStop — AI Powered Transit Ecosystem",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextStop - AI Powered Transit Ecosystem",
    description: "Sri Lanka's First AI-Powered Real-Time Transit Ecosystem. Predictability in Motion.",
    images: ["/nextstop-banner-og.png"],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-black text-white relative overflow-x-hidden`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
