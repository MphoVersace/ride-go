import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function RiderProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile</Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>Mpho</Text>
            <Text style={styles.phone}>+27 71 234 5678</Text>
            <Text style={styles.email}>mpho@example.com</Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProfile")}
            activeOpacity={0.8}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Your rides</Text>

        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("RideHistory")}
            activeOpacity={0.8}
          >
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>◷</Text>
            </View>

            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Ride History</Text>
              <Text style={styles.menuSubtitle}>View your previous rides</Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("SavedPlaces")}
            activeOpacity={0.8}
          >
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>📍</Text>
            </View>

            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Saved Places</Text>
              <Text style={styles.menuSubtitle}>
                Home, work and favourite places
              </Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("PaymentMethods")}
            activeOpacity={0.8}
          >
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>▣</Text>
            </View>

            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Payment Methods</Text>
              <Text style={styles.menuSubtitle}>
                Manage your payment options
              </Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>RideGo</Text>

        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Notifications")}
            activeOpacity={0.8}
          >
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>🔔</Text>
            </View>

            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Notifications</Text>
              <Text style={styles.menuSubtitle}>Manage your ride updates</Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("SafetyCentre")}
            activeOpacity={0.8}
          >
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>🛡️</Text>
            </View>

            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Safety Centre</Text>
              <Text style={styles.menuSubtitle}>
                Stay safe while using RideGo
              </Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("HelpSupport")}
            activeOpacity={0.8}
          >
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>?</Text>
            </View>

            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Help & Support</Text>
              <Text style={styles.menuSubtitle}>
                Get help with your RideGo experience
              </Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Settings")}
            activeOpacity={0.8}
          >
            <View style={styles.menuIconContainer}>
              <Text style={styles.menuIcon}>⚙</Text>
            </View>

            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Settings</Text>
              <Text style={styles.menuSubtitle}>
                Manage your app preferences
              </Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>RideGo • Prototype</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071A3D",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 35,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#102A52",
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 34,
    lineHeight: 34,
    color: "#FFFFFF",
    marginTop: -3,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  headerSpacer: {
    width: 44,
  },

  profileCard: {
    backgroundColor: "#102A52",
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#1D4775",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  avatarText: {
    fontSize: 28,
    fontWeight: "900",
    color: "#071A3D",
  },

  profileInfo: {
    flex: 1,
  },

  name: {
    fontSize: 21,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  phone: {
    fontSize: 13,
    color: "#C9D6E8",
    marginBottom: 3,
  },

  email: {
    fontSize: 13,
    color: "#9FB4CC",
  },

  editButton: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 16,
    backgroundColor: "#5BC0FF",
  },

  editButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#071A3D",
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#9FB4CC",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 4,
  },

  menuCard: {
    backgroundColor: "#102A52",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#1D4775",
  },

  menuItem: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  menuIcon: {
    fontSize: 20,
    color: "#5BC0FF",
  },

  menuTextContainer: {
    flex: 1,
  },

  menuTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  menuSubtitle: {
    fontSize: 12,
    color: "#9FB4CC",
    lineHeight: 17,
  },

  chevron: {
    fontSize: 28,
    color: "#7F96B0",
    marginLeft: 8,
  },

  divider: {
    height: 1,
    backgroundColor: "#1D4775",
    marginLeft: 72,
  },

  logoutButton: {
    height: 54,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#5BC0FF",
  },

  version: {
    textAlign: "center",
    fontSize: 12,
    color: "#7187A2",
  },
});
