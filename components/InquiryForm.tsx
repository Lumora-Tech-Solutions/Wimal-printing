'use client'

import { useState } from 'react'

export default function InquiryForm({ service }: { service?: string }) {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<null | boolean>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const body = {
      name: form.get('name')?.toString().trim() || '',
      email: form.get('email')?.toString().trim() || '',
      phone: form.get('phone')?.toString().trim() || '',
      service: service || form.get('service')?.toString().trim() || '',
      details: form.get('details')?.toString().trim() || '',
    }

    setLoading(true)
    setOk(null)
    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      setOk(Boolean(data?.ok))
      if (data?.ok) (e.target as HTMLFormElement).reset()
      alert(data?.ok ? 'Thanks! We received your request.' : 'Submission failed.')
    } catch {
      setOk(false)
      alert('Submission failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input name="name" placeholder="Your name" className="w-full rounded-md border p-2" required />
      <input type="email" name="email" placeholder="Email" className="w-full rounded-md border p-2" required />
      <input name="phone" placeholder="Phone / WhatsApp" className="w-full rounded-md border p-2" />
      {!service && (
        <input name="service" placeholder="Service (optional)" className="w-full rounded-md border p-2" />
      )}
      <textarea name="details" placeholder="Size, quantity, material, deadline, notes…" rows={5} className="w-full rounded-md border p-2" required />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center rounded-full bg-red-600 px-5 py-2.5 text-white disabled:opacity-60"
      >
        {loading ? 'Sending…' : 'Send Request'}
      </button>
      {ok === true && <p className="text-sm text-green-600">Sent!</p>}
      {ok === false && <p className="text-sm text-red-600">Couldn’t send. Try again.</p>}
    </form>
  )
}
