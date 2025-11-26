// app/dashboard/notifications/page.tsx
'use client'

import { useState } from 'react'
import { 
  Bell,
  Clock,
  Calendar,
  CheckCircle2,
  X,
  Edit3,
  Phone,
  User,
  MapPin,
  Pill,
  Stethoscope
} from 'lucide-react'

interface Notification {
  id: string
  type: 'medication' | 'appointment' | 'reminder' | 'general'
  title: string
  message: string
  time: string
  date: string
  isRead: boolean
  relatedTo?: string
}

interface ContactDetail {
  id: string
  name: string
  relationship: string
  phone: string
  email?: string
  address?: string
  isPrimary: boolean
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'medication' | 'upcoming' | 'past' | 'all'>('all')
  const [showContactModal, setShowContactModal] = useState(false)
  const [editingContact, setEditingContact] = useState<ContactDetail | null>(null)

  const [contactData, setContactData] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    address: '',
    isPrimary: false
  })

  // Get current date and future dates for realistic data
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)
  
  const lastWeek = new Date(today)
  lastWeek.setDate(lastWeek.getDate() - 7)
  
  const twoDaysAgo = new Date(today)
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'medication',
      title: 'Medication Reminder',
      message: 'Time to take your prescribed medication - Amoxicillin 500mg',
      time: '08:00 AM',
      date: formatDateForInput(today), // Today
      isRead: false,
      relatedTo: 'Amoxicillin 500mg'
    },
    {
      id: '2',
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'You have an appointment with Dr. Sarah Johnson tomorrow at 2:00 PM',
      time: '02:00 PM',
      date: formatDateForInput(tomorrow), // Tomorrow
      isRead: false,
      relatedTo: 'Dr. Sarah Johnson'
    },
    {
      id: '3',
      type: 'medication',
      title: 'Medication Reminder',
      message: 'Time to take your prescribed medication - Vitamin C 1000mg',
      time: '06:00 PM',
      date: formatDateForInput(today), // Today
      isRead: true,
      relatedTo: 'Vitamin C 1000mg'
    },
    {
      id: '4',
      type: 'appointment',
      title: 'Past Appointment',
      message: 'Your appointment with Dr. Michael Brown was completed',
      time: '10:00 AM',
      date: formatDateForInput(twoDaysAgo), // Past date
      isRead: true,
      relatedTo: 'Dr. Michael Brown'
    },
    {
      id: '5',
      type: 'appointment',
      title: 'Upcoming Cardiology Consultation',
      message: 'Scheduled cardiology follow-up appointment',
      time: '11:00 AM',
      date: formatDateForInput(nextWeek), // Future date
      isRead: false,
      relatedTo: 'Dr. James Wilson'
    },
    {
      id: '6',
      type: 'reminder',
      title: 'Lab Test Reminder',
      message: 'Remember to fast before your blood test tomorrow',
      time: '07:00 AM',
      date: formatDateForInput(tomorrow), // Tomorrow
      isRead: false
    },
    {
      id: '7',
      type: 'general',
      title: 'Health Tip',
      message: 'Stay hydrated and maintain a balanced diet for better health',
      time: '09:00 AM',
      date: formatDateForInput(lastWeek), // Past date
      isRead: true
    },
    {
      id: '8',
      type: 'appointment',
      title: 'Dental Checkup Completed',
      message: 'Your dental checkup was successfully completed',
      time: '03:00 PM',
      date: formatDateForInput(lastWeek), // Past date
      isRead: true,
      relatedTo: 'Dr. Emily Davis'
    }
  ]

  const contactDetails: ContactDetail[] = [
    {
      id: '1',
      name: 'John Doe',
      relationship: 'Spouse',
      phone: '+1 (234) 567-8901',
      email: 'john.doe@example.com',
      address: '123 Main Street, City',
      isPrimary: true
    },
    {
      id: '2',
      name: 'Jane Smith',
      relationship: 'Sibling',
      phone: '+1 (234) 567-8902',
      email: 'jane.smith@example.com',
      isPrimary: false
    },
    {
      id: '3',
      name: 'Robert Wilson',
      relationship: 'Friend',
      phone: '+1 (234) 567-8903',
      isPrimary: false
    }
  ]

  // Fixed filtering logic
  const filteredNotifications = notifications.filter(notification => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set to start of today
    
    const notificationDate = new Date(notification.date)
    notificationDate.setHours(0, 0, 0, 0) // Set to start of notification date

    switch (activeTab) {
      case 'medication':
        return notification.type === 'medication'
      case 'upcoming':
        // Show appointments with date >= today
        return notification.type === 'appointment' && notificationDate >= today
      case 'past':
        // Show appointments with date < today
        return notification.type === 'appointment' && notificationDate < today
      default:
        return true
    }
  })

  // FIXED: Correct tab count calculation
  const getTabCounts = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const allNotifications = notifications.length
    const medicationNotifications = notifications.filter(n => n.type === 'medication').length
    
    // FIX: Properly count upcoming appointments (date >= today)
    const upcomingAppointments = notifications.filter(n => {
      if (n.type !== 'appointment') return false
      const notifDate = new Date(n.date)
      notifDate.setHours(0, 0, 0, 0)
      return notifDate >= today
    }).length
    
    // FIX: Properly count past appointments (date < today)
    const pastAppointments = notifications.filter(n => {
      if (n.type !== 'appointment') return false
      const notifDate = new Date(n.date)
      notifDate.setHours(0, 0, 0, 0)
      return notifDate < today
    }).length

    return {
      all: allNotifications,
      medication: medicationNotifications,
      upcoming: upcomingAppointments,
      past: pastAppointments
    }
  }

  const tabCounts = getTabCounts()

  const handleEditContact = (contact: ContactDetail) => {
    setEditingContact(contact)
    setContactData({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      email: contact.email || '',
      address: contact.address || '',
      isPrimary: contact.isPrimary
    })
    setShowContactModal(true)
  }

  const handleSaveContact = () => {
    // Here you would typically save to your backend
    console.log('Saving contact:', contactData)
    setShowContactModal(false)
    setEditingContact(null)
    setContactData({
      name: '',
      relationship: '',
      phone: '',
      email: '',
      address: '',
      isPrimary: false
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return <Pill className="w-5 h-5 text-blue-600" />
      case 'appointment':
        return <Stethoscope className="w-5 h-5 text-green-600" />
      case 'reminder':
        return <Clock className="w-5 h-5 text-orange-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split('T')[0]
    return dateString === today
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">Manage your medication reminders and appointment notifications</p>
        </div>
      </div>

      {/* Tabs - Made responsive */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto scrollbar-hide px-4 md:px-6" aria-label="Tabs">
            <div className="flex space-x-4 md:space-x-8 min-w-max">
              {[
                { id: 'all', name: 'All Notifications', count: tabCounts.all },
                { id: 'medication', name: 'Medication Times', count: tabCounts.medication },
                { id: 'upcoming', name: 'Upcoming Appointments', count: tabCounts.upcoming },
                { id: 'past', name: 'Past Appointments', count: tabCounts.past }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'border-[#2E37A4] text-[#2E37A4]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden">
                    {tab.id === 'all' ? 'All' : 
                     tab.id === 'medication' ? 'Meds' : 
                     tab.id === 'upcoming' ? 'Upcoming' : 'Past'}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activeTab === tab.id
                      ? 'bg-[#2E37A4] text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Notifications List */}
        <div className="p-4 md:p-6">
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-4 border rounded-lg transition-colors ${
                  notification.isRead
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                    <h3 className={`font-semibold text-sm sm:text-base ${
                      notification.isRead ? 'text-gray-900' : 'text-blue-900'
                    }`}>
                      {notification.title}
                    </h3>
                    <div className="flex gap-1">
                      {!notification.isRead && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          New
                        </span>
                      )}
                      {activeTab === 'upcoming' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Upcoming
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-2 ${
                    notification.isRead ? 'text-gray-600' : 'text-blue-700'
                  }`}>
                    {notification.message}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {isToday(notification.date) ? 'Today' : formatDate(notification.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{notification.time}</span>
                    </div>
                    {notification.relatedTo && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                        {notification.relatedTo}
                      </span>
                    )}
                  </div>
                </div>
                
                <button className="flex-shrink-0 text-gray-400 hover:text-gray-600 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            ))}
            
            {filteredNotifications.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <Bell className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm sm:text-base">
                  {activeTab === 'upcoming' 
                    ? 'No upcoming appointments found.' 
                    : activeTab === 'past'
                    ? 'No past appointments found.'
                    : activeTab === 'medication'
                    ? 'No medication reminders found.'
                    : 'No notifications found.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notification Contacts Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-[#2E37A4]" />
              Notification Contacts
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Contacts who will receive notifications when you're unavailable
            </p>
          </div>
          <button
            onClick={() => setShowContactModal(true)}
            className="px-4 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-[#2E37A4] to-[#0E9384] hover:opacity-90 font-medium flex items-center gap-2 w-fit"
          >
            <Edit3 className="w-4 h-4" />
            Edit Contacts
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contactDetails.map((contact) => (
            <div key={contact.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{contact.name}</h3>
                  <p className="text-sm text-gray-600">{contact.relationship}</p>
                </div>
                {contact.isPrimary && (
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    Primary
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">{contact.phone}</span>
                </div>
                {contact.email && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-xs sm:text-sm">Email:</span> 
                    <span className="text-xs sm:text-sm"> {contact.email}</span>
                  </div>
                )}
                {contact.address && (
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">{contact.address}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => {
                setShowContactModal(false)
                setEditingContact(null)
                setContactData({
                  name: '',
                  relationship: '',
                  phone: '',
                  email: '',
                  address: '',
                  isPrimary: false
                })
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {editingContact ? 'Edit Contact' : 'Add Contact'}
            </h2>
            <p className="text-gray-600 mb-6">Update notification contact details</p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Full Name</label>
                <input 
                  type="text"
                  value={contactData.name}
                  onChange={(e) => setContactData({...contactData, name: e.target.value})}
                  placeholder="Enter full name"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-2">Relationship</label>
                <select
                  value={contactData.relationship}
                  onChange={(e) => setContactData({...contactData, relationship: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Child">Child</option>
                  <option value="Friend">Friend</option>
                  <option value="Relative">Relative</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-2">Phone Number</label>
                <input 
                  type="tel"
                  value={contactData.phone}
                  onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                  placeholder="Enter phone number"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-2">Email Address (Optional)</label>
                <input 
                  type="email"
                  value={contactData.email}
                  onChange={(e) => setContactData({...contactData, email: e.target.value})}
                  placeholder="Enter email address"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-2">Address (Optional)</label>
                <textarea 
                  value={contactData.address}
                  onChange={(e) => setContactData({...contactData, address: e.target.value})}
                  placeholder="Enter complete address"
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  id="isPrimary"
                  checked={contactData.isPrimary}
                  onChange={(e) => setContactData({...contactData, isPrimary: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isPrimary" className="text-sm text-gray-600">
                  Set as primary contact for notifications
                </label>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowContactModal(false)
                    setEditingContact(null)
                    setContactData({
                      name: '',
                      relationship: '',
                      phone: '',
                      email: '',
                      address: '',
                      isPrimary: false
                    })
                  }}
                  className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  onClick={handleSaveContact}
                  disabled={!contactData.name || !contactData.relationship || !contactData.phone}
                  className="px-4 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-[#2E37A4] to-[#0E9384] hover:opacity-90 disabled:opacity-50"
                >
                  {editingContact ? 'Update Contact' : 'Add Contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}