// scripts/categorize-images.mjs
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'public', 'images', 'incoming')
const DEST = path.join(ROOT, 'public', 'images')

// Map: keywords → service/gift slug
const ROUTES = [
  // Services
  { slug: 'digital-printing',      keywords: ['digital','flyer','pamphlet','leaflet','poster','label','sticker','print'] },
  { slug: 'flex-banners',          keywords: ['flex','banner','outdoor','backlit','frontlit','hoarding'] },
  { slug: 'stickers',              keywords: ['sticker','label','decals','adhesive'] },
  { slug: 'rollup-stands',         keywords: ['rollup','roll-up','roller','x-stand','pullup'] },
  { slug: 'wing-banners',          keywords: ['wing','feather','teardrop','flag'] },
  { slug: 'posters',               keywords: ['poster','a1','a2','a3'] },
  { slug: 'backdrops',             keywords: ['backdrop','step and repeat','photo booth','stage'] },
  { slug: 'offset-printing',       keywords: ['offset','letterhead','letter-head','visiting card','business card','ncr','brochure','profile','leaflet'] },
  { slug: 'silk-screen-printing',  keywords: ['screen','silk','uniform','balloon','lanyard','diary (screen)'] },
  { slug: 'sublimation-printing',  keywords: ['sublimation','mug','ceramic','tile','rock','aluminium','aluminum','name tag','gift'] },
  { slug: 'hot-foiling-embossing', keywords: ['foil','foiling','emboss','deboss','plate making','leather','pu'] },
  { slug: 'dtf-printing',          keywords: ['dtf','transfer','film','heat press','cloth'] },
  { slug: 'uv-printing',           keywords: ['uv','acrylic','wood','crystal','pen','box','notebook','leather'] },

  // Gifts
  { slug: 'stationery-office',     base: 'gifts', keywords: ['pen','pencil','notebook','diary','planner','calendar','file','envelope','sticky note','bookmark'] },
  { slug: 'wearables-apparel',     base: 'gifts', keywords: ['tshirt','t-shirt','tee','polo','cap','hat','hoodie','jacket','lanyard','id card','wristband'] },
  { slug: 'bags-carriers',         base: 'gifts', keywords: ['bag','tote','canvas bag','backpack','drawstring','laptop sleeve','paper bag'] },
  { slug: 'drinkware-lifestyle',   base: 'gifts', keywords: ['mug','cup','bottle','flask','travel mug','coaster','tray'] },
  { slug: 'tech-accessories',      base: 'gifts', keywords: ['usb','power bank','mouse pad','phone stand','holder','earphone'] },
  { slug: 'home-everyday',         base: 'gifts', keywords: ['keychain','key tag','umbrella','clock','photo frame','cushion'] },
  { slug: 'travel-outdoor',        base: 'gifts', keywords: ['sunshade','travel pouch','cooler','picnic','raincoat','poncho'] },
]

const IMG_EXT = /\.(jpe?g|png|webp|avif)$/i
const slugDir = (slug, base) =>
  base === 'gifts'
    ? path.join(DEST, 'gifts', slug)
    : path.join(DEST, 'services', slug)

function matchSlug(name) {
  const n = name.toLowerCase()
  for (const r of ROUTES) {
    if (r.keywords.some(k => n.includes(k))) return { slug: r.slug, base: r.base || 'services' }
  }
  return null
}

async function ensureDir(d) { await fsp.mkdir(d, { recursive: true }) }

async function run() {
  if (!fs.existsSync(SRC)) {
    console.error('Incoming folder not found:', SRC)
    process.exit(1)
  }

  const files = await fsp.readdir(SRC)
  let moved = 0, unknown = 0

  for (const f of files) {
    const srcPath = path.join(SRC, f)
    const stat = await fsp.stat(srcPath).catch(() => null)
    if (!stat || !stat.isFile() || !IMG_EXT.test(f)) continue

    const match = matchSlug(f)
    if (match) {
      const outDir = slugDir(match.slug, match.base)
      await ensureDir(outDir)
      const safe = f.toLowerCase().replace(/\s+/g, '-')
      const dest = path.join(outDir, `${Date.now()}-${safe}`) // avoid collisions
      await fsp.copyFile(srcPath, dest)
      moved++
    } else {
      const outDir = path.join(DEST, 'uncategorized')
      await ensureDir(outDir)
      await fsp.copyFile(srcPath, path.join(outDir, f))
      unknown++
    }
  }

  console.log(`Done. Routed: ${moved}, Uncategorized: ${unknown}`)
}

run().catch(e => { console.error(e); process.exit(1) })
