import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const safetyOptions = [
  {
    id: "emergency",
    icon: "🚨",
    title: "Emergency Assistance",
    description:
      "Get help quickly if you are in immediate danger or need urgent assistance.",
    action: "Emergency Help",
  },
  {
    id: "share",
    icon: "📍",
    title: "Share Trip",
    description:
      "Share your current trip details with a trusted contact for added peace of mind.",
    action: "Share Trip",
  },
  {
    id: "contact",
    icon: "👤",
    title: "Trusted Contacts",
    description:
      "Manage the people you want to contact during an emergency or safety concern.",
    action: "Manage Contacts",
  },
];

const safetyTips = [
  "Always check your surroundings before starting a trip.",
  "Keep your vehicle doors locked while driving.",
  "Never share your personal information with riders.",
  "If something feels unsafe, move to a safe public location.",
  "Use RideGo's safety tools whenever you need additional support.",
];

export default function DriverSafetyScreen({ navigation }) {
  const handleSafetyOption = (option) => {
    Alert.alert(
      option.title,
      `${option.title} functionality will be connected later.`,
    );
  };

  const handleEmergency = () => {
    Alert.alert(
      "Emergency Assistance",
      "Emergency assistance functionality will be connected later.",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerLabel}>DRIVER SAFETY</Text>
            <Text style={styles.headerTitle}>Safety Centre</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroCard}>
            <View style={styles.heroIconCircle}>
              <Text style={styles.heroIcon}>🛡️</Text>
            </View>

            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>Your safety matters</Text>
              <Text style={styles.heroDescription}>
                RideGo is committed to helping you feel safe and supported while
                driving.
              </Text>
            </View>
          </View>

          <View style={styles.emergencyCard}>
            <View style={styles.emergencyHeader}>
              <View style={styles.emergencyIconCircle}>
                <Text style={styles.emergencyIcon}>🚨</Text>
              </View>

              <View style={styles.emergencyTextContainer}>
                <Text style={styles.emergencyTitle}>Need immediate help?</Text>
                <Text style={styles.emergencyDescription}>
                  Use emergency assistance if you are in immediate danger.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.emergencyButton}
              onPress={handleEmergency}
              activeOpacity={0.85}
            >
              <Text style={styles.emergencyButtonText}>
                Emergency Assistance
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Safety Tools</Text>
            <Text style={styles.sectionSubtitle}>
              Tools designed to help protect you while driving.
            </Text>

            <View style={styles.optionsCard}>
              {safetyOptions.map((option, index) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionRow,
                    index !== safetyOptions.length - 1 &&
                      styles.optionRowBorder,
                  ]}
                  onPress={() => handleSafetyOption(option)}
                  activeOpacity={0.75}
                >
                  <View style={styles.optionIconCircle}>
                    <Text style={styles.optionIcon}>{option.icon}</Text>
                  </View>

                  <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    <Text style={styles.optionDescription}>
                      {option.description}
                    </Text>
                  </View>

                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Driver Safety Tips</Text>

            <View style={styles.tipsCard}>
              {safetyTips.map((tip, index) => (
                <View key={index} style={styles.tipRow}>
                  <View style={styles.tipNumber}>
                    <Text style={styles.tipNumberText}>{index + 1}</Text>
                  </View>

                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.supportCard}>
            <View style={styles.supportIconCircle}>
              <Text style={styles.supportIcon}>💬</Text>
            </View>

            <View style={styles.supportContent}>
              <Text style={styles.supportTitle}>Need more support?</Text>
              <Text style={styles.supportDescription}>
                Our support team can help with safety concerns, incidents, or
                questions about your driver account.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.supportButton}
              onPress={() =>
                Alert.alert(
                  "Help & Support",
                  "Help and support functionality will be connected later.",
                )
              }
              activeOpacity={0.8}
            >
              <Text style={styles.supportButtonText}>Get Support</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>ℹ️</Text>

            <Text style={styles.infoText}>
              RideGo safety features are currently presented as a UI experience.
              Emergency services, trusted contacts, trip sharing, and other
              safety integrations will be connected during the application
              integration stage.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.backButtonBottom}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.backButtonBottomText}>Back to Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F9FC",
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F9FC",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E7EEF5",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F1F6FA",
    justifyContent: "center",
    alignItems: "center",
  },

  backIcon: {
    fontSize: 34,
    lineHeight: 36,
    color: "#123B5D",
    marginTop: -3,
  },

  headerTextContainer: {
    flex: 1,
    marginLeft: 14,
  },

  headerLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "#5D7182",
    marginBottom: 3,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#123B5D",
  },

  headerSpacer: {
    width: 42,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF6FF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#CFEAFF",
  },

  heroIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  heroIcon: {
    fontSize: 28,
  },

  heroTextContainer: {
    flex: 1,
  },

  heroTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#123B5D",
    marginBottom: 5,
  },

  heroDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#527087",
  },

  emergencyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#F2D7D7",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  emergencyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  emergencyIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  emergencyIcon: {
    fontSize: 25,
  },

  emergencyTextContainer: {
    flex: 1,
  },

  emergencyTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#18384F",
    marginBottom: 4,
  },

  emergencyDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: "#6A7D8C",
  },

  emergencyButton: {
    backgroundColor: "#D94848",
    borderRadius: 13,
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  emergencyButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#123B5D",
    marginBottom: 4,
  },

  sectionSubtitle: {
    fontSize: 13,
    color: "#6B7F8E",
    marginBottom: 12,
    lineHeight: 19,
  },

  optionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E4ECF2",
    overflow: "hidden",
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    minHeight: 92,
  },

  optionRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#EDF1F4",
  },

  optionIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EEF7FD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  optionIcon: {
    fontSize: 21,
  },

  optionContent: {
    flex: 1,
    paddingRight: 10,
  },

  optionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#18384F",
    marginBottom: 4,
  },

  optionDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: "#6A7D8C",
  },

  chevron: {
    fontSize: 28,
    color: "#9BAAB5",
    marginLeft: 4,
  },

  tipsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 17,
    borderWidth: 1,
    borderColor: "#E4ECF2",
  },

  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
  },

  tipRowLast: {
    marginBottom: 0,
  },

  tipNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EAF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  tipNumberText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#176B9C",
  },

  tipText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: "#526A7A",
    paddingTop: 3,
  },

  supportCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 17,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E4ECF2",
  },

  supportIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EEF7FD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  supportIcon: {
    fontSize: 21,
  },

  supportContent: {
    marginBottom: 14,
  },

  supportTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#18384F",
    marginBottom: 5,
  },

  supportDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#687D8C",
  },

  supportButton: {
    borderWidth: 1,
    borderColor: "#1A7DB3",
    borderRadius: 12,
    minHeight: 46,
    justifyContent: "center",
    alignItems: "center",
  },

  supportButtonText: {
    color: "#176B9C",
    fontSize: 14,
    fontWeight: "800",
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F0F7FB",
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DCEBF4",
  },

  infoIcon: {
    fontSize: 17,
    marginRight: 10,
  },

  infoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: "#587184",
  },

  backButtonBottom: {
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: "#123B5D",
    justifyContent: "center",
    alignItems: "center",
  },

  backButtonBottomText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});
s