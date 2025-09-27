'use client'
import { useState } from 'react'

export default function QuoteForm({ presetService }: { presetService?: string }) {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<null|boolean>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true); setOk(null)
    const f = e.currentTarget
    const body = {
      name:   (f.elements.namedItem('name')    as HTMLInputElement).value,
      email:  (f.elements.namedItem('email')   as HTMLInputElement).value,
      phone:  (f.elements.namedItem('phone')   as HTMLInputElement).value,
      service:(f.elements.namedItem('service') as HTMLInputElement).value,
      details:(f.elements.namedItem('details') as HTMLTextAreaElement).value,
    }
    const res = await fetch('/api/quote', {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)
    })
    setOk(res.ok); setLoading(false)
    if (res.ok) f.reset()
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input name="name"    className="input" required placeholder="Your name" />
      <input name="email"   className="input" type="email" required placeholder="Email" />
      <input name="phone"   className="input" placeholder="Phone / WhatsApp" />
      <input name="service" className="input" defaultValue={presetService} placeholder="Service" />
      <textarea name="details" className="input min-h-32" required placeholder="Size, quantity, material, deadline, notes…" />
      <button className="btn-primary" disabled={loading}>{loading ? 'Sending…' : 'Send Inquiry'}</button>
      {ok === true  && <p className="text-green-600 text-sm">Thanks! We’ll get back to you shortly.</p>}
      {ok === false && <p className="text-red-600 text-sm">Sorry, something went wrong.</p>}
    </form>
  )
}
