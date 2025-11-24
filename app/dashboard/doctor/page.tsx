// app/dashboard/doctor/page.tsx
'use client'

import { useAuth } from '@/context/UserContext'
import Link from 'next/link'
import { 
  Users,
  Calendar,
  FileText,
  Ambulance,
  TrendingUp,
  Clock
} from 'lucide-react'

export default function DoctorDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      icon: Users,
      label: 'Total Patients',
      value: '156',
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      icon: Calendar,
      label: 'Today\'s Appointments',
      value: '12',
      change: '+2',
      changeType: 'positive' as const,
    },
    {
      icon: FileText,
      label: 'Prescriptions Today',
      value: '18',
    },
    {
      icon: Ambulance,
      label: 'Emergency Cases',
      value: '3',
      change: '-1',
      changeType: 'negative' as const,
    }
  ]

  const upcomingAppointments = [
    {
      name: 'Mary Msendoo',
      condition: 'Regular Checkup',
      time: '10:00 AM',
      status: 'confirmed'
    },
    {
      name: 'John Patient',
      condition: 'Follow-up Consultation',
      time: '11:30 AM',
      status: 'confirmed'
    },
    {
      name: 'Sarah Johnson',
      condition: 'Emergency',
      time: '2:00 PM',
      status: 'emergency'
    }
  ]

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Good morning, Dr. {user?.name?.split(' ')[1] || 'User'}!
          </h1>
          <p className="text-gray-600 mt-1">Here's your schedule for today</p>
        </div>
        <Link
          href="/dashboard/prescription-aid"
          className="bg-[#2E37A4] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <FileText className="w-4 h-4" />
          Prescription Aid
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-[#2E37A4] text-white rounded-full flex items-center justify-center">
                <stat.icon className="w-6 h-6" />
              </div>
              {stat.change && (
                <span className={`flex items-center gap-1 text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              )}
            </div>
            <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Today's Appointments</h2>
              <Link 
                href="/dashboard/appointments"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      appointment.status === 'emergency' ? 'bg-red-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <div className="font-semibold text-gray-900">{appointment.name}</div>
                      <div className="text-sm text-gray-500">{appointment.condition}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{appointment.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/emergency-calls"
                className="flex items-center gap-3 p-3 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Ambulance className="w-5 h-5" />
                <span>Emergency Calls</span>
              </Link>
              <Link
                href="/dashboard/patients"
                className="flex items-center gap-3 p-3 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Users className="w-5 h-5" />
                <span>Patient Records</span>
              </Link>
              <Link
                href="/dashboard/prescription-aid"
                className="flex items-center gap-3 p-3 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <FileText className="w-5 h-5" />
                <span>Prescription Aid</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}