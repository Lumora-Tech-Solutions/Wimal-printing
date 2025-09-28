import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs' // ensure Node runtime for Resend

const resend = new Resend(process.env.RESEND_API_KEY)
const MAIL_TO = process.env.MAIL_TO || 'wimalgift@gmail.com' // change later
const MAIL_FROM = process.env.MAIL_FROM || 'Wimal Printing <onboarding@resend.dev>'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const name = (body?.name || '').toString().trim()
    const email = (body?.email || '').toString().trim()
    const phone = (body?.phone || '').toString().trim()
    const service = (body?.service || '').toString().trim()
    const details = (body?.details || '').toString().trim()

    if (!name || !email || !details) {
      return NextResponse.json({ ok: false, error: 'VALIDATION_ERROR' }, { status: 400 })
    }

    // IMPORTANT: From must be a domain Resend accepts. We keep onboarding@resend.dev.
    // To your own mailbox (MAIL_TO).
    const subject = `New RFQ — ${service || 'General'} — ${name}`
    const html = `
      <h2>New Quote Request</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone || '-'}</p>
      <p><b>Service:</b> ${service || '-'}</p>
      <p><b>Details:</b><br/>${details.replace(/\n/g, '<br/>')}</p>
    `

 await resend.emails.send({
  from: MAIL_FROM,            // "Wimal Printing <onboarding@resend.dev>"
  to: MAIL_TO,                // nimteenu@gmail.com
  replyTo: email,             
  subject,
  html,
})


    return NextResponse.json({ ok: true })
  } catch (e: any) {
    // When Resend sandbox blocks certain "from" addresses, you'll still get a clean JSON error.
    return NextResponse.json({ ok: false, error: 'SERVER_ERROR' }, { status: 500 })
  }
}
