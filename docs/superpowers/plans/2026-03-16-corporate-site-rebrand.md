# Lemur Corporate Site Rebrand — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page static corporate site for Lemur Finance that repositions the company as an embedded finance / fintech-as-a-service partner, replacing the current Webflow site.

**Architecture:** Static HTML/CSS/JS with no framework or build step. One main `index.html` page, two legal pages (`terms.html`, `privacy.html`), a shared stylesheet, and a small JS file for scroll animations. All assets (logos, headshots, partner logos) extracted from the current Webflow site or sourced from the web.

**Tech Stack:** HTML5, CSS3 (custom properties for design tokens), vanilla JS (IntersectionObserver for scroll reveals)

**Spec:** `docs/superpowers/specs/2026-03-16-corporate-site-rebrand-design.md`

---

## File Structure

```
/
├── index.html              # Main single-page site
├── terms.html              # Terms & Conditions
├── privacy.html            # Privacy Policy
├── css/
│   └── style.css           # All styles (design tokens, layout, components, responsive)
├── js/
│   └── main.js             # Scroll reveal animations
├── assets/
│   ├── logo.svg            # Full-color Lemur logo (header)
│   ├── logo-white.svg      # White Lemur logo (footer/dark sections)
│   ├── favicon.ico         # Favicon from current site
│   ├── og-image.png        # OG image for link previews
│   ├── headshots/
│   │   ├── nick.jpg        # Founder headshot
│   │   ├── chris.jpg       # Founder headshot
│   │   └── tom.jpg         # Founder headshot
│   └── logos/              # Partner and client logos (monochrome SVGs)
│       ├── fiserv.svg
│       ├── credit-karma.svg
│       ├── moneylion.svg
│       ├── innovation-refunds.svg
│       ├── dow-jones.svg
│       ├── stripe.svg
│       ├── plaid.svg
│       ├── tua.svg
│       ├── open-dental.svg
│       └── twilio.svg
└── docs/                   # Existing specs and plans
```

---

## Chunk 1: Asset Extraction and Project Scaffolding

### Task 1: Extract Assets from Current Webflow Site

**Files:**
- Create: `assets/logo.svg`, `assets/logo-white.svg`, `assets/favicon.ico`
- Create: `assets/headshots/nick.jpg`, `assets/headshots/chris.jpg`, `assets/headshots/tom.jpg`

- [ ] **Step 1: Create asset directories**

```bash
mkdir -p assets/headshots assets/logos
```

- [ ] **Step 2: Extract logos from lemurfinance.com**

Use browser dev tools or direct download to grab:
- The full-color logo from the header of https://www.lemurfinance.com
- The white logo from the footer of https://www.lemurfinance.com
- The favicon

Save as `assets/logo.svg` (or `.png` if SVG not available), `assets/logo-white.svg`, and `assets/favicon.ico`.

- [ ] **Step 3: Extract founder headshots from the About Us page**

Download the three founder photos from https://www.lemurfinance.com/about-us:
- Nick Kishfy → `assets/headshots/nick.jpg`
- Chris Shoemaker → `assets/headshots/chris.jpg`
- Tom Little → `assets/headshots/tom.jpg`

Resize to consistent dimensions (e.g., 400x400px) for use in circular crops.

- [ ] **Step 4: Commit assets**

```bash
git add assets/
git commit -m "chore: Extract brand assets from current Webflow site"
```

### Task 2: Source Partner and Client Logos

**Files:**
- Create: `assets/logos/*.svg` (10 logo files)

- [ ] **Step 1: Source and save partner/client logos**

For each of these companies, find an official SVG logo and save to `assets/logos/`:
- Fiserv → `fiserv.svg`
- Credit Karma → `credit-karma.svg`
- MoneyLion → `moneylion.svg`
- Innovation Refunds → `innovation-refunds.svg`
- Dow Jones → `dow-jones.svg`
- Stripe → `stripe.svg`
- Plaid → `plaid.svg`
- Tua → `tua.svg`
- Open Dental → `open-dental.svg`
- Twilio → `twilio.svg`

If SVGs are not available, use high-quality PNGs. All logos should be converted to a monochrome/muted treatment in CSS (using `filter: grayscale(1) opacity(0.6)` or similar), so exact color doesn't matter at this stage.

- [ ] **Step 2: Commit logos**

```bash
git add assets/logos/
git commit -m "chore: Add partner and client logos"
```

### Task 3: Project Scaffolding — CSS Foundation

**Files:**
- Create: `css/style.css`

- [ ] **Step 1: Create `css/style.css` with design tokens and base styles**

The CSS file should establish:

**Design tokens (as CSS custom properties):**
- Color palette: Start from existing Lemur brand colors on the current site. Dark background for hero/contact (`--color-bg-dark`), light background for content sections (`--color-bg-light`), accent color, text colors for both dark and light backgrounds.
- Typography: Use a clean sans-serif system font stack or a single Google Font (e.g., Inter, DM Sans, or similar). Define `--font-family`, `--font-size-*` scale (small, base, lg, xl, 2xl, 3xl), `--font-weight-*` (normal, medium, semibold, bold), and `--line-height-*`.
- Spacing: Define `--space-*` scale (xs through 3xl).
- Max content width: `--max-width: 1100px` or similar.

**Base reset and body styles:**
- Minimal reset (box-sizing, margin, padding)
- Body font, background, color
- Smooth scrolling

**Utility classes:**
- `.container` — centered, max-width, horizontal padding
- `.section` — vertical padding for page sections
- `.section--dark` — dark background variant

**Responsive foundation:**
- Mobile-first approach
- Breakpoints at 768px (tablet) and 1024px (desktop)

- [ ] **Step 2: Commit CSS foundation**

```bash
git add css/style.css
git commit -m "feat: Add CSS foundation with design tokens"
```

### Task 4: Project Scaffolding — HTML Shell

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create `index.html` with document shell**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lemur — Payments, Lending, and Collections Infrastructure</title>
    <meta name="description" content="Lemur builds embedded payments, lending, and collections infrastructure — tailored to how your business works.">
    <meta property="og:title" content="Lemur — Payments, Lending, and Collections Infrastructure">
    <meta property="og:description" content="Embedded payments, lending, and collections — engineered for your business.">
    <meta property="og:image" content="https://lemurfinance.com/assets/og-image.png">
    <meta property="og:url" content="https://lemurfinance.com/">
    <meta property="og:type" content="website">
    <link rel="icon" href="assets/favicon.ico">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Sections will be added in subsequent tasks -->
    <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create placeholder `js/main.js`**

```js
// Scroll reveal animations — implemented in Task 9
```

- [ ] **Step 3: Commit HTML shell**

```bash
git add index.html js/main.js
git commit -m "feat: Add HTML shell with meta tags"
```

---

## Chunk 2: Main Page — Section by Section

### Task 5: Hero Section

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`

- [ ] **Step 1: Add hero HTML to `index.html`**

Inside `<body>`, before the script tag, add:

```html
<section class="hero section section--dark">
    <div class="container">
        <div class="hero__logo">
            <img src="assets/logo-white.svg" alt="Lemur" class="hero__logo-img">
        </div>
        <h1 class="hero__headline">Payments, lending, and collections — engineered for your business.</h1>
        <p class="hero__subtext">We deploy embedded financial infrastructure — custom-built and fully managed — so you can focus on running your business.</p>
        <a href="mailto:hello@lemurfinance.com" class="hero__cta">Get in touch</a>
    </div>
</section>
```

- [ ] **Step 2: Add hero styles to `css/style.css`**

Style the hero section:
- Full viewport height (or close to it — `min-height: 90vh`)
- Logo positioned top-left (absolute or flex with `align-self: flex-start`), appropriately sized (max-width ~120px)
- Main content (headline, subtext, CTA) centered vertically and horizontally
- Headline: large, bold, white. Max-width constrained so it doesn't stretch too wide on large screens.
- Subtext: smaller, lighter opacity, max-width constrained
- CTA button: bordered/outlined style (not filled), white text, subtle hover transition
- Headline, subtext, and CTA are centered; logo is top-left

- [ ] **Step 3: Verify in browser and commit**

Open `index.html` in a browser. Verify: dark background, white text, readable headline, CTA visible.

```bash
git add index.html css/style.css
git commit -m "feat: Add hero section"
```

### Task 6: The Platform Section

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`

- [ ] **Step 1: Add platform section HTML to `index.html`**

After the hero section:

```html
<section class="platform section">
    <div class="container">
        <h2 class="section__heading">The Platform</h2>
        <div class="platform__grid">
            <div class="platform__item">
                <h3 class="platform__title">Consumer & Patient Financing</h3>
                <p class="platform__desc">Point-of-sale financing for high-ticket services. Customers get flexible payment options, merchants take no credit risk. Designed for dental, veterinary, and similar service businesses.</p>
            </div>
            <div class="platform__item">
                <h3 class="platform__title">In-House Lending Platform</h3>
                <p class="platform__desc">For merchants who want to carry the paper without the operational overhead. Automated ACH debits timed to customer payroll cycles, credit assessment that goes beyond FICO, and portfolio management — without building a lending operation.</p>
            </div>
            <div class="platform__item">
                <h3 class="platform__title">Automated Collections</h3>
                <p class="platform__desc">AI-driven outreach to past-due accounts. Negotiates payment plans autonomously and manages them end-to-end. Recovers receivables without manual intervention.</p>
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Add platform styles to `css/style.css`**

- Light background section
- `section__heading`: uppercase, small letter-spacing, muted color — like a label, not a shout
- `platform__grid`: three columns on desktop, single column on mobile. Use CSS grid.
- `platform__title`: medium weight, slightly larger than body
- `platform__desc`: body size, relaxed line height, muted text color
- Subtle dividers or spacing between items

- [ ] **Step 3: Verify in browser and commit**

Check both desktop (3 columns) and mobile (stacked) layouts.

```bash
git add index.html css/style.css
git commit -m "feat: Add platform section"
```

### Task 7: Built By Section

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`

- [ ] **Step 1: Add team section HTML to `index.html`**

After the platform section:

```html
<section class="team section section--dark">
    <div class="container">
        <h2 class="section__heading">Built By</h2>
        <div class="team__founders">
            <div class="team__member">
                <img src="assets/headshots/nick.jpg" alt="Nick Kishfy" class="team__photo">
                <div class="team__name">Nick Kishfy</div>
                <div class="team__title">Partner</div>
            </div>
            <div class="team__member">
                <img src="assets/headshots/chris.jpg" alt="Chris Shoemaker" class="team__photo">
                <div class="team__name">Chris Shoemaker</div>
                <div class="team__title">Partner</div>
            </div>
            <div class="team__member">
                <img src="assets/headshots/tom.jpg" alt="Tom Little" class="team__photo">
                <div class="team__name">Tom Little</div>
                <div class="team__title">Partner</div>
            </div>
        </div>
        <p class="team__bio">The founding team built fintech products together at MojoTech for some of the largest names in financial services. After years of building for others, they started Lemur to apply that experience to the businesses that need it most.</p>
        <div class="team__logos">
            <span class="team__logos-label">Previously built for</span>
            <div class="team__logos-row">
                <img src="assets/logos/fiserv.svg" alt="Fiserv" class="team__logo">
                <img src="assets/logos/credit-karma.svg" alt="Credit Karma" class="team__logo">
                <img src="assets/logos/moneylion.svg" alt="MoneyLion" class="team__logo">
                <img src="assets/logos/innovation-refunds.svg" alt="Innovation Refunds" class="team__logo">
                <img src="assets/logos/dow-jones.svg" alt="Dow Jones" class="team__logo">
            </div>
        </div>
    </div>
</section>
```

- [ ] **Step 2: Add team styles to `css/style.css`**

- Dark background section
- `team__founders`: three columns centered, gap between them
- `team__photo`: circular crop (`border-radius: 50%`), consistent size (~120px diameter), `object-fit: cover`
- `team__name`: white, medium weight (use `.section--dark` descendant selectors for all light-on-dark text)
- `team__title`: smaller, muted/lighter color
- `team__bio`: centered paragraph, max-width constrained (~700px), lighter text, relaxed line height
- `team__logos-label`: small, uppercase, letter-spaced, muted
- `team__logos-row`: flex row, centered, logos ~80px wide, `filter: brightness(0) invert(1)` for white treatment on dark background, `opacity: 0.5` for muted feel
- Mobile: founders stack or stay in a row (they fit at smaller sizes with reduced photo dimensions)

- [ ] **Step 3: Verify in browser and commit**

Check: photos render circular, logos appear monochrome white, bio text is readable, responsive layout works.

```bash
git add index.html css/style.css
git commit -m "feat: Add team section"
```

### Task 8: Integrations and Contact/Footer Sections

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`

- [ ] **Step 1: Add integrations section HTML**

After the team section:

```html
<section class="integrations section">
    <div class="container">
        <h2 class="section__heading">Integrated With</h2>
        <div class="integrations__row">
            <img src="assets/logos/stripe.svg" alt="Stripe" class="integrations__logo">
            <img src="assets/logos/plaid.svg" alt="Plaid" class="integrations__logo">
            <img src="assets/logos/tua.svg" alt="Tua" class="integrations__logo">
            <img src="assets/logos/open-dental.svg" alt="Open Dental" class="integrations__logo">
            <img src="assets/logos/twilio.svg" alt="Twilio" class="integrations__logo">
        </div>
    </div>
</section>
```

- [ ] **Step 2: Add contact section HTML**

```html
<section class="contact section section--dark">
    <div class="container">
        <h2 class="contact__heading">Let's talk.</h2>
        <a href="mailto:hello@lemurfinance.com" class="contact__email">hello@lemurfinance.com</a>
    </div>
</section>
```

- [ ] **Step 3: Add footer HTML**

```html
<footer class="footer">
    <div class="container">
        <div class="footer__content">
            <span class="footer__copy">&copy; 2026 Lemur Finance, LLC</span>
            <div class="footer__links">
                <a href="terms.html" class="footer__link">Terms & Conditions</a>
                <a href="privacy.html" class="footer__link">Privacy Policy</a>
            </div>
        </div>
    </div>
</footer>
```

- [ ] **Step 4: Add styles for integrations, contact, and footer**

**Integrations:**
- Light background, compact section
- Logo row: flex, centered, wrap on mobile
- Logos: ~100px wide, `filter: grayscale(1)`, `opacity: 0.5`, subtle hover to full opacity

**Contact:**
- Dark background, generous vertical padding
- Heading: large, white, centered
- Email: white, underline on hover, large enough to be a clear link target

**Footer:**
- Minimal, dark background (slightly different shade from contact section, or same)
- Flex row: copyright left, links right (stack on mobile)
- Small text, muted color

- [ ] **Step 5: Verify in browser and commit**

Check: all sections render, email link works (`mailto:`), footer links point to `terms.html` and `privacy.html`, responsive layout.

```bash
git add index.html css/style.css
git commit -m "feat: Add integrations, contact, and footer sections"
```

---

## Chunk 3: Legal Pages, Animations, and Polish

### Task 9: Legal Pages

**Files:**
- Create: `terms.html`
- Create: `privacy.html`

- [ ] **Step 1: Create `terms.html`**

Migrate the Terms & Conditions content from the current Webflow site. Use browser automation tools to fetch the page text from https://www.lemurfinance.com/company/terms-conditions (or use the content already captured during the site crawl in this session). Convert the plain text into properly structured HTML with heading tags, paragraphs, and ordered lists. Apply the following fixes:

1. Fix duplicate section numbering (two sections numbered "11") — renumber the second "11" (Dispute Resolution) to "12" and adjust subsequent numbers
2. Change "Lemur Finance, Inc." to "Lemur Finance, LLC" in Section 1
3. Replace `[Support Email Address]` in Section 5 with `support@lemurfinance.com`
4. Update copyright year to 2026 in footer

Page structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms & Conditions — Lemur Finance</title>
    <meta name="description" content="Terms and conditions for Lemur Finance services.">
    <link rel="icon" href="assets/favicon.ico">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header class="legal__header">
        <div class="container">
            <a href="index.html" class="legal__logo">
                <img src="assets/logo.svg" alt="Lemur">
            </a>
        </div>
    </header>
    <main class="legal section">
        <div class="container container--narrow">
            <h1>Terms & Conditions</h1>
            <p class="legal__effective">Effective Date: January 1, 2025</p>
            <!-- Migrated and corrected content here -->
        </div>
    </main>
    <footer class="footer">
        <!-- Same footer as index.html -->
    </footer>
</body>
</html>
```

- [ ] **Step 2: Create `privacy.html`**

Same structure as `terms.html` but with Privacy Policy content fetched from https://www.lemurfinance.com/company/privacy-policy (or from the crawl data). Convert to structured HTML. Update copyright year to 2026. Add appropriate `<title>` and `<meta name="description">` for this page.

- [ ] **Step 3: Add legal page styles to `css/style.css`**

- `legal__header`: simple top bar with logo linked back to index
- `container--narrow`: narrower max-width (~750px) for readable legal text
- Legal content typography: reasonable heading hierarchy (h2, h3 for subsections), body text, lists
- `.legal__effective`: muted, small text below h1

- [ ] **Step 4: Verify in browser and commit**

Check: both pages render, logo links back to home, text is readable, footer links work.

```bash
git add terms.html privacy.html css/style.css
git commit -m "feat: Add legal pages with corrected content"
```

### Task 10: Scroll Reveal Animations

**Files:**
- Modify: `js/main.js`
- Modify: `index.html` (add `reveal` classes)
- Modify: `css/style.css` (add animation styles)

- [ ] **Step 1: Add reveal animation CSS to `css/style.css`**

```css
.reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal--visible {
    opacity: 1;
    transform: translateY(0);
}
```

Add stagger support for grid items:
```css
.reveal-stagger > * {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal-stagger--visible > *:nth-child(1) { transition-delay: 0s; }
.reveal-stagger--visible > *:nth-child(2) { transition-delay: 0.1s; }
.reveal-stagger--visible > *:nth-child(3) { transition-delay: 0.2s; }

.reveal-stagger--visible > * {
    opacity: 1;
    transform: translateY(0);
}
```

Add reduced-motion and no-JS fallbacks:
```css
@media (prefers-reduced-motion: reduce) {
    .reveal,
    .reveal-stagger > * {
        opacity: 1;
        transform: none;
        transition: none;
    }
}
```

Also add a `<noscript>` block in the `<head>` of `index.html`:
```html
<noscript>
    <style>
        .reveal, .reveal-stagger > * { opacity: 1; transform: none; }
    </style>
</noscript>
```

- [ ] **Step 2: Add `reveal` classes to `index.html` elements**

Add `reveal` class to:
- `.platform__grid` → `reveal-stagger` (so the three items stagger in)
- `.team__founders` → `reveal-stagger`
- `.team__bio` → `reveal`
- `.team__logos` → `reveal`
- `.integrations__row` → `reveal`
- `.contact__heading` → `reveal`

Do NOT add reveal to the hero — it should be visible immediately on load.

- [ ] **Step 3: Implement `js/main.js`**

```js
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (el.classList.contains('reveal')) {
                    el.classList.add('reveal--visible');
                }
                if (el.classList.contains('reveal-stagger')) {
                    el.classList.add('reveal-stagger--visible');
                }
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        observer.observe(el);
    });
});
```

- [ ] **Step 4: Verify animations in browser and commit**

Scroll through the page. Each section should fade up as it enters the viewport. Platform items and founder photos should stagger. Hero should be visible immediately without animation.

```bash
git add js/main.js index.html css/style.css
git commit -m "feat: Add scroll reveal animations"
```

### Task 11: OG Image and Final Polish

**Files:**
- Create: `assets/og-image.png`
- Modify: `css/style.css` (any final responsive tweaks)

- [ ] **Step 1: Create OG image**

Create a simple branded OG image (1200x630px) with:
- Dark background matching the hero section color
- Lemur logo (white version) centered
- Tagline below: "Payments, lending, and collections — engineered for your business."

Method: Create a temporary HTML file (`og-template.html`) with the above layout at exactly 1200x630px. Use browser automation to open it and take a screenshot, saving to `assets/og-image.png`. Delete the template file after.

- [ ] **Step 2: Final responsive and polish pass**

Open the site on multiple viewport widths (320px, 768px, 1024px, 1440px) and fix any:
- Text overflow issues
- Logo sizing problems
- Grid layout breaking
- Spacing inconsistencies
- Touch target sizes on mobile (CTA, email link, footer links)

- [ ] **Step 3: Verify all pages and commit**

Final check: index.html, terms.html, privacy.html all render correctly. All links work. All images load. OG tags are correct.

```bash
git add .
git commit -m "feat: Add OG image and final responsive polish"
```
