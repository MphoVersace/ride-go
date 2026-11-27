import { colors } from "../ui/theme";
import Icon from "../ui/Icon";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DriverRideRequestScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 900);

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleDecline = () => {
    Alert.alert(
      "Ride Declined",
      "This is a visual prototype. Ride request logic will be connected later.",
    );
  };

  const handleAccept = () => {
    navigation.navigate("DriverNavigation");
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingSafeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

        <View style={styles.loadingContainer}>
          <View style={styles.loadingLogoCircle}>
            <Text style={styles.loadingLogoText}>R</Text>
          </View>

          <Text style={styles.loadingTitle}>RideGo</Text>

          <Text style={styles.loadingSubtitle}>
            Preparing your ride request...
          </Text>

          <ActivityIndicator
            size="small"
            color="#5BC0FF"
            style={styles.loadingIndicator}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerLabel}>NEW RIDE REQUEST</Text>
              <Text style={styles.headerTitle}>You have a new trip</Text>
            </View>

            <View style={styles.requestBadge}>
              <Text style={styles.requestBadgeText}>NEW</Text>
            </View>
          </View>

          {/* Countdown */}
          <View style={styles.countdownCard}>
            <View style={styles.countdownCircle}>
              <Text style={styles.countdownNumber}>15</Text>
              <Text style={styles.countdownSeconds}>SEC</Text>
            </View>

            <View style={styles.countdownContent}>
              <Text style={styles.countdownTitle}>Respond to request</Text>
              <Text style={styles.countdownText}>
                Review the trip details before accepting.
              </Text>
            </View>
          </View>

          {/* Rider */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>RIDER</Text>

            <View style={styles.riderRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>N</Text>
              </View>

              <View style={styles.riderDetails}>
                <Text style={styles.riderName}>Naledi M.</Text>

                <View style={styles.ratingRow}>
                  <Icon name="star" style={styles.star} />
                  <Text style={styles.rating}>4.9</Text>
                  <Text style={styles.ratingCount}>• 42 rides</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Trip Route */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>TRIP DETAILS</Text>

            <View style={styles.routeContainer}>
              <View style={styles.routeLine}>
                <View style={styles.pickupDot} />

                <View style={styles.routeConnector} />

                <View style={styles.destinationDot} />
              </View>

              <View style={styles.locations}>
                <View style={styles.locationBlock}>
                  <Text style={styles.locationType}>PICKUP</Text>
                  <Text style={styles.locationName}>Rosebank Mall</Text>
                  <Text style={styles.locationAddress}>15A Cradock Avenue</Text>
                </View>

                <View style={styles.locationBlock}>
                  <Text style={styles.locationType}>DESTINATION</Text>
                  <Text style={styles.locationName}>Sandton City</Text>
                  <Text style={styles.locationAddress}>83 Rivonia Road</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Trip Summary */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Icon name="ruler" style={styles.summaryIcon} />
              <Text style={styles.summaryValue}>8.4 km</Text>
              <Text style={styles.summaryLabel}>Distance</Text>
            </View>

            <View style={styles.summaryCard}>
              <Icon name="timer" style={styles.summaryIcon} />
              <Text style={styles.summaryValue}>18 min</Text>
              <Text style={styles.summaryLabel}>Estimated time</Text>
            </View>

            <View style={styles.summaryCard}>
              <Icon name="wallet" style={styles.summaryIcon} />
              <Text style={styles.summaryValue}>R125</Text>
              <Text style={styles.summaryLabel}>Estimated fare</Text>
            </View>
          </View>

          {/* Map Preview */}
          <View style={styles.mapContainer}>
            <View style={styles.mapRoadHorizontal} />
            <View style={styles.mapRoadVertical} />
            <View style={styles.mapRoadDiagonal} />

            <View style={styles.mapCircleOne} />
            <View style={styles.mapCircleTwo} />

            <View style={styles.mapPickupPin}>
              <Text style={styles.mapPinText}>P</Text>
            </View>

            <View style={styles.mapDestinationPin}>
              <Text style={styles.mapPinText}>D</Text>
            </View>

            <View style={styles.mapRouteLine} />

            <View style={styles.mapLabel}>
              <Text style={styles.mapLabelText}>Trip route</Text>
            </View>
          </View>

          {/* Information */}
          <View style={styles.infoCard}>
            <Icon name="info" style={styles.infoIcon} />

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Before you accept</Text>
              <Text style={styles.infoText}>
                Make sure you're comfortable with the pickup location,
                destination and estimated fare.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.declineButton}
            activeOpacity={0.85}
            onPress={handleDecline}
          >
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.acceptButton}
            activeOpacity={0.85}
            onPress={handleAccept}
          >
            <Text style={styles.acceptButtonText}>Accept Ride</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingSafeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  loadingLogoCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  loadingLogoText: {
    fontSize: 34,
    fontWeight: "900",
    color: "#071A3D",
  },

  loadingTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: colors.black,
    marginBottom: 6,
  },

  loadingSubtitle: {
    fontSize: 13,
    color: colors.muted,
    textAlign: "center",
  },

  loadingIndicator: {
    marginTop: 18,
  },

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
    paddingBottom: 145,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  headerLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.blueInk,
    letterSpacing: 1,
    marginBottom: 5,
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: "800",
    color: colors.black,
  },

  requestBadge: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: colors.blueTint,
    borderWidth: 1,
    borderColor: colors.blueLine,
  },

  requestBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.blueInk,
    letterSpacing: 0.6,
  },

  countdownCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.blueTint,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.blueLine,
    padding: 16,
    marginBottom: 16,
  },

  countdownCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.white,
    borderWidth: 4,
    borderColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  countdownNumber: {
    fontSize: 21,
    fontWeight: "800",
    color: colors.black,
  },

  countdownSeconds: {
    fontSize: 8,
    fontWeight: "800",
    color: colors.muted,
    marginTop: -1,
  },

  countdownContent: {
    flex: 1,
  },

  countdownTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.black,
    marginBottom: 4,
  },

  countdownText: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.muted,
  },

  card: {
    width: "100%",
    backgroundColor: colors.blueTint,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.blueLine,
    padding: 16,
    marginBottom: 14,
  },

  sectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.muted,
    letterSpacing: 0.8,
    marginBottom: 13,
  },

  riderRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#071A3D",
  },

  riderDetails: {
    flex: 1,
  },

  riderName: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.black,
    marginBottom: 5,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  star: {
    fontSize: 13,
    color: "#FFD166",
    marginRight: 4,
  },

  rating: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.black,
    marginRight: 5,
  },

  ratingCount: {
    fontSize: 12,
    color: colors.muted,
  },

  routeContainer: {
    flexDirection: "row",
  },

  routeLine: {
    width: 20,
    alignItems: "center",
    paddingTop: 3,
  },

  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.blue,
  },

  routeConnector: {
    width: 2,
    height: 38,
    backgroundColor: colors.blueLine,
    marginVertical: 3,
  },

  destinationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#5BC0FF",
  },

  locations: {
    flex: 1,
    marginLeft: 8,
  },

  locationBlock: {
    minHeight: 55,
  },

  locationType: {
    fontSize: 9,
    fontWeight: "800",
    color: colors.muted,
    letterSpacing: 0.7,
    marginBottom: 3,
  },

  locationName: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.black,
    marginBottom: 2,
  },

  locationAddress: {
    fontSize: 11,
    color: colors.muted,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 14,
  },

  summaryCard: {
    flex: 1,
    minHeight: 106,
    backgroundColor: colors.blueTint,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.blueLine,
    padding: 11,
    justifyContent: "center",
  },

  summaryIcon: {
    fontSize: 16,
    marginBottom: 7,
  },

  summaryValue: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.black,
    marginBottom: 3,
  },

  summaryLabel: {
    fontSize: 10,
    color: colors.muted,
  },

  mapContainer: {
    width: "100%",
    height: 190,
    backgroundColor: colors.blueTint,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: colors.blueLine,
    marginBottom: 14,
  },

  mapRoadHorizontal: {
    position: "absolute",
    width: "120%",
    height: 22,
    backgroundColor: colors.blueLine,
    top: 75,
    left: -20,
    transform: [{ rotate: "7deg" }],
  },

  mapRoadVertical: {
    position: "absolute",
    width: 20,
    height: "130%",
    backgroundColor: colors.blueLine,
    left: 125,
    top: -20,
    transform: [{ rotate: "18deg" }],
  },

  mapRoadDiagonal: {
    position: "absolute",
    width: "120%",
    height: 13,
    backgroundColor: colors.blueLine,
    top: 122,
    left: -15,
    transform: [{ rotate: "-25deg" }],
  },

  mapCircleOne: {
    position: "absolute",
    width: 65,
    height: 65,
    borderRadius: 33,
    borderWidth: 10,
    borderColor: colors.blueLine,
    top: 10,
    left: 22,
  },

  mapCircleTwo: {
    position: "absolute",
    width: 75,
    height: 75,
    borderRadius: 38,
    borderWidth: 12,
    borderColor: colors.blueLine,
    bottom: -28,
    right: 18,
  },

  mapPickupPin: {
    position: "absolute",
    left: 68,
    top: 60,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  mapDestinationPin: {
    position: "absolute",
    right: 58,
    bottom: 43,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  mapPinText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#071A3D",
  },

  mapRouteLine: {
    position: "absolute",
    width: 145,
    height: 3,
    backgroundColor: colors.blue,
    left: 90,
    top: 112,
    transform: [{ rotate: "24deg" }],
  },

  mapLabel: {
    position: "absolute",
    left: 11,
    bottom: 11,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 9,
  },

  mapLabelText: {
    fontSize: 10,
    color: colors.muted,
  },

  infoCard: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: colors.blueTint,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.blueLine,
    padding: 13,
  },

  infoIcon: {
    fontSize: 16,
    marginRight: 10,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.black,
    marginBottom: 4,
  },

  infoText: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.muted,
  },

  bottomActions: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.blueTint,
    borderTopWidth: 1,
    borderTopColor: colors.blueLine,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
  },

  declineButton: {
    flex: 0.85,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.blueTint,
    borderWidth: 1,
    borderColor: colors.blueLine,
    alignItems: "center",
    justifyContent: "center",
  },

  declineButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.black,
  },

  acceptButton: {
    flex: 1.15,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  acceptButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#071A3D",
  },
});
