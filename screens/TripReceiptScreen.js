import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";

export default function TripReceiptScreen({ navigation, route }) {
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>‹</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.receiptIcon}>
            <Text style={styles.receiptIconText}>✓</Text>
          </View>

          <Text style={styles.headerLabel}>RIDEGO RECEIPT</Text>

          <Text style={styles.title}>Trip completed</Text>

          <Text style={styles.subtitle}>Thanks for riding with RideGo.</Text>
        </View>

        <View style={styles.receiptCard}>
          <View style={styles.receiptTop}>
            <View>
              <Text style={styles.sectionLabel}>RIDE TYPE</Text>

              <View style={styles.rideTypeRow}>
                <Text style={styles.rideIcon}>{selectedRide.icon}</Text>

                <View>
                  <Text style={styles.rideName}>{selectedRide.name}</Text>
                  <Text style={styles.rideDescription}>
                    {selectedRide.description}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.completedBadge}>
              <Text style={styles.completedBadgeText}>COMPLETED</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>DATE</Text>
            <Text style={styles.detailValue}>10 September 2026</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>TIME</Text>
            <Text style={styles.detailValue}>15:15</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>DURATION</Text>
            <Text style={styles.detailValue}>12 minutes</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>TRIP DETAILS</Text>

          <View style={styles.locationRow}>
            <View style={styles.locationIndicator}>
              <View style={styles.pickupDot} />
              <View style={styles.locationLine} />
              <View style={styles.destinationDot} />
            </View>

            <View style={styles.locationContent}>
              <View style={styles.locationBlock}>
                <Text style={styles.locationLabel}>PICKUP</Text>
                <Text style={styles.locationText}>Your current location</Text>
              </View>

              <View style={styles.locationBlock}>
                <Text style={styles.locationLabel}>DESTINATION</Text>
                <Text style={styles.locationText}>Rosebank Mall</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>DRIVER</Text>

          <View style={styles.driverRow}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverAvatarText}>TM</Text>
            </View>

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Thabo M.</Text>
              <Text style={styles.driverRating}>★ 4.9 • 1,240 trips</Text>
            </View>
          </View>

          <View style={styles.vehicleCard}>
            <View>
              <Text style={styles.vehicleLabel}>VEHICLE</Text>
              <Text style={styles.vehicleName}>Toyota Corolla</Text>
            </View>

            <View style={styles.vehicleRight}>
              <Text style={styles.vehicleColor}>Silver</Text>
              <Text style={styles.plate}>KDF 482 GP</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.fareHeader}>
            <Text style={styles.fareTitle}>TOTAL FARE</Text>
            <Text style={styles.fareAmount}>{selectedRide.price}</Text>
          </View>

          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Ride fare</Text>
            <Text style={styles.fareValue}>{selectedRide.price}</Text>
          </View>

          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Payment status</Text>
            <Text style={styles.paidValue}>Prototype</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>🧾</Text>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Your trip receipt</Text>

            <Text style={styles.infoText}>
              This receipt summarises your completed RideGo trip. Final payment
              processing will be connected when the payment system is added.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("RiderHome")}
          activeOpacity={0.8}
        >
          <Text style={styles.homeButtonText}>Back to home</Text>
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
    paddingTop: 52,
    paddingBottom: 40,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 28,
  },

  backButtonText: {
    color: "#5BC0FF",
    fontSize: 32,
    lineHeight: 28,
    marginRight: 5,
  },

  backText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },

  receiptIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#5BC0FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  receiptIconText: {
    color: "#071A3D",
    fontSize: 32,
    fontWeight: "800",
  },

  headerLabel: {
    color: "#5BC0FF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.6,
    marginBottom: 6,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    color: "#AEBBD4",
    fontSize: 14,
    marginTop: 7,
  },

  receiptCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 21,
    marginBottom: 14,
  },

  receiptTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  sectionLabel: {
    color: "#7A889E",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.1,
    marginBottom: 10,
  },

  rideTypeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  rideIcon: {
    fontSize: 25,
    marginRight: 10,
  },

  rideName: {
    color: "#071A3D",
    fontSize: 17,
    fontWeight: "800",
  },

  rideDescription: {
    color: "#71819C",
    fontSize: 11,
    marginTop: 2,
  },

  completedBadge: {
    backgroundColor: "#E7F7FF",
    borderRadius: 10,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },

  completedBadgeText: {
    color: "#087CB5",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.7,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 19,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 11,
  },

  detailLabel: {
    color: "#8794A8",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },

  detailValue: {
    color: "#071A3D",
    fontSize: 12,
    fontWeight: "600",
  },

  locationRow: {
    flexDirection: "row",
    marginTop: 3,
  },

  locationIndicator: {
    width: 20,
    alignItems: "center",
    marginRight: 9,
  },

  pickupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#5BC0FF",
  },

  locationLine: {
    width: 1,
    height: 30,
    backgroundColor: "#AFC7D9",
  },

  destinationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#5BC0FF",
  },

  locationContent: {
    flex: 1,
  },

  locationBlock: {
    marginBottom: 20,
  },

  locationLabel: {
    color: "#8794A8",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 3,
  },

  locationText: {
    color: "#071A3D",
    fontSize: 13,
    fontWeight: "700",
  },

  driverRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#DFF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  driverAvatarText: {
    color: "#087CB5",
    fontSize: 15,
    fontWeight: "800",
  },

  driverInfo: {
    flex: 1,
  },

  driverName: {
    color: "#071A3D",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 3,
  },

  driverRating: {
    color: "#71819C",
    fontSize: 11,
  },

  vehicleCard: {
    backgroundColor: "#F4F8FC",
    borderRadius: 15,
    padding: 14,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  vehicleLabel: {
    color: "#8794A8",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 4,
  },

  vehicleName: {
    color: "#071A3D",
    fontSize: 13,
    fontWeight: "700",
  },

  vehicleRight: {
    alignItems: "flex-end",
  },

  vehicleColor: {
    color: "#71819C",
    fontSize: 10,
    marginBottom: 3,
  },

  plate: {
    color: "#071A3D",
    fontSize: 12,
    fontWeight: "800",
  },

  fareHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  fareTitle: {
    color: "#071A3D",
    fontSize: 13,
    fontWeight: "800",
  },

  fareAmount: {
    color: "#071A3D",
    fontSize: 28,
    fontWeight: "800",
  },

  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  fareLabel: {
    color: "#71819C",
    fontSize: 12,
  },

  fareValue: {
    color: "#071A3D",
    fontSize: 12,
    fontWeight: "600",
  },

  paidValue: {
    color: "#087CB5",
    fontSize: 12,
    fontWeight: "700",
  },

  infoCard: {
    backgroundColor: "#102A55",
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    marginBottom: 18,
  },

  infoIcon: {
    fontSize: 22,
    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 5,
  },

  infoText: {
    color: "#AEBBD4",
    fontSize: 11,
    lineHeight: 17,
  },

  homeButton: {
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

  homeButtonText: {
    color: "#071A3D",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
});
