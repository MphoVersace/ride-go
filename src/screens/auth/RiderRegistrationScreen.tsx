import React, { useState } from "react";
import {
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
import { ArrowLeftIcon, ShieldCheckIcon } from "../../components/common/SvgIcons";
import { useRide } from "../../services/RideContext";

export default function RiderRegistrationScreen({
  navigation,
}: RootStackScreenProps<"RiderRegistration">) {
  const { updateUserProfile, userProfile } = useRide();

  const [firstName, setFirstName] = useState("Mpho");
  const [lastName, setLastName] = useState("Versace");
  const [phone, setPhone] = useState(userProfile.phone || "+27 71 234 5678");
  const [email, setEmail] = useState(userProfile.email || "mpho@ridego.co.za");
  const [password, setPassword] = useState("••••••••");

  const handleRegister = () => {
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || userProfile.name;

    updateUserProfile({
      name: fullName,
      phone: phone.trim(),
      email: email.trim(),
    });

    navigation.navigate("RiderHome");
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
        <Text style={styles.navTitle}>Create Account</Text>
        <View style={styles.navSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerBlock}>
          <Text style={styles.heading}>Welcome to RideGo</Text>
          <Text style={styles.subtitle}>
            Enter your details to start booking verified rides with instant Rand wallet payments.
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          <View style={styles.nameRow}>
            <View style={styles.nameField}>
              <Text style={styles.inputLabel}>FIRST NAME</Text>
              <TextInput
                style={styles.textInput}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First name"
                placeholderTextColor={colors.text.muted}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.nameField}>
              <Text style={styles.inputLabel}>LAST NAME</Text>
              <TextInput
                style={styles.textInput}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last name"
                placeholderTextColor={colors.text.muted}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>SOUTH AFRICAN MOBILE NUMBER</Text>
            <TextInput
              style={styles.textInput}
              value={phone}
              onChangeText={setPhone}
              placeholder="+27 71 234 5678"
              placeholderTextColor={colors.text.muted}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
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

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>SECURE PASSWORD</Text>
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              placeholderTextColor={colors.text.muted}
              secureTextEntry
            />
          </View>
        </View>

        {/* Security Note */}
        <View style={styles.securityRow}>
          <ShieldCheckIcon size={18} color={colors.accent.primary} />
          <Text style={styles.securityText}>
            Protected under POPIA. We only use your phone number for driver trip coordination.
          </Text>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={styles.registerButton}
          activeOpacity={0.85}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Complete Registration</Text>
        </TouchableOpacity>
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
  headerBlock: {
    marginVertical: spacing.md,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: spacing.md,
  },
  nameRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  nameField: {
    flex: 1,
  },
  inputGroup: {},
  inputLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.text.muted,
    marginBottom: 6,
  },
  textInput: {
    backgroundColor: colors.surface.cardAlt,
    borderRadius: 14,
    height: 48,
    paddingHorizontal: spacing.sm,
    color: colors.text.primary,
    fontSize: 14,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  securityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 16,
  },
  registerButton: {
    backgroundColor: colors.accent.primary,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
});
