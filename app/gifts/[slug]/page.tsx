// app/gifts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { gifts } from '@/content/gifts'
import { giftCover, giftGallery } from '@/lib/gallery'
import QuoteForm from '@/components/QuoteForm'

export const runtime = 'nodejs'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return gifts.map((g) => ({ slug: g.slug }))
}

export function generateMetadata({ params }: Props) {
  const cat = gifts.find((g) => g.slug === params.slug)
  return cat ? { title: `${cat.title} — Gifts`, description: cat.teaser } : {}
}

export default function GiftCategoryPage({ params }: Props) {
  const cat = gifts.find((g) => g.slug === params.slug)
  if (!cat) return notFound()

  const cover = cat.cover ?? giftCover(cat.slug)
  const all = giftGallery(cat.slug)
  const images = cover ? all.filter((u) => u !== cover) : all

  return (
    <main className="container py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-secondary">{cat.title}</h1>
       <p className="mt-2 text-secondary/80">{cat.teaser}</p>

      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Cover */}
        <section className="space-y-6">
          <div className="overflow-hidden rounded-2xl border bg-white">
            {cover ? (
              <img
                src={cover}
                alt={`${cat.title} cover`}
                className="w-full h-80 sm:h-96 object-cover"
              />
            ) : (
              <div className="w-full h-80 sm:h-96 bg-gradient-to-br from-secondary/10 to-primary/10" />
            )}
          </div>

          {/* Gallery */}
          {images.length ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {images.map((src) => (
                <div key={src} className="overflow-hidden rounded-2xl border bg-white">
                  <img
                    src={src}
                    alt={cat.title}
                    className="h-64 w-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No additional images yet for this category.</p>
          )}
        </section>

        {/* Quote form */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-2xl border p-5 bg-white">
            <h2 className="text-lg font-semibold mb-2">Request a Quote</h2>
            <QuoteForm presetService={`Gift: ${cat.title}`} />
          </div>
        </aside>
      </div>
    </main>
  )
}
