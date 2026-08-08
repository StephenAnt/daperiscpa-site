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

This folder is already a git repository with everything committed on the `main` branch. You only need to create the GitHub repo and push.

**1. Create the repository.** Go to <https://github.com/new>. Name it `daperiscpa-site`, leave it Public, and do **not** tick "Add a README" — this folder already has one.

**2. Push.** Copy your new repo's URL, then run this from the site folder (replace `YOUR-USERNAME`):

```bash
cd "/Users/stephen/Documents/Claude Code/daperiscpa-site" && git remote add origin https://github.com/YOUR-USERNAME/daperiscpa-site.git && git push -u origin main
```

GitHub will ask for a username and password. The password is **not** your account password — it's a Personal Access Token. Create one at <https://github.com/settings/tokens> → Generate new token (classic) → tick the `repo` scope → copy it and paste it as the password.

If you'd rather avoid tokens, install GitHub Desktop from <https://desktop.github.com>, choose **Add Existing Repository**, point it at this folder, and click Publish.

**3. Turn on Pages.** In the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.

**4. Custom domain.** Under **Settings → Pages → Custom domain**, enter `www.daperiscpa.com` and tick **Enforce HTTPS**.

**5. DNS.** At your DNS provider, point `www` to GitHub:

```
CNAME   www   YOUR-USERNAME.github.io
```

For the apex domain (`daperiscpa.com`) add four A records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.

**Do not change DNS until you've reviewed the site and are ready to cut over** — the switch takes the Google Sites version offline.

---

## Editing

Pages are plain HTML. To change wording, open the relevant `index.html`, find the text, edit it, save, commit. Colors, fonts, and spacing all live in `assets/css/style.css` under `:root` at the top.

---

## SEO

Each page carries a unique `<title>` and meta description (110–160 characters), a canonical URL, and exactly one `<h1>`.

**Structured data (JSON-LD)** is embedded in every page:

| Schema | Where | What it does |
|---|---|---|
| `AccountingService` / `ProfessionalService` | all pages | Firm identity, contact, service area, social profiles |
| `WebSite` | all pages | Site-level identity |
| `Person` | homepage, articles | Establishes Stephen as a named, credentialed author |
| `FAQPage` | homepage | Makes the FAQ eligible for expandable results in Google |
| `Service` | 4 service pages | Describes each service and its provider |
| `BlogPosting` | 16 articles | Headline, description, publish date, author, publisher |
| `BreadcrumbList` | all inner pages | Shows a breadcrumb trail in search results |
| `ContactPage` | Schedule page | Marks it as the contact route |

**Also included:** Open Graph and Twitter Card tags with a 1200×630 share image; visible breadcrumbs on inner pages; machine-readable `<time datetime>` on article bylines; a sitemap with per-URL `lastmod`, `changefreq`, and `priority`; `robots.txt`; and a custom `404.html`.

### After you go live

1. Add the site at <https://search.google.com/search-console>, verify ownership, and submit `https://www.daperiscpa.com/sitemap.xml`.
2. Run a few pages through the <https://search.google.com/test/rich-results> to confirm the FAQ and Article results are picked up.
3. Claim or update your Google Business Profile. For a local CPA firm that moves the needle more than anything on the site itself — and it's what drives map results.

### Deliberately not included

**Review / `aggregateRating` markup.** The testimonials are real, but Google ignores (and can penalize) review markup a business puts on its own site about itself. Your Google reviews already earn that visibility on the right surface. Leave this off.

### Fixed from the original

On the live Google Sites site, the article card for *"No Employer, No Benefits? Not True."* reused the summary from the quarterly-estimated-taxes article — it described due dates and safe harbor, which isn't that article's subject. The link was always correct; only the summary was wrong.

It now reads: *"Going solo doesn't mean losing pre-tax health coverage or a retirement match. Here's how to deduct 100% of your premiums and pick the right retirement plan."*

This is the one place the site's wording intentionally differs from the Google Sites original. The replacement lives in `BLURB_FIX` in the build script and is used for both the card on `/Articles/` and that page's meta description, so the two articles no longer compete for the same search snippet.

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
- **Jotform contact form** (`262186870485165`) on the Schedule page.
- **TaxDome portal** — `https://daperiscpa.taxdome.com/` on the Secure Client Portal page.
- **Business Start Up Checklist** — links to the Google Drive file from the Business Entity page.
- **Google Analytics** (`G-6B2Z1SBVY5`) on all 24 pages — same property as the Google Sites site, so traffic history stays continuous.
- **YouTube walkthrough** on the Secure Client Portal page.
- **LinkedIn, Instagram, and Google Reviews** links in the footer.
- **Credly credential badges** (Intuit Client Advisory Services Foundations, QuickBooks Level 1 Certified, Intuit Bookkeeping Trained) on the CPA Services and Bookkeeping & Payroll pages. IDs live in `CREDLY_BADGES`; the shared `embed.js` is loaded once per page and handles all three.

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
