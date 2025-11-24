// app/dashboard/diagnostics/page.tsx
'use client'

import { useState } from 'react'
import {
  Search,
  MapPin,
  Clock,
  Star,
  Filter,
  X,
  Calendar,
  User,
  Phone,
  AlertCircle,
  CheckCircle2
} from 'lucide-react'

interface DiagnosticCenter {
  id: string
  name: string
  address: string
  rating: number
  reviews: number
  image: string
  services: string[]
  operatingHours: {
    open: string
    close: string
  }
  availableSlots: string[]
}

export default function DiagnosticsPage() {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [selectedCenter, setSelectedCenter] = useState<DiagnosticCenter | null>(null)
  const [appointmentStatus, setAppointmentStatus] = useState<'idle' | 'booking' | 'success'>('idle')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedService, setSelectedService] = useState('')

  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    patientName: '',
    phone: '',
    email: '',
    notes: ''
  })

  const diagnosticCenters: DiagnosticCenter[] = [
    {
      id: '1',
      name: 'Medical Center Makurdi',
      address: 'Beside St. Joseph Catholic Church wadata, Makurdi',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      services: ['MRI', 'CT Scan', 'X-Ray', 'Blood Tests', 'Ultrasound'],
      operatingHours: {
        open: '07:00',
        close: '20:00'
      },
      availableSlots: ['09:00', '10:30', '14:00', '15:30', '17:00']
    },
    {
      id: '2',
      name: 'Precision Imaging Center',
      address: '456 Radiology Street, Downtown',
      rating: 4.6,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1564325724739-bae0bd08762c?auto=format&fit=crop&w=1200&q=80',
      services: ['MRI', 'CT Scan', 'Mammography', 'Bone Density'],
      operatingHours: {
        open: '08:00',
        close: '18:00'
      },
      availableSlots: ['08:30', '11:00', '13:30', '16:00']
    },
    {
      id: '3',
      name: 'Community Health Labs',
      address: '789 Wellness Blvd, Suburban Area',
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      services: ['Blood Tests', 'Urine Analysis', 'Thyroid Panel', 'Vitamin Tests'],
      operatingHours: {
        open: '06:00',
        close: '22:00'
      },
      availableSlots: ['07:00', '10:00', '12:30', '15:00', '18:30', '20:00']
    },
    {
      id: '4',
      name: 'Cardiac Diagnostic Center',
      address: '321 Heart Care Lane, Medical Complex',
      rating: 4.7,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      services: ['ECG', '2D Echo', 'TMT', 'Holter Monitoring'],
      operatingHours: {
        open: '07:30',
        close: '19:00'
      },
      availableSlots: ['08:00', '10:00', '12:00', '14:00', '16:00']
    },
    {
      id: '5',
      name: 'Advanced Radiology Institute',
      address: '654 Scan Avenue, Tech Park',
      rating: 4.5,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      services: ['MRI', 'CT Scan', 'PET Scan', 'Ultrasound', 'X-Ray'],
      operatingHours: {
        open: '07:00',
        close: '21:00'
      },
      availableSlots: ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00', '17:30']
    },
    {
      id: '6',
      name: 'Metro Laboratory Services',
      address: '987 Test Street, Central Business District',
      rating: 4.4,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      services: ['Blood Tests', 'Pathology', 'Genetic Testing', 'Allergy Tests'],
      operatingHours: {
        open: '06:30',
        close: '19:30'
      },
      availableSlots: ['07:00', '08:30', '10:00', '11:30', '13:00', '14:30', '16:00']
    }
  ]

  // Common diagnostic tests for filtering
  const diagnosticTests = [
    'MRI',
    'CT Scan',
    'X-Ray',
    'Ultrasound',
    'Blood Tests',
    'Mammography',
    'Bone Density',
    'ECG',
    '2D Echo',
    'TMT',
    'Holter Monitoring',
    'Urine Analysis',
    'Thyroid Panel',
    'Vitamin Tests',
    'PET Scan',
    'Pathology',
    'Genetic Testing',
    'Allergy Tests'
  ]

  const filteredCenters = diagnosticCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.address.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by selected diagnostic test - only show centers that offer this specific test
    const matchesTest = !selectedService || center.services.includes(selectedService)

    return matchesSearch && matchesTest
  })

  const handleBookAppointment = (center: DiagnosticCenter) => {
    setSelectedCenter(center)
    setAppointmentData({
      date: '',
      time: '',
      patientName: '',
      phone: '',
      email: '',
      notes: ''
    })
    setShowAppointmentModal(true)
    setAppointmentStatus('idle')
  }

  const handleConfirmBooking = async () => {
    setAppointmentStatus('booking')

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setAppointmentStatus('success')

      // Reset after success
      setTimeout(() => {
        setShowAppointmentModal(false)
        setAppointmentStatus('idle')
        setSelectedCenter(null)
      }, 3000)
    } catch (error) {
      setAppointmentStatus('idle')
    }
  }

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Diagnostic Centers</h1>
          <p className="text-gray-600 mt-1">Find and book diagnostic tests near you</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search centers or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Diagnostic Tests</option>
            {diagnosticTests.map(test => (
              <option key={test} value={test}>{test}</option>
            ))}
          </select>

          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedService('')
            }}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 text-gray-700"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredCenters.length} of {diagnosticCenters.length} diagnostic centers
          {selectedService && ` that offer ${selectedService}`}
        </p>
      </div>

      {/* Diagnostic Centers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCenters.map((center) => (
          <div key={center.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img
                src={center.image}
                alt={center.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-gray-900">{center.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-3">{center.name}</h3>

              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <MapPin className="w-4 h-4" />
                <p className="text-sm">{center.address}</p>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Clock className="w-4 h-4" />
                <p className="text-sm">
                  {formatTime(center.operatingHours.open)} - {formatTime(center.operatingHours.close)}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 mb-2">Available Tests:</p>
                <div className="flex flex-wrap gap-1">
                  {center.services.slice(0, 3).map((service, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded text-xs font-medium ${selectedService === service
                          ? 'bg-[#2E37A4] text-white'
                          : 'bg-blue-50 text-blue-700'
                        }`}
                    >
                      {service}
                    </span>
                  ))}
                  {center.services.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                      +{center.services.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{center.reviews} reviews</span>
                <button
                  onClick={() => handleBookAppointment(center)}
                  className="px-4 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-[#2E37A4] to-[#0E9384] hover:opacity-90 font-medium"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCenters.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">
            {selectedService
              ? `No diagnostic centers found offering "${selectedService}"`
              : 'No diagnostic centers found matching your criteria.'
            }
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedService('')
            }}
            className="text-[#2E37A4] hover:underline mt-2"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Appointment Modal */}
      {showAppointmentModal && selectedCenter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAppointmentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            {appointmentStatus === 'success' ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Appointment Booked!</h3>
                <p className="text-gray-600">Your diagnostic appointment has been confirmed.</p>
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <p className="text-sm font-medium text-gray-900">{selectedCenter.name}</p>
                  <p className="text-sm text-gray-600">{appointmentData.date} at {appointmentData.time}</p>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Book Appointment</h2>
                <p className="text-gray-600 mb-6">{selectedCenter.name}</p>

                <form className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h3 className="font-medium text-blue-900 mb-2">Selected Center</h3>
                    <p className="text-sm text-blue-800">{selectedCenter.name}</p>
                    <p className="text-xs text-blue-700">{selectedCenter.address}</p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Date</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="date"
                        value={appointmentData.date}
                        onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Preferred Time</label>
                    <select
                      value={appointmentData.time}
                      onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a time slot</option>
                      {selectedCenter.availableSlots.map(slot => (
                        <option key={slot} value={slot}>{formatTime(slot)}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Patient Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={appointmentData.patientName}
                        onChange={(e) => setAppointmentData({ ...appointmentData, patientName: e.target.value })}
                        placeholder="Enter patient's full name"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={appointmentData.phone}
                        onChange={(e) => setAppointmentData({ ...appointmentData, phone: e.target.value })}
                        placeholder="Enter phone number"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={appointmentData.email}
                      onChange={(e) => setAppointmentData({ ...appointmentData, email: e.target.value })}
                      placeholder="Enter email address"
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Additional Notes (Optional)</label>
                    <textarea
                      value={appointmentData.notes}
                      onChange={(e) => setAppointmentData({ ...appointmentData, notes: e.target.value })}
                      placeholder="Any specific requirements or notes..."
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAppointmentModal(false)}
                      className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmBooking}
                      disabled={!appointmentData.date || !appointmentData.time || !appointmentData.patientName || !appointmentData.phone || appointmentStatus === 'booking'}
                      className="px-4 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-[#2E37A4] to-[#0E9384] hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
                    >
                      {appointmentStatus === 'booking' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Booking...
                        </>
                      ) : (
                        'Confirm Appointment'
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Regulatory Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 text-sm">Appointment Information</h3>
            <p className="text-blue-700 text-xs mt-1">
              All appointments are processed directly with the diagnostic centers.
              You will receive a confirmation call from the center within 24 hours.
              Please bring your ID and any previous test results to your appointment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}