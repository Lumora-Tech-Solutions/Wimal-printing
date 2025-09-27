// lib/gifts-gallery.ts
import fs from 'node:fs'
import path from 'node:path'

const EXT = /\.(jpe?g|png|webp|avif|gif)$/i
const PREFERS = ['cover', 'hero', 'thumb', 'thumbnail', 'design-1', '00', '000', '001']

function readFiles(abs: string) {
  if (!fs.existsSync(abs)) return []
  return fs.readdirSync(abs).filter((f) => EXT.test(f)).sort()
}

export function giftCover(slug: string, explicit?: string | null) {
  // If explicit provided and exists, use it
  if (explicit) {
    const absExplicit = explicit.startsWith('/')
      ? path.join(process.cwd(), 'public', explicit)
      : explicit
    if (fs.existsSync(absExplicit)) return explicit.startsWith('/') ? explicit : explicit.replace(/^public/, '')
  }

  // Otherwise, pick from folder
  const abs = path.join(process.cwd(), 'public', 'images', 'gifts', slug)
  const files = readFiles(abs)
  if (!files.length) return null

  const preferred = files.find((f) => PREFERS.some((p) => f.toLowerCase().startsWith(p)))
  const file = preferred ?? files[0]
  return `/images/gifts/${slug}/${encodeURIComponent(file)}`
}

export function giftGallery(slug: string) {
  const abs = path.join(process.cwd(), 'public', 'images', 'gifts', slug)
  return readFiles(abs).map((f) => `/images/gifts/${slug}/${encodeURIComponent(f)}`)
}
