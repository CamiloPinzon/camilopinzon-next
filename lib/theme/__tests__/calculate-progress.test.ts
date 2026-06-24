import { describe, it, expect } from "vitest";
import {
  calculateThemeProgress,
  DAWN_START,
  DAY_START,
  DUSK_START,
  NIGHT_START,
} from "../calculate-progress";

// ─── Color helpers ────────────────────────────────────────────────────────────

function hexToLinear(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const linearize = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return [linearize(r), linearize(g), linearize(b)];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(lum1: number, lum2: number): number {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Simulates CSS color-mix(in srgb, colorDark p%, colorLight) */
function mixHex(hexLight: string, hexDark: string, progress: number): string {
  const [lr, lg, lb] = hexToLinear(hexLight).map((_, i) => {
    const light = parseInt(hexLight.slice(1 + i * 2, 3 + i * 2), 16);
    const dark = parseInt(hexDark.slice(1 + i * 2, 3 + i * 2), 16);
    return Math.round(light + (dark - light) * progress);
  });
  return `#${lr.toString(16).padStart(2, "0")}${lg.toString(16).padStart(2, "0")}${lb.toString(16).padStart(2, "0")}`;
}

// ─── Design system colors (from globals.css) ──────────────────────────────────

const CANVAS_LIGHT = "#fdfdfd";
const CANVAS_DARK = "#0f1012";
const INK_LIGHT = "#0f1012";
const INK_DARK = "#fdfdfd";

function getContrastAtProgress(progress: number): number {
  const bgHex = mixHex(CANVAS_LIGHT, CANVAS_DARK, progress);
  const textHex = mixHex(INK_LIGHT, INK_DARK, progress);
  const bgLum = relativeLuminance(hexToLinear(bgHex));
  const textLum = relativeLuminance(hexToLinear(textHex));
  return contrastRatio(bgLum, textLum);
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("calculateThemeProgress", () => {
  it("returns 0 (light) during full day", () => {
    // Spot-check middle of the day
    expect(calculateThemeProgress(12)).toBe(0);
    expect(calculateThemeProgress(DAY_START)).toBe(0);
    expect(calculateThemeProgress(DUSK_START - 0.01)).toBe(0);
  });

  it("returns 1 (dark) during full night", () => {
    expect(calculateThemeProgress(0)).toBe(1);    // midnight
    expect(calculateThemeProgress(3)).toBe(1);
    expect(calculateThemeProgress(NIGHT_START)).toBe(1);
    expect(calculateThemeProgress(23)).toBe(1);
  });

  it("transitions smoothly at dawn (6:00–7:30)", () => {
    const atDawnStart = calculateThemeProgress(DAWN_START);
    const atDayStart = calculateThemeProgress(DAY_START);
    expect(atDawnStart).toBe(1);  // still dark at 6:00
    expect(atDayStart).toBe(0);  // fully light by 7:30
    // 7:00 is 2/3 through dawn — should be closer to light
    const at7 = calculateThemeProgress(7);
    expect(at7).toBeGreaterThan(0);
    expect(at7).toBeLessThan(0.5);  // past the halfway point, trending light
  });

  it("transitions smoothly at dusk (19:00–20:30)", () => {
    const atDuskStart = calculateThemeProgress(DUSK_START);
    const atNightStart = calculateThemeProgress(NIGHT_START);
    expect(atDuskStart).toBe(0);  // still light at 19:00
    expect(atNightStart).toBe(1); // fully dark by 20:30
    // 20:00 is 2/3 through dusk — should be closer to dark
    const at20 = calculateThemeProgress(20);
    expect(at20).toBeGreaterThan(0.5);
    expect(at20).toBeLessThan(1);
  });

  it("handles hour values beyond 24 (wraps correctly)", () => {
    expect(calculateThemeProgress(25)).toBe(calculateThemeProgress(1));
    expect(calculateThemeProgress(-1)).toBe(calculateThemeProgress(23));
  });
});

describe("WCAG AA contrast (≥4.5:1) at every hour", () => {
  const WCAG_AA = 4.5;
  const label = (h: number) =>
    `${String(h).padStart(2, "0")}:00 (progress=${calculateThemeProgress(h).toFixed(3)})`;

  for (let hour = 0; hour < 24; hour++) {
    it(`passes at ${label(hour)}`, () => {
      const progress = calculateThemeProgress(hour);
      const ratio = getContrastAtProgress(progress);
      expect(ratio).toBeGreaterThanOrEqual(WCAG_AA);
    });
  }
});

describe("WCAG AA contrast at transition hours", () => {
  const WCAG_AA = 4.5;

  // 7:00 is 2/3 through the dawn window — worst whole-hour case during dawn
  it("passes at 7:00 AM (2/3 through dawn transition)", () => {
    const progress = calculateThemeProgress(7);
    expect(getContrastAtProgress(progress)).toBeGreaterThanOrEqual(WCAG_AA);
  });

  // 20:00 is 2/3 through the dusk window — worst whole-hour case during dusk
  it("passes at 20:00 (2/3 through dusk transition)", () => {
    const progress = calculateThemeProgress(20);
    expect(getContrastAtProgress(progress)).toBeGreaterThanOrEqual(WCAG_AA);
  });
});
