import React from "react";
import Svg, { Path, Rect, Circle, G, Defs, LinearGradient, Stop } from "react-native-svg";
import { colors } from "../../constants/colors";

interface VehicleSvgProps {
  width?: number;
  height?: number;
  bodyColor?: string;
  roofColor?: string;
  accentColor?: string;
  rotation?: number;
}

/**
 * Top-down orthographic vehicle SVG optimized for realtime map tracking.
 * Derived from the Toyota Prius technical orthographic projection.
 */
export const VehicleTopDownSvg: React.FC<VehicleSvgProps> = ({
  width = 24,
  height = 48,
  bodyColor = colors.accent.primary,
  roofColor = colors.background.primary,
  accentColor = "#FFFFFF",
  rotation = 0,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 60 120"
      style={{ transform: [{ rotate: `${rotation}deg` }] }}
    >
      <Defs>
        <LinearGradient id="carBodyGrad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor={bodyColor} stopOpacity="0.85" />
          <Stop offset="50%" stopColor={bodyColor} stopOpacity="1" />
          <Stop offset="100%" stopColor={bodyColor} stopOpacity="0.85" />
        </LinearGradient>
      </Defs>

      {/* Main Aerodynamic Outer Chassis Body */}
      <Path
        d="M18 10 C22 4 38 4 42 10 C48 18 50 35 50 65 C50 95 47 112 40 116 C35 118 25 118 20 116 C13 112 10 95 10 65 C10 35 12 18 18 10 Z"
        fill="url(#carBodyGrad)"
        stroke={bodyColor}
        strokeWidth="1.5"
      />

      {/* Side Mirrors */}
      <Path d="M9 36 C4 36 4 44 9 44 Z" fill={bodyColor} />
      <Path d="M51 36 C56 36 56 44 51 44 Z" fill={bodyColor} />

      {/* Front Hood Contours */}
      <Path
        d="M20 12 Q30 20 40 12"
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="1.2"
        fill="none"
      />

      {/* Front Windshield (curved dark glass) */}
      <Path
        d="M16 28 C22 24 38 24 44 28 L46 42 C38 40 22 40 14 42 Z"
        fill={roofColor}
        stroke="rgba(91, 192, 255, 0.3)"
        strokeWidth="1"
      />

      {/* Panoramic Glass Roof */}
      <Rect
        x="18"
        y="45"
        width="24"
        height="32"
        rx="4"
        fill={roofColor}
        stroke="rgba(91, 192, 255, 0.2)"
        strokeWidth="1"
      />

      {/* Rear Window & Spoiler */}
      <Path
        d="M16 80 C22 82 38 82 44 80 L46 95 C38 98 22 98 14 95 Z"
        fill={roofColor}
      />
      <Path
        d="M16 98 Q30 102 44 98"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Front LED Headlights */}
      <Path d="M14 12 L20 16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M46 12 L40 16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

      {/* Rear Brake Lights */}
      <Path d="M13 112 L18 114" stroke="#FF4D4D" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M47 112 L42 114" stroke="#FF4D4D" strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
};

/**
 * Side-profile Prius vector SVG for ride tier cards and service selection.
 */
export const VehicleSideSvg: React.FC<{
  width?: number;
  height?: number;
  color?: string;
}> = ({
  width = 64,
  height = 32,
  color = colors.accent.primary,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 80" fill="none">
      {/* Car Body Silhouette */}
      <Path
        d="M10 52 C12 45 20 40 32 38 L54 30 C72 16 98 14 122 22 L146 36 C152 40 156 46 156 52 C156 56 152 58 148 58 L138 58 C136 50 126 44 116 44 C106 44 96 50 94 58 L54 58 C52 50 42 44 32 44 C22 44 12 50 10 58 L6 58 C4 58 2 56 2 52 C2 50 6 48 10 52 Z"
        fill={color}
        opacity={0.9}
      />

      {/* Windows Arch */}
      <Path
        d="M56 32 C70 20 94 18 116 26 L134 38 L54 38 Z"
        fill={colors.background.primary}
      />

      {/* Front and Rear Wheels */}
      <Circle cx="32" cy="58" r="12" fill="#111827" stroke={color} strokeWidth="2" />
      <Circle cx="32" cy="58" r="5" fill="#C9D6E8" />

      <Circle cx="116" cy="58" r="12" fill="#111827" stroke={color} strokeWidth="2" />
      <Circle cx="116" cy="58" r="5" fill="#C9D6E8" />

      {/* Headlight & Taillight accents */}
      <Path d="M4 50 L12 48" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <Path d="M154 48 L150 52" stroke="#FF4D4D" strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
};
