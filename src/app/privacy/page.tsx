import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Mail } from "lucide-react"

export const metadata = {
  title: "Privacy Policy - Tools Hub",
  description: "Learn how Tools Hub protects your privacy. We process all text locally in your browser and never store or transmit your data.",
  keywords: "privacy policy, data protection, privacy, tools hub",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we handle your data
            when you use Tools Hub.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Eye className="h-6 w-6 text-primary" />
              <CardTitle>Privacy Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p className="text-lg font-medium text-green-600">
              🔒 Your text data never leaves your browser. All processing is done locally.
            </p>
            <p>
              Tools Hub is designed with privacy as a core principle. Unlike many online tools, 
              we process all your text data locally in your browser using JavaScript. This means:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>We never see, store, or transmit your text data</li>
              <li>Your sensitive information stays completely private</li>
              <li>No server-side processing of your content</li>
              <li>No data collection or tracking of your text usage</li>
            </ul>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Text Data</h3>
              <p>
                <strong>We do NOT collect, store, or transmit any text data you enter into our tools.</strong> 
                All text processing happens entirely in your browser using client-side JavaScript. 
                Your text never reaches our servers.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Usage Analytics</h3>
              <p>
                We may collect basic, anonymous usage statistics such as:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Page views and tool usage (without content)</li>
                <li>Browser type and version</li>
                <li>Device type (desktop, mobile, tablet)</li>
                <li>General geographic location (country level)</li>
                <li>Referral sources</li>
              </ul>
              <p className="mt-2">
                This data is aggregated and anonymous, used only to improve our services.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Cookies and Local Storage</h3>
              <p>
                We may use cookies and local storage for:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                <li>Remembering your preferences (theme, settings)</li>
                <li>Analytics and performance monitoring</li>
                <li>Advertising (Google AdSense)</li>
              </ul>
              <p className="mt-2">
                You can disable cookies in your browser settings, though this may affect functionality.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How We Use Information</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300 space-y-4">
            <p>The limited information we collect is used to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Improve our tools and user experience</li>
              <li>Monitor website performance and fix issues</li>
              <li>Understand which tools are most popular</li>
              <li>Display relevant advertisements (Google AdSense)</li>
              <li>Comply with legal requirements</li>
            </ul>
            <p className="font-medium">
              We never sell, rent, or share your personal information with third parties 
              except as described in this policy.
            </p>
          </CardContent>
        </Card>

        {/* Third-Party Services */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Third-Party Services</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Google AdSense</h3>
              <p>
                We use Google AdSense to display advertisements. Google may use cookies 
                to serve ads based on your visits to this and other websites. You can 
                opt out of personalized advertising by visiting Google's 
                <a href="https://www.google.com/settings/ads" className="text-primary hover:underline ml-1">
                  Ads Settings
                </a>.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Analytics Services</h3>
              <p>
                We may use analytics services like Google Analytics to understand how 
                visitors use our website. These services may collect information about 
                your visits, but not the content you process with our tools.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300 space-y-4">
            <p>
              Since we don't collect or store your text data, there's no risk of your 
              sensitive content being compromised in a data breach. Your text processing 
              happens entirely in your browser.
            </p>
            <p>
              For the limited data we do collect (analytics), we implement appropriate 
              security measures to protect against unauthorized access, alteration, 
              disclosure, or destruction.
            </p>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Know what personal information we collect and how it's used</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of data collection where possible</li>
              <li>Disable cookies in your browser</li>
              <li>Contact us with privacy concerns</li>
            </ul>
          </CardContent>
        </Card>

        {/* Children's Privacy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            <p>
              Our services are not directed to children under 13. We do not knowingly 
              collect personal information from children under 13. If you are a parent 
              or guardian and believe your child has provided us with personal information, 
              please contact us.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Policy */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            <p>
              We may update this privacy policy from time to time. We will notify you 
              of any changes by posting the new policy on this page and updating the 
              "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Mail className="h-6 w-6 text-primary" />
              <CardTitle>Contact Us</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-gray-600">
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, 
              please contact us:
            </p>
            <div className="mt-4 space-y-2">
              <p><strong>Email:</strong> privacy@toolshub.com</p>
              <p><strong>Website:</strong> <a href="/contact" className="text-primary hover:underline">Contact Form</a></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}