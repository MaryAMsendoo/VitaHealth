'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function OTPVerification() {
  const [timeLeft, setTimeLeft] = useState(45)
  const [otp, setOtp] = useState(["", "", "", ""])
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const moveToNext = (current: HTMLInputElement, nextFieldId: string) => {
    if (current.value.length === 1 && nextFieldId) {
      const nextInput = document.getElementById(nextFieldId) as HTMLInputElement
      if (nextInput) nextInput.focus()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const handleOtpChange = (index: number, value: string) => {
    if (error) setError("") // Clear error on typing
    
    if (value.length > 1) return
    const updatedOtp = [...otp]
    updatedOtp[index] = value
    setOtp(updatedOtp)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const enteredOtp = otp.join("")
    const correctOtp = "1234"

    if (enteredOtp !== correctOtp) {
      setError("Invalid OTP. Please try again.")
      return
    }

    router.push("/reset-password")
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
      
      <div className="grid md:grid-cols-2 gap-10 px-[3%] md:px-[8%] pb-[3%] max-w-7xl w-full">

        {/* Illustration */}
        <div className="flex flex-col bg-gradient-to-br from-indigo-100 to-purple-50 rounded-2xl p-10">
          <div className="relative w-full max-w-md">
            <Image 
              src="/images1/reset.png" 
              alt="OTP Verification"
              width={400}
              height={400}
              className="object-contain w-[80%]"
            />
          </div>
        </div>

        {/* OTP Form */}
        <div className="flex flex-col justify-center">
          <div className="rounded border border-gray-100 bg-white p-2 md:p-8 w-full max-w-md">

            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Email OTP Verification</h1>
            <p className="text-gray-500 text-sm text-center mb-6">We sent a code to info@example.com</p>

            <form onSubmit={handleSubmit}>

              {/* OTP Inputs */}
              <div className="flex justify-center gap-3 mb-2">
                {[0, 1, 2, 3].map((index) => (
                  <input 
                    key={index}
                    id={`otp${index + 1}`}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyUp={(e) =>
                      moveToNext(e.currentTarget, index < 3 ? `otp${index + 2}` : "")
                    }
                    className="w-14 h-14 text-center text-xl font-bold border-2 border-gray-300 
                               rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ))}
              </div>

              {/* Error */}
              {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

              {/* Resend Code */}
              <div className="flex justify-center items-center gap-2 mb-6 text-sm">
                <span className="text-gray-600">Didn't receive code?</span>
                <button 
                  type="button" 
                  className="text-[#2E37A4] hover:underline font-medium disabled:text-gray-400"
                  disabled={timeLeft > 0}
                  onClick={() => setTimeLeft(45)}
                >
                  Resend Code
                </button>
                <span className="text-red-500 font-medium">{formatTime(timeLeft)}</span>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                className="w-full block text-center bg-[#2E37A4] text-white py-3 rounded-lg 
                           font-medium hover:bg-indigo-700 transition duration-200"
              >
                Verify & Proceed
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
