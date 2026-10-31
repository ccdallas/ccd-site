# CLAUDE.md — chaundacdallas.com project brief

This file briefs any AI agent working in this repo. Read it before making changes.

## Who this is for
Chaunda C. Dallas, MSIT — Healthcare Cyber Resilience & Incident Management (ED-first). Digital First Responder is a facet. The locked copy in the Jarvis project instructions wins over anything here.
The NAME leads everywhere. "Digital First Responder (DFR)" is a facet of her identity, not the headline.
Public display name is "Chaunda C. Dallas Consulting" (site, footers, résumé, LinkedIn, bio). "Chaunda C. Dallas LLC" is legal/federal only (SAM.gov, CAGE/UEI, federal résumé variant, contracts, invoices). It never appears in hero copy or positioning.

## Non-negotiable brand guardrails
Flag any violation BEFORE building; do not silently "fix" copy in ways that break these.

- Core tagline: "I didn't leave healthcare. I learned to defend it."
- NEVER frame her as "transitioning," "pivoting," "crossing over," or "leaving" healthcare. She never left.
- CNA is a certification, never a job title. Correct title progression: ER Tech -> Lead ER Tech -> Epic Super User -> Clinical Coordinator. Never write "CNA ->" or "CNA & Registration Clerk" as a role.
- Canonical Piedmont display title: "Epic Super User, Clinical Preceptor & Lead ER Tech". Use this exact string wherever the Piedmont role is titled (site timeline, About copy, resume).
- Never reference "Former RN."
- CompTIA Security+ is NOT earned — do not list it as a completed cert. Current cert target is Microsoft SC-900.
- Every public section should touch >=2 of: Healthcare, Patient Safety, Connected Devices, Human Consequence.
- Voice: ER grit, semi-professional, laid-back, direct. No fluff. See BRAND_VOICE.md for approved language variations — rotate them; never repeat the same origin phrasing or the "28 years" line twice on one page.

## Lane and offers (locked Oct 3 and Oct 8, 2026; revised Oct 31, 2026)
Rules in this file are living. Chaunda can change any rule by stating the change; the change is applied and logged at the bottom of this file. Guardrails against fabrication (credentials, dates, clinical facts) still hold regardless of any rule change.
One lane: Healthcare Cyber Resilience & Incident Management, ED-first. Keeping patient care operational when cyber incidents, technology failures, or clinical downtime disrupt care.
- Opener (use everywhere): "I keep patient care running when systems don't."
- Positioning sentence: "I help healthcare organizations prepare for, respond to, and recover from cyber incidents and technology failures without losing sight of the patient."
- Primary buyer: hospitals and health systems. The site does not carry a vendor landing page yet.
- Three core public offers, in this order: (1) The 3 A.M. Downtime Drill, flagship, leads the page; (2) Fractional Clinical Safety Advisor, retainer; (3) Clinical AI Harm Review, secondary.
- Accepted add-on, by request: Speaking & workshops (45-minute session to half-day). Listed after the core offers, not as a fourth core offer.
- Service areas (Clinical Downtime & Continuity, Healthcare Cyber Incident Management, Clinical Technology Security Advisory) are internal and commercial language for capability statements. They do not appear in site navigation or hero copy, and they do not add public offers.
- Incident work is coordination and translation of clinical consequences. She is NOT a DFIR investigator. Avoid "incident response," "forensics," "investigation," and "incident commander" as service claims.
- Parked, kept out of public copy: PSTM Clinical Harm Assessment (partner-only, not a public offer), medical device and IoMT work, AI red team, GRC as a lead, federal work, sports tech. The federal footer link is removed site-wide.
- Sports posts are occasional personality content that must bridge back to patient-side failure.
- Priority: an income-generating remote healthcare cyber resilience role and the flagship Drill. The Black Hat date (Aug 5, 2026) has passed and no longer drives priority.
- Adversarial or pen-test language is not used. Use "scenario-based" for testing and exercises. Do not imply delivery history the Drill does not yet have.
- Never write "former" or "Former" about her clinical role.

## Change log
- 2026-10-31: Speaking & workshops accepted as an add-on. Health Tech Cert restored (received from Kennesaw State). DeepScribe role and code work added. "Three-month minimum" removed from public copy pending confirmation. Footer standardized site-wide to Chaunda C. Dallas Consulting; federal link removed. Piedmont title canonicalized on the résumé.

## Design system (already in use — match exactly)
Colors:
- Green #1E5040 — identity: headers, logo, nav, primary UI
- Amber #E0A83E — CTAs, highlights, hover states
- Crimson #8B1E24 — pulse/ECG spike ONLY, never decorative or general UI
- Cream #F3ECDD — backgrounds, negative space
- Slate #3D4142 — body text, secondary UI

Fonts: Cormorant Garamond (display/name), DM Sans (body), DM Mono (labels/mono).

Shared components: the universal .ccd-nav bar and .ccd-footer appear on every page and must stay consistent across all pages. Some pages use the external styles.css; a few carry inline <style> blocks — keep tokens identical either way.

## Site architecture
Main site (GitHub Pages): Home, About, Expertise, Services, DFR Framework, Playbook (Field Notes hub), Documentary, Resources, Contact, Book, WiCyS, /intake.
Lab: lab.chaundacdallas.com (Digital First Responder Lab — IoMT scenarios + Healthcare Ransomware Intelligence Tracker). Always link the lab by this subdomain, never a raw github.io URL.

## Current booking + intake wiring (canonical links)
- Fit Call (free, 20 min, clients and paid prospects only): https://calendar.app.google/umQdxXa6yuYqqXfd9
- No prices on any public page. Each service is 'Scoped on a Fit Call'.
- 1:1 Mentor Session (free, WiCyS grant): https://calendar.app.google/S7HAL9PbuCJGh6MN8
- WiCyS Office Hours (free): https://calendar.app.google/spo67aTHk6M7Ld6g7
- Saturday Study Hall standing room: https://meet.google.com/jey-dwbf-hvr
- Org-tier scoping routes to the intake form at /intake, pre-selecting a branch via ?service=hipaa or ?service=consult. Backend: Google Apps Script -> Google Sheet with instant email notification to connect@. LIVE.

## YouTube embeds
Trailer/video embeds must use the https://www.youtube.com/embed/VIDEO_ID format. A youtu.be/... share link will NOT render in an iframe.

## Contacts
- connect@chaundacdallas.com — LLC / business / Stripe (org-facing and footer contexts)
- mscdallas@gmail.com — personal

## Federal / LLC identifiers (Federal Credentials section and legal/federal contexts only)
Chaunda C. Dallas LLC · CAGE 18D81 · UEI KV2BR8QU36J7 · SAM.gov active · WOSB pending.

## Working rules for agents
- Work on a branch; do not push directly to the live branch without a local preview.
- Make surgical changes; don't restructure pages that weren't in scope.
- Surface brand-guardrail tensions and ask before overriding them.
