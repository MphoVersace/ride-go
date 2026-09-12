import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Svg, { Circle, Path, Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/metrics";
import { VehicleSideSvg, VehicleTopDownSvg } from "./VehicleSvgs";

interface VehicleLoaderProps {
  size?: "sm" | "md" | "lg";
  statusText?: string;
  showProgress?: boolean;
  mode?: "highway" | "circuit";
}

export const VehicleLoader: React.FC<VehicleLoaderProps> = ({
  size = "md",
  statusText,
  showProgress = true,
  mode = "highway",
}) => {
  // Road lane scroll animation
  const roadScrollAnim = useRef(new Animated.Value(0)).current;
  // Vehicle suspension float animation
  const carFloatAnim = useRef(new Animated.Value(0)).current;
  // Circuit rotation animation
  const circuitRotateAnim = useRef(new Animated.Value(0)).current;
  // Progress bar animation
  const progressAnim = useRef(new Animated.Value(0.1)).current;

  useEffect(() => {
    // 1. Road lane infinite horizontal scroll
    const roadLoop = Animated.loop(
      Animated.timing(roadScrollAnim, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // 2. Subtle car float / suspension simulation
    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(carFloatAnim, {
          toValue: -2.5,
          duration: 450,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(carFloatAnim, {
          toValue: 1.5,
          duration: 450,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    // 3. Circular track orbit animation
    const circuitLoop = Animated.loop(
      Animated.timing(circuitRotateAnim, {
        toValue: 1,
        duration: 3600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    // 4. Looping progress bar
    const progLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(progressAnim, {
          toValue: 0.95,
          duration: 2200,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(progressAnim, {
          toValue: 0.15,
          duration: 600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: false,
        }),
      ])
    );

    roadLoop.start();
    floatLoop.start();
    circuitLoop.start();
    progLoop.start();

    return () => {
      roadLoop.stop();
      floatLoop.stop();
      circuitLoop.stop();
      progLoop.stop();
    };
  }, [roadScrollAnim, carFloatAnim, circuitRotateAnim, progressAnim]);

  const roadTranslateX = roadScrollAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40],
  });

  const circuitRotation = circuitRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const dimensions = {
    sm: { width: 140, carScale: 0.7, height: 90 },
    md: { width: 220, carScale: 1.0, height: 120 },
    lg: { width: 280, carScale: 1.25, height: 150 },
  }[size];

  if (mode === "circuit") {
    const orbitRadius = size === "sm" ? 60 : size === "md" ? 85 : 110;
    const trackSize = orbitRadius * 2 + 40;

    return (
      <View style={[styles.container, { width: trackSize, height: trackSize }]}>
        {/* Track Vector Rings */}
        <Svg
          width={trackSize}
          height={trackSize}
          style={StyleSheet.absoluteFill}
          viewBox={`0 0 ${trackSize} ${trackSize}`}
        >
          <Defs>
            <LinearGradient id="trackGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor={colors.accent.primary} stopOpacity="0.4" />
              <Stop offset="100%" stopColor={colors.surface.border} stopOpacity="0.1" />
            </LinearGradient>
          </Defs>
          {/* Outer Boundary */}
          <Circle
            cx={trackSize / 2}
            cy={trackSize / 2}
            r={orbitRadius + 14}
            stroke={colors.surface.border}
            strokeWidth="1.5"
            fill="none"
          />
          {/* Main Road Highway Track */}
          <Circle
            cx={trackSize / 2}
            cy={trackSize / 2}
            r={orbitRadius}
            stroke={colors.surface.card}
            strokeWidth="28"
            fill="none"
          />
          {/* Dashed Center Guide Line */}
          <Circle
            cx={trackSize / 2}
            cy={trackSize / 2}
            r={orbitRadius}
            stroke={colors.accent.primary}
            strokeWidth="1.5"
            strokeDasharray="6 8"
            strokeOpacity="0.5"
            fill="none"
          />
          {/* Inner Boundary */}
          <Circle
            cx={trackSize / 2}
            cy={trackSize / 2}
            r={orbitRadius - 14}
            stroke={colors.surface.border}
            strokeWidth="1.5"
            fill="none"
          />
        </Svg>

        {/* Orbiting Precision Top-Down Vehicle */}
        <Animated.View
          style={[
            styles.circuitOrbit,
            {
              width: trackSize,
              height: trackSize,
              transform: [{ rotate: circuitRotation }],
            },
          ]}
        >
          <View style={[styles.circuitCarWrap, { top: (trackSize / 2) - orbitRadius - 20 }]}>
            <VehicleTopDownSvg
              width={20 * dimensions.carScale}
              height={40 * dimensions.carScale}
              bodyColor={colors.accent.primary}
              rotation={90}
            />
          </View>
        </Animated.View>

        {/* Central Core Radar Hub */}
        <View style={styles.circuitCenterHub}>
          <View style={styles.circuitInnerDot} />
        </View>

        {statusText ? <Text style={styles.statusLabel}>{statusText}</Text> : null}
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: dimensions.width }]}>
      {/* Visual Roadway Bay */}
      <View style={[styles.roadBay, { height: dimensions.height }]}>
        {/* Ambient Backlight Glow */}
        <View style={styles.ambientGlow} />

        {/* Headlight Beam Cone in Cyan */}
        <View style={styles.headlightCone}>
          <Svg width={120} height={40} viewBox="0 0 120 40">
            <Defs>
              <LinearGradient id="beamGrad" x1="0" y1="0.5" x2="1" y2="0.5">
                <Stop offset="0%" stopColor={colors.accent.primary} stopOpacity="0.55" />
                <Stop offset="100%" stopColor={colors.accent.primary} stopOpacity="0" />
              </LinearGradient>
            </Defs>
            <Path d="M0 16 L120 0 L120 40 L0 24 Z" fill="url(#beamGrad)" />
          </Svg>
        </View>

        {/* Floating Precision Vehicle (Side Profile) */}
        <Animated.View
          style={[
            styles.carContainer,
            {
              transform: [{ translateY: carFloatAnim }],
            },
          ]}
        >
          <VehicleSideSvg
            width={110 * dimensions.carScale}
            height={55 * dimensions.carScale}
            color={colors.accent.primary}
          />
        </Animated.View>

        {/* Scrolling Highway Ground Track */}
        <View style={styles.highwayStrip}>
          <View style={styles.roadTopLine} />

          <Animated.View
            style={[
              styles.dashedLanesWrap,
              {
                transform: [{ translateX: roadTranslateX }],
              },
            ]}
          >
            {/* Multiple repeating road dashes */}
            {Array.from({ length: 12 }).map((_, idx) => (
              <View key={idx} style={styles.laneDash} />
            ))}
          </Animated.View>

          <View style={styles.roadBottomLine} />
        </View>
      </View>

      {/* Dynamic Telemetry Status Ticker */}
      {statusText ? <Text style={styles.statusLabel}>{statusText}</Text> : null}

      {/* Looping Telemetry Progress Bar */}
      {showProgress ? (
        <View style={styles.progressBarTrack}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progressWidth,
              },
            ]}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  roadBay: {
    width: "100%",
    backgroundColor: colors.surface.card,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  ambientGlow: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.surface.elevated,
    opacity: 0.6,
  },
  headlightCone: {
    position: "absolute",
    right: 6,
    top: "34%",
    zIndex: 1,
  },
  carContainer: {
    zIndex: 2,
    marginBottom: 10,
  },
  highwayStrip: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 22,
    backgroundColor: colors.background.deep,
    overflow: "hidden",
    justifyContent: "center",
  },
  roadTopLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.surface.border,
  },
  roadBottomLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.surface.border,
  },
  dashedLanesWrap: {
    flexDirection: "row",
    alignItems: "center",
    width: 400,
    gap: 16,
    paddingLeft: 10,
  },
  laneDash: {
    width: 24,
    height: 3,
    backgroundColor: colors.accent.primary,
    borderRadius: 1.5,
    opacity: 0.75,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text.secondary,
    textAlign: "center",
    marginTop: spacing.md,
    letterSpacing: 0.3,
  },
  progressBarTrack: {
    width: "100%",
    height: 4,
    backgroundColor: colors.surface.border,
    borderRadius: 2,
    marginTop: spacing.sm,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.accent.primary,
    borderRadius: 2,
  },

  /* Circuit Mode Styles */
  circuitOrbit: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  circuitCarWrap: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  circuitCenterHub: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface.elevated,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  circuitInnerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.accent.primary,
  },
});

export default VehicleLoader;
