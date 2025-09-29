import Link from "next/link"
import { Wrench } from "lucide-react"
import { NAVIGATION_LINKS, SITE_CONFIG } from "@/lib/constants"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-12">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="relative p-3 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-2xl shadow-lg">
                <Wrench className="h-8 w-8 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  Tools Hub
                </span>
                <span className="text-sm font-medium text-gray-500 -mt-1">
                  Professional Online Tools
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-base text-gray-600 leading-relaxed">
                Your go-to destination for {SITE_CONFIG.toolCount}+ professional online tools. 
                Fast, secure, and completely free to use - no registration required.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">100% Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Privacy First</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">No Signup</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-8 xl:col-span-2 xl:mt-0">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase border-b border-gray-300 pb-2">
                Text Tools
              </h3>
              <ul role="list" className="space-y-3">
                {NAVIGATION_LINKS.footer.textTools.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-primary transition-all duration-200 hover:translate-x-1 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase border-b border-gray-300 pb-2">
                Converters
              </h3>
              <ul role="list" className="space-y-3">
                {NAVIGATION_LINKS.footer.converters.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-primary transition-all duration-200 hover:translate-x-1 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase border-b border-gray-300 pb-2">
                Generators
              </h3>
              <ul role="list" className="space-y-3">
                {NAVIGATION_LINKS.footer.generators.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-primary transition-all duration-200 hover:translate-x-1 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase border-b border-gray-300 pb-2">
                Developers
              </h3>
              <ul role="list" className="space-y-3">
                {NAVIGATION_LINKS.footer.developers.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-primary transition-all duration-200 hover:translate-x-1 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase border-b border-gray-300 pb-2">
                Company
              </h3>
              <ul role="list" className="space-y-3">
                {NAVIGATION_LINKS.footer.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-primary transition-all duration-200 hover:translate-x-1 flex items-center group"
                    >
                      <span className="w-1 h-1 bg-gray-400 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} Tools Hub. All rights reserved.
              </p>
              <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-500">Made with</span>
                <span className="text-red-500 animate-pulse">❤️</span>
                <span className="text-sm text-gray-500">for developers</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                {SITE_CONFIG.toolCount}+ Tools Available
              </div>
              <div className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                100% Free Forever
              </div>
              <div className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                Privacy Protected
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}