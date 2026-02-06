
// ──────────────────────────────────────────────────────────
// LIGHT
// ──────────────────────────────────────────────────────────
export const lightColors = {
  // ── base surfaces & text ──
  background: "#FFFFFF",
  text:       "#1C1C1C",       // primary text everywhere
  card:       "#FFFFFF",
  option:     "#F9FAFB",       // card / list-item background

  // ── borders & dividers ──
  border:     "#E5E7EB",       // input borders, card outlines
  divider:    "#F3F4F6",       // header bottom-border, chip default bg, subtle separators

  // ── brand / action ──
  primary:    "#1d154a",       // nav bar, brand headers
  accent:     "#4F46E5",       // selected chips, action buttons, active states
  accentText: "#FFFFFF",       // text that sits ON an accent-coloured surface
  button:     "#FFA500",       // CTA buttons (orange)

  // ── secondary & muted text ──
  subtext:    "#6B7280",       // labels, helper text, filter-chip default text
  muted:      "#9CA3AF",       // dates, counts, empty-state descriptions

  // ── status colours ──
  danger:     "#EF4444",       // error text, delete icons, badge dot
  dangerBg:   "rgba(239, 68, 68, 0.1)",   // background behind danger text/badges
  warning:    "#F59E0B",       // pending text
  warningBg:  "rgba(245, 158, 11, 0.1)",  // background behind warning text/badges
  success:    "#10B981",       // success text / icons
  successBg:  "rgba(16, 185, 129, 0.1)",  // background behind success text/badges

  // ── UPI / misc ──
  upi:        "#CCC",
};

// ──────────────────────────────────────────────────────────
// DARK
// ──────────────────────────────────────────────────────────
export const darkColors = {
  // ── base surfaces & text ──
  background: "#1C1C1C",
  text:       "#FFFFFF",
  card:       "#1A1A1A",
  option:     "#2C2C2E",       // card / list-item background

  // ── borders & dividers ──
  border:     "#3A3A3C",       // input borders, card outlines
  divider:    "#3A3A3C",       // header bottom-border, chip default bg

  // ── brand / action ──
  primary:    "#FFA500",
  accent:     "#7C7FFF",       // slightly lighter indigo so it pops on dark
  accentText: "#FFFFFF",
  button:     "#FFA500",

  // ── secondary & muted text ──
  subtext:    "#8E8E93",
  muted:      "#636366",

  // ── status colours ──
  danger:     "#EF4444",
  dangerBg:   "rgba(239, 68, 68, 0.15)",
  warning:    "#F59E0B",
  warningBg:  "rgba(245, 158, 11, 0.15)",
  success:    "#10B981",
  successBg:  "rgba(16, 185, 129, 0.15)",

  // ── UPI / misc ──
  upi:        "#FFA500",
};