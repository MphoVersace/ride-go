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

const rideOptions = [
  {
    id: "history",
    icon: "🧾",
    title: "Ride History",
    subtitle: "View your previous rides",
    route: "RideHistory",
  },
  {
    id: "saved",
    icon: "📍",
    title: "Saved Places",
    subtitle: "Manage your favourite destinations",
    route: "SavedPlaces",
  },
  {
    id: "payment",
    icon: "💳",
    title: "Payment Methods",
    subtitle: "Manage cards and payment options",
    route: "PaymentMethods",
  },
];

const rideGoOptions = [
  {
    id: "notifications",
    icon: "🔔",
    title: "Notifications",
    subtitle: "Stay updated about your rides",
    route: "Notifications",
  },
  {
    id: "safety",
    icon: "🛡️",
    title: "Safety Centre",
    subtitle: "Ride safely and get assistance",
    route: "SafetyCentre",
  },
  {
    id: "support",
    icon: "💬",
    title: "Help & Support",
    subtitle: "Get help with RideGo",
    route: "HelpSupport",
  },
  {
    id: "settings",
    icon: "⚙️",
    title: "Settings",
    subtitle: "Manage your RideGo preferences",
    route: "Settings",
  },
];

export default function RiderProfileScreen({ navigation }) {
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
            <Text style={styles.headerTitle}>Profile</Text>
            <Text style={styles.headerSubtitle}>
              Manage your RideGo account
            </Text>
          </View>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Mpho</Text>
            <Text style={styles.profilePhone}>+27 71 234 5678</Text>
            <Text style={styles.profileEmail}>mpho@example.com</Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your rides</Text>
            <Text style={styles.sectionCount}>{rideOptions.length}</Text>
          </View>

          <View style={styles.optionsCard}>
            {rideOptions.map((option, index) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionRow,
                  index === rideOptions.length - 1 && styles.optionRowLast,
                ]}
                activeOpacity={0.75}
                onPress={() => navigation.navigate(option.route)}
              >
                <View style={styles.optionIconContainer}>
                  <Text style={styles.optionIcon}>{option.icon}</Text>
                </View>

                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>
                    {option.subtitle}
                  </Text>
                </View>

                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>RideGo</Text>
            <Text style={styles.sectionCount}>{rideGoOptions.length}</Text>
          </View>

          <View style={styles.optionsCard}>
            {rideGoOptions.map((option, index) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionRow,
                  index === rideGoOptions.length - 1 && styles.optionRowLast,
                ]}
                activeOpacity={0.75}
                onPress={() => navigation.navigate(option.route)}
              >
                <View style={styles.optionIconContainer}>
                  <Text style={styles.optionIcon}>{option.icon}</Text>
                </View>

                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>
                    {option.subtitle}
                  </Text>
                </View>

                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.accountCard}>
          <View style={styles.accountIconContainer}>
            <Text style={styles.accountIcon}>👤</Text>
          </View>

          <View style={styles.accountTextContainer}>
            <Text style={styles.accountTitle}>Account actions</Text>
            <Text style={styles.accountDescription}>
              Manage your RideGo account. Account actions are currently
              prototype-only.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={() => {}}
        >
          <Text style={styles.logoutIcon}>↪</Text>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

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

  profileCard: {
    backgroundColor: "#071A3D",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  avatarText: {
    fontSize: 25,
    fontWeight: "800",
    color: "#071A3D",
  },

  profileInfo: {
    flex: 1,
  },

  profileName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  profilePhone: {
    fontSize: 13,
    color: "#C9D6E8",
    marginBottom: 3,
  },

  profileEmail: {
    fontSize: 12,
    color: "#91A4BF",
  },

  editButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 13,
    marginLeft: 10,
  },

  editButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#071A3D",
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

  optionsCard: {
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

  optionRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
  },

  optionRowLast: {
    borderBottomWidth: 0,
  },

  optionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#F1F7FC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  optionIcon: {
    fontSize: 20,
  },

  optionTextContainer: {
    flex: 1,
    paddingRight: 10,
  },

  optionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#071A3D",
    marginBottom: 4,
  },

  optionSubtitle: {
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

  accountCard: {
    backgroundColor: "#EAF7FF",
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    marginBottom: 18,
  },

  accountIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  accountIcon: {
    fontSize: 19,
  },

  accountTextContainer: {
    flex: 1,
  },

  accountTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#071A3D",
    marginBottom: 4,
  },

  accountDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#58708B",
  },

  logoutButton: {
    height: 54,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F0D6D6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  logoutIcon: {
    fontSize: 20,
    color: "#C0392B",
    marginRight: 8,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#C0392B",
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

