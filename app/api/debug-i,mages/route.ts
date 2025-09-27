import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const area = searchParams.get('area') || 'services'  // services | gifts | portfolio | promotions
  const slug = searchParams.get('slug') || ''
  const dir = path.join(process.cwd(), 'public', 'images', area, slug)

  if (!fs.existsSync(dir)) {
    return NextResponse.json({ ok: false, reason: 'dir-missing', dir })
  }
  const files = fs.readdirSync(dir).filter(f => /\.(png|jpe?g|webp|avif)$/i.test(f))
  return NextResponse.json({ ok: true, dir, count: files.length, files })
}
