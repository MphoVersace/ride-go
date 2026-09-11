import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";

export default function RideInProgressScreen({ navigation, route }) {
  const selectedRide = route?.params?.selectedRide || {
    id: "economy",
    name: "Economy",
    description: "Affordable everyday rides",
    eta: "3–5 min",
    price: "R45",
    icon: "🚗",
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#071A3D" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.statusLabel}>RIDE IN PROGRESS</Text>
            <Text style={styles.title}>You're on your way</Text>
          </View>

          <View style={styles.statusDot}>
            <View style={styles.statusDotInner} />
          </View>
        </View>

        <Text style={styles.subtitle}>
          Enjoy your ride. We'll let you know when you're getting close.
        </Text>

        {/* Map */}
        <View style={styles.mapContainer}>
          <View style={styles.mapRoadOne} />
          <View style={styles.mapRoadTwo} />
          <View style={styles.mapRoadThree} />
          <View style={styles.mapRoadFour} />

          <View style={styles.routeLineOne} />
          <View style={styles.routeLineTwo} />

          <View style={styles.pickupMarker}>
            <View style={styles.pickupMarkerInner} />
          </View>

          <View style={styles.carMarker}>
            <Text style={styles.carMarkerText}>🚗</Text>
          </View>

          <View style={styles.destinationMarker}>
            <View style={styles.destinationMarkerInner} />
          </View>

          <View style={styles.destinationBubble}>
            <Text style={styles.destinationBubbleText}>Rosebank Mall</Text>
          </View>

          <View style={styles.mapBottomLabel}>
            <Text style={styles.mapBottomText}>Heading to destination</Text>
          </View>
        </View>

        {/* ETA Card */}
        <View style={styles.etaCard}>
          <View>
            <Text style={styles.etaLabel}>ARRIVING AT DESTINATION</Text>
            <Text style={styles.etaTime}>12 min</Text>
          </View>

          <View style={styles.etaDivider} />

          <View>
            <Text style={styles.etaLabel}>ESTIMATED FARE</Text>
            <Text style={styles.etaFare}>{selectedRide.price}</Text>
          </View>
        </View>

        {/* Driver Card */}
        <View style={styles.driverCard}>
          <View style={styles.driverRow}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverAvatarText}>TM</Text>
            </View>

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Thabo M.</Text>

              <Text style={styles.driverRating}>★ 4.9 • 1,240 trips</Text>
            </View>

            <View style={styles.rideBadge}>
              <Text style={styles.rideBadgeText}>{selectedRide.name}</Text>
            </View>
          </View>

          <View style={styles.vehicleRow}>
            <View>
              <Text style={styles.vehicleLabel}>VEHICLE</Text>
              <Text style={styles.vehicleText}>Toyota Corolla</Text>
            </View>

            <View style={styles.vehicleRight}>
              <Text style={styles.vehicleLabel}>PLATE</Text>
              <Text style={styles.vehicleText}>KDF 482 GP</Text>
            </View>
          </View>
        </View>

        {/* Trip Details */}
        <View style={styles.tripCard}>
          <Text style={styles.tripTitle}>Trip details</Text>

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
        </View>

        {/* Safety */}
        <View style={styles.safetyCard}>
          <View style={styles.safetyIcon}>
            <Text style={styles.safetyIconText}>🛡️</Text>
          </View>

          <View style={styles.safetyContent}>
            <Text style={styles.safetyTitle}>Ride safely</Text>

            <Text style={styles.safetyText}>
              Share your trip with someone you trust or contact support if you
              need help.
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Text style={styles.actionIcon}>☎</Text>
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.endRideButton}
          onPress={() =>
            navigation.navigate("TripCompleted", {
              selectedRide: selectedRide,
            })
          }
          activeOpacity={0.8}
        >
          <Text style={styles.endRideButtonText}>End ride</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071A3D",
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 36,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusLabel: {
    color: "#5BC0FF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
    marginBottom: 6,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },

  statusDot: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#102A55",
    justifyContent: "center",
    alignItems: "center",
  },

  statusDotInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#5BC0FF",
  },

  subtitle: {
    color: "#AEBBD4",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 24,
  },

  mapContainer: {
    height: 270,
    borderRadius: 22,
    backgroundColor: "#DCE7E2",
    overflow: "hidden",
    position: "relative",
    marginBottom: 16,
  },

  mapRoadOne: {
    position: "absolute",
    width: 420,
    height: 38,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "25deg" }],
    top: 72,
    left: -100,
  },

  mapRoadTwo: {
    position: "absolute",
    width: 390,
    height: 32,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "-28deg" }],
    top: 170,
    left: -40,
  },

  mapRoadThree: {
    position: "absolute",
    width: 300,
    height: 28,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "72deg" }],
    top: 70,
    left: 220,
  },

  mapRoadFour: {
    position: "absolute",
    width: 260,
    height: 24,
    backgroundColor: "#FFFFFF",
    transform: [{ rotate: "-65deg" }],
    top: 145,
    left: 40,
  },

  routeLineOne: {
    position: "absolute",
    width: 190,
    height: 5,
    backgroundColor: "#5BC0FF",
    transform: [{ rotate: "23deg" }],
    top: 110,
    left: 58,
    borderRadius: 5,
  },

  routeLineTwo: {
    position: "absolute",
    width: 110,
    height: 5,
    backgroundColor: "#5BC0FF",
    transform: [{ rotate: "-38deg" }],
    top: 158,
    left: 214,
    borderRadius: 5,
  },

  pickupMarker: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#071A3D",
    justifyContent: "center",
    alignItems: "center",
    top: 94,
    left: 52,
  },

  pickupMarkerInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#5BC0FF",
  },

  carMarker: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#071A3D",
    justifyContent: "center",
    alignItems: "center",
    top: 127,
    left: 174,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },

  carMarkerText: {
    fontSize: 20,
  },

  destinationMarker: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    top: 175,
    right: 44,
    borderWidth: 3,
    borderColor: "#071A3D",
  },

  destinationMarkerInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#071A3D",
  },

  destinationBubble: {
    position: "absolute",
    top: 126,
    right: 22,
    backgroundColor: "#071A3D",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  destinationBubbleText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  mapBottomLabel: {
    position: "absolute",
    left: 16,
    bottom: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  mapBottomText: {
    color: "#071A3D",
    fontSize: 10,
    fontWeight: "700",
  },

  etaCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  etaLabel: {
    color: "#71819C",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 5,
  },

  etaTime: {
    color: "#071A3D",
    fontSize: 24,
    fontWeight: "800",
  },

  etaFare: {
    color: "#071A3D",
    fontSize: 24,
    fontWeight: "800",
  },

  etaDivider: {
    width: 1,
    height: 42,
    backgroundColor: "#D7DFEA",
  },

  driverCard: {
    backgroundColor: "#102A55",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },

  driverRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#5BC0FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  driverAvatarText: {
    color: "#071A3D",
    fontSize: 15,
    fontWeight: "800",
  },

  driverInfo: {
    flex: 1,
  },

  driverName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },

  driverRating: {
    color: "#AEBBD4",
    fontSize: 12,
  },

  rideBadge: {
    backgroundColor: "#173765",
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },

  rideBadgeText: {
    color: "#5BC0FF",
    fontSize: 10,
    fontWeight: "800",
  },

  vehicleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#25436B",
  },

  vehicleRight: {
    alignItems: "flex-end",
  },

  vehicleLabel: {
    color: "#7F91B2",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 4,
  },

  vehicleText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  tripCard: {
    backgroundColor: "#102A55",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
  },

  tripTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 17,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    marginRight: 13,
  },

  pickupDot: {
    backgroundColor: "#5BC0FF",
  },

  destinationDot: {
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#5BC0FF",
  },

  locationTextContainer: {
    flex: 1,
  },

  locationLabel: {
    color: "#7F91B2",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 3,
  },

  locationText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  routeConnector: {
    width: 1,
    height: 24,
    backgroundColor: "#5BC0FF",
    marginLeft: 5,
    marginVertical: 3,
  },

  safetyCard: {
    backgroundColor: "#102A55",
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    marginBottom: 16,
  },

  safetyIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#173765",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  safetyIconText: {
    fontSize: 19,
  },

  safetyContent: {
    flex: 1,
  },

  safetyTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 5,
  },

  safetyText: {
    color: "#AEBBD4",
    fontSize: 12,
    lineHeight: 18,
  },

  actionsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },

  actionButton: {
    flex: 1,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#102A55",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  actionIcon: {
    fontSize: 16,
    marginRight: 7,
  },

  actionText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  endRideButton: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#5BC0FF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },

  endRideButtonText: {
    color: "#071A3D",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
});
