import React from "react";
import {
  Image,
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
import { Vehicle3DShadedSideSvg } from "../../components/common/VehicleSvgs";

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

      {/* Hero Visual Card */}
      <View style={styles.heroWrap}>
        <View style={styles.heroCircle}>
          <Vehicle3DShadedSideSvg width={230} height={105} />
        </View>

        <Text style={styles.heading}>Move Seamlessly Across South Africa</Text>
        <Text style={styles.description}>
          Upfront Rand fares, verified professional drivers, live GPS tracking, and instant RideGo Wallet payments.
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
    paddingHorizontal: spacing.lg,
    justifyContent: "space-between",
    paddingBottom: spacing.lg,
  },
  brandHeader: {
    alignItems: "center",
    marginTop: spacing.xl,
  },
  brandTitle: {
    fontSize: 38,
    fontWeight: "900",
    color: colors.accent.primary,
    letterSpacing: 1.5,
  },
  brandTagline: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.text.muted,
    letterSpacing: 3,
    marginTop: 2,
  },
  heroWrap: {
    alignItems: "center",
    marginVertical: spacing.lg,
  },
  heroCircle: {
    width: 240,
    height: 130,
    borderRadius: 24,
    backgroundColor: colors.surface.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    marginBottom: spacing.lg,
    overflow: "hidden",
  },
  heroCarImage: {
    width: 220,
    height: 110,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.sm,
    lineHeight: 32,
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: spacing.sm,
  },
  buttonGroup: {
    width: "100%",
    gap: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.accent.primary,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
  secondaryButton: {
    backgroundColor: colors.surface.card,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text.primary,
  },
  termsText: {
    fontSize: 11,
    color: colors.text.muted,
    textAlign: "center",
    lineHeight: 16,
    marginTop: spacing.xs,
  },
});
