import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/UserContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora',
})

export const metadata: Metadata = {
  title: 'VitaHealth',
  description: 'Book your medical consultation with top specialists. Choose from Oncology, Hematology, and more. Easy online appointment scheduling.',
  openGraph: {
    title: 'VitaHealth - Book a Consultation',
    description: 'Book your medical consultation with top specialists. Choose from Oncology, Hematology, and more. Easy online appointment scheduling.',
    url: 'https://medi-connect-peach.vercel.app/',
    siteName: 'VitaHealth',
    images: [
      {
        url: '/images1/logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <head>
        <link rel="icon" href="/images1/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "name": "HealthCare Nigeria",
              "url": "https://healthcarenigeria.ng",
              "logo": "https://healthcarenigeria.ng/logo.png",
              "telephone": "+23412345678",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "15 Bashorun Road, Ikoyi",
                "addressLocality": "Lagos",
                "addressCountry": "NG"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
        {children}
        </AuthProvider>
        </body>
    </html>
  )
}