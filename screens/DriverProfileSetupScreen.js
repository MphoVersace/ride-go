import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DriverProfileSetupScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleContinue = () => {
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      Alert.alert(
        "Complete your profile",
        "Please enter your first name, last name, and phone number to continue.",
      );
      return;
    }

    navigation.navigate("DriverVehicleSetup");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <StatusBar style="light" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backArrow}>‹</Text>
            </TouchableOpacity>

            <View style={styles.progressContainer}>
              <View style={styles.progressTrack}>
                <View style={styles.progressFill} />
              </View>

              <Text style={styles.stepText}>Step 1 of 3</Text>
            </View>
          </View>

          <View style={styles.introSection}>
            <Text style={styles.logo}>RideGo</Text>

            <Text style={styles.heading}>Set up your driver profile</Text>

            <Text style={styles.description}>
              Let's start with some basic information so riders know who
              they're getting into a car with.
            </Text>
          </View>

          <View style={styles.photoSection}>
            <TouchableOpacity
              style={styles.photoButton}
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert(
                  "Profile photo",
                  "Photo selection will be connected later.",
                )
              }
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarIcon}>+</Text>
              </View>

              <View style={styles.photoTextContainer}>
                <Text style={styles.photoTitle}>Add profile photo</Text>

                <Text style={styles.photoDescription}>
                  Help riders recognise you
                </Text>
              </View>

              <Text style={styles.photoArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>First name</Text>

              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter your first name"
                placeholderTextColor="#7188A5"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Last name</Text>

              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter your last name"
                placeholderTextColor="#7188A5"
                autoCapitalize="words"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Phone number</Text>

              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="+27 71 234 5678"
                placeholderTextColor="#7188A5"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>i</Text>
            </View>

            <Text style={styles.infoText}>
              Your information will be used to create your RideGo driver
              profile. You will be able to review your details before
              completing registration.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.8}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#071A3D",
  },

  container: {
    flex: 1,
    backgroundColor: "#071A3D",
  },

  scrollView: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    marginBottom: 28,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#102A52",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  backArrow: {
    fontSize: 32,
    lineHeight: 34,
    color: "#FFFFFF",
    marginTop: -3,
  },

  progressContainer: {
    flex: 1,
  },

  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#1B355B",
    overflow: "hidden",
    marginBottom: 7,
  },

  progressFill: {
    width: "33%",
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#5BC0FF",
  },

  stepText: {
    fontSize: 12,
    color: "#8FA8C5",
  },

  introSection: {
    marginBottom: 25,
  },

  logo: {
    fontSize: 24,
    fontWeight: "800",
    color: "#5BC0FF",
    marginBottom: 20,
  },

  heading: {
    fontSize: 29,
    lineHeight: 36,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: "#C9D6E8",
  },

  photoSection: {
    marginBottom: 25,
  },

  photoButton: {
    minHeight: 88,
    borderRadius: 18,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  avatarIcon: {
    fontSize: 28,
    fontWeight: "400",
    color: "#071A3D",
  },

  photoTextContainer: {
    flex: 1,
  },

  photoTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  photoDescription: {
    fontSize: 12,
    color: "#8FA8C5",
  },

  photoArrow: {
    fontSize: 30,
    color: "#5BC0FF",
    marginLeft: 8,
  },

  form: {
    marginBottom: 20,
  },

  field: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },

  input: {
    height: 54,
    borderRadius: 15,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#FFFFFF",
  },

  infoCard: {
    flexDirection: "row",
    backgroundColor: "#0D2347",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#183B67",
  },

  infoIcon: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 1,
  },

  infoIconText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#071A3D",
  },

  infoText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 17,
    color: "#8FA8C5",
  },

  bottomSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: "#071A3D",
  },

  continueButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  continueButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3D",
  },
});

