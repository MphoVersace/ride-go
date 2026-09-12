import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import Svg, { Circle, Line, Rect, G, Defs, LinearGradient, Stop } from "react-native-svg";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/metrics";

interface TelemetryPulseLoaderProps {
  statusText?: string;
  coordinates?: string;
  showProgress?: boolean;
}

export const TelemetryPulseLoader: React.FC<TelemetryPulseLoaderProps> = ({
  statusText = "Syncing GPS Telemetry...",
  coordinates = "-26.2041° S, 28.0473° E",
  showProgress = true,
}) => {
  // Pulse animation for outer wave
  const pulseAnim = useRef(new Animated.Value(0.6)).current;
  const pulseOpacity = useRef(new Animated.Value(0.8)).current;

  // Continuous sonar rotation
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Linear progress fill
  const progressAnim = useRef(new Animated.Value(0.15)).current;

  useEffect(() => {
    // 1. Radar pulse loop
    const pulseLoop = Animated.loop(
      Animated.parallel([
        Animated.timing(pulseAnim, {
          toValue: 1.25,
          duration: 2000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseOpacity, {
          toValue: 0,
          duration: 2000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();

    // 2. Radar sweep rotation loop
    const rotateLoop = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 3500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotateLoop.start();

    // 3. Simulated progress buildup
    Animated.timing(progressAnim, {
      toValue: 0.96,
      duration: 3200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();

    return () => {
      pulseLoop.stop();
      rotateLoop.stop();
    };
  }, [pulseAnim, pulseOpacity, rotateAnim, progressAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      {/* Geometric Radar Pulse Arena */}
      <View style={styles.radarWrapper}>
        {/* Animated Expanding Pulse Ring */}
        <Animated.View
          style={[
            styles.pulseRing,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseOpacity,
            },
          ]}
        />

        {/* Static Concentric Range Rings */}
        <Svg width={180} height={180} viewBox="0 0 180 180" style={styles.radarSvg}>
          <Defs>
            <LinearGradient id="radarSweepGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor={colors.accent.primary} stopOpacity="0.4" />
              <Stop offset="100%" stopColor={colors.accent.primary} stopOpacity="0.0" />
            </LinearGradient>
          </Defs>

          {/* Range Grid Rings */}
          <Circle cx={90} cy={90} r={80} stroke={colors.surface.border} strokeWidth={1.5} strokeDasharray="4 4" />
          <Circle cx={90} cy={90} r={55} stroke={colors.surface.border} strokeWidth={1.5} />
          <Circle cx={90} cy={90} r={30} stroke={colors.surface.border} strokeWidth={1.5} strokeDasharray="3 3" />

          {/* Crosshairs */}
          <Line x1={10} y1={90} x2={170} y2={90} stroke={colors.surface.border} strokeWidth={1} strokeOpacity={0.6} />
          <Line x1={90} y1={10} x2={90} y2={170} stroke={colors.surface.border} strokeWidth={1} strokeOpacity={0.6} />

          {/* Active Network Waypoint Nodes */}
          <Circle cx={125} cy={60} r={3} fill={colors.accent.primary} />
          <Circle cx={55} cy={115} r={3} fill={colors.accent.primary} />
          <Circle cx={135} cy={125} r={2.5} fill={colors.text.muted} />
          <Circle cx={65} cy={50} r={2.5} fill={colors.text.muted} />
        </Svg>

        {/* Rotating Radar Sonar Sweep */}
        <Animated.View style={[styles.sweepContainer, { transform: [{ rotate: spin }] }]}>
          <Svg width={180} height={180} viewBox="0 0 180 180">
            <Line x1={90} y1={90} x2={170} y2={90} stroke={colors.accent.primary} strokeWidth={2} />
          </Svg>
        </Animated.View>

        {/* Central GPS Lock Beacon */}
        <View style={styles.centerNode}>
          <View style={styles.centerNodeInner} />
        </View>
      </View>

      {/* Coordinate Telemetry Tag */}
      <View style={styles.coordinateBadge}>
        <Text style={styles.coordinateText}>{coordinates}</Text>
      </View>

      {/* Status Message */}
      <Text style={styles.statusText}>{statusText}</Text>

      {/* High-Tech Progress Bar */}
      {showProgress && (
        <View style={styles.progressBarHolder}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  radarWrapper: {
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  radarSvg: {
    position: "absolute",
  },
  pulseRing: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: colors.accent.primary,
  },
  sweepContainer: {
    position: "absolute",
    width: 180,
    height: 180,
  },
  centerNode: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.surface.card,
    borderWidth: 2,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  centerNodeInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.primary,
  },
  coordinateBadge: {
    marginTop: spacing.lg,
    backgroundColor: colors.surface.card,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  coordinateText: {
    fontSize: 11,
    fontFamily: "monospace",
    color: colors.accent.primary,
    letterSpacing: 0.8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.secondary,
    textAlign: "center",
    marginTop: spacing.sm,
    letterSpacing: 0.5,
  },
  progressBarHolder: {
    width: 220,
    marginTop: spacing.md,
  },
  progressTrack: {
    width: "100%",
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surface.border,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.accent.primary,
    borderRadius: 2,
  },
});

export default TelemetryPulseLoader;
