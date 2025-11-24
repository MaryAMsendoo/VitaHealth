// app/dashboard/prescriptions/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Filter,
  FileText,
  Download,
  Eye,
  Calendar,
  Pill,
  Clock,
  AlertCircle,
  Plus,
  CheckCircle,
  X,
  Brain,
  MapPin,
  Bell
} from 'lucide-react'

interface Prescription {
  id: string
  title: string
  description: string
  issueDate: string
  status: 'active' | 'completed' | 'expired'
  medications: Medication[]
  notes?: string
  specialty: string
  consultationType: 'online' | 'in-person' | 'emergency'
}

interface Medication {
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions: string
}

export default function Prescriptions() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'expired'>('all')
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [requestStatus, setRequestStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const prescriptions: Prescription[] = [
    {
      id: '1',
      title: 'Cardiology Treatment Plan',
      description: 'Medication for heart condition and blood pressure management',
      issueDate: 'Nov 1, 2025',
      status: 'active',
      specialty: 'Cardiology',
      consultationType: 'online',
      medications: [
        {
          name: 'Amoxicillin 500mg',
          dosage: '1 capsule',
          frequency: 'Every 8 hours',
          duration: '7 days',
          instructions: 'Take after meals'
        },
        {
          name: 'Paracetamol 500mg',
          dosage: '1 tablet',
          frequency: 'As needed',
          duration: 'Until pain subsides',
          instructions: 'Take with water'
        }
      ],
      notes: 'Ensure to take medication after meals. Return for follow-up in 7 days or if symptoms persist.'
    },
    {
      id: '2',
      title: 'General Health Prescription',
      description: 'Treatment for common cold and fever symptoms',
      issueDate: 'Nov 11, 2025',
      status: 'active',
      specialty: 'General Medicine',
      consultationType: 'in-person',
      medications: [
        {
          name: 'Amoxicillin 500mg',
          dosage: '2 capsules',
          frequency: 'Every 8 hours',
          duration: '7 days',
          instructions: 'Take with food'
        },
        {
          name: 'Vitamin C 1000mg',
          dosage: '1 tablet',
          frequency: 'Once daily',
          duration: '30 days',
          instructions: 'Take in the morning'
        }
      ]
    },
    {
      id: '3',
      title: 'Emergency Care Prescription',
      description: 'Immediate treatment for acute symptoms',
      issueDate: 'Oct 25, 2025',
      status: 'completed',
      specialty: 'Emergency Medicine',
      consultationType: 'emergency',
      medications: [
        {
          name: 'Ibuprofen 400mg',
          dosage: '1 tablet',
          frequency: 'Every 6 hours',
          duration: '3 days',
          instructions: 'Take with food'
        }
      ]
    }
  ]

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prescription.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prescription.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleRequestPrescription = async (e: React.FormEvent) => {
    e.preventDefault()
    setRequestStatus('loading')

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setRequestStatus('success')
      
      // Reset form after success
      setTimeout(() => {
        setShowRequestModal(false)
        setRequestStatus('idle')
      }, 3000)
    } catch (error) {
      setRequestStatus('error')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'completed': return 'bg-blue-100 text-blue-700'
      case 'expired': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getConsultationColor = (type: string) => {
    switch (type) {
      case 'online': return 'bg-blue-100 text-blue-700'
      case 'in-person': return 'bg-green-100 text-green-700'
      case 'emergency': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-600 mt-1">Manage your medications and treatment plans</p>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="bg-[#2E37A4] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Request Prescription
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search prescriptions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-2 text-sm outline-none w-full bg-transparent"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-sm text-gray-600"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Prescription Cards */}
      <div className="grid gap-6">
        {filteredPrescriptions.map((prescription) => (
          <div 
            key={prescription.id} 
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">{prescription.title}</h2>
                <p className="text-sm text-gray-500">{prescription.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                    {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConsultationColor(prescription.consultationType)}`}>
                    {prescription.consultationType}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {prescription.specialty}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar className="w-4 h-4 mr-2" />
              Issued: {prescription.issueDate}
            </div>

            <div className="space-y-3 mb-4">
              {prescription.medications.slice(0, 2).map((medication, index) => (
                <div key={index} className="flex items-start text-sm">
                  <Pill className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">{medication.name}</span>
                    <span className="text-gray-600 ml-2">
                      - {medication.dosage} {medication.frequency} for {medication.duration}
                    </span>
                  </div>
                </div>
              ))}
              {prescription.medications.length > 2 && (
                <div className="text-sm text-gray-500">
                  +{prescription.medications.length - 2} more medications
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setSelectedPrescription(prescription)}
                className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              <button className="text-gray-600 text-sm font-medium hover:text-blue-600 flex items-center gap-1">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredPrescriptions.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No prescriptions found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => setShowRequestModal(true)}
            className="bg-[#2E37A4] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Request New Prescription
          </button>
        </div>
      )}

      {/* Prescription Details Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 p-6 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedPrescription(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                {selectedPrescription.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">{selectedPrescription.description}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Issued: {selectedPrescription.issueDate}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPrescription.status)}`}>
                  {selectedPrescription.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConsultationColor(selectedPrescription.consultationType)}`}>
                  {selectedPrescription.consultationType}
                </span>
              </div>
            </div>

            {/* Medications */}
            <div className="border-t border-b border-gray-200 py-4 mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Pill className="w-4 h-4 text-green-600" />
                Prescribed Medications
              </h3>
              <div className="space-y-4">
                {selectedPrescription.medications.map((medication, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="font-medium text-gray-900 mb-2">{medication.name}</div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      <div><strong>Dosage:</strong> {medication.dosage}</div>
                      <div><strong>Frequency:</strong> {medication.frequency}</div>
                      <div><strong>Duration:</strong> {medication.duration}</div>
                      <div><strong>Instructions:</strong> {medication.instructions}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            {selectedPrescription.notes && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                  Important Notes
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed bg-blue-50 p-3 rounded-lg">
                  {selectedPrescription.notes}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setSelectedPrescription(null)}
                className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-100"
              >
                Close
              </button>
              <button className="px-4 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-[#2E37A4] to-[#0E9384] hover:opacity-90 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Prescription Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Request New Prescription</h2>
              <button 
                onClick={() => setShowRequestModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {requestStatus === 'success' ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Request Submitted</h3>
                <p className="text-gray-600">Our medical team will review your request and contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleRequestPrescription}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medical Concern</label>
                  <select className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>General Consultation</option>
                    <option>Medication Refill</option>
                    <option>Follow-up Treatment</option>
                    <option>Emergency Care</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms Description</label>
                  <textarea 
                    placeholder="Describe your symptoms and reason for prescription request..."
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowRequestModal(false)}
                    className="px-4 py-2 text-gray-600 text-sm hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={requestStatus === 'loading'}
                    className="bg-[#2E37A4] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {requestStatus === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}