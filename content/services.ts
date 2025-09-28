// content/services.ts
export type Service = {
  slug: string
  title: string
  summary: string
}

export const services: Service[] = [
  { slug: 'silk-screen-printing',  title: 'Silk Screen Printing',  summary: 'Uniforms, balloons, lanyards & more.' },
  { slug: 'uv-printing',           title: 'UV Printing',           summary: 'Direct print on wood, acrylic, leather & more.' },
  { slug: 'hot-foiling-embossing', title: 'Hot Foiling / Emboss',  summary: 'Foil & raised effects on paper/leather.' },
  { slug: 'digital-printing',      title: 'Digital Printing',      summary: 'Fast, vibrant prints for flyers, posters & more.' },
  { slug: 'flex-banners',          title: 'Flex Banners',          summary: 'High-impact outdoor banners in any size.' },
  { slug: 'stickers',              title: 'Stickers',              summary: 'Labels & decals in custom sizes and finishes.' },
  { slug: 'rollup-stands',         title: 'Roll-up Stands',        summary: 'Portable pull-up displays for events.' },
  { slug: 'wing-banners',          title: 'Wing Banners',          summary: 'Feather/teardrop flags for outdoor promo.' },
  { slug: 'posters',               title: 'Posters',               summary: 'Large format posters (A1/A2/A3 and custom).' },
  { slug: 'backdrops',             title: 'Backdrops',             summary: 'Stage/photo backdrops, step-and-repeat.' },

  // 👇 merged category here
  { 
    slug: 'offset-dtf-printing',   
    title: 'Offset & DTF Printing', 
    summary: 'Visiting cards, brochures, letterheads plus durable garment transfers for apparel.' 
  },

 
  { slug: 'sublimation-printing',  title: 'Sublimation Printing',  summary: 'Mugs, tiles, rock frames, name tags & gifts.' },
  
  
]
