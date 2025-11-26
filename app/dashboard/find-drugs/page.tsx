// app/dashboard/drugs/page.tsx
'use client'

import { useState } from 'react'
import { 
  Search, 
  MapPin, 
  Clock, 
  Star, 
  X,
  ShoppingCart,
  Shield,
  Truck,
  CheckCircle2,
  AlertCircle,
  Phone,
  Store,
  Plus,
  Minus,
  Eye
} from 'lucide-react'

interface Pharmacy {
  id: string
  name: string
  address: string
  rating: number
  reviews: number
  image: string
  phone: string
  operatingHours: {
    open: string
    close: string
  }
  deliveryAvailable: boolean
  verificationStatus: 'verified' | 'pending'
}

interface Drug {
  id: string
  name: string
  description: string
  fullDescription: string
  manufacturer: string
  price: number
  stock: number
  prescriptionRequired: boolean
  image: string
  pharmacyId: string
  pharmacy: Pharmacy
  dosage?: string
  sideEffects?: string[]
  indications?: string[]
}

interface CartItem {
  drug: Drug
  quantity: number
}

export default function DrugsPage() {
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showDrugDetails, setShowDrugDetails] = useState(false)
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null)
  const [orderStatus, setOrderStatus] = useState<'idle' | 'ordering' | 'success'>('idle')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPharmacy, setSelectedPharmacy] = useState('')
  const [prescriptionRequired, setPrescriptionRequired] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])

  const [orderData, setOrderData] = useState({
    patientName: '',
    phone: '',
    address: '',
    deliveryOption: 'pickup',
    prescriptionFile: null as File | null
  })

  const pharmacies: Pharmacy[] = [
    {
      id: '1',
      name: 'City Pharmacy & Drugs',
      address: '123 Healthcare Ave, Medical District',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031d5ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      phone: '+1 (234) 567-8901',
      operatingHours: {
        open: '07:00',
        close: '22:00'
      },
      deliveryAvailable: true,
      verificationStatus: 'verified'
    },
    {
      id: '2',
      name: 'MediCare Pharmacy',
      address: '456 Wellness Street, Downtown',
      rating: 4.6,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      phone: '+1 (234) 567-8902',
      operatingHours: {
        open: '08:00',
        close: '20:00'
      },
      deliveryAvailable: true,
      verificationStatus: 'verified'
    },
    {
      id: '3',
      name: 'QuickMeds Pharmacy',
      address: '789 Health Blvd, Suburban Area',
      rating: 4.9,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      phone: '+1 (234) 567-8903',
      operatingHours: {
        open: '06:00',
        close: '24:00'
      },
      deliveryAvailable: false,
      verificationStatus: 'verified'
    }
  ]

  const drugs: Drug[] = [
    {
      id: '1',
      name: 'Amoxicillin 500mg',
      description: 'Antibiotic for bacterial infections',
      fullDescription: 'Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.',
      manufacturer: 'Pfizer',
      price: 4500,
      stock: 25,
      prescriptionRequired: true,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',      pharmacyId: '1',
      pharmacy: pharmacies[0],
      dosage: '500mg every 8 hours',
      sideEffects: ['Nausea', 'Diarrhea', 'Skin rash', 'Allergic reactions'],
      indications: ['Bacterial infections', 'Respiratory infections', 'Urinary tract infections']
    },
    {
      id: '2',
      name: 'Paracetamol 500mg',
      description: 'Pain reliever and fever reducer',
      fullDescription: 'Paracetamol is a common painkiller used to treat aches and pain. It can also be used to reduce a high temperature. It is available as tablets, capsules, liquid, and suppositories.',
      manufacturer: 'GSK',
      price: 1200,
      stock: 100,
      prescriptionRequired: false,
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',      pharmacyId: '1',

      pharmacy: pharmacies[0],
      dosage: '500-1000mg every 4-6 hours',
      sideEffects: ['Liver damage (with overdose)', 'Skin reactions'],
      indications: ['Headache', 'Muscle pain', 'Fever', 'Arthritis']
    },
    {
      id: '3',
      name: 'Ventolin Inhaler',
      description: 'Asthma and COPD medication',
      fullDescription: 'Ventolin Inhaler contains salbutamol, which is a bronchodilator. It works by relaxing the muscles in the airways and increasing the airflow to the lungs.',
      manufacturer: 'GSK',
      price: 8500,
      stock: 15,
      prescriptionRequired: true,
 image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',      pharmacyId: '2',
      pharmacy: pharmacies[1],
      dosage: '1-2 puffs every 4-6 hours as needed',
      sideEffects: ['Tremor', 'Headache', 'Fast heartbeat', 'Muscle cramps'],
      indications: ['Asthma', 'COPD', 'Bronchospasm']
    }
  ]

  const filteredDrugs = drugs.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drug.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drug.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesPharmacy = !selectedPharmacy || drug.pharmacyId === selectedPharmacy
    
    const matchesPrescription = prescriptionRequired === '' || 
                              (prescriptionRequired === 'yes' && drug.prescriptionRequired) ||
                              (prescriptionRequired === 'no' && !drug.prescriptionRequired)
    
    return matchesSearch && matchesPharmacy && matchesPrescription
  })

  const addToCart = (drug: Drug) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.drug.id === drug.id)
      if (existingItem) {
        return prev.map(item =>
          item.drug.id === drug.id
            ? { ...item, quantity: Math.min(item.quantity + 1, drug.stock) }
            : item
        )
      } else {
        return [...prev, { drug, quantity: 1 }]
      }
    })
  }

  const updateCartQuantity = (drugId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(drugId)
      return
    }
    
    setCart(prev =>
      prev.map(item =>
        item.drug.id === drugId
          ? { ...item, quantity: Math.min(newQuantity, item.drug.stock) }
          : item
      )
    )
  }

  const removeFromCart = (drugId: string) => {
    setCart(prev => prev.filter(item => item.drug.id !== drugId))
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.drug.price * item.quantity), 0)
  }

  const getDeliveryFee = () => {
    const hasDelivery = cart.some(item => item.drug.pharmacy.deliveryAvailable)
    return hasDelivery && orderData.deliveryOption === 'delivery' ? 1500 : 0
  }

  const getTotalAmount = () => {
    return getSubtotal() + getDeliveryFee()
  }

  const handleShowOrderModal = () => {
    if (cart.length === 0) return
    setShowOrderModal(true)
    setOrderStatus('idle')
  }

  const handleConfirmOrder = async () => {
    setOrderStatus('ordering')
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setOrderStatus('success')
      
      // Reset after success
      setTimeout(() => {
        setShowOrderModal(false)
        setOrderStatus('idle')
        clearCart()
      }, 3000)
    } catch (error) {
      setOrderStatus('idle')
    }
  }

  const formatAmount = (amount: number) => {
    return `₦${amount.toLocaleString()}`
  }

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const showDrugDetailsModal = (drug: Drug) => {
    setSelectedDrug(drug)
    setShowDrugDetails(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Find Drugs</h1>
          <p className="text-gray-600 mt-1">Compare prices and order medications from verified pharmacies</p>
        </div>
        
        {/* Cart Button */}
        <button
          onClick={handleShowOrderModal}
          disabled={cart.length === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#2E37A4] to-[#0E9384] hover:opacity-90 disabled:opacity-50 font-medium relative"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Order ({getTotalItems()})</span>
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search drugs, manufacturers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={selectedPharmacy}
            onChange={(e) => setSelectedPharmacy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Pharmacies</option>
            {pharmacies.map(pharmacy => (
              <option key={pharmacy.id} value={pharmacy.id}>{pharmacy.name}</option>
            ))}
          </select>

          <select
            value={prescriptionRequired}
            onChange={(e) => setPrescriptionRequired(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Drugs</option>
            <option value="no">Over-the-counter</option>
            <option value="yes">Prescription Required</option>
          </select>
          
          <button 
            onClick={() => {
              setSearchTerm('')
              setSelectedPharmacy('')
              setPrescriptionRequired('')
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
          Showing {filteredDrugs.length} of {drugs.length} medications
        </p>
        {cart.length > 0 && (
          <div className="text-right">
            <p className="text-sm text-gray-600">
              Cart: {getTotalItems()} items • {formatAmount(getSubtotal())}
            </p>
          </div>
        )}
      </div>

      {/* Drugs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrugs.map((drug) => {
          const cartItem = cart.find(item => item.drug.id === drug.id)
          const currentQuantity = cartItem?.quantity || 0

          return (
            <div key={drug.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img 
                  src={drug.image} 
                  alt={drug.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{drug.pharmacy.rating}</span>
                  </div>
                </div>
                {drug.prescriptionRequired && (
                  <div className="absolute top-4 left-4 bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                    Prescription Required
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{drug.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{drug.description}</p>
                
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <Store className="w-4 h-4" />
                  <p className="text-sm font-medium">{drug.pharmacy.name}</p>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <p className="text-sm">{drug.pharmacy.address}</p>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Clock className="w-4 h-4" />
                  <p className="text-sm">
                    {formatTime(drug.pharmacy.operatingHours.open)} - {formatTime(drug.pharmacy.operatingHours.close)}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-lg font-bold text-[#2E37A4]">{formatAmount(drug.price)}</p>
                    <p className="text-xs text-gray-500">Manufacturer: {drug.manufacturer}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${drug.stock > 10 ? 'text-green-600' : drug.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {drug.stock > 10 ? 'In Stock' : drug.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </p>
                    <p className="text-xs text-gray-500">{drug.stock} units available</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => showDrugDetailsModal(drug)}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
                  >
                    <Eye className="w-4 h-4" />
                    Details
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {currentQuantity > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(drug.id, currentQuantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{currentQuantity}</span>
                        <button
                          onClick={() => updateCartQuantity(drug.id, currentQuantity + 1)}
                          disabled={currentQuantity >= drug.stock}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(drug)}
                        disabled={drug.stock === 0}
                        className="px-4 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-[#2E37A4] to-[#0E9384] hover:opacity-90 disabled:opacity-50 font-medium flex items-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredDrugs.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">No medications found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('')
              setSelectedPharmacy('')
              setPrescriptionRequired('')
            }}
            className="text-[#2E37A4] hover:underline mt-2"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowOrderModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            {orderStatus === 'success' ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Placed!</h3>
                <p className="text-gray-600">Your medication order has been confirmed.</p>
                <div className="bg-gray-50 rounded-lg p-4 mt-4 space-y-2">
                  {cart.map(item => (
                    <div key={item.drug.id} className="flex justify-between items-center">
                      <span className="text-sm">{item.drug.name} x {item.quantity}</span>
                      <span className="text-sm font-medium">{formatAmount(item.drug.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span className="text-[#2E37A4]">{formatAmount(getTotalAmount())}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Order</h2>
                
                {/* Order Items */}
                <div className="space-y-3 mb-6">
                  {cart.map(item => (
                    <div key={item.drug.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <img src={item.drug.image} alt={item.drug.name} className="w-12 h-12 rounded object-cover" />
                        <div>
                          <p className="font-medium text-sm">{item.drug.name}</p>
                          <p className="text-xs text-gray-500">{item.drug.pharmacy.name}</p>
                          <p className="text-xs text-gray-500">{formatAmount(item.drug.price)} each</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartQuantity(item.drug.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.drug.id, item.quantity + 1)}
                            disabled={item.quantity >= item.drug.stock}
                            className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-medium text-sm w-20 text-right">
                          {formatAmount(item.drug.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.drug.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Form */}
                <form className="space-y-4">
                  {cart.some(item => item.drug.prescriptionRequired) && (
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Upload Prescription</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => setOrderData({...orderData, prescriptionFile: e.target.files?.[0] || null})}
                          className="hidden"
                          id="prescription-upload"
                        />
                        <label htmlFor="prescription-upload" className="cursor-pointer">
                          <div className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Click to upload prescription
                          </div>
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG, or PDF (Max 5MB)</p>
                        </label>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Delivery Option</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderData({...orderData, deliveryOption: 'pickup'})}
                        className={`p-3 border rounded-lg text-sm text-center ${
                          orderData.deliveryOption === 'pickup'
                            ? 'border-[#2E37A4] bg-blue-50 text-[#2E37A4]'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Store className="w-4 h-4 mx-auto mb-1" />
                        Store Pickup
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderData({...orderData, deliveryOption: 'delivery'})}
                        disabled={!cart.some(item => item.drug.pharmacy.deliveryAvailable)}
                        className={`p-3 border rounded-lg text-sm text-center ${
                          orderData.deliveryOption === 'delivery'
                            ? 'border-[#2E37A4] bg-blue-50 text-[#2E37A4]'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50'
                        }`}
                      >
                        <Truck className="w-4 h-4 mx-auto mb-1" />
                        Home Delivery
                      </button>
                    </div>
                  </div>

                  {orderData.deliveryOption === 'delivery' && (
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Delivery Address</label>
                      <textarea 
                        value={orderData.address}
                        onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                        placeholder="Enter your complete delivery address"
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        required
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Patient Name</label>
                    <input 
                      type="text"
                      value={orderData.patientName}
                      onChange={(e) => setOrderData({...orderData, patientName: e.target.value})}
                      placeholder="Enter patient's full name"
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Phone Number</label>
                    <input 
                      type="tel"
                      value={orderData.phone}
                      onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                      placeholder="Enter phone number"
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Order Total */}
                  <div className="border-t pt-4">
                    <div className="space-y-2 mb-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Subtotal:</span>
                        <span className="text-sm font-medium">{formatAmount(getSubtotal())}</span>
                      </div>
                      {getDeliveryFee() > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Delivery Fee:</span>
                          <span className="text-sm font-medium">{formatAmount(getDeliveryFee())}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span className="text-[#2E37A4]">{formatAmount(getTotalAmount())}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <button 
                      type="button" 
                      onClick={() => setShowOrderModal(false)}
                      className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-100"
                    >
                      Continue Shopping
                    </button>
                    <button 
                      type="button"
                      onClick={handleConfirmOrder}
                      disabled={
                        !orderData.patientName || 
                        !orderData.phone || 
                        (orderData.deliveryOption === 'delivery' && !orderData.address) ||
                        (cart.some(item => item.drug.prescriptionRequired) && !orderData.prescriptionFile) ||
                        orderStatus === 'ordering'
                      }
                      className="px-6 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-[#2E37A4] to-[#0E9384] hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
                    >
                      {orderStatus === 'ordering' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Proceed to Pay
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Drug Details Modal */}
      {showDrugDetails && selectedDrug && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowDrugDetails(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <img src={selectedDrug.image} alt={selectedDrug.name} className="w-24 h-24 rounded-lg object-cover" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{selectedDrug.name}</h2>
                  <p className="text-gray-600 mb-2">{selectedDrug.description}</p>
                  <p className="text-lg font-bold text-[#2E37A4]">{formatAmount(selectedDrug.price)}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Full Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{selectedDrug.fullDescription}</p>
              </div>

              {selectedDrug.dosage && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Dosage</h3>
                  <p className="text-gray-600 text-sm">{selectedDrug.dosage}</p>
                </div>
              )}

              {selectedDrug.indications && selectedDrug.indications.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Indications</h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    {selectedDrug.indications.map((indication, index) => (
                      <li key={index}>{indication}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedDrug.sideEffects && selectedDrug.sideEffects.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Possible Side Effects</h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    {selectedDrug.sideEffects.map((effect, index) => (
                      <li key={index}>{effect}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  onClick={() => setShowDrugDetails(false)}
                  className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-100"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    addToCart(selectedDrug)
                    setShowDrugDetails(false)
                  }}
                  disabled={selectedDrug.stock === 0}
                  className="px-4 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-[#2E37A4] to-[#0E9384] hover:opacity-90 disabled:opacity-50"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verification Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 text-sm">Drug Verification</h3>
            <p className="text-blue-700 text-xs mt-1">
              All drugs purchased through VitaHealth are verified using spectroscopy and barcode verification 
              systems to ensure authenticity. You can be 100% confident that you are buying original medications.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}