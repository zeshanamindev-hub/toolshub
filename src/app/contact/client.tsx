"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  MessageSquare,
  HelpCircle,
  Bug,
  Lightbulb,
  Send,
  Clock,
  CheckCircle2
} from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general"
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const contactTypes = [
    {
      value: "general",
      label: "General Inquiry",
      icon: MessageSquare,
      description: "Questions about our tools or services"
    },
    {
      value: "support",
      label: "Technical Support",
      icon: HelpCircle,
      description: "Need help with a specific tool"
    },
    {
      value: "bug",
      label: "Bug Report",
      icon: Bug,
      description: "Found an issue? Let us know"
    },
    {
      value: "feature",
      label: "Feature Request",
      icon: Lightbulb,
      description: "Suggest new tools or features"
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission (integrate with your backend/email service)
    await new Promise(resolve => setTimeout(resolve, 1500))

    setSubmitted(true)
    setIsSubmitting(false)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Message Sent Successfully!
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Thank you for contacting Tools Hub. We've received your message and will get back to you within <strong>24-48 hours</strong>.
              </p>
              <p className="text-gray-600 mb-8">
                We appreciate your feedback and will do our best to address your inquiry promptly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                      type: "general"
                    })
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Send Another Message
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/">Explore Tools</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 mb-6">
            <Mail className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-bold text-gray-700">Contact Us</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Get in Touch
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have a question, suggestion, or found a bug? We'd love to hear from you.
            Send us a message and we'll respond as quickly as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and we'll get back to you within 24-48 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Type */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      How can we help you?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {contactTypes.map((type) => {
                        const Icon = type.icon
                        const isSelected = formData.type === type.value
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() =>
                              setFormData(prev => ({ ...prev, type: type.value }))
                            }
                            className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                              isSelected
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <Icon
                                className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                                  isSelected ? "text-blue-600" : "text-gray-400"
                                }`}
                              />
                              <div>
                                <div
                                  className={`font-bold text-sm mb-1 ${
                                    isSelected ? "text-blue-900" : "text-gray-900"
                                  }`}
                                >
                                  {type.label}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {type.description}
                                </div>
                              </div>
                            </div>
                            {isSelected && (
                              <div className="absolute top-3 right-3">
                                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-bold text-gray-900 mb-2"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="border-2"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold text-gray-900 mb-2"
                      >
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="border-2"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-bold text-gray-900 mb-2"
                    >
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of your message"
                      className="border-2"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-bold text-gray-900 mb-2"
                    >
                      Your Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide as much detail as possible..."
                      className="min-h-[150px] border-2"
                    />
                    <p className="text-xs text-gray-600 mt-2">
                      {formData.message.length} characters
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Response Time */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">Response Time</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-3">
                <p>
                  We typically respond to all inquiries within <strong>24-48 hours</strong> during business days.
                </p>
                <p>
                  For urgent technical issues, we aim to respond even faster.
                </p>
              </CardContent>
            </Card>

            {/* Contact Methods */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm mb-1">
                      General Inquiries
                    </div>
                    <a
                      href="mailto:hello@toolshub.com"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      hello@toolshub.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm mb-1">
                      Technical Support
                    </div>
                    <a
                      href="mailto:support@toolshub.com"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      support@toolshub.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Bug className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <div className="font-bold text-gray-900 text-sm mb-1">
                      Privacy & Legal
                    </div>
                    <a
                      href="mailto:legal@toolshub.com"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      legal@toolshub.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Common Questions</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-700 space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Is my data safe?
                  </h4>
                  <p>
                    Yes! All text processing happens in your browser. We never see or store your content.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Are the tools really free?
                  </h4>
                  <p>
                    Absolutely! All {SITE_CONFIG.toolCount}+ tools are completely free with no hidden fees or subscriptions.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Can I suggest new tools?
                  </h4>
                  <p>
                    We love feature requests! Select "Feature Request" above to suggest new tools.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
