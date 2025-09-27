import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY in .env.local')
}

export const resend = new Resend(process.env.RESEND_API_KEY)
export const MAIL_FROM = process.env.MAIL_FROM || 'onboarding@resend.dev'
export const MAIL_TO = process.env.MAIL_TO || 'nimteenu@gmail.com'
