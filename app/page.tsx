// app/page.tsx
import Link from 'next/link'
import { services } from '@/content/services'
import { serviceCover } from '@/lib/gallery'
import { gifts } from '@/content/gifts'

export const revalidate = 3600 // re-generate every hour (optional)


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
                {/* Mobile-friendly button stack */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-primary text-white font-semibold px-5 py-2.5 shadow hover:shadow-md transition"
                  >
                    Get a Quote
                  </Link>
                  <Link
                    href="/services"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl ring-1 ring-secondary/60 text-white font-semibold px-5 py-2.5 hover:bg-white/10 transition"
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

                {/* Decorative circles — theme glows (hidden on very small screens) */}
                <div
                  className="pointer-events-none absolute -top-10 -left-12 h-20 w-20 rounded-full blur-l hidden sm:block"
                  style={{ backgroundColor: 'rgb(88,83,139)' }}
                />
                <div
                  className="pointer-events-none absolute -bottom-12 -right-10 h-24 w-24 rounded-full blur-l hidden sm:block"
                  style={{ backgroundColor: 'rgb(88,83,139)' }}
                />
                <div
                  className="pointer-events-none absolute top-1/2 -translate-y-1/2 -left-6 h-10 w-10 rounded-full blur-l hidden sm:block"
                  style={{ backgroundColor: 'rgb(88,83,139)' }}
                />
                <div
                  className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full blur-l hidden sm:block"
                  style={{ backgroundColor: 'rgb(88,83,139)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US — gradient box with button that opens popup */}
      <section className="section">
        <div className="container">
          <div className="rounded-3xl bg-gradient-to-br from-blue-900/10 to-blue-950/60 px-6 md:px-12 py-10 md:py-12 shadow-2xl text-secondary">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-semibold text-secondary">About Us</h2>
                <p className="mt-3 text-secondary/90">
                  Learn more about our experience and why brands in Qatar trust us for precision, durability, and creative print solutions.
                </p>
              </div>
              <div className="shrink-0">
                {/* Use a plain anchor for reliable same-page hash navigation */}
                <a
                  href="#about"
                  className="inline-flex items-center justify-center rounded-xl bg-primary text-white font-semibold px-5 py-2.5 shadow hover:shadow-md transition w-full sm:w-auto"
                >
                  Read More
                </a>
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

      {/* ABOUT US POPUP (opens when URL hash == #about) */}
      <div id="about" className="fixed inset-0 z-50 hidden">
        {/* overlay closes the modal when clicked */}
        <a href="#" className="absolute inset-0 bg-black/50" aria-label="Close About Us" />
        <div className="relative mx-auto my-16 w-[min(92vw,720px)] rounded-2xl bg-white p-6 md:p-8 shadow-2xl">
          <div className="flex items-start justify-between gap-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-secondary">About Us</h2>
            <a
              href="#"
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-secondary/70 ring-1 ring-secondary/20 hover:bg-secondary/5"
              aria-label="Close"
            >
              Close
            </a>
          </div>

          <div className="mt-4 text-secondary/90 leading-relaxed space-y-4">
            <p>
              At Wimal Gift, we are proud to be among Qatar’s most trusted names in silk screen printing. With long years
              of experience and a team of skilled professionals, we specialize in delivering high-quality screen printing
              solutions for businesses, events, and personal projects. Our commitment to precision, durability, and
              creativity has made us a reliable choice for clients across Qatar
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
