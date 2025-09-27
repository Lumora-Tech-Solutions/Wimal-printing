// content/gifts.ts
export type GiftItem = {
  slug: string
  title: string
  teaser: string
  /** Prefer absolute path under /public, e.g. "/images/gifts/slug/cover.jpg" */
  cover?: string
}

export const gifts: GiftItem[] = [
  {
    slug: 'stationery-office',
    title: 'Stationery & Office',
    teaser: 'Pens, notebooks, planners, calendars, folders…',
    cover: '/images/gifts/stationery-office/design-1.png',
  },

  {
    slug: 'bags-carriers',
    title: 'Bags & Carriers',
    teaser: 'Tote bags, canvas, backpacks, drawstrings…',
    cover: '/images/gifts/bags-carriers/design-1.png',
  },
  {
    slug: 'drinkware-lifestyle',
    title: 'Drinkware & Lifestyle',
    teaser: 'Mugs, bottles, flasks, travel mugs…',
    cover: '/images/gifts/drinkware-lifestyle/design-1.png', // <- fixed
  },
  {
    slug: 'tech-accessories',
    title: 'Tech & Accessories',
    teaser: 'USB drives, power banks, mouse pads…',
    cover: '/images/gifts/tech-accessories/design-1.png',
  },
  {
    slug: 'home-everyday',
    title: 'Home & Everyday Use',
    teaser: 'Keychains, umbrellas, clocks, frames…',
    cover: '/images/gifts/home-everyday/design-1.png',
  },
  {
    slug: 'travel-outdoor',
    title: 'Travel & Outdoor',
    teaser: 'Caps, pouches, coolers & picnic sets…',
    cover: '/images/gifts/travel-outdoor/design-1.png',
  },
]
