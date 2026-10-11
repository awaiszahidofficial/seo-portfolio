# Muhammad Awais | SEO Specialist Portfolio

A fast, static portfolio site for Muhammad Awais. No build step and no dependencies.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page content and structured data |
| `style.css` | Design, dark and light themes, responsive layout |
| `script.js` | Theme toggle, mobile menu, chart reveal, contact form |
| `404.html` | Page shown for broken links |
| `robots.txt`, `sitemap.xml` | Search engine files |
| `assets/favicon.svg` | Site icon |
| `.nojekyll` | Tells GitHub Pages to serve files as they are |

## Publish on GitHub Pages

1. Copy all files (including the hidden `.nojekyll`) into the root of the repository, replacing the old ones, then commit and push.
2. On GitHub open **Settings > Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main**, folder **/ (root)**, then Save.
4. After a minute the site is live at `https://awaiszahidofficial.github.io/awais-portfolio/`.

If you use a custom domain or a different repository name, update the URL in `index.html` (canonical, `og:url`, JSON-LD), `robots.txt` and `sitemap.xml`.

## Contact form

GitHub Pages is static, so it cannot receive form posts by itself.

- **Default:** the form opens an email draft addressed to `awaiszahid322@gmail.com`.
- **Optional, no email app needed:** create a free form at [formspree.io](https://formspree.io), then paste its URL into the `data-endpoint=""` attribute on the `<form id="form">` tag in `index.html`.

## Updating content

Results are plain HTML in the `#results` section. Add real top keywords to the three smaller client cards once you have them from Search Console. Replace the approximate figures with exact ones when you can.

## Photo and screenshots

Your portrait is `assets/awais.jpg`. To change it, upload a file with the same name to the `assets` folder.

## Focus keywords

The three "focus keywords" on the Rodeo Blinds, A-Z Construction and Mya Cleaning cards come from each client's own website content. Replace them with real ranking positions from Search Console when you have them. Results are plain HTML in the `#results` section.
