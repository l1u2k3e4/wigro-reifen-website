import type { Config } from 'tailwindcss'

/**
 * WIGRO Reifen — Tailwind Design-System Config
 * Brand: Automotive/Werkstatt, Witten
 * Primärfarbe: WIGRO Navy-Blau (aus Logo: ~#1F2D4B)
 * Akzent: Lime-Grün (Logo-Streifen: #C8E632)
 * WCAG AA: brand-white auf brand-blue (#1F2D4B) = 11.3:1 ✓
 */

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {

      // ──────────────────────────────────────────────
      // FARBEN
      // ──────────────────────────────────────────────
      colors: {
        brand: {
          // ── Primäre Markenfarbe — Navy-Blau (aus Logo) ──
          blue:          '#1F2D4B',    // WIGRO Navy-Blau — Nav, Footer, Akzente
          blueLight:     '#2B4065',    // Hover-State auf brand-blue
          blueDark:      '#101B32',    // Dunklere Variante (Footer-Bottom-Bar)

          // Hintergründe
          bg:            '#FFFFFF',    // Haupthintergrund
          surface:       '#EEF3FA',    // Alternierender Section-Hintergrund (leichtes Blau)

          // Marken-Grün (Logo-Streifen: Lime — für CTAs und Akzente)
          wigro:         '#C8E632',    // Logo-Lime — dekorative Akzente
          accent:        '#1F2D4B',    // Primäre Aktionsfarbe = Navy-Blau
          accentHover:   '#2B4065',    // Hover
          accentLight:   '#EEF3FA',    // Sehr helles Blau — Badges, Tags, Chip-Hintergründe
          success:       '#16A34A',    // Bestätigungen

          // CTA-Farbe (Lime-Grün für hervorstechende Buttons)
          cta:           '#C8E632',    // Lime-Grün — primäre CTA-Buttons
          ctaHover:      '#B5D020',    // Dunkleres Lime
          ctaText:       '#101B32',    // Dunkler Text auf Lime (Kontrast 12.1:1 ✓)

          // Textfarben
          heading:       '#1A1A1A',    // Überschriften — Fast-Schwarz, max. Kontrast (17.1:1)
          body:          '#374151',    // Fließtext — Gray-700 (9.0:1 auf Weiß ✓)
          muted:         '#6B7280',    // Sekundärtext, Labels — Gray-500 (4.6:1 auf Weiß ✓)
          white:         '#FFFFFF',    // Weiß für Text auf dunklen Hintergründen

          // UI-Elemente
          border:        '#E5E7EB',    // Subtile Trennlinien — Gray-200
          light:         '#F9FAFB',    // Helle Hintergründe für Cards — Gray-50
          callout:       '#EEF3FA',    // Highlight-Boxen — helles Blau
          calloutBorder: '#93B5D6',    // Rahmen für Callouts — Blau-300
          tableHeader:   '#DBEAFE',    // Tabellenkopf — Blue-100
        },
      },

      // ──────────────────────────────────────────────
      // TYPOGRAFIE
      // ──────────────────────────────────────────────
      fontFamily: {
        // Display + Body: Jost — geometrisch, Futura-ähnlich, modern
        display: ['Jost', 'sans-serif'],
        body: ['Jost', 'sans-serif'],
        sans: ['Jost', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Einheitliche Typografie-Scale
        'xs':   ['0.75rem',  { lineHeight: '1rem' }],           // 12px — Labels
        'sm':   ['0.875rem', { lineHeight: '1.25rem' }],        // 14px — Sekundärtext
        'base': ['1rem',     { lineHeight: '1.625rem' }],       // 16px — Body (min. Mobile)
        'lg':   ['1.125rem', { lineHeight: '1.75rem' }],        // 18px — Größerer Body
        'xl':   ['1.25rem',  { lineHeight: '1.75rem' }],        // 20px — Subheadlines
        '2xl':  ['1.5rem',   { lineHeight: '2rem' }],           // 24px — Section-Titel
        '3xl':  ['1.875rem', { lineHeight: '2.25rem' }],        // 30px — Überschriften
        '4xl':  ['2.25rem',  { lineHeight: '2.5rem' }],         // 36px — Hero-Subline
        '5xl':  ['3rem',     { lineHeight: '1.15' }],           // 48px — Hero-Headline
        '6xl':  ['3.75rem',  { lineHeight: '1.1' }],            // 60px — Max Hero
      },

      fontWeight: {
        normal:      '400',
        medium:      '500',
        semibold:    '600',
        bold:        '700',
        extrabold:   '800',
      },

      // ──────────────────────────────────────────────
      // ABSTÄNDE & LAYOUT
      // ──────────────────────────────────────────────
      maxWidth: {
        content: '1200px',    // Standard Content-Breite
        narrow:  '800px',     // Schmalere Layouts (Kontakt, Impressum)
      },

      spacing: {
        // Section-Abstände
        'section':    '6rem',   // 96px — Desktop Section-Padding
        'section-sm': '4rem',   // 64px — Mobile Section-Padding
      },

      // ──────────────────────────────────────────────
      // SCHATTEN
      // ──────────────────────────────────────────────
      boxShadow: {
        // Standard Card-Schatten
        'card':
          '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        // Card-Hover — stärkeres Lifting
        'card-hover':
          '0 10px 25px -5px rgb(0 0 0 / 0.12), 0 4px 8px -4px rgb(0 0 0 / 0.08)',
        // Blauer Glow für CTAs (brand-blue = #1F2D4B)
        'glow':
          '0 0 20px 0 rgb(31 45 75 / 0.30)',
        // Großer Glow — Hero-Buttons, besonders hervorgehoben
        'glow-lg':
          '0 0 40px 0 rgb(31 45 75 / 0.40), 0 8px 16px -4px rgb(31 45 75 / 0.20)',
        // Navigationsleiste
        'nav':
          '0 2px 8px 0 rgb(0 0 0 / 0.08)',
        // Floating-Elemente (Modals, Dropdowns)
        'float':
          '0 20px 40px -8px rgb(0 0 0 / 0.15), 0 8px 16px -4px rgb(0 0 0 / 0.08)',
      },

      // ──────────────────────────────────────────────
      // BORDER RADIUS
      // ──────────────────────────────────────────────
      borderRadius: {
        'card':   '12px',    // Cards, Sections, Service-Boxen
        'btn':    '8px',     // Buttons
        'badge':  '6px',     // Badges, Tags, Chips
        'icon':   '10px',    // Icon-Wrapper
      },

      // ──────────────────────────────────────────────
      // KEYFRAMES & ANIMATIONEN
      // ──────────────────────────────────────────────
      keyframes: {
        // Standard Scroll-Animation — Elemente fahren von unten ein
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(24px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        // CTA-Button Puls — zieht Aufmerksamkeit auf sich
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px 0 rgb(31 45 75 / 0.30)',
          },
          '50%': {
            boxShadow: '0 0 40px 0 rgb(31 45 75 / 0.55)',
          },
        },
        // Marquee für Partner-Karussell
        marquee: {
          '0%':   { transform: 'translateX(0) translateZ(0)' },
          '100%': { transform: 'translateX(-33.333%) translateZ(0)' },
        },
        // Dezentes Fade-In — für Trust-Badges, Bewertungen
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // Subtle Scale-Up — für Cards beim Hover
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        // Testimonials — vertikaler Endlos-Scroll (GPU-beschleunigt)
        scrollUp: {
          '0%':   { transform: 'translateY(0) translateZ(0)' },
          '100%': { transform: 'translateY(-50%) translateZ(0)' },
        },
        // Hero Chevron — sanftes Hüpfen (GPU-beschleunigt)
        bounceChevron: {
          '0%, 100%': { transform: 'translateY(0) translateZ(0)' },
          '50%':      { transform: 'translateY(8px) translateZ(0)' },
        },
      },

      animation: {
        // Scroll-Animationen (Framer Motion bevorzugt, Fallback mit CSS)
        'fade-in-up':      'fadeInUp 0.5s ease-out both',
        'fade-in-up-slow': 'fadeInUp 0.7s ease-out both',
        'fade-in':         'fadeIn 0.3s ease-out both',
        'scale-in':        'scaleIn 0.3s ease-out both',
        // CTA-Puls
        'pulse-glow':      'pulseGlow 2.5s ease-in-out 2',
        // Partner-Karussell
        'marquee':         'marquee 30s linear infinite',
        // Testimonials — vertikaler Scroll (Dauer via CSS Custom Property)
        'scroll-up':       'scrollUp var(--scroll-duration, 15s) linear infinite',
        // Hero Chevron-Bounce
        'bounce-chevron':  'bounceChevron 2s ease-in-out 3',
      },

      // ──────────────────────────────────────────────
      // ÜBERGÄNGE
      // ──────────────────────────────────────────────
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
      },

      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ──────────────────────────────────────────────
      // Z-INDEX SCALE
      // ──────────────────────────────────────────────
      zIndex: {
        'nav':     '40',     // Navigationsleiste
        'overlay': '50',     // Overlay/Scrim
        'modal':   '60',     // Modals
        'toast':   '100',    // Toast-Benachrichtigungen
      },

    },
  },
  plugins: [],
}

export default config
