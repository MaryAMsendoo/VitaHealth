// app/dashboard/profile/page.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '@/context/UserContext'
import Image from 'next/image'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit3, 
  Save,
  X,
  Shield,
  Bell,
  Heart,
  FileText,
  Download,
  StickyNote
} from 'lucide-react'

interface ProfileData {
  name: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  gender: string
  bloodType: string
  emergencyContact: string
  medicalConditions: string[]
  allergies: string[]
}

export default function Profile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: user?.name || 'Mary Msendoo',
    email: user?.email || 'mary.msendoo@example.com',
    phone: '+234 803 555 1200',
    address: 'Plot 12, GRA Phase 2, Abuja, Nigeria',
    dateOfBirth: '1990-07-12',
    gender: 'Female',
    bloodType: 'O+',
    emergencyContact: '+234 802 333 4567',
    medicalConditions: ['Hypertension', 'Asthma'],
    allergies: ['Penicillin', 'Dust']
  })

  const handleSave = async () => {
    setSaveStatus('loading')
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSaveStatus('success')
      setIsEditing(false)
      
      // Reset status after success
      setTimeout(() => setSaveStatus('idle'), 3000)
    } catch (error) {
      setSaveStatus('error')
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setSaveStatus('idle')
    // Reset form data if needed
  }

  const addMedicalCondition = () => {
    const condition = prompt('Enter medical condition:')
    if (condition) {
      setProfileData(prev => ({
        ...prev,
        medicalConditions: [...prev.medicalConditions, condition]
      }))
    }
  }

  const addAllergy = () => {
    const allergy = prompt('Enter allergy:')
    if (allergy) {
      setProfileData(prev => ({
        ...prev,
        allergies: [...prev.allergies, allergy]
      }))
    }
  }

  const removeMedicalCondition = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      medicalConditions: prev.medicalConditions.filter((_, i) => i !== index)
    }))
  }

  const removeAllergy = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal and medical information</p>
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[#2E37A4] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saveStatus === 'loading'}
              className="bg-[#2E37A4] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {saveStatus === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-800">
            <Save className="w-4 h-4" />
            <p className="text-sm">Profile updated successfully!</p>
          </div>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-800">
            <X className="w-4 h-4" />
            <p className="text-sm">Failed to update profile. Please try again.</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center mb-6">
            <Image
              src={`https://ui-avatars.com/api/?name=${profileData.name}&background=2E37A4&color=fff&size=120`}
              alt={profileData.name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-900">{profileData.name}</h3>
            <p className="text-sm text-gray-500 mb-2">Patient ID: #VH{Date.now().toString().slice(-6)}</p>
            <p className="text-xs text-gray-400">Joined: Jan 2024</p>
          </div>

          <div className="border-t pt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 flex items-center gap-2">
                <User className="w-4 h-4" />
                Gender:
              </span>
              <span className="font-medium text-gray-800">{profileData.gender}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Blood Type:
              </span>
              <span className="font-medium text-gray-800">{profileData.bloodType}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Age:
              </span>
              <span className="font-medium text-gray-800">
                {new Date().getFullYear() - new Date(profileData.dateOfBirth).getFullYear()} years
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                Active
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t mt-6 pt-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Others</h4>
            <div className="space-y-2">
              <button className="w-full cursor-pointer text-left text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50">
                <FileText className="w-4 h-4" />
                Medical Records
              </button>
              {/* <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50">
                <StickyNote className="w-4 h-4" />
                Medication History
              </button>
              <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50">
                <Bell className="w-4 h-4" />
                Notification Preferences
              </button> */}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Personal Information
            </h2>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-900">{profileData.name}</div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-900">{profileData.email}</div>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-900">{profileData.phone}</div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-900">
                      {new Date(profileData.dateOfBirth).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Home Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-900">{profileData.address}</div>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Gender</label>
                  {isEditing ? (
                    <select
                      value={profileData.gender}
                      onChange={(e) => setProfileData(prev => ({ ...prev, gender: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-900">{profileData.gender}</div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Blood Type</label>
                  {isEditing ? (
                    <select
                      value={profileData.bloodType}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bloodType: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-900">{profileData.bloodType}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              Medical Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Medical Conditions */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-gray-700">Medical Conditions</label>
                  {isEditing && (
                    <button
                      onClick={addMedicalCondition}
                      className="text-blue-600 text-sm hover:text-blue-700"
                    >
                      + Add
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {profileData.medicalConditions.map((condition, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-900">{condition}</span>
                      {isEditing && (
                        <button
                          onClick={() => removeMedicalCondition(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {profileData.medicalConditions.length === 0 && (
                    <div className="text-sm text-gray-500 italic p-3 bg-gray-50 rounded-lg">
                      No medical conditions recorded
                    </div>
                  )}
                </div>
              </div>

              {/* Allergies */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-gray-700">Allergies</label>
                  {isEditing && (
                    <button
                      onClick={addAllergy}
                      className="text-blue-600 text-sm hover:text-blue-700"
                    >
                      + Add
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  {profileData.allergies.map((allergy, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-900">{allergy}</span>
                      {isEditing && (
                        <button
                          onClick={() => removeAllergy(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  {profileData.allergies.length === 0 && (
                    <div className="text-sm text-gray-500 italic p-3 bg-gray-50 rounded-lg">
                      No allergies recorded
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.emergencyContact}
                  onChange={(e) => setProfileData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                  placeholder="Emergency contact phone number"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-900">
                  {profileData.emergencyContact}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}