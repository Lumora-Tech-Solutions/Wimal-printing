// lib/gallery.ts
import fs from 'node:fs'
import path from 'node:path'

const EXT = /\.(jpe?g|png|webp|avif|gif)$/i
const COVERS = ['cover', 'hero', 'thumbnail', 'thumb', '00', '000', '001']

function readImages(dir: string, urlBase: string) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => EXT.test(f))
    .map(f => `${urlBase}/${encodeURIComponent(f)}`)
    .sort()
}

function pickCover(dir: string, urlBase: string) {
  if (!fs.existsSync(dir)) return null
  const files = fs.readdirSync(dir).filter(f => EXT.test(f))
  const hit = files.find(f => COVERS.some(c => f.toLowerCase().startsWith(c)))
  if (hit) return `${urlBase}/${encodeURIComponent(hit)}`
  const sorted = files.sort()
  return sorted.length ? `${urlBase}/${encodeURIComponent(sorted[0])}` : null
}

/* ------------ SERVICES ------------ */
export function serviceGallery(slug: string) {
  const dir = path.join(process.cwd(), 'public', 'images', 'services', slug)
  return readImages(dir, `/images/services/${slug}`)
}
export function serviceCover(slug: string) {
  const dir = path.join(process.cwd(), 'public', 'images', 'services', slug)
  return pickCover(dir, `/images/services/${slug}`)
}

/* -------------- GIFTS ------------- */
export function giftGallery(slug: string) {
  const dir = path.join(process.cwd(), 'public', 'images', 'gifts', slug)
  return readImages(dir, `/images/gifts/${slug}`)
}
export function giftCover(slug: string) {
  const dir = path.join(process.cwd(), 'public', 'images', 'gifts', slug)
  return pickCover(dir, `/images/gifts/${slug}`)
}