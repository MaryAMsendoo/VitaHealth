// app/dashboard/payments/page.tsx
'use client'

import { useState } from 'react'
import {
  CreditCard,
  Download,
  Plus,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Receipt,
  Banknote,
  ShoppingCart,
  Pill
} from 'lucide-react'

interface Payment {
  id: string
  date: string
  description: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  type: 'consultation' | 'prescription' | 'emergency' | 'lab_test' | 'drug_order'
  serviceDetails: string
  items?: {
    name: string
    quantity: number
    price: number
  }[]
  deliveryFee?: number
  totalAmount: number
}

// Mock data for drug orders
const mockDrugOrder: Payment = {
  id: '5',
  date: 'Nov 1, 2025',
  description: 'Medication Order',
  amount: 15700,
  status: 'pending',
  type: 'drug_order',
  serviceDetails: 'Pharmacy medication delivery',
  items: [
    { name: 'Amoxicillin 500mg', quantity: 2, price: 4500 },
    { name: 'Paracetamol 500mg', quantity: 1, price: 1200 },
    { name: 'Vitamin C 1000mg', quantity: 1, price: 3200 }
  ],
  deliveryFee: 1500,
  totalAmount: 15700
}

export default function Payments() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(mockDrugOrder)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending')
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      date: 'Oct 15, 2025',
      description: 'Online Consultation',
      amount: 2500,
      status: 'paid',
      type: 'consultation',
      serviceDetails: 'General Medicine Consultation',
      totalAmount: 2500
    },
    {
      id: '2',
      date: 'Oct 25, 2025',
      description: 'Cardiology Consultation',
      amount: 5000,
      status: 'pending',
      type: 'consultation',
      serviceDetails: 'Cardiology Follow-up',
      totalAmount: 5000
    },
    {
      id: '3',
      date: 'Oct 28, 2025',
      description: 'Blood Panel Test',
      amount: 6000,
      status: 'pending',
      type: 'lab_test',
      serviceDetails: 'Complete Blood Count Test',
      totalAmount: 6000
    },
    {
      id: '4',
      date: 'Sep 30, 2025',
      description: 'Emergency Care',
      amount: 10000,
      status: 'paid',
      type: 'emergency',
      serviceDetails: 'Emergency Medical Attention',
      totalAmount: 10000
    },
    mockDrugOrder
  ])

  const pendingPayments = payments.filter(payment => payment.status === 'pending')
  const paidPayments = payments.filter(payment => payment.status === 'paid')

  const totalDue = pendingPayments.reduce((sum, payment) => sum + payment.totalAmount, 0)
  const lastPayment = paidPayments[0]

  const handlePayment = async (payment: Payment) => {
    setPaymentStatus('processing')

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Update payment status to paid
      setPayments(prev => 
        prev.map(p => 
          p.id === payment.id 
            ? { ...p, status: 'paid', date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
            : p
        )
      )
      
      setPaymentStatus('success')

      // Reset after success
      setTimeout(() => {
        setShowPaymentModal(false)
        setPaymentStatus('idle')
        setSelectedPayment(null)
        setActiveTab('history') // Switch to history tab after payment
      }, 3000)
    } catch (error) {
      setPaymentStatus('error')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'failed': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return <FileText className="w-4 h-4" />
      case 'emergency': return <AlertCircle className="w-4 h-4" />
      case 'lab_test': return <CheckCircle className="w-4 h-4" />
      case 'prescription': return <Receipt className="w-4 h-4" />
      case 'drug_order': return <ShoppingCart className="w-4 h-4" />
      default: return <Banknote className="w-4 h-4" />
    }
  }

  const formatAmount = (amount: number) => {
    return `₦${amount.toLocaleString()}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Payments & Billing</h1>
          <p className="text-gray-600 mt-1">Manage your medical bills and payment history</p>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Total Due</p>
          <h3 className="text-2xl font-bold text-[#2E37A4]">{formatAmount(totalDue)}</h3>
          <p className="text-xs text-gray-400 mt-1">{pendingPayments.length} pending bill(s)</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Last Payment</p>
          <h3 className="text-2xl font-bold text-[#0E9384]">
            {lastPayment ? formatAmount(lastPayment.amount) : '₦0'}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {lastPayment ? `on ${lastPayment.date}` : 'No payments yet'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Paid Bills</p>
          <h3 className="text-2xl font-bold text-green-600">{paidPayments.length}</h3>
          <p className="text-xs text-gray-400 mt-1">Successfully processed</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 border-b-2 font-medium text-sm ${
                activeTab === 'pending'
                  ? 'border-[#2E37A4] text-[#2E37A4]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Pending Payments ({pendingPayments.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-[#2E37A4] text-[#2E37A4]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Payment History ({paidPayments.length})
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'pending' ? (
            <div className="space-y-4">
              {pendingPayments.map((payment) => (
                <div key={payment.id} className="flex justify-between items-start p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mt-1">
                      {getTypeIcon(payment.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{payment.description}</p>
                      <p className="text-xs text-gray-500">{payment.serviceDetails}</p>
                      <p className="text-xs text-gray-400">Issued: {payment.date}</p>
                      
                      {/* Drug Order Items */}
                      {payment.type === 'drug_order' && payment.items && (
                        <div className="mt-2 space-y-1">
                          {payment.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-xs text-gray-600">
                              <span>{item.name} x {item.quantity}</span>
                              <span>{formatAmount(item.price * item.quantity)}</span>
                            </div>
                          ))}
                          {payment.deliveryFee && payment.deliveryFee > 0 && (
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>Delivery Fee</span>
                              <span>{formatAmount(payment.deliveryFee)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-xs font-medium text-gray-800 border-t pt-1">
                            <span>Total</span>
                            <span>{formatAmount(payment.totalAmount)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <p className="font-semibold text-gray-800 text-lg">{formatAmount(payment.totalAmount)}</p>
                    <button
                      onClick={() => {
                        setSelectedPayment(payment)
                        setShowPaymentModal(true)
                      }}
                      className="text-sm text-white bg-gradient-to-r from-[#2E37A4] to-[#0E9384] hover:opacity-90 px-4 py-2 rounded-lg mt-2"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              ))}

              {pendingPayments.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <p className="text-gray-500">No pending payments</p>
                  <p className="text-sm text-gray-400 mt-1">All bills are paid up to date</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {paidPayments.map((payment) => (
                <div key={payment.id} className="flex justify-between items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mt-1">
                      {getTypeIcon(payment.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-800">{payment.description}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          Paid
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{payment.serviceDetails}</p>
                      <p className="text-xs text-gray-400">Paid on: {payment.date}</p>
                      
                      {payment.type === 'drug_order' && payment.items && (
                        <div className="mt-2 space-y-1">
                          {payment.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-xs text-gray-600">
                              <span>{item.name} x {item.quantity}</span>
                              <span>{formatAmount(item.price * item.quantity)}</span>
                            </div>
                          ))}
                          {payment.deliveryFee && payment.deliveryFee > 0 && (
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>Delivery Fee</span>
                              <span>{formatAmount(payment.deliveryFee)}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <p className="font-semibold text-gray-800 text-lg">{formatAmount(payment.totalAmount)}</p>
                    <button className="text-sm text-[#2E37A4] hover:underline mt-2 flex items-center gap-1 ml-auto">
                      <Download className="w-3 h-3" />
                      Receipt
                    </button>
                  </div>
                </div>
              ))}

              {paidPayments.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No payment history available</p>
                  <p className="text-sm text-gray-400 mt-1">Your paid bills will appear here</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPayment && (
        <div className="fixed overflow-y-auto inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            {paymentStatus === 'success' ? (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Successful!</h3>
                <p className="text-gray-600">Your payment has been processed successfully.</p>
                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                  <p className="text-sm font-medium text-gray-900">{selectedPayment.description}</p>
                  <p className="text-lg font-bold text-[#2E37A4] mt-1">{formatAmount(selectedPayment.totalAmount)}</p>
                  <p className="text-xs text-gray-500 mt-1">Paid on: {new Date().toLocaleDateString()}</p>
                </div>
                <p className="text-sm text-gray-500 mt-4">Redirecting to payment history...</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Complete Payment</h2>

                {/* Order Summary for Drug Orders */}
                {selectedPayment.type === 'drug_order' && selectedPayment.items && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h3 className="font-medium text-blue-900 mb-3">Order Summary</h3>
                    <div className="space-y-2">
                      {selectedPayment.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} x {item.quantity}</span>
                          <span>{formatAmount(item.price * item.quantity)}</span>
                        </div>
                      ))}
                      {selectedPayment.deliveryFee && selectedPayment.deliveryFee > 0 && (
                        <div className="flex justify-between text-sm border-t pt-2">
                          <span>Delivery Fee</span>
                          <span>{formatAmount(selectedPayment.deliveryFee)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold text-blue-900 border-t pt-2">
                        <span>Total</span>
                        <span>{formatAmount(selectedPayment.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Amount to Pay</label>
                    <input
                      type="text"
                      value={formatAmount(selectedPayment.totalAmount)}
                      readOnly
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-gray-50 font-semibold text-center text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Select Payment Method</label>
                    <select className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Credit/Debit Card</option>
                      <option>Bank Transfer</option>
                      <option>Mobile Money</option>
                      <option>USSD</option>
                    </select>
                  </div>

                  {/* Card Details - Show only if card is selected */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowPaymentModal(false)}
                      className="px-4 py-2 rounded-lg text-sm border border-gray-300 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePayment(selectedPayment)}
                      disabled={paymentStatus === 'processing'}
                      className="px-6 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-[#2E37A4] to-[#0E9384] hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
                    >
                      {paymentStatus === 'processing' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Pay ${formatAmount(selectedPayment.totalAmount)}`
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
          <Banknote className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 text-sm">Payment Security</h3>
            <p className="text-blue-700 text-xs mt-1">
              All payments are processed securely through our encrypted payment gateway. 
              Your financial information is protected and never stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}