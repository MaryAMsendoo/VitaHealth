// components/DashboardHeader.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/context/UserContext'
import { 
  Search, 
  Calendar, 
  Settings, 
  Bell, 
  Brain,
  Menu
} from 'lucide-react'

interface DashboardHeaderProps {
  onMenuToggle: () => void
}

export default function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const { user, logout } = useAuth()
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 fixed right-0 left-0 top-0 z-50">
      <div className="px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-8">
          <div className="flex items-center gap-2">
            <Image 
              src="/Logo.png" 
              alt="VitaHealth Logo" 
              width={160}
              height={40}
              className="h-10 w-40 object-contain"
            />
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-4 py-2 w-64 lg:w-96">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="ml-2 bg-transparent outline-none text-sm w-full"
            />
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={onMenuToggle}
            className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          {/* AI Assistance Button */}
          <Link 
            href="/ai-assistant"
            className="bg-gradient-to-r from-[#2E37A4] to-[#0E9384] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-800 transition-colors"
          >
            <span className="hidden sm:inline">AI Assistance</span>
            <Brain className="w-4 h-4" />
          </Link>

          {/* Calendar */}
          <button className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block">
            <Calendar className="w-5 h-5 text-gray-600" />
          </button>

          {/* Settings */}
          <button className="p-2 hover:bg-gray-100 rounded-lg hidden sm:block">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-lg relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <Image
              src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=0D9488&color=fff`}
              alt="Profile"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  )
}