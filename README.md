# noshnik.com

Personal website of **Nimba Oshnik**.

Live at **[www.noshnik.com](https://www.noshnik.com)** · hosted on GitHub Pages.

## About

A hand-written static site; no framework, no build step, no dependencies.
Open `index.html` in a browser and it runs.

- **Single-page, long-scroll design.** A fixed background "scene" stack crossfades
  between sections as you scroll; the hero pins and dissolves as content moves over it.
- **Light / dark theme** with a toggle. The choice persists, and an inline-free
  init script applies it before first paint, so there's no flash of the wrong colours.
- **Progressive enhancement.** Everything is readable with JavaScript disabled;
  the scroll effects, gallery lightbox and scroll-spy nav are extras. Fully
  respects `prefers-reduced-motion`.

## Layout

| Path | Purpose |
| --- | --- |
| `index.html` | The site — hero, about, work & research, outreach, gallery, contact |
| `outreach.html` | Science-outreach portfolio [blog post, infographic, talks] |
| `blog.html` | Index of notes & writings |
| `blog-*.html` | Individual blog posts |
| `404.html` | Custom not-found page |
| `style.css`, `app.js`, `theme-init.js` | All styling and behaviour |
| `assets/` | Photographs, portrait, illustrations |
| `fonts/` | Self-hosted Source Serif 4 [SIL OFL] |
| `Nimba-Oshnik-CV.pdf` | Curriculum vitae |
| `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml`, `site.webmanifest` | Hosting, indexing and PWA metadata |

Type is **Iowan Old Style** with a self-hosted **Source Serif 4** fallback, paired
with Helvetica.

## Security & privacy

GitHub Pages can't set HTTP response headers; hardening is done at the document level:

- A strict **Content-Security-Policy** meta [`script-src 'self'`, `style-src 'self'`,
  no inline scripts or styles anywhere], plus a strict referrer policy.
- No third-party scripts, no analytics, no cookies, no external fonts or CDNs —
  every asset is served from this origin.
- All external links carry `rel="noopener noreferrer"`.

Not achievable without a proxy/CDN in front: HSTS, `X-Frame-Options` /
`frame-ancestors`, `X-Content-Type-Options`, `Permissions-Policy`.

## SEO

Per-page title, description and canonical URL; Open Graph + Twitter cards with a
self-hosted 1200×630 PNG preview; JSON-LD `Person` schema; `sitemap.xml` and
`robots.txt`; full icon set [SVG, ICO, Apple touch, maskable PWA].

## Copyright

© Nimba Oshnik. **All photographs, illustrations and written content are mine and
are not licensed for reuse.** The mountain photographs carry a visible copyright
notice burned into the image.

Fonts in `fonts/` are third-party and licensed separately under the
[SIL Open Font License](fonts/OFL.txt).
