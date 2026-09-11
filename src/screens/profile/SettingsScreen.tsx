import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
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
  BellIcon,
  LockIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from "../../components/common/SvgIcons";

export default function SettingsScreen({
  navigation,
}: RootStackScreenProps<"Settings">) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsReceipts, setSmsReceipts] = useState(true);
  const [biometrics, setBiometrics] = useState(true);

  const handleLegalAlert = (title: string, desc: string) => {
    Alert.alert(title, desc, [{ text: "Understood" }]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Nav Header */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>App Preferences</Text>
        <View style={styles.navSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section: Alerts & Notifications */}
        <Text style={styles.sectionHeader}>Alerts & Notifications</Text>
        <View style={styles.card}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>Push Notifications</Text>
              <Text style={styles.toggleSubtitle}>
                Driver arrivals, ride progress, and wallet top-ups
              </Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: colors.surface.border, true: colors.accent.primary }}
              thumbColor={colors.text.primary}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>SMS Trip Receipts</Text>
              <Text style={styles.toggleSubtitle}>
                Receive text breakdown upon trip completion
              </Text>
            </View>
            <Switch
              value={smsReceipts}
              onValueChange={setSmsReceipts}
              trackColor={{ false: colors.surface.border, true: colors.accent.primary }}
              thumbColor={colors.text.primary}
            />
          </View>
        </View>

        {/* Section: Security */}
        <Text style={styles.sectionHeader}>Security & Access</Text>
        <View style={styles.card}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleTextWrap}>
              <Text style={styles.toggleTitle}>Biometric / PIN Verification</Text>
              <Text style={styles.toggleSubtitle}>
                Require Fingerprint or Face unlock when opening RideGo
              </Text>
            </View>
            <Switch
              value={biometrics}
              onValueChange={setBiometrics}
              trackColor={{ false: colors.surface.border, true: colors.accent.primary }}
              thumbColor={colors.text.primary}
            />
          </View>
        </View>

        {/* Section: Regional Configuration */}
        <Text style={styles.sectionHeader}>Regional & Currency</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Country / Territory</Text>
            <Text style={styles.infoValue}>South Africa (ZA)</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Currency standard</Text>
            <Text style={styles.infoValue}>South African Rand (ZAR - R)</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Language</Text>
            <Text style={styles.infoValue}>English (South Africa)</Text>
          </View>
        </View>

        {/* Section: Privacy & Legal */}
        <Text style={styles.sectionHeader}>Privacy & Governance</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.navRow}
            activeOpacity={0.8}
            onPress={() =>
              handleLegalAlert(
                "Privacy Policy",
                "RideGo adheres strictly to South African POPIA (Protection of Personal Information Act). Your telemetry and payment details are encrypted and never sold to third parties."
              )
            }
          >
            <View style={styles.rowLeft}>
              <LockIcon size={18} color={colors.accent.primary} />
              <Text style={styles.navRowText}>Privacy & Data Protection (POPIA)</Text>
            </View>
            <ArrowRightIcon size={16} color={colors.accent.primary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.navRow}
            activeOpacity={0.8}
            onPress={() =>
              handleLegalAlert(
                "Terms of Service",
                "RideGo Terms of Carriage and Service Agreement applicable to all riders in South Africa."
              )
            }
          >
            <View style={styles.rowLeft}>
              <ShieldCheckIcon size={18} color={colors.accent.primary} />
              <Text style={styles.navRowText}>Terms of Service</Text>
            </View>
            <ArrowRightIcon size={16} color={colors.accent.primary} />
          </TouchableOpacity>
        </View>

        {/* App Version Info */}
        <View style={styles.versionCard}>
          <Text style={styles.versionTitle}>RideGo MVP Mobility</Text>
          <Text style={styles.versionSubtitle}>
            Version 1.0.0 (Build 5701) • Expo SDK 57 • React Native 0.86
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
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  card: {
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  toggleTextWrap: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  toggleSubtitle: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surface.border,
    marginVertical: spacing.sm,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text.primary,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  navRowText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
  },
  versionCard: {
    alignItems: "center",
    paddingVertical: spacing.xl,
    gap: 4,
  },
  versionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text.secondary,
  },
  versionSubtitle: {
    fontSize: 12,
    color: colors.text.muted,
  },
});
