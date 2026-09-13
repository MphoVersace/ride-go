import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
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
import { ArrowRightIcon } from "../../components/common/SvgIcons";
import RouteTelemetryGraphic, { TelemetryGraphicMode } from "../../components/common/RouteTelemetryGraphic";
import TelemetryPulseLoader from "../../components/common/TelemetryPulseLoader";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface OnboardingSlide {
  id: string;
  mode: TelemetryGraphicMode;
  title: string;
  description: string;
}

const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: "slide_1",
    mode: "network",
    title: "Smart Point-to-Point Travel",
    description:
      "Direct on-demand transit mapped seamlessly across South African metros with optimized routing.",
  },
  {
    id: "slide_2",
    mode: "fare",
    title: "Upfront Transparent Fares",
    description:
      "Clear Rand pricing locked before you confirm with zero hidden fees or unexpected surge spikes.",
  },
  {
    id: "slide_3",
    mode: "dispatch",
    title: "Instant National Dispatch",
    description:
      "Connect with local mobility partners in seconds with live satellite route tracking.",
  },
];

export default function SplashOnboardingScreen({
  navigation,
}: RootStackScreenProps<"SplashOnboarding">) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [splashStep, setSplashStep] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.75)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const splashMessages = [
    "Initializing RideGo Telemetry...",
    "Connecting to GPS satellite nodes...",
    "Verifying active South African routes...",
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
    const stepTimer1 = setTimeout(() => setSplashStep(1), 800);
    const stepTimer2 = setTimeout(() => setSplashStep(2), 1600);
    const stepTimer3 = setTimeout(() => setSplashStep(3), 2400);

    // 3. Transition to Onboarding Screen after 3.2s
    const splashTimer = setTimeout(() => {
      setShowOnboarding(true);
    }, 3200);

    return () => {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      clearTimeout(splashTimer);
    };
  }, [logoScale, logoOpacity]);

  const handleNextPress = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      const nextIndex = currentSlide + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
      setCurrentSlide(nextIndex);
    } else {
      navigation.navigate("Account");
    }
  };

  const handleSkip = () => {
    navigation.navigate("Account");
  };

  // ONBOARDING SCREEN
  if (showOnboarding) {
    const isLastSlide = currentSlide === ONBOARDING_SLIDES.length - 1;
    const SLOT_WIDTH = 28;
    const activeIndicatorTranslateX = scrollX.interpolate({
      inputRange: ONBOARDING_SLIDES.map((_, idx) => idx * SCREEN_WIDTH),
      outputRange: ONBOARDING_SLIDES.map((_, idx) => idx * SLOT_WIDTH),
      extrapolate: "clamp",
    });

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        {/* Top Header Bar */}
        <View style={styles.onboardingHeader}>
          <View>
            <Text style={styles.onboardingBrandTitle}>RideGo</Text>
            <Text style={styles.onboardingBrandTag}>SOUTH AFRICA</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSkip}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Swipeable Route Telemetry Carousel */}
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(
              e.nativeEvent.contentOffset.x / SCREEN_WIDTH
            );
            if (newIndex >= 0 && newIndex < ONBOARDING_SLIDES.length) {
              setCurrentSlide(newIndex);
            }
          }}
          scrollEventThrottle={16}
          style={styles.carousel}
        >
          {ONBOARDING_SLIDES.map((slide) => (
            <View
              key={slide.id}
              style={[styles.slideContainer, { width: SCREEN_WIDTH }]}
            >
              {/* Graphic Pedestal */}
              <View style={styles.graphicWrapper}>
                <RouteTelemetryGraphic
                  mode={slide.mode}
                  width={SCREEN_WIDTH - 48}
                  height={200}
                />
              </View>

              {/* Onboarding Copy */}
              <View style={styles.copyContainer}>
                <Text style={styles.heading}>{slide.title}</Text>
                <Text style={styles.description}>{slide.description}</Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>

        {/* Bottom Navigation & Action Section */}
        <View style={styles.bottomSection}>
          {/* Fluid Sliding Pagination Indicator Track */}
          <View style={styles.sliderTrackContainer}>
            <View style={styles.sliderTrack}>
              {/* Reference Inactive Dots */}
              {ONBOARDING_SLIDES.map((_, idx) => (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.7}
                  onPress={() => {
                    scrollViewRef.current?.scrollTo({
                      x: idx * SCREEN_WIDTH,
                      animated: true,
                    });
                    setCurrentSlide(idx);
                  }}
                  style={styles.sliderSlot}
                  accessibilityRole="button"
                  accessibilityLabel={`Go to slide ${idx + 1}`}
                >
                  <View style={styles.inactiveSlotDot} />
                </TouchableOpacity>
              ))}

              {/* Seamless Sliding Active Indicator Pill */}
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.activeSliderPill,
                  {
                    transform: [{ translateX: activeIndicatorTranslateX }],
                  },
                ]}
              />
            </View>
          </View>

          {/* Dynamic Action Button */}
          <TouchableOpacity
            style={styles.getStartedButton}
            activeOpacity={0.85}
            onPress={handleNextPress}
          >
            <Text style={styles.getStartedText}>
              {isLastSlide ? "Get Started" : "Next"}
            </Text>
            <ArrowRightIcon size={20} color={colors.accent.contrast} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // SPLASH LOADING SCREEN (Zero Cars, Pure Telemetry Pulse)
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
        <Text style={styles.splashSubtitle}>
          SOUTH AFRICA • ON-DEMAND MOBILITY
        </Text>
      </Animated.View>

      {/* High-Tech Geometric GPS Radar Pulse */}
      <View style={styles.loaderWrap}>
        <TelemetryPulseLoader
          statusText={splashMessages[splashStep]}
          coordinates="-26.2041° S, 28.0473° E"
          showProgress={true}
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
  /* Splash Loading Styles */
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
    justifyContent: "space-between",
  },
  onboardingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
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
  carousel: {
    flex: 1,
  },
  slideContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  graphicWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  copyContainer: {
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text.secondary,
    textAlign: "center",
    maxWidth: 320,
  },
  bottomSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  sliderTrackContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.xs,
  },
  sliderTrack: {
    width: ONBOARDING_SLIDES.length * 28,
    height: 16,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  sliderSlot: {
    width: 28,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveSlotDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.surface.border,
  },
  activeSliderPill: {
    position: "absolute",
    left: 0,
    top: 4,
    width: 28,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.primary,
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
