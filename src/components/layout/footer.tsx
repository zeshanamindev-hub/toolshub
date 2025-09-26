import Link from "next/link"
import { Wrench } from "lucide-react"

const footerNavigation = {
  textTools: [
    { name: "Word Counter", href: "/tools/word-counter" },
    { name: "Character Counter", href: "/tools/character-counter" },
    { name: "Case Converter", href: "/tools/case-converter" },
    { name: "Remove Spaces", href: "/tools/remove-spaces" },
    { name: "Reverse Text", href: "/tools/reverse-text" },
    { name: "Line Sorter", href: "/tools/line-sorter" },
    { name: "Text Diff Checker", href: "/tools/text-diff-checker" },
    { name: "Text Extractor", href: "/tools/text-extractor" },
  ],
  converters: [
    { name: "URL Encoder/Decoder", href: "/tools/url-encoder" },
    { name: "Base64 Converter", href: "/tools/base64-converter" },
    { name: "BMI Calculator", href: "/tools/bmi-calculator" },
    { name: "JSON Formatter", href: "/tools/json-formatter" },
    { name: "Text to ASCII", href: "/tools/text-to-ascii" },
    { name: "ASCII to Text", href: "/tools/ascii-to-text" },
    { name: "HTML Entities", href: "/tools/html-entities" },
    { name: "Text to Morse", href: "/tools/text-to-morse" },
    { name: "Morse to Text", href: "/tools/morse-to-text" },
  ],
  generators: [
    { name: "Password Generator", href: "/tools/password-generator" },
    { name: "Hash Generator", href: "/tools/hash-generator" },
    { name: "QR Code Generator", href: "/tools/qr-generator" },
    { name: "Lorem Ipsum Generator", href: "/tools/lorem-ipsum-generator" },
    { name: "Color Palette Generator", href: "/tools/color-palette-generator" },
    { name: "Random String", href: "/tools/random-string" },
  ],
  developers: [
    { name: "Regex Tester", href: "/tools/regex-tester" },
    { name: "Timestamp Converter", href: "/tools/timestamp-converter" },
    { name: "Letter Counter", href: "/tools/letter-counter" },
    { name: "CSS Minifier", href: "/tools/css-minifier" },
    { name: "JS Minifier", href: "/tools/js-minifier" },
    { name: "Percentage Calculator", href: "/tools/percentage-calculator" },
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
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Text Tools
              </h3>
              <ul role="list" className="mt-4 space-y-3">
                {footerNavigation.textTools.map((item) => (
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
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Converters
              </h3>
              <ul role="list" className="mt-4 space-y-3">
                {footerNavigation.converters.map((item) => (
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
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Generators
              </h3>
              <ul role="list" className="mt-4 space-y-3">
                {footerNavigation.generators.map((item) => (
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
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Developers
              </h3>
              <ul role="list" className="mt-4 space-y-3">
                {footerNavigation.developers.map((item) => (
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
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Company
              </h3>
              <ul role="list" className="mt-4 space-y-3">
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
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-600 text-center">
            &copy; {new Date().getFullYear()} Tools Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}