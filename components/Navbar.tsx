'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/services', label: 'Services' },
  { href: '/gifts', label: 'Gifts' },
  { href: '/promotions', label: 'Promotions' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact Us' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-secondary/10 backdrop-blur border-b border-secondary/20 shadow-sm">
      <div className="container flex items-center h-16">
        {/* Logo (no white outline) */}
        <Link href="/" className="flex items-center gap-2 mr-80">
          <Image
            src="/brand/master-logo.svg"
            alt="Wimal Printing Logo"
            width={140}
            height={140}
            className="h-200 w-500"
            priority
          />
          <span className="text-base font-semibold tracking-wide text-secondary">
            
          </span>
        </Link>

        {/* Nav links — closer to logo */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                pathname.startsWith(l.href)
                  ? 'text-secondary font-semibold'
                  : 'text-gray-700 hover:text-secondary transition'
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA button stays far right */}
        <div className="ml-auto">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-xl bg-secondary text-white text-sm font-semibold shadow hover:brightness-110 transition"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  )
}
