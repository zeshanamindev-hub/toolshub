import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BackToTop from "@/components/ui/back-to-top";

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Tools Hub",
  "url": "https://toolshub.com",
  "logo": "https://toolshub.com/favicon.ico",
  "description": "Tools Hub offers free online text manipulation and utility tools including word counter, character counter, case converter, password generator, JSON formatter, and more.",
  "foundingDate": "2024",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://toolshub.com/contact"
  },
  "sameAs": [
    "https://github.com/toolshub", // Replace with actual social media if available
    "https://twitter.com/toolshub"
  ],
  "offers": {
    "@type": "Offer",
    "category": "Software",
    "description": "Free online tools and utilities"
  }
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tools Hub - Free Online Text Tools & Utilities | Word Counter, JSON Formatter, Password Generator",
  description: "Tools Hub offers 44+ free online tools for text manipulation, development, and productivity. Word counter, JSON formatter, password generator, QR code generator, ASCII converter, and more. No registration required, works instantly in your browser.",
  keywords: "online tools, text tools, word counter, character counter, case converter, password generator, JSON formatter, QR code generator, ASCII converter, HTML entities, text manipulation, free tools, web utilities, developer tools",
  authors: [{ name: "Tools Hub" }],
  creator: "Tools Hub",
  publisher: "Tools Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://toolshub.com'),
  alternates: {
    canonical: 'https://toolshub.com',
  },
  openGraph: {
    title: "Tools Hub - 44+ Free Online Tools for Text, Development & Productivity",
    description: "Free online text tools including word counter, character counter, case converter, password generator, JSON formatter, QR code generator, and more. Fast, secure, no registration required.",
    url: 'https://toolshub.com',
    siteName: 'Tools Hub',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tools Hub - Free Online Text Tools and Utilities',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tools Hub - Free Online Tools & Utilities",
    description: "44+ free online tools for text manipulation, development, and productivity. Word counter, JSON formatter, password generator, and more.",
    images: ['/og-image.png'],
    creator: '@toolshub',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code', // Replace with actual code
  },
  category: 'technology',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-X4BXT9D1SX"
          strategy="worker"
        />
        <Script id="google-analytics" strategy="worker">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X4BXT9D1SX');
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="organization-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
