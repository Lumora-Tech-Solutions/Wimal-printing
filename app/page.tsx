// app/page.tsx
import Link from 'next/link'
import { services } from '@/content/services'
import { serviceCover } from '@/lib/gallery'
import { gifts } from '@/content/gifts'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function HomePage() {
  // Pick first 6 to feature (or reorder in services.ts)
  const featured = services.slice(0, 6).map((s) => ({
    ...s,
    cover: serviceCover(s.slug), // string | null
  }))

  return (
    <>
      {/* HERO — gradient blue rectangle with side spacing */}
      <section className="section">
        <div className="container">
          <div className="rounded-3xl bg-gradient-to-br from-blue-900/10 text-secondary to-secondary to-blue-950-650 px-6 md:px-12 py-12 md:py-16 shadow-2xl">
            <div className="grid md:grid-cols-2 items-center gap-12">
              {/* Left: captions */}
              <div>
                <span className="text-sm font-semibold uppercase tracking-wide text-white to-blue-300">
                  WIMAL GIFT TRADING & DESIGN
                </span>
                <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight">
                  Quality Prints,<br /> Creative Solutions.
                </h1>
                <p className="mt-6 text-white text-lg max-w-xxl">
                  From digital and offset to sublimation and UV, we bring your brand to life.
                </p>
                <div className="mt-8 flex gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-xl bg-primary text-white font-semibold px-5 py-2.5 shadow hover:shadow-md transition"
                  >
                    Get a Quote
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-xl ring-1 ring-secondary/60 text-white font-semibold px-5 py-2.5 hover:bg-white/10 transition"
                  >
                    Explore Services
                  </Link>
                </div>
              </div>

              {/* Right: collage */}
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-white/10 backdrop-blur">
                    <img
                      src="/images/services/uv-printing/sample 1.png"
                      alt="UV Printing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-white/10 backdrop-blur">
                    <img
                      src="/images/gifts/drinkware-lifestyle/design-1.png"
                      alt="Drinkware & Lifestyle"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-white/10 backdrop-blur">
                    <img
                      src="/images/gifts/bags-carriers/design-1.png"
                      alt="Bags & Carriers"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-white/10 backdrop-blur">
                    <img
                      src="/images/services/hot-foiling-embossing/sample1.png"
                      alt="Hot Foiling / Emboss"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Decorative circles — theme glows */}
                <div className="pointer-events-none absolute -top-10 -left-12 h-20 w-20 rounded-full bg-secondary/50 blur-l" />
                <div className="pointer-events-none absolute -bottom-12 -right-10 h-24 w-24 rounded-full bg-secondary/50 blur-l" />
                <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 -left-6 h-10 w-10 rounded-full bg-secondary/60 blur-l" />
                <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-primary/60 blur-l" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services (with covers) */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl font-semibold text-secondary">Featured Services</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="block overflow-hidden rounded-brand border bg-white hover:shadow-sm transition"
              >
                <div className="w-full aspect-[16/10]">
                  {s.cover ? (
                    <img
                      src={s.cover}
                      alt={s.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-gray-100 to-rose-50" />
                  )}
                </div>
                <div className="p-4">
                  <div className="font-semibold text-secondary">{s.title}</div>
                  <p className="text-secondary/80 text-sm mt-1">{s.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Categories (under Featured Services) */}
      <section className="container py-12">
        <h2 className="text-2xl font-semibold text-secondary">Gift Categories</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gifts.map((g) => (
            <Link
              key={g.slug}
              href={`/gifts/${g.slug}`}
              className="block overflow-hidden rounded-brand border bg-white hover:shadow-sm transition"
            >
              <div className="w-full aspect-[16/10]">
                {g.cover ? (
                  <img
                    src={g.cover}
                    alt={g.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-b from-gray-100 to-rose-50" />
                )}
              </div>
              <div className="p-4">
                <div className="font-semibold text-secondary">{g.title}</div>
                <p className="text-secondary/80 text-sm mt-1">{g.teaser}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
