// components/CoverImage.client.tsx
'use client'
import { useState } from 'react'

export default function CoverImage({ src, alt }: { src: string; alt: string }) {
  const [err, setErr] = useState(false)
  if (!src || err) {
    return <div className="w-full h-full bg-gradient-to-b from-gray-100 to-rose-50" />
  }
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      loading="lazy"
      onError={() => setErr(true)}
    />
  )
}
