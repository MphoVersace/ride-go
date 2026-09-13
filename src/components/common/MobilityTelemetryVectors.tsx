import React from "react";
import Svg, {
  Path,
  Circle,
  Line,
  Polygon,
  Rect,
  G,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { colors } from "../../constants/colors";

interface VectorProps {
  width?: number;
  height?: number;
  color?: string;
  active?: boolean;
}

/**
 * Standard Tier Telemetry: Pure Velocity Chevrons & Kinetic Speedline
 * Zero cars, pure high-tech kinetic vector.
 */
export const StandardTelemetryVector: React.FC<VectorProps> = ({
  width = 56,
  height = 28,
  color = colors.accent.primary,
}) => (
  <Svg width={width} height={height} viewBox="0 0 64 28" fill="none">
    {/* Telemetry Guide Line */}
    <Line
      x1="4"
      y1="14"
      x2="60"
      y2="14"
      stroke={color}
      strokeWidth="1"
      strokeDasharray="3 3"
      opacity={0.4}
    />
    {/* Velocity Chevrons */}
    <Path
      d="M 12 22 L 22 14 L 12 6"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity={0.6}
    />
    <Path
      d="M 26 22 L 36 14 L 26 6"
      stroke={color}
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      opacity={0.85}
    />
    <Path
      d="M 40 22 L 50 14 L 40 6"
      stroke={color}
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Focal Beacon Dot */}
    <Circle cx="55" cy="14" r="2.5" fill={color} />
  </Svg>
);

/**
 * Comfort Tier Telemetry: Harmonic Spatial Wave & Dual Resonant Curves
 * Symbolizes smooth ride dynamics, spaciousness, and enhanced damping.
 */
export const ComfortTelemetryVector: React.FC<VectorProps> = ({
  width = 56,
  height = 28,
  color = colors.accent.primary,
}) => (
  <Svg width={width} height={height} viewBox="0 0 64 28" fill="none">
    {/* Primary Harmonic Wave */}
    <Path
      d="M 6 18 C 18 4, 26 24, 38 10 C 46 0, 54 20, 58 14"
      stroke={color}
      strokeWidth="2.6"
      strokeLinecap="round"
      fill="none"
    />
    {/* Sub-harmonic Frequency Trace */}
    <Path
      d="M 6 22 C 18 10, 26 28, 38 16 C 46 8, 54 24, 58 20"
      stroke={color}
      strokeWidth="1.2"
      strokeDasharray="2 2"
      strokeLinecap="round"
      fill="none"
      opacity={0.5}
    />
    {/* Resonant Nodes */}
    <Circle cx="18" cy="8" r="2" fill={color} opacity={0.6} />
    <Circle cx="38" cy="10" r="3.2" fill={color} />
    <Circle cx="38" cy="10" r="1.2" fill="#FFFFFF" />
    <Circle cx="54" cy="16" r="2" fill={color} opacity={0.6} />
  </Svg>
);

/**
 * Luxury Tier Telemetry: Executive Faceted Diamond & Precision Orbital Matrix
 * Symbolizes premium craftsmanship, apex status, and refined quietness.
 */
export const LuxuryTelemetryVector: React.FC<VectorProps> = ({
  width = 56,
  height = 28,
  color = colors.accent.primary,
}) => (
  <Svg width={width} height={height} viewBox="0 0 64 28" fill="none">
    {/* Outer Horizontal Alignment Rays */}
    <Line
      x1="4"
      y1="14"
      x2="16"
      y2="14"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity={0.4}
    />
    <Line
      x1="48"
      y1="14"
      x2="60"
      y2="14"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity={0.4}
    />
    {/* Executive Faceted Rhombus / Diamond Core */}
    <Polygon
      points="32,4 48,14 32,24 16,14"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Internal Geometric Facet Crosshairs */}
    <Line
      x1="16"
      y1="14"
      x2="48"
      y2="14"
      stroke={color}
      strokeWidth="1"
      strokeDasharray="2 2"
      opacity={0.6}
    />
    <Line
      x1="32"
      y1="4"
      x2="32"
      y2="24"
      stroke={color}
      strokeWidth="1"
      opacity={0.6}
    />
    {/* Center Apex Core */}
    <Circle cx="32" cy="14" r="3.5" fill={color} />
    <Circle cx="32" cy="14" r="1.5" fill="#FFFFFF" />
    {/* Outer Orbitals */}
    <Circle cx="10" cy="14" r="2" fill={color} opacity={0.7} />
    <Circle cx="54" cy="14" r="2" fill={color} opacity={0.7} />
  </Svg>
);

/**
 * Express Parcel Vector (Courier Tier)
 * Sleek geometric box with rapid dispatch kinetic vectors.
 */
export const ExpressParcelVector: React.FC<VectorProps> = ({
  width = 56,
  height = 28,
  color = colors.accent.primary,
}) => (
  <Svg width={width} height={height} viewBox="0 0 64 28" fill="none">
    {/* Trailing Speedlines */}
    <Line
      x1="4"
      y1="9"
      x2="18"
      y2="9"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity={0.4}
    />
    <Line
      x1="8"
      y1="14"
      x2="20"
      y2="14"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      opacity={0.7}
    />
    <Line
      x1="4"
      y1="19"
      x2="18"
      y2="19"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity={0.4}
    />
    {/* Isometric Parcel Cube */}
    <Path
      d="M 36 5 L 50 11 L 50 23 L 36 27 L 22 23 L 22 11 Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Isometric Box Creases */}
    <Path
      d="M 36 15 L 36 27"
      stroke={color}
      strokeWidth="1.6"
      fill="none"
    />
    <Path
      d="M 22 11 L 36 15 L 50 11"
      stroke={color}
      strokeWidth="1.6"
      fill="none"
    />
    {/* Parcel Seal Dot */}
    <Circle cx="36" cy="10" r="2" fill={color} />
  </Svg>
);

/**
 * Modular Cargo Crate Vector (Delivery Bakkie Tier)
 * Multi-container cargo arrangement for medium loads.
 */
export const CargoCrateVector: React.FC<VectorProps> = ({
  width = 56,
  height = 28,
  color = colors.accent.primary,
}) => (
  <Svg width={width} height={height} viewBox="0 0 64 28" fill="none">
    {/* Base Crate 1 */}
    <Rect
      x="12"
      y="12"
      width="20"
      height="12"
      rx="2"
      stroke={color}
      strokeWidth="1.8"
      fill="none"
    />
    <Line
      x1="12"
      y1="12"
      x2="32"
      y2="24"
      stroke={color}
      strokeWidth="1"
      opacity={0.5}
    />
    {/* Base Crate 2 */}
    <Rect
      x="34"
      y="12"
      width="20"
      height="12"
      rx="2"
      stroke={color}
      strokeWidth="1.8"
      fill="none"
    />
    <Line
      x1="54"
      y1="12"
      x2="34"
      y2="24"
      stroke={color}
      strokeWidth="1"
      opacity={0.5}
    />
    {/* Stacked Top Crate */}
    <Rect
      x="23"
      y="3"
      width="18"
      height="9"
      rx="2"
      stroke={color}
      strokeWidth="1.8"
      fill="none"
    />
    <Line
      x1="23"
      y1="7.5"
      x2="41"
      y2="7.5"
      stroke={color}
      strokeWidth="1"
      strokeDasharray="2 2"
      opacity={0.6}
    />
  </Svg>
);

/**
 * Heavy Freight Pallet / Container Vector (Moving Truck Tier)
 * Industrial heavy freight matrix for massive loads.
 */
export const FreightPalletVector: React.FC<VectorProps> = ({
  width = 56,
  height = 28,
  color = colors.accent.primary,
}) => (
  <Svg width={width} height={height} viewBox="0 0 64 28" fill="none">
    {/* Industrial Heavy Container Box */}
    <Rect
      x="10"
      y="4"
      width="44"
      height="16"
      rx="3"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    {/* Corrugated Vertical Ribs */}
    <Line x1="18" y1="4" x2="18" y2="20" stroke={color} strokeWidth="1.2" opacity={0.6} />
    <Line x1="26" y1="4" x2="26" y2="20" stroke={color} strokeWidth="1.2" opacity={0.6} />
    <Line x1="34" y1="4" x2="34" y2="20" stroke={color} strokeWidth="1.2" opacity={0.6} />
    <Line x1="42" y1="4" x2="42" y2="20" stroke={color} strokeWidth="1.2" opacity={0.6} />
    <Line x1="50" y1="4" x2="50" y2="20" stroke={color} strokeWidth="1.2" opacity={0.6} />
    {/* Heavy Timber Pallet Base */}
    <Rect
      x="8"
      y="22"
      width="48"
      height="4"
      rx="1"
      stroke={color}
      strokeWidth="1.5"
      fill="none"
    />
    <Line x1="16" y1="22" x2="16" y2="26" stroke={color} strokeWidth="2" />
    <Line x1="32" y1="22" x2="32" y2="26" stroke={color} strokeWidth="2" />
    <Line x1="48" y1="22" x2="48" y2="26" stroke={color} strokeWidth="2" />
  </Svg>
);

/**
 * Promo Cargo Graphic: Sleek freight container dispatch vector for hero banners
 */
export const PromoCargoVector: React.FC<{ width?: number; height?: number; color?: string }> = ({
  width = 64,
  height = 36,
  color = colors.accent.primary,
}) => (
  <Svg width={width} height={height} viewBox="0 0 64 36" fill="none">
    {/* Outer container */}
    <Rect
      x="6"
      y="6"
      width="52"
      height="24"
      rx="4"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    {/* Vertical shipping container corrugation */}
    <Line x1="16" y1="6" x2="16" y2="30" stroke={color} strokeWidth="1.5" opacity={0.5} />
    <Line x1="26" y1="6" x2="26" y2="30" stroke={color} strokeWidth="1.5" opacity={0.5} />
    <Line x1="36" y1="6" x2="36" y2="30" stroke={color} strokeWidth="1.5" opacity={0.5} />
    <Line x1="46" y1="6" x2="46" y2="30" stroke={color} strokeWidth="1.5" opacity={0.5} />
    {/* Front cargo lock */}
    <Circle cx="50" cy="18" r="2.5" fill={color} />
  </Svg>
);

/**
 * South Africa National Mobility Radar Matrix
 * Concentric orbits, route nodes for Johannesburg, Cape Town, Durban, Pretoria, Sandton.
 */
export const SouthAfricaRadarMatrix: React.FC<{ size?: number }> = ({ size = 200 }) => (
  <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <Defs>
      <LinearGradient id="radarGrad" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%" stopColor={colors.accent.primary} stopOpacity="1" />
        <Stop offset="100%" stopColor={colors.accent.secondary} stopOpacity="0.8" />
      </LinearGradient>
      <LinearGradient id="radarCoreGlow" x1="0" y1="0" x2="0" y2="1">
        <Stop offset="0%" stopColor={colors.accent.primary} stopOpacity="0.3" />
        <Stop offset="100%" stopColor={colors.accent.primary} stopOpacity="0.0" />
      </LinearGradient>
    </Defs>

    {/* Concentric Telemetry Range Rings */}
    <Circle
      cx="100"
      cy="100"
      r="86"
      stroke={colors.surface.border}
      strokeWidth="1.2"
      strokeDasharray="4 4"
    />
    <Circle
      cx="100"
      cy="100"
      r="60"
      stroke={colors.surface.border}
      strokeWidth="1.5"
    />
    <Circle
      cx="100"
      cy="100"
      r="34"
      fill="url(#radarCoreGlow)"
      stroke={colors.accent.primary}
      strokeWidth="1.5"
    />

    {/* Radar Sweep Crosshairs */}
    <Line
      x1="14"
      y1="100"
      x2="186"
      y2="100"
      stroke={colors.surface.border}
      strokeWidth="1"
      opacity={0.6}
    />
    <Line
      x1="100"
      y1="14"
      x2="100"
      y2="186"
      stroke={colors.surface.border}
      strokeWidth="1"
      opacity={0.6}
    />

    {/* Major National Transit Arterial Trajectories */}
    <Path
      d="M 40 145 C 65 65, 135 65, 160 145"
      stroke="url(#radarGrad)"
      strokeWidth="2.8"
      strokeLinecap="round"
      fill="none"
    />
    <Path
      d="M 45 75 C 80 145, 130 145, 155 75"
      stroke={colors.surface.border}
      strokeWidth="1.8"
      strokeDasharray="4 4"
      strokeLinecap="round"
      fill="none"
    />

    {/* Metro Node Constellations */}
    {/* Cape Town Node */}
    <Circle cx="40" cy="145" r="5.5" fill={colors.accent.primary} />
    <Circle cx="40" cy="145" r="2" fill="#FFFFFF" />

    {/* Johannesburg / Sandton Core Hub */}
    <Circle cx="100" cy="100" r="10" fill={colors.accent.primary} />
    <Circle cx="100" cy="100" r="4.5" fill="#000000" />
    <Circle cx="100" cy="100" r="2" fill="#FFFFFF" />

    {/* Durban Node */}
    <Circle cx="160" cy="145" r="5.5" fill={colors.accent.primary} />
    <Circle cx="160" cy="145" r="2" fill="#FFFFFF" />

    {/* Pretoria North Gate Node */}
    <Circle cx="100" cy="40" r="5" fill={colors.accent.primary} />
    <Circle cx="100" cy="40" r="2" fill="#FFFFFF" />

    {/* Secondary Regional Beacons */}
    <Circle cx="45" cy="75" r="3.5" fill={colors.text.muted} />
    <Circle cx="155" cy="75" r="3.5" fill={colors.text.muted} />
  </Svg>
);
