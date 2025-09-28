'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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
  const [open, setOpen] = useState(false)

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname])

  const linkClass = (href: string) =>
    pathname.startsWith(href)
      ? 'text-secondary font-semibold'
      : 'text-gray-700 hover:text-secondary transition'

  return (
    <header className="sticky top-0 z-50 bg-secondary/10 backdrop-blur border-b border-secondary/20 shadow-sm">
      {/* Top bar */}
      <div className="container flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/brand/master-logo.svg"
            alt="Wimal Printing Logo"
            width={140}
            height={32}
            className="h-8 w-auto md:h-10"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="px-4 py-2 rounded-xl bg-secondary text-white text-sm font-semibold shadow hover:brightness-110 transition"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-secondary/20 text-secondary hover:bg-secondary/10"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden border-t border-secondary/10 bg-white/90 backdrop-blur transition-[max-height] duration-300 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="container px-4 py-3 grid gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block px-4 py-2 rounded-lg ${linkClass(l.href)} hover:bg-secondary/10`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-secondary text-white font-semibold px-4 py-2 shadow hover:brightness-110 transition"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  )
}
