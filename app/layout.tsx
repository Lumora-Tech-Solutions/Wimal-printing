// app/layout.tsx
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wimal Gift trading & Design. — Quality Prints, Creative Solutions.',
  description: 'Quality Prints, Creative Solutions',
  icons: {
    icon: '/favicon.png',       // favicon in public/
    shortcut: '/favicon.png',   // fallback shortcut
    apple: '/favicon.png',      // iOS/Apple devices
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col relative">
        {/* Global background image (blur + 0.28 opacity) */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center blur-md opacity-[0.28]"
          style={{ backgroundImage: "url('/images/bg/paint-splash.jpg')" }}
          aria-hidden="true"
        />

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
