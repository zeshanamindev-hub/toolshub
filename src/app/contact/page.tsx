import { Metadata } from "next"
import { SITE_CONFIG } from "@/lib/constants"
import ContactClient from "./client"

export const metadata: Metadata = {
  title: "Contact Us | Get Help & Support - Tools Hub",
  description: "Contact Tools Hub for support, feedback, feature requests, or bug reports. We're here to help! Get in touch via email or our contact form. Response within 24-48 hours.",
  keywords: [
    "contact tools hub",
    "customer support",
    "feedback",
    "bug report",
    "feature request",
    "help center",
    "technical support"
  ],
  authors: [{ name: "Tools Hub" }],
  creator: "Tools Hub",
  publisher: "Tools Hub",
  openGraph: {
    title: "Contact Us | Tools Hub Support",
    description: "Need help or have feedback? Contact our team for support, feature requests, or bug reports. We typically respond within 24-48 hours.",
    url: `${SITE_CONFIG.url}/contact`,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Tools Hub",
    description: "Get in touch for support, feedback, or feature requests.",
    creator: "@toolshub",
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
}

export default function ContactPage() {
  return <ContactClient />
}
