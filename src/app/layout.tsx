import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Word Counter Tool - Free Online Text Analysis",
  description: "Fast and accurate word counter tool. Count words, characters, sentences, and paragraphs instantly. Perfect for writers, students, and content creators.",
  keywords: ["word counter", "character counter", "text analysis", "writing tools", "word count", "text counter"],
  authors: [{ name: "Word Counter Tool" }],
  creator: "Word Counter Tool",
  publisher: "Word Counter Tool",
  openGraph: {
    title: "Word Counter Tool - Free Online Text Analysis",
    description: "Fast and accurate word counter tool. Count words, characters, sentences, and paragraphs instantly. Perfect for writers, students, and content creators.",
    type: "website",
    locale: "en_US",
    siteName: "Word Counter Tool",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Counter Tool - Free Online Text Analysis",
    description: "Fast and accurate word counter tool. Count words, characters, sentences, and paragraphs instantly. Perfect for writers, students, and content creators.",
    creator: "@wordcountertool",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token_here",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
