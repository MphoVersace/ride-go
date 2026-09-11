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
    primary: "#071A3D",
    deep: "#051329",
  },

  // 30% - Panel / Surface / Structure
  surface: {
    card: "#102A52",
    elevated: "#16325C",
    subtle: "#0D2244",
    border: "#1D3557",
    divider: "#173056",
  },

  // 10% - Accent & Interactive Highlights
  accent: {
    primary: "#5BC0FF",
    hover: "#4AAFEF",
    subtle: "rgba(91, 192, 255, 0.15)",
    contrast: "#071A3D", // Text on accent
  },

  // Text & Content Hierarchy (Neutral tone scale aligned with navy palette)
  text: {
    primary: "#FFFFFF",
    secondary: "#C9D6E8",
    muted: "#8FA5C1",
    disabled: "#506784",
  },
} as const;

export type Colors = typeof colors;
export default colors;
