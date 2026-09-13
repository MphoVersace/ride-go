import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackScreenProps } from "../../navigation/types";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/metrics";
import { useRide } from "../../services/RideContext";
import Svg, { Circle, Path, Rect, Defs, RadialGradient, Stop } from "react-native-svg";
import { ArrowLeftIcon, PinIcon } from "../../components/common/SvgIcons";
import { StandardTelemetryVector } from "../../components/common/MobilityTelemetryVectors";

export default function RideSearchingScreen({
  navigation,
}: RootStackScreenProps<"RideSearching">) {
  const { pickup, destination, tier, tierFares, matchDriver } = useRide();
  const [statusText, setStatusText] = useState("Scanning local grid for nearby drivers...");

  // Expanding sonar waves
  const pulseAnim1 = useRef(new Animated.Value(0.15)).current;
  const pulseAnim2 = useRef(new Animated.Value(0.15)).current;
  const pulseAnim3 = useRef(new Animated.Value(0.15)).current;

  // Continuous rotating scanner beam
  const scanRotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered radar ripple loops
    const createPulse = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 2400,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.15,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const pulse1 = createPulse(pulseAnim1, 0);
    const pulse2 = createPulse(pulseAnim2, 800);
    const pulse3 = createPulse(pulseAnim3, 1600);

    pulse1.start();
    pulse2.start();
    pulse3.start();

    // Rotating scanner beam
    const scanLoop = Animated.loop(
      Animated.timing(scanRotateAnim, {
        toValue: 1,
        duration: 3600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    scanLoop.start();

    // Simulated matching telemetry steps
    const t1 = setTimeout(() => {
      setStatusText("Analyzing shortest route on Kings Way...");
    }, 1200);

    const t2 = setTimeout(() => {
      setStatusText("Driver matched! Securing booking...");
    }, 2400);

    const t3 = setTimeout(() => {
      matchDriver();
      navigation.replace("DriverFound");
    }, 3400);

    return () => {
      pulse1.stop();
      pulse2.stop();
      pulse3.stop();
      scanLoop.stop();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigation, matchDriver, pulseAnim1, pulseAnim2, pulseAnim3, scanRotateAnim]);

  const spinInterpolation = scanRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleCancel = () => {
    navigation.navigate("RiderHome");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Top Dispatch Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={handleCancel}
        >
          <ArrowLeftIcon size={20} color={colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.dispatchLabel}>RIDE-GO DISPATCH</Text>
          <Text style={styles.headerTitle}>Finding Your Driver</Text>
        </View>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        {/* Tactical Radar Viewport */}
        <View style={styles.radarViewport}>
          {/* Tactical Geo-Grid SVG */}
          <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" viewBox="0 0 320 320">
            <Defs>
              <RadialGradient id="radarBackdrop" cx="50%" cy="50%" rx="50%" ry="50%">
                <Stop offset="0%" stopColor="#FFD100" stopOpacity="0.22" />
                <Stop offset="65%" stopColor="#FFD100" stopOpacity="0.04" />
                <Stop offset="100%" stopColor="#FFD100" stopOpacity="0" />
              </RadialGradient>
            </Defs>

            {/* Dark background */}
            <Rect width="320" height="320" fill={colors.background.deep} />
            <Rect width="320" height="320" fill="url(#radarBackdrop)" />

            {/* Grid coordinates */}
            <Path
              d="M0 80 H320 M0 160 H320 M0 240 H320 M80 0 V320 M160 0 V320 M240 0 V320"
              stroke="#22222B"
              strokeWidth="1"
              strokeDasharray="4,4"
              fill="none"
            />

            {/* Road network vectors */}
            <Path
              d="M-20 180 Q 110 150 160 160 T 340 140"
              fill="none"
              stroke="#2E2E38"
              strokeWidth="5"
            />
            <Path
              d="M140 -20 Q 150 120 160 200 T 180 340"
              fill="none"
              stroke="#2E2E38"
              strokeWidth="6"
            />

            {/* Fixed Concentric Range Circles */}
            <Circle cx="160" cy="160" r="40" stroke="#FFD100" strokeWidth="1" strokeOpacity="0.3" fill="none" />
            <Circle cx="160" cy="160" r="80" stroke="#FFD100" strokeWidth="1" strokeOpacity="0.25" fill="none" />
            <Circle cx="160" cy="160" r="120" stroke="#FFD100" strokeWidth="1" strokeOpacity="0.18" fill="none" />
          </Svg>

          {/* Animated Sonar Wave 1 */}
          <Animated.View
            style={[
              styles.sonarWave,
              {
                transform: [{ scale: pulseAnim1 }],
                opacity: pulseAnim1.interpolate({
                  inputRange: [0.15, 0.8, 1],
                  outputRange: [0.8, 0.4, 0],
                }),
              },
            ]}
          />

          {/* Animated Sonar Wave 2 */}
          <Animated.View
            style={[
              styles.sonarWave,
              {
                transform: [{ scale: pulseAnim2 }],
                opacity: pulseAnim2.interpolate({
                  inputRange: [0.15, 0.8, 1],
                  outputRange: [0.8, 0.4, 0],
                }),
              },
            ]}
          />

          {/* Animated Sonar Wave 3 */}
          <Animated.View
            style={[
              styles.sonarWave,
              {
                transform: [{ scale: pulseAnim3 }],
                opacity: pulseAnim3.interpolate({
                  inputRange: [0.15, 0.8, 1],
                  outputRange: [0.8, 0.4, 0],
                }),
              },
            ]}
          />

          {/* Rotating Radar Scanner Beam */}
          <Animated.View
            style={[
              styles.scannerSweepContainer,
              {
                transform: [{ rotate: spinInterpolation }],
              },
            ]}
          >
            <View style={styles.scannerNeedle} />
          </Animated.View>

          {/* Nearby Driver Telemetry Ping 1 */}
          <View style={[styles.driverPingWrap, { top: "28%", left: "22%" }]}>
            <View style={styles.driverPingBadge}>
              <StandardTelemetryVector width={24} height={12} color={colors.accent.primary} />
            </View>
            <Text style={styles.pingEtaText}>3m</Text>
          </View>

          {/* Nearby Driver Telemetry Ping 2 */}
          <View style={[styles.driverPingWrap, { bottom: "25%", right: "20%" }]}>
            <View style={styles.driverPingBadge}>
              <StandardTelemetryVector width={24} height={12} color={colors.text.secondary} />
            </View>
            <Text style={styles.pingEtaText}>4m</Text>
          </View>

          {/* Central User Position Anchor */}
          <View style={styles.userPositionAnchor}>
            <View style={styles.userPulseRing} />
            <View style={styles.userCenterDot} />
          </View>
        </View>

        {/* Dispatch Telemetry Status */}
        <View style={styles.telemetryStatusCard}>
          <View style={styles.liveStatusRow}>
            <View style={styles.statusBlinkDot} />
            <Text style={styles.statusHeadlineText}>{statusText}</Text>
          </View>
          <Text style={styles.statusSubtext}>
            Connecting to high-rated transit partners in your immediate radius
          </Text>
        </View>

        {/* Trip Recap Card */}
        <View style={styles.tripRecapCard}>
          <View style={styles.recapRow}>
            <View style={styles.recapDot} />
            <Text style={styles.recapText} numberOfLines={1}>
              {pickup.title || "Current Location"}
            </Text>
          </View>
          <View style={styles.recapDivider} />
          <View style={styles.recapRow}>
            <View style={styles.recapDotDest} />
            <Text style={styles.recapText} numberOfLines={1}>
              {destination.title || "Destination"}
            </Text>
          </View>
          <View style={styles.recapFareRow}>
            <Text style={styles.recapTierLabel}>
              {tier.toUpperCase()} TIER
            </Text>
            <Text style={styles.recapFareAmount}>
              R{tierFares[tier]}.00
            </Text>
          </View>
        </View>

        {/* Cancel Action */}
        <TouchableOpacity
          style={styles.cancelButton}
          activeOpacity={0.8}
          onPress={handleCancel}
        >
          <Text style={styles.cancelButtonText}>CANCEL SEARCH</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  headerCenter: {
    alignItems: "center",
  },
  dispatchLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.accent.primary,
    letterSpacing: 1.4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text.primary,
    marginTop: 2,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
    justifyContent: "space-between",
    paddingBottom: spacing.xl,
  },
  radarViewport: {
    width: "100%",
    aspectRatio: 1,
    maxHeight: 300,
    borderRadius: 20,
    backgroundColor: colors.surface.card,
    overflow: "hidden",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderWidth: 1.5,
    borderColor: colors.surface.border,
  },
  sonarWave: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 2,
    borderColor: colors.accent.primary,
  },
  scannerSweepContainer: {
    position: "absolute",
    width: 240,
    height: 240,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scannerNeedle: {
    width: 2,
    height: 120,
    backgroundColor: colors.accent.primary,
    opacity: 0.8,
  },
  driverPingWrap: {
    position: "absolute",
    alignItems: "center",
    gap: 2,
  },
  driverPingBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface.card,
    borderWidth: 1,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  pingEtaText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.accent.primary,
    backgroundColor: "rgba(10, 10, 12, 0.9)",
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  userPositionAnchor: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  userPulseRing: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 209, 0, 0.3)",
  },
  userCenterDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent.primary,
  },
  telemetryStatusCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: 6,
  },
  liveStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusBlinkDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.primary,
  },
  statusHeadlineText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.primary,
  },
  statusSubtext: {
    fontSize: 11,
    color: colors.text.secondary,
    paddingLeft: 16,
  },
  tripRecapCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: 8,
  },
  recapRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  recapDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.primary,
  },
  recapDotDest: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: colors.text.primary,
  },
  recapText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text.primary,
    flex: 1,
  },
  recapDivider: {
    height: 1,
    backgroundColor: colors.surface.border,
    marginLeft: 16,
  },
  recapFareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.surface.border,
  },
  recapTierLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.accent.primary,
    letterSpacing: 1,
  },
  recapFareAmount: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text.primary,
  },
  cancelButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surface.card,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.text.secondary,
    letterSpacing: 1.2,
  },
});
