import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackScreenProps } from "../../navigation/types";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/metrics";
import {
  UserIcon,
  SteeringWheelIcon,
  AppleIcon,
  GoogleIcon,
  CapitecIcon,
  SouthAfricaFlagSvg,
  ChatBubbleIcon,
  ArrowRightIcon,
  LockIcon,
  CheckCircleIcon,
  TargetIcon,
} from "../../components/common/SvgIcons";
import { useRide } from "../../services/RideContext";

export default function AccountScreen({
  navigation,
}: RootStackScreenProps<any>) {
  const { updateUserProfile } = useRide();
  const [role, setRole] = useState<"rider" | "driver">("rider");
  const [fullName, setFullName] = useState("Nomvula Zungu");
  const [phone, setPhone] = useState("071 839 2041");
  const [email, setEmail] = useState("nomvula.zungu@icloud.com");
  const [acceptTos, setAcceptTos] = useState(true);
  const [acceptPromo, setAcceptPromo] = useState(false);

  const handleContinue = () => {
    updateUserProfile({
      name: fullName,
      phone: `+27 ${phone}`,
      email: email,
      avatar: fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
    });
    navigation.navigate("Explore");
  };

  const handleExpressSignIn = (provider: string) => {
    updateUserProfile({
      name: fullName || "Nomvula Zungu",
      avatar: "NZ",
    });
    navigation.navigate("Explore");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Step Progress Header */}
          <View style={styles.stepHeader}>
            <View style={styles.stepMetaRow}>
              <Text style={styles.stepBadgeText}>STEP 01 / 05</Text>
              <View style={styles.completedBadge}>
                <View style={styles.boltIconDot} />
                <Text style={styles.completedText}>20% COMPLETED</Text>
              </View>
            </View>
            <View style={styles.progressTrack}>
              <View style={styles.progressBar} />
            </View>
          </View>

          {/* Welcome Header */}
          <View style={styles.welcomeBlock}>
            <View style={styles.welcomeTitleRow}>
              <View style={styles.compassBox}>
                <TargetIcon size={20} color="#000000" />
              </View>
              <Text style={styles.welcomeTitle}>Welcome to Ride-Go</Text>
            </View>
            <Text style={styles.welcomeSubtitle}>
              Fast, secure & green rides across South Africa
            </Text>
          </View>

          {/* Role Switcher (Rider vs Driver) */}
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[
                styles.roleTab,
                role === "rider" && styles.roleTabActive,
              ]}
              activeOpacity={0.85}
              onPress={() => setRole("rider")}
            >
              <UserIcon
                size={16}
                color={role === "rider" ? "#000000" : colors.text.secondary}
              />
              <Text
                style={[
                  styles.roleTabText,
                  role === "rider" && styles.roleTabTextActive,
                ]}
              >
                Rider (Passenger)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleTab,
                role === "driver" && styles.roleTabActive,
              ]}
              activeOpacity={0.85}
              onPress={() => {
                setRole("driver");
                navigation.navigate("AccountType");
              }}
            >
              <SteeringWheelIcon
                size={16}
                color={role === "driver" ? "#000000" : colors.text.secondary}
              />
              <Text
                style={[
                  styles.roleTabText,
                  role === "driver" && styles.roleTabTextActive,
                ]}
              >
                Driver
              </Text>
            </TouchableOpacity>
          </View>

          {/* Express Sign Up */}
          <View style={styles.expressSection}>
            <Text style={styles.sectionLabel}>EXPRESS SIGN UP</Text>
            <View style={styles.expressButtonsGrid}>
              {/* Apple */}
              <TouchableOpacity
                style={styles.expressBtn}
                activeOpacity={0.85}
                onPress={() => handleExpressSignIn("Apple")}
              >
                <AppleIcon size={18} color={colors.text.primary} />
                <Text style={styles.expressBtnText}>Apple</Text>
              </TouchableOpacity>

              {/* Google */}
              <TouchableOpacity
                style={styles.expressBtn}
                activeOpacity={0.85}
                onPress={() => handleExpressSignIn("Google")}
              >
                <GoogleIcon size={18} />
                <Text style={styles.expressBtnText}>Google</Text>
              </TouchableOpacity>

              {/* Capitec */}
              <TouchableOpacity
                style={styles.expressBtn}
                activeOpacity={0.85}
                onPress={() => handleExpressSignIn("Capitec")}
              >
                <CapitecIcon size={18} color={colors.accent.primary} />
                <Text style={styles.expressBtnText}>Capitec</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Or Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR REGISTER MANUALLY</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Manual Input Fields */}
          <View style={styles.formFields}>
            {/* Full Legal Name */}
            <View style={styles.inputGroup}>
              <View style={styles.inputLabelRow}>
                <Text style={styles.inputLabel}>FULL LEGAL NAME</Text>
                <Text style={styles.verifiedIdHint}>Verified ID</Text>
              </View>
              <View style={styles.inputBox}>
                <UserIcon size={18} color={colors.text.secondary} />
                <TextInput
                  style={styles.textInput}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Enter full name"
                  placeholderTextColor={colors.text.muted}
                />
              </View>
            </View>

            {/* South African Mobile Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>SOUTH AFRICAN MOBILE NUMBER</Text>
              <View style={styles.inputBox}>
                <View style={styles.countryCodeRow}>
                  <SouthAfricaFlagSvg width={20} height={14} />
                  <Text style={styles.countryCodeText}>+27</Text>
                </View>
                <View style={styles.inputSeparator} />
                <TextInput
                  style={[styles.textInput, { letterSpacing: 0.5 }]}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Mobile number"
                  placeholderTextColor={colors.text.muted}
                  keyboardType="phone-pad"
                />
                <ChatBubbleIcon size={18} color={colors.accent.primary} />
              </View>
            </View>

            {/* Email Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
              <View style={styles.inputBox}>
                <Text style={styles.atSymbolIcon}>@</Text>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="name@domain.co.za"
                  placeholderTextColor={colors.text.muted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>

          {/* Checkboxes */}
          <View style={styles.checkboxGroup}>
            <TouchableOpacity
              style={styles.checkboxRow}
              activeOpacity={0.8}
              onPress={() => setAcceptTos(!acceptTos)}
            >
              <View
                style={[
                  styles.checkboxSquare,
                  acceptTos && styles.checkboxSquareActive,
                ]}
              >
                {acceptTos && <CheckCircleIcon size={14} color="#000000" />}
              </View>
              <Text style={styles.checkboxText}>
                I accept the{" "}
                <Text style={styles.checkboxLink}>Terms of Service</Text> &{" "}
                <Text style={styles.checkboxLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.checkboxRow}
              activeOpacity={0.8}
              onPress={() => setAcceptPromo(!acceptPromo)}
            >
              <View
                style={[
                  styles.checkboxSquare,
                  acceptPromo && styles.checkboxSquareActive,
                ]}
              >
                {acceptPromo && <CheckCircleIcon size={14} color="#000000" />}
              </View>
              <Text style={styles.checkboxText}>
                Receive trip receipts, safety alerts & exclusive South African promo codes
              </Text>
            </TouchableOpacity>
          </View>

          {/* Primary Action CTA */}
          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.88}
            onPress={handleContinue}
          >
            <Text style={styles.ctaButtonText}>
              Send 2-Step Verification Codes
            </Text>
            <ArrowRightIcon size={18} color="#000000" />
          </TouchableOpacity>

          {/* Security Compliance Footer */}
          <View style={styles.securityBanner}>
            <LockIcon size={16} color={colors.accent.primary} />
            <Text style={styles.securityText}>
              POPIA Compliant • 256-Bit SSL Encryption • Bank-Grade Safety
            </Text>
          </View>

          {/* Direct Sign In Link */}
          <TouchableOpacity
            style={styles.signInShortcut}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("RiderHome")}
          >
            <Text style={styles.signInText}>
              Already have an account?{" "}
              <Text style={styles.signInLinkText}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  stepHeader: {
    gap: 6,
  },
  stepMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.accent.primary,
    letterSpacing: 1.4,
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  boltIconDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent.primary,
  },
  completedText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.text.secondary,
  },
  progressTrack: {
    height: 4,
    backgroundColor: colors.surface.border,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    width: "20%",
    height: 4,
    backgroundColor: colors.accent.primary,
    borderRadius: 2,
  },
  welcomeBlock: {
    gap: 4,
    marginTop: 4,
  },
  welcomeTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  compassBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text.primary,
    letterSpacing: -0.4,
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },
  roleContainer: {
    flexDirection: "row",
    backgroundColor: colors.surface.card,
    borderRadius: 25,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  roleTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 21,
    gap: 8,
  },
  roleTabActive: {
    backgroundColor: colors.accent.primary,
  },
  roleTabText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.secondary,
  },
  roleTabTextActive: {
    color: "#000000",
  },
  expressSection: {
    gap: 8,
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.text.muted,
    letterSpacing: 1.2,
  },
  expressButtonsGrid: {
    flexDirection: "row",
    gap: 8,
  },
  expressBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface.card,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: 6,
  },
  expressBtnText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text.primary,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.surface.border,
  },
  dividerText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.text.muted,
    letterSpacing: 1,
  },
  formFields: {
    gap: 12,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.text.secondary,
    letterSpacing: 1,
  },
  verifiedIdHint: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
  },
  countryCodeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  countryCodeText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.primary,
  },
  inputSeparator: {
    width: 1,
    height: 20,
    backgroundColor: colors.surface.border,
  },
  atSymbolIcon: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text.secondary,
  },
  checkboxGroup: {
    gap: 10,
    marginTop: 4,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  checkboxSquare: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: colors.surface.card,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  checkboxSquareActive: {
    backgroundColor: colors.accent.primary,
    borderColor: colors.accent.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  checkboxLink: {
    color: colors.accent.primary,
    textDecorationLine: "underline",
  },
  ctaButton: {
    backgroundColor: colors.accent.primary,
    height: 54,
    borderRadius: 27,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
    shadowColor: colors.accent.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#000000",
    letterSpacing: 0.5,
  },
  securityBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  securityText: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.text.secondary,
  },
  signInShortcut: {
    alignItems: "center",
    paddingVertical: 8,
  },
  signInText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  signInLinkText: {
    fontWeight: "800",
    color: colors.accent.primary,
  },
});
