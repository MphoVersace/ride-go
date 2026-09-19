import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

const DriverProfileScreen = ({ navigation }) => {
  const driver = {
    firstName: "Thabo",
    lastName: "Mokoena",
    phone: "+27 71 234 5678",
    email: "thabo.mokoena@example.com",
    rating: "4.9",
    trips: "142",
    memberSince: "March 2026",
    vehicle: "Toyota Corolla",
    vehicleYear: "2022",
    vehicleColor: "White",
    licensePlate: "GP 123 456",
  };

  const handleEditProfile = () => {
    navigation.navigate("DriverEditProfile");
  };

  const handleVehicle = () => {
    navigation.navigate("DriverVehicle");
  };

  const handleDocuments = () => {
    navigation.navigate("DriverDocuments");
  };

  const handleNotifications = () => {
    navigation.navigate("DriverNotifications");
  };

  const handleSafety = () => {
    navigation.navigate("DriverSafety");
  };

  const handleHelp = () => {
    navigation.navigate("DriverHelp");
  };

  const handleSettings = () => {
    navigation.navigate("DriverSettings");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>DRIVER ACCOUNT</Text>
              <Text style={styles.title}>Profile</Text>
              <Text style={styles.subtitle}>
                Manage your driver account and preferences.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.editHeaderButton}
              onPress={handleEditProfile}
              activeOpacity={0.8}
            >
              <Text style={styles.editHeaderText}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {driver.firstName.charAt(0)}
                {driver.lastName.charAt(0)}
              </Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {driver.firstName} {driver.lastName}
              </Text>

              <Text style={styles.profileRole}>RideGo Driver</Text>

              <View style={styles.ratingRow}>
                <Text style={styles.ratingStar}>★</Text>
                <Text style={styles.ratingValue}>{driver.rating}</Text>
                <Text style={styles.ratingDivider}>•</Text>
                <Text style={styles.ratingTrips}>{driver.trips} trips</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{driver.trips}</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>{driver.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>5 mo</Text>
              <Text style={styles.statLabel}>Driving</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal information</Text>

            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <View style={styles.iconBox}>
                  <Text style={styles.iconText}>👤</Text>
                </View>

                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Full name</Text>
                  <Text style={styles.infoValue}>
                    {driver.firstName} {driver.lastName}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <View style={styles.iconBox}>
                  <Text style={styles.iconText}>📱</Text>
                </View>

                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Phone number</Text>
                  <Text style={styles.infoValue}>{driver.phone}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <View style={styles.iconBox}>
                  <Text style={styles.iconText}>✉️</Text>
                </View>

                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Email address</Text>
                  <Text style={styles.infoValue}>{driver.email}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <View style={styles.iconBox}>
                  <Text style={styles.iconText}>📅</Text>
                </View>

                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Driver since</Text>
                  <Text style={styles.infoValue}>{driver.memberSince}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vehicle</Text>

            <TouchableOpacity
              style={styles.menuCard}
              onPress={handleVehicle}
              activeOpacity={0.85}
            >
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>🚗</Text>
              </View>

              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Vehicle details</Text>
                <Text style={styles.menuSubtitle}>
                  {driver.vehicle} • {driver.vehicleYear} •{" "}
                  {driver.vehicleColor}
                </Text>
                <Text style={styles.plateText}>{driver.licensePlate}</Text>
              </View>

              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Driver verification</Text>

            <TouchableOpacity
              style={styles.menuCard}
              onPress={handleDocuments}
              activeOpacity={0.85}
            >
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>📄</Text>
              </View>

              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Documents</Text>
                <Text style={styles.menuSubtitle}>
                  Driver licence, registration and inspection
                </Text>

                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓ Verified</Text>
                </View>
              </View>

              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>App & support</Text>

            <TouchableOpacity
              style={styles.menuCard}
              onPress={handleNotifications}
              activeOpacity={0.85}
            >
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>🔔</Text>
              </View>

              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Notifications</Text>
                <Text style={styles.menuSubtitle}>
                  Ride requests and account updates
                </Text>
              </View>

              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuCard}
              onPress={handleSafety}
              activeOpacity={0.85}
            >
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>🛡️</Text>
              </View>

              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Safety Centre</Text>
                <Text style={styles.menuSubtitle}>
                  Safety tools and emergency support
                </Text>
              </View>

              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuCard}
              onPress={handleHelp}
              activeOpacity={0.85}
            >
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>❓</Text>
              </View>

              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Help & Support</Text>
                <Text style={styles.menuSubtitle}>
                  Get help with your driver account
                </Text>
              </View>

              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuCard}
              onPress={handleSettings}
              activeOpacity={0.85}
            >
              <View style={styles.menuIcon}>
                <Text style={styles.menuIconText}>⚙️</Text>
              </View>

              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>Settings</Text>
                <Text style={styles.menuSubtitle}>
                  App preferences and account settings
                </Text>
              </View>

              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoBanner}>
            <View style={styles.infoBannerIcon}>
              <Text style={styles.infoBannerIconText}>✓</Text>
            </View>

            <View style={styles.infoBannerContent}>
              <Text style={styles.infoBannerTitle}>
                Your account is in good standing
              </Text>
              <Text style={styles.infoBannerText}>
                Keep your documents and vehicle information up to date to
                continue driving with RideGo.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() =>
              Alert.alert(
                "Log out",
                "Log out functionality will be connected later.",
              )
            }
            activeOpacity={0.85}
          >
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>RideGo Driver • Version 1.0.0</Text>
        </ScrollView>

        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("DriverHome")}
            activeOpacity={0.8}
          >
            <Text style={styles.navIcon}>⌂</Text>
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("DriverTrips")}
            activeOpacity={0.8}
          >
            <Text style={styles.navIcon}>▣</Text>
            <Text style={styles.navLabel}>Trips</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => navigation.navigate("DriverEarnings")}
            activeOpacity={0.8}
          >
            <Text style={styles.navIcon}>R</Text>
            <Text style={styles.navLabel}>Earnings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, styles.activeNavItem]}
            onPress={() => navigation.navigate("DriverProfile")}
            activeOpacity={0.8}
          >
            <Text style={[styles.navIcon, styles.activeNavIcon]}>●</Text>
            <Text style={[styles.navLabel, styles.activeNavLabel]}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "800",
    color: "#2563EB",
    letterSpacing: 1.2,
    marginBottom: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 5,
    maxWidth: 270,
    lineHeight: 19,
  },
  editHeaderButton: {
    backgroundColor: "#E8F1FF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  editHeaderText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2563EB",
  },
  profileCard: {
    backgroundColor: "#0F4C81",
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#D9F0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 21,
    fontWeight: "800",
    color: "#0F4C81",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },
  profileRole: {
    color: "#D9EAF7",
    fontSize: 13,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },
  ratingStar: {
    color: "#FBBF24",
    fontSize: 15,
    marginRight: 5,
  },
  ratingValue: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  ratingDivider: {
    color: "#A9C8DF",
    marginHorizontal: 7,
  },
  ratingTrips: {
    color: "#D9EAF7",
    fontSize: 13,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statValue: {
    fontSize: 19,
    fontWeight: "800",
    color: "#0F172A",
  },
  statLabel: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
  },
  section: {
    marginBottom: 23,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconText: {
    fontSize: 17,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: "#94A3B8",
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E293B",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEF2F7",
  },
  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  menuIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  menuIconText: {
    fontSize: 19,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },
  menuSubtitle: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
    lineHeight: 16,
  },
  plateText: {
    alignSelf: "flex-start",
    marginTop: 7,
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 10,
    fontWeight: "800",
    color: "#334155",
  },
  verifiedBadge: {
    alignSelf: "flex-start",
    marginTop: 7,
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#059669",
  },
  chevron: {
    fontSize: 26,
    color: "#94A3B8",
    marginLeft: 8,
  },
  infoBanner: {
    backgroundColor: "#EFF6FF",
    borderRadius: 17,
    padding: 15,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#DBEAFE",
    marginBottom: 20,
  },
  infoBannerIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  infoBannerIconText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },
  infoBannerContent: {
    flex: 1,
  },
  infoBannerTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1E3A8A",
  },
  infoBannerText: {
    fontSize: 11,
    color: "#475569",
    lineHeight: 17,
    marginTop: 4,
  },
  logoutButton: {
    height: 52,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FECACA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#DC2626",
  },
  versionText: {
    textAlign: "center",
    fontSize: 10,
    color: "#94A3B8",
    marginBottom: 8,
  },
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 78,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 7,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
  },
  activeNavItem: {
    transform: [{ translateY: -1 }],
  },
  navIcon: {
    fontSize: 20,
    color: "#94A3B8",
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
  },
  activeNavIcon: {
    color: "#2563EB",
  },
  activeNavLabel: {
    color: "#2563EB",
  },
});

export default DriverProfileScreen;
