// /content/services.ts
export type ServiceCategory = {
  slug: string
  title: string
  teaser: string
  imageDir: string // relative to /public
}

export const serviceCategories: ServiceCategory[] = [
  { slug: 'backdrops', title: 'Backdrops', teaser: 'Large format backdrops for events and stages.', imageDir: 'images/services/backdrops' },
  { slug: 'digital-printing', title: 'Digital Printing', teaser: 'Fast, vibrant prints for flyers, stickers, posters and more.', imageDir: 'images/services/digital-printing' },
  { slug: 'dtf-printing', title: 'DTF Printing', teaser: 'Direct-to-film transfers for apparel and custom garments.', imageDir: 'images/services/dtf-printing' },
  { slug: 'flex-banners', title: 'Flex Banners', teaser: 'Indoor/outdoor, backlit and standard banners with durable media.', imageDir: 'images/services/flex-banners' },
  { slug: 'hot-foiling-embossing', title: 'Hot Foiling & Embossing', teaser: 'Luxury metallic foils and tactile embossing.', imageDir: 'images/services/hot-foiling-embossing' },
  { slug: 'offset-printing', title: 'Offset Printing', teaser: 'High-volume, high-quality print for brochures, books and more.', imageDir: 'images/services/offset-printing' },
  { slug: 'posters', title: 'Posters', teaser: 'Eye-catching posters in all sizes for indoor and outdoor use.', imageDir: 'images/services/posters' },
  { slug: 'rollup-stands', title: 'Rollup Stands', teaser: 'Portable rollup banners; quick to set up for events and retail.', imageDir: 'images/services/rollup-stands' },
  { slug: 'silk-screen-printing', title: 'Silk Screen Printing', teaser: 'Classic screen printing for apparel, bags and promo items.', imageDir: 'images/services/silk-screen-printing' },
  { slug: 'stickers', title: 'Stickers', teaser: 'Vinyl, die-cut and label stickers with premium finishes.', imageDir: 'images/services/stickers' },
  { slug: 'sublimation-printing', title: 'Sublimation Printing', teaser: 'Vivid all-over prints on polyester fabrics and coated items.', imageDir: 'images/services/sublimation-printing' },
  { slug: 'uv-printing', title: 'UV Printing', teaser: 'Durable UV prints on acrylic, wood, metal and more.', imageDir: 'images/services/uv-printing' },
  { slug: 'wing-banners', title: 'Wing Banners', teaser: 'Outdoor feather/teardrop flags to grab attention on the street.', imageDir: 'images/services/wing-banners' },
]
