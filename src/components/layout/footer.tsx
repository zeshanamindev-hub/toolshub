import Link from "next/link"
import { Wrench } from "lucide-react"

const footerNavigation = {
  tools: [
    { name: "Word Counter", href: "/tools/word-counter" },
    { name: "Character Counter", href: "/tools/character-counter" },
    { name: "Case Converter", href: "/tools/case-converter" },
    { name: "Remove Spaces", href: "/tools/remove-spaces" },
    { name: "Reverse Text", href: "/tools/reverse-text" },
    { name: "Text to Morse", href: "/tools/text-to-morse" },
    { name: "Morse to Text", href: "/tools/morse-to-text" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-2">
              <Wrench className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900">Tools Hub</span>
            </div>
            <p className="text-sm text-gray-600">
              Your go-to destination for essential text manipulation tools. 
              Fast, reliable, and completely free to use.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  Tools
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerNavigation.tools.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  Company
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-600 text-center">
            &copy; {new Date().getFullYear()} Tools Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}