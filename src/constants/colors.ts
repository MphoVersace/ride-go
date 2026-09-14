/**
 * RideGo Design System - 60-30-10 Color System
 *
 * Strict Color Distribution:
 * - 60% Dominant Background: Pure Black (#000000 / Obsidian)
 * - 30% Panel / Surface: Deep Navy Blue (#0B1938 / #0E2454) - Swapped Yellow
 * - 10% Accent / Text: Crisp Pure White (#FFFFFF) & Supporting Blue Harmony:
 *   • Ice Blue (#7DD3FC, #BAE6FD) - Telemetry, radar pulses, highlights
 *   • Medium Blue (#2563EB) - Navigation trajectory, interactive accents
 *   • Muted Blue-Gray (#94A3B8, #1E293B) - Secondary text, outlines, borders
 *
 * Ad-hoc rainbow status colors are strictly prohibited.
 */

export const colors = {
  // 60% - Dominant Background (Pure Black)
  background: {
    primary: "#000000",
    deep: "#050811",
  },

  // 30% - Panel / Surface / Structure (Deep Navy Blue)
  surface: {
    card: "#0D172E",
    cardAlt: "#101F3D",
    elevated: "#16294E",
    subtle: "#080D1A",
    border: "#1E293B",
    divider: "#0F172A",
  },

  // 30% / 10% - Deep Navy Brand Primary Action (Swapping Yellow)
  accent: {
    primary: "#0E2454", // Deep Navy primary container
    secondary: "#0B1938",
    hover: "#132B60",
    subtle: "rgba(14, 36, 84, 0.4)",
    contrast: "#FFFFFF", // High-contrast crisp white text on deep navy
  },

  // Supporting Blue Harmony Scale
  blue: {
    ice: "#7DD3FC",
    iceSoft: "#BAE6FD",
    medium: "#2563EB",
    mediumDark: "#1D4ED8",
    mutedGray: "#94A3B8",
    mutedGrayDark: "#64748B",
  },

  // Text & Content Hierarchy (Crisp White & Muted Blue-Gray)
  text: {
    primary: "#FFFFFF",
    secondary: "#94A3B8", // Muted blue-gray
    muted: "#64748B",
    disabled: "#334155",
  },
} as const;

export type Colors = typeof colors;
export default colors;
