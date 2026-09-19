import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DriverHomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <StatusBar style="light" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.greeting}>Good day, Thabo 👋</Text>
              <Text style={styles.subtitle}>Ready for your next trip?</Text>
            </View>

            <TouchableOpacity
              style={styles.profileButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("DriverProfile")}
            >
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>
          </View>

          {/* Driver Status */}
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <View style={styles.statusIndicator}>
                <View style={styles.offlineDot} />

                <View>
                  <Text style={styles.statusLabel}>Driver status</Text>
                  <Text style={styles.statusValue}>You're offline</Text>
                </View>
              </View>

              <View style={styles.offlineBadge}>
                <Text style={styles.offlineBadgeText}>OFFLINE</Text>
              </View>
            </View>

            <Text style={styles.statusDescription}>
              Go online when you're ready to receive ride requests.
            </Text>

            <TouchableOpacity
              style={styles.goOnlineButton}
              activeOpacity={0.85}
              onPress={() => navigation.navigate("DriverRideRequest")}
            >
              <Text style={styles.goOnlineButtonText}>Go Online</Text>
            </TouchableOpacity>
          </View>

          {/* Map */}
          <View style={styles.mapContainer}>
            <View style={styles.mapRoadHorizontal} />
            <View style={styles.mapRoadVertical} />
            <View style={styles.mapRoadDiagonal} />

            <View style={styles.mapCircleOne} />
            <View style={styles.mapCircleTwo} />
            <View style={styles.mapCircleThree} />

            <View style={styles.mapPin}>
              <Text style={styles.mapPinText}>🚗</Text>
            </View>

            <View style={styles.mapLabel}>
              <Text style={styles.mapLabelText}>Your location</Text>
            </View>

            <View style={styles.mapOverlay}>
              <Text style={styles.mapOverlayTitle}>You're offline</Text>
              <Text style={styles.mapOverlayText}>
                Go online to start receiving ride requests.
              </Text>
            </View>
          </View>

          {/* Today's Overview */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's overview</Text>
              <Text style={styles.sectionDate}>Today</Text>
            </View>

            <View style={styles.overviewRow}>
              <View style={styles.overviewCard}>
                <View style={styles.overviewIconCircle}>
                  <Text style={styles.overviewIcon}>💰</Text>
                </View>

                <Text style={styles.overviewValue}>R850</Text>
                <Text style={styles.overviewLabel}>Earnings</Text>
              </View>

              <View style={styles.overviewCard}>
                <View style={styles.overviewIconCircle}>
                  <Text style={styles.overviewIcon}>🚗</Text>
                </View>

                <Text style={styles.overviewValue}>8</Text>
                <Text style={styles.overviewLabel}>Trips</Text>
              </View>

              <View style={styles.overviewCard}>
                <View style={styles.overviewIconCircle}>
                  <Text style={styles.overviewIcon}>⭐</Text>
                </View>

                <Text style={styles.overviewValue}>4.9</Text>
                <Text style={styles.overviewLabel}>Rating</Text>
              </View>
            </View>
          </View>

          {/* Recent Activity */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent activity</Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("DriverTrips")}
              >
                <Text style={styles.viewAllText}>View all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.activityCard}>
              <View style={styles.activityIconCircle}>
                <Text style={styles.activityIcon}>🚗</Text>
              </View>

              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>Rosebank → Sandton</Text>
                <Text style={styles.activitySubtitle}>Completed • 14:25</Text>
              </View>

              <Text style={styles.activityAmount}>+ R125</Text>
            </View>

            <View style={styles.activityCard}>
              <View style={styles.activityIconCircle}>
                <Text style={styles.activityIcon}>🚗</Text>
              </View>

              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>Melrose → Rosebank</Text>
                <Text style={styles.activitySubtitle}>Completed • 12:10</Text>
              </View>

              <Text style={styles.activityAmount}>+ R98</Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavigation}>
          <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
            <Text style={styles.navIconActive}>⌂</Text>
            <Text style={styles.navTextActive}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DriverTrips")}
          >
            <Text style={styles.navIcon}>◷</Text>
            <Text style={styles.navText}>Trips</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DriverEarnings")}
          >
            <Text style={styles.navIcon}>R</Text>
            <Text style={styles.navText}>Earnings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DriverProfile")}
          >
            <Text style={styles.navIcon}>👤</Text>
            <Text style={styles.navText}>Profile</Text>
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
    paddingTop: 18,
    paddingBottom: 112,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  headerText: {
    flex: 1,
    paddingRight: 12,
  },

  greeting: {
    fontSize: 16,
    color: "#8FA5C1",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    alignItems: "center",
    justifyContent: "center",
  },

  profileIcon: {
    fontSize: 22,
  },

  statusCard: {
    width: "100%",
    backgroundColor: "#102A52",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 16,
    marginBottom: 18,
  },

  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },

  offlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#8FA5C1",
    marginRight: 10,
  },

  statusLabel: {
    fontSize: 12,
    color: "#8FA5C1",
    marginBottom: 3,
  },

  statusValue: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  offlineBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#071A3D",
  },

  offlineBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#8FA5C1",
    letterSpacing: 0.5,
  },

  statusDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#8FA5C1",
    marginTop: 14,
    marginBottom: 14,
  },

  goOnlineButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  goOnlineButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3D",
  },

  mapContainer: {
    width: "100%",
    height: 210,
    backgroundColor: "#102A52",
    borderRadius: 22,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#1D4775",
    marginBottom: 22,
  },

  mapRoadHorizontal: {
    position: "absolute",
    width: "120%",
    height: 24,
    backgroundColor: "#1D4775",
    top: 82,
    left: -20,
    transform: [{ rotate: "8deg" }],
  },

  mapRoadVertical: {
    position: "absolute",
    width: 22,
    height: "130%",
    backgroundColor: "#1D4775",
    left: 125,
    top: -20,
    transform: [{ rotate: "18deg" }],
  },

  mapRoadDiagonal: {
    position: "absolute",
    width: "120%",
    height: 14,
    backgroundColor: "#173C68",
    top: 125,
    left: -15,
    transform: [{ rotate: "-25deg" }],
  },

  mapCircleOne: {
    position: "absolute",
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 10,
    borderColor: "#173C68",
    top: 15,
    left: 25,
  },

  mapCircleTwo: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 12,
    borderColor: "#173C68",
    bottom: -25,
    right: 20,
  },

  mapCircleThree: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 8,
    borderColor: "#173C68",
    top: 20,
    right: 35,
  },

  mapPin: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -18,
    marginTop: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  mapPinText: {
    fontSize: 17,
  },

  mapLabel: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "#071A3D",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  mapLabelText: {
    fontSize: 11,
    color: "#C9D6E8",
  },

  mapOverlay: {
    position: "absolute",
    right: 12,
    top: 12,
    maxWidth: 175,
    backgroundColor: "#071A3D",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },

  mapOverlayTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 3,
  },

  mapOverlayText: {
    fontSize: 10,
    lineHeight: 14,
    color: "#8FA5C1",
  },

  section: {
    width: "100%",
    marginBottom: 22,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  sectionDate: {
    fontSize: 12,
    color: "#8FA5C1",
  },

  viewAllText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5BC0FF",
  },

  overviewRow: {
    flexDirection: "row",
    gap: 10,
  },

  overviewCard: {
    flex: 1,
    minHeight: 118,
    backgroundColor: "#102A52",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 12,
  },

  overviewIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  overviewIcon: {
    fontSize: 15,
  },

  overviewValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 2,
  },

  overviewLabel: {
    fontSize: 11,
    color: "#8FA5C1",
  },

  activityCard: {
    width: "100%",
    minHeight: 70,
    backgroundColor: "#102A52",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1D4775",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  activityIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  activityIcon: {
    fontSize: 17,
  },

  activityDetails: {
    flex: 1,
  },

  activityTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 3,
  },

  activitySubtitle: {
    fontSize: 11,
    color: "#8FA5C1",
  },

  activityAmount: {
    fontSize: 13,
    fontWeight: "800",
    color: "#5BC0FF",
    marginLeft: 8,
  },

  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    backgroundColor: "#0A2147",
    borderTopWidth: 1,
    borderTopColor: "#1D4775",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
  },

  navIconActive: {
    fontSize: 24,
    color: "#5BC0FF",
    marginBottom: 3,
  },

  navIcon: {
    fontSize: 20,
    color: "#8FA5C1",
    marginBottom: 4,
  },

  navTextActive: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#5BC0FF",
  },

  navText: {
    fontSize: 11,
    color: "#8FA5C1",
  },
});
