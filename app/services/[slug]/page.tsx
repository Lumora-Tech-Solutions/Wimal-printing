import Image from 'next/image'
import { notFound } from 'next/navigation'
import { services } from '@/content/services'
import { serviceCover, serviceGallery } from '@/lib/gallery'
import QuoteForm from '@/components/QuoteForm'

export const runtime = 'nodejs'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }))
}

export function generateMetadata({ params }: Props) {
  const svc = services.find(x => x.slug === params.slug)
  return svc ? { title: `${svc.title} — Services`, description: svc.summary } : {}
}

export default function ServiceDetailPage({ params }: Props) {
  const svc = services.find(x => x.slug === params.slug)
  if (!svc) return notFound()

  const cover = serviceCover(params.slug)
  const all = serviceGallery(params.slug)
  const images = cover ? all.filter(i => i !== cover) : all

  return (
    <main className="container py-10">
      <header className="mb-6">
<h1 className="text-3xl font-semibold text-secondary">{svc.title}</h1>
<p className="mt-2 text-secondary/80">{svc.summary}</p>


      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <section className="space-y-6">
          <div className="overflow-hidden rounded-2xl border bg-white">
            {cover ? (
              <Image src={cover} alt={`${svc.title} cover`} width={1600} height={900} className="h-72 w-full object-cover sm:h-96" priority />
            ) : (
              <div className="h-72 w-full bg-gradient-to-br from-secondary/10 to-primary/10 sm:h-96" />
            )}
          </div>

          {images.length ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {images.map((src) => (
                <div key={src} className="overflow-hidden rounded-2xl border bg-white">
                  <Image src={src} alt={svc.title} width={1300} height={900} className="h-64 w-full object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No images yet for this service.</p>
          )}
        </section>

        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="rounded-2xl border p-5 bg-white">
            <h2 className="text-lg font-semibold mb-2">Request a Quote</h2>
            <QuoteForm presetService={svc.title} />
          </div>
        </aside>
      </div>
    </main>
  )
}

