"use client"

import Link from "next/link"
import { Wrench } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

export default function Footer() {
  const quickLinks = [
    { name: "All Tools", href: "/tools" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ]

  return (
    <footer className="relative overflow-hidden bg-blue-50 border-t border-gray-200">
      {/* Subtle decorative orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100 opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-100 opacity-10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Brand Section */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 group mb-4">
              <div className="relative p-2.5 bg-blue-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-500 ease-out group-hover:scale-110">
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black text-blue-600">
                Tools Hub
              </span>
            </Link>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              {SITE_CONFIG.toolCount}+ professional online tools. Fast, secure, and completely free.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Launch Platform Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <a href="https://wired.business" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-105">
              <img src="https://wired.business/badge0-dark.svg" alt="Featured on Wired Business" width="200" height="54" />
            </a>
            <a href="https://www.nxgntools.com/tools/tools-hub" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-105">
              <img src="https://www.nxgntools.com/api/embed/tools-hub?type=FIND_US_ON" alt="NextGen Tools Badge" style={{height: '48px', width: 'auto'}} />
            </a>
            <a href="https://twelve.tools" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-105">
              <img src="https://twelve.tools/badge0-white.svg" alt="Featured on Twelve Tools" width="200" height="54" />
            </a>
            <a href="https://www.producthunt.com/products/tools-hub?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-tools-hub" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-105">
              <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1042435&theme=light&t=1764168744810" alt="Tools Hub - Free online text tools & utilities | word counter etc | Product Hunt" style={{width: '250px', height: '54px'}} width="250" height="54" />
            </a>
          </div>

          {/* Bottom Section */}
          <div className="pt-6 border-t border-gray-200 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-gray-600">
              <p>&copy; {new Date().getFullYear()} Tools Hub. All rights reserved.</p>
              <span className="hidden sm:inline text-gray-400">•</span>
              <div className="flex items-center gap-1.5">
                <span>Made with</span>
                <span className="text-red-500 text-base">❤️</span>
                <span>for developers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
