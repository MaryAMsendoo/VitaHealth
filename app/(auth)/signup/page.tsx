'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User, Facebook, Twitter, Github } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/UserContext'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agree, setAgree] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: ""
  })

  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    let newErrors: any = {}
    let isValid = true

    if (!name.trim()) {
      newErrors.name = "Full name is required"
      isValid = false
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    }

    if (!password.trim()) {
      newErrors.password = "Password is required"
      isValid = false
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm your password"
      isValid = false
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    if (!agree) {
      newErrors.agree = "You must agree to Terms & Privacy Policy"
      isValid = false
    }

    setErrors(newErrors)

    if (!isValid) {
      setIsSubmitting(false)
      return
    }

    // For development: Auto-detect role based on email pattern
    // In production, this will be handled by backend
    const role = email.includes('doctor') || email.includes('dr.') ? 'doctor' : 'patient'

    // Use auth context register
    const result = await register({
      name,
      email,
      password,
      role
    })

    if (result.success) {
      router.push("/dashboard")
    } else {
      setErrors(prev => ({ 
        ...prev, 
        email: result.error || 'Registration failed' 
      }))
    }
    
    setIsSubmitting(false)
  }

  const clearError = (field: string) => {
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-center min-h-screen p-4">
      
      <div className="flex items-center justify-center w-40 h-40 mx-auto">
        <Image 
          src="/images1/Logo.png" 
          alt="VitaHealth Logo" 
          width={160}
          height={160}
          className="object-contain"
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-10 px-[3%] md:px-[8%] py-[2%] max-w-7xl w-full">

        {/* Left Illustration */}
        <div className="flex flex-col justify-center">
          <Image 
            src="/images1/pana.png" 
            alt="Register Illustration"
            width={400}
            height={400}
            className="object-contain w-[80%]"
          />
        </div>

        {/* Registration Form */}
        <div className="border border-gray-200 bg-white p-2 md:p-4 w-full max-w-md">

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Register</h1>
          <p className="text-gray-500 text-sm text-center mb-6">
            Please enter your details to create account
          </p>

          {/* Development Note */}
          {/* <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 text-center">
              <strong>Development Note:</strong> Role will be automatically assigned. 
              Use test accounts below for quick access.
            </p>
          </div> */}

          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); clearError("name") }}
                  placeholder="Enter Name"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError("email") }}
                  placeholder="Enter Email Address"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError("password") }}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); clearError("confirmPassword") }}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-12 py-2.5 border border-gray-300 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <div className="mb-6">
              <label className="flex items-start">
                <input 
                  type="checkbox" 
                  checked={agree}
                  onChange={(e) => { setAgree(e.target.checked); clearError("agree") }}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded mt-0.5"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the 
                  <a href="#" className="text-[#2E37A4] hover:underline mx-1">Terms of Service</a> &
                  <a href="#" className="text-[#2E37A4] hover:underline ml-1">Privacy Policy</a>
                </span>
              </label>
              {errors.agree && <p className="text-red-500 text-sm mt-1">{errors.agree}</p>}
            </div>

            {/* Register Button */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2E37A4] text-white py-3 rounded-lg font-medium 
                         hover:bg-indigo-700 transition duration-200 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Account...' : 'Register'}
            </button>

            {/* OR Divider */}
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="flex justify-center gap-4 mb-6">
              <button type="button" className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
                <Facebook className="text-blue-600 w-5 h-5" />
              </button>
              <button type="button" className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
                <Twitter className="text-blue-400 w-5 h-5" />
              </button>
              <button type="button" className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50">
                <Github className="text-gray-900 w-5 h-5" />
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?
              <Link href="/signin" className="text-[#2E37A4] hover:underline font-medium ml-1">
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}