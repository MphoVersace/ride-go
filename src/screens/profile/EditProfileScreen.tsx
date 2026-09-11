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
import {
  ArrowLeftIcon,
  CheckCircleIcon,
} from "../../components/common/SvgIcons";
import { useRide } from "../../services/RideContext";

export default function EditProfileScreen({
  navigation,
}: RootStackScreenProps<"EditProfile">) {
  const { userProfile, updateUserProfile } = useRide();

  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [email, setEmail] = useState(userProfile.email);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const previewInitials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || userProfile.avatar;

  const handleSave = () => {
    if (!name.trim()) return;

    updateUserProfile({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
    });

    setSavedSuccess(true);
    setTimeout(() => {
      navigation.goBack();
    }, 900);
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
        <Text style={styles.navTitle}>Edit Profile</Text>
        <View style={styles.navSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{previewInitials}</Text>
          </View>
          <Text style={styles.avatarSubtext}>Initials generate from your full name</Text>
        </View>

        {savedSuccess && (
          <View style={styles.toastCard}>
            <CheckCircleIcon size={18} color={colors.accent.primary} />
            <Text style={styles.toastText}>Profile changes updated successfully!</Text>
          </View>
        )}

        {/* Inputs */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Personal Details</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>FULL NAME</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Mpho Versace"
              placeholderTextColor={colors.text.muted}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>PHONE NUMBER (SOUTH AFRICA)</Text>
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
              placeholder="mpho@example.com"
              placeholderTextColor={colors.text.muted}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.85}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
  avatarSection: {
    alignItems: "center",
    marginVertical: spacing.lg,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface.card,
    borderWidth: 3,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  avatarSubtext: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 8,
  },
  toastCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surface.cardAlt,
    padding: spacing.sm,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.accent.primary,
    marginBottom: spacing.md,
  },
  toastText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.accent.primary,
  },
  formCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.lg,
  },
  formTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
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
    fontSize: 15,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  saveButton: {
    backgroundColor: colors.accent.primary,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
});
