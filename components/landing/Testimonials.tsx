'use client'

import { useEffect, useState } from 'react'

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is available (client-side only)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial value
    checkMobile()

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile)

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3)
    }, 4500)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const testimonials = [
    {
      name: "Aisha Umar",
      role: "Remote Patient",
      initials: "AU",
      content: "VitaHealth saved me hours of travel time. I got my prescription digitally and the pharmacy had it ready when I arrived. The consultation was so convenient!",
      color: "blue"
    },
    {
      name: "Dr. Olamide",
      role: "Platform Doctor",
      initials: "DO",
      content: "The digital prescription system has eliminated prescription fraud concerns. I can now focus on patient care instead of paperwork. Game-changer for my practice.",
      color: "green"
    },
    {
      name: "PharmaCare Plus",
      role: "Partner Pharmacy",
      initials: "PC",
      content: "Since joining VitaHealth, we've reduced prescription verification time by 80%. The real-time inventory integration helps us serve patients better.",
      color: "purple"
    }
  ]

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600'
    }
    return colorMap[color] || 'bg-blue-100 text-blue-600'
  }

  return (
    <section id="testimonials" className="bg-[#2E37A4] text-white px-[3%] md:px-[5%] py-20">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">What Our Users Say</h3>
        <p className="text-blue-100 text-center max-w-2xl mx-auto mb-12" data-aos="fade-up">
          Real experiences from patients, doctors, and pharmacy partners using VitaHealth across Nigeria
        </p>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <blockquote 
                key={index}
                className={`bg-white text-gray-800 p-6 rounded-2xl shadow transition-opacity duration-500 ${
                  isMobile && index !== currentTestimonial ? 'hidden' : 'block'
                }`}
                data-aos="flip-left"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-full overflow-hidden mr-3 flex items-center justify-center ${getColorClass(testimonial.color)}`}>
                    <span className="text-xs font-bold">{testimonial.initials}</span>
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-blue-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="italic mb-3">{testimonial.content}</p>
                <div className="flex justify-center text-yellow-400">
                  ★★★★★
                </div>
              </blockquote>
            ))}
          </div>

          {/* Mobile indicators */}
          {isMobile && (
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto" data-aos="fade-up">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">10,000+</p>
            <p className="text-blue-100 text-sm">Digital Consultations</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">4.8/5</p>
            <p className="text-blue-100 text-sm">User Rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">95%</p>
            <p className="text-blue-100 text-sm">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">30min</p>
            <p className="text-blue-100 text-sm">Avg. Response Time</p>
          </div>
        </div>
      </div>
    </section>
  )
}