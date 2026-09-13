/**
 * RideGo Design System - 60-30-10 Color System
 *
 * Strict Color Distribution:
 * - 60% Dominant Background: Primary background dark navy
 * - 30% Panel / Surface: Cards, panels, inputs, secondary layers, borders
 * - 10% Accent: Primary calls to action, highlights, active states
 *
 * Ad-hoc rainbow status colors are strictly prohibited.
 */

export const colors = {
  // 60% - Dominant Background
  background: {
    primary: "#000000",
    deep: "#0A0A0C",
  },

  // 30% - Panel / Surface / Structure (Carbon & Obsidian)
  surface: {
    card: "#16161A",
    cardAlt: "#202026",
    elevated: "#24242C",
    subtle: "#111114",
    border: "#2E2E36",
    divider: "#24242C",
  },

  // 10% - Accent & Interactive Highlights (Electric Taxi Gold Yellow)
  accent: {
    primary: "#FFD100",
    secondary: "#FFB800",
    hover: "#FFE033",
    subtle: "rgba(255, 209, 0, 0.15)",
    contrast: "#000000", // High-contrast black text on yellow
  },

  // Text & Content Hierarchy (Crisp White & Neutral Grays)
  text: {
    primary: "#FFFFFF",
    secondary: "#D1D1D6",
    muted: "#8E8E93",
    disabled: "#48484A",
  },
} as const;

export type Colors = typeof colors;
export default colors;
