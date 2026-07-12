# noshnik.com — single-page immersive-scroll edition

Personal website of **Nimba Oshnik** — quantum-sensing physicist. This is the
**one-page, Apple-style long-scroll dark edition**: hero → about → research →
outreach → mountains → contact on a single scrollable page, with a light/dark
toggle, scroll-spy nav, scroll progress bar, and a photo lightbox.

> **This is one of two mutually-exclusive designs for `www.noshnik.com`.**
> The other is the classic multi-page site (`web/`). Both target the same domain
> and carry the same `CNAME` / canonical URLs — **deploy only one of them.**
> Pick this repo for the single-page dark look; pick `web/` for the multi-page look.

## Contents

| Path | Purpose |
|------|---------|
| `index.html` | The whole site — all sections on one page |
| `blog.html` | Blog (draft placeholder), linked from the Outreach section |
| `404.html` | Custom not-found page |
| `style.css` | Design system (dark by default, light via the toggle) |
| `theme-init.js` | Pre-paint theme + no-JS-flash guard (loaded blocking in `<head>`) |
| `app.js` | Scroll progress, sticky header, scroll-spy, reveal, lightbox, theme toggle |
| `assets/` | Placeholder SVG imagery |
| `sitemap.xml`, `robots.txt` | SEO |
|  `site.webmanifest`, `favicon.svg`, `og-image.png` | Icons / social preview |
| `.well-known/security.txt` | Security contact (RFC 9116) |
| `CNAME` | Custom domain (`www.noshnik.com`) |

## Deploy (GitHub Pages)

This folder **is** the site root.

1. Create a repo named **`nos81.github.io`** (a user site serves at the domain root).
2. Put the contents of this folder at the repo root and push to `main`.
3. **Settings → Pages →** Source = *Deploy from a branch*, Branch = `main` / `/ (root)`.
4. **Settings → Pages → Custom domain** → confirm `www.noshnik.com` (the `CNAME`
   file sets this) and tick **Enforce HTTPS**.

The `.nojekyll` file makes Pages serve files as-is.

## Security notes

Best-effort hardening for a static host, delivered via `<meta>` because GitHub
Pages cannot set custom HTTP response headers:

- **Content-Security-Policy** — `default-src 'self'`, `object-src 'none'`,
  `base-uri 'self'`, no inline/remote scripts (theme init is an external
  `theme-init.js`, and there are no inline styles — so `script-src`/`style-src`
  are `'self'` with no `'unsafe-inline'`), `upgrade-insecure-requests`.
- **referrer** — `strict-origin-when-cross-origin`; external links use
  `rel="noopener noreferrer"`; HTTPS enforced by GitHub Pages.

**Not achievable via meta on GitHub Pages** (need real headers):
`X-Content-Type-Options`, `X-Frame-Options` / CSP `frame-ancestors`,
`Permissions-Policy`. Front with a proxy/CDN (e.g. Cloudflare) if required.

## SEO notes

`<title>`/`description`/canonical, Open Graph + Twitter cards, JSON-LD `Person`,
`sitemap.xml`, `robots.txt`, and a self-hosted 1200×630 `og-image.png`
social-preview image (PNG, since some crawlers such as Twitter/X and
Facebook don't rasterise SVG previews).
