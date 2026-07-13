# Case Study Modal / Bottom-Sheet Viewer — Design

**Date:** 2026-07-13
**Status:** Approved (pending spec review)

## Goal

Replace the two full-detail case study cards rendered inline on the homepage
(`app/page.tsx`, `#case-studies` section) with compact teaser cards that open
the full case study in an overlay. Desktop gets a centered modal; mobile
(99% of traffic) gets a bottom sheet. Case study content is enriched with
client context, a narrative story, tech stack logos, and results/scalability.

## Data Model

New file `lib/caseStudies.ts` exporting a typed `caseStudies` array. Each entry:

```ts
interface CaseStudy {
  id: string;              // slug, e.g. "facility-modernization"
  title: string;
  tagline: string;
  summary: string;         // one-liner shown on the teaser card
  client: string;          // who needed it and why (industry-level, no names
                           // unless the client approves being named)
  story: string[];         // 2–3 short paragraphs: the challenge & what the
                           // project solves (~30-second read)
  highlights: { icon: string; title: string; text: string }[]; // solution
  techStack: { name: string; svg: string }[];  // 4–6 items, self-hosted SVGs
  stats: { icon: string; value: string; label: string }[];
  scalabilityNote: string; // one-liner on how the solution scales
}
```

The two existing case studies (Enterprise Legacy Modernization & Biometric
Security; Executive Virtual Assistant) migrate into this array. New copy
(client, story, scalabilityNote) is drafted from existing page content and
edited by the owner.

## Teaser Cards (homepage)

- `#case-studies` section maps over `caseStudies`.
- Each card shows: title, tagline, one-line summary, "View case study →"
  affordance.
- Same glassy card styling as the rest of the site; keep `data-aos`
  animations.
- Entire card is tappable: rendered with button semantics and
  keyboard-focusable.

## Modal Component: `components/CaseStudyModal.tsx`

Follows the existing `ImageModal.tsx` pattern:

- `createPortal` to `document.body`.
- Scroll lock: save/restore `body.overflow`, plus Lenis `stop()`/`start()`.
- Escape key closes; backdrop click closes; X button closes.
- State lives in the page component: `openCaseStudy: string | null`.

### Content order (top to bottom)

1. **Header** — title + tagline.
2. **The Client** — who needed it and why. Short block, industry-level
   description.
3. **The Challenge & Story** — 2–3 short paragraphs from `story[]`.
4. **The Solution** — existing highlight-item layout (`.featured-highlights`).
5. **Tech Stack** — logo row: monochrome/white SVGs with the name underneath.
   Self-hosted SVGs (sourced from simple-icons/devicon), no CDN. Subtle
   hover/active tint only — no full-color logos (clashes with dark glassy
   theme). 4–6 logos per project.
6. **Results & Scalability** — existing stat boxes (`.featured-stats`) plus
   `scalabilityNote` one-liner.
7. **Mini CTA** — "Want something like this?" + button linking to
   `https://cal.com/levelexcloud/levelex-audit` (same as the site's other
   CTAs).

### Responsive behavior (one component, CSS-driven)

- **Desktop:** centered modal, max-width ~720px, dimmed + blurred backdrop,
  fade+scale-in animation, X button top-right. Content scrolls inside the
  modal if it overflows.
- **Mobile (≤768px):** bottom sheet covering ~92% of the viewport, rounded
  top corners, drag-handle bar at top, slide-up animation. Closes via
  backdrop tap, X button, or swipe-down on the drag handle (plain touch
  events — no gesture library). Content scrolls inside the sheet.

### Edge cases

- Scroll position preserved on close (overflow restore, as in `ImageModal`).
- Rapid open/close safe (single piece of state in the page component).
- Animations respect `prefers-reduced-motion`.

## Styling

- New CSS in `app/globals.css` following existing naming conventions
  (`.case-modal-*` or similar), reusing `.featured-*` styles for highlights
  and stats inside the modal.
- Tech stack SVGs are inlined (SVG markup stored with the data, using
  `fill="currentColor"`) so CSS controls the monochrome tint — a static
  `<img>` can't be recolored. No external requests.

## Testing / Verification

- Chrome DevTools MCP at mobile viewport: open sheet, scroll inside it,
  swipe-down close, backdrop close, X close.
- Desktop viewport: modal open/close, Escape, backdrop, content scroll.
- Keyboard: teaser cards focusable, Enter opens, Escape closes.
- `npm run build` passes.

## Out of Scope

- Dedicated case-study routes / SEO pages (Next.js intercepting routes) —
  can be added later if the number of case studies grows.
- Gesture libraries, carousel behavior, more than the two existing case
  studies.
