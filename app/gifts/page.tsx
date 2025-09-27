// app/gifts/page.tsx  (SERVER COMPONENT)
import Link from 'next/link'
import { gifts } from '@/content/gifts'
import { giftCover } from '@/lib/gallery' // or '@/lib/gallery.server' if you split server-only

export const runtime = 'nodejs'

export default function GiftsIndexPage() {
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold text-secondary mb-8">Promotional Gift Items</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {gifts.map((g) => {
          // prefer explicit cover in content; otherwise pick the first image in the folder
          const cover = g.cover ?? giftCover(g.slug)
          return (
            <Link
              key={g.slug}
              href={`/gifts/${g.slug}`}
              className="group block overflow-hidden rounded-brand border bg-white hover:shadow-sm transition"
            >
              <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-gray-100 to-rose-50">
                {cover && (
                  <img
                    src={cover}
                    alt={g.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </div>

              <div className="p-5">
               <div className="font-semibold text-lg text-secondary">{g.title}</div>
      <p className="text-secondary/80 mt-1">{g.teaser}</p>

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
