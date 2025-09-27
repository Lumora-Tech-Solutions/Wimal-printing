import Link from 'next/link'

type Props = {
  href: string
  title: string
  teaser?: string
  img?: string // e.g. "/images/gifts/stationery-office/cover.jpg"
}

export default function ServiceCard({ href, title, teaser, img }: Props) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-brand border bg-white hover:shadow-sm transition"
    >
      <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-gray-100 to-rose-50">
        {img ? (
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold">{title}</h3>
        {teaser ? <p className="text-sm text-gray-600 mt-1">{teaser}</p> : null}
        <div className="mt-3 text-secondary text-sm font-medium group-hover:underline">
          View details →
        </div>
      </div>
    </Link>
  )
}
