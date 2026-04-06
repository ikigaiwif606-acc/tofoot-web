# Design System: ToFoot (火光足球)

## 1. Visual Theme & Atmosphere

ToFoot is a cyberpunk sports terminal — a neon-lit command center for football data built on an abyss-black canvas (`#030308`). The design language draws from CRT monitors, retro arcade scoreboards, and sci-fi HUDs: content doesn't sit on the page, it *glows out of the void*. A faint cyan grid overlay pulses beneath every page like circuitry, while horizontal scanlines ghost across images and surfaces, anchoring the aesthetic in analog-digital fusion.

The color system is built on three neon accents — cyan (`#00ffff`), magenta (`#ff00ff`), and yellow (`#ffee00`) — each with a distinct semantic role. Cyan is the primary voice: navigation, scores, interactive states. Magenta is the secondary accent: categories, danger states, decorative energy. Yellow is reserved for highlights, gold rankings, and success moments. These three colors never appear as solid fills — they exist as borders, text-shadows, glows, and translucent washes (`rgba` at 0.04–0.08 opacity), keeping the dark canvas dominant.

Typography uses three purpose-built fonts: **Orbitron** (display) delivers uppercase, wide-tracked, sci-fi authority for headlines and tags. **Rajdhani** (body) provides a geometric, semi-condensed reading experience with enough personality to feel engineered rather than generic. **Share Tech Mono** (data) handles all technical labels, timestamps, and score displays with tabular precision. Together they create a three-voice system: announce (Orbitron), narrate (Rajdhani), and measure (Share Tech Mono).

The border language uses neon-tinted semi-transparent edges — `rgba(0, 255, 255, 0.13)` for default borders, solid `#0d0d22` for subtle card edges — creating structure that reads as faint circuit traces rather than UI chrome. Cards have zero border-radius (sharp corners), reinforcing the industrial-terminal aesthetic.

**Key Characteristics:**
- Abyss-black canvas: `#030308` background, `#06060f` surface, `#0d0d22` borders
- Three-neon accent system: cyan (primary), magenta (secondary), yellow (highlight)
- Glow-first color application: text-shadow, box-shadow, translucent borders — never solid neon fills
- CRT grid overlay (40px pattern) and horizontal scanlines as ambient texture
- Zero border-radius on cards — sharp, industrial, terminal-grade corners
- Three-font system: Orbitron (display), Rajdhani (body), Share Tech Mono (data)
- Traditional Chinese (`zh-TW`) as primary language, with Noto Sans TC fallback
- Font-variant-numeric: `tabular-nums` on all score and countdown displays

## 2. Color Palette & Roles

### Background Surfaces
- **Abyss Black** (`#030308`): The deepest canvas — page backgrounds, the void from which content emerges. Near-pure black with a cold blue-purple undertone.
- **Surface Dark** (`#06060f`): Card backgrounds, sidebar, elevated containers. One step up from the abyss.
- **Ticker Surface** (`rgba(0, 255, 255, 0.06)`): Special-purpose surface for live match banners and tickers — a barely-visible cyan wash over the abyss.

### Neon Accents
- **Neon Cyan** (`#00ffff`): The primary accent — navigation active states, score digits, section titles, interactive focus, CTA buttons. Always accompanied by its glow (`0 0 8px #00ffff`).
- **Neon Magenta** (`#ff00ff`): The secondary accent — categories, danger/alert states, decorative energy on navbar gradients. Glow: `0 0 8px #ff00ff`.
- **Neon Yellow** (`#ffee00`): The highlight accent — gold rankings (top 3), success states, special tags. Glow: `0 0 5px #ffee00`.

### Text & Content
- **Primary Text** (`#c8d6e5`): Cool blue-gray for body text. Readable against the dark canvas without the harshness of pure white.
- **Muted Text** (`#8899aa`): Secondary information — descriptions, metadata, timestamps.
- **Dim Text** (`#556677`): Tertiary — placeholders, disabled states, de-emphasized labels.
- **Ghost Text** (`#2a3a4a`): The most subdued — barely visible labels, background watermarks, countdown label text.

### Borders & Dividers
- **Border Default** (`rgba(0, 255, 255, 0.13)`): Semi-transparent cyan border — the standard edge treatment. Reads as a faint circuit trace.
- **Border Subtle** (`#0d0d22`): Solid dark blue-black for card edges. Structural but nearly invisible.
- **Border Surface** (`#0d0d1a`): The subtlest solid border — inner dividers within cards.

### Semantic Status
- **Success** (`#22C55E`): Correct predictions, positive states.
- **Danger** (`#EF4444`): Wrong predictions, error states, destructive actions.
- **Urgency Orange**: Pulsing warm tone for countdown < 24 hours.

### Hover & Interactive
- **Surface Hover** (`rgba(0, 255, 255, 0.04)`): Subtle cyan wash on interactive card hover.
- **Accent Hover** (`#00cccc`): Slightly dimmed cyan for button hover states.
- **Navbar Gradient**: `linear-gradient(90deg, transparent, #00ffff, #ff00ff, #00ffff, transparent)` — the signature neon streak beneath the header.

## 3. Typography Rules

### Font Families
- **Display**: `Orbitron` (weights: 400, 700, 900), fallback: sans-serif. CSS variable: `--font-display`.
- **Body**: `Rajdhani` (weights: 500, 600, 700), fallback: `"Noto Sans TC", sans-serif`. CSS variable: `--font-body`.
- **Mono/Data**: `Share Tech Mono` (weight: 400), fallback: monospace. CSS variable: `--font-mono`.

### Hierarchy

| Role | Font | Size | Weight | Letter Spacing | Transform | Notes |
|------|------|------|--------|----------------|-----------|-------|
| Section Title | Orbitron | 10px | 700 | 3px | uppercase | Cyan glow, left accent bar, border-bottom |
| Heading 1 | Orbitron | 26–32px | 900 | 0.05em | uppercase | Used for countdown digits, hero numbers |
| Heading 2 | Orbitron | 18–24px | 700 | 0.05em | uppercase | Card headers, page titles |
| Heading 3 | Orbitron | 14–16px | 700 | 0.05em | uppercase | Sub-section headers |
| Body | Rajdhani | 16px | 500 | normal | none | Standard reading text |
| Body Strong | Rajdhani | 16px | 700 | normal | none | Emphasized body text |
| Tag Label | Orbitron | 9px | 400 | 2px | uppercase | Inline badges, category tags |
| Data Label | Share Tech Mono | 9–10px | 400 | 1px | uppercase | Countdown labels, metadata |
| Data Value | Share Tech Mono | 14–16px | 400 | normal | none | Timestamps, view counts, stats |
| Score Digit | Orbitron | 26px | 900 | normal | none | Scoreboard numbers, cyan glow shadow |
| Nav Link | Rajdhani | 14–16px | 600 | 0.5–1px | uppercase | Header navigation items |
| Button Text | Rajdhani | 14px | 600–700 | normal | none | CTA and action buttons |
| Category Slug | Share Tech Mono | 11–12px | 400 | normal | none | Prefixed with `//` (e.g., `// ANALYSIS`) |

### Principles
- **Three voices, three purposes**: Orbitron announces (headlines, scores, tags), Rajdhani narrates (body, navigation, buttons), Share Tech Mono measures (data, timestamps, labels). Never mix these roles.
- **Uppercase is structural**: All Orbitron text is uppercase with wide letter-spacing. This isn't decorative — it's the terminal aesthetic. Body text (Rajdhani) is never uppercase except in navigation.
- **Glow is emphasis**: Important text (scores, section titles, active nav) gets `text-shadow` glow in the relevant neon color. Regular text has no glow.
- **Tabular numerals**: All score displays and countdown digits use `font-variant-numeric: tabular-nums` so digits don't shift width during live updates.

## 4. Component Stylings

### Cards

**Base Card**
- Background: `#06060f` (surface dark)
- Border: `1px solid #0d0d22`
- Border-radius: `0` (sharp corners — no rounding)
- Padding: `1.5rem`
- No shadow — depth comes from surface color contrast against `#030308`

**Feature Card**
- Same as base, plus: `border-left: 2px solid #00ffff` (cyan accent bar)
- The left border acts as a visual anchor and importance marker

**Interactive Card**
- Adds: `transition: border-color 0.2s ease`
- Hover: `border-color: rgba(0, 255, 255, 0.27)` — border brightens toward cyan

### Buttons

**Primary (Cyan)**
- Background: cyan-tinted (semi-transparent or `bg-accent`)
- Text: near-white with cyan text-shadow
- Border: `1px solid rgba(0, 255, 255, 0.4)`
- Hover: background shifts, glow intensifies

**Secondary (Subtle)**
- Background: transparent or very subtle surface
- Text: muted text color
- Border: subtle border
- Hover: surface lightens

**Danger (Magenta)**
- Background: magenta-tinted
- Text: near-white with magenta text-shadow
- Used for destructive or alert actions

**Sizes**: `sm` (compact tags), `md` (default), `lg` (hero CTAs)

### Badges / Tags

**Structure**: Orbitron 9px, letter-spacing 2px, uppercase, `border-radius: 2px`, padding `3px 10px`.

| Variant | Border | Background | Text | Glow |
|---------|--------|------------|------|------|
| Cyan | `rgba(0, 255, 255, 0.4)` | `rgba(0, 255, 255, 0.08)` | `#00ffff` | `0 0 6px #00ffff` |
| Magenta | `rgba(255, 0, 255, 0.4)` | `rgba(255, 0, 255, 0.08)` | `#ff00ff` | `0 0 6px #ff00ff` |
| Yellow | `rgba(255, 238, 0, 0.4)` | `rgba(255, 238, 0, 0.08)` | `#ffee00` | `0 0 5px #ffee00` |

### Inputs

- Background: `#06060f`
- Border: `1px solid #0d0d22`
- Focus: cyan ring / border glow
- Label: Share Tech Mono, uppercase, above input
- Error state: magenta border and text

### Scoreboard Digits
- Background: `rgba(0, 255, 255, 0.06)`
- Border: `1px solid rgba(0, 255, 255, 0.2)`
- Border-radius: `0` (sharp)
- Font: Orbitron, `font-variant-numeric: tabular-nums`
- Color: `#00ffff`
- Used for match scores and countdown numbers

### Navbar
- Background: `#030308` (same as page)
- Height: `52px`
- Border-bottom: `1px solid rgba(0, 255, 255, 0.27)`
- Neon gradient streak: `::after` pseudo-element with `linear-gradient(90deg, transparent, #00ffff, #ff00ff, #00ffff, transparent)` — 2px height, positioned 3px below the border
- Active link: cyan color with `text-shadow: 0 0 8px #00ffff`

### Section Titles
- Font: Orbitron 10px, weight 700, letter-spacing 3px, uppercase
- Color: `#00ffff` with `text-shadow: 0 0 8px #00ffff`
- Left accent bar: `::before` pseudo-element — 2px wide, 14px tall, cyan with box-shadow glow
- Border-bottom: `1px solid rgba(0, 255, 255, 0.2)`
- Margin-bottom: `16px`

## 5. Layout Principles

### Spacing System
- Base unit: `4px`
- Common spacings: 4px, 8px, 10px, 12px, 16px, 20px, 24px, 32px, 40px
- Card padding: `1.5rem` (24px)
- Section spacing: `32px–48px` between major sections
- Grid overlay: 40px cell size

### Grid & Container
- Max content width: `max-w-7xl` (~80rem / 1280px)
- Standard padding: `px-4` (16px) on mobile, expanding on larger screens
- Content cards: single column on mobile, 2–3 columns on desktop
- Video grid: responsive columns with 16:9 aspect ratio thumbnails

### Page Structure
Every public page follows this skeleton:
1. **Header** (sticky navbar with neon gradient)
2. **NextMatchBanner** (live ticker / countdown)
3. **Main content** (page-specific)
4. **Footer** (4-column grid)
5. **MobileBottomNav** (fixed bottom, visible on mobile only)

### Whitespace Philosophy
- **The void is the layout**: The `#030308` background IS the spacing. Content islands float in darkness, separated by the abyss rather than by dividers or background color changes.
- **Dense data, generous surrounds**: Cards and data displays are information-dense internally, but sit within generous dark margins. The contrast between packed content and empty void creates visual hierarchy.
- **Grid as texture**: The 40px CRT grid overlay provides a subtle sense of structure without needing explicit layout guides.

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Void (Level 0) | No shadow, `#030308` bg | Page background, the abyss |
| Surface (Level 1) | `#06060f` bg, `1px solid #0d0d22` border | Cards, sidebars, containers |
| Feature (Level 2) | Surface + `2px solid #00ffff` left border | Featured/important cards |
| Glow (Level 3) | `box-shadow: 0 0 8px #00ffff` | Active elements, focused inputs, live indicators |
| Intense Glow (Level 4) | `text-shadow: 0 0 12px #00ffff, 0 0 24px rgba(0, 255, 255, 0.4)` | Countdown digits, hero numbers |
| Navbar Streak | Gradient pseudo-element below border | Top navigation — the brightest persistent element |

**Depth Philosophy**: ToFoot does not use traditional shadow-based elevation. Depth is communicated through three mechanisms:
1. **Surface luminance** — darker = further back, lighter surface = elevated
2. **Neon glow intensity** — brighter glow = more prominent / active
3. **Border opacity** — brighter borders = more elevated or interactive

This creates a world where elements don't cast shadows downward — they emit light outward, like screens in a dark room.

## 7. Do's and Don'ts

### Do
- Use `#030308` as the base background — everything builds up from this void
- Apply neon colors only as glows, borders, and text — never as solid background fills (except at very low opacity: 0.04–0.08)
- Use Orbitron exclusively for display elements (headings, scores, tags, section titles) — always uppercase
- Use Rajdhani for all body and navigation text — it's the readable voice
- Use Share Tech Mono for data labels, timestamps, counts — anything measured
- Add `text-shadow` glow to important text (active nav, scores, section titles)
- Keep cards at `border-radius: 0` — sharp corners are the terminal aesthetic
- Use the three-neon hierarchy: cyan for primary interaction, magenta for secondary/decorative, yellow for highlights/success
- Include the CRT grid overlay on page wrappers (`.page-wrapper::before`)
- Use `font-variant-numeric: tabular-nums` on any number that updates live
- Add `transition: border-color 0.2s ease` on interactive cards
- Prefix category labels with `//` (e.g., `// ANALYSIS`) in Share Tech Mono

### Don't
- Don't use solid neon fills as card or button backgrounds — the glow comes from borders, shadows, and text, not from surface color
- Don't round card corners — `border-radius: 0` is the rule. Only tags/badges get 2px radius.
- Don't use pure white (`#ffffff`) for body text — `#c8d6e5` is the primary text color
- Don't mix font roles — Orbitron never narrates, Rajdhani never announces, Share Tech Mono never headlines
- Don't use warm colors in the UI chrome — the palette is cold (blue-black, cyan, magenta). The only warm tones are yellow (highlight) and orange (urgency timer)
- Don't add shadows under cards — depth comes from surface color and glow, not from drop shadows
- Don't remove the navbar neon gradient streak — it's the signature visual element
- Don't apply glow effects to body text — glow is reserved for headlines, scores, active states, and tags
- Don't use letter-spacing below 2px on Orbitron tags — wide tracking is the identity
- Don't use the yellow accent for interactive elements — yellow is for status (gold rank, success) only
- Don't lighten the `#030308` background — the darkness is load-bearing. Lighter backgrounds break the cyberpunk atmosphere

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <768px | Single column, bottom nav visible, hamburger menu |
| Tablet | 768px–1024px | Two-column grids, expanded nav |
| Desktop | >1024px | Full layout, 3-column grids, top nav only |

### Collapsing Strategy
- **Navigation**: Full horizontal nav → hamburger menu at mobile. Fixed bottom nav (`MobileBottomNav`) appears on mobile with 4 key tabs.
- **Content cards**: 3-column → 2-column → stacked single column
- **Video thumbnails**: Maintain 16:9 aspect ratio at all sizes
- **Countdown timer**: 4-column digit grid remains horizontal but digits scale down
- **Scoreboard**: Score inputs and digit displays scale proportionally
- **Section titles**: Font size and spacing remain consistent — Orbitron 10px is already compact
- **Footer**: 4-column grid → 2-column → stacked on mobile

### Touch Targets
- Mobile bottom nav tabs: full-width segments with adequate height
- Interactive cards: full card is tappable
- Score stepper buttons (+/−): minimum 44px touch target
- Navigation links: adequate padding for finger taps
- Safe area inset: bottom nav accounts for device notches (`pb-safe`)

## 9. Animation System

### Entrance Animations
| Name | Duration | Easing | Effect | Use |
|------|----------|--------|--------|-----|
| `fade-in` | 0.6s | ease-out | Opacity 0→1 + translateY(20px→0) | Page sections, card entrance |
| `slide-up` | 0.3s | ease-out | Opacity 0→1 + translateY(10px→0) | Tooltips, dropdown menus |

**Staggered delays**: `.animate-fade-in-delay` (0.2s) and `.animate-fade-in-delay-2` (0.4s) for cascading card entrances.

### Ambient Animations
| Name | Duration | Easing | Effect | Use |
|------|----------|--------|--------|-----|
| `pulse-soft` | 2s | ease-in-out, infinite | Opacity 1→0.6→1 | Subtle breathing indicators |
| `blink-live` | 1.5s | step-end, infinite | Opacity 1→0.3→1 | LIVE badge indicator |
| `glow-cyan` | 3s | ease-in-out, infinite | text-shadow 8px→16px→8px | Pulsing headline glow |
| `accent-pulse` | 3s | ease-in-out, infinite | box-shadow 8px→20px | Card or element glow breathing |
| `glow-border` | 3s | ease-in-out, infinite | border-color opacity 0.13→0.4 | Interactive border pulsing |

### Animation Principles
- **Entrances are fast**: 0.3–0.6s. No slow fades — content snaps into existence like a terminal loading.
- **Ambient loops are slow**: 2–3s cycles. Glows breathe gently, never frantically.
- **Step timing for blinks**: The LIVE indicator uses `step-end` for a hard on/off blink, not a smooth fade — mimicking LED indicators.
- **No exit animations**: Content doesn't animate out. It appears; it doesn't leave. Terminal aesthetic.

## 10. Agent Prompt Guide

### Quick Color Reference
- Page background: `#030308`
- Card/surface background: `#06060f`
- Primary accent (cyan): `#00ffff` with glow `0 0 8px #00ffff`
- Secondary accent (magenta): `#ff00ff` with glow `0 0 8px #ff00ff`
- Highlight accent (yellow): `#ffee00` with glow `0 0 5px #ffee00`
- Primary text: `#c8d6e5`
- Muted text: `#8899aa`
- Dim text: `#556677`
- Default border: `rgba(0, 255, 255, 0.13)`
- Card border: `#0d0d22`
- Success: `#22C55E`
- Danger: `#EF4444`

### Font Quick Reference
- Headlines/scores/tags: `font-family: var(--font-display)` (Orbitron) — always uppercase
- Body/nav/buttons: `font-family: var(--font-body)` (Rajdhani) — weight 500–700
- Data/timestamps/labels: `font-family: var(--font-mono)` (Share Tech Mono)

### Example Component Prompts
- "Create a match card on `#06060f` background with `1px solid #0d0d22` border, `border-radius: 0`. Team names in Orbitron 14px weight 700 uppercase, color `#c8d6e5`. Score digits in Orbitron 26px weight 900 color `#00ffff` with `text-shadow: 0 0 12px #00ffff`. Match time in Share Tech Mono 10px color `#8899aa`. LIVE badge: `background: rgba(0, 255, 255, 0.08)`, `border: 1px solid rgba(0, 255, 255, 0.4)`, `color: #00ffff`, Orbitron 9px, `animation: blink-live 1.5s step-end infinite`."
- "Create a section header: Orbitron 10px weight 700, `letter-spacing: 3px`, uppercase, color `#00ffff`, `text-shadow: 0 0 8px #00ffff`. Before pseudo-element: 2px wide, 14px tall, `background: #00ffff`, `box-shadow: 0 0 6px #00ffff`. Bottom border: `1px solid rgba(0, 255, 255, 0.2)`."
- "Build a stats table: `#06060f` background, `border-radius: 0`. Column headers in Share Tech Mono 9px uppercase `letter-spacing: 1px` color `#556677`. Data cells in Share Tech Mono 14px color `#c8d6e5`. Highlight row: `background: rgba(0, 255, 255, 0.04)`. Top 3 rows: gold emoji medals, rank text in `#ffee00`."
- "Create a countdown timer: 4-column grid. Digits in Orbitron 26px weight 900 color `#00ffff` with `text-shadow: 0 0 12px #00ffff, 0 0 24px rgba(0, 255, 255, 0.4)`. Labels in Share Tech Mono 9px uppercase color `#2a3a4a` `letter-spacing: 1px`. Container: `background: rgba(0, 255, 255, 0.06)`, `border: 1px solid rgba(0, 255, 255, 0.2)`."

### Iteration Guide
1. Start every component on `#030308` or `#06060f` — never lighter
2. Apply Orbitron only to display text (uppercase, wide-tracked) — everything else is Rajdhani or Share Tech Mono
3. Neon colors appear as glows and tints, never as solid fills — always use `rgba()` at low opacity for backgrounds
4. Cards have `border-radius: 0` — this is non-negotiable
5. Interactive elements get `transition: border-color 0.2s ease` and brighten toward cyan on hover
6. Live/active indicators use `animation: blink-live 1.5s step-end infinite` — hard blink, not soft pulse
7. Score and countdown numbers always use `font-variant-numeric: tabular-nums`
8. Category labels are prefixed with `//` in Share Tech Mono (e.g., `// NEWS`, `// ANALYSIS`)
9. The navbar gradient streak (`transparent → cyan → magenta → cyan → transparent`) should appear on any top-level navigation
10. When in doubt, make it darker and add a subtle cyan glow — not brighter and more colorful
