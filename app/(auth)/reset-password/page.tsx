'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock } from 'lucide-react'

export default function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Clear error as soon as submit starts
    setError("")

    // Validation rules
    if (password.length < 4) {
      setError("Password must be at least 4 characters long.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    // If valid → Redirect
    router.push("/success")
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
        <div className="flex flex-col justify-center p-10">
          <div className="relative w-full max-w-md">
            <Image 
              src="/images1/backpass.png" 
              alt="Reset Password"
              width={400}
              height={400}
              className="object-contain w-[80%]"
            />
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col justify-center">
          <div className="rounded border border-gray-100 bg-white p-2 md:p-8 w-full max-w-md">

            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Reset Password</h1>
            <p className="text-gray-500 text-sm text-center mb-6">
              Your new password must be different from previously used passwords.
            </p>

            <form onSubmit={handleSubmit}>
              
              {/* Password */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (error) setError("") // remove error while typing
                    }}
                    className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      if (error) setError("") // remove error while typing
                    }}
                    className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error message (no red borders) */}
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#2E37A4] text-white py-3 rounded-lg font-medium 
                           hover:bg-indigo-700 transition duration-200 mb-4"
              >
                Submit
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-600">
                Return to
                <a href="/signin" className="text-[#2E37A4] hover:underline font-medium ml-1">
                  Login
                </a>
              </p>

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
