import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackScreenProps } from "../../navigation/types";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/metrics";
import {
  ArrowLeftIcon,
  SteeringWheelIcon,
  ArrowRightIcon,
} from "../../components/common/SvgIcons";
import { VehicleSideSvg } from "../../components/common/VehicleSvgs";

type RoleOption = "rider" | "driver";

export default function AccountTypeScreen({
  navigation,
}: RootStackScreenProps<"AccountType">) {
  const [selectedRole, setSelectedRole] = useState<RoleOption>("rider");

  const handleContinue = () => {
    if (selectedRole === "rider") {
      navigation.navigate("RiderRegistration");
    } else {
      Alert.alert(
        "RideGo Driver Partner",
        "Driver partner portal requires a valid South African PrDP license and vehicle inspection. Proceed to Rider sign-up for MVP?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Continue to Rider",
            onPress: () => navigation.navigate("RiderRegistration"),
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Choose Role</Text>
        <View style={styles.navSpacer} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.heading}>How will you use RideGo?</Text>
        <Text style={styles.subtitle}>
          Select whether you want to book rides as a passenger or drive and earn income on your schedule.
        </Text>

        <View style={styles.optionsWrap}>
          {/* Rider Option */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedRole === "rider" && styles.optionCardActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setSelectedRole("rider")}
          >
            <View style={styles.iconCircle}>
              <VehicleSideSvg
                width={48}
                height={24}
                color={selectedRole === "rider" ? colors.accent.primary : colors.text.muted}
              />
            </View>

            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>I want to ride</Text>
              <Text style={styles.optionDesc}>
                Book reliable rides, track trips with live maps, and pay in Rands via Wallet.
              </Text>
            </View>

            <View
              style={[
                styles.radioOuter,
                selectedRole === "rider" && styles.radioOuterActive,
              ]}
            >
              {selectedRole === "rider" && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          {/* Driver Option */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedRole === "driver" && styles.optionCardActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setSelectedRole("driver")}
          >
            <View style={styles.iconCircle}>
              <SteeringWheelIcon
                size={26}
                color={selectedRole === "driver" ? colors.accent.primary : colors.text.muted}
              />
            </View>

            <View style={styles.optionInfo}>
              <Text style={styles.optionTitle}>I want to drive</Text>
              <Text style={styles.optionDesc}>
                Drive with RideGo and earn on your schedule with lower platform commissions.
              </Text>
            </View>

            <View
              style={[
                styles.radioOuter,
                selectedRole === "driver" && styles.radioOuterActive,
              ]}
            >
              {selectedRole === "driver" && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom CTA */}
      <View style={styles.bottomWrap}>
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.85}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>
            Continue as {selectedRole === "rider" ? "Rider" : "Driver"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
    justifyContent: "space-between",
    paddingBottom: spacing.lg,
  },
  navBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
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
  navTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  navSpacer: {
    width: 40,
  },
  content: {
    paddingHorizontal: spacing.lg,
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: spacing.xl,
  },
  optionsWrap: {
    gap: spacing.md,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    gap: spacing.sm,
  },
  optionCardActive: {
    borderColor: colors.accent.primary,
    backgroundColor: colors.surface.cardAlt,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surface.card,
    alignItems: "center",
    justifyContent: "center",
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  optionDesc: {
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 16,
    marginTop: 3,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterActive: {
    borderColor: colors.accent.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent.primary,
  },
  bottomWrap: {
    paddingHorizontal: spacing.lg,
  },
  continueButton: {
    backgroundColor: colors.accent.primary,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
});
