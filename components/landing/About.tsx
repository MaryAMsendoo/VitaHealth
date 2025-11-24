import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="container py-20 px-[8%]">
      <div className="grid md:grid-cols-2 gap-16 justify-center">

        {/* IMAGE */}
        <div
          className="block rounded overflow-hidden shadow-2xl w-full h-100 placeholder-img"
          data-aos="fade-right"
        >
          <Image 
            src="/images1/disable.jpg" 
            alt="About VitaHealth" 
            width={500}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT */}
        <div data-aos="fade-left">

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
            About VitaHealth
          </h2>

          <p className="text-gray-600 mb-6 text-lg">
            VitaHealth is an all-in-one digital healthcare platform designed to function as a complete
            medical record management system. It securely stores patient histories, doctor profiles,
            pharmacy data, previous visits, tests, and prescribed medications, giving healthcare
            providers instant access to accurate information. The platform also connects patients to
            pharmacies for verified medications, supports emergency calls, provides reminders to
            patients or relatives, and helps users find nearby diagnostic centers with easy
            appointment booking.
          </p>

          <p className="text-gray-600 mb-8 text-lg">
            Beyond record management, VitaHealth enhances care through an AI-powered assistant bot,
            medication-recommendation tools for doctors, and online consultation options for patients
            with mild conditions or busy schedules. By combining secure record keeping, verified drug
            access, emergency support, and intelligent health guidance, 
          </p>

          {/* METRICS */}
          {/* <div className="grid grid-cols-2 text-black font-semibold text-2xl md:text-3xl gap-8">

            <div className="text-center">
              <p>100%</p>
              <p className="text-gray-600 text-[1rem] font-[400]">
                Verified Medications
              </p>
            </div>

            <div className="text-center">
              <p>24/7</p>
              <p className="text-gray-600 text-[1rem] font-[400]">
                Emergency & AI Support
              </p>
            </div>

            <div className="text-center">
              <p>60%+</p>
              <p className="text-gray-600 text-[1rem] font-[400]">
                Faster Drug Access
              </p>
            </div>

            <div className="text-center">
              <p>100K+</p>
              <p className="text-gray-600 text-[1rem] font-[400]">
                Records Organized Easily
              </p>
            </div>

          </div> */}

        </div>
      </div>
    </section>
  )
}
