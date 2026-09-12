import React from "react";
import Svg, { Path, Rect, Circle, Ellipse, G, Defs, LinearGradient, Stop } from "react-native-svg";
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

/**
 * Courier delivery motorcycle SVG with rear cargo box.
 */
export const CourierBikeSvg: React.FC<{
  width?: number;
  height?: number;
  color?: string;
}> = ({
  width = 56,
  height = 28,
  color = colors.accent.primary,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 80" fill="none">
      {/* Front & Rear Wheels */}
      <Circle cx="30" cy="58" r="14" fill="#111827" stroke={color} strokeWidth="2.5" />
      <Circle cx="30" cy="58" r="6" fill="#C9D6E8" />
      <Circle cx="130" cy="58" r="14" fill="#111827" stroke={color} strokeWidth="2.5" />
      <Circle cx="130" cy="58" r="6" fill="#C9D6E8" />

      {/* Bike Chassis & Frame */}
      <Path
        d="M30 58 L60 52 L90 54 L130 58"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path
        d="M60 52 L50 28 L36 28"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Front Fork & Handlebars */}
      <Path
        d="M130 58 L114 26 L108 26"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Rider Seat */}
      <Path
        d="M74 38 C80 34 94 34 100 38 L98 44 L72 44 Z"
        fill={colors.background.primary}
        stroke={color}
        strokeWidth="1.5"
      />

      {/* Courier Delivery Box on Back */}
      <Rect
        x="36"
        y="18"
        width="34"
        height="26"
        rx="4"
        fill={colors.surface.elevated}
        stroke={color}
        strokeWidth="2"
      />
      <Path
        d="M36 28 L70 28"
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Headlight */}
      <Circle cx="120" cy="30" r="4" fill="#FFFFFF" />
    </Svg>
  );
};

/**
 * South African Delivery Bakkie (Pickup truck) with cargo bed.
 */
export const DeliveryBakkieSvg: React.FC<{
  width?: number;
  height?: number;
  color?: string;
}> = ({
  width = 60,
  height = 28,
  color = colors.accent.primary,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 80" fill="none">
      {/* Cab and Cargo Bed Silhouette */}
      <Path
        d="M10 52 C10 46 14 44 20 44 L90 44 L90 28 C90 22 96 18 104 18 L124 18 C132 18 140 26 148 38 L152 46 C154 50 154 54 150 56 L138 56 C136 48 126 42 116 42 C106 42 96 48 94 56 L54 56 C52 48 42 42 32 42 C22 42 12 48 10 56 Z"
        fill={color}
        opacity={0.9}
      />
      {/* Open Bed Rail */}
      <Rect
        x="12"
        y="32"
        width="76"
        height="12"
        rx="2"
        fill={colors.surface.elevated}
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Cab Window */}
      <Path
        d="M96 24 L120 24 C126 24 132 30 138 38 L96 38 Z"
        fill={colors.background.primary}
      />

      {/* Front and Rear Rugged Wheels */}
      <Circle cx="32" cy="56" r="13" fill="#111827" stroke={color} strokeWidth="2.5" />
      <Circle cx="32" cy="56" r="5" fill="#C9D6E8" />
      <Circle cx="116" cy="56" r="13" fill="#111827" stroke={color} strokeWidth="2.5" />
      <Circle cx="116" cy="56" r="5" fill="#C9D6E8" />

      {/* Lights */}
      <Path d="M152 48 L148 52" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M8 46 L8 52" stroke="#FF4D4D" strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
};

/**
 * Enclosed Furniture Moving Truck SVG.
 */
export const MovingTruckSvg: React.FC<{
  width?: number;
  height?: number;
  color?: string;
}> = ({
  width = 64,
  height = 30,
  color = colors.accent.primary,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 80" fill="none">
      {/* Enclosed Rear Cargo Box */}
      <Rect
        x="8"
        y="12"
        width="90"
        height="44"
        rx="4"
        fill={colors.surface.elevated}
        stroke={color}
        strokeWidth="2"
      />
      {/* Box Panel Ribs */}
      <Path d="M38 12 V56M68 12 V56" stroke={color} strokeWidth="1" opacity={0.6} />

      {/* Cab Front */}
      <Path
        d="M98 22 C98 18 102 16 108 16 L124 16 C134 16 142 24 148 36 L154 48 C156 52 154 56 148 56 L134 56 C132 48 122 42 112 42 C102 42 98 48 98 56 Z"
        fill={color}
        opacity={0.9}
      />
      {/* Cab Windshield */}
      <Path
        d="M104 22 L122 22 C128 22 134 28 140 36 L104 36 Z"
        fill={colors.background.primary}
      />

      {/* Dual Rear Wheels & Front Wheel */}
      <Circle cx="30" cy="58" r="12" fill="#111827" stroke={color} strokeWidth="2" />
      <Circle cx="30" cy="58" r="5" fill="#C9D6E8" />
      <Circle cx="54" cy="58" r="12" fill="#111827" stroke={color} strokeWidth="2" />
      <Circle cx="54" cy="58" r="5" fill="#C9D6E8" />
      <Circle cx="120" cy="58" r="12" fill="#111827" stroke={color} strokeWidth="2" />
      <Circle cx="120" cy="58" r="5" fill="#C9D6E8" />

      {/* Lights */}
      <Path d="M152 48 L148 52" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <Path d="M6 50 L6 54" stroke="#FF4D4D" strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
};

/**
 * Photorealistic 3D Shaded Side-Profile Electric Sedan Vector SVG.
 * Features realistic metallic gradients, 8-spoke alloy wheels with brake calipers,
 * tinted aerodynamic glass, and illuminated cyan LED headlights.
 */
export const Vehicle3DShadedSideSvg: React.FC<{
  width?: number;
  height?: number;
  primaryColor?: string;
  accentGlow?: string;
}> = ({
  width = 260,
  height = 120,
  primaryColor = colors.accent.primary,
  accentGlow = "#5BC0FF",
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 320 140" fill="none">
      <Defs>
        {/* Metallic Body Gradient */}
        <LinearGradient id="car3DBodyGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.9" />
          <Stop offset="25%" stopColor={primaryColor} stopOpacity="0.85" />
          <Stop offset="65%" stopColor="#1A3B66" stopOpacity="1" />
          <Stop offset="100%" stopColor="#0B1A30" stopOpacity="1" />
        </LinearGradient>

        {/* Tinted Aerodynamic Glass Gradient */}
        <LinearGradient id="car3DWindowGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#051020" stopOpacity="0.95" />
          <Stop offset="100%" stopColor="#0E223D" stopOpacity="0.9" />
        </LinearGradient>

        {/* Specular Highlight on Windshield */}
        <LinearGradient id="glassStreak" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </LinearGradient>

        {/* Headlight Beam Glow */}
        <LinearGradient id="headlightBeamGlow" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor={accentGlow} stopOpacity="0.8" />
          <Stop offset="100%" stopColor={accentGlow} stopOpacity="0" />
        </LinearGradient>

        {/* Wheel Tire Gradient */}
        <LinearGradient id="tireGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#1A202C" stopOpacity="1" />
          <Stop offset="100%" stopColor="#0D1117" stopOpacity="1" />
        </LinearGradient>

        {/* Wheel Alloy Rim Gradient */}
        <LinearGradient id="rimGrad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#E2E8F0" stopOpacity="1" />
          <Stop offset="50%" stopColor="#718096" stopOpacity="1" />
          <Stop offset="100%" stopColor="#2D3748" stopOpacity="1" />
        </LinearGradient>
      </Defs>

      {/* Ground Contact Shadow */}
      <Ellipse cx="160" cy="122" rx="140" ry="10" fill="#030A17" opacity={0.7} />

      {/* Main 3D Sculpted Body Silhouette */}
      <Path
        d="M22 96 C24 84 34 76 52 74 L96 60 C124 38 174 32 216 42 L260 64 C278 72 294 82 296 92 C296 98 290 102 284 102 L268 102 C264 88 248 78 230 78 C212 78 196 88 192 102 L112 102 C108 88 92 78 74 78 C56 78 40 88 36 102 L26 102 C22 102 20 98 22 96 Z"
        fill="url(#car3DBodyGrad)"
        stroke="rgba(91, 192, 255, 0.4)"
        strokeWidth="1.2"
      />

      {/* Upper Roof & Shoulder Specular Highlight Line */}
      <Path
        d="M52 74 L96 60 C124 38 174 32 216 42 L260 64"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity={0.6}
      />

      {/* Aerodynamic Front Bumper Lower Chin Splitter */}
      <Path
        d="M20 98 L36 102 L36 106 L18 104 Z"
        fill="#071A3D"
        stroke="#1D3557"
        strokeWidth="1"
      />

      {/* Front Air Intake Scoop */}
      <Path
        d="M26 88 L42 86 L40 94 L24 94 Z"
        fill="#050E1C"
        stroke="#1D3557"
        strokeWidth="0.8"
      />

      {/* Tinted Aerodynamic Glass Windows */}
      <Path
        d="M102 58 C128 40 168 36 210 44 L242 64 L102 64 Z"
        fill="url(#car3DWindowGrad)"
        stroke="#1D3557"
        strokeWidth="1"
      />
      {/* Window Pillar Separator (B-Pillar) */}
      <Path d="M168 40 L164 64" stroke="#0B1A30" strokeWidth="5" />

      {/* Window Specular Glass Reflection */}
      <Path
        d="M112 56 L154 42 L144 64 L108 64 Z"
        fill="url(#glassStreak)"
      />

      {/* Aerodynamic Side Mirror */}
      <Path
        d="M106 64 C100 64 96 60 102 56 L112 58 Z"
        fill="url(#car3DBodyGrad)"
        stroke="#FFFFFF"
        strokeWidth="0.8"
      />

      {/* Front Headlamp Lens & Projector */}
      <Path
        d="M22 84 L38 78 L34 88 L22 88 Z"
        fill="#FFFFFF"
        stroke={accentGlow}
        strokeWidth="1.5"
      />
      {/* Front Cyan LED DRL Light Strip */}
      <Path
        d="M22 84 L38 78"
        stroke={accentGlow}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Forward Light Projection Beam */}
      <Path
        d="M20 84 L0 74 L0 98 L20 88 Z"
        fill="url(#headlightBeamGlow)"
      />

      {/* Rear Wrap-Around Crimson LED Taillight */}
      <Path
        d="M292 84 L296 90 L290 94 L286 92 Z"
        fill="#FF3B30"
      />
      <Path
        d="M288 84 L296 88"
        stroke="#FF453A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Door Cut Seams & Rocker Creases */}
      <Path
        d="M164 64 L162 102"
        stroke="#0B1A30"
        strokeWidth="1.2"
        opacity={0.7}
      />
      <Path
        d="M112 102 L192 102"
        stroke="#1D3557"
        strokeWidth="2"
      />

      {/* ================= REAR 3D ALLOY WHEEL ================= */}
      <G transform="translate(230, 102)">
        {/* Tire */}
        <Circle cx="0" cy="0" r="22" fill="url(#tireGrad)" stroke="#111827" strokeWidth="2" />
        {/* Rim Outer Lip */}
        <Circle cx="0" cy="0" r="16" fill="url(#rimGrad)" stroke="#A0AEC0" strokeWidth="1" />
        {/* Brake Disc & Red Caliper */}
        <Circle cx="0" cy="0" r="11" fill="#4A5568" />
        <Path d="M-8 -6 A11 11 0 0 1 -2 -11 L-2 -6 Z" fill="#E53E3E" />
        {/* 8 Radial Metallic Spokes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <Rect
            key={angle}
            x="-1.5"
            y="-14"
            width="3"
            height="14"
            fill="#CBD5E0"
            transform={`rotate(${angle})`}
          />
        ))}
        {/* Center Hub */}
        <Circle cx="0" cy="0" r="5" fill="#1A202C" stroke="#E2E8F0" strokeWidth="1" />
      </G>

      {/* ================= FRONT 3D ALLOY WHEEL ================= */}
      <G transform="translate(74, 102)">
        {/* Tire */}
        <Circle cx="0" cy="0" r="22" fill="url(#tireGrad)" stroke="#111827" strokeWidth="2" />
        {/* Rim Outer Lip */}
        <Circle cx="0" cy="0" r="16" fill="url(#rimGrad)" stroke="#A0AEC0" strokeWidth="1" />
        {/* Brake Disc & Red Caliper */}
        <Circle cx="0" cy="0" r="11" fill="#4A5568" />
        <Path d="M-8 -6 A11 11 0 0 1 -2 -11 L-2 -6 Z" fill="#E53E3E" />
        {/* 8 Radial Metallic Spokes */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <Rect
            key={angle}
            x="-1.5"
            y="-14"
            width="3"
            height="14"
            fill="#CBD5E0"
            transform={`rotate(${angle})`}
          />
        ))}
        {/* Center Hub */}
        <Circle cx="0" cy="0" r="5" fill="#1A202C" stroke="#E2E8F0" strokeWidth="1" />
      </G>
    </Svg>
  );
};

/**
 * Photorealistic 3D Front-Perspective Electric Sedan Vector SVG.
 * Features aggressive front stance, dual illuminated LED projector lamps,
 * aerodynamic side mirrors, and wide low-profile front tires.
 */
export const Vehicle3DFrontSvg: React.FC<{
  width?: number;
  height?: number;
  primaryColor?: string;
  accentGlow?: string;
}> = ({
  width = 240,
  height = 160,
  primaryColor = colors.accent.primary,
  accentGlow = "#5BC0FF",
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 160" fill="none">
      <Defs>
        <LinearGradient id="frontBodyGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.9" />
          <Stop offset="30%" stopColor={primaryColor} stopOpacity="0.85" />
          <Stop offset="70%" stopColor="#16325C" stopOpacity="1" />
          <Stop offset="100%" stopColor="#0B1A30" stopOpacity="1" />
        </LinearGradient>

        <LinearGradient id="frontWindshieldGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#051020" stopOpacity="0.95" />
          <Stop offset="100%" stopColor="#0E223D" stopOpacity="0.9" />
        </LinearGradient>

        <LinearGradient id="frontLightGlow" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <Stop offset="100%" stopColor={accentGlow} stopOpacity="0.8" />
        </LinearGradient>
      </Defs>

      {/* Ground Contact Shadow */}
      <Ellipse cx="120" cy="144" rx="100" ry="10" fill="#030A17" opacity={0.7} />

      {/* Front Left & Right Tires */}
      <Rect x="28" y="112" width="26" height="32" rx="6" fill="#111827" stroke="#1D3557" strokeWidth="1.5" />
      <Rect x="186" y="112" width="26" height="32" rx="6" fill="#111827" stroke="#1D3557" strokeWidth="1.5" />

      {/* Aerodynamic Side Mirrors */}
      <Path d="M42 66 L22 62 C18 62 18 70 24 72 L44 72 Z" fill="url(#frontBodyGrad)" stroke="#1D3557" strokeWidth="1" />
      <Path d="M198 66 L218 62 C222 62 222 70 216 72 L196 72 Z" fill="url(#frontBodyGrad)" stroke="#1D3557" strokeWidth="1" />

      {/* Cabin Roof & Windshield Arch */}
      <Path
        d="M58 74 L74 34 C86 28 154 28 166 34 L182 74 Z"
        fill="url(#frontWindshieldGrad)"
        stroke="#1D3557"
        strokeWidth="1.5"
      />

      {/* Windshield Center Rearview Mirror */}
      <Rect x="114" y="36" width="12" height="6" rx="2" fill="#1A202C" />

      {/* Main Front Body & Hood Sculpt */}
      <Path
        d="M34 114 C30 102 42 78 58 74 L182 74 C198 78 210 102 206 114 C202 128 184 136 120 136 C56 136 38 128 34 114 Z"
        fill="url(#frontBodyGrad)"
        stroke="rgba(91, 192, 255, 0.4)"
        strokeWidth="1.2"
      />

      {/* Hood Dual Muscle Crease Lines */}
      <Path d="M82 74 L88 100" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />
      <Path d="M158 74 L152 100" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity={0.6} />

      {/* Central Radiator Grille / Aether Badge */}
      <Path
        d="M84 102 L156 102 L148 116 L92 116 Z"
        fill="#071A3D"
        stroke="#1D3557"
        strokeWidth="1.5"
      />
      {/* Front Emblem */}
      <Circle cx="120" cy="108" r="4" fill={accentGlow} />

      {/* Lower Bumper Honeycomb Mesh Air Dam */}
      <Path
        d="M68 120 L172 120 L166 132 L74 132 Z"
        fill="#040D1D"
        stroke="#1D3557"
        strokeWidth="1"
      />

      {/* Left Front Multi-Element Projector Headlight */}
      <Path
        d="M44 94 L80 92 L76 102 L42 100 Z"
        fill="url(#frontLightGlow)"
        stroke="#FFFFFF"
        strokeWidth="1"
      />
      <Circle cx="54" cy="97" r="3" fill="#FFFFFF" />
      <Circle cx="66" cy="96" r="3" fill="#FFFFFF" />
      {/* Glowing Cyan Eyebrow DRL */}
      <Path d="M42 92 L80 90" stroke={accentGlow} strokeWidth="3" strokeLinecap="round" />

      {/* Right Front Multi-Element Projector Headlight */}
      <Path
        d="M196 94 L160 92 L164 102 L198 100 Z"
        fill="url(#frontLightGlow)"
        stroke="#FFFFFF"
        strokeWidth="1"
      />
      <Circle cx="186" cy="97" r="3" fill="#FFFFFF" />
      <Circle cx="174" cy="96" r="3" fill="#FFFFFF" />
      {/* Glowing Cyan Eyebrow DRL */}
      <Path d="M198 92 L160 90" stroke={accentGlow} strokeWidth="3" strokeLinecap="round" />
    </Svg>
  );
};

/**
 * Photorealistic 3D Rear-Perspective Electric Sedan Vector SVG.
 * Features full-width horizontal illuminated crimson LED light bar,
 * rear lip spoiler, sporty aerodynamic diffuser, and wide rear tires.
 */
export const Vehicle3DRearSvg: React.FC<{
  width?: number;
  height?: number;
  primaryColor?: string;
  accentGlow?: string;
}> = ({
  width = 240,
  height = 160,
  primaryColor = colors.accent.primary,
  accentGlow = "#5BC0FF",
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 160" fill="none">
      <Defs>
        <LinearGradient id="rearBodyGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.9" />
          <Stop offset="30%" stopColor={primaryColor} stopOpacity="0.85" />
          <Stop offset="70%" stopColor="#16325C" stopOpacity="1" />
          <Stop offset="100%" stopColor="#0B1A30" stopOpacity="1" />
        </LinearGradient>

        <LinearGradient id="rearWindowGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#051020" stopOpacity="0.95" />
          <Stop offset="100%" stopColor="#0E223D" stopOpacity="0.9" />
        </LinearGradient>

        <LinearGradient id="taillightGlow" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0%" stopColor="#FF3B30" stopOpacity="1" />
          <Stop offset="50%" stopColor="#FF453A" stopOpacity="1" />
          <Stop offset="100%" stopColor="#FF3B30" stopOpacity="1" />
        </LinearGradient>
      </Defs>

      {/* Ground Contact Shadow */}
      <Ellipse cx="120" cy="144" rx="100" ry="10" fill="#030A17" opacity={0.7} />

      {/* Wide Rear Tires */}
      <Rect x="26" y="112" width="28" height="32" rx="6" fill="#111827" stroke="#1D3557" strokeWidth="1.5" />
      <Rect x="186" y="112" width="28" height="32" rx="6" fill="#111827" stroke="#1D3557" strokeWidth="1.5" />

      {/* Aerodynamic Side Mirrors (rear view) */}
      <Path d="M44 68 L24 64 C20 64 20 72 26 74 L46 74 Z" fill="#0B1A30" stroke="#1D3557" strokeWidth="1" />
      <Path d="M196 68 L216 64 C220 64 220 72 214 74 L194 74 Z" fill="#0B1A30" stroke="#1D3557" strokeWidth="1" />

      {/* Fastback Rear Window */}
      <Path
        d="M60 76 L76 34 C88 28 152 28 164 34 L180 76 Z"
        fill="url(#rearWindowGrad)"
        stroke="#1D3557"
        strokeWidth="1.5"
      />
      {/* High-Mount Center Third Brake Light */}
      <Rect x="110" y="32" width="20" height="3" rx="1.5" fill="#FF3B30" />

      {/* Main Rear Trunk & Bumper Sculpt */}
      <Path
        d="M36 114 C32 100 44 78 60 76 L180 76 C196 78 208 100 204 114 C200 128 182 136 120 136 C58 136 40 128 36 114 Z"
        fill="url(#rearBodyGrad)"
        stroke="rgba(91, 192, 255, 0.4)"
        strokeWidth="1.2"
      />

      {/* Integrated Aerodynamic Trunk Lip Spoiler */}
      <Path
        d="M58 76 L182 76"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={0.8}
      />

      {/* Full-Width Horizontal Illuminated Crimson Taillight Bar */}
      <Path
        d="M46 88 L194 88 L190 95 L50 95 Z"
        fill="url(#taillightGlow)"
        stroke="#FF3B30"
        strokeWidth="1.2"
      />
      {/* Glowing LED Ribbon Accent */}
      <Path d="M48 90 L192 90" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity={0.8} />

      {/* License Plate Recess */}
      <Rect x="96" y="104" width="48" height="18" rx="4" fill="#071A3D" stroke="#1D3557" strokeWidth="1" />
      <Rect x="102" y="108" width="36" height="10" rx="2" fill="#E2E8F0" />
      <Path d="M106 113 H134" stroke="#071A3D" strokeWidth="2" strokeDasharray="3 2" />

      {/* Sport Aerodynamic Rear Diffuser Strakes */}
      <Path
        d="M74 128 L166 128 L160 136 L80 136 Z"
        fill="#040D1D"
        stroke="#1D3557"
        strokeWidth="1"
      />
      <Path d="M104 128 V136 M120 128 V136 M136 128 V136" stroke="#1D3557" strokeWidth="2" />
    </Svg>
  );
};


