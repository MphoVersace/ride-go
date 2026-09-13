import React from "react";
import {
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
import { SouthAfricaRadarMatrix } from "../../components/common/MobilityTelemetryVectors";

export default function AccountScreen({
  navigation,
}: RootStackScreenProps<"Account">) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Brand Header */}
      <View style={styles.brandHeader}>
        <Text style={styles.brandTitle}>RideGo</Text>
        <Text style={styles.brandTagline}>SOUTH AFRICA</Text>
      </View>

      {/* Hero Visual Card with South Africa Mobility Radar Matrix */}
      <View style={styles.heroWrap}>
        <View style={styles.heroCircle}>
          <SouthAfricaRadarMatrix size={190} />
        </View>

        <Text style={styles.heading}>Move Seamlessly Across South Africa</Text>
        <Text style={styles.description}>
          Upfront Rand fares, direct route navigation, real-time GPS tracking, and instant RideGo Wallet payments.
        </Text>
      </View>

      {/* CTAs */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("AccountType")}
        >
          <Text style={styles.primaryButtonText}>Create an Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("RiderHome")}
        >
          <Text style={styles.secondaryButtonText}>Log In to RideGo</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you agree to RideGo's Terms of Service and POPIA-compliant Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  brandHeader: {
    alignItems: "center",
    marginTop: spacing.sm,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.accent.primary,
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.text.secondary,
    letterSpacing: 2,
    marginTop: 2,
  },
  heroWrap: {
    alignItems: "center",
    paddingHorizontal: spacing.sm,
  },
  heroCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.surface.card,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text.secondary,
    textAlign: "center",
    maxWidth: 300,
  },
  buttonGroup: {
    width: "100%",
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  primaryButton: {
    height: 56,
    backgroundColor: colors.accent.primary,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.accent.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
  secondaryButton: {
    height: 56,
    backgroundColor: colors.surface.card,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  termsText: {
    fontSize: 11,
    color: colors.text.muted,
    textAlign: "center",
    lineHeight: 16,
    marginTop: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
});
