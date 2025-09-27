import fs from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import { gifts } from '@/content/gifts'

export const runtime = 'nodejs'

function existsPublic(p: string | undefined) {
  if (!p) return false
  const abs = path.join(process.cwd(), 'public', p)
  return fs.existsSync(abs)
}

function listFolder(slug: string) {
  const abs = path.join(process.cwd(), 'public', 'images', 'gifts', slug)
  if (!fs.existsSync(abs)) return []
  return fs.readdirSync(abs).sort()
}

export default function GiftsDebugPage() {
  return (
    <main className="container py-10">
      <h1 className="text-2xl font-bold mb-4">Gifts Debug</h1>
      <p className="text-sm text-gray-600 mb-6">
        This page checks your <code>/public/images/gifts/&lt;slug&gt;</code> folders and the <code>cover</code> paths in <code>content/gifts.ts</code>.
      </p>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">cover (from content)</th>
              <th className="p-3 text-left">cover exists?</th>
              <th className="p-3 text-left">folder exists?</th>
              <th className="p-3 text-left">files in folder</th>
              <th className="p-3 text-left">Open API</th>
              <th className="p-3 text-left">Open cover URL</th>
            </tr>
          </thead>
          <tbody>
            {gifts.map(g => {
              const folderAbs = path.join(process.cwd(), 'public', 'images', 'gifts', g.slug)
              const folderExists = fs.existsSync(folderAbs)
              const files = folderExists ? fs.readdirSync(folderAbs).sort() : []
              const coverExists = existsPublic(g.cover)
              const coverUrl = g.cover || ''

              return (
                <tr key={g.slug} className="border-t">
                  <td className="p-3 font-mono">{g.slug}</td>
                  <td className="p-3">{g.title}</td>
                  <td className="p-3 font-mono">{g.cover || <em className="text-gray-400">—</em>}</td>
                  <td className="p-3">
                    <span className={coverExists ? 'text-green-700' : 'text-red-700'}>
                      {coverExists ? 'YES' : 'NO'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={folderExists ? 'text-green-700' : 'text-red-700'}>
                      {folderExists ? 'YES' : 'NO'}
                    </span>
                  </td>
                  <td className="p-3">
                    {folderExists && files.length ? (
                      <div className="max-w-[360px] truncate">{files.join(', ')}</div>
                    ) : (
                      <span className="text-gray-400 italic">empty / missing</span>
                    )}
                  </td>
                  <td className="p-3">
                    <Link href={`/api/debug/gifts/${g.slug}`} className="text-blue-600 underline" target="_blank">
                      JSON
                    </Link>
                  </td>
                  <td className="p-3">
                    {coverUrl ? (
                      <Link href={coverUrl} className="text-blue-600 underline" target="_blank">
                        open
                      </Link>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        Tip: filenames are case-sensitive on most servers. Make sure <code>cover</code> exactly matches the real file
        (e.g. <code>cover.jpg</code> vs <code>cover.JPG</code>) and that folders match your slugs (e.g. <code>wearables-apparel</code>).
      </p>
    </main>
  )
}
