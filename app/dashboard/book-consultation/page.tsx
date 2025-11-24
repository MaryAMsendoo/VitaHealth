// app/dashboard/book-consultation/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Clock,
  CheckCircle,
  Calendar,
  Video,
  Building,
  AlertCircle,
  Bell,
  Brain,
  Stethoscope,
  User
} from 'lucide-react'

interface AppointmentData {
  specialty: string
  date: string
  time: string
  type: 'in-person' | 'online'
  symptoms?: string
  urgency: 'routine' | 'urgent' | 'emergency'
}

interface BookingState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

export default function BookConsultation() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('General Medicine')
  const [selectedDate, setSelectedDate] = useState('Today')
  const [selectedTime, setSelectedTime] = useState('10:00 AM')
  const [consultationType, setConsultationType] = useState<'in-person' | 'online'>('online')
  const [symptoms, setSymptoms] = useState('')
  const [urgency, setUrgency] = useState<'routine' | 'urgent' | 'emergency'>('routine')
  const [bookingState, setBookingState] = useState<BookingState>({
    status: 'idle',
    message: ''
  })

  const specialties = [
    'General Medicine', 'Cardiology', 'Neurology', 'Pediatrics', 
    'Dermatology', 'Orthopedics', 'Gynecology', 'Psychiatry',
    'Emergency Medicine', 'Oncology', 'Endocrinology'
  ]

  const timeSlots = [
    { time: '09:00', period: 'AM', available: true },
    { time: '10:00', period: 'AM', available: true },
    { time: '11:00', period: 'AM', available: true },
    { time: '12:00', period: 'PM', available: true },
    { time: '02:00', period: 'PM', available: true },
    { time: '03:00', period: 'PM', available: true },
    { time: '04:00', period: 'PM', available: true },
  ]

  const appointmentDates = [
    'Today',
    'Tomorrow',
    'July 22, 2025',
    'July 23, 2025',
    'July 24, 2025'
  ]

  const consultationFees = {
    'online': '',
    'in-person': '',
    'emergency': "",
  }

  const getConsultationFee = () => {
    if (urgency === 'emergency') return consultationFees.emergency
    return consultationFees[consultationType]
  }

  const handleConfirmBooking = async () => {
    setBookingState({ status: 'loading', message: 'Booking your appointment...' })

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const appointmentData: AppointmentData = {
        specialty: selectedSpecialty,
        date: selectedDate,
        time: selectedTime,
        type: consultationType,
        symptoms: symptoms,
        urgency: urgency
      }

      console.log('Booking appointment:', appointmentData)
      
      setBookingState({
        status: 'success',
        message: `Appointment booked successfully! You will receive notifications and reminders. ${consultationType === 'online' ? 'Join using the link we will send you.' : 'Visit the hospital at your scheduled time.'}`
      })

      // Reset form after successful booking
      setTimeout(() => {
        setSelectedTime('10:00 AM')
        setSymptoms('')
        setUrgency('routine')
        setBookingState({ status: 'idle', message: '' })
      }, 5000)

    } catch (error) {
      setBookingState({
        status: 'error',
        message: 'Failed to book appointment. Please try again.'
      })
    }
  }

  const handleEmergencyBooking = () => {
    setSelectedSpecialty('Emergency Medicine')
    setUrgency('emergency')
    setConsultationType('in-person')
    setSelectedDate('Today')
    setSelectedTime('Immediately')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Book Consultation</h1>
          <p className="text-gray-600 mt-1">Schedule an appointment with our medical team</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/appointments"
            className="bg-[#2E37A4] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            My Appointments
          </Link>
        </div>
      </div>

      {/* Booking Status Message */}
      {bookingState.message && (
        <div className={`p-4 rounded-lg border ${
          bookingState.status === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800'
            : bookingState.status === 'error'
            ? 'bg-red-50 border-red-200 text-red-800'
            : 'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <div className="flex items-center gap-2">
            {bookingState.status === 'success' && <CheckCircle className="w-4 h-4" />}
            {bookingState.status === 'error' && <AlertCircle className="w-4 h-4" />}
            {bookingState.status === 'loading' && <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />}
            <p className="text-sm">{bookingState.message}</p>
          </div>
        </div>
      )}

      {/* Quick Consultation Type */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => {
            setConsultationType('online')
            setUrgency('routine')
          }}
          className={`p-4 border rounded-xl text-left transition-colors ${
            consultationType === 'online' && urgency !== 'emergency'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-300'
          }`}
        >
          <Video className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="font-semibold text-gray-900">Online Consultation</h3>
          <p className="text-sm text-gray-600 mt-1">Video call from home</p>
          <div className="text-lg font-semibold text-gray-900 mt-2">₦{consultationFees.online}</div>
        </button>

        <button
          onClick={() => {
            setConsultationType('in-person')
            setUrgency('routine')
          }}
          className={`p-4 border rounded-xl text-left transition-colors ${
            consultationType === 'in-person' && urgency !== 'emergency'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 hover:border-green-300'
          }`}
        >
          <Building className="w-8 h-8 text-green-600 mb-2" />
          <h3 className="font-semibold text-gray-900">Hospital Visit</h3>
          <p className="text-sm text-gray-600 mt-1">In-person appointment</p>
          <div className="text-lg font-semibold text-gray-900 mt-2">₦{consultationFees['in-person']}</div>
        </button>

        <Link
          href="/ai-assistant"
          className="p-4 border border-gray-200 rounded-xl text-left hover:border-purple-300 transition-colors"
        >
          <Brain className="w-8 h-8 text-purple-600 mb-2" />
          <h3 className="font-semibold text-gray-900">AI Health Assistant</h3>
          <p className="text-sm text-gray-600 mt-1">Get quick health advice first</p>
          <div className="text-sm text-purple-600 font-medium mt-2">Free</div>
        </Link>
      </div>      {/* Urgency Level */}
      

      {/* Select Specialty Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Medical Specialty Needed</h2>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty) => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedSpecialty === specialty
                  ? 'bg-[#2E37A4] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      {/* Symptoms Description */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {urgency === 'emergency' ? 'Emergency Details' : 'Describe Your Symptoms'}
        </h2>
        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder={
            urgency === 'emergency' 
              ? "Please describe the emergency situation and current symptoms..."
              : "Briefly describe your symptoms or reason for consultation. This helps our medical team prepare."
          }
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          rows={3}
        />
      </div>

      {/* Select Date & Time Section */}
      {urgency !== 'emergency' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Select Preferred Time</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {appointmentDates.map((date) => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Available Time Slots
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedTime(`${slot.time} ${slot.period}`)}
                    className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                      selectedTime === `${slot.time} ${slot.period}`
                        ? 'bg-[#2E37A4] text-white border-[#2E37A4]'
                        : 'border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    {slot.time} {slot.period}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Appointment Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-bold text-gray-900">
            {urgency === 'emergency' ? 'Emergency Appointment Summary' : 'Appointment Summary'}
          </h2>
        </div>

        {/* Appointment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Stethoscope className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Specialty</div>
              <div className="font-semibold text-gray-900">{selectedSpecialty}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Service Type</div>
              <div className="font-semibold text-gray-900 capitalize">
                {urgency === 'emergency' ? 'Emergency Care' : `${consultationType} Consultation`}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">
                {urgency === 'emergency' ? 'Response Time' : 'Date & Time'}
              </div>
              <div className="font-semibold text-gray-900">
                {urgency === 'emergency' ? 'Immediate' : `${selectedDate}, ${selectedTime}`}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Urgency Level</div>
              <div className="font-semibold text-gray-900 capitalize">
                {urgency === 'emergency' ? (
                  <span className="text-red-600">Emergency</span>
                ) : urgency === 'urgent' ? (
                  <span className="text-orange-600">Urgent</span>
                ) : (
                  <span className="text-blue-600">Routine</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Consultation Fee & Actions */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Consultation Fee:</span>
            <span className="font-semibold text-gray-900 text-lg">₦{getConsultationFee()}</span>
          </div>

          <div className='w-full flex flex-col items-center justify-center'>
            <button
            onClick={handleConfirmBooking}
            disabled={bookingState.status === 'loading'}
            className="md:w-md w-full bg-[#2E37A4] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {bookingState.status === 'loading' ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {urgency === 'emergency' ? 'Connecting to Emergency...' : 'Booking...'}
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                {urgency === 'emergency' ? 'Get Emergency Help Now' : 'Confirm Booking'}
              </>
            )}
          </button>
          </div>

          {/* Additional Information */}
          <div className="mt-4 text-xs text-gray-500">
            <div className="flex items-center gap-2 justify-center">
              <Bell className="w-3 h-3" />
              <p>
                {urgency === 'emergency' 
                  ? 'Emergency team will contact you immediately'
                  : 'You will receive SMS and email reminders before your appointment'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}