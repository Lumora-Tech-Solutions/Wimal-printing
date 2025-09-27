import { NextResponse } from 'next/server'
import path from 'node:path'
import fs from 'node:fs'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const dir = path.join(process.cwd(), 'public/images/gifts')
  const exists = fs.existsSync(dir)
  const entries = exists ? fs.readdirSync(dir) : []
  return NextResponse.json({ dir, exists, entries })
}
