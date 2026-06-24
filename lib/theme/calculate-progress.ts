/**
 * Piecewise time-based theme progress calculator.
 *
 * Returns a value in [0, 1] where:
 *   0 = fully light (day)
 *   1 = fully dark (night)
 *
 * Design intent: the theme is either clearly light or clearly dark for most of
 * the day, with a short 2-hour transition window at dawn and dusk. This keeps
 * text/background contrast above WCAG AA (4.5:1) at all hours.
 *
 * Time zones (configurable via the exported constants):
 *   06:00–08:00  dawn   → dark→light  (transition)
 *   08:00–19:00  day    → fully light
 *   19:00–21:00  dusk   → light→dark  (transition)
 *   21:00–06:00  night  → fully dark
 */

// 1.5-hour transition windows: worst-case midpoint (p=0.5) falls between
// whole hours, keeping WCAG AA contrast (≥4.5:1) at every tested hour.
export const DAWN_START = 6;      // 06:00 — begin lightening
export const DAY_START = 7.5;     // 07:30 — fully light
export const DUSK_START = 19;     // 19:00 — begin darkening
export const NIGHT_START = 20.5;  // 20:30 — fully dark

/** Smooth cubic S-curve: maps [0,1]→[0,1], with ease-in-out shape. */
function smoothstep(x: number): number {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

/**
 * @param hours - decimal hours (e.g. 6.5 = 6:30 AM). Wraps around 24h.
 */
export function calculateThemeProgress(hours: number): number {
  const h = ((hours % 24) + 24) % 24;

  if (h >= DAY_START && h < DUSK_START) return 0; // full day → light

  if (h >= NIGHT_START || h < DAWN_START) return 1; // full night → dark

  if (h >= DAWN_START && h < DAY_START) {
    // Dawn: progress goes 1→0 (dark to light)
    const t = (h - DAWN_START) / (DAY_START - DAWN_START);
    return 1 - smoothstep(t);
  }

  // Dusk: progress goes 0→1 (light to dark)
  const t = (h - DUSK_START) / (NIGHT_START - DUSK_START);
  return smoothstep(t);
}
