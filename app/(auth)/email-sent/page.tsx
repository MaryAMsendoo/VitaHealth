import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'

export default function EmailSent() {
  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen p-2">
      {/* Logo */}
      <div className="flex items-center justify-center w-40 h-40 mx-auto">
        <Image 
          src="/images1/Logo.png" 
          alt="VitaHealth Logo" 
          width={160}
          height={160}
          className="object-contain"
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-10 px-[3%] md:px-[8%] pb-[2%] max-w-7xl w-full">
        {/* Left Side - Illustration */}
        <div className="flex flex-col justify-center">
          <div className="relative w-full max-w-md">
            <Image 
              src="/images1/forgetpassword.png" 
              alt="Email Sent"
              width={400}
              height={400}
              className="object-contain w-[80%]"
            />
          </div>
        </div>

        {/* Right Side - Email Sent Confirmation */}
        <div className="flex flex-col justify-center">
          <div className="rounded border border-gray-100 bg-white p-2 md:p-8 w-full max-w-md">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="text-white w-6 h-6" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Email Sent!</h1>
            <p className="text-gray-500 text-sm text-center mb-6">Check your email & change your password</p>

            {/* Reset Password Button */}
            <Link href="/otp-verification">
              <button className="w-full bg-[#2E37A4] text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-200">
                Reset Password
              </button>
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Copyright ©2025 - VitaHealth
          </p>
        </div>
      </div>
    </div>
  )
}