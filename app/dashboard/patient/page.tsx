// app/dashboard/patient/page.tsx
'use client'

import { useAuth } from '@/context/UserContext'
import Link from 'next/link'
import {
  Brain,
  Bell,
  Ambulance,
  Pill,
  Calendar,
  FileText,
  MapPin,
  Clock,
  Search,
  AlertCircle,
  Video,
  Building
} from 'lucide-react'

export default function PatientDashboard() {
  const { user } = useAuth()

  // Stats aligned with new features
  const stats = [
    {
      icon: Calendar,
      label: 'Upcoming Appointments',
      value: '3',
      description: '2 confirmed, 1 pending'
    },
    {
      icon: FileText,
      label: 'Active Prescriptions',
      value: '5',
      description: '2 need renewal'
    },
    {
      icon: Bell,
      label: 'Notifications',
      value: '8',
      description: '3 unread reminders'
    },
    {
      icon: MapPin,
      label: 'Nearby Services',
      value: '15+',
      description: 'Pharmacies & Centers'
    }
  ]

  // Updated upcoming appointments without doctor names
  const upcomingAppointments = [
    {
      id: '1',
      description: 'Cardiology Follow-up Consultation',
      date: 'Today, 10:00 AM',
      type: 'online',
      status: 'confirmed',
      specialty: 'Cardiology'
    },
    {
      id: '2',
      description: 'General Health Checkup',
      date: 'Tomorrow, 2:00 PM',
      type: 'in-person',
      status: 'confirmed',
      specialty: 'General Medicine'
    },
    {
      id: '3',
      description: 'Emergency Care Consultation',
      date: '30 Mar, 11:00 AM',
      type: 'online',
      status: 'pending',
      specialty: 'Emergency Medicine'
    }
  ]

  const recentNotifications = [
    {
      icon: Bell,
      title: 'Medication Reminder',
      message: 'Take Blood Pressure medication',
      time: '10 mins ago',
      urgent: true
    },
    {
      icon: Calendar,
      title: 'Appointment Tomorrow',
      message: 'General Health Checkup at 2:00 PM',
      time: '2 hours ago',
      urgent: false
    },
    {
      icon: Pill,
      title: 'Prescription Ready',
      message: 'New prescription available for pickup',
      time: '1 day ago',
      urgent: false
    }
  ]

  const healthResources = [
    {
      icon: Search,
      title: 'Symptom Checker',
      description: 'Understand your symptoms and get guidance',
      href: '/symptom-checker'
    },
    {
      icon: Brain,
      title: 'Home Care Practices',
      description: 'Best practices for managing health at home',
      href: '/home-practices'
    }
  ]

  

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 mt-1">Here's your health overview</p>
        </div>
        <Link
          href="/dashboard/book-consultation"
          className="bg-[#2E37A4] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <span className="text-xl">+</span>
          Book Consultation
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
            </div>
            <div className="text-gray-600 text-sm mb-1">{stat.label}</div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-gray-500 text-xs">{stat.description}</div>
          </div>
        ))}
      </div>      

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Appointments & Health Resources */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointments - Simplified */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
              <Link 
                href="/dashboard/appointments"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                View all
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex items-center gap-3">
                   
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{appointment.description}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {appointment.specialty}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          appointment.type === 'online' 
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{appointment.date}</div>
                    <button className={`text-sm mt-1 ${
                      appointment.status === 'confirmed' 
                        ? 'text-green-600 hover:text-green-700' 
                        : 'text-yellow-600 hover:text-yellow-700'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Join' : 'Confirm'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Resources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Health Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthResources.map((resource, index) => (
                <Link
                  key={index}
                  href={resource.href}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <resource.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{resource.title}</div>
                      <div className="text-sm text-gray-600">{resource.description}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Notifications & Emergency */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
              <Link 
                href="/dashboard/notifications"
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                View all
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentNotifications.map((notification, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border ${
                    notification.urgent 
                      ? 'border-red-200 bg-red-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      notification.urgent ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      <notification.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">
                        {notification.title}
                      </div>
                      <div className="text-gray-600 text-xs mt-1">
                        {notification.message}
                      </div>
                      <div className="text-gray-400 text-xs mt-2 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Support */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                <Ambulance className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Emergency Support</h3>
                <p className="text-sm text-gray-600">24/7 medical assistance</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Emergency Line:</span>
                <span className="font-semibold text-red-600">+234-XXX-EMERGENCY</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Available:</span>
                <span className="font-semibold text-green-600">24/7</span>
              </div>
            </div>
            
            <Link
              href="/dashboard/emergency"
              className="w-full bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <AlertCircle className="w-4 h-4" />
              Get Emergency Help
            </Link>
          </div>

          {/* AI Assistant Quick Access */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Health Assistant</h3>
                <p className="text-sm text-gray-600">Get instant health guidance</p>
              </div>
            </div>
            
            <Link
              href="/dashboard/ai-assistant"
              className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <Brain className="w-4 h-4" />
              Ask Health Questions
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}