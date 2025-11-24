import Image from 'next/image'

export default function Team() {
  return (
    <section id="team" className="container mx-auto px-[3%] md:px-[5%] py-20">
      <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#2E37A4]" data-aos="fade-up">
        Our Healthcare Network
      </h3>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12" data-aos="fade-up">
        Access certified medical professionals and verified healthcare partners across our digital platform
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Verified Doctors */}
        <div className="doctor-card bg-white rounded-2xl shadow-lg p-6 text-center" data-aos="fade-up">
          <div className="overflow-hidden rounded-full w-32 h-32 mx-auto mb-4 bg-blue-50 flex items-center justify-center">
            <Image 
              src="/images1/doc2.jpeg" 
              alt="Certified Doctors" 
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="text-xl font-bold">Verified Medical Professionals</h4>
          <p className="text-blue-600 font-medium mb-2">Licensed & Certified</p>
          <p className="text-gray-600 text-sm">Access our network of fully verified and licensed healthcare providers with diverse specializations and extensive experience.</p>
        </div>

        {/* Pharmacy Partners */}
        <div className="doctor-card bg-white rounded-2xl shadow-lg p-6 text-center" data-aos="fade-up" data-aos-delay="100">
          <div className="overflow-hidden rounded-full w-32 h-32 mx-auto mb-4 bg-green-50 flex items-center justify-center">
            <Image 
              src="/images1/images.jpeg" 
              alt="Pharmacy Network" 
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="text-xl font-bold">Verified Pharmacy Partners</h4>
          <p className="text-blue-600 font-medium mb-2">Authentic Medications</p>
          <p className="text-gray-600 text-sm">Network of licensed pharmacies with real-time inventory tracking and medication authenticity verification for safe prescription fulfillment.</p>
        </div>

        {/* Healthcare Institutions */}
        <div 
  className="doctor-card bg-white rounded-2xl shadow-lg p-6 text-center" 
  data-aos="fade-up" 
  data-aos-delay="200"
>
  <div className="overflow-hidden rounded-full w-32 h-32 mx-auto mb-4 bg-purple-50 flex items-center justify-center">
    <Image 
      src="/images1/lab.jpg" 
      alt="Diagnostic Centers" 
      width={128}
      height={128}
      className="w-full h-full object-cover"
    />
  </div>

  <h4 className="text-xl font-bold">Diagnostic Centers</h4>
  <p className="text-blue-600 font-medium mb-2">Trusted Test Providers</p>
  <p className="text-gray-600 text-sm">
    Centers offering lab tests and imaging services, easily discoverable and bookable through VitaHealth.
  </p>
</div>

      </div>

      {/* Additional Info Section */}
      <div className="mt-16 bg-blue-50 rounded-2xl p-8" data-aos="fade-up">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-[#2E37A4]">200+</p>
            <p className="text-gray-600 font-medium">Certified Doctors</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-[#2E37A4]">150+</p>
            <p className="text-gray-600 font-medium">Verified Pharmacies</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-[#2E37A4]">50+</p>
            <p className="text-gray-600 font-medium">Healthcare Partners</p>
          </div>
        </div>
      </div>
    </section>
  )
}