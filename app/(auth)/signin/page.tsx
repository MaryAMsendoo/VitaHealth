'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, Facebook, Twitter, Github } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/UserContext'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    let formErrors: any = {}
    let isValid = true

    if (!email.trim()) {
      formErrors.email = "Email is required"
      isValid = false
    }

    if (!password.trim()) {
      formErrors.password = "Password is required"
      isValid = false
    }

    setErrors(formErrors)

    if (!isValid) {
      setIsSubmitting(false)
      return
    }

    // Use auth context login
    const result = await login(email, password)
    
    if (result.success) {
      router.push("/dashboard")
    } else {
      setErrors({ 
        email: result.error || 'Login failed', 
        password: result.error || 'Login failed' 
      })
    }
    
    setIsSubmitting(false)
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: "" }))
    }
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: "" }))
    }
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
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-indigo-100 to-purple-50 rounded-2xl p-10">
          <div className="relative w-full max-w-md">
            <Image 
              src="/images1/rafiki.png" 
              alt="Login Illustration"
              width={400}
              height={400}
              className="object-contain w-full"
            />
          </div>
        </div>

        {/* Right Form */}
        <div className="flex flex-col justify-center">
          <div className="rounded border border-gray-100 bg-white p-2 md:p-8 w-full max-w-md">
            
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Sign In</h1>
            <p className="text-gray-500 text-sm text-center mb-6">
              Please enter below details to access the dashboard
            </p>

            <form onSubmit={handleSubmit}>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                  <input 
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter Email Address"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />

                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded" 
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember Me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-red-500 hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2E37A4] text-white py-3 rounded-lg font-medium 
                           hover:bg-indigo-700 transition duration-200 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Signing In...' : 'Login'}
              </button>

              {/* Register */}
              <p className="text-center text-sm text-gray-600">
                Don't have an account yet?
                <Link href="/signup" className="text-[#2E37A4] hover:underline font-medium ml-1">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}