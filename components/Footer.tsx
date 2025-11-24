import Image from 'next/image'
import Link from 'next/link'
import { Twitter, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-blue-900 md:px-[5%] px-[3%] text-white py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex gap-1 items-center mb-4">
              <Image 
                src="/images1/logo-white.png" 
                alt="VitaHealth Logo" 
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <p className="text-white text-2xl font-bold">VitaHealth</p>
            </div>
            <p className="text-blue-100 text-sm">
              Providing world-class healthcare with compassion and excellence across World.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-blue-100 hover:text-white transition">About Us</a></li>
              <li><a href="#services" className="text-blue-100 hover:text-white transition">Services</a></li>
              <li><a href="#team" className="text-blue-100 hover:text-white transition">Our Team</a></li>
              <li><a href="#contact" className="text-blue-100 hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-blue-100 hover:text-white transition">Emergency Care</a></li>
              <li><a href="#services" className="text-blue-100 hover:text-white transition">Lab Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li>Location</li>
              <li>+234 1 234 5678</li>
              <li>VitaHealth@healthcarenigeria.ng</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-blue-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>&copy; {currentYear} VitaHealth. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" aria-label="Twitter" className="text-blue-100 hover:text-white transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Facebook" className="text-blue-100 hover:text-white transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="text-blue-100 hover:text-white transition">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}