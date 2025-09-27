// app/api/test-email/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST() {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const from = process.env.MAIL_FROM || 'onboarding@resend.dev'
    const to = process.env.MAIL_TO
    if (!to) throw new Error('MAIL_TO missing')

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: `Local test ${Date.now()}`,     // unique subject helps find it in Gmail
      text: 'Plain text test from localhost. If you see this, delivery works.',
      // 👇 camelCase for the SDK typings
      replyTo: 'wimalgift@gmail.com',         // or whichever inbox should get replies
    })

    if (error) {
      // bubble up the SDK's error details
      return NextResponse.json(
        { ok: false, error: error.message, name: error.name },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null })
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? 'send failed' },
      { status: 500 }
    )
  }
}
