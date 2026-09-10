import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const settingsSections = [
  {
    title: "Preferences",
    items: [
      {
        id: "notifications",
        icon: "🔔",
        title: "Notifications",
        subtitle: "Manage ride and account alerts",
      },
      {
        id: "appearance",
        icon: "🌙",
        title: "Appearance",
        subtitle: "Choose how RideGo looks",
      },
      {
        id: "location",
        icon: "📍",
        title: "Location",
        subtitle: "Manage location preferences",
      },
      {
        id: "language",
        icon: "🌐",
        title: "Language",
        subtitle: "English",
      },
    ],
  },
  {
    title: "Privacy & Security",
    items: [
      {
        id: "privacy",
        icon: "🔐",
        title: "Privacy & Security",
        subtitle: "Manage your account privacy",
      },
      {
        id: "permissions",
        icon: "🛡️",
        title: "App Permissions",
        subtitle: "Location and device permissions",
      },
    ],
  },
  {
    title: "RideGo",
    items: [
      {
        id: "about",
        icon: "ℹ️",
        title: "About RideGo",
        subtitle: "Learn more about RideGo",
      },
      {
        id: "terms",
        icon: "📄",
        title: "Terms & Conditions",
        subtitle: "Review RideGo terms",
      },
      {
        id: "privacyPolicy",
        icon: "📋",
        title: "Privacy Policy",
        subtitle: "How RideGo handles your information",
      },
    ],
  },
];

export default function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F9FC" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.75}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Settings</Text>
            <Text style={styles.headerSubtitle}>
              Personalise your RideGo experience
            </Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroIconCircle}>
            <Text style={styles.heroIcon}>⚙️</Text>
          </View>

          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>RideGo Settings</Text>
            <Text style={styles.heroDescription}>
              Manage your preferences, privacy, and app experience in one place.
            </Text>
          </View>
        </View>

        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionCount}>{section.items.length}</Text>
            </View>

            <View style={styles.settingsCard}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.settingRow,
                    index === section.items.length - 1 && styles.settingRowLast,
                  ]}
                  activeOpacity={0.75}
                  onPress={() => {}}
                >
                  <View style={styles.settingIconContainer}>
                    <Text style={styles.settingIcon}>{item.icon}</Text>
                  </View>

                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>

                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Text style={styles.infoIcon}>💡</Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Prototype settings</Text>
            <Text style={styles.infoDescription}>
              These settings currently demonstrate the RideGo interface.
              Preferences will become functional as the app's services are
              connected.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("RiderHome")}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>RideGo • Fast. Safe. Reliable.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F9FC",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 35,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },

  backIcon: {
    fontSize: 34,
    lineHeight: 36,
    color: "#071A3D",
    marginTop: -3,
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#071A3D",
  },

  headerSubtitle: {
    marginTop: 3,
    fontSize: 14,
    color: "#6B7A90",
  },

  heroCard: {
    backgroundColor: "#071A3D",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  heroIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  heroIcon: {
    fontSize: 27,
  },

  heroTextContainer: {
    flex: 1,
  },

  heroTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 5,
  },

  heroDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#C9D6E8",
  },

  section: {
    marginBottom: 23,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 3,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#071A3D",
  },

  sectionCount: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E4F5FF",
    color: "#1676A8",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 12,
    fontWeight: "800",
    paddingTop: 6,
  },

  settingsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 15,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  settingRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
  },

  settingRowLast: {
    borderBottomWidth: 0,
  },

  settingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#F1F7FC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  settingIcon: {
    fontSize: 20,
  },

  settingTextContainer: {
    flex: 1,
    paddingRight: 10,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#071A3D",
    marginBottom: 4,
  },

  settingSubtitle: {
    fontSize: 12,
    lineHeight: 17,
    color: "#718096",
  },

  chevron: {
    fontSize: 28,
    color: "#9AA8BA",
    marginLeft: 4,
    marginTop: -2,
  },

  infoCard: {
    backgroundColor: "#EAF7FF",
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    marginBottom: 20,
  },

  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  infoIcon: {
    fontSize: 19,
  },

  infoTextContainer: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#071A3D",
    marginBottom: 4,
  },

  infoDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#58708B",
  },

  homeButton: {
    height: 54,
    borderRadius: 18,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  homeButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3D",
  },

  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#9AA8BA",
  },
});
