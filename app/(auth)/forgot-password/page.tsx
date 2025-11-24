'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    // Basic email pattern check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email")
      return
    }

    router.push("/email-sent")
  }

  const clearError = () => {
    if (error) setError("")
  }

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen p-4">

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

      <div className="grid md:grid-cols-2 gap-10 md:px-[8%] px-[3%] pb-[3%] max-w-7xl w-full">

        {/* Illustration */}
        <div className="flex flex-col bg-gradient-to-br from-indigo-100 to-purple-50 rounded-2xl p-2 md:p-8">
          <div className="relative w-full max-w-md">
            <Image 
              src="/images1/forg.png" 
              alt="Forgot Password"
              width={400}
              height={400}
              className="object-contain w-full"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-center">
          <div className="rounded border border-gray-100 bg-white p-2 md:p-8 w-full max-w-md">

            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Forgot Password</h1>
            <p className="text-gray-500 text-sm text-center mb-6">
              No worries, we'll send you reset instructions
            </p>

            <form onSubmit={handleSubmit}>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); clearError() }}
                    placeholder="Enter Email Address"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-center bg-[#2E37A4] text-white py-3 rounded-lg 
                           font-medium hover:bg-indigo-700 transition duration-200 mb-4"
              >
                Submit
              </button>

              {/* Return to Login */}
              <p className="text-center text-sm text-gray-600">
                Return to 
                <Link href="/signin" className="text-[#2E37A4] hover:underline font-medium ml-1">
                  Login
                </Link>
              </p>
            </form>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Copyright ©2025 - VitaHealth
          </p>
        </div>
      </div>
    </div>
  )
}
