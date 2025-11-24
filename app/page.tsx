'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from '../components/Header'
import Hero from '../components/landing/Hero'
import About from '../components/landing/About'
import Services from '../components/landing/Services'
import Team from '../components/landing/Team'
import Testimonials from '../components/landing/Testimonials'
import FAQ from '../components/landing/FAQ'
import Contact from '../components/landing/Contact'
import Footer from '../components/Footer'
import FloatingCTA from '../components/landing/FloatingCTA'

export default function Home() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({ 
      once: true, 
      duration: 700,
      offset: 100,
      easing: 'ease-in-out',
      delay: 100
    })
    
    // Refresh AOS when the component mounts
    AOS.refresh()
  }, [])

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a 
        className="sr-only focus:not-sr-only p-2 bg-blue-600 text-white fixed top-0 left-0 z-[100] m-2 rounded" 
        href="#main"
      >
        Skip to content
      </a>
      
      <Header />
      
      <main id="main" tabIndex={-1} className="md:mt-[6%] mt-[12%]">
        <Hero />
        <About />
        <Services />
        <Team />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      
      <FloatingCTA />
      <Footer />
    </>
  )
}