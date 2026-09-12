import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { RootStackScreenProps } from "../../navigation/types";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/metrics";
import { VehicleSideSvg } from "../../components/common/VehicleSvgs";
import { ShieldCheckIcon, ArrowRightIcon } from "../../components/common/SvgIcons";
import VehicleLoader from "../../components/common/VehicleLoader";

export default function SplashOnboardingScreen({
  navigation,
}: RootStackScreenProps<"SplashOnboarding">) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [splashStep, setSplashStep] = useState(0);

  const logoScale = useRef(new Animated.Value(0.75)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  // Onboarding hero entry animation
  const heroFadeAnim = useRef(new Animated.Value(0)).current;
  const heroSlideAnim = useRef(new Animated.Value(20)).current;

  const splashMessages = [
    "Initializing RideGo Telemetry...",
    "Connecting to GPS satellite nodes...",
    "Verifying South African active fleet...",
    "Ready to move.",
  ];

  useEffect(() => {
    // 1. Logo spring entrance
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Cycling splash telemetry messages
    const stepTimer1 = setTimeout(() => setSplashStep(1), 900);
    const stepTimer2 = setTimeout(() => setSplashStep(2), 1800);
    const stepTimer3 = setTimeout(() => setSplashStep(3), 2600);

    // 3. Transition to Onboarding Screen after 3.3s
    const splashTimer = setTimeout(() => {
      setShowOnboarding(true);
      Animated.parallel([
        Animated.timing(heroFadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(heroSlideAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();
    }, 3300);

    return () => {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      clearTimeout(splashTimer);
    };
  }, [logoScale, logoOpacity, heroFadeAnim, heroSlideAnim]);

  // ONBOARDING SCREEN
  if (showOnboarding) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />

        {/* Top Header Bar */}
        <View style={styles.onboardingHeader}>
          <View>
            <Text style={styles.onboardingBrandTitle}>RideGo</Text>
            <Text style={styles.onboardingBrandTag}>SOUTH AFRICA</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Account")}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Visual Card (Concentric Rings + Floating Shield + Precision Vehicle) */}
        <Animated.View
          style={[
            styles.heroVisualWrap,
            {
              opacity: heroFadeAnim,
              transform: [{ translateY: heroSlideAnim }],
            },
          ]}
        >
          <View style={styles.pedestalOuterRing}>
            <View style={styles.pedestalInnerRing}>
              {/* Floating Verified Shield Badge */}
              <View style={styles.floatingShieldBadge}>
                <ShieldCheckIcon size={24} color={colors.accent.primary} />
              </View>

              {/* Precision Vector Vehicle */}
              <View style={styles.pedestalCarContainer}>
                <VehicleSideSvg
                  width={190}
                  height={90}
                  color={colors.accent.primary}
                />
              </View>
            </View>
          </View>

          {/* Key Value Proposition Badges */}
          <View style={styles.featureChipsRow}>
            <View style={styles.featureChip}>
              <ShieldCheckIcon size={14} color={colors.accent.primary} />
              <Text style={styles.featureChipText}>Verified 5-Star Drivers</Text>
            </View>
            <View style={styles.featureChip}>
              <ShieldCheckIcon size={14} color={colors.accent.primary} />
              <Text style={styles.featureChipText}>SAPS 10111 Integrated</Text>
            </View>
          </View>
        </Animated.View>

        {/* Onboarding Copy */}
        <View style={styles.copyContainer}>
          <Text style={styles.heading}>Ride with confidence</Text>
          <Text style={styles.description}>
            Safe, reliable passenger rides and rapid parcel logistics across South Africa with upfront Rand pricing.
          </Text>

          {/* Pagination Indicators */}
          <View style={styles.paginationRow}>
            <View style={[styles.pageDot, styles.pageDotActive]} />
            <View style={styles.pageDot} />
            <View style={styles.pageDot} />
          </View>
        </View>

        {/* Bottom CTA Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.getStartedButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Account")}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
            <ArrowRightIcon size={20} color={colors.accent.contrast} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // SPLASH LOADING SCREEN
  return (
    <View style={styles.splashContainer}>
      <StatusBar style="light" />

      {/* Animated Brand Header */}
      <Animated.View
        style={[
          styles.splashBrandContainer,
          {
            opacity: logoOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      >
        <Text style={styles.splashLogo}>RideGo</Text>
        <Text style={styles.splashSubtitle}>SOUTH AFRICA • ON-DEMAND MOBILITY</Text>
      </Animated.View>

      {/* Modern High-Tech Highway Vehicle Loading Visual */}
      <View style={styles.loaderWrap}>
        <VehicleLoader
          size="lg"
          mode="highway"
          showProgress={true}
          statusText={splashMessages[splashStep]}
        />
      </View>

      {/* Subtle Bottom Footer */}
      <View style={styles.splashFooter}>
        <Text style={styles.splashFooterText}>SECURE • RELIABLE • LOCAL</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  splashBrandContainer: {
    alignItems: "center",
    marginTop: spacing.xl,
  },
  splashLogo: {
    fontSize: 52,
    fontWeight: "bold",
    color: colors.accent.primary,
    letterSpacing: -1,
  },
  splashSubtitle: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.text.secondary,
    letterSpacing: 2,
    marginTop: 6,
  },
  loaderWrap: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  splashFooter: {
    marginBottom: spacing.md,
  },
  splashFooterText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.text.muted,
    letterSpacing: 1.5,
  },

  /* Onboarding Styles */
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.md,
    justifyContent: "space-between",
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  onboardingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.md,
  },
  onboardingBrandTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  onboardingBrandTag: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.text.secondary,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  skipButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  skipText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text.secondary,
  },
  heroVisualWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.md,
  },
  pedestalOuterRing: {
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: colors.surface.card,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  pedestalInnerRing: {
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: colors.surface.elevated,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  floatingShieldBadge: {
    position: "absolute",
    top: -16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface.elevated,
    borderWidth: 2,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    zIndex: 10,
  },
  pedestalCarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  featureChipsRow: {
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.md,
  },
  featureChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface.card,
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  featureChipText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.text.secondary,
  },
  copyContainer: {
    alignItems: "center",
    paddingHorizontal: spacing.sm,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text.secondary,
    textAlign: "center",
    maxWidth: 320,
    marginBottom: spacing.md,
  },
  paginationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: spacing.xs,
  },
  pageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surface.border,
  },
  pageDotActive: {
    width: 24,
    backgroundColor: colors.accent.primary,
  },
  bottomSection: {
    width: "100%",
  },
  getStartedButton: {
    width: "100%",
    height: 56,
    backgroundColor: colors.accent.primary,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    shadowColor: colors.accent.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
});
