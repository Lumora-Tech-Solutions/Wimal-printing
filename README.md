# Wimal Printing — Next.js Starter

Premium, Printo-style site with Services, Gifts, Portfolio, Promotions, and Contact (RFQ).

## Quick Start
```bash
pnpm i        # or npm i / yarn
pnpm dev
```
Open http://localhost:3000

## Tech
- Next.js 14 (App Router), Tailwind CSS
- RFQ form → `/api/rfq` (stub)
- Content-first: edit `content/services.ts` and `content/gifts.ts`
- Brand colors wired: primary `rgb(237,28,36)`, secondary `rgb(45,43,116)`

## Images
Place images under:
- `/public/images/services/<slug>/hero.jpg`, `gallery-1.jpg` …
- `/public/images/gifts/<slug>/hero.jpg`
- `/public/images/portfolio/*`

Use the provided manifest CSV to map your 248 images.
"# ping" 
