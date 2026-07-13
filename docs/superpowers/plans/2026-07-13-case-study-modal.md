# Case Study Modal / Bottom-Sheet Viewer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the two inline full-detail case study cards on the homepage with four compact teaser cards that open a rich case study overlay — centered modal on desktop, bottom sheet on mobile.

**Architecture:** Case study content moves into a typed data module (`lib/caseStudies.ts`). The homepage maps it into teaser cards and holds a single `openCaseStudy: string | null` state. One new portal component (`CaseStudyModal.tsx`, modeled on the existing `ImageModal.tsx`) renders the full case study; CSS media queries switch it between centered-modal (desktop) and bottom-sheet (mobile) presentation.

**Tech Stack:** Next.js (App Router) + React + TypeScript, plain CSS in `app/globals.css`, boxicons (already loaded) for UI icons, `simple-icons` npm package for brand SVG paths (bundled, no CDN).

**Spec:** `docs/superpowers/specs/2026-07-13-case-study-modal-design.md`

## Global Constraints

- Repo root for all commands: `c:\Users\alyom\Desktop\Folders\LevelexWeb\levelex-frontend`
- This repo has **no test runner** (marketing site). Verification = `npm run lint`, `npm run build`, and Chrome DevTools checks in Task 4. Do not add a test framework.
- Only **Grand Tourer** may be named or show a logo. The club, hospital, and executive clients stay anonymous — never add identifying details to their copy.
- Tech-stack brand icons render **monochrome via `fill="currentColor"`** — never full-color logos, never CDN-hosted images.
- All new CSS goes in `app/globals.css`, using the existing conventions (CSS custom properties `--accent-cyan`, `--accent-purple`, `--text-white`, `--text-gray`, `--gradient`; mobile breakpoint `@media (max-width: 768px)`).
- Mobile is 99% of traffic — the bottom-sheet path is the primary experience, not an afterthought.
- Animations must respect `prefers-reduced-motion`.
- The existing `.featured-*` CSS classes stay in `globals.css` (the modal reuses `.featured-highlights`, `.highlight-item`, `.featured-stats`, `.stat-box`, `.stat-value`, `.stat-label`, `.featured-tagline`).
- Commit after every task with the trailer `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: Data module + assets

**Files:**
- Create: `lib/caseStudies.ts`
- Create: `public/case-studies/gt-logo.png` (copied from the Grand Tourer project)
- Modify: `package.json` (add `simple-icons` dependency via npm)

**Interfaces:**
- Consumes: `simple-icons` package (named exports like `siPostgresql`, each with a `.path` string of a 24×24 viewBox SVG path).
- Produces: `export interface CaseStudy`, `export interface TechItem`, `export const caseStudies: CaseStudy[]` (exactly 4 entries, ids: `"club-modernization"`, `"grand-tourer"`, `"hospital-platform"`, `"executive-assistant"`). Tasks 2 and 3 import `CaseStudy` and `caseStudies` from `@/lib/caseStudies`.

- [ ] **Step 1: Install simple-icons and copy the logo**

```powershell
Set-Location "c:\Users\alyom\Desktop\Folders\LevelexWeb\levelex-frontend"
npm install simple-icons
New-Item -ItemType Directory -Force public\case-studies
Copy-Item "C:\Users\alyom\Desktop\Grand Tourer - Copy - Copy (3) - Copy - Copy\public\gt_logo.png" "public\case-studies\gt-logo.png"
```

Expected: `simple-icons` appears in `package.json` dependencies; `public/case-studies/gt-logo.png` exists.

- [ ] **Step 2: Create `lib/caseStudies.ts`**

Create the file with exactly this content:

```ts
import {
  siNextdotjs,
  siReact,
  siTypescript,
  siPostgresql,
  siPrisma,
  siSupabase,
  siPython,
  siWhatsapp,
  siOpencv,
  siFastapi,
  siGmail,
  siGooglecalendar,
  siOpenai,
} from "simple-icons";

export interface TechItem {
  name: string;
  /** SVG path data for a 24x24 viewBox, rendered with fill="currentColor". */
  iconPath: string;
}

export interface Highlight {
  icon: string; // boxicons class, e.g. "bx bx-target-lock"
  title: string;
  text: string;
}

export interface Stat {
  icon: string; // boxicons class
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  client: string;
  clientLogo?: { src: string; alt: string };
  story: string[];
  highlights: Highlight[];
  techStack: TechItem[];
  stats: Stat[];
  scalabilityNote: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "club-modernization",
    title: "Enterprise Legacy Modernization & Biometric Security",
    tagline: "Zero-Downtime Migration & Local Computer Vision",
    summary:
      "A members' club running on paper and legacy SQL became a fully automated, biometrically secured operation.",
    client:
      "A high-traffic members' club managing thousands of active memberships. Front-desk staff were drowning in manual check-ins, paper installment tracking, and member questions that never stopped.",
    story: [
      "Every member entry meant a manual lookup. Every installment meant a phone call. The club's legacy SQL database couldn't talk to any modern tool, and the data lived on aging infrastructure nobody wanted to touch.",
      "We migrated the entire operation to PostgreSQL with zero downtime, then deployed a local, fully offline face-match system at the gates — a member walks up, the camera recognizes them, the gate opens. No cloud, no biometric data ever leaving the building.",
      "Around that core we built the automation layer: on-gate forms that qualify and route leads to sales agents, and a WhatsApp assistant that answers member questions and proactively sends renewal and installment reminders before they're due.",
    ],
    highlights: [
      {
        icon: "bx bx-scan",
        title: "Offline Face Match",
        text: "Local computer vision at the gates matches members in real time — no cloud APIs, no biometric data leaving the premises.",
      },
      {
        icon: "bx bx-target-lock",
        title: "Automated Lead Gen",
        text: "On-gate forms automatically qualify and generate leads for sales agents, streamlining the funnel.",
      },
      {
        icon: "bx bx-bot",
        title: "WhatsApp RAG Bot",
        text: "A custom AI agent answers member inquiries and handles FAQs around the clock, straight from WhatsApp.",
      },
      {
        icon: "bx bx-bell",
        title: "Proactive Reminders",
        text: "Automated WhatsApp notifications remind members of renewals and installment due dates before they're due — cutting late payments and front-desk calls.",
      },
    ],
    techStack: [
      { name: "Python", iconPath: siPython.path },
      { name: "PostgreSQL", iconPath: siPostgresql.path },
      { name: "OpenCV", iconPath: siOpencv.path },
      { name: "FastAPI", iconPath: siFastapi.path },
      { name: "WhatsApp", iconPath: siWhatsapp.path },
    ],
    stats: [
      { icon: "bx bx-data", value: "100%", label: "Data Ownership" },
      { icon: "bx bx-time-five", value: "40%", label: "Reduction in Manual Admin" },
      { icon: "bx bx-server", value: "99.9%", label: "Uptime" },
    ],
    scalabilityNote:
      "The same pipeline now handles thousands of daily entries without added staff — a new gate just means another camera.",
  },
  {
    id: "grand-tourer",
    title: "Grand Tourer: Garage Operations Platform",
    tagline: "Bilingual Job Cards, Estimates & Insurance Reporting",
    summary:
      "An Abu Dhabi auto workshop replaced its paper trail with a bilingual platform covering job cards, estimates, and insurer reporting.",
    client:
      "Grand Tourer, an auto repair workshop in Abu Dhabi, UAE. Job cards lived on paper, repair estimates were rebuilt by hand for every insurer, and end-of-day financials took hours to reconcile.",
    clientLogo: { src: "/case-studies/gt-logo.png", alt: "Grand Tourer (GT Workshop) logo" },
    story: [
      "An auto body shop runs on paperwork: job cards, damage reports, repair estimates, insurance approvals, LPOs. At Grand Tourer, all of it was manual — slow to produce, easy to lose, and impossible to report on.",
      "We built a complete operations platform around their real workflow: digital job cards with damage mapping, estimates with line items and document uploads, inventory, and daily financial reports broken down per insurance company.",
      "The system reads for itself, too — when staff upload a vehicle registration, on-device OCR automatically extracts the owner's details. And because the UAE works in two languages, the entire UI is bilingual English/Arabic with full RTL support.",
    ],
    highlights: [
      {
        icon: "bx bx-clipboard",
        title: "Digital Job Cards",
        text: "Every vehicle tracked from arrival to delivery with statuses, damage maps, and flagged LPOs — nothing falls through the cracks.",
      },
      {
        icon: "bx bx-scan",
        title: "Smart Document OCR",
        text: "Uploaded registration cards are read automatically — owner details extracted on-device in seconds, no retyping.",
      },
      {
        icon: "bx bx-line-chart",
        title: "Insurance-Ready Reporting",
        text: "Daily financial reports with per-insurer breakdowns generated in one click instead of hours of spreadsheet work.",
      },
      {
        icon: "bx bx-globe",
        title: "Bilingual EN/AR",
        text: "Full right-to-left Arabic interface alongside English — staff work in the language they think in.",
      },
    ],
    techStack: [
      { name: "Next.js", iconPath: siNextdotjs.path },
      { name: "React", iconPath: siReact.path },
      { name: "TypeScript", iconPath: siTypescript.path },
      { name: "PostgreSQL", iconPath: siPostgresql.path },
      { name: "Prisma", iconPath: siPrisma.path },
      { name: "Supabase", iconPath: siSupabase.path },
    ],
    stats: [
      { icon: "bx bx-file", value: "100%", label: "Paperless Job Cards" },
      { icon: "bx bx-time-five", value: "1-Click", label: "Daily Insurer Reports" },
      { icon: "bx bx-scan", value: "0", label: "Manual Data Re-Entry" },
    ],
    scalabilityNote:
      "Built to onboard new estimators, insurers, and branches without code changes — roles, statuses, and report breakdowns are all data-driven.",
  },
  {
    id: "hospital-platform",
    title: "Hospital Digital Platform",
    tagline: "Patient Portal, Doctor Dashboards & Lab Workflow",
    summary:
      "A private hospital moved its whole patient journey — booking, results, follow-ups — from phone queues to one platform.",
    client:
      "A private hospital whose patient journey ran on phone calls and front-desk queues — booking by phone, collecting lab results in person, and paper moving between departments.",
    story: [
      "Patients called to book, called again to ask about lab results, and queued to collect them in person. Doctors had no unified view of their day, and the lab shuttled paper between departments.",
      "We delivered a complete hospital web platform: patients register, book appointments by department and doctor, and receive lab results digitally. Doctors get a dashboard of their appointments; lab staff upload results directly to the patient's record.",
      "Admin sees the whole operation — departments, doctors, appointments, and content — from one panel, with role-based access keeping every user inside their lane.",
    ],
    highlights: [
      {
        icon: "bx bx-user",
        title: "Patient Portal",
        text: "Registration, department browsing, doctor profiles and appointment booking — the full journey without a phone call.",
      },
      {
        icon: "bx bx-calendar-event",
        title: "Doctor Dashboards",
        text: "Each doctor manages their appointment schedule from a dedicated dashboard built around their day.",
      },
      {
        icon: "bx bx-plus-medical",
        title: "Digital Lab Workflow",
        text: "Lab staff upload results straight to patient records — no paper handoffs, no collection queues.",
      },
      {
        icon: "bx bx-lock-alt",
        title: "Role-Based Access",
        text: "Patients, doctors, lab, and admin each get exactly the access they need — nothing more.",
      },
    ],
    techStack: [
      { name: "Next.js", iconPath: siNextdotjs.path },
      { name: "React", iconPath: siReact.path },
      { name: "TypeScript", iconPath: siTypescript.path },
      { name: "Prisma", iconPath: siPrisma.path },
      { name: "Supabase", iconPath: siSupabase.path },
      { name: "PostgreSQL", iconPath: siPostgresql.path },
    ],
    stats: [
      { icon: "bx bx-calendar-check", value: "24/7", label: "Online Booking" },
      { icon: "bx bx-plus-medical", value: "100%", label: "Digital Lab Results" },
      { icon: "bx bx-lock-alt", value: "4", label: "Roles, One Platform" },
    ],
    scalabilityNote:
      "New departments, doctors, and services are added from the admin panel — the platform grows with the hospital, not against it.",
  },
  {
    id: "executive-assistant",
    title: "Executive Virtual Assistant",
    tagline: "Intelligent Email Sorting & Meeting Summarization",
    summary:
      "A private AI assistant that triages an executive's inbox and turns back-to-back meetings into decisions and action items.",
    client:
      "An enterprise executive whose inbox and meeting load had outgrown any human assistant — hundreds of emails and back-to-back calls every day.",
    story: [
      "Email triage was eating the first two hours of every day, and decisions made in meetings were getting lost by the next one.",
      "We deployed a private AI assistant that sorts incoming mail into custom labels, drafts context-aware replies, and records and summarizes every meeting into key decisions and action items.",
      "It runs privacy-first: the executive's data stays theirs, and the assistant works around the clock without ever needing a sick day.",
    ],
    highlights: [
      {
        icon: "bx bx-envelope",
        title: "Smart Email Management",
        text: "Automatically sorts incoming emails into custom labels and drafts context-aware replies, saving hours of daily triage.",
      },
      {
        icon: "bx bx-calendar-event",
        title: "Meeting Summarizer",
        text: "Records and summarizes back-to-back meetings, extracting key action items and decisions so nothing slips through the cracks.",
      },
    ],
    techStack: [
      { name: "Python", iconPath: siPython.path },
      { name: "Gmail", iconPath: siGmail.path },
      { name: "Google Calendar", iconPath: siGooglecalendar.path },
      { name: "Whisper", iconPath: siOpenai.path },
    ],
    stats: [
      { icon: "bx bx-time", value: "2h+", label: "Saved Daily" },
      { icon: "bx bx-check-shield", value: "100%", label: "Privacy First" },
      { icon: "bx bx-brain", value: "24/7", label: "Availability" },
    ],
    scalabilityNote:
      "The same assistant pattern rolls out to additional executives in days — each with their own labels, calendar, and voice.",
  },
];
```

- [ ] **Step 3: Verify it compiles and lints**

```powershell
npx tsc --noEmit
npm run lint
```

Expected: both exit 0. If a `si*` import name errors, check the installed package's exports with `Get-Content node_modules\simple-icons\index.d.ts | Select-String -Pattern "siGooglecalendar|siNextdotjs"` and correct the import casing to match.

- [ ] **Step 4: Commit**

```powershell
git add lib/caseStudies.ts public/case-studies/gt-logo.png package.json package-lock.json
git commit -m "feat: add case study data module with four case studies"
```

---

### Task 2: CaseStudyModal component + modal CSS

**Files:**
- Create: `components/CaseStudyModal.tsx`
- Modify: `app/globals.css` (append a new `/* Case Study Modal */` block at the end of the file)

**Interfaces:**
- Consumes: `CaseStudy` type from `@/lib/caseStudies` (Task 1).
- Produces: `export default function CaseStudyModal({ caseStudy, onClose }: { caseStudy: CaseStudy | null; onClose: () => void })` — renders nothing when `caseStudy` is null. Task 3 imports it as `@/components/CaseStudyModal`.

- [ ] **Step 1: Create `components/CaseStudyModal.tsx`**

Follows the `ImageModal.tsx` pattern (portal, body scroll lock, Lenis stop/start, Escape). Exactly this content:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { CaseStudy } from "@/lib/caseStudies";

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyModal({
  caseStudy,
  onClose,
}: CaseStudyModalProps) {
  const [mounted, setMounted] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!caseStudy) return;

    // Lock background scroll (covers both native and Lenis smooth-scroll).
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    lenis?.stop();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [caseStudy, onClose]);

  if (!caseStudy || !mounted) return null;

  // Swipe-down-to-close on the drag handle (mobile bottom sheet).
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartY.current === null || !sheetRef.current) return;
    const delta = e.touches[0].clientY - dragStartY.current;
    if (delta > 0) {
      sheetRef.current.style.transform = `translateY(${delta}px)`;
      sheetRef.current.style.transition = "none";
    }
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartY.current === null || !sheetRef.current) return;
    const delta = e.changedTouches[0].clientY - dragStartY.current;
    dragStartY.current = null;
    sheetRef.current.style.transform = "";
    sheetRef.current.style.transition = "";
    if (delta > 100) onClose();
  };

  return createPortal(
    <div className="case-modal-overlay" onClick={onClose}>
      <div
        ref={sheetRef}
        className="case-modal"
        role="dialog"
        aria-modal="true"
        aria-label={caseStudy.title}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div
          className="case-modal-handle"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <span className="case-modal-handle-bar"></span>
        </div>
        <button className="case-modal-close" onClick={onClose} aria-label="Close">
          <i className="bx bx-x"></i>
        </button>

        <div className="case-modal-scroll">
          <div className="featured-header">
            <h3>{caseStudy.title}</h3>
            <span className="featured-tagline">{caseStudy.tagline}</span>
          </div>

          <div className="case-modal-section">
            <span className="case-modal-label">The Client</span>
            <div className="case-modal-client">
              {caseStudy.clientLogo && (
                <span className="case-modal-client-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={caseStudy.clientLogo.src}
                    alt={caseStudy.clientLogo.alt}
                    loading="lazy"
                  />
                </span>
              )}
              <p>{caseStudy.client}</p>
            </div>
          </div>

          <div className="case-modal-section">
            <span className="case-modal-label">The Challenge &amp; Story</span>
            {caseStudy.story.map((paragraph, i) => (
              <p key={i} className="case-modal-story-p">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="case-modal-section">
            <span className="case-modal-label">The Solution</span>
            <div className="featured-highlights">
              {caseStudy.highlights.map((h) => (
                <div className="highlight-item" key={h.title}>
                  <i className={`${h.icon} highlight-icon`}></i>
                  <div>
                    <h4>{h.title}</h4>
                    <p>{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="case-modal-section">
            <span className="case-modal-label">Tech Stack</span>
            <div className="case-modal-tech">
              {caseStudy.techStack.map((t) => (
                <div className="case-modal-tech-item" key={t.name}>
                  <svg
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={t.iconPath} />
                  </svg>
                  <span>{t.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="case-modal-section">
            <span className="case-modal-label">Results &amp; Scalability</span>
            <div className="featured-stats">
              {caseStudy.stats.map((s) => (
                <div className="stat-box" key={s.label}>
                  <i className={s.icon}></i>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
            <p className="case-modal-scalability">
              <i className="bx bx-trending-up"></i> {caseStudy.scalabilityNote}
            </p>
          </div>

          <div className="case-modal-cta">
            <p>Want something like this for your business?</p>
            <Link
              href="https://cal.com/levelexcloud/levelex-audit"
              className="btn btn-gradient"
              target="_blank"
            >
              <span>
                Schedule Discovery Call <i className="bx bx-right-arrow-alt"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
```

- [ ] **Step 2: Append modal CSS to `app/globals.css`**

Append at the end of the file:

```css
/* ============================================ */
/* Case Study Modal / Bottom Sheet              */
/* ============================================ */

.case-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
  animation: modalOverlayFadeIn 0.25s ease forwards;
}

.case-modal {
  position: relative;
  width: 100%;
  max-width: 720px;
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    145deg,
    rgba(26, 28, 58, 0.98),
    rgba(13, 15, 43, 0.99)
  );
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 20px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
  animation: modalContentIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.case-modal-handle {
  display: none; /* mobile only */
}

.case-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.6rem;
}

.case-modal-close:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: rotate(90deg);
}

.case-modal-scroll {
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.case-modal-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.case-modal-label {
  font-family: monospace;
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent-cyan);
}

.case-modal-client {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.case-modal-client-logo {
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.92);
  border-radius: 12px;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
}

.case-modal-client-logo img {
  height: 42px;
  width: auto;
  max-width: 140px;
  object-fit: contain;
}

.case-modal-client p,
.case-modal-story-p {
  color: var(--text-gray);
  font-size: 0.95rem;
  line-height: 1.65;
}

.case-modal-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.case-modal-tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  min-width: 84px;
  padding: 0.85rem 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.75);
  transition: color 0.3s ease, border-color 0.3s ease;
}

.case-modal-tech-item:hover {
  color: var(--accent-cyan);
  border-color: var(--accent-cyan);
}

.case-modal-tech-item span {
  font-size: 0.72rem;
  color: var(--text-gray);
  letter-spacing: 0.5px;
  text-align: center;
}

.case-modal-scalability {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--text-gray);
  line-height: 1.6;
}

.case-modal-scalability i {
  color: var(--accent-cyan);
  margin-right: 0.35rem;
  vertical-align: middle;
}

.case-modal-cta {
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.case-modal-cta p {
  color: var(--text-white);
  font-size: 1.05rem;
  font-weight: 600;
}

/* Bottom sheet on mobile */
@media (max-width: 768px) {
  .case-modal-overlay {
    padding: 0;
    align-items: flex-end;
  }

  .case-modal {
    max-width: 100%;
    height: 92vh;
    max-height: 92vh;
    border-radius: 20px 20px 0 0;
    border-left: none;
    border-right: none;
    border-bottom: none;
    animation: sheetSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .case-modal-handle {
    display: flex;
    justify-content: center;
    padding: 0.75rem 0 0.25rem;
    touch-action: none;
    cursor: grab;
  }

  .case-modal-handle-bar {
    width: 44px;
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.3);
  }

  .case-modal-close {
    top: 0.75rem;
    right: 0.75rem;
    width: 38px;
    height: 38px;
    font-size: 1.4rem;
  }

  .case-modal-scroll {
    padding: 1rem 1.25rem 2.5rem;
    gap: 1.5rem;
  }

  .case-modal .featured-highlights {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }

  .case-modal .featured-stats {
    gap: 0.75rem;
  }

  .case-modal-client {
    flex-direction: column;
    align-items: flex-start;
  }
}

@keyframes sheetSlideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .case-modal-overlay,
  .case-modal {
    animation: none;
  }
}
```

- [ ] **Step 3: Verify it compiles and lints**

```powershell
npx tsc --noEmit
npm run lint
```

Expected: both exit 0. (The component isn't rendered anywhere yet — that's Task 3.)

- [ ] **Step 4: Commit**

```powershell
git add components/CaseStudyModal.tsx app/globals.css
git commit -m "feat: add CaseStudyModal component with desktop modal and mobile bottom sheet"
```

---

### Task 3: Homepage teaser cards wired to the modal

**Files:**
- Modify: `app/page.tsx` (imports at top; state in `Home()`; replace the `#case-studies` section, currently lines 289–429)
- Modify: `app/globals.css` (append teaser-card CSS)

**Interfaces:**
- Consumes: `caseStudies`, `CaseStudy` from `@/lib/caseStudies` (Task 1); `CaseStudyModal` from `@/components/CaseStudyModal` (Task 2).
- Produces: the final user-facing feature; nothing downstream.

- [ ] **Step 1: Update imports and state in `app/page.tsx`**

At the top of the file, change:

```tsx
import { useEffect } from "react";
```

to:

```tsx
import { useEffect, useState } from "react";
```

and below the existing `FeatureCarousel` import add:

```tsx
import CaseStudyModal from "@/components/CaseStudyModal";
import { caseStudies } from "@/lib/caseStudies";
```

Inside `Home()`, immediately before the `useEffect(() => {` line, add:

```tsx
const [openCaseStudy, setOpenCaseStudy] = useState<string | null>(null);
```

- [ ] **Step 2: Replace the `#case-studies` section**

Replace the entire existing `<section id="case-studies" ...>...</section>` block (the one containing the two `featured-project-card` divs, currently lines 289–429) with:

```tsx
      <section id="case-studies" className="case-studies">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">
            Case <span className="gradient-text">Studies</span>
          </h2>
          <div className="case-teaser-grid">
            {caseStudies.map((cs, i) => (
              <button
                key={cs.id}
                type="button"
                className="card case-teaser-card"
                data-aos="fade-up"
                data-aos-delay={100 + i * 100}
                onClick={() => setOpenCaseStudy(cs.id)}
              >
                <h3>{cs.title}</h3>
                <span className="featured-tagline">{cs.tagline}</span>
                <p>{cs.summary}</p>
                <span className="case-teaser-link">
                  View case study <i className="bx bx-right-arrow-alt"></i>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
```

Then, just before the closing `</main>` tag at the bottom of the component, add:

```tsx
      <CaseStudyModal
        caseStudy={caseStudies.find((cs) => cs.id === openCaseStudy) ?? null}
        onClose={() => setOpenCaseStudy(null)}
      />
```

- [ ] **Step 3: Append teaser CSS to `app/globals.css`**

```css
/* Case Study Teaser Cards */
.case-teaser-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
}

.case-teaser-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  text-align: left;
  padding: 1.75rem;
  font: inherit;
  color: inherit;
  cursor: pointer;
  border: 1px solid rgba(0, 255, 255, 0.1);
  background: linear-gradient(
    145deg,
    rgba(26, 28, 58, 0.9),
    rgba(13, 15, 43, 0.95)
  );
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.case-teaser-card:hover,
.case-teaser-card:focus-visible {
  transform: translateY(-4px);
  border-color: var(--accent-cyan);
  outline: none;
}

.case-teaser-card h3 {
  font-size: 1.25rem;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.case-teaser-card p {
  font-size: 0.9rem;
  color: var(--text-gray);
  line-height: 1.55;
}

.case-teaser-link {
  margin-top: auto;
  padding-top: 0.5rem;
  color: var(--accent-cyan);
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

@media (max-width: 768px) {
  .case-teaser-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .case-teaser-card {
    padding: 1.4rem;
  }
}
```

- [ ] **Step 4: Verify compile, lint, and production build**

```powershell
npx tsc --noEmit
npm run lint
npm run build
```

Expected: all exit 0; build outputs the static pages without errors.

- [ ] **Step 5: Commit**

```powershell
git add app/page.tsx app/globals.css
git commit -m "feat: replace inline case studies with teaser cards opening CaseStudyModal"
```

---

### Task 4: End-to-end verification in Chrome DevTools

**Files:**
- No new files. Fix any defects found (commit fixes with `fix:` messages).

**Interfaces:**
- Consumes: the running dev server and everything from Tasks 1–3.
- Produces: a verified feature; a written pass/fail checklist in the task report.

- [ ] **Step 1: Start the dev server**

```powershell
Set-Location "c:\Users\alyom\Desktop\Folders\LevelexWeb\levelex-frontend"
npm run dev
```

Run in background; note the port (default 3000).

- [ ] **Step 2: Desktop checks (viewport 1440×900) via Chrome DevTools MCP**

Navigate to `http://localhost:3000`, resize to 1440×900, then verify each item:

1. `#case-studies` section shows a 2×2 grid of four teaser cards (Club, Grand Tourer, Hospital, Executive VA).
2. Clicking the Grand Tourer teaser opens a centered modal showing, in order: header, THE CLIENT (with the GT logo on a light chip, legible), THE CHALLENGE & STORY (3 paragraphs), THE SOLUTION (4 highlights), TECH STACK (6 monochrome icons with names), RESULTS & SCALABILITY (3 stat boxes + scalability line), and the Schedule Discovery Call CTA.
3. Background page does not scroll while the modal is open; modal content scrolls internally.
4. Escape key closes it. Backdrop click closes it. X button closes it. Page scroll works again after close.
5. Open each of the other three case studies once — no logo shown for club/hospital/executive (text-only client block), content renders fully.
6. No console errors (`list_console_messages`).

- [ ] **Step 3: Mobile checks (emulate 390×844) via Chrome DevTools MCP**

1. Teaser cards stack in one column; text is not clipped.
2. Tapping a teaser slides up a bottom sheet covering ~92% of the screen with a drag-handle bar and rounded top corners; homepage is dimmed behind it.
3. Sheet content scrolls; highlights are single-column; stats row fits without overflow.
4. Backdrop tap closes. X closes. Verify swipe-close by dispatching touch events on `.case-modal-handle` via `evaluate_script` (touchstart at y=100, touchmove to y=260, touchend) — the sheet closes.
5. GT logo chip is legible at mobile width.
6. No console errors, no horizontal page overflow (`document.documentElement.scrollWidth === window.innerWidth`).

- [ ] **Step 4: Stop the dev server, final build, commit any fixes**

```powershell
npm run build
```

Expected: exit 0. Commit any fixes made during verification:

```powershell
git add -A
git commit -m "fix: polish case study modal issues found in verification"
```

(Skip the commit if there were no fixes.)
