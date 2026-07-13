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
  /** Short uppercase record label for the teaser card header, e.g. "AUTO REPAIR — ABU DHABI, UAE". */
  sector: string;
  /** Headline result shown in the teaser card's readout footer. */
  keyMetric: { value: string; label: string };
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
    sector: "Members' Club",
    keyMetric: { value: "40%", label: "less manual admin" },
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
    sector: "Auto Repair — Abu Dhabi, UAE",
    keyMetric: { value: "100%", label: "paperless job cards" },
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
    sector: "Private Healthcare",
    keyMetric: { value: "24/7", label: "online booking" },
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
    sector: "Enterprise Executive",
    keyMetric: { value: "2h+", label: "saved daily" },
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
