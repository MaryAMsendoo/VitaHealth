import Link from 'next/link'
import { Calendar } from 'lucide-react'

export default function FloatingCTA() {
  return (
    <Link 
      href="/auth/signin"
      className="fab md:hidden gradient-blue text-white px-5 py-4 rounded-full shadow-lg inline-flex items-center gap-2 hover:shadow-xl transition-all duration-300"
      aria-label="Book appointment"
    >
      <Calendar className="w-5 h-5" />
      Book Now
    </Link>
  )
}