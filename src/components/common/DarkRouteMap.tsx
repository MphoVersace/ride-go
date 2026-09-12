import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Path, Circle, Rect, G } from "react-native-svg";
import { colors } from "../../constants/colors";


interface DarkRouteMapProps {
  height?: number;
  showRoute?: boolean;
  driverEta?: string;
  progress?: number; // 0.0 (origin) to 1.0 (destination)
}

function getInterpolatedPosition(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  const totalLength = 320;
  const d = p * totalLength;

  if (d <= 80) {
    const u = d / 80;
    return { x: 70, y: 180 - 80 * u, angle: 0 };
  } else if (d <= 191.8) {
    const u = (d - 80) / 111.8;
    return { x: 70 + 110 * u, y: 100 - 20 * u, angle: 75 };
  } else if (d <= 269.9) {
    const u = (d - 191.8) / 78.1;
    return { x: 180 + 50 * u, y: 80 + 60 * u, angle: 140 };
  } else {
    const u = (d - 269.9) / 50.1;
    return { x: 230 + 50 * u, y: 140, angle: 90 };
  }
}

export const DarkRouteMap: React.FC<DarkRouteMapProps> = ({
  height = 240,
  showRoute = true,
  driverEta,
  progress = 0.35,
}) => {
  const vehiclePos = getInterpolatedPosition(progress);

  return (
    <View style={[styles.mapContainer, { height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 360 240" preserveAspectRatio="none">
        {/* Dark Background */}
        <Rect width="360" height="240" fill={colors.background.deep} />

        {/* Ambient Map Grids & Secondary Streets */}
        <Path
          d="M0 60 H360 M0 140 H360 M0 200 H360"
          stroke="#0D2244"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <Path
          d="M80 0 V240 M200 0 V240 M300 0 V240"
          stroke="#0D2244"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Diagonal Arterials */}
        <Path
          d="M0 220 L160 80 L360 40"
          stroke="#132D56"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <Path
          d="M50 0 L150 120 L300 240"
          stroke="#132D56"
          strokeWidth="8"
          strokeLinejoin="round"
        />

        {/* Active Route Trajectory (Electric Cyan Glow) */}
        {showRoute && (
          <G>
            {/* Glow Path */}
            <Path
              d="M70 180 L70 100 L180 80 L230 140 L280 140"
              stroke={colors.accent.subtle}
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Core Route Line */}
            <Path
              d="M70 180 L70 100 L180 80 L230 140 L280 140"
              stroke={colors.accent.primary}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Pickup Marker (Origin) */}
            <Circle
              cx="70"
              cy="180"
              r="10"
              fill={colors.background.primary}
              stroke={colors.accent.primary}
              strokeWidth="3"
            />
            <Circle cx="70" cy="180" r="4" fill={colors.accent.primary} />

            {/* Destination Marker */}
            <Circle
              cx="280"
              cy="140"
              r="10"
              fill={colors.background.primary}
              stroke={colors.text.primary}
              strokeWidth="3"
            />
            <Circle cx="280" cy="140" r="4" fill={colors.text.primary} />
          </G>
        )}
      </Svg>

      {/* Realtime Moving GPS Telemetry Waypoint Beacon (Zero Cars) */}
      {showRoute && (
        <View
          style={[
            styles.beaconContainer,
            {
              left: `${(vehiclePos.x / 360) * 100}%`,
              top: `${(vehiclePos.y / 240) * 100}%`,
              transform: [{ translateX: -14 }, { translateY: -14 }],
            },
          ]}
        >
          <View style={{ transform: [{ rotate: `${vehiclePos.angle}deg` }] }}>
            <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
              <Circle cx={14} cy={14} r={12} fill={colors.background.primary} stroke={colors.accent.primary} strokeWidth={2.5} />
              <Path d="M14 6 L19 18 L14 15.5 L9 18 Z" fill={colors.accent.primary} />
            </Svg>
          </View>
        </View>
      )}

      {/* Dynamic Callout Bubble over Destination (matching video reference) */}
      {showRoute && driverEta && (
        <View style={styles.destinationCallout}>
          <View style={styles.calloutBubble}>
            <Text style={styles.calloutText}>{driverEta}</Text>
          </View>
          <View style={styles.calloutCaret} />
        </View>
      )}

      {/* Street Name Watermarks */}
      <Text style={styles.streetLabelLeft}>KINGS WAY</Text>
      <Text style={styles.streetLabelRight}>MAIN RD</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: "100%",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.surface.border,
    position: "relative",
  },
  streetLabelLeft: {
    position: "absolute",
    left: 16,
    top: 24,
    fontSize: 10,
    fontWeight: "600",
    color: "#1B3B68",
    letterSpacing: 1.5,
  },
  streetLabelRight: {
    position: "absolute",
    right: 20,
    bottom: 24,
    fontSize: 10,
    fontWeight: "600",
    color: "#1B3B68",
    letterSpacing: 1.5,
  },
  beaconContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  destinationCallout: {
    position: "absolute",
    right: "12%",
    top: "35%",
    alignItems: "center",
    zIndex: 10,
  },
  calloutBubble: {
    backgroundColor: colors.surface.card,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1.5,
    borderColor: colors.accent.primary,
    shadowColor: colors.accent.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  calloutText: {
    fontSize: 11,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  calloutCaret: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: colors.accent.primary,
    marginTop: -0.5,
  },
});

export default DarkRouteMap;
