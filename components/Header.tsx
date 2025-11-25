'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  // Add scroll detection for header shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detect active section using IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.6 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Sections used by the nav
  const navItems = ['About', 'Services', 'Team', 'Testimonials', 'FAQ', 'Contact']

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image 
              src="/Logo.png" 
              alt="VitaHealth Logo" 
              width={150}
              height={150}
              className="w-full object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => {
              const id = item.toLowerCase()
              const isActive = activeSection === id

              return (
                <a
                  key={item}
                  href={`#${id}`}
                  className={`nav-link font-sm relative py-2 transition-colors duration-300 ${
                    isActive
                      ? 'text-blue-700 font-semibold'
                      : 'text-gray-700 hover:text-blue-700'
                  }`}
                >
                  {item}
                </a>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/signin"
              className="hidden lg:inline-block bg-gradient-to-r from-blue-700 to-blue-800 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105"
            >
              Book Appointment
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button 
              id="menu-btn"
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-gray-700"/> : <Menu className="h-6 w-6 text-gray-700"/>}
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        <div
          id="mobile-menu"
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-lg border border-gray-200/50 rounded-2xl shadow-xl p-6">
            <nav className="space-y-3">

              {navItems.map((item) => {
                const id = item.toLowerCase()
                const isActive = activeSection === id

                return (
                  <a
                    key={item}
                    href={`#${id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all duration-300 border border-transparent ${
                      isActive
                        ? 'text-blue-700 bg-blue-50 border-blue-200'
                        : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50 hover:border-blue-100'
                    }`}
                  >
                    {item}
                  </a>
                )
              })}

            </nav>

            <div className="mt-6 pt-4 border-t border-gray-200/50">
              <Link 
                href="/signin"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white px-6 py-4 rounded-xl text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Book Appointment
              </Link>
            </div>

          </div>
        </div>
      </div>
    </header>
  )
}
