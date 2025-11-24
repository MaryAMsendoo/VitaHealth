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
  Banknote
} from 'lucide-react'

interface Payment {
  id: string
  date: string
  description: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  type: 'consultation' | 'prescription' | 'emergency' | 'lab_test'
  serviceDetails: string
}

interface PaymentMethod {
  id: string
  type: 'card' | 'bank' | 'mobile'
  lastFour: string
  brand: string
  isDefault: boolean
}

export default function Payments() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')

  const payments: Payment[] = [
    {
      id: '1',
      date: 'Oct 15, 2025',
      description: 'Online Consultation',
      amount: 2500,
      status: 'paid',
      type: 'consultation',
      serviceDetails: 'General Medicine Consultation'
    },
    {
      id: '2',
      date: 'Oct 25, 2025',
      description: 'Cardiology Consultation',
      amount: 5000,
      status: 'pending',
      type: 'consultation',
      serviceDetails: 'Cardiology Follow-up'
    },
    {
      id: '3',
      date: 'Oct 28, 2025',
      description: 'Blood Panel Test',
      amount: 6000,
      status: 'pending',
      type: 'lab_test',
      serviceDetails: 'Complete Blood Count Test'
    },
    {
      id: '4',
      date: 'Sep 30, 2025',
      description: 'Emergency Care',
      amount: 10000,
      status: 'paid',
      type: 'emergency',
      serviceDetails: 'Emergency Medical Attention'
    }
  ]

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      lastFour: '4242',
      brand: 'Visa',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      lastFour: '8888',
      brand: 'Mastercard',
      isDefault: false
    }
  ]

  const pendingPayments = payments.filter(payment => payment.status === 'pending')
  const paidPayments = payments.filter(payment => payment.status === 'paid')

  const totalDue = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const lastPayment = paidPayments[0]

  const handlePayment = async (payment: Payment) => {
    setSelectedPayment(payment)
    setPaymentStatus('processing')

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      setPaymentStatus('success')

      // Reset after success
      setTimeout(() => {
        setShowPaymentModal(false)
        setPaymentStatus('idle')
        setSelectedPayment(null)
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
          <p className="text-sm text-gray-500 mb-1">Pending Bills</p>
          <h3 className="text-2xl font-bold text-red-600">{pendingPayments.length}</h3>
          <p className="text-xs text-gray-400 mt-1">Require immediate attention</p>
        </div>
      </div>

      {/* Pending Payments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-yellow-600" />
          Pending Payments
        </h2>

        <div className="space-y-4">
          {pendingPayments.map((payment) => (
            <div key={payment.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  {getTypeIcon(payment.type)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{payment.description}</p>
                  <p className="text-xs text-gray-500">{payment.serviceDetails}</p>
                  <p className="text-xs text-gray-400">Issued: {payment.date}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-800">{formatAmount(payment.amount)}</p>
                <button
                  onClick={() => {
                    setSelectedPayment(payment)
                    setShowPaymentModal(true)
                  }}
                  className="text-sm text-[#2E37A4] hover:underline mt-1"
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
            </div>
          )}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-left border-b">
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {paidPayments.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 text-gray-700">{payment.date}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded flex items-center justify-center">
                        {getTypeIcon(payment.type)}
                      </div>
                      <span>{payment.description}</span>
                    </div>
                  </td>
                  <td className="py-3 font-medium text-gray-800">{formatAmount(payment.amount)}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-[#2E37A4] hover:underline text-sm flex items-center gap-1 ml-auto">
                      <Download className="w-3 h-3" />
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}

              {paidPayments.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No payment history available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h2>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {method.brand} •••• {method.lastFour}
                  </p>
                  <p className="text-xs text-gray-500">
                    {method.isDefault ? 'Default payment method' : 'Secondary payment method'}
                  </p>
                </div>
              </div>
              {method.isDefault && (
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                  Default
                </span>
              )}
            </div>
          ))}

        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Make a Payment</h2>

                {selectedPayment && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-blue-900">{selectedPayment.description}</p>
                    <p className="text-lg font-bold text-blue-900 mt-1">{formatAmount(selectedPayment.amount)}</p>
                  </div>
                )}

                <form className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Amount</label>
                    <input
                      type="text"
                      value={selectedPayment ? formatAmount(selectedPayment.amount) : '₦0'}
                      readOnly
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Payment Method</label>
                    <select className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Visa •••• 4242 (Default)</option>
                      <option>Mastercard •••• 8888</option>
                      <option>Add new payment method</option>
                    </select>
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
                      onClick={() => selectedPayment && handlePayment(selectedPayment)}
                      disabled={paymentStatus === 'processing'}
                      className="px-4 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-[#2E37A4] to-[#0E9384] hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
                    >
                      {paymentStatus === 'processing' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Pay Now'
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
              All payments are processed securely. No third-party payment processors are used in accordance with our regulatory compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}