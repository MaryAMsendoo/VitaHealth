// app/dashboard/page.tsx
'use client'

import { useAuth } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardRedirect() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // Redirect to role-specific dashboard
        router.push(`/dashboard/${user.role}`)
      } else {
        // Redirect to login if no user
        router.push('/signin')
      }
    }
  }, [user, isLoading, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Redirecting to your dashboard...</div>
    </div>
  )
}