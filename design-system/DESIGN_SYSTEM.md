# Design System — evolonix.github.io

Faithful systemization of the existing codebase. Tokens are exported separately in [tokens.json](./tokens.json) (DTCG-compliant). See [README.md](./README.md) for Figma import instructions.

**Status:** the consolidation proposals from the original audit have been implemented. The [Components](#components) section now documents the real consolidated primitives ([Button](#button--srcapp_componentsbuttontsx), [Field / FieldTextarea](#field--srcapp_componentsfieldtsx), [Alert](#alert--srcapp_componentsalerttsx), [Eyebrow](#eyebrow--srcapp_componentseyebrowtsx), [Card](#card--srcapp_componentscardtsx), [AppLink](#applink--srcapp_componentsapp-linktsx)) plus the extended [Section](#section--srcapp_componentssectiontsx). The [Findings](#findings--style-drift) section tracks resolution status; the [Consolidation](#consolidation--implemented) section captures the as-built API and any deviations from the original proposal.

## Contents

1. [Overview](#overview)
2. [Foundations](#foundations)
3. [Components](#components)
4. [Patterns](#patterns)
5. [Templates](#templates)
6. [Findings — Style drift](#findings--style-drift)
7. [Consolidation — implemented](#consolidation--implemented)
8. [Figma file recommendations](#figma-file-recommendations)

---

## Overview

### Stack

- **React 19** + **React Router 7** (filesystem routing via `@evolonix/react-router-next`)
- **Vite 8** build
- **Tailwind CSS 4** (CSS-first via `@tailwindcss/vite`) — no `tailwind.config.*` file
- **Inline SVG icons** — no icon library
- **No headless UI library** — components are hand-rolled

### Source-of-truth map

| Token category     | Source                                                                                                                     |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| All design tokens  | [src/index.css](../src/index.css) `@theme` block (lines 5–19)                                                              |
| Dark mode          | Class-based (`.dark` on `<html>`), [src/app/\_lib/theme.tsx](../src/app/_lib/theme.tsx), localStorage key `evolonix-theme` |
| Focus ring         | `src/index.css:36-40` (`outline: 2px solid var(--color-brand-500)`)                                                        |
| Shared components  | [src/app/\_components/](../src/app/_components/)                                                                           |
| Feature components | [src/app/packages/react-router-next/\_components/](../src/app/packages/react-router-next/_components/)                     |

### Philosophy

- **OKLCH color authoring** — perceptually uniform; Figma file uses hex equivalents.
- **System fonts** — `ui-sans-serif`, `ui-monospace` stacks; no `@font-face`.
- **Tailwind utilities** are the styling primitive — no CSS-in-JS, no SCSS.
- **Class-based dark mode** — toggled via `theme-utils.ts`; respects `prefers-color-scheme` by default.

---

## Foundations

### Color · Brand palette

Defined in `src/index.css:6-15`. Hue `300` (purple). Source values are OKLCH; hex computed via standard OKLCH→sRGB conversion.

| Token       | OKLCH                  | Hex       | Common use                                                    |
| ----------- | ---------------------- | --------- | ------------------------------------------------------------- |
| `brand/50`  | `oklch(0.97 0.03 300)` | `#f8f1ff` | –                                                             |
| `brand/100` | `oklch(0.94 0.06 300)` | `#f1e3ff` | Active nav pill bg (light)                                    |
| `brand/200` | `oklch(0.88 0.10 300)` | `#e1c9ff` | Soft brand text (dark)                                        |
| `brand/300` | `oklch(0.80 0.14 300)` | `#cca8ff` | Link text (dark)                                              |
| `brand/400` | `oklch(0.72 0.18 300)` | `#b786ff` | Solid hover (dark)                                            |
| `brand/500` | `oklch(0.65 0.20 300)` | `#a46bf5` | **Focus ring; solid (dark)**                                  |
| `brand/600` | `oklch(0.58 0.22 300)` | `#914de6` | **Solid button bg (light)**                                   |
| `brand/700` | `oklch(0.50 0.20 300)` | `#773ac1` | **Link text (light); solid hover (light); soft text (light)** |
| `brand/800` | `oklch(0.40 0.16 300)` | `#57288f` | Brand-tone gradient                                           |
| `brand/900` | `oklch(0.30 0.12 300)` | `#38185f` | Soft bg (dark)                                                |

### Color · Accent palette

Defined in `src/index.css:16-18`. Hue `200` (cyan).

| Token        | OKLCH                  | Hex       | Use                    |
| ------------ | ---------------------- | --------- | ---------------------- |
| `accent/400` | `oklch(0.84 0.14 200)` | `#1be5ee` | –                      |
| `accent/500` | `oklch(0.78 0.16 200)` | `#00d4df` | Gradient blend partner |
| `accent/600` | `oklch(0.70 0.16 200)` | `#00bac5` | –                      |

### Color · Neutral (zinc), Error (rose), Highlight (fuchsia)

Tailwind 4 defaults. Only the steps actually referenced by components are listed in [tokens.json](./tokens.json):

- **zinc**: `50` (alt surface), `100` (text on dark), `200` (border), `300` (border strong), `400` (muted text on dark), `600` (muted text on light), `700` (border dark), `800` (border dark), `900` (primary text on light; surface dark), `950` (page bg dark)
- **rose**: `50/200` (error bg + border light), `300/700` (error text light/dark), `700/950` (error border + bg dark)
- **fuchsia**: `400/500` (decorative), `700` (used in `Section tone="brand"` gradient — see [src/app/\_components/section.tsx](../src/app/_components/section.tsx))

### Color · Semantic aliases

Mode-aware. Use these on components — not raw primitives — so dark mode applies automatically. See [tokens.json](./tokens.json) `semantic.light` / `semantic.dark`.

| Alias                | Light       | Dark        | Purpose                                   |
| -------------------- | ----------- | ----------- | ----------------------------------------- |
| `text/primary`       | `zinc/900`  | `zinc/100`  | Body text                                 |
| `text/muted`         | `zinc/600`  | `zinc/400`  | Secondary text                            |
| `text/onBrand`       | `white`     | `white`     | Text on solid brand                       |
| `text/link`          | `brand/700` | `brand/300` | Links / interactive text                  |
| `surface/base`       | `white`     | `zinc/950`  | Page background                           |
| `surface/alt`        | `zinc/50`   | `zinc/900`  | Alt section bg (proposed standardization) |
| `surface/raised`     | `white`     | `zinc/900`  | Cards / dialogs / popovers                |
| `surface/inverted`   | `zinc/900`  | `zinc/50`   | Inverted surface (code block)             |
| `border/subtle`      | `zinc/200`  | `zinc/800`  | Default ring-1 / borders                  |
| `border/strong`      | `zinc/300`  | `zinc/700`  | Emphasized borders                        |
| `focus/ring`         | `brand/500` | `brand/500` | Focus-visible (same in both modes)        |
| `brand/solid`        | `brand/600` | `brand/500` | Solid button bg                           |
| `brand/solidHover`   | `brand/700` | `brand/400` | Solid button hover                        |
| `brand/soft`         | `brand/100` | `brand/900` | Soft brand wash                           |
| `brand/softText`     | `brand/700` | `brand/200` | Text on soft brand                        |
| `state/error/bg`     | `rose/50`   | `rose/950`  | Alert / form error bg                     |
| `state/error/text`   | `rose/700`  | `rose/300`  | Error message text                        |
| `state/error/border` | `rose/200`  | `rose/700`  | Error container border                    |

### Typography

| Scale       | Px  | rem   | Usage                |
| ----------- | --- | ----- | -------------------- |
| `size/xs`   | 12  | 0.75  | Eyebrows, small meta |
| `size/sm`   | 14  | 0.875 | Body small, buttons  |
| `size/base` | 16  | 1     | Body                 |
| `size/lg`   | 18  | 1.125 | Lead paragraphs      |
| `size/xl`   | 20  | 1.25  | Card titles          |
| `size/2xl`  | 24  | 1.5   | –                    |
| `size/3xl`  | 30  | 1.875 | Section headings     |
| `size/4xl`  | 36  | 2.25  | –                    |
| `size/5xl`  | 48  | 3     | Page headings        |
| `size/6xl`  | 60  | 3.75  | Hero                 |

Weights: `medium (500)`, `semibold (600)`, `bold (700)`. Family: system sans-serif (`ui-sans-serif, system-ui, ...`) and system mono (`ui-monospace, SFMono-Regular, ...`) for code.

**Composite text styles** (use these instead of raw size+weight):

| Style         | Composition                                 |
| ------------- | ------------------------------------------- |
| `eyebrow`     | xs / semibold / uppercase / 0.18em tracking |
| `heading-1`   | 5xl / bold                                  |
| `heading-2`   | 3xl / semibold                              |
| `heading-3`   | xl / semibold                               |
| `body`        | base / medium / leading-relaxed (1.625)     |
| `body-sm`     | sm / medium                                 |
| `code-inline` | sm / mono / medium                          |
| `code-block`  | sm / mono / medium                          |

### Spacing

Base unit 4px. Scale used in code: `0_5, 1, 1_5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32` (px values: 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128). Underscores replace dots to satisfy Figma variable naming.

### Radius

| Token         | px   | Use                 |
| ------------- | ---- | ------------------- |
| `radius/md`   | 6    | –                   |
| `radius/lg`   | 8    | Buttons, inputs     |
| `radius/xl`   | 12   | –                   |
| `radius/2xl`  | 16   | Cards, dialogs      |
| `radius/full` | 9999 | Pills, theme toggle |

### Elevation (shadows)

Only the steps used in components:

| Token        | Composition                                                                       |
| ------------ | --------------------------------------------------------------------------------- |
| `shadow/sm`  | `0 1px 2px 0 rgb(0 0 0 / 0.05)`                                                   |
| `shadow/lg`  | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` (card hover) |
| `shadow/2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` (dialog)                                    |

### Motion

- `duration/fast` = **150ms** (Tailwind default `transition-duration`)
- `easing/standard` = **`cubic-bezier(0.4, 0, 0.2, 1)`** (Tailwind default)
- Reduced-motion respected via `@media (prefers-reduced-motion: reduce)` in `src/index.css:46-58` — animation/transition durations collapse to 0.01ms.

### Breakpoints

`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px` (Tailwind 4 defaults).

### Container

`max-w-2xl: 672px` (dialog), `max-w-3xl: 768px`, `max-w-6xl: 1152px` (default page width).

---

## Components

### Header — [src/app/\_components/header.tsx](../src/app/_components/header.tsx)

**Anatomy:** brand link · nav (`NavLink` × N) · `ThemeToggle` · mobile menu button. Mobile menu uses the **native HTML `<dialog>` element** (ref-based open/close) — see commit `d044711`.

**States rendered in Figma:** default; mobile menu open; mobile menu closed; dark mode.

**Tailwind recipe:**

- Container: `sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800/70`
- Mobile menu button: rounded-full, brand-tinted focus ring
- Mobile `<dialog>`: full-bleed, brand-tinted scrim

### NavLink — [src/app/\_components/nav-link.tsx](../src/app/_components/nav-link.tsx)

Wraps React Router `NavLink` with pill-shaped button styling.

**Variants in code:** `isActive` (true / false).

**States required in Figma:** `default`, `hover`, `active`. (No focus / disabled in code — focus uses global `:focus-visible`.)

**Tailwind recipe:**

- Default: `rounded-full px-3.5 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800`
- Active: `bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-200`

### Footer — [src/app/\_components/footer.tsx](../src/app/_components/footer.tsx)

Static footer: copyright · GitHub · open-source links. No variants.

**Tailwind recipe:** `border-t border-zinc-200 dark:border-zinc-800/70 py-10`

### Section — [src/app/\_components/section.tsx](../src/app/_components/section.tsx)

**Anatomy:** optional `eyebrow` · optional `title` · optional `description` · `children` slot.

**Props:** `tone: "default" | "brand" | "alt"` · `width: "default" | "prose"`.

- `tone="default"` — transparent background; uses `text-primary` / dark equivalents
- `tone="brand"` — gradient `bg-linear-to-br from-brand-600 to-brand-800 via-fuchsia-700`; white text
- `tone="alt"` — `bg-zinc-50 dark:bg-zinc-900/40` with `border-t border-zinc-200 dark:border-zinc-800`
- `width="default"` — `max-w-6xl`
- `width="prose"` — `max-w-3xl` for narrative-heavy content

**Tailwind recipe:** outer per-tone above; inner `mx-auto {width} px-6 py-16 sm:py-20`. Eyebrow delegates to the shared [Eyebrow](#eyebrow--srcapp_componentseyebrowtsx) component for non-brand tones.

### ThemeToggle — [src/app/\_components/theme-toggle.tsx](../src/app/_components/theme-toggle.tsx)

**Variants in code:** three states — `system | light | dark`. Conditional icon (Sun / Moon / Monitor inline SVG).

**Tailwind recipe:** compact rounded-full button, `bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700`.

### ExampleCard — [src/app/packages/react-router-next/\_components/example-card.tsx](../src/app/packages/react-router-next/_components/example-card.tsx)

**Anatomy:** colored top accent bar (4px tall, data-driven tone) · title · description · "Open example →" link.

**Composition:** wraps the shared [Card](#card--srcapp_componentscardtsx) primitive with `interactive`, `to`, and `accent={example.tone}`. The example's tone string (e.g. `from-brand-500 to-fuchsia-500`) is supplied per example via [src/app/packages/react-router-next/\_lib/use-examples.ts](../src/app/packages/react-router-next/_lib/use-examples.ts).

**States:** default; hover (translate-y -0.5 + shadow-lg) — applied by `Card interactive`.

### Dialog — [src/app/packages/react-router-next/\_components/dialog.tsx](../src/app/packages/react-router-next/_components/dialog.tsx)

Wraps the native HTML `<dialog>` element. Used for the modal example-detail slot via React Router parallel routes (see `src/app/packages/react-router-next/@modal/(.)[exampleId]/page.tsx`).

**Anatomy:** header (title + close button) · scroll body. Max width `max-w-2xl` (672px).

### CodeBlock — [src/app/packages/react-router-next/\_components/code-block.tsx](../src/app/packages/react-router-next/_components/code-block.tsx)

Suspense-wrapped Shiki-highlighted code. Light/dark themes via `--shiki-light` / `--shiki-dark` (`src/index.css:67-83`).

### Button — [src/app/\_components/button.tsx](../src/app/_components/button.tsx)

Polymorphic: passes-through to `<Link>` when `to` is supplied, otherwise renders `<button>`.

**Props:** `variant: "solid" | "ghost" | "link"` · `intent: "brand" | "neutral"` · `size: "sm" | "md"` · all native `<button>` / `<Link>` props.

**States:** `default`, `hover`, `disabled` (`disabled:opacity-50 disabled:cursor-not-allowed`). Focus uses the global `:focus-visible` outline from `src/index.css`.

**Tailwind recipe** — shared: `inline-flex items-center gap-2 rounded-full text-sm transition disabled:cursor-not-allowed disabled:opacity-50`. Sizes: `sm` → `px-4 py-2`, `md` → `px-5 py-2.5`. Per `variant × intent`:

| variant | intent    | recipe (md size)                                                                                                           |
| ------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| `solid` | `brand`   | `bg-brand-600 text-white font-semibold shadow-sm hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-400`             |
| `solid` | `neutral` | `bg-zinc-900 text-white font-semibold shadow-sm hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white` |
| `ghost` | `brand`   | `text-brand-700 font-semibold hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-900/40`                            |
| `ghost` | `neutral` | `text-zinc-700 font-semibold hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800`                                  |
| `link`  | `brand`   | `text-brand-700 dark:text-brand-300 hover:underline underline-offset-2 font-medium` (drops padding + radius)               |

**Note:** uses `rounded-full` (not `rounded-lg` as the original proposal suggested) — matches every other button in the codebase. See [Consolidation — implemented](#consolidation--implemented) for the full deviation log.

### Field — [src/app/\_components/field.tsx](../src/app/_components/field.tsx)

Exports `Field` (input) and `FieldTextarea`. Identical API except element type.

**Props:** `label: string` · `name: string` · `error?: string` · `hint?: ReactNode` · `density: "comfortable" | "compact"` · `required?: boolean` · all native `<input>` / `<textarea>` props.

**Behavior:** renders label with required marker, the control, and either `hint` (when no error) or the error message. Sets `aria-invalid`, `aria-required`, `aria-describedby` automatically when applicable.

**Tailwind recipe:** label `text-sm font-medium text-zinc-700 dark:text-zinc-300`; control `mt-1 block w-full rounded-lg border-0 bg-zinc-50 text-zinc-900 ring-1 ring-zinc-200 ring-inset placeholder:text-zinc-400 focus:ring-2 focus-visible:outline-none dark:bg-zinc-950 dark:text-zinc-100 dark:ring-zinc-700`. Density adds padding/size: `comfortable` → `px-3 py-2 text-base sm:text-sm`, `compact` → `px-3 py-1.5 text-sm`. Error variant swaps `focus:ring-rose-500 ring-rose-300 dark:ring-rose-700` and shows `<p class="mt-1 text-sm text-rose-600 dark:text-rose-300">{error}</p>`.

**Focus model:** the control owns its focus indicator — a 2px inset `ring-brand-500` (shown on both mouse and keyboard focus, since you should see which field you're typing in). It carries `focus-visible:outline-none` to _suppress_ the global `:focus-visible` outline, which would otherwise stack on top of the ring as a redundant second border. This differs from [Button](#button--srcapp_componentsbuttontsx), which has no own ring and relies on the global outline. See [Focus indicators](#focus-indicators).

### Alert — [src/app/\_components/alert.tsx](../src/app/_components/alert.tsx)

**Props:** `intent: "info" | "success" | "warning" | "error"` · `density: "inline" | "section"` · `title?: ReactNode` · standard `<div>` attributes.

**Tailwind recipe:** density `inline` → `rounded-lg p-3 text-sm`; `section` → `rounded-2xl p-8 text-base`. Intent colors:

| intent    | recipe                                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| `info`    | `bg-brand-50 ring-brand-200 text-brand-900 dark:bg-brand-900/40 dark:ring-brand-800 dark:text-brand-100`             |
| `success` | `bg-emerald-50 ring-emerald-200 text-emerald-900 dark:bg-emerald-900/40 dark:ring-emerald-800 dark:text-emerald-100` |
| `warning` | `bg-amber-50 ring-amber-200 text-amber-900 dark:bg-amber-900/40 dark:ring-amber-800 dark:text-amber-100`             |
| `error`   | `bg-rose-50 ring-rose-200 text-rose-700 dark:bg-rose-950/40 dark:ring-rose-800 dark:text-rose-200`                   |

Plus shared `ring-1`. Optional `title` renders as `<p class="font-semibold">` above the children.

### Eyebrow — [src/app/\_components/eyebrow.tsx](../src/app/_components/eyebrow.tsx)

**Props:** `tone: "brand" | "neutral" | "danger"` · `as: ElementType` (default `"p"`, use `"h2"`/`"h3"` when the eyebrow semantically labels a section) · standard HTML attributes for the chosen element.

**Tailwind recipe:** `text-xs font-semibold tracking-[0.18em] uppercase` + tone color (`text-brand-700 dark:text-brand-300` / `text-zinc-600 dark:text-zinc-400` / `text-rose-700 dark:text-rose-300`).

### Card — [src/app/\_components/card.tsx](../src/app/_components/card.tsx)

Polymorphic: renders `<Link>` when `to` is supplied, otherwise `<div>`.

**Props:** `interactive?: boolean` · `accent?: string` (Tailwind gradient classes for the optional 4px top strip, e.g. `"from-brand-500 to-fuchsia-500"`) · `to?` for Link mode · all native `<div>` / `<Link>` props.

**Tailwind recipe:** `relative block overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800`. With `interactive`, append `group transition hover:-translate-y-0.5 hover:shadow-lg` (the `group` class makes nested elements available for `group-hover:` recipes — used by ExampleCard's arrow-CTA).

### AppLink — [src/app/\_components/app-link.tsx](../src/app/_components/app-link.tsx)

Polymorphic: passes-through to `<Link>` when `to` is supplied, otherwise renders `<a>`.

**Props:** `variant: "inline" | "external"` · `icon?: ReactNode` (optional leading brand icon) · `to?` for internal Link OR `href?` for `<a>` (mutually exclusive) · standard Link / anchor props.

**Behavior:** when `variant="external"`, automatically sets `target="_blank"` and `rel="noopener noreferrer"`. When `icon` is supplied, the link becomes `inline-flex items-center gap-1.5`; the icon renders `aria-hidden` before the label, and the variant's underline decoration moves to a `<span>` around the label so the icon is never underlined. Used for the GitHub / npm / Bluesky links in the footer and contact aside — see [icons.tsx](../src/app/_components/icons.tsx) (`GitHubIcon`, `BlueskyIcon`; the showcase app additionally has `NpmIcon`).

**Tailwind recipe:** `text-brand-700 dark:text-brand-300` + variant: `inline` → `hover:underline underline-offset-2`; `external` → `underline underline-offset-2 decoration-1 hover:no-underline`.

**Note:** the original proposal included a `nav` variant; in practice the existing [NavLink](#navlink--srcapp_componentsnav-linktsx) covers that role, so AppLink ships with only `inline` and `external`. See [Consolidation — implemented](#consolidation--implemented).

---

## Patterns

Composed UI extracted from production pages.

### Header + Mobile Nav

Header (above) composed with the native `<dialog>` mobile menu. See [src/app/\_components/header.tsx](../src/app/_components/header.tsx).

### Contact form group

[src/app/(marketing)/contact/page.tsx](<../src/app/(marketing)/contact/page.tsx>) — left column (3fr) form + right column (2fr) info aside. Form composes `Field` + `FieldTextarea` for inputs, `Alert` for the inline validation summary, and `Button` for the submit. The info aside uses `AppLink variant="external"` for GitHub / Bluesky.

**Grid:** `lg:grid-cols-[3fr_2fr] gap-10`.

### Package sidebar nav

[src/app/packages/layout.tsx](../src/app/packages/layout.tsx) — two-column `lg:grid-cols-[16rem_1fr]` with sticky sidebar listing package routes. Uses `NavLink` with `isActive` styling.

### Example grid

[src/app/packages/react-router-next/page.tsx](../src/app/packages/react-router-next/page.tsx) — responsive `sm:grid-cols-2 lg:grid-cols-3` grid of `ExampleCard`s.

### Hero pattern

[src/app/page.tsx](../src/app/page.tsx) — full-bleed brand-gradient hero with eyebrow + title + lead paragraph + dual CTA button row. **Intentionally kept inline** (not migrated to `Section tone="brand"`): the home hero uses bespoke padding (`py-24 sm:py-32`), decorative blurred orbs, and white-on-brand / translucent-outline pill CTAs that don't fit the `Button` variant matrix — they're surface-specific to the brand gradient.

### Alt-tone section pattern

`Section tone="alt"` — `bg-zinc-50 dark:bg-zinc-900/40` with a top border. Currently used by `/about` for the Values band (still inline as of writing — the page predates the `tone="alt"` variant; clean follow-up).

### Mobile dialog nav

Native `<dialog>` containing brand link · primary nav links · ThemeToggle. Rendered as a stacked auto-layout column with brand-tinted backdrop.

---

## Templates

Page-level frames matching production routes. Each template references the layouts in [src/app/layout.tsx](../src/app/layout.tsx) and (where applicable) [src/app/packages/layout.tsx](../src/app/packages/layout.tsx).

| Route                                                 | Source                                                                                                                                      | Layout shape                                                             |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `/` Home                                              | [src/app/page.tsx](../src/app/page.tsx)                                                                                                     | Hero (`Section tone="brand"`) + 3-up highlights row                      |
| `/about`                                              | [src/app/(marketing)/about/page.tsx](<../src/app/(marketing)/about/page.tsx>)                                                               | Narrative column + milestones aside + value-card grid (`sm:grid-cols-3`) |
| `/services`                                           | [src/app/(marketing)/services/page.tsx](<../src/app/(marketing)/services/page.tsx>)                                                         | 2-up service cards with gradient top bar + gradient outcome text         |
| `/contact`                                            | [src/app/(marketing)/contact/page.tsx](<../src/app/(marketing)/contact/page.tsx>)                                                           | Contact form + info aside (3fr/2fr)                                      |
| `/packages`                                           | [src/app/packages/page.tsx](../src/app/packages/page.tsx)                                                                                   | Sidebar layout + package listing                                         |
| `/packages/react-router-next`                         | [src/app/packages/react-router-next/page.tsx](../src/app/packages/react-router-next/page.tsx)                                               | Example grid                                                             |
| `/packages/react-router-next/[exampleId]` (full page) | [src/app/packages/react-router-next/[exampleId]/page.tsx](../src/app/packages/react-router-next/[exampleId]/page.tsx)                       | Article: back link · header · code block                                 |
| `/packages/react-router-next/[exampleId]` (modal)     | [src/app/packages/react-router-next/@modal/(.)[exampleId]/page.tsx](<../src/app/packages/react-router-next/@modal/(.)[exampleId]/page.tsx>) | Dialog rendering same content                                            |
| 404                                                   | [src/app/not-found.tsx](../src/app/not-found.tsx)                                                                                           | Centered column: error message + back button                             |

---

## Findings — Style drift

Inconsistencies surfaced during the audit. Resolution status marked per item: ✅ resolved · ⚠️ component shipped but consumers not fully migrated · ➖ intentionally not resolved.

1. ✅ **Button padding variance** _(resolved by `Button` `size: sm | md`)_. The component centralizes `px-4 py-2` / `px-5 py-2.5`. Migrated consumers: [not-found.tsx](../src/app/not-found.tsx), [contact/page.tsx](<../src/app/(marketing)/contact/page.tsx>). The home-page hero ([src/app/page.tsx](../src/app/page.tsx)) kept its inline pill CTAs intentionally — see ➖ note below.

2. ✅ **Button text-weight variance** _(resolved)_. `Button` solid/ghost variants are uniformly `font-semibold`; the `link` variant is `font-medium`. ExampleCard's "Open example" arrow text is intentionally `font-medium` because it sits inside the card body as a CTA hint, not a button.

3. ⚠️ **Card hover lift inconsistent**. `Card interactive` now provides the shared `hover:-translate-y-0.5 hover:shadow-lg` recipe; ExampleCard and home highlights now use it. The packages sidebar nav items in [packages/layout.tsx](../src/app/packages/layout.tsx) are intentionally **not** migrated to interactive cards — they're navigation list items, not content surfaces; applying card semantics there would visually break the sidebar pattern.

4. ✅ **Form input ring styling decentralized** _(resolved by `Field` / `FieldTextarea`)_. All input chrome — label, ring states, error message, ARIA wiring — lives inside [field.tsx](../src/app/_components/field.tsx).

5. ✅ **Alert padding drift** _(resolved by `Alert` `density: inline | section`)_. `p-3` and `p-8` are now first-class density variants. Contact form uses `density="inline"`; section-density consumer (example error boundary) is not yet migrated but the component supports it.

6. ✅ **Eyebrow color usage inconsistent** _(resolved by `Eyebrow` `tone: brand | neutral | danger`)_. Most page eyebrows migrated. The about-page Milestones heading kept inline because it's an `h2` at `text-sm` (semantic + visual) and doesn't match `Eyebrow`'s `<p class="text-xs">` default.

7. ✅ **Internal vs external link styling** _(resolved by `AppLink` `variant: inline | external`)_. Footer + contact-aside links migrated. External variant adds `target="_blank" rel="noopener noreferrer"` automatically.

8. ✅ **Dark-mode border opacity drift** _(resolved)_. Subtle decorative borders no longer carry an opacity modifier — header and footer dropped `border-zinc-200/70 dark:border-zinc-800/70` in favor of solid `border-zinc-200 dark:border-zinc-800`, matching the card/divider convention. The Alert error border was also normalized from `dark:ring-rose-900/60` to a solid `dark:ring-rose-800`, matching the info/success/warning intents. See [Border opacity standard](#border-opacity-standard) for the rule and the contrast rationale.

9. ✅ **No systematic alt-tone section background** _(resolved by `Section tone="alt"`)_. The variant ships; the about-page Values section that motivated this is the obvious migration target.

10. ✅ **No prose-width container** _(resolved by `Section width="prose"`)_. About narrative is the canonical use case.

---

## Consolidation — implemented

The audit-proposed primitives shipped as the components linked from the [Components](#components) section. This section records the **deviations** from the original proposal and the consumers that were intentionally left as inline JSX.

### Deviations from the original proposal

| Area              | Original proposal                                 | As shipped                                                              | Why                                                                                                              |
| ----------------- | ------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Button radius     | `rounded-lg`                                      | `rounded-full`                                                          | Every existing button in the codebase used `rounded-full`. The proposal was inconsistent with observed practice. |
| Button base       | `font-semibold` shared                            | `font-semibold` for solid/ghost; `font-medium` for `link`               | Matches the in-the-wild "text-link CTA" weight.                                                                  |
| Button focus      | `focus-visible:outline-brand-500` recipe baked in | Inherits the global `:focus-visible` outline from `src/index.css:36-40` | Avoids duplicating the existing focus-ring system.                                                               |
| Card padding      | `p-6` (uniform)                                   | `p-6` (uniform)                                                         | ExampleCard's prior `p-5` was the drift outlier — normalized to `p-6`.                                           |
| Card polymorphism | div only                                          | Polymorphic (renders `<Link>` when `to` is set)                         | Matches usage — every interactive card in the codebase wraps a `<Link>`.                                         |
| AppLink variants  | `nav                                              | inline                                                                  | external`                                                                                                        | `inline | external` only | `nav` is fully covered by the existing [NavLink](#navlink--srcapp_componentsnav-linktsx); adding a passthrough would be redundant. |
| Eyebrow           | `<p>` element only                                | `<p>` default + polymorphic via `as` prop                               | Some eyebrows semantically label a section heading (`h2`/`h3`).                                                  |
| Alert title type  | `title?: string`                                  | `title?: ReactNode`                                                     | Lets contact form pass a styled summary like `"1 issue to fix before sending:"` with composable formatting.      |

### Migrations completed

- ✅ [src/app/not-found.tsx](../src/app/not-found.tsx) — `Button` + `Eyebrow`
- ✅ [src/app/page.tsx](../src/app/page.tsx) — `Card interactive accent={…}` + `Eyebrow` for the highlights grid (hero kept inline; see below)
- ✅ [src/app/(marketing)/contact/page.tsx](<../src/app/(marketing)/contact/page.tsx>) — `Field`, `FieldTextarea`, `Alert`, `Eyebrow`, `Button`, `AppLink`
- ✅ [src/app/(marketing)/about/page.tsx](<../src/app/(marketing)/about/page.tsx>) — `Eyebrow`, `Card`
- ✅ [src/app/(marketing)/services/page.tsx](<../src/app/(marketing)/services/page.tsx>) — `Eyebrow`, `Card`
- ✅ [src/app/packages/react-router-next/\_components/example-card.tsx](../src/app/packages/react-router-next/_components/example-card.tsx) — `Card to interactive accent`
- ✅ [src/app/packages/react-router-next/[exampleId]/page.tsx](../src/app/packages/react-router-next/[exampleId]/page.tsx) — `Card accent`
- ✅ [src/app/\_components/footer.tsx](../src/app/_components/footer.tsx) — `AppLink variant="external"` for GitHub
- ✅ [src/app/packages/layout.tsx](../src/app/packages/layout.tsx) — `Eyebrow` for the sidebar header

### Intentionally not migrated

- **Home hero CTAs** ([src/app/page.tsx](../src/app/page.tsx#L57-L68)). The white-on-brand pill and translucent-outline pill are surface-specific to the brand gradient and don't fit `solid/ghost × brand/neutral`. A future `onSurface` modifier could absorb these, but the cost of adding a fifth axis outweighs the cost of two inline JSX nodes.
- **Packages sidebar nav items** ([src/app/packages/layout.tsx](../src/app/packages/layout.tsx)). The audit suggested wrapping them in `Card interactive` to match the hover lift used elsewhere. Doing so would visually rebrand them as content surfaces; they're navigation list items and read better as compact pills with no hover lift.
- **About-page Milestones heading** ([src/app/(marketing)/about/page.tsx](<../src/app/(marketing)/about/page.tsx>)). It's an `h2` at `text-sm` — a one-off variant. Using `<Eyebrow as="h2" className="text-sm">` would rely on later-class-wins ordering, which is fragile. Kept inline.
- **Example detail back link** ([src/app/packages/react-router-next/[exampleId]/page.tsx](../src/app/packages/react-router-next/[exampleId]/page.tsx)). The back link uses a `transition-all hover:gap-2` arrow-expand pattern, not the `hover:underline` pattern of `Button variant="link"`. Different micro-interaction; left inline.

### Border opacity standard

**Rule:** decorative borders use a **solid** zinc step — never an opacity modifier. `border-zinc-200` (light) / `border-zinc-800` (dark) for subtle boundaries; `ring-zinc-200` / `dark:ring-zinc-800` for card and panel rings. Opacity modifiers (`/40`, `/60`, `/70`, `/80`) are reserved for **translucent fills** (sticky-header backdrop `bg-white/80`, modal scrims `bg-zinc-950/70`, soft alert washes `bg-rose-950/40`) — not for borders.

This replaced the prior drift where header/footer used `border-zinc-*/70` while cards used solid `ring-zinc-*`, and the Alert error intent used `ring-rose-900/60` while its sibling intents used solid `ring-*-800`.

**WCAG 2.2 AA notes** (SC 1.4.11 Non-text Contrast — 3:1 for boundaries that _identify_ a component):

- Dropping `/70` slightly **raises** contrast, so this change only improves accessibility: header/footer divider went 1.18→1.27:1 (light) and 1.20→1.34:1 (dark). These dividers are decorative (the header/footer are identified by position and content, not the hairline), so the sub-3:1 ratio is acceptable under 1.4.11.
- Card rings are likewise decorative — cards are identified by their content and elevation, not the 1px ring — so `zinc-200` / `zinc-800` (≈1.2–1.3:1) is acceptable.
- The Alert error border improved 1.37→2.17:1 (dark) by switching to solid `rose-800`; the alert is _also_ identified by its tinted fill + icon + text, so color is not the sole signal.
- **Focus indicators** (the one border-like element that must meet 3:1): the global `:focus-visible` outline uses `brand-500` at 2px — **3.50:1 on white, 5.68:1 on zinc-950**. Passes, and the 2px width satisfies SC 2.4.11 Focus Appearance.
- **Known limitation (not introduced here):** form-input borders at rest (`ring-zinc-200` light / `ring-zinc-700` dark) sit at 1.2–1.9:1 and do not meet 1.4.11's 3:1 on their own. Inputs are kept identifiable by their always-visible labels and by the high-contrast focus ring on interaction. Tightening this to a true 3:1 at-rest boundary (≈`zinc-500`) is a deliberately separate decision — it changes the visual weight of every form — and is out of scope for this drift fix.

### Focus indicators

**Rule: exactly one focus indicator per control.** The app defines a global keyboard-focus outline once — `:focus-visible { outline: 2px solid var(--color-brand-500); outline-offset: 2px }` in `src/index.css:36-40`. Components either rely on that outline _or_ supply their own ring and opt out of the global one — never both.

| Control                                           | Focus indicator                                                                                       | Shown on                                                           |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Button, NavLink, ThemeToggle, header/footer links | Global `:focus-visible` outline (brand-500, 2px, 2px offset)                                          | keyboard only                                                      |
| Field / FieldTextarea                             | Own inset `focus:ring-2 ring-brand-500`, with `focus-visible:outline-none` to drop the global outline | mouse **and** keyboard (you should see the field you're typing in) |

The split is principled, not arbitrary: text inputs need a focus cue on mouse-click too, so they own a `focus:` ring; buttons only need a keyboard cue, so they defer to the `:focus-visible` outline.

**Two bugs this rule fixed (both caught during the border audit):**

1. **Field double border.** The control had `focus:ring-2` _and_ inherited the global outline, so keyboard focus drew two concentric brand rings. Fixed by adding `focus-visible:outline-none` to the control — the inset ring is now the single indicator.
2. **Button had _no_ focus indicator.** Its base class carried `focus-visible:outline-none` but no variant supplied a replacement ring, so keyboard focus was invisible — a **WCAG 2.4.7 (Focus Visible) failure**. Fixed by removing `focus-visible:outline-none` from the button base so the global outline shows.

**WCAG:** the global outline meets SC 1.4.11 (brand-500 vs white 3.50:1, vs zinc-950 5.68:1) and its 2px width + 2px offset satisfies SC 2.4.11 Focus Appearance; the Field's 2px inset ring meets the same bar. Both controls now pass SC 2.4.7.

**No color flash on focus.** Tailwind v4's `transition` / `transition-colors` utilities animate `outline-color`. Left alone, the resting `outline-color` computes to `currentColor` — white on solid buttons — so the focus outline would fade white → brand over ~150ms on first focus. `src/index.css` pins `outline-color: var(--color-brand-500)` on interactive elements at rest (`:where(a, button, input, textarea, select, summary, [tabindex])`), so the start and end colors match and the outline appears instantly in brand. The `:where()` wrapper keeps specificity at 0 so component utilities can still override.

---

## Figma file recommendations

For when the design system is built out in Figma (a partial pass exists in [https://www.figma.com/design/N4W9AwIIj9eYeTHwg1Ui8r/](https://www.figma.com/design/N4W9AwIIj9eYeTHwg1Ui8r/) — variables + Foundations + Components pages were populated).

### Page structure

- **Foundations** — color swatches, type scale, spacing, radius, elevation, motion
- **Components** — Button, Field, Alert, NavLink, Card, Eyebrow, Section, ThemeToggle, Dialog, CodeBlock (with variant sets matching the proposed React APIs)
- **Patterns** — composed UI (header, footer, contact form group, example grid, hero, alt-tone section, mobile nav)
- **Templates** — frames matching production routes
- **Docs** — this file's content + source pointers

### Variable collections

One Figma variable collection per token group (matches [tokens.json](./tokens.json) top-level keys):

- `Color/Primitive` — single mode; the 36 base color tokens
- `Color/Semantic` — **two modes (Light + Dark)**; the ~18 semantic aliases. Each leaf references a primitive
- `Spacing`, `Radius`, `Typography`, `Motion` — single mode

### Naming conventions

- Tokens use the same slugs in Figma variables, [tokens.json](./tokens.json), and Tailwind utility classes.
- Component property names map 1:1 to the React props above (`Variant=solid, Intent=brand, Size=md, State=hover`).
- Dots in numeric scale steps (`0.5`, `1.5`) are replaced with underscores (`0_5`, `1_5`) — Figma rejects dots in variable names.
