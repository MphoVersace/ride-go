import { colors } from "../ui/theme";
import Icon from "../ui/Icon";
import { usePreviewAccount } from '../auth/PreviewAccount';
import React from "react";
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
  const { profile } = usePreviewAccount();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={styles.greeting}>Good day, {profile?.firstName ?? "Thabo"}</Text>
              <Text style={styles.subtitle}>Ready for your next trip?</Text>
            </View>

            <TouchableOpacity
              style={styles.profileButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("DriverProfile")}
            >
              <Icon name="user" style={styles.profileIcon} />
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
              <Icon name="car" style={styles.mapPinText} />
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
                  <Icon name="wallet" style={styles.overviewIcon} />
                </View>

                <Text style={styles.overviewValue}>R850</Text>
                <Text style={styles.overviewLabel}>Earnings</Text>
              </View>

              <View style={styles.overviewCard}>
                <View style={styles.overviewIconCircle}>
                  <Icon name="car" style={styles.overviewIcon} />
                </View>

                <Text style={styles.overviewValue}>8</Text>
                <Text style={styles.overviewLabel}>Trips</Text>
              </View>

              <View style={styles.overviewCard}>
                <View style={styles.overviewIconCircle}>
                  <Icon name="star" style={styles.overviewIcon} />
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
                <Icon name="car" style={styles.activityIcon} />
              </View>

              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>Rosebank → Sandton</Text>
                <Text style={styles.activitySubtitle}>Completed • 14:25</Text>
              </View>

              <Text style={styles.activityAmount}>+ R125</Text>
            </View>

            <View style={styles.activityCard}>
              <View style={styles.activityIconCircle}>
                <Icon name="car" style={styles.activityIcon} />
              </View>

              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>Melrose → Rosebank</Text>
                <Text style={styles.activitySubtitle}>Completed • 12:10</Text>
              </View>

              <Text style={styles.activityAmount}>+ R98</Text>
            </View>
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scrollView: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
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
    color: colors.muted,
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.black,
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.blueTint,
    borderWidth: 1,
    borderColor: colors.blueLine,
    alignItems: "center",
    justifyContent: "center",
  },

  profileIcon: {
    fontSize: 22,
  },

  statusCard: {
    width: "100%",
    backgroundColor: colors.blueTint,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.blueLine,
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
    color: colors.muted,
    marginBottom: 3,
  },

  statusValue: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.black,
  },

  offlineBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: colors.white,
  },

  offlineBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.muted,
    letterSpacing: 0.5,
  },

  statusDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
    marginTop: 14,
    marginBottom: 14,
  },

  goOnlineButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  goOnlineButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.navy,
  },

  mapContainer: {
    width: "100%",
    height: 210,
    backgroundColor: colors.blueTint,
    borderRadius: 22,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: colors.blueLine,
    marginBottom: 22,
  },

  mapRoadHorizontal: {
    position: "absolute",
    width: "120%",
    height: 24,
    backgroundColor: colors.blueLine,
    top: 82,
    left: -20,
    transform: [{ rotate: "8deg" }],
  },

  mapRoadVertical: {
    position: "absolute",
    width: 22,
    height: "130%",
    backgroundColor: colors.blueLine,
    left: 125,
    top: -20,
    transform: [{ rotate: "18deg" }],
  },

  mapRoadDiagonal: {
    position: "absolute",
    width: "120%",
    height: 14,
    backgroundColor: colors.blueLine,
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
    borderColor: colors.blueLine,
    top: 15,
    left: 25,
  },

  mapCircleTwo: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 12,
    borderColor: colors.blueLine,
    bottom: -25,
    right: 20,
  },

  mapCircleThree: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 8,
    borderColor: colors.blueLine,
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
    backgroundColor: colors.blue,
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
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  mapLabelText: {
    fontSize: 11,
    color: colors.muted,
  },

  mapOverlay: {
    position: "absolute",
    right: 12,
    top: 12,
    maxWidth: 175,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },

  mapOverlayTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.black,
    marginBottom: 3,
  },

  mapOverlayText: {
    fontSize: 10,
    lineHeight: 14,
    color: colors.muted,
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
    color: colors.black,
  },

  sectionDate: {
    fontSize: 12,
    color: colors.muted,
  },

  viewAllText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.blueInk,
  },

  overviewRow: {
    flexDirection: "row",
    gap: 10,
  },

  overviewCard: {
    flex: 1,
    minHeight: 118,
    backgroundColor: colors.blueTint,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.blueLine,
    padding: 12,
  },

  overviewIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
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
    color: colors.black,
    marginBottom: 2,
  },

  overviewLabel: {
    fontSize: 11,
    color: colors.muted,
  },

  activityCard: {
    width: "100%",
    minHeight: 70,
    backgroundColor: colors.blueTint,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.blueLine,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  activityIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
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
    color: colors.black,
    marginBottom: 3,
  },

  activitySubtitle: {
    fontSize: 11,
    color: colors.muted,
  },

  activityAmount: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.blueInk,
    marginLeft: 8,
  },

});
