# Camilo Pinzon Project Context

This document provides a comprehensive and up-to-date overview of the project architecture, tech stack, design guidelines, recent accomplishments, and upcoming priorities. It is intended to serve as a complete context payload for AI assistants (like Claude) taking over development.

---

## 1. Project Overview & Tech Stack

This is a modern web application built for **Camilo Pinzon**. 

- **Framework:** Next.js 16.2.3 (App Router)
- **Library:** React 19.2.4
- **Language:** TypeScript (Strict typing, zero `any` policy)
- **Styling:** Tailwind CSS v4, Sass, Vanilla CSS with custom properties (CSS variables)
- **Database & Auth:** Firebase (`firebase` for client, `firebase-admin` for backend)
- **AI Integration:** Vercel AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/google`)
- **Rate Limiting & Cache:** Upstash Redis (`@upstash/redis`, `@upstash/ratelimit`)
- **Email Delivery:** Resend
- **Media Management:** Cloudinary
- **Form Validation:** Zod
- **Security:** Google reCAPTCHA v3
- **Icons:** Lucide React

---

## 2. Architecture & Folder Structure

The project strictly follows the Next.js App Router architecture:

- **`/app`**: 
  - `/[lang]/`: Client-facing pages with Internationalization (i18n).
  - `/admin/`: Private CMS panel.
  - `/actions/`: Global Server Actions.
  - `/api/`: Route Handlers (e.g., `/api/auth` for managing Firebase Session Cookies).
- **`/components`**: Domain-specific React components (`/chatbot`, `/nav`, `/portfolio`, `/ui`, `/theme`, etc.). Also includes `auth-guard.tsx` for route protection.
- **`/lib`**: Core utilities, services, and configuration:
  - `/actions`: Business logic and specific Server Actions.
  - `/cms`, `/firebase`, `/i18n`: Centralized setups and integrations.
  - `/validation`: Zod schemas.
  - `/hooks`: Custom React hooks.
  - `/emails`: Email templates.
- **`/public` & `/assets`**: Static assets.

---

## 3. Security & Authentication

- **Firebase Session Cookies:** Server Actions and private routes (CMS) are cryptographically protected by validating Firebase Session Cookies. Standard client-side Firebase Auth tokens are converted into HTTP-only session cookies via the `/api/auth` endpoint to ensure server-side security.
- **Form Security:** All public-facing forms (e.g., contact) enforce Google reCAPTCHA v3 and Upstash rate-limiting.

---

## 4. Design System (Augen Pro)

The project adheres to the **"Augen Pro"** design system, a light-themed, high-contrast, minimalist, and "future-forward" aesthetic comparable to Apple or Linear.

### Key Tokens (Must strictly use CSS variables):
- **Backgrounds:** Ghost White (`var(--color-ghost-white)`, `#f2f2f4`) for main surfaces; Canvas (`var(--color-canvas)`, `#fdfdfd`) for secondary layered surfaces.
- **Text:** Midnight Ink (`var(--color-midnight-ink)`, `#0f1012`) for primary text; Slate Comment (`var(--color-slate-comment)`) for secondary.
- **Accents/Interactive:** Future Blue (`var(--color-future-blue)`, `#0071e3`). **Strict rule: No other chromatic colors should be used for UI elements.**

### Typography & Spacing:
- **Font:** `PP Neue Montreal` (`var(--font-pp-neue-montreal)`), weights 350 (Headings) and 400 (Body).
- **Letter Spacing:** Tightly tracked at `-0.02em`.
- **Spacing:** Extensive negative space. Section gaps are typically `94px` (`var(--section-gap)`).
- **Radii:** 10px for standard buttons, 26px for pill buttons, 54px for large panels.

*Note: Recently, all legacy hardcoded hex colors and `.glass-panel` style utility classes were aggressively refactored out in favor of this token system.*

---

## 5. Recent Accomplishments & Current State

1. **Legacy Refactor ("Clean up Legacy Classes"):** Successfully purged all hardcoded colors, obsolete classes (`glass-panel`, `surface-card`), and static `rgba` values. Everything now correctly maps to the Augen Pro CSS variables across both the client-facing UI and the `/admin` CMS.
2. **Dynamic Theme System:** 
   - Implemented a `ThemeProvider` handling `light`, `dark`, and `dynamic` states, syncing with `localStorage`.
   - Built a 3-way `ThemeSelector` pill toggle in the main navigation.
   - Smooth transitions between themes are handled via CSS `color-mix` (`globals.css`), with an injected `theme-script.tsx` in `app/layout.tsx` to prevent FOUC (Flash of Unstyled Content).
3. **LinkedIn Automation:** Integrated a Server Action (`app/actions/linkedin.ts`) into the CMS. When an admin saves and marks a post as published, the system automatically posts it to LinkedIn.
4. **TypeScript & Linter Hardening:** Removed instances of `any` (replaced with `Record` or `unknown`), and resolved strict ESLint warnings (specifically `react-hooks/set-state-in-effect`). 

---

## 6. Siguientes Pasos / Next Priorities (Where you should start)

**🎯 Main Task:** Refactor the CMS Admin panel data-fetching architecture.

1. **Migrate to Server Components:** Currently, the CMS Dashboard (`app/admin/(dashboard)/collections/[collectionId]/[docId]/page.tsx` and related components) relies on client-side `useEffect` for data fetching. This needs to be migrated to native Next.js Server Components for better performance and security.
2. **Optimize Asynchronous Notifications:** During the CMS "Save" process, the LinkedIn automation and Newsletter triggers should be executed asynchronously (e.g., in the background or using `Promise.all()`) so they don't block the UI while waiting for 3rd-party API responses.
3. **Global UI Notifications:** Replace native `alert()` calls in the CMS with a robust global notification system (Toasts) to handle success/error states gracefully.

---

## 7. Strict AI Guidelines & Constraints

If you (the AI) are taking over, you must abide by the following rules set for this workspace:

1. **No Modifying Code Without Explicit "AUTHORIZE":** By default, the AI must propose changes but **never** execute commands or modify files unless the user explicitly includes the word **"AUTHORIZE"** (or "AUTORIZO") in their prompt.
2. **Mobile-First & a11y:** All Tailwind implementations must start mobile-first. Strict accessibility (ARIA labels, alt tags, keyboard focus states) is mandatory.
3. **Zero `any` Policy:** Do not introduce `any` in TypeScript. Strongly type all interfaces.
4. **Always verify compilation:** Always run `npx tsc --noEmit` locally after modifying types to ensure no build breaks are introduced.
5. **No `useEffect` for Data Fetching:** As per modern Next.js App Router paradigms, prioritize Server Components and Server Actions over client-side data fetching unless interactivity demands it.
