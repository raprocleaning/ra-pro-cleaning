interface LogoProps {
  variant?: 'color' | 'white'
  className?: string
}

const Logo = ({ variant = 'color', className = '' }: LogoProps) => {
  const rColor  = variant === 'white' ? '#FFFFFF' : '#6B8DC8'   // steel blue
  const aColor  = variant === 'white' ? '#FFFFFF' : '#8BAD88'   // sage green
  const t1Color = variant === 'white' ? '#FFFFFF' : '#6B8DC8'   // "R.A" — blue
  const t2Color = variant === 'white' ? '#FFFFFF' : '#2C4A5A'   // "PRO CLEANING" — navy

  const sw = 7.5   // stroke-width

  return (
    <svg
      viewBox="0 0 275 295"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="R A Pro Cleaning Services logo"
    >
      {/* ══════════════════════════════════════════
          R — Steel Blue — 3 parallel lines
          Parts: left stem · upper bowl · diagonal leg
         ══════════════════════════════════════════ */}

      {/* Left stem — 3 parallel verticals, full height */}
      <line x1="48"  y1="24" x2="48"  y2="220" stroke={rColor} strokeWidth={sw} strokeLinecap="round"/>
      <line x1="61"  y1="24" x2="61"  y2="220" stroke={rColor} strokeWidth={sw} strokeLinecap="round"/>
      <line x1="74"  y1="24" x2="74"  y2="220" stroke={rColor} strokeWidth={sw} strokeLinecap="round"/>

      {/* Bowl (upper-half D-shape) — 3 parallel cubic arcs */}
      {/* Each arc: from top of stem, curves right & peaks, back to stem at mid-height */}
      <path d="M 48 24  C 48 24  210 24  210 122 C 210 220 48 220" stroke={rColor} strokeWidth={sw} strokeLinecap="round"/>
      <path d="M 61 35  C 61 35  196 35  196 122 C 196 210 61 210" stroke={rColor} strokeWidth={sw} strokeLinecap="round"/>
      <path d="M 74 46  C 74 46  182 46  182 122 C 182 200 74 200" stroke={rColor} strokeWidth={sw} strokeLinecap="round"/>

      {/* Leg — 3 parallel diagonals (lower-right of bowl → bottom-right) */}
      <line x1="162" y1="220" x2="215" y2="220" stroke={rColor} strokeWidth={sw} strokeLinecap="round"/>
      <line x1="154" y1="210" x2="207" y2="218" stroke={rColor} strokeWidth={sw} strokeLinecap="round"/>
      <line x1="146" y1="200" x2="199" y2="216" stroke={rColor} strokeWidth={sw} strokeLinecap="round"/>

      {/* ══════════════════════════════════════════
          A — Sage Green — 3 parallel arch curves
          Rounded arch (∩) nested inside the R bowl
          Arch endpoints sit inside/at-edge of R;
          peak rises into upper bowl area
         ══════════════════════════════════════════ */}

      {/* Arch 1 — outermost */}
      <path d="M 88 215 C 88 38 228 38 228 215" stroke={aColor} strokeWidth={sw} strokeLinecap="round"/>
      {/* Arch 2 — middle */}
      <path d="M 97 210 C 97 52 220 52 220 210" stroke={aColor} strokeWidth={sw} strokeLinecap="round"/>
      {/* Arch 3 — innermost */}
      <path d="M 106 205 C 106 66 212 66 212 205" stroke={aColor} strokeWidth={sw} strokeLinecap="round"/>

      {/* ══════════════════════════════
          TEXT — R.A PRO CLEANING
         ══════════════════════════ */}
      <text
        y="263"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="21"
        letterSpacing="3"
      >
        {/* "R.A" in steel blue, normal weight */}
        <tspan x="38" fill={t1Color} fontWeight="400">R.A</tspan>
        {/* "PRO CLEANING" in dark navy, bold */}
        <tspan fill={t2Color} fontWeight="700"> PRO CLEANING</tspan>
      </text>
    </svg>
  )
}

export default Logo
