'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQ() {
  const [active, setActive] = useState<number | null>(null)

  const toggle = (i: number) => {
    setActive(active === i ? null : i)
  }

  const faqItems = [
    // OVERVIEW
    {
      question: "What is VitaHealth?",
      answer:
        "VitaHealth is a digital healthcare system that manages patient, doctor, and pharmacy records. It stores past visits, tests, prescribed medications, and makes medical information easily accessible."
    },
    {
      question: "How does VitaHealth help doctors?",
      answer:
        "Doctors can instantly access a patient’s medical history—even when the patient cannot communicate properly—and receive medication suggestions through our AI-powered prescription aid."
    },

    // FEATURES
    {
      question: "How does the prescription aid feature work?",
      answer:
        "The prescription aid analyzes medical data and helps doctors suggest suitable medications for specific illnesses, improving accuracy and reducing errors."
    },
    {
      question: "How does the notification system work?",
      answer:
        "Notifications remind patients and doctors about appointments and medication schedules. If the patient has no phone, reminders can be sent to a relative instead."
    },
    {
      question: "Can VitaHealth help during emergencies?",
      answer:
        "Yes. Patients can immediately contact medical professionals through an emergency support feature. Doctors are assigned to be available 24/7 for urgent cases."
    },
    {
      question: "How does the Find Drugs feature work?",
      answer:
        "Pharmacies upload available drugs, prices, and locations. Patients can compare options, order online, and have medicines delivered. Every drug is verified through scanning technology to ensure authenticity."
    },
    {
      question: "Does VitaHealth include diagnostic center support?",
      answer:
        "Yes. Users can find nearby diagnostic centers with details about tests, imaging, working hours, and distance. Patients can also book appointments directly from the platform."
    },
    {
      question: "What does the AI assistant bot do?",
      answer:
        "The assistant helps answer health questions, suggests treatment guidance, recommends educational videos, and offers best home practices for better health awareness."
    },

    // VALUES
    {
      question: "Who can benefit from VitaHealth?",
      answer:
        "Hospitals, pharmacies, and patients. Hospitals get organized records, pharmacies reach more customers, and patients access verified drugs, reminders, health videos, AI guidance, and medical support."
    },

    // REGULATIONS
    {
      question: "What are the regulatory requirements?",
      answer:
        "Patients must register before receiving treatment. All pharmacies and doctors must provide required information, have valid licenses, and maintain strict confidentiality. Third-party payments are not allowed."
    },

    // PRICING
    {
      question: "How does VitaHealth charge partners?",
      answer:
        "Pharmacies and diagnostic centers pay a commission only when the platform brings them customers. They also get a free trial period."
    },
    {
      question: "Do patients pay any fees?",
      answer:
        "Patients pay a small service fee added to their hospital bill, and online consultation sessions have separate charges."
    }
  ]

  return (
    <section id="faq" className="container mx-auto mt-10 px-4 md:px-8">
      <div className="text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Frequently Asked Questions
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Answers to the most common questions about VitaHealth.
        </p>
        <div className="w-24 h-1 bg-gray-500 mx-auto mt-3 rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className={`p-6 border border-gray-200 rounded-lg transition-all ${
              active === index ? "bg-gray-100" : "bg-white"
            }`}
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggle(index)}
            >
              <span className="font-semibold text-black">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  active === index ? "rotate-180" : ""
                }`}
              />
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                active === index ? "max-h-96 mt-3 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
