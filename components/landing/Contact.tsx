'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Send, Zap, Shield, Clock } from 'lucide-react'

export default function Contact() {
  const [formStatus, setFormStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus('')

    // Simulate form submission
    setTimeout(() => {
      setFormStatus('✅ Message sent. We will contact you shortly.')
      setIsSubmitting(false)
      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 2000)
  }

  return (
    <section id="contact" className="bg-white px-[3%] md:px-[5%] py-[3%]">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-[#2E37A4]" data-aos="fade-up">Get in Touch</h3>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-6" data-aos="fade-up">
            Have questions about our digital healthcare platform? We're here to help you get started.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-800 mx-auto rounded-full" data-aos="fade-up"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div data-aos="fade-right">
            <div className="md:p-8 p-4 bg-white">
              <h4 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h4>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-[#2E37A4] p-3 rounded-lg mr-4">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Headquarters</p>
                    <p className="text-gray-600">VitaHealth Hospital, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#2E37A4] p-3 rounded-lg mr-4">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Phone</p>
                    <p className="text-gray-600">+234 803 123 4567</p>
                    <p className="text-gray-500 text-sm">Available 24/7 for support</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-[#2E37A4] p-3 rounded-lg mr-4">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-gray-600">support@VitaHealth.ng</p>
                    <p className="text-gray-500 text-sm">Typically respond within 2 hours</p>
                  </div>
                </div>
              </div>

              {/* Platform Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100">
                  <p className="text-2xl font-bold text-[#2E37A4]">24/7</p>
                  <p className="text-gray-600 text-sm">Digital Support</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center border border-green-100">
                  <p className="text-2xl font-bold text-[#2E37A4]">30min</p>
                  <p className="text-gray-600 text-sm">Avg. Response</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div data-aos="fade-left">
            <div className="md:p-8 p-4 bg-white">
              <h4 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h4>

              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    required 
                    placeholder="Enter your full name"
                    className="w-full p-4 rounded-lg border border-gray-300 text-gray-900 focus:border-[#2E37A4] focus:ring-2 focus:ring-[#2E37A4]/20 transition-all duration-300" 
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required 
                    placeholder="Enter your email address"
                    className="w-full p-4 rounded-lg border border-gray-300 text-gray-900 focus:border-[#2E37A4] focus:ring-2 focus:ring-[#2E37A4]/20 transition-all duration-300" 
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select 
                    id="subject" 
                    name="subject"
                    className="w-full p-4 rounded-lg border border-gray-300 text-gray-900 focus:border-[#2E37A4] focus:ring-2 focus:ring-[#2E37A4]/20 transition-all duration-300"
                  >
                    <option value="">Select an option</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Platform Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required 
                    placeholder="Tell us how we can help you..."
                    className="w-full p-4 rounded-lg border border-gray-300 text-gray-900 focus:border-[#2E37A4] focus:ring-2 focus:ring-[#2E37A4]/20 transition-all duration-300"
                  ></textarea>
                </div>

                <div className="flex items-center gap-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#2E37A4] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1e267c] disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  {formStatus && (
                    <div className="text-sm text-gray-600" role="status" aria-live="polite">
                      {formStatus}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  We respect your privacy. Your information is secure and will only be used to respond to your inquiry.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16" data-aos="fade-up">
          <div className="overflow-hidden shadow-2xl rounded-2xl">
            <iframe 
              className="w-full h-96 border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252628.376124225!2d8.377382094531247!3d7.732521999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1057f23e5d7d7c45%3A0x7a51e9a4b4c7f2f5!2sMakurdi%2C%20Benue%20State%2C%20Nigeria!5e0!3m2!1sen!2s!4v1690000000000!5m2!1sen!2s"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VitaHealth Headquarters Location in Makurdi, Benue State"
            />
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
              <div className="w-12 h-12 bg-[#2E37A4] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">Quick Response</h5>
              <p className="text-gray-600 text-sm">Get answers to your questions within 30 minutes during business hours</p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center">
              <div className="w-12 h-12 bg-[#2E37A4] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">Secure & Private</h5>
              <p className="text-gray-600 text-sm">All communications are encrypted and your data is protected</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 text-center">
              <div className="w-12 h-12 bg-[#2E37A4] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h5 className="font-semibold text-gray-800 mb-2">24/7 Support</h5>
              <p className="text-gray-600 text-sm">Round-the-clock technical and medical support for all users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}