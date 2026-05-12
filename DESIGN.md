---
name: Artisanal Culinary System
source: Stitch Project — Gourmet Catering Portal (projects/16041509207529346143)
device: Desktop
colorMode: Light

colors:
  # --- Surface Scale ---
  surface:                   '#fcf9f1'
  surface-dim:               '#dddad2'
  surface-bright:            '#fcf9f1'
  surface-container-lowest:  '#ffffff'
  surface-container-low:     '#f7f3eb'
  surface-container:         '#f1eee5'
  surface-container-high:    '#ebe8e0'
  surface-container-highest: '#e5e2da'
  surface-variant:           '#e5e2da'
  surface-tint:              '#775a19'

  # --- On-Surface ---
  on-surface:         '#1c1c17'
  on-surface-variant: '#4e4639'
  inverse-surface:    '#31312b'
  inverse-on-surface: '#f4f0e8'

  # --- Outline ---
  outline:         '#7f7667'
  outline-variant: '#d1c5b4'

  # --- Primary (Gold) ---
  primary:               '#775a19'
  on-primary:            '#ffffff'
  primary-container:     '#c5a059'
  on-primary-container:  '#4e3700'
  inverse-primary:       '#e9c176'
  primary-fixed:         '#ffdea5'
  primary-fixed-dim:     '#e9c176'
  on-primary-fixed:      '#261900'
  on-primary-fixed-variant: '#5d4201'

  # --- Secondary (Charcoal Neutral) ---
  secondary:               '#5f5e5e'
  on-secondary:            '#ffffff'
  secondary-container:     '#e4e2e1'
  on-secondary-container:  '#656464'
  secondary-fixed:         '#e4e2e1'
  secondary-fixed-dim:     '#c8c6c6'
  on-secondary-fixed:      '#1b1c1c'
  on-secondary-fixed-variant: '#474747'

  # --- Tertiary (Warm Gray) ---
  tertiary:               '#5e5e5b'
  on-tertiary:            '#ffffff'
  tertiary-container:     '#a6a5a1'
  on-tertiary-container:  '#3b3b38'
  tertiary-fixed:         '#e4e2dd'
  tertiary-fixed-dim:     '#c8c6c2'
  on-tertiary-fixed:      '#1b1c19'
  on-tertiary-fixed-variant: '#474744'

  # --- Error ---
  error:              '#ba1a1a'
  on-error:           '#ffffff'
  error-container:    '#ffdad6'
  on-error-container: '#93000a'

  # --- Background ---
  background:    '#fcf9f1'
  on-background: '#1c1c17'

  # --- Override Aliases (Semantic) ---
  color-primary:   '#c5a059'   # Primary Gold — CTAs, accents
  color-secondary: '#2d2d2d'   # Deep Charcoal — text, structure
  color-tertiary:  '#f9f7f2'   # Warm Cream — base canvas
  color-neutral:   '#e5e2da'   # Secondary Neutral — borders, depth

typography:
  display-lg:
    fontFamily:    'Playfair Display'
    fontSize:      '4.5rem'
    fontWeight:    '700'
    lineHeight:    '1.1'
    letterSpacing: '-0.02em'

  headline-lg:
    fontFamily: 'Playfair Display'
    fontSize:   '3rem'
    fontWeight: '600'
    lineHeight: '1.2'

  headline-lg-mobile:
    fontFamily: 'Playfair Display'
    fontSize:   '2.25rem'
    fontWeight: '600'
    lineHeight: '1.2'

  headline-md:
    fontFamily: 'Playfair Display'
    fontSize:   '2rem'
    fontWeight: '500'
    lineHeight: '1.3'

  body-lg:
    fontFamily: 'Montserrat'
    fontSize:   '1.125rem'
    fontWeight: '400'
    lineHeight: '1.7'

  body-md:
    fontFamily: 'Montserrat'
    fontSize:   '1rem'
    fontWeight: '400'
    lineHeight: '1.6'

  label-caps:
    fontFamily:    'Montserrat'
    fontSize:      '0.75rem'
    fontWeight:    '600'
    lineHeight:    '1.0'
    letterSpacing: '0.15em'

  quote:
    fontFamily: 'Playfair Display'
    fontSize:   '1.5rem'
    fontWeight: '400'
    lineHeight: '1.5'

  # Font role assignments
  headlineFontFamily: 'Playfair Display'
  bodyFontFamily:     'Montserrat'
  labelFontFamily:    'Montserrat'

rounded:
  sm:      '0.125rem'   # 2px
  DEFAULT: '0.25rem'    # 4px  — standard components (inputs, buttons)
  md:      '0.375rem'   # 6px
  lg:      '0.5rem'     # 8px
  xl:      '0.75rem'    # 12px — interactive chips/tags
  full:    '9999px'     # pill shape

spacing:
  unit:          '8px'     # base rhythm unit
  container-max: '1280px'  # max content width (12-col grid)
  gutter:        '24px'    # column gutter
  margin-desktop: '64px'   # page margin — desktop
  margin-mobile:  '20px'   # page margin — mobile
  section-gap:   '120px'   # vertical gap between page sections
---

## Brand & Style

The design system is rooted in the philosophy of **"Quiet Luxury."** It targets a discerning clientele who values precision, heritage, and sensory excellence. The visual language balances the warmth of a bespoke kitchen with the professional rigour of high-end hospitality.

The style is **Minimalist with Tactile Accents**. It leverages generous white space to allow high-resolution food photography to act as the primary visual hero. Sophistication is achieved not through complexity, but through the deliberate use of high-contrast typography, hairline borders, and a restricted, prestigious color palette. The emotional goal is to evoke a sense of calm reliability and epicurean mastery.

---

## Colors

The palette is designed to feel organic yet expensive.

| Token | Hex | Role |
|---|---|---|
| Primary Gold | `#C5A059` | High-impact CTAs, decorative accents — use sparingly |
| Deep Charcoal | `#2D2D2D` | Primary text, structural grounding — ink-like, modern |
| Warm Cream | `#F9F7F2` | Base canvas — linen/parchment feel, soft and inviting |
| Secondary Neutral | `#E5E2DA` | Subtle borders, background depth shifts |

- **Primary Gold (`#C5A059`):** Reserved for moments of conversion and celebration. Use sparingly for high-impact calls to action and delicate decorative elements.
- **Deep Charcoal (`#2D2D2D`):** Used for all primary text and structural grounding. A modern alternative to pure black — softer, more "ink-like."
- **Warm Cream (`#F9F7F2`):** The foundation of the system. A softer canvas than clinical white, reminiscent of high-quality linen or parchment.
- **Secondary Neutral (`#E5E2DA`):** Used for subtle borders and background shifts to create depth without introducing new hues.

---

## Typography

The typography strategy employs a classic **"Serif for Spirit, Sans for Service"** approach.

| Role | Family | Scale | Weight |
|---|---|---|---|
| Display / Hero | Playfair Display | 4.5rem | 700 |
| Headline Large | Playfair Display | 3rem | 600 |
| Headline Medium | Playfair Display | 2rem | 500 |
| Quote / Pull | Playfair Display | 1.5rem | 400 |
| Body Large | Montserrat | 1.125rem | 400 |
| Body Medium | Montserrat | 1rem | 400 |
| Labels / Micro-copy | Montserrat | 0.75rem | 600 + 0.15em tracking |

- **Playfair Display** carries the editorial weight. Set with tight leading (`1.1`) in large sizes to emphasize its elegant, high-contrast strokes.
- **Montserrat** provides the functional backbone. Set with slightly increased tracking in body copy for legibility against the cream background.
- **Micro-copy** and secondary navigation use `label-caps` to provide a rhythmic, organized structure to menus or pricing tiers.

> **Google Fonts import:**
> `Playfair Display` (wght: 400, 500, 600, 700) + `Montserrat` (wght: 400, 600)

---

## Layout & Spacing

This design system uses a **Fixed Grid** model for desktop to maintain an editorial, magazine-like composition.

- **Grid:** 12-column grid, max container width `1280px`
- **Rhythm:** Vertical rhythm governed by an `8px` base unit. Section spacing is generous (`120px`) for the "breathability" expected of a premium service.
- **Gutters:** `24px` column gutters; `64px` page margins on desktop.
- **Mobile:** Margins shrink to `20px`; layout collapses to a single column, prioritizing large typography and full-width imagery.

---

## Elevation & Depth

Depth is communicated through **Tonal Layering** and **Low-Contrast Outlines** — not aggressive shadows.

- **Surface Tiering:** Base layer is Warm Cream (`#fcf9f1`). Secondary containers (cards, menu sections) use a slightly lighter white (`#ffffff`) or a subtle `Secondary Neutral` border.
- **Borders:** Use `0.5px` or `1px` hairlines in Deep Charcoal at `15%` opacity for structure without visual clutter.
- **Hover Shadows:** Use a single, highly diffused ambient shadow only on hover:
  ```css
  box-shadow: 0px 12px 32px rgba(45, 45, 45, 0.05);
  ```
  It should feel like a soft glow — not a physical lift.

---

## Shapes

The shape language is **Soft and Architectural**.

| Token | Value | Use |
|---|---|---|
| `rounded-sm` | `0.125rem` (2px) | Decorative hairlines |
| `rounded` (default) | `0.25rem` (4px) | Inputs, buttons — professional but not harsh |
| `rounded-md` | `0.375rem` (6px) | Small cards |
| `rounded-lg` | `0.5rem` (8px) | Larger containers |
| `rounded-xl` | `0.75rem` (12px) | Chips, interactive tags — organic touchpoints |
| `rounded-full` | `9999px` | Pill badges, avatars |

- Food and dish imagery: sharp-edged or extremely large, subtle curves to mimic fine dining plate geometry.
- Standard components: default `0.25rem` — disciplined, professional.
- Interactive chips/tags: `rounded-xl` for a softer, organic feel.

---

## Components

### Buttons
- **Primary:** Solid `Deep Charcoal` (`#2D2D2D`) background + `Warm Cream` text. High contrast.
- **Secondary:** `Gold` (`#C5A059`) border + `Deep Charcoal` text.
- All buttons use `label-caps` typography (Montserrat, 0.75rem, 600 weight, 0.15em tracking).

### Cards
- Borderless with a very subtle background shift or a `1px Secondary Neutral` border.
- Rely on internal padding (`32px+`) to separate content — no heavy shadows.
- Hover: apply ambient shadow `0px 12px 32px rgba(45, 45, 45, 0.05)`.

### Form Inputs
- Minimalist: underline-only or `1px` bordered box style.
- Placeholder text: `Montserrat` in lightened charcoal.
- Focus state: border transitions to Gold (`#C5A059`).

### Menu Lists
- Item names: `Playfair Display` (headline-md scale).
- Descriptions: `Montserrat` (body-md scale).
- Price points: `Gold` (`#C5A059`) — visible but secondary to the culinary description.

### Service Tier Card ("Signature Component")
- Thin `Gold` frame border.
- Centered typography.
- Used for premium wedding or corporate package highlights.
- Combines `headline-lg` (Playfair Display) with `label-caps` sub-labels.
