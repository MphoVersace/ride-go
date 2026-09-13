import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, {
  Path,
  Circle,
  Line,
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import { RootStackScreenProps } from "../../navigation/types";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/metrics";
import {
  PinIcon,
  TargetIcon,
  WalletIcon,
  ArrowRightIcon,
} from "../../components/common/SvgIcons";

/**
 * Panoramic National Transit Telemetry Viewport
 * Visualizes live corridors connecting Cape Town, Johannesburg, Sandton, and Durban.
 */
const NationalTransitMapCard = () => (
  <View style={styles.terminalCard}>
    {/* Card Top Telemetry Header */}
    <View style={styles.terminalTopBar}>
      <View style={styles.terminalStatusLeft}>
        <View style={styles.terminalPulseDot} />
        <Text style={styles.terminalStatusText}>NATIONAL TRANSIT RADAR</Text>
      </View>
      <Text style={styles.terminalRegionText}>ZA-METRO CORRIDORS</Text>
    </View>

    {/* Panoramic Vector Telemetry Map */}
    <View style={styles.terminalSvgHolder}>
      <Svg width="100%" height={130} viewBox="0 0 320 130" fill="none">
        <Defs>
          <LinearGradient id="zaRouteGrad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0%" stopColor={colors.accent.primary} stopOpacity="1" />
            <Stop offset="100%" stopColor={colors.accent.secondary} stopOpacity="0.85" />
          </LinearGradient>
          <LinearGradient id="jhbCoreGlow" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={colors.accent.primary} stopOpacity="0.35" />
            <Stop offset="100%" stopColor={colors.accent.primary} stopOpacity="0.0" />
          </LinearGradient>
        </Defs>

        {/* Coordinate Grid Guides */}
        <Line x1="10" y1="40" x2="310" y2="40" stroke={colors.surface.border} strokeWidth="0.8" strokeDasharray="3 3" opacity={0.5} />
        <Line x1="10" y1="85" x2="310" y2="85" stroke={colors.surface.border} strokeWidth="0.8" strokeDasharray="3 3" opacity={0.5} />
        <Line x1="90" y1="10" x2="90" y2="120" stroke={colors.surface.border} strokeWidth="0.8" strokeDasharray="3 3" opacity={0.5} />
        <Line x1="220" y1="10" x2="220" y2="120" stroke={colors.surface.border} strokeWidth="0.8" strokeDasharray="3 3" opacity={0.5} />

        {/* Concentric Telemetry Radar Rings centered on Gauteng Hub */}
        <Circle cx="160" cy="45" r="58" stroke={colors.surface.border} strokeWidth="1" strokeDasharray="4 4" opacity={0.7} />
        <Circle cx="160" cy="45" r="32" stroke={colors.surface.border} strokeWidth="1.2" opacity={0.8} />

        {/* Primary Transit Arterial 1: CPT -> JHB */}
        <Path
          d="M 35 100 C 70 95, 120 45, 160 45"
          stroke="url(#zaRouteGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Primary Transit Arterial 2: JHB -> DUR */}
        <Path
          d="M 160 45 C 200 45, 245 85, 285 92"
          stroke="url(#zaRouteGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Feeder Arterial: JHB -> PTA */}
        <Path
          d="M 160 45 L 185 20"
          stroke={colors.accent.primary}
          strokeWidth="2"
          strokeDasharray="3 3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Trajectory Directional Beacons */}
        <Circle cx="95" cy="72" r="2.5" fill="#FFFFFF" />
        <Circle cx="225" cy="68" r="2.5" fill="#FFFFFF" />

        {/* Cape Town Hub (CPT) */}
        <Circle cx="35" cy="100" r="7" fill={colors.accent.primary} />
        <Circle cx="35" cy="100" r="2.5" fill="#000000" />
        <SvgText x="35" y="118" textAnchor="middle" fill={colors.text.secondary} fontSize="9" fontWeight="700">CPT</SvgText>

        {/* Gauteng Core Node (JHB) */}
        <Circle cx="160" cy="45" r="16" fill="url(#jhbCoreGlow)" />
        <Circle cx="160" cy="45" r="8" fill={colors.accent.primary} />
        <Circle cx="160" cy="45" r="3" fill="#000000" />
        <Circle cx="160" cy="45" r="1.5" fill="#FFFFFF" />
        <SvgText x="160" y="32" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">JHB</SvgText>

        {/* Pretoria Sub-node (PTA) */}
        <Circle cx="185" cy="20" r="4.5" fill={colors.accent.secondary} />
        <Circle cx="185" cy="20" r="1.5" fill="#000000" />
        <SvgText x="204" y="24" fill={colors.text.muted} fontSize="8" fontWeight="700">PTA</SvgText>

        {/* Durban Hub (DUR) */}
        <Circle cx="285" cy="92" r="7" fill={colors.accent.primary} />
        <Circle cx="285" cy="92" r="2.5" fill="#000000" />
        <SvgText x="285" y="110" textAnchor="middle" fill={colors.text.secondary} fontSize="9" fontWeight="700">DUR</SvgText>
      </Svg>
    </View>

    {/* Bottom Telemetry Metrics Strip */}
    <View style={styles.terminalMetricsRow}>
      <View style={styles.terminalMetricCol}>
        <Text style={styles.metricLabel}>DISPATCH ETA</Text>
        <Text style={styles.metricValueYellow}>2.8 MIN</Text>
      </View>
      <View style={styles.terminalMetricDivider} />
      <View style={styles.terminalMetricCol}>
        <Text style={styles.metricLabel}>ZAR PRICING</Text>
        <Text style={styles.metricValueWhite}>UPFRONT</Text>
      </View>
      <View style={styles.terminalMetricDivider} />
      <View style={styles.terminalMetricCol}>
        <Text style={styles.metricLabel}>METRO HUBS</Text>
        <Text style={styles.metricValueWhite}>9 ACTIVE</Text>
      </View>
    </View>
  </View>
);

export default function AccountScreen({
  navigation,
}: RootStackScreenProps<"Account">) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Brand Navigation Header */}
      <View style={styles.navHeader}>
        <View>
          <Text style={styles.brandTitle}>RideGo</Text>
          <Text style={styles.brandSubtitle}>SOUTH AFRICA • TRANSIT NETWORK</Text>
        </View>
        <View style={styles.currencyPill}>
          <Text style={styles.currencyText}>ZAR • EN</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Panoramic Telemetry Card */}
        <NationalTransitMapCard />

        {/* Value Proposition Headline Block */}
        <View style={styles.headlineBlock}>
          <Text style={styles.headlineTitle}>
            Move Faster Across{"\n"}South Africa
          </Text>
          <Text style={styles.headlineDescription}>
            Direct on-demand transit with transparent upfront Rand fares, live satellite routing, and instant digital payments.
          </Text>
        </View>

        {/* 3-Pillar Transit Telemetry Matrix */}
        <View style={styles.pillarMatrix}>
          {/* Pillar 1: Upfront Pricing */}
          <View style={styles.pillarCard}>
            <View style={styles.pillarIconBox}>
              <PinIcon size={20} color={colors.accent.primary} />
            </View>
            <View style={styles.pillarContent}>
              <Text style={styles.pillarTitle}>Upfront Transparent Fares</Text>
              <Text style={styles.pillarSubtitle}>
                Fixed Rand (ZAR) quotes before you book with zero hidden surcharges.
              </Text>
            </View>
          </View>

          {/* Pillar 2: Precision Telemetry */}
          <View style={styles.pillarCard}>
            <View style={styles.pillarIconBox}>
              <TargetIcon size={20} color={colors.accent.primary} />
            </View>
            <View style={styles.pillarContent}>
              <Text style={styles.pillarTitle}>Direct Route Telemetry</Text>
              <Text style={styles.pillarSubtitle}>
                Real-time GPS tracking across major national highways and metro arterials.
              </Text>
            </View>
          </View>

          {/* Pillar 3: RideGo Digital Wallet */}
          <View style={styles.pillarCard}>
            <View style={styles.pillarIconBox}>
              <WalletIcon size={20} color={colors.accent.primary} />
            </View>
            <View style={styles.pillarContent}>
              <Text style={styles.pillarTitle}>RideGo Digital Wallet</Text>
              <Text style={styles.pillarSubtitle}>
                One-tap instant checkout with automated digital Rand trip statements.
              </Text>
            </View>
          </View>
        </View>

        {/* Action Dock (Bottom CTAs) */}
        <View style={styles.actionDock}>
          <TouchableOpacity
            style={styles.primaryCtaButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("AccountType")}
          >
            <Text style={styles.primaryCtaText}>Get Started • Create Account</Text>
            <ArrowRightIcon size={18} color={colors.accent.contrast} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryCtaButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("RiderHome")}
          >
            <Text style={styles.secondaryCtaText}>Sign In to Existing Account</Text>
          </TouchableOpacity>

          <Text style={styles.termsDisclaimer}>
            By continuing, you agree to RideGo's Terms of Service and POPIA-compliant Privacy Policy.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  navHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.accent.primary,
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 9,
    fontWeight: "800",
    color: colors.text.secondary,
    letterSpacing: 1.2,
    marginTop: 2,
  },
  currencyPill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: colors.surface.card,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  currencyText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.text.secondary,
    letterSpacing: 0.8,
  },
  scrollContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  terminalCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    paddingTop: spacing.sm,
    marginBottom: spacing.md,
    overflow: "hidden",
  },
  terminalTopBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    marginBottom: 4,
  },
  terminalStatusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  terminalPulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent.primary,
  },
  terminalStatusText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.accent.primary,
    letterSpacing: 1,
  },
  terminalRegionText: {
    fontSize: 9,
    fontWeight: "700",
    color: colors.text.muted,
    letterSpacing: 0.8,
  },
  terminalSvgHolder: {
    paddingHorizontal: spacing.xs,
    alignItems: "center",
  },
  terminalMetricsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.cardAlt,
    borderTopWidth: 1,
    borderTopColor: colors.surface.border,
    paddingVertical: spacing.xs,
  },
  terminalMetricCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  terminalMetricDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.surface.border,
  },
  metricLabel: {
    fontSize: 8,
    fontWeight: "800",
    color: colors.text.muted,
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  metricValueYellow: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  metricValueWhite: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  headlineBlock: {
    marginBottom: spacing.md,
  },
  headlineTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.text.primary,
    lineHeight: 32,
    marginBottom: spacing.xs,
  },
  headlineDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.text.secondary,
  },
  pillarMatrix: {
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  pillarCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 18,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  pillarIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface.elevated,
    borderWidth: 1,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  pillarContent: {
    flex: 1,
  },
  pillarTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 2,
  },
  pillarSubtitle: {
    fontSize: 11,
    lineHeight: 15,
    color: colors.text.muted,
  },
  actionDock: {
    gap: spacing.sm,
  },
  primaryCtaButton: {
    height: 56,
    backgroundColor: colors.accent.primary,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    shadowColor: colors.accent.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryCtaText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
  secondaryCtaButton: {
    height: 52,
    backgroundColor: colors.surface.card,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryCtaText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text.primary,
  },
  termsDisclaimer: {
    fontSize: 10,
    color: colors.text.muted,
    textAlign: "center",
    lineHeight: 14,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
});
