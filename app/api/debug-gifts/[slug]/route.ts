import { NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'

export const runtime = 'nodejs'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const abs = path.join(process.cwd(), 'public', 'images', 'gifts', params.slug)
  const exists = fs.existsSync(abs)
  const files = exists ? fs.readdirSync(abs) : []
  return NextResponse.json({
    folder: `/public/images/gifts/${params.slug}`,
    exists,
    files,
  })
}
