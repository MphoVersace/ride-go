import { usePreviewAccount } from "../auth/PreviewAccount";
import { isEmail, normalizeEmail, normalizePhone } from "../auth/validation";
import { KeyboardField, KeyboardFormScroll } from "../ui/KeyboardForm";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DriverEditProfileScreen = ({ navigation }) => {
  const { profile, updateProfile } = usePreviewAccount();
  const [firstName, setFirstName] = useState(profile?.firstName ?? "Thabo");
  const [lastName, setLastName] = useState(profile?.lastName ?? "Mokoena");
  const [phone, setPhone] = useState(profile?.phone ?? "+27 71 234 5678");
  const [email, setEmail] = useState(profile?.email ?? "thabo.mokoena@example.com");
  const firstNameField = useRef(null);
  const lastNameField = useRef(null);
  const phoneField = useRef(null);
  const emailField = useRef(null);

  const handleSave = () => {
    const mobile = normalizePhone(phone);
    if (!firstName.trim() || !lastName.trim() || !mobile || !isEmail(email)) {
      Alert.alert("Check your details", "Enter a first name, surname, valid mobile number and email address.");
      return;
    }
    if (updateProfile({ firstName: firstName.trim(), lastName: lastName.trim(), phone: mobile, email: normalizeEmail(email) }) === false) {
      Alert.alert("Email in use", "This email already has a demo account.");
      return;
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.eyebrow}>DRIVER ACCOUNT</Text>
            <Text style={styles.title}>Edit Profile</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <KeyboardFormScroll
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.photoButton}
              onPress={() =>
                Alert.alert(
                  "Profile photo",
                  "Photo upload will be connected later.",
                )
              }
              activeOpacity={0.8}
            >
              <Text style={styles.photoButtonText}>Change photo</Text>
            </TouchableOpacity>

            <Text style={styles.photoHint}>
              Use a clear photo where your face is visible.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal information</Text>

            <View style={styles.card}>
              <View style={styles.field}>
                <Text style={styles.label}>First name</Text>

                <KeyboardField
                  ref={firstNameField}
                  nextRef={lastNameField}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Enter first name"
                  placeholderTextColor="#94A3B8"
                  style={styles.input}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.divider} />

              <View style={styles.field}>
                <Text style={styles.label}>Last name</Text>

                <KeyboardField
                  ref={lastNameField}
                  nextRef={phoneField}
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder="Enter last name"
                  placeholderTextColor="#94A3B8"
                  style={styles.input}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.divider} />

              <View style={styles.field}>
                <Text style={styles.label}>Phone number</Text>

                <KeyboardField
                  ref={phoneField}
                  nextRef={emailField}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+27 00 000 0000"
                  placeholderTextColor="#94A3B8"
                  style={styles.input}
                  keyboardType="phone-pad"
                />

                <Text style={styles.helperText}>
                  This number may be used for driver communication.
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.field}>
                <Text style={styles.label}>Email address</Text>

                <KeyboardField
                  ref={emailField}
                  onSubmitEditing={handleSave}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor="#94A3B8"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <Text style={styles.helperText}>
                  Keep your email address up to date for account notices.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>i</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>
                Keep your information accurate
              </Text>
              <Text style={styles.infoText}>
                Accurate personal details help RideGo keep your driver account
                secure and make it easier for riders to identify you.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </KeyboardFormScroll>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F9FC",
  },
  container: {
    flex: 1,
  },
  header: {
    minHeight: 82,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F9FC",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    fontSize: 31,
    lineHeight: 34,
    color: "#0F172A",
    marginTop: -2,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  eyebrow: {
    fontSize: 9,
    fontWeight: "800",
    color: "#2563EB",
    letterSpacing: 1.1,
    marginBottom: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },
  headerSpacer: {
    width: 42,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 35,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 27,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#D9F0FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F4C81",
  },
  photoButton: {
    backgroundColor: "#E8F1FF",
    borderRadius: 11,
    paddingHorizontal: 15,
    paddingVertical: 9,
  },
  photoButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#2563EB",
  },
  photoHint: {
    fontSize: 10,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 7,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
  },
  field: {
    paddingVertical: 15,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 8,
  },
  input: {
    height: 47,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 13,
    fontSize: 14,
    color: "#0F172A",
  },
  helperText: {
    fontSize: 10,
    color: "#94A3B8",
    lineHeight: 15,
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#EEF2F7",
  },
  infoCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    padding: 15,
    flexDirection: "row",
    marginBottom: 20,
  },
  infoIcon: {
    width: 33,
    height: 33,
    borderRadius: 17,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  infoIconText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1E3A8A",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 10,
    color: "#475569",
    lineHeight: 16,
  },
  saveButton: {
    height: 54,
    borderRadius: 15,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  cancelButton: {
    height: 52,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "800",
  },
});

export default DriverEditProfileScreen;
