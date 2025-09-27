// components/Footer.tsx
import Link from 'next/link'
import Image from 'next/image'
import { brand } from '@/content/brand'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 bg-secondary/10 border-t border-secondary/20">
      {/* Top */}
      <div className="container py-10 grid gap-10 md:grid-cols-4 text-sm">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/master-logo.svg"
              alt="Logo"
              width={140}
              height={140}
              className="h-200 w-500"
              priority={false}
            />
          </div>
          <p className="text-secondary/80">
            {brand.tagline || 'Quality Prints, Creative Solutions.'}
          </p>
        </div>

        {/* Links */}
        <nav className="space-y-3">
          <div className="font-semibold text-secondary">Pages</div>
          <ul className="grid gap-2">
            <li><Link href="/services" className="text-gray-700 hover:text-secondary transition">Services</Link></li>
            <li><Link href="/gifts" className="text-gray-700 hover:text-secondary transition">Gifts</Link></li>
            <li><Link href="/promotions" className="text-gray-700 hover:text-secondary transition">Promotions</Link></li>
            <li><Link href="/portfolio" className="text-gray-700 hover:text-secondary transition">Portfolio</Link></li>
            <li><Link href="/faq" className="text-gray-700 hover:text-secondary transition">FAQ</Link></li>
            <li><Link href="/contact" className="text-gray-700 hover:text-secondary transition">Contact</Link></li>
          </ul>
        </nav>

        {/* Hours */}
        <div className="space-y-3">
          <div className="font-semibold text-secondary">Hours</div>
          <p className="text-gray-700">{brand.hours}</p>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <div className="font-semibold text-secondary">Contact</div>
          <p className="text-gray-700">Mobile / WhatsApp: {brand.phone}</p>
          <p className="text-gray-700">Email: {brand.email}</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-secondary/20">
        <div className="container py-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600">
          <div>
            © {year} {brand.siteName}. All rights reserved.
          </div>
          <div className="mt-2 md:mt-0 flex items-center gap-4">
            <Link href="/terms" className="hover:text-secondary transition">Terms</Link>
            <span className="opacity-30">•</span>
            <Link href="/privacy" className="hover:text-secondary transition">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
