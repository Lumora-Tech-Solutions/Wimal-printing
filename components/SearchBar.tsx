'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { services } from '@/content/services'
import { gifts } from '@/content/gifts'

const catOptions = [
  { group: 'Services', items: services.map(s => ({ slug: s.slug, title: s.title, kind: 'service' as const })) },
  { group: 'Gifts',    items: gifts.map(g => ({ slug: g.slug,  title: g.title,  kind: 'gift'    as const })) }
]

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<{slug:string; kind:'service'|'gift'} | null>(null)

  function go() {
    if (selected) {
      router.push(selected.kind === 'service' ? `/services/${selected.slug}` : `/gifts/${selected.slug}`)
      return
    }
    const all = [...catOptions[0].items, ...catOptions[1].items]
    const hit = all.find(i => i.title.toLowerCase().includes(query.toLowerCase()))
    router.push(hit ? (hit.kind === 'service' ? `/services/${hit.slug}` : `/gifts/${hit.slug}`) : '/services')
  }

  return (
    <div className="w-full max-w-3xl mx-auto flex items-stretch gap-3">
      <select
        aria-label="Choose category"
        className="min-w-[210px] rounded-xl border px-3 py-2 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
        value={selected ? `${selected.kind}:${selected.slug}` : ''}
        onChange={(e) => {
          const val = e.target.value
          if (!val) return setSelected(null)
          const [kind, slug] = val.split(':')
          setSelected({ kind: kind as any, slug })
        }}
      >
        <option value="">All categories…</option>
        {catOptions.map(group => (
          <optgroup key={group.group} label={group.group}>
            {group.items.map(i => (
              <option key={`${group.group}:${i.slug}`} value={`${i.kind}:${i.slug}`}>
                {i.title}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      <input
        type="search"
        aria-label="Search"
        placeholder="Search a service or gift…"
        className="flex-1 rounded-xl border px-4 py-2 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && go()}
      />

      <button
        onClick={go}
        className="rounded-xl px-5 py-2 bg-secondary text-white font-semibold shadow-sm hover:brightness-110 active:brightness-95 transition"
      >
        Search
      </button>
    </div>
  )
}
