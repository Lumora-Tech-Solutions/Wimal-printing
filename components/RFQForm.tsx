'use client'
import { useState } from 'react'

export default function RFQForm() {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<null | boolean>(null)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true); setOk(null); setError(null)

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value.trim(),
      service: (form.elements.namedItem('service') as HTMLInputElement).value.trim(),
      details: (form.elements.namedItem('details') as HTMLTextAreaElement).value.trim(),
    }

    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        throw new Error(json?.error || 'Failed to submit')
      }
      setOk(true)
      form.reset()
    } catch (err: any) {
      setOk(false)
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input name="name" placeholder="Your name" className="input" required />
      <input type="email" name="email" placeholder="Email" className="input" required />
      <input name="phone" placeholder="Phone (optional)" className="input" />
      <input name="service" placeholder="Service (optional)" className="input" />
      <textarea name="details" placeholder="Tell us what you need…" className="input min-h-[120px]" required />
      <button disabled={loading} className="btn-primary w-full">
        {loading ? 'Sending…' : 'Submit'}
      </button>

      {ok === true && <p className="text-green-600 text-sm">Thanks! We received your request.</p>}
      {ok === false && <p className="text-red-600 text-sm">Error: {error}</p>}
    </form>
  )
}
