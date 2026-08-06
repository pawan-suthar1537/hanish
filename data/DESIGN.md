---
name: Stellar Ledger
colors:
  surface: '#fbf9fb'
  surface-dim: '#dbd9db'
  surface-bright: '#fbf9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f5'
  surface-container: '#efedef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#44474d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f2f0f2'
  outline: '#75777e'
  outline-variant: '#c5c6cd'
  surface-tint: '#515f78'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0d1c32'
  on-primary-container: '#76849f'
  inverse-primary: '#b9c7e4'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e4e2e1'
  on-secondary-container: '#656464'
  tertiary: '#735c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cba72f'
  on-tertiary-container: '#4e3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#e4e2e1'
  secondary-fixed-dim: '#c8c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#ffe088'
  tertiary-fixed-dim: '#e9c349'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#574500'
  background: '#fbf9fb'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

This design system is built for a premium financial services environment where trust meets modern efficiency. The brand personality is rooted in the "Chartered Accountant" persona: authoritative yet accessible, precise but not cold. 

The design style leans into **Corporate Modernism** with a **Minimalist** execution. It utilizes generous white space to reduce cognitive load—essential for data-heavy financial environments—and employs high-quality typography to convey a sense of heritage and precision. The emotional response should be one of "quiet confidence": the user feels their assets are in steady, expert hands.

## Colors

The palette is anchored by **Deep Navy (#0A192F)**, which serves as the primary driver for navigation, headers, and primary actions, providing a sense of stability. **Charcoal (#333333)** is reserved for body text and secondary iconography to ensure high legibility without the harshness of pure black.

**Gold/Amber (#D4AF37)** is used sparingly as a high-intent accent color. It marks success states, premium features, or primary call-to-action highlights. The background is an off-white **(#FAFAFA)** to reduce screen glare and distinguish the UI from generic "pure white" white-label software.

## Typography

The system utilizes **Hanken Grotesk** for headings to provide a sharp, contemporary edge that feels more distinctive than standard system fonts. Its geometric clarity reflects mathematical precision. 

**Inter** is selected for body text and UI labels due to its exceptional legibility in data-heavy tables and financial forms. Use `label-md` for table headers and small captions to maintain an organized, professional hierarchy. On mobile devices, large display type scales down to ensure content remains above the fold.

## Layout & Spacing

This design system employs a **Fluid Grid** model based on an 8px square baseline. 

- **Desktop (1440px+):** 12-column grid with 40px outer margins and 24px gutters. Content is typically centered in a maximum container width of 1280px.
- **Tablet (768px - 1024px):** 8-column grid with 24px margins.
- **Mobile (Under 768px):** 4-column grid with 16px margins. 

Layouts should prioritize vertical rhythm, using `xl` (80px) spacing between major sections and `md` (24px) for internal component padding.

## Elevation & Depth

To maintain a premium feel, the design system avoids heavy shadows. Instead, it uses **Ambient Shadows** and **Tonal Layers**:

1.  **Level 0 (Base):** The background color (#FAFAFA).
2.  **Level 1 (Cards/Surface):** White (#FFFFFF) surfaces with a very soft, diffused shadow (0px 4px 20px rgba(10, 25, 47, 0.05)).
3.  **Level 2 (Dropdowns/Modals):** White surfaces with a more pronounced shadow (0px 12px 32px rgba(10, 25, 47, 0.12)).

Subtle linear gradients (e.g., Primary Navy to a slightly lighter tint) can be applied to large buttons or header hero sections to prevent a "flat" corporate look.

## Shapes

The shape language is defined by **Rounded (0.5rem / 8px)** corners for standard UI components like input fields and buttons. Larger containers, such as dashboard cards and content modules, should use **rounded-lg (1rem / 16px)** to create a softer, more approachable architectural feel. 

Interactive elements like "tags" or "pills" may use a fully rounded radius to distinguish them from structural elements.

## Components

- **Buttons:** Primary buttons use the Navy Blue (#0A192F) with white text. Secondary buttons use a Navy Blue outline. Accent buttons (for high-value conversions) use the Gold (#D4AF37) background.
- **Cards:** White background, 16px corner radius, and the Level 1 shadow. Use a 2px top-border in Gold for "Premium" or "Active" card states.
- **Input Fields:** 8px corner radius, 1px light grey border (#E2E8F0). Focus state uses a 2px Navy Blue border.
- **Lists & Tables:** Clean, no-border design. Use subtle dividers (#F1F5F9) and a light grey hover state (#F8FAFC). Row height should be generous (min 56px) to ensure financial data is readable.
- **Chips/Status Indicators:** Use soft background tints of the status color (e.g., light green for "Paid") with dark text to maintain the sophisticated palette.
- **Data Visualizations:** Charts should use the Navy as the primary data point, with Gold for highlights and Charcoal for secondary comparisons.