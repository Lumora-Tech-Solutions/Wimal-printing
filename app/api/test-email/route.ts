import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function GET(req: Request) {
  return sendTest(req)
}

export async function POST(req: Request) {
  return sendTest(req)
}

async function sendTest(req: Request) {
  try {
    const url = new URL(req.url)
    const queryTo = url.searchParams.get('to') // allow ?to=someone@domain.com
    const rawTo = (queryTo || process.env.MAIL_TO || '').trim()

    // Support comma-separated list, trim each
    const toList = rawTo
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    // Basic validation for plain emails (if you use "Name <email>" skip validation or adjust)
    const invalid = toList.find(t => !EMAIL_RE.test(extractEmail(t)))
    if (!toList.length || invalid) {
      return NextResponse.json(
        { ok: false, error: 'Invalid `to` field. Use email@example.com or Name <email@example.com>.' },
        { status: 422 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
      from: process.env.MAIL_FROM!,    // e.g. "Wimal Printing <no-reply@wimalgift.com>"
      to: toList.length === 1 ? toList[0] : toList,
      subject: `Test email ${Date.now()}`,
      text: 'This is a test email from Wimal’s verified domain.',
    })

    if (error) return NextResponse.json({ ok: false, error }, { status: 500 })

    return NextResponse.json({ ok: true, id: data?.id ?? null, to: toList })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 })
  }
}

// Accepts "Name <email@x.com>" or plain email and returns just the email part for validation
function extractEmail(value: string) {
  const m = value.match(/<([^>]+)>/)
  return m ? m[1] : value
}
