import fs from 'node:fs'
import path from 'node:path'

export type ImgItem = { src: string; w?: number; h?: number }

export async function listPublicImages(dir: string): Promise<ImgItem[]> {
  // dir is like: "images/services/digital-printing"
  const abs = path.join(process.cwd(), 'public', dir)
  if (!fs.existsSync(abs)) return []

  const files = fs.readdirSync(abs)
    .filter(f => /\.(png|jpe?g|webp|gif)$/i.test(f))
    .sort((a,b) => a.localeCompare(b))

  return files.map(f => ({ src: `/${dir}/${f}` }))
}


