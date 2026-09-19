import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const settingSections = [
  {
    title: "ACCOUNT",
    items: [
      {
        id: "profile",
        icon: "👤",
        title: "Personal Information",
        subtitle: "Manage your name, phone and email",
      },
      {
        id: "vehicle",
        icon: "🚗",
        title: "Vehicle",
        subtitle: "Manage your vehicle information",
      },
      {
        id: "documents",
        icon: "📄",
        title: "Documents",
        subtitle: "View your driver documents",
      },
    ],
  },
  {
    title: "DRIVER PREFERENCES",
    items: [
      {
        id: "rideRequests",
        icon: "🔔",
        title: "Ride Requests",
        subtitle: "Choose how you receive ride requests",
      },
      {
        id: "navigation",
        icon: "🧭",
        title: "Navigation",
        subtitle: "Manage your navigation preferences",
      },
    ],
  },
  {
    title: "APP PREFERENCES",
    items: [
      {
        id: "notifications",
        icon: "🔔",
        title: "Notifications",
        subtitle: "Manage your notification preferences",
      },
      {
        id: "appearance",
        icon: "🎨",
        title: "Appearance",
        subtitle: "Light mode",
      },
    ],
  },
];

export default function DriverSettingsScreen({ navigation }) {
  const [rideRequestsEnabled, setRideRequestsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSettingPress = (id) => {
    switch (id) {
      case "profile":
        navigation.navigate("DriverEditProfile");
        break;

      case "vehicle":
        navigation.navigate("DriverVehicle");
        break;

      case "documents":
        navigation.navigate("DriverDocuments");
        break;

      case "rideRequests":
        Alert.alert(
          "Ride Requests",
          "Ride request preferences will be connected later.",
        );
        break;

      case "navigation":
        Alert.alert(
          "Navigation",
          "Navigation preferences will be connected later.",
        );
        break;

      case "notifications":
        Alert.alert(
          "Notifications",
          "Notification preferences will be connected later.",
        );
        break;

      case "appearance":
        Alert.alert(
          "Appearance",
          "Appearance settings will be connected later.",
        );
        break;

      default:
        break;
    }
  };

  const handlePrivacy = () => {
    Alert.alert(
      "Privacy & Security",
      "Privacy and security settings will be connected later.",
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "About RideGo",
      "RideGo\nFast, Safe, Reliable\n\nVersion 1.0.0",
    );
  };

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log out",
        style: "destructive",
        onPress: () => {
          Alert.alert(
            "Logged out",
            "Logout functionality will be connected later.",
          );
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerEyebrow}>DRIVER SETTINGS</Text>
            <Text style={styles.headerTitle}>Settings</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.introCard}>
            <View style={styles.introIconCircle}>
              <Text style={styles.introIcon}>⚙️</Text>
            </View>

            <View style={styles.introTextContainer}>
              <Text style={styles.introTitle}>Manage your RideGo settings</Text>
              <Text style={styles.introSubtitle}>
                Personalise your driver experience and app preferences.
              </Text>
            </View>
          </View>

          {settingSections.map((section) => (
            <View key={section.title} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>

              <View style={styles.card}>
                {section.items.map((item, index) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.settingRow,
                      index === section.items.length - 1 &&
                        styles.settingRowLast,
                    ]}
                    onPress={() => handleSettingPress(item.id)}
                    activeOpacity={0.75}
                  >
                    <View style={styles.settingIconCircle}>
                      <Text style={styles.settingIcon}>{item.icon}</Text>
                    </View>

                    <View style={styles.settingTextContainer}>
                      <Text style={styles.settingTitle}>{item.title}</Text>
                      <Text style={styles.settingSubtitle}>
                        {item.subtitle}
                      </Text>
                    </View>

                    <Text style={styles.chevron}>›</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>QUICK CONTROLS</Text>

            <View style={styles.card}>
              <View style={styles.toggleRow}>
                <View style={styles.settingIconCircle}>
                  <Text style={styles.settingIcon}>🔔</Text>
                </View>

                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Ride Requests</Text>
                  <Text style={styles.settingSubtitle}>
                    Receive new ride request alerts
                  </Text>
                </View>

                <Switch
                  value={rideRequestsEnabled}
                  onValueChange={setRideRequestsEnabled}
                />
              </View>

              <View style={styles.divider} />

              <View style={styles.toggleRow}>
                <View style={styles.settingIconCircle}>
                  <Text style={styles.settingIcon}>📱</Text>
                </View>

                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Notifications</Text>
                  <Text style={styles.settingSubtitle}>
                    Receive important RideGo updates
                  </Text>
                </View>

                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>PRIVACY & SUPPORT</Text>

            <View style={styles.card}>
              <TouchableOpacity
                style={styles.settingRow}
                onPress={handlePrivacy}
                activeOpacity={0.75}
              >
                <View style={styles.settingIconCircle}>
                  <Text style={styles.settingIcon}>🔒</Text>
                </View>

                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>Privacy & Security</Text>
                  <Text style={styles.settingSubtitle}>
                    Manage your privacy and security
                  </Text>
                </View>

                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.settingRow}
                onPress={handleAbout}
                activeOpacity={0.75}
              >
                <View style={styles.settingIconCircle}>
                  <Text style={styles.settingIcon}>ℹ️</Text>
                </View>

                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingTitle}>About RideGo</Text>
                  <Text style={styles.settingSubtitle}>Version 1.0.0</Text>
                </View>

                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.accountStatusCard}>
            <View style={styles.statusIconCircle}>
              <Text style={styles.statusIcon}>✓</Text>
            </View>

            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>Account in good standing</Text>
              <Text style={styles.statusSubtitle}>
                Your RideGo driver account is active and verified.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.85}
          >
            <Text style={styles.logoutIcon}>↪</Text>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backToProfileButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.backToProfileText}>Back to Profile</Text>
          </TouchableOpacity>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>ℹ️</Text>

            <Text style={styles.infoText}>
              Settings shown here are currently part of the RideGo UI
              experience. Account, privacy, notification, and preference changes
              will be connected to the app's services later.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },

  container: {
    flex: 1,
    backgroundColor: "#F7FAFC",
  },

  header: {
    minHeight: 86,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8EEF5",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 32,
    lineHeight: 34,
    color: "#2563EB",
    marginTop: -3,
  },

  headerTextContainer: {
    flex: 1,
    marginLeft: 14,
  },

  headerEyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "#64748B",
    marginBottom: 3,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
  },

  headerSpacer: {
    width: 42,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  introCard: {
    backgroundColor: "#EAF4FF",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
    borderWidth: 1,
    borderColor: "#D7EAFE",
  },

  introIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  introIcon: {
    fontSize: 24,
  },

  introTextContainer: {
    flex: 1,
  },

  introTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 5,
  },

  introSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: "#475569",
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.1,
    color: "#64748B",
    marginBottom: 10,
    marginLeft: 4,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E7EDF4",
    overflow: "hidden",
  },

  settingRow: {
    minHeight: 78,
    paddingHorizontal: 16,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
  },

  settingRowLast: {
    borderBottomWidth: 0,
  },

  settingIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  settingIcon: {
    fontSize: 19,
  },

  settingTextContainer: {
    flex: 1,
    paddingRight: 10,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 3,
  },

  settingSubtitle: {
    fontSize: 12,
    lineHeight: 17,
    color: "#64748B",
  },

  chevron: {
    fontSize: 27,
    color: "#94A3B8",
    marginLeft: 4,
  },

  toggleRow: {
    minHeight: 78,
    paddingHorizontal: 16,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "#EDF1F5",
    marginLeft: 71,
  },

  accountStatusCard: {
    backgroundColor: "#ECFDF3",
    borderRadius: 18,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CDEED9",
    marginBottom: 18,
  },

  statusIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#DFF7E8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  statusIcon: {
    fontSize: 21,
    fontWeight: "800",
    color: "#16A34A",
  },

  statusTextContainer: {
    flex: 1,
  },

  statusTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#166534",
    marginBottom: 4,
  },

  statusSubtitle: {
    fontSize: 12,
    lineHeight: 17,
    color: "#4D7C5B",
  },

  logoutButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FECACA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  logoutIcon: {
    fontSize: 20,
    color: "#DC2626",
    marginRight: 9,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#DC2626",
  },

  backToProfileButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  backToProfileText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  infoCard: {
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  infoIcon: {
    fontSize: 17,
    marginRight: 10,
  },

  infoText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: "#64748B",
  },
});
