'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function TwoStepVerification() {
  const [timeLeft, setTimeLeft] = useState(45)
  const [otp, setOtp] = useState({ otp1: "", otp2: "", otp3: "", otp4: "" })
  const [error, setError] = useState("")
  const router = useRouter()

  const correctOTP = "1234"

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const handleChange = (id: string, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      setOtp((prev) => ({ ...prev, [id]: value }))
      setError("") // remove error while typing

      // Move to next field if value entered
      if (value.length === 1) {
        const next = {
          otp1: "otp2",
          otp2: "otp3",
          otp3: "otp4",
          otp4: ""
        }[id]

        if (next) {
          const nextInput = document.getElementById(next) as HTMLInputElement
          nextInput?.focus()
        }
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const userOTP = otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4

    if (userOTP !== correctOTP) {
      setError("Invalid OTP. Please try again.")
      return
    }

    router.push("/signin")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
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
      
      <div className="grid md:grid-cols-2 gap-10 px-[2%] md:px-[8%] pb-[3%] max-w-7xl w-full">

        {/* Left Illustration */}
        <div className="flex flex-col justify-center p-10">
          <div className="relative w-full max-w-md">
            <Image 
              src="/images1/amico.png" 
              alt="Two Step Verification"
              width={400}
              height={400}
              className="object-contain w-[80%]"
            />
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-center">
          <div className="rounded border border-gray-100 bg-white p-2 md:p-8 w-full max-w-md">

            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
              2 Step Verification
            </h1>

            <p className="text-gray-500 text-sm text-center mb-6">
              Please enter the OTP received to confirm your account.  
              A code has been sent to ******doe@example.com
            </p>

            <form onSubmit={handleSubmit}>

              {/* OTP Inputs */}
              <div className="flex justify-center gap-3 mb-4">
                {["otp1", "otp2", "otp3", "otp4"].map((id) => (
                  <input
                    key={id}
                    id={id}
                    type="text"
                    maxLength={1}
                    value={otp[id as keyof typeof otp]}
                    onChange={(e) => handleChange(id, e.target.value)}
                    className="w-14 h-14 text-center text-xl font-bold border-2 border-gray-300 
                               rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 
                               focus:border-transparent"
                  />
                ))}
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}

              {/* Resend + Timer */}
              <div className="flex justify-center items-center gap-2 mb-6 text-sm">
                <span className="text-gray-600">Didn't receive code.</span>
                <button
                  type="button"
                  disabled={timeLeft > 0}
                  className="text-[#2E37A4] hover:underline font-medium 
                             disabled:text-gray-400"
                >
                  Resend Code
                </button>
                <span className="text-red-500 font-medium">
                  {formatTime(timeLeft)}
                </span>
              </div>

              {/* Submit */}
              <button 
                type="submit"
                className="w-full block text-center bg-[#2E37A4] text-white py-3 rounded-lg 
                           font-medium hover:bg-indigo-700 transition duration-200 mb-4"
              >
                Submit
              </button>

            </form>
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
