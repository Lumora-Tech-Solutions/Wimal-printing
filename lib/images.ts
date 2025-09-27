export const heroImage = (slug: string) => `/images/services/${slug}/hero.jpg`;
export const galleryImage = (slug: string, i: number) => `/images/services/${slug}/gallery-${i}.jpg`;
export const giftHero = (slug: string) => `/images/gifts/${slug}/hero.jpg`;
export const giftItemImage = (slug: string, sub: string, i: number) => `/images/gifts/${slug}/${sub.replace(/\s+/g,'-').toLowerCase()}-${i}.jpg`;
