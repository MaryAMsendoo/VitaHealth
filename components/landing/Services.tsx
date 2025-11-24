import Image from "next/image";

export default function Services() {
    return (
        <section id="services" className="gradient-light-blue py-20 md:px-[3%] px-[5%]">
            <div className="container mx-auto px-4 sm:px-6">
                <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#2E37A4]" data-aos="fade-up">
                    Our Digital Healthcare Solutions
                </h3>
                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12" data-aos="fade-up">
                    Comprehensive telemedicine services designed to make quality healthcare accessible, secure, and efficient
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Digital Consultations */}
                    <article className="service-card bg-white rounded-2xl shadow-lg p-6 text-center" data-aos="zoom-in">
                        <div className="w-full h-48 mb-6 rounded-xl overflow-hidden bg-blue-50 flex items-center justify-center">
                            <Image
                                src="/images1/doc4.webp"
                                alt="Digital Consultations"
                                width={300}
                                height={192}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-xl font-bold mb-3">Digital Consultations</h4>
                        <p className="text-gray-600 text-sm mb-4">Connect with certified doctors through secure video, chat, or voice consultations from anywhere, anytime with encrypted communication.</p>
                        <a href="#contact" className="text-blue-600 font-semibold text-sm hover:underline">Learn More</a>
                    </article>

                    {/* E-Prescriptions */}
                    <article className="service-card bg-white rounded-2xl shadow-lg p-6 text-center" data-aos="zoom-in"
                        data-aos-delay="100">
                        <div className="w-full h-48 mb-6 rounded-xl overflow-hidden bg-green-50 flex items-center justify-center">
                            <Image
                                src="/images1/bg1.avif"
                                alt="E-Prescriptions"
                                width={300}
                                height={192}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-xl font-bold mb-3">E-Prescriptions</h4>
                        <p className="text-gray-600 text-sm mb-4">Secure digital prescriptions with doctor signatures, real-time pharmacy integration, and fraud prevention for safe medication management.</p>
                        <a href="#contact" className="text-blue-600 font-semibold text-sm hover:underline">Learn More</a>
                    </article>

                    {/* Pharmacy Integration */}
                    <article className="service-card bg-white rounded-2xl shadow-lg p-6 text-center" data-aos="zoom-in"
                        data-aos-delay="200">
                        <div className="w-full h-48 mb-6 rounded-xl overflow-hidden bg-purple-50 flex items-center justify-center">
                            <Image
                                src="/images1/doc.jpeg"
                                alt="Pharmacy Integration"
                                width={300}
                                height={192}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-xl font-bold mb-3">Pharmacy Integration</h4>
                        <p className="text-gray-600 text-sm mb-4">Connected network of verified pharmacies with real-time stock availability, prescription fulfillment tracking, and medication authenticity verification.</p>
                        <a href="#contact" className="text-blue-600 font-semibold text-sm hover:underline">Learn More</a>
                    </article>
                </div>

                <div className="text-center mt-12">
                    <a href="#contact"
                        className="bg-blue-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                        Explore All Features
                    </a>
                </div>
            </div>
        </section>
    )
}