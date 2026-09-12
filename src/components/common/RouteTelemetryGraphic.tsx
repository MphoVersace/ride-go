import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Svg, {
  Path,
  Rect,
  Circle,
  Line,
  G,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/metrics";

export type TelemetryGraphicMode = "network" | "fare" | "dispatch";

interface RouteTelemetryGraphicProps {
  mode: TelemetryGraphicMode;
  width?: number;
  height?: number;
}

export const RouteTelemetryGraphic: React.FC<RouteTelemetryGraphicProps> = ({
  mode,
  width = 300,
  height = 200,
}) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.15],
  });

  // 1. NETWORK MATRIX MODE (Slide 1: Point-to-Point Metro Connectivity)
  if (mode === "network") {
    return (
      <View style={[styles.container, { width, height }]}>
        <Svg width={width} height={height} viewBox="0 0 300 200" fill="none">
          <Defs>
            <LinearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor={colors.accent.primary} stopOpacity="1" />
              <Stop offset="100%" stopColor={colors.accent.secondary} stopOpacity="0.8" />
            </LinearGradient>
            <LinearGradient id="nodeGlow" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={colors.accent.primary} stopOpacity="0.3" />
              <Stop offset="100%" stopColor={colors.accent.primary} stopOpacity="0.0" />
            </LinearGradient>
          </Defs>

          {/* Background Grid Canvas */}
          <Rect x="10" y="10" width="280" height="180" rx="16" fill={colors.surface.card} stroke={colors.surface.border} strokeWidth="1.5" />
          
          {/* Subtle Coordinate Grid Lines */}
          <Line x1="10" y1="70" x2="290" y2="70" stroke={colors.surface.border} strokeWidth="0.8" strokeDasharray="3 3" />
          <Line x1="10" y1="130" x2="290" y2="130" stroke={colors.surface.border} strokeWidth="0.8" strokeDasharray="3 3" />
          <Line x1="100" y1="10" x2="100" y2="190" stroke={colors.surface.border} strokeWidth="0.8" strokeDasharray="3 3" />
          <Line x1="200" y1="10" x2="200" y2="190" stroke={colors.surface.border} strokeWidth="0.8" strokeDasharray="3 3" />

          {/* Primary Route Path Curved Vector */}
          <Path
            d="M 50 145 C 90 145, 110 55, 170 55 C 220 55, 225 125, 255 125"
            stroke="url(#routeGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Secondary Feeder Line */}
          <Path
            d="M 170 55 L 240 45"
            stroke={colors.surface.border}
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />

          {/* Origin Node (JHB Central) */}
          <Circle cx="50" cy="145" r="14" fill="url(#nodeGlow)" />
          <Circle cx="50" cy="145" r="7" fill={colors.accent.primary} />
          <Circle cx="50" cy="145" r="3" fill="#FFFFFF" />

          {/* Transfer Node (Sandton Junction) */}
          <Circle cx="170" cy="55" r="16" fill="url(#nodeGlow)" />
          <Circle cx="170" cy="55" r="8" fill={colors.accent.primary} />
          <Circle cx="170" cy="55" r="3" fill="#FFFFFF" />

          {/* Destination Node (Pretoria Gate) */}
          <Circle cx="255" cy="125" r="12" fill="url(#nodeGlow)" />
          <Circle cx="255" cy="125" r="6" fill={colors.accent.primary} />
          <Circle cx="255" cy="125" r="2" fill="#FFFFFF" />

          {/* Sub-node */}
          <Circle cx="240" cy="45" r="4" fill={colors.text.muted} />

          {/* Route Distance Callout Card */}
          <Rect x="70" y="85" width="160" height="34" rx="8" fill={colors.background.primary} stroke={colors.surface.border} strokeWidth="1" />
        </Svg>

        <View style={styles.networkMetricOverlay}>
          <Text style={styles.metricText}>18.4 km • 14 MIN ETA</Text>
          <Text style={styles.metricSubText}>Johannesburg ➔ Sandton Hub</Text>
        </View>
      </View>
    );
  }

  // 2. FARE GUARANTEE MODE (Slide 2: Upfront Transparent Rand Pricing)
  if (mode === "fare") {
    return (
      <View style={[styles.container, { width, height }]}>
        <View style={styles.fareCardHolder}>
          {/* Header Row */}
          <View style={styles.fareHeaderRow}>
            <View>
              <Text style={styles.fareCategoryLabel}>GUARANTEED RAND FARE</Text>
              <Text style={styles.fareAmountText}>R 145.00</Text>
            </View>
            <View style={styles.lockBadge}>
              <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                <Rect x="4" y="10" width="16" height="11" rx="2" stroke={colors.accent.primary} strokeWidth="2" />
                <Path d="M8 10V7a4 4 0 118 0v3" stroke={colors.accent.primary} strokeWidth="2" />
              </Svg>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.fareDivider} />

          {/* Metric Breakdown Rows */}
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Base Transit Distance</Text>
            <Text style={styles.breakdownValue}>18.4 km</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Estimated Travel Time</Text>
            <Text style={styles.breakdownValue}>14 mins</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Surge Multiplier</Text>
            <Text style={styles.breakdownHighlight}>0.0x (Guaranteed Flat)</Text>
          </View>
        </View>
      </View>
    );
  }

  // 3. SATELLITE DISPATCH MODE (Slide 3: Instant National Dispatch)
  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height} viewBox="0 0 300 200" fill="none">
        <Defs>
          <LinearGradient id="dispatchGlow" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={colors.accent.primary} stopOpacity="0.25" />
            <Stop offset="100%" stopColor={colors.accent.primary} stopOpacity="0.02" />
          </LinearGradient>
        </Defs>

        {/* Outer Card */}
        <Rect x="10" y="10" width="280" height="180" rx="16" fill={colors.surface.card} stroke={colors.surface.border} strokeWidth="1.5" />

        {/* Concentric Satellite Dispatch Rings */}
        <Circle cx="150" cy="95" r="75" stroke={colors.surface.border} strokeWidth="1.5" strokeDasharray="4 4" />
        <Circle cx="150" cy="95" r="50" stroke={colors.surface.border} strokeWidth="1.5" />
        <Circle cx="150" cy="95" r="26" fill="url(#dispatchGlow)" stroke={colors.accent.primary} strokeWidth="1.5" />

        {/* Crosshair Sweep */}
        <Line x1="45" y1="95" x2="255" y2="95" stroke={colors.surface.border} strokeWidth="1" strokeOpacity={0.6} />
        <Line x1="150" y1="20" x2="150" y2="170" stroke={colors.surface.border} strokeWidth="1" strokeOpacity={0.6} />

        {/* Active Local Fleet Waypoints */}
        <Circle cx="110" cy="65" r="4" fill={colors.accent.primary} />
        <Circle cx="185" cy="75" r="4" fill={colors.accent.primary} />
        <Circle cx="195" cy="130" r="3.5" fill={colors.accent.primary} />
        <Circle cx="95" cy="120" r="3.5" fill={colors.accent.primary} />
        <Circle cx="130" cy="150" r="3" fill={colors.text.muted} />
        <Circle cx="170" cy="40" r="3" fill={colors.text.muted} />

        {/* Center Dispatch Beacon */}
        <Circle cx="150" cy="95" r="9" fill={colors.accent.primary} />
        <Circle cx="150" cy="95" r="4" fill="#FFFFFF" />
      </Svg>

      <View style={styles.dispatchOverlay}>
        <Text style={styles.dispatchTitle}>RAPID TRANSIT DISPATCH</Text>
        <Text style={styles.dispatchSubtitle}>Average Response: 2.8 mins</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  networkMetricOverlay: {
    position: "absolute",
    top: 92,
    alignItems: "center",
    justifyContent: "center",
  },
  metricText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.accent.primary,
    letterSpacing: 0.5,
  },
  metricSubText: {
    fontSize: 10,
    color: colors.text.muted,
    marginTop: 2,
  },
  fareCardHolder: {
    width: 280,
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    padding: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  fareHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fareCategoryLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.text.muted,
    letterSpacing: 1.2,
  },
  fareAmountText: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.text.primary,
    marginTop: 2,
  },
  lockBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface.elevated,
    borderWidth: 1,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  fareDivider: {
    height: 1,
    backgroundColor: colors.surface.divider,
    marginVertical: spacing.sm,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3,
  },
  breakdownLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  breakdownValue: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text.primary,
  },
  breakdownHighlight: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  dispatchOverlay: {
    position: "absolute",
    bottom: 18,
    alignItems: "center",
  },
  dispatchTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.accent.primary,
    letterSpacing: 1.2,
  },
  dispatchSubtitle: {
    fontSize: 11,
    color: colors.text.secondary,
    marginTop: 2,
  },
});

export default RouteTelemetryGraphic;
