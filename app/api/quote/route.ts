import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const resend   = new Resend(process.env.RESEND_API_KEY)
const MAIL_TO  = process.env.MAIL_TO  || 'mlwimal64@gmail.com'
const MAIL_FROM= process.env.MAIL_FROM|| 'Wimal Printing <onboarding@resend.dev>'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    if (!data?.name || !data?.email || !data?.details) {
      return NextResponse.json({ ok:false, error:'MISSING_FIELDS' }, { status:400 })
    }
    const subject = `New Quote — ${data.service || 'General'} — ${data.name}`
    const html = `
      <h2>New Quote</h2>
      <p><b>Name:</b> ${data.name}</p>
      <p><b>Email:</b> ${data.email}</p>
      <p><b>Phone:</b> ${data.phone || '-'}</p>
      <p><b>Service:</b> ${data.service || '-'}</p>
      <hr/>
      <p>${String(data.details || '').replace(/\n/g,'<br/>')}</p>`

    await resend.emails.send({ from: MAIL_FROM, to: MAIL_TO, subject, html })
    return NextResponse.json({ ok:true })
  } catch (e:any) {
    return NextResponse.json({ ok:false, error:e?.message || 'SERVER_ERROR' }, { status:500 })
  }
}
