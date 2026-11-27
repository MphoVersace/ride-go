import { colors } from "../ui/theme";
import Icon from "../ui/Icon";
import { openScreen } from "../navigation/routes";
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
        icon: "bell",
        title: "Notifications",
        subtitle: "View ride and account alerts",
        route: "Notifications",
      },
      {
        id: "appearance",
        icon: "moon",
        title: "Appearance",
        subtitle: "Choose how RideGo looks",
      },
      {
        id: "location",
        icon: "pin",
        title: "Location",
        subtitle: "Manage location preferences",
      },
      {
        id: "language",
        icon: "globe",
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
        icon: "lock",
        title: "Privacy & Security",
        subtitle: "Manage your account privacy",
      },
      {
        id: "permissions",
        icon: "shield",
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
        icon: "info",
        title: "About RideGo",
        subtitle: "Learn more about RideGo",
      },
      {
        id: "terms",
        icon: "document",
        title: "Terms & Conditions",
        subtitle: "Review RideGo terms",
      },
      {
        id: "privacyPolicy",
        icon: "list",
        title: "Privacy Policy",
        subtitle: "How RideGo handles your information",
      },
    ],
  },
];

function SettingRow({ onPress, ...props }) {
  if (!onPress) return <View {...props} />;
  return <TouchableOpacity accessibilityRole="button" activeOpacity={0.75} onPress={onPress} {...props} />;
}

export default function SettingsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

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
            <Icon name="settings" style={styles.heroIcon} />
          </View>

          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Preferences and privacy</Text>
            <Text style={styles.heroDescription}>
              Notifications, appearance and account controls.
            </Text>
          </View>
        </View>

        {settingsSections.map((section) => (
          <View key={section.title} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>

            </View>

            <View style={styles.settingsCard}>
              {section.items.map((item, index) => (
                <SettingRow
                  key={item.id}
                  style={[
                    styles.settingRow,
                    index === section.items.length - 1 && styles.settingRowLast,
                  ]}
                  onPress={item.route ? () => navigation.navigate(item.route) : undefined}
                >
                  <View style={styles.settingIconContainer}>
                    <Icon name={item.icon} style={styles.settingIcon} />
                  </View>

                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                  </View>

                  {item.route && <Icon name="right" size={18} color={colors.muted} />}
                </SettingRow>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Icon name="bulb" style={styles.infoIcon} />
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
          onPress={() => openScreen(navigation, "RiderHome")}
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
    backgroundColor: colors.white,
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
    backgroundColor: colors.blueTint,
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
    color: colors.black,
    marginBottom: 5,
  },

  heroDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
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
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  settingIcon: {
    color: colors.blueInk,
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
