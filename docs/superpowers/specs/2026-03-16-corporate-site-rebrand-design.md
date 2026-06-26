# Lemur Finance Corporate Site Rebrand

## Context

Lemur Finance is pivoting from a product company targeting small businesses (with named products LemurPayments, LemurCollect, LemurLoans) to an embedded finance / fintech-as-a-service partner. The company deploys customized financial infrastructure for clients, monetized through revenue-share or transaction processing fee arrangements.

The current corporate site (lemurfinance.com) is built on Webflow, positions Lemur as an SMB-friendly product company with a cheerful tone, and no longer reflects how the business operates or who it serves.

### Goals

- Reposition Lemur as a credible technology partner for mid-market businesses
- Shift tone from friendly/whimsical to professional/confident
- Present capabilities as solution areas rather than named products
- Establish founder credibility through fintech background
- Replace the Webflow site with a clean static site

### Audience

Primary visitors arrive via referral. Someone told them about Lemur; they're coming to validate credibility before taking a meeting. The site's job is not to convert cold traffic or explain everything — it's to make the visitor think "these people are legit, I'll take that meeting."

### Brand

- Brand name on the page: **Lemur** (not "Lemur Finance")
- Domain: lemurfinance.com
- Legal entity: Lemur Finance, LLC
- Individual product pages (e.g., lemurpayments.com) continue to exist separately for dedicated landing pages and self-signup flows

## Site Structure

Single-page static site with two additional legal pages. No navigation bar (single page doesn't need one). No blog.

### Section 1: Hero

**Headline:** "Payments, lending, and collections — engineered for your business."

**Subtext:** One sentence communicating the model — custom deployments of embedded financial infrastructure, tailored to how the client's business works.

**CTA:** Single "Get in touch" button linking to email (hello@lemurfinance.com).

**Visual:** Dark background, clean typography, Lemur wordmark top-left. Minimal and confident.

### Section 2: The Platform

Section heading: **"The Platform"**

Three solution areas, each with a heading and 2-3 sentences:

**Consumer & Patient Financing**
Point-of-sale financing for high-ticket services. Customers get flexible payment options, merchants take no credit risk. Designed for dental, veterinary, and similar service businesses.

**In-House Lending Platform**
For merchants who want to carry the paper without the operational overhead. Automated ACH debits timed to customer payroll cycles, credit assessment that goes beyond FICO, and portfolio management — without building a lending operation.

**Automated Collections**
AI-driven outreach to past-due accounts. Can negotiate payment plans autonomously and manage those plans end-to-end. Recovers receivables without manual intervention.

### Section 3: Built By

Three founder headshots with names and title "Partner":
- Nick Kishfy
- Chris Shoemaker
- Tom Little

**Shared team bio** (2-3 sentences): The founding team built fintech products together at MojoTech for major financial institutions before starting Lemur. Emphasize depth of experience and the transition from building for others to building their own platform.

**"Previously built for" logo row:**
- Fiserv
- Credit Karma
- MoneyLion
- Innovation Refunds
- Dow Jones

### Section 4: Integrated With

Clean logo strip showing technology and financing partners:
- Stripe
- Plaid
- Tua (financing partner)
- Open Dental
- Twilio

### Section 5: Contact

**"Let's talk."**

hello@lemurfinance.com

No calendar booking widget. No physical address. Just the email.

### Section 6: Footer

- © 2026 Lemur Finance, LLC
- Links to Terms & Conditions and Privacy Policy

## Legal Pages

Separate pages for Terms & Conditions and Privacy Policy. Fixes to apply:

- Fix duplicate section numbering in T&C (two sections numbered "11")
- Fix entity name inconsistency: "Lemur Finance, Inc." → "Lemur Finance, LLC" in T&C Section 1
- Replace `[Support Email Address]` placeholder in T&C Section 5 with support@lemurfinance.com
- Update copyright year to 2026
- Privacy Policy and T&C substance otherwise unchanged

**Source content:** Legal page text is migrated from the existing Webflow site at lemurfinance.com/company/terms-conditions and lemurfinance.com/company/privacy-policy.

## Visual Direction

- Dark, clean, professional
- No illustrations, emojis, hearts, or playful elements
- Restrained typography with strong hierarchy
- Professional but not sterile — subtle animations (fade-ins, reveals on scroll) are encouraged where they make the site feel premium
- Single page — no scrolljacking
- Mobile responsive

### Design Tokens

Color palette, typefaces, font scale, and spacing will be defined during implementation. The existing Lemur brand colors (from the current site) are the starting point. The visual design should stand on its own — it is not modeled after any other site.

### Assets — Sourced from Current Site

The current Webflow site (lemurfinance.com) is the source for all existing brand assets:

- **Lemur logo:** Two versions on the current site — full-color (header) and white (footer). Extract both.
- **Favicon:** Extract from the current site.
- **Founder headshots:** Three photos (Nick, Chris, Tom) are on the current About Us page. Resize and crop consistently (circular or uniform aspect ratio).
- **Partner/client logos:** Fiserv, Credit Karma, MoneyLion, Innovation Refunds, Dow Jones, Stripe, Plaid, Tua, Open Dental, Twilio — normalized to a consistent size and monochrome/muted treatment. Source from the web as needed.
- **OG image:** Create a branded card using the Lemur logo for link previews in Slack, LinkedIn, iMessage.

### Meta / SEO

- Page title: "Lemur — Payments, Lending, and Collections Infrastructure"
- Meta description: concise summary of the value proposition
- OG image: branded card for link previews in Slack, LinkedIn, iMessage
- Favicon: Lemur mark

## What's Removed

- Blog (both index and posts)
- Named sub-products (LemurPayments, LemurCollect, LemurLoans branding)
- Customer testimonials
- Statistics/metrics section
- "We love your hustle" / SMB cheerleader copy
- Multiple CTAs and calendar booking widgets
- Navigation bar
- Webflow dependency

## Technical Approach

Static site — clean HTML, CSS, and JS. No framework, no build step, no CMS.

### Deployment

Hosting target and DNS cutover plan TBD. The current site is on Webflow (lemurfinance.com). Deployment details will be determined during implementation planning — options include GitHub Pages, Netlify, Vercel, or S3+CloudFront.
