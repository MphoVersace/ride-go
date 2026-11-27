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

export default function RiderHomeScreen({ navigation }) {
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
          <View style={styles.header}>
            <View style={styles.headerCopy}>
              <Text style={styles.greeting}>Good day{profile?.firstName ? `, ${profile.firstName}` : ""}</Text>
              <Text style={styles.subtitle}>Book your next ride</Text>
            </View>

            <TouchableOpacity
              style={styles.profileButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("RiderProfile")}
            >
              <Icon name="user" style={styles.profileIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.locationCard}>
            <View style={styles.locationIconContainer}>
              <Icon name="pin" style={styles.locationIcon} />
            </View>

            <View style={styles.locationText}>
              <Text style={styles.locationLabel}>Current location</Text>
              <Text style={styles.locationValue}>Your current location</Text>
            </View>

            <Icon name="right" style={styles.locationArrow} />
          </View>

          <TouchableOpacity
            style={styles.destinationCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("DestinationSearch")}
          >
            <View style={styles.searchIconContainer}>
              <Icon name="search" style={styles.searchIcon} />
            </View>

            <Text style={styles.destinationText}>Where to?</Text>

            <Icon name="right" style={styles.destinationArrow} />
          </TouchableOpacity>

          <View style={styles.mapContainer}>
            <View style={styles.mapRoadHorizontal} />
            <View style={styles.mapRoadVertical} />
            <View style={styles.mapRoadDiagonal} />

            <View style={styles.mapCircleOne} />
            <View style={styles.mapCircleTwo} />
            <View style={styles.mapCircleThree} />

            <View style={styles.mapPin}>
              <Icon name="pin" style={styles.mapPinText} />
            </View>

            <View style={styles.mapLabel}>
              <Text style={styles.mapLabelText}>Your location</Text>
            </View>
          </View>

          <View style={styles.quickSection}>
            <Text style={styles.sectionTitle}>Quick actions</Text>

            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.quickCard} activeOpacity={0.85} onPress={() => navigation.navigate("SavedPlaces")}>
                <View style={styles.quickIconCircle}>
                  <Icon name="home" style={styles.quickIcon} />
                </View>

                <Text style={styles.quickTitle}>Home</Text>
                <Text style={styles.quickSubtitle}>Add location</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.quickCard} activeOpacity={0.85} onPress={() => navigation.navigate("SavedPlaces")}>
                <View style={styles.quickIconCircle}>
                  <Icon name="work" style={styles.quickIcon} />
                </View>

                <Text style={styles.quickTitle}>Work</Text>
                <Text style={styles.quickSubtitle}>Add location</Text>
              </TouchableOpacity>
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

  headerCopy: { flex: 1, paddingRight: 12 },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
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

  locationCard: {
    width: "100%",
    minHeight: 66,
    backgroundColor: colors.blueTint,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.blueLine,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  locationIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  locationIcon: {
    fontSize: 19,
  },

  locationText: {
    flex: 1,
  },

  locationLabel: {
    fontSize: 12,
    color: colors.muted,
    marginBottom: 3,
  },

  locationValue: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.black,
  },

  locationArrow: {
    fontSize: 30,
    color: colors.blueInk,
    marginLeft: 8,
  },

  destinationCard: {
    width: "100%",
    height: 62,
    backgroundColor: colors.blue,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  searchIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  searchIcon: {
    fontSize: 26,
    color: colors.blueInk,
    marginTop: -3,
  },

  destinationText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.navy,
  },

  destinationArrow: {
    fontSize: 30,
    color: colors.navy,
  },

  mapContainer: {
    width: "100%",
    height: 180,
    backgroundColor: colors.blueTint,
    borderRadius: 22,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: colors.blueLine,
    marginBottom: 18,
  },

  mapRoadHorizontal: {
    position: "absolute",
    width: "120%",
    height: 24,
    backgroundColor: colors.blueLine,
    top: 75,
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
    top: 115,
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

  quickSection: {
    width: "100%",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 10,
  },

  quickActions: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },

  quickCard: {
    flex: 1,
    minHeight: 95,
    backgroundColor: colors.blueTint,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.blueLine,
    padding: 12,
  },

  quickIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
  },

  quickIcon: {
    fontSize: 17,
  },

  quickTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 2,
  },

  quickSubtitle: {
    fontSize: 11,
    color: colors.muted,
  },

});
