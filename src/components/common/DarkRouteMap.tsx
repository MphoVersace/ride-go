import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Path, Circle, Rect, Line, G } from "react-native-svg";
import { colors } from "../../constants/colors";

interface DarkRouteMapProps {
  height?: number;
  showRoute?: boolean;
  driverEta?: string;
}

export const DarkRouteMap: React.FC<DarkRouteMapProps> = ({
  height = 240,
  showRoute = true,
  driverEta,
}) => {
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
            <Circle cx="70" cy="180" r="10" fill={colors.background.primary} stroke={colors.accent.primary} strokeWidth="3" />
            <Circle cx="70" cy="180" r="4" fill={colors.accent.primary} />

            {/* In-Transit Vehicle Position */}
            <Circle cx="180" cy="80" r="14" fill={colors.surface.card} stroke={colors.accent.primary} strokeWidth="2" />
            <Circle cx="180" cy="80" r="6" fill={colors.accent.primary} />

            {/* Destination Marker */}
            <Circle cx="280" cy="140" r="10" fill={colors.background.primary} stroke={colors.text.primary} strokeWidth="3" />
            <Circle cx="280" cy="140" r="4" fill={colors.text.primary} />
          </G>
        )}
      </Svg>

      {/* Street Name Watermarks */}
      <Text style={styles.streetLabelLeft}>KINGS WAY</Text>
      <Text style={styles.streetLabelRight}>MAIN RD</Text>

      {driverEta && (
        <View style={styles.etaPill}>
          <Text style={styles.etaText}>{driverEta}</Text>
        </View>
      )}
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
  etaPill: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: colors.accent.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  etaText: {
    color: colors.accent.contrast,
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default DarkRouteMap;
