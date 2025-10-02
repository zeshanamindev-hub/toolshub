import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertTriangle, Scale, Mail } from "lucide-react"

export const metadata = {
  title: "Terms of Service - Tools Hub",
  description: "Read the Terms of Service for Tools Hub. Learn about acceptable use, limitations, and your rights when using our free text manipulation tools.",
  keywords: "terms of service, terms of use, legal, tools hub",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Please read these Terms of Service carefully before using Tools Hub.
            By using our services, you agree to these terms.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Acceptance of Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              By accessing and using Tools Hub ("the Service"), you accept and agree to be 
              bound by the terms and provision of this agreement. If you do not agree to 
              abide by the above, please do not use this service.
            </p>
            <p>
              These Terms of Service ("Terms") govern your use of our website located at 
              toolshub.com (the "Service") operated by Tools Hub ("us", "we", or "our").
            </p>
          </CardContent>
        </Card>

        {/* Description of Service */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>2. Description of Service</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              Tools Hub provides free online text manipulation tools including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Word Counter</li>
              <li>Character Counter</li>
              <li>Case Converter</li>
              <li>Remove Extra Spaces Tool</li>
              <li>Reverse Text Generator</li>
            </ul>
            <p>
              All tools process text locally in your browser and do not transmit your data 
              to our servers. The Service is provided free of charge.
            </p>
          </CardContent>
        </Card>

        {/* Acceptable Use */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>3. Acceptable Use</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to use the Service:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
              <li>To process illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable content</li>
              <li>To attempt to gain unauthorized access to our systems or networks</li>
              <li>To interfere with or disrupt the Service or servers connected to the Service</li>
              <li>To use automated systems (bots, scrapers) to access the Service excessively</li>
              <li>To reverse engineer, decompile, or attempt to extract source code</li>
            </ul>
          </CardContent>
        </Card>

        {/* Privacy and Data */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>4. Privacy and Data Processing</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              <strong>Your Privacy is Protected:</strong> All text processing happens locally 
              in your browser. We do not collect, store, or transmit the content you process 
              with our tools.
            </p>
            <p>
              We may collect anonymous usage statistics and use cookies for analytics and 
              advertising purposes. Please refer to our 
              <a href="/privacy" className="text-primary hover:underline ml-1">Privacy Policy</a> 
              for detailed information.
            </p>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>5. Intellectual Property Rights</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              The Service and its original content, features, and functionality are and will 
              remain the exclusive property of Tools Hub and its licensors. The Service is 
              protected by copyright, trademark, and other laws.
            </p>
            <p>
              You retain all rights to the text content you process using our tools. We claim 
              no ownership or rights to your content.
            </p>
          </CardContent>
        </Card>

        {/* Disclaimers */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <CardTitle>6. Disclaimers</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300 space-y-4">
            <p>
              <strong>AS IS BASIS:</strong> The Service is provided on an "AS IS" and "AS AVAILABLE" 
              basis. We make no representations or warranties of any kind, express or implied, 
              as to the operation of the Service or the information, content, or materials included therein.
            </p>
            <p>
              <strong>NO WARRANTIES:</strong> We disclaim all warranties, express or implied, including 
              but not limited to implied warranties of merchantability and fitness for a particular purpose.
            </p>
            <p>
              <strong>ACCURACY:</strong> While we strive for accuracy in our tools, we do not guarantee 
              that the results will be error-free or meet your specific requirements.
            </p>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>7. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              In no event shall Tools Hub, its directors, employees, partners, agents, suppliers, 
              or affiliates be liable for any indirect, incidental, special, consequential, or 
              punitive damages, including without limitation, loss of profits, data, use, goodwill, 
              or other intangible losses, resulting from your use of the Service.
            </p>
            <p>
              Our total liability to you for all claims arising from or relating to the Service 
              shall not exceed $100 USD.
            </p>
          </CardContent>
        </Card>

        {/* Indemnification */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>8. Indemnification</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 dark:text-gray-300">
            <p>
              You agree to defend, indemnify, and hold harmless Tools Hub and its licensee and 
              licensors, and their employees, contractors, agents, officers and directors, from 
              and against any and all claims, damages, obligations, losses, liabilities, costs 
              or debt, and expenses (including but not limited to attorney's fees).
            </p>
          </CardContent>
        </Card>

        {/* Termination */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>9. Termination</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              We may terminate or suspend your access immediately, without prior notice or liability, 
              for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will cease immediately.
            </p>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Scale className="h-6 w-6 text-primary" />
              <CardTitle>10. Governing Law</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-gray-600">
            <p>
              These Terms shall be interpreted and governed by the laws of the United States, 
              without regard to its conflict of law provisions. Our failure to enforce any right 
              or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>11. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 space-y-4">
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms 
              at any time. If a revision is material, we will try to provide at least 30 days 
              notice prior to any new terms taking effect.
            </p>
            <p>
              What constitutes a material change will be determined at our sole discretion. 
              By continuing to access or use our Service after those revisions become effective, 
              you agree to be bound by the revised terms.
            </p>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Mail className="h-6 w-6 text-primary" />
              <CardTitle>12. Contact Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-gray-600">
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 space-y-2">
              <p><strong>Email:</strong> legal@toolshub.com</p>
              <p><strong>Website:</strong> <a href="/contact" className="text-primary hover:underline">Contact Form</a></p>
            </div>
            <p className="mt-4 text-sm">
              By using Tools Hub, you acknowledge that you have read and understood these 
              Terms of Service and agree to be bound by them.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}