// app/dashboard/emergency/page.tsx
'use client'

import { useState } from 'react'
import { 
  Phone, 
  Clock, 
  Users, 
  Shield,
  AlertTriangle,
  CheckCircle2,
  MessageCircle,
  MapPin,
  X
} from 'lucide-react'

export default function EmergencyPage() {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)
  const [emergencyInfo, setEmergencyInfo] = useState({
    type: '',
    location: '',
    description: ''
  })

  const emergencyContacts = [
    {
      name: 'Emergency Hotline',
      number: '911',
      description: 'Immediate emergency response',
      available: true
    },
    {
      name: 'Hospital Emergency',
      number: '+1 (234) 567-8900',
      description: '24/7 hospital emergency line',
      available: true
    },
    {
      name: 'Medical Director',
      number: '+1 (234) 567-8901',
      description: 'Dr. Sarah Johnson',
      available: true
    }
  ]

  const emergencyTypes = [
    'Cardiac Emergency',
    'Respiratory Distress',
    'Severe Injury',
    'Allergic Reaction',
    'Neurological Symptoms',
    'Severe Pain',
    'Other Medical Emergency'
  ]

  const handleSubmitEmergency = () => {
    // Simulate emergency request submission
    setTimeout(() => {
      setShowEmergencyModal(false)
      setEmergencyInfo({ type: '', location: '', description: '' })
      // Here you would typically send this to the assigned doctors
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Emergency Support</h1>
          <p className="text-gray-600 mt-1">24/7 medical assistance when you need it most</p>
        </div>
        <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-semibold">Emergency Hotline: 911</span>
        </div>
      </div>

      {/* Emergency Alert Banner */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900 text-sm">Critical Emergency Notice</h3>
            <p className="text-red-700 text-xs mt-1">
              For life-threatening emergencies, call emergency services immediately. 
              Use this platform to notify assigned medical professionals for urgent support.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-[#2E37A4]" />
          Emergency Contacts
        </h2>
        
        <div className="space-y-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">{contact.name}</p>
                  <p className="text-xs text-gray-500">{contact.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">{contact.number}</p>
                <span className={`text-xs font-medium ${contact.available ? 'text-green-600' : 'text-red-600'}`}>
                  {contact.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Request Emergency Assistance */}
      <div className="bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#2E37A4]" />
          Request Emergency Assistance
        </h2>
        
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Notify assigned medical professionals about your emergency. They will contact you immediately.
          </p>
          
          <div className='w-full flex-col flex items-center justify-center'>
            <button 
            onClick={() => setShowEmergencyModal(true)}
            className="md:w-md w-full py-4 rounded-lg text-white bg-gradient-to-r from-red-600 to-red-700 hover:opacity-90 flex items-center justify-center gap-2 font-semibold"
          >
            <AlertTriangle className="w-5 h-5" />
            Request Emergency Assistance
          </button>
          </div>
        </div>
      </div>      

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative">
            <button 
              onClick={() => {
                setShowEmergencyModal(false)
                setEmergencyInfo({ type: '', location: '', description: '' })
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Emergency Assistance Request</h2>
              <p className="text-gray-600 mt-1">Medical professionals will contact you immediately</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Emergency Type</label>
                <select 
                  value={emergencyInfo.type}
                  onChange={(e) => setEmergencyInfo({...emergencyInfo, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select emergency type</option>
                  {emergencyTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Your Location</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={emergencyInfo.location}
                    onChange={(e) => setEmergencyInfo({...emergencyInfo, location: e.target.value})}
                    placeholder="Enter your current location"
                    className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <MapPin className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">Emergency Description</label>
                <textarea 
                  value={emergencyInfo.description}
                  onChange={(e) => setEmergencyInfo({...emergencyInfo, description: e.target.value})}
                  placeholder="Briefly describe the emergency situation..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t">
              <button 
                onClick={() => setShowEmergencyModal(false)}
                className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitEmergency}
                disabled={!emergencyInfo.type || !emergencyInfo.location}
                className="px-4 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-red-600 to-red-700 hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Send Emergency Alert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Regulatory Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 text-sm">Secure & Confidential</h3>
            <p className="text-blue-700 text-xs mt-1">
              All emergency interactions are secure and confidential, following regulatory compliance standards. 
              Your information is shared only with assigned medical professionals to ensure you receive appropriate care.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}