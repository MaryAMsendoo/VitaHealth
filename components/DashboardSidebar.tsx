// components/DashboardSidebar.tsx
'use client'

import { useAuth } from '@/context/UserContext'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  LayoutDashboard,
  Calendar,
  FileText,
  CreditCard,
  User,
  Settings,
  HelpCircle,
  X,
  Microscope,
  Pill,
  Ambulance,
  LogOut,
  BellRing
} from 'lucide-react'

interface DashboardSidebarProps {
  isOpen: boolean
  onClose: () => void
  user: any
}

const patientMenuItems = [
  { href: '/dashboard/patient', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/book-consultation', icon: Calendar, label: 'Book Consultation' },
  { href: '/dashboard/prescriptions', icon: FileText, label: 'Prescriptions' },
  { href: '/dashboard/diagnostic-centers', icon: Microscope, label: 'Diagnostic Centers' },
  { href: '/dashboard/find-drugs', icon: Pill, label: 'Find Drugs' },
  { href: '/dashboard/emergency', icon: Ambulance, label: 'Emergency Support' },
  { href: '/dashboard/notifications', icon: BellRing, label: 'Notification' },
  { href: '/dashboard/payments', icon: CreditCard, label: 'Payments' },
  { href: '/dashboard/profile', icon: User, label: 'Profile' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  { href: '/dashboard/help', icon: HelpCircle, label: 'Help' },
]

const doctorMenuItems = [
  { href: '/dashboard/doctor', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/appointments', icon: Calendar, label: 'Appointments' },
  { href: '/dashboard/prescription-aid', icon: FileText, label: 'Prescription Aid' },
  { href: '/dashboard/patients', icon: User, label: 'Patients' },
  { href: '/dashboard/emergency-calls', icon: Ambulance, label: 'Emergency Calls' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
  { href: '/dashboard/help', icon: HelpCircle, label: 'Help' },
]

export default function DashboardSidebar({ isOpen, onClose, user }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const menuItems = user?.role === 'doctor' ? doctorMenuItems : patientMenuItems

  const handleLogout = () => {
    logout()
    if (window.innerWidth < 1024) {
      onClose()
    }
    router.push('/')
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Mobile Header */}
      <div className="p-4 border-b border-gray-200 lg:hidden">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 p-3 mb-4">
        <Image
          src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=0D9488&color=fff`}
          alt={user?.name || 'User'}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="font-semibold text-gray-900">{user?.name}</div>
          <div className="text-sm text-gray-500 capitalize">{user?.role}</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 flex-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  onClose()
                }
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 w-full transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        >
          <div
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}