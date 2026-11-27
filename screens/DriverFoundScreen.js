import { colors } from "../ui/theme";
import Icon from "../ui/Icon";
import { openScreen } from "../navigation/routes";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";

export default function DriverFoundScreen({ navigation, route }) {
  const selectedRide = route?.params?.selectedRide || {
    id: "economy",
    name: "Economy",
    description: "Affordable everyday rides",
    eta: "3–5 min",
    price: "R45",
    icon: "car",
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Your driver is on the way</Text>

        <Text style={styles.subtitle}>
          Your ride has been matched with a nearby driver.
        </Text>

        {/* Map */}
        <View style={styles.mapContainer}>
          <View style={styles.mapRoadOne} />
          <View style={styles.mapRoadTwo} />
          <View style={styles.mapRoadThree} />

          <View style={styles.routeLine} />

          <View style={styles.pickupPin}>
            <View style={styles.pickupPinInner} />
          </View>

          <View style={styles.driverMarker}>
            <Icon name="car" style={styles.driverMarkerText} />
          </View>

          <View style={styles.destinationPin}>
            <View style={styles.destinationPinInner} />
          </View>

          <View style={styles.etaBubble}>
            <Text style={styles.etaText}>3 min away</Text>
          </View>

          <Text style={styles.mapHint}>
            Driver approaching your pickup point
          </Text>
        </View>

        {/* Arrival Card */}
        <View style={styles.arrivalCard}>
          <Text style={styles.arrivalLabel}>ARRIVING IN</Text>
          <Text style={styles.arrivalTime}>3 minutes</Text>
        </View>

        {/* Driver Card */}
        <View style={styles.driverCard}>
          <View style={styles.driverTopRow}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverAvatarText}>TM</Text>
            </View>

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Thabo M.</Text>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Icon name="star" size={13} style={styles.driverRating} />
                <Text style={styles.driverRating}>4.9 • 1,240 trips</Text>
              </View>
            </View>

            <View style={styles.rideBadge}>
              <Text style={styles.rideBadgeText}>{selectedRide.name}</Text>
            </View>
          </View>

          <View style={styles.vehicleDivider} />

          <View style={styles.vehicleInfoRow}>
            <View>
              <Text style={styles.vehicleLabel}>VEHICLE</Text>
              <Text style={styles.vehicleText}>Toyota Corolla</Text>
            </View>

            <View style={styles.vehicleDetails}>
              <Text style={styles.vehicleLabel}>COLOUR</Text>
              <Text style={styles.vehicleText}>Silver</Text>
            </View>
          </View>

          <View style={styles.plateContainer}>
            <Text style={styles.plateText}>KDF 482 GP</Text>
          </View>
        </View>

        {/* Trip Card */}
        <View style={styles.tripCard}>
          <View style={styles.locationRow}>
            <View style={[styles.locationDot, styles.pickupDot]} />

            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>PICKUP</Text>
              <Text style={styles.locationText}>Your current location</Text>
            </View>
          </View>

          <View style={styles.routeConnector} />

          <View style={styles.locationRow}>
            <View style={[styles.locationDot, styles.destinationDot]} />

            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>DESTINATION</Text>
              <Text style={styles.locationText}>Rosebank Mall</Text>
            </View>
          </View>

          <View style={styles.tripSummary}>
            <View>
              <Text style={styles.tripSummaryLabel}>RIDE TYPE</Text>
              <Text style={styles.tripSummaryValue}>{selectedRide.name}</Text>
            </View>

            <View style={styles.tripSummaryRight}>
              <Text style={styles.tripSummaryLabel}>ESTIMATED FARE</Text>
              <Text style={styles.tripSummaryValue}>{selectedRide.price}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Icon name="phone" style={styles.actionIcon} />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Icon name="message" style={styles.actionIcon} />
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.startRideButton}
          onPress={() =>
            navigation.navigate("RideInProgress", {
              selectedRide: selectedRide,
            })
          }
          activeOpacity={0.8}
        >
          <Text style={styles.startRideButtonText}>Start ride</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => openScreen(navigation, "RiderHome")}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelButtonText}>Cancel ride</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 36,
  },

  title: {
    color: colors.black,
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },

  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },

  mapContainer: {
    height: 250,
    borderRadius: 22,
    backgroundColor: "#DCE7E2",
    overflow: "hidden",
    position: "relative",
    marginBottom: 16,
  },

  mapRoadOne: {
    position: "absolute",
    width: 380,
    height: 38,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "25deg" }],
    top: 70,
    left: -80,
  },

  mapRoadTwo: {
    position: "absolute",
    width: 380,
    height: 34,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "-38deg" }],
    top: 125,
    left: -30,
  },

  mapRoadThree: {
    position: "absolute",
    width: 320,
    height: 30,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "65deg" }],
    top: 90,
    left: 120,
  },

  routeLine: {
    position: "absolute",
    width: 155,
    height: 4,
    backgroundColor: colors.blue,
    transform: [{ rotate: "-24deg" }],
    top: 125,
    left: 72,
    borderRadius: 2,
  },

  pickupPin: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    left: 52,
    bottom: 48,
  },

  pickupPinInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.blue,
  },

  driverMarker: {
    position: "absolute",
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    left: 126,
    top: 100,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },

  driverMarkerText: {
    fontSize: 22,
  },

  destinationPin: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    right: 48,
    top: 52,
  },

  destinationPinInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },

  etaBubble: {
    position: "absolute",
    top: 22,
    left: 22,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
  },

  etaText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: "700",
  },

  mapHint: {
    position: "absolute",
    bottom: 14,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.92)",
    color: "#071A3D",
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 12,
  },

  arrivalCard: {
    backgroundColor: colors.blue,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 16,
  },

  arrivalLabel: {
    color: "#071A3D",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 3,
  },

  arrivalTime: {
    color: "#071A3D",
    fontSize: 24,
    fontWeight: "800",
  },

  driverCard: {
    backgroundColor: colors.blueTint,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },

  driverTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  driverAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  driverAvatarText: {
    color: "#071A3D",
    fontSize: 16,
    fontWeight: "800",
  },

  driverInfo: {
    flex: 1,
  },

  driverName: {
    color: colors.black,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 4,
  },

  driverRating: {
    color: colors.muted,
    fontSize: 12,
  },

  rideBadge: {
    backgroundColor: colors.blueLine,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  rideBadgeText: {
    color: colors.blueInk,
    fontSize: 11,
    fontWeight: "700",
  },

  vehicleDivider: {
    height: 1,
    backgroundColor: colors.blueLine,
    marginVertical: 18,
  },

  vehicleInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  vehicleDetails: {
    alignItems: "flex-end",
  },

  vehicleLabel: {
    color: "#7185A8",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 4,
  },

  vehicleText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "600",
  },

  plateContainer: {
    alignSelf: "flex-start",
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
  },

  plateText: {
    color: "#071A3D",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 1,
  },

  tripCard: {
    backgroundColor: colors.blueTint,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 14,
  },

  pickupDot: {
    backgroundColor: colors.blue,
  },

  destinationDot: {
    backgroundColor: "#FFFFFF",
  },

  locationTextContainer: {
    flex: 1,
  },

  locationLabel: {
    color: "#7185A8",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 4,
  },

  locationText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: "600",
  },

  routeConnector: {
    width: 1,
    height: 24,
    backgroundColor: colors.blueLine,
    marginLeft: 5.5,
    marginVertical: 4,
  },

  tripSummary: {
    marginTop: 20,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: colors.blueLine,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  tripSummaryRight: {
    alignItems: "flex-end",
  },

  tripSummaryLabel: {
    color: "#7185A8",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 4,
  },

  tripSummaryValue: {
    color: colors.black,
    fontSize: 15,
    fontWeight: "700",
  },

  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  actionButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.blueTint,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },

  actionIcon: {
    fontSize: 17,
    color: colors.blueInk,
  },

  actionText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "600",
  },

  cancelButton: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.blueLine,
    justifyContent: "center",
    alignItems: "center",
  },
  startRideButton: {
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },

  startRideButtonText: {
    color: "#071A3D",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },

  cancelButtonText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: "600",
  },
});
