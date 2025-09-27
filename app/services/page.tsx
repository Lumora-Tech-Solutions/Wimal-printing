import Link from 'next/link'
import { services } from '@/content/services'
import { serviceCover } from '@/lib/gallery'

export const runtime = 'nodejs'

export default function ServicesIndex() {
  return (
    <main className="container py-10">
      <h1 className="text-3xl text-secondary font-bold mb-6">All Services</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => {
          const cover = serviceCover(s.slug) // string|null
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group block overflow-hidden rounded-brand border bg-white hover:shadow-sm transition"
            >
              <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-gray-100 to-rose-50">
                {cover && (
                  // using plain <img> to keep it simple & errorless
                  <img src={cover} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
                )}
              </div>
              <div className="p-5">
               <div className="font-semibold text-lg text-secondary">{s.title}</div>
               <p className="text-secondary/80 mt-1">{s.summary}</p>
                <div className="mt-3 text-secondary text-sm font-medium group-hover:underline">
                  View details →
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
}

