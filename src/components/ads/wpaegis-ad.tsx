"use client"

import Link from "next/link"
import { Shield, Lock, Zap, CheckCircle, ArrowRight, Star } from "lucide-react"

export default function WPAegisAd() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl border border-blue-500/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Primary gradient orbs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-40" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce opacity-50" style={{animationDelay: '2s'}}></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>

      {/* Floating Security Icons */}
      <div className="absolute top-6 right-6 opacity-10 animate-pulse">
        <Shield className="w-12 h-12 text-cyan-300" />
      </div>
      <div className="absolute bottom-6 left-6 opacity-10 animate-pulse" style={{animationDelay: '1s'}}>
        <Lock className="w-8 h-8 text-purple-300" />
      </div>

      <div className="relative z-10">
        {/* Premium Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold mb-4 shadow-lg">
          <Star className="w-3 h-3 mr-1 fill-current" />
          PREMIUM SECURITY
        </div>

        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-3 rounded-2xl mr-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              WPAegis
            </h3>
            <p className="text-blue-200 text-sm font-medium">Enterprise WordPress Security</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-6">
          <h4 className="text-xl font-bold mb-4 leading-tight">
            Fortify Your WordPress Site Against
            <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent"> Cyber Threats</span>
          </h4>
          <p className="text-gray-300 mb-6 leading-relaxed text-sm">
            Advanced security suite with AI-powered threat detection, automated malware removal,
            enterprise firewall, and round-the-clock monitoring. Protect against hackers, DDoS,
            and zero-day vulnerabilities.
          </p>

          {/* Enhanced Features Grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-medium">AI Threat Detection</span>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-medium">Auto Malware Removal</span>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-medium">Enterprise Firewall</span>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs font-medium">24/7 Monitoring</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full shadow-lg">
            <Zap className="w-4 h-4 mr-2 text-black" />
            <span className="text-black text-sm font-bold">From $9.99/month</span>
          </div>

          <Link
            href="https://wpaegis.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-8 py-4 rounded-2xl font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center text-white shadow-xl border border-cyan-400/30"
          >
            <Shield className="mr-3 w-5 h-5" />
            Secure My Site
            <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Enhanced Shine Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 skew-x-12 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100" />
    </div>
  )
}