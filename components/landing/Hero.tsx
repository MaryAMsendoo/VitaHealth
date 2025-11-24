import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative h-[620px] bg-cover bg-center bg-no-repeat">
      <Image
        src="/images1/bg2.avif"
        alt="Healthcare background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/60"></div>
      <div className="absolute inset-0 flex">
        <div className="text-white max-w-4xl" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-3 px-[8%] pt-[8%] md:pt-[5%] leading-tight">
            Healthcare Without Boundaries. Local Care, Global Standards.
          </h1>
          <p className="text-xl px-[8%] mb-8 opacity-95 max-w-2xl">
            Connect instantly with trusted doctors, manage prescriptions securely, and access quality care from anywhere in the world.
          </p>
          <div className="flex flex-col px-[8%] sm:flex-row gap-4">
            <a 
              href="#services"
              className="bg-white px-8 py-4 rounded text-blue-600 text-center font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300"
            >
              Explore Services
            </a>
            <Link 
              href="/signin"
              className="border-2 border-white px-8 py-4 rounded text-center text-white font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}