# daperiscpa.com

Static site for **Daperis CPA, PLLC**, rebuilt from the existing Google Sites site for hosting on GitHub Pages.

All page copy was transcribed verbatim from the live site — no wording was changed, rewritten, or shortened. A block-by-block check confirmed 721/721 text blocks carried over exactly.

---

## What's here

```
index.html                              Home (includes #pricing and #about anchors)
cpa-services/                           CPA Services overview
  tax-planning-preparation/
  bookkeeping-payroll/
  business-entity-advisory-setup/
  secure-client-portal/
Articles/                               Article index + 16 article pages
Schedule-a-Strategy-Session/
assets/css/style.css                    All styling
CNAME                                   Custom domain for GitHub Pages
sitemap.xml, robots.txt, .nojekyll
```

Every URL matches the current Google Sites URL exactly, so existing links and search rankings carry over. No redirects needed.

---

## Preview locally

From this folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

---

## Publish to GitHub Pages

1. Create a new repository on GitHub (e.g. `daperiscpa-site`).
2. Push this folder to it:

```bash
git init && git add -A && git commit -m "Initial site" && git branch -M main
```

3. Add your repo as the remote and push:

```bash
git remote add origin https://github.com/YOUR-USERNAME/daperiscpa-site.git && git push -u origin main
```

4. In the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
5. Under **Settings → Pages → Custom domain**, enter `www.daperiscpa.com` and tick **Enforce HTTPS**.
6. At your DNS provider, point `www` to GitHub:

```
CNAME   www   YOUR-USERNAME.github.io
```

For the apex domain (`daperiscpa.com`) add four A records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.

**Do not change DNS until you've reviewed the site and are ready to cut over** — the switch takes the Google Sites version offline.

---

## Editing

Pages are plain HTML. To change wording, open the relevant `index.html`, find the text, edit it, save, commit. Colors, fonts, and spacing all live in `assets/css/style.css` under `:root` at the top.

---

## Still to add

| Item | Where |
|---|---|
| Section images | Google blocked automated download; re-upload originals to `assets/images/` |

## Section backgrounds

Every page uses only two section backgrounds: cream `#FAF8F4` (`class="bg-cream"`) and forest green `#274E13` (`class="bg-green"`). No white, no pale green. Consecutive cream sections get a hairline divider automatically via `.bg-cream + .bg-cream` in `style.css`.

Cards *inside* those sections stay white — `.card`, `.quote`, `.article-item`, `.author-box`, and the `.compare` panels. That white-on-cream contrast is what replaces the old alternating stripes.

Article CTA blocks (`.post-cta`) are solid green with a white button, matching the closing CTA on the homepage.

## Already wired up

- **Logo** — `assets/images/logo.png`, used in the header and as the favicon on all 24 pages.
- **Photo of Stephen** — `assets/images/stephen.jpg` in the About section, cropped 4:5 and optimized to 115 KB.
- **Pricing calculator** — in the `#pricing` section of the homepage. Markup is in `index.html`; styles in `assets/css/pricing-calc.css`; prices and features in `assets/js/pricing-calc.js`.
- **Jotform contact form** (`261037489685066`) on the Schedule page.
- **TaxDome portal** — `https://daperiscpa.taxdome.com/` on the Secure Client Portal page.
- **Business Start Up Checklist** — links to the Google Drive file from the Business Entity page.
- **Google Analytics** (`G-6B2Z1SBVY5`) on all 24 pages — same property as the Google Sites site, so traffic history stays continuous.
- **YouTube walkthrough** on the Secure Client Portal page.
- **LinkedIn, Instagram, and Google Reviews** links in the footer.

### Editing prices

All pricing lives in one place — `assets/js/pricing-calc.js`, in the `PRICING` object:

```js
individual: {
  compliant: { base: 500,  billing: "onetime", includedThrough: 6 },
  ...
}
```

`base` is the starting price, `billing` is `"onetime"` or `"monthly"`, and `includedThrough` is how many feature rows (counting from the top of the `FEATURES` list) show a checkmark rather than a dash.

---

© 2026 Daperis CPA, PLLC. All rights reserved.
