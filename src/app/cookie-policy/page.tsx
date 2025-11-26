import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie, Settings, Eye, Mail } from "lucide-react"

export const metadata = {
  title: "Cookie Policy - Tools Hub",
  description:
    "Learn about how Tools Hub uses cookies to improve your experience. Information about cookies, tracking, and how to manage your preferences.",
  keywords: "cookie policy, cookies, tracking, privacy, tools hub",
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Cookie className="h-12 w-12 text-orange-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Cookie Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            This Cookie Policy explains what cookies are, how we use them, and
            your choices regarding cookies on Tools Hub.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* What Are Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What Are Cookies?</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300 space-y-4">
            <p>
              Cookies are small text files that are stored on your device
              (computer, tablet, or mobile) when you visit a website. They are
              widely used to make websites work more efficiently and provide
              information to the site owners.
            </p>
            <p>
              Cookies help websites remember your preferences, understand how
              you use the site, and improve your overall browsing experience.
              They cannot access other files on your device or run programs.
            </p>
          </CardContent>
        </Card>

        {/* How We Use Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Eye className="h-6 w-6 text-blue-600" />
              <CardTitle>How We Use Cookies</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300 space-y-4">
            <p>
              Tools Hub uses cookies and similar technologies for several
              purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Essential Cookies:</strong> Required for the website to
                function properly
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and
                choices (theme, language)
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how
                visitors use our site
              </li>
              <li>
                <strong>Advertising Cookies:</strong> Used to deliver relevant
                ads (Google AdSense)
              </li>
            </ul>
            <p className="text-sm bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <strong>Important:</strong> We do NOT use cookies to track or
              store the actual text content you process with our tools. All
              text processing happens locally in your browser.
            </p>
          </CardContent>
        </Card>

        {/* Types of Cookies We Use */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Types of Cookies We Use</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300 space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                1. Essential Cookies
              </h3>
              <p>
                These cookies are necessary for the website to function and
                cannot be switched off. They are usually set in response to
                your actions, such as setting privacy preferences or filling in
                forms.
              </p>
              <p className="mt-2 text-sm">
                <strong>Duration:</strong> Session or Persistent
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                2. Preference Cookies
              </h3>
              <p>
                These cookies allow the website to remember your choices (such
                as dark/light theme) and provide enhanced features. They do not
                track your browsing activity on other websites.
              </p>
              <p className="mt-2 text-sm">
                <strong>Duration:</strong> Persistent (up to 1 year)
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                3. Analytics Cookies
              </h3>
              <p>
                We use Google Analytics to collect anonymous information about
                how visitors use our site. This helps us improve the user
                experience. These cookies collect information such as:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Number of visitors to the site</li>
                <li>Which pages are most popular</li>
                <li>How long visitors stay on pages</li>
                <li>General geographic location (country level)</li>
              </ul>
              <p className="mt-2 text-sm">
                <strong>Duration:</strong> Up to 2 years
              </p>
              <p className="mt-2 text-sm">
                <strong>Provider:</strong> Google Analytics
              </p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                4. Advertising Cookies
              </h3>
              <p>
                We use Google AdSense to display advertisements on our site.
                Google may use cookies to serve ads based on your prior visits
                to this website and other sites on the internet. These cookies:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Help show you relevant advertisements</li>
                <li>Prevent the same ad from appearing too frequently</li>
                <li>
                  May track your browsing across multiple websites (third-party)
                </li>
              </ul>
              <p className="mt-2 text-sm">
                <strong>Duration:</strong> Up to 2 years
              </p>
              <p className="mt-2 text-sm">
                <strong>Provider:</strong> Google AdSense
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Third-Party Cookies</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300 space-y-4">
            <p>
              Some cookies on our site are set by third-party services that
              appear on our pages:
            </p>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Google AdSense
              </h4>
              <p>
                Google uses cookies to serve ads that are relevant to you.
                Google's use of advertising cookies enables it and its partners
                to serve ads based on your visits to our site and/or other
                sites on the internet.
              </p>
              <p className="mt-2">
                Learn more about Google's advertising cookies:{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Advertising Policies
                </a>
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Google Analytics
              </h4>
              <p>
                We use Google Analytics to analyze website traffic. Google
                Analytics uses cookies to collect anonymous information about
                how visitors interact with our site.
              </p>
              <p className="mt-2">
                Learn more about Google Analytics cookies:{" "}
                <a
                  href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Analytics Cookie Usage
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How to Manage Cookies */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Settings className="h-6 w-6 text-blue-600" />
              <CardTitle>How to Manage and Control Cookies</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300 space-y-4">
            <p>
              You have the right to choose whether to accept or reject cookies.
              You can manage your cookie preferences in several ways:
            </p>

            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Browser Settings
              </h4>
              <p>
                Most web browsers allow you to control cookies through their
                settings. You can set your browser to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Block all cookies</li>
                <li>Accept only first-party cookies</li>
                <li>Delete cookies when you close your browser</li>
                <li>Notify you when a website tries to set a cookie</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Browser-Specific Instructions
              </h4>
              <ul className="space-y-2 ml-4">
                <li>
                  <strong>Chrome:</strong>{" "}
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Manage cookies in Chrome
                  </a>
                </li>
                <li>
                  <strong>Firefox:</strong>{" "}
                  <a
                    href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Manage cookies in Firefox
                  </a>
                </li>
                <li>
                  <strong>Safari:</strong>{" "}
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Manage cookies in Safari
                  </a>
                </li>
                <li>
                  <strong>Edge:</strong>{" "}
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Manage cookies in Edge
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                Opt-Out of Personalized Advertising
              </h4>
              <p>You can opt out of personalized advertising by visiting:</p>
              <ul className="space-y-2 ml-4 mt-2">
                <li>
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Google Ads Settings
                  </a>
                </li>
                <li>
                  <a
                    href="https://optout.aboutads.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Digital Advertising Alliance Opt-Out
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youronlinechoices.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Your Online Choices (EU)
                  </a>
                </li>
              </ul>
            </div>

            <p className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-sm">
              <strong>Note:</strong> Blocking or deleting cookies may affect
              your browsing experience and some features of our website may not
              function properly.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Cookie Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Changes to This Cookie Policy</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            <p>
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by
              posting the new policy on this page and updating the "Last
              updated" date above.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Mail className="h-6 w-6 text-blue-600" />
              <CardTitle>Questions About Cookies?</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            <p>
              If you have any questions about our use of cookies or this Cookie
              Policy, please contact us:
            </p>
            <div className="mt-4 space-y-2">
              <p>
                <strong>Email:</strong> privacy@toolshub.com
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href="/contact" className="text-blue-600 hover:underline">
                  Contact Form
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
