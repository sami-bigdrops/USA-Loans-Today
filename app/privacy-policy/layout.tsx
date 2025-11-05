import React from 'react'
import Navbar from '@/app/ult/Navbar'
import Footer from '@/app/ult/Footer'

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
