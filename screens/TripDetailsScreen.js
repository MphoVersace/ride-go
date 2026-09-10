import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TripDetailsScreen({ navigation, route }) {
  const ride = route?.params?.ride || {
    date: "10 September 2026",
    time: "15:15",
    status: "Completed",
    statusType: "completed",
    rideType: "Economy",
    pickup: "Your current location",
    destination: "Rosebank Mall",
    fare: "R85.00",
    duration: "12 min",
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Trip Details</Text>
            <Text style={styles.headerSubtitle}>
              Full information about your RideGo trip.
            </Text>
          </View>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusIcon}>
            <Text style={styles.statusIconText}>✓</Text>
          </View>

          <View style={styles.statusTextContainer}>
            <Text style={styles.statusTitle}>{ride.status}</Text>
            <Text style={styles.statusDescription}>
              Your RideGo trip was completed successfully.
            </Text>
          </View>
        </View>

        <View style={styles.tripCard}>
          <View style={styles.tripHeader}>
            <View style={styles.tripIcon}>
              <Text style={styles.tripIconText}>↗</Text>
            </View>

            <View style={styles.tripHeaderText}>
              <Text style={styles.rideType}>{ride.rideType}</Text>
              <Text style={styles.tripDate}>
                {ride.date} • {ride.time}
              </Text>
            </View>

            <View style={styles.completedBadge}>
              <Text style={styles.completedBadgeText}>{ride.status}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Route</Text>

          <View style={styles.routeContainer}>
            <View style={styles.routeLine}>
              <View style={styles.pickupDot} />
              <View style={styles.routeConnector} />
              <View style={styles.destinationDot} />
            </View>

            <View style={styles.routeTextContainer}>
              <View style={styles.locationBlock}>
                <Text style={styles.locationLabel}>Pickup</Text>
                <Text style={styles.locationText}>{ride.pickup}</Text>
              </View>

              <View style={styles.locationBlock}>
                <Text style={styles.locationLabel}>Destination</Text>
                <Text style={styles.locationText}>{ride.destination}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.tripCard}>
          <Text style={styles.sectionTitle}>Driver</Text>

          <View style={styles.driverRow}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverAvatarText}>T</Text>
            </View>

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Thabo M.</Text>
              <Text style={styles.driverMeta}>★ 4.9 • 1,240 trips</Text>
            </View>
          </View>
        </View>

        <View style={styles.tripCard}>
          <Text style={styles.sectionTitle}>Vehicle</Text>

          <View style={styles.vehicleRow}>
            <View style={styles.vehicleIcon}>
              <Text style={styles.vehicleIconText}>🚗</Text>
            </View>

            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>Toyota Corolla</Text>
              <Text style={styles.vehicleMeta}>Silver</Text>
              <Text style={styles.plateText}>KDF 482 GP</Text>
            </View>
          </View>
        </View>

        <View style={styles.tripCard}>
          <Text style={styles.sectionTitle}>Trip summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ride type</Text>
            <Text style={styles.summaryValue}>{ride.rideType}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryValue}>{ride.duration}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Payment</Text>
            <Text style={styles.summaryValue}>Prototype</Text>
          </View>

          <View style={styles.totalDivider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total fare</Text>
            <Text style={styles.totalValue}>{ride.fare}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>i</Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Trip information</Text>
            <Text style={styles.infoDescription}>
              This trip is part of the RideGo prototype experience. Production
              trip data, payment processing, and live driver information will be
              connected later.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.receiptButton}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("TripReceipt", {
              selectedRide: {
                name: ride.rideType,
                description: "RideGo trip",
                price: ride.fare,
                icon: "🚗",
              },
            })
          }
        >
          <Text style={styles.receiptButtonText}>View trip receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("RiderHome")}
        >
          <Text style={styles.homeButtonText}>Back to home</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          RideGo • Your journey, your history
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F8FC",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },

  backButtonText: {
    fontSize: 32,
    lineHeight: 34,
    color: "#071A3D",
    marginTop: -3,
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 29,
    fontWeight: "800",
    color: "#071A3D",
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#718096",
    marginTop: 5,
    lineHeight: 20,
  },

  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#071A3D",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  statusIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  statusIconText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#071A3D",
  },

  statusTextContainer: {
    flex: 1,
  },

  statusTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  statusDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#C9D6E8",
  },

  tripCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },

  tripHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  tripIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E3F6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  tripIconText: {
    fontSize: 23,
    fontWeight: "900",
    color: "#087BB8",
  },

  tripHeaderText: {
    flex: 1,
  },

  rideType: {
    fontSize: 17,
    fontWeight: "800",
    color: "#071A3D",
  },

  tripDate: {
    fontSize: 12,
    color: "#7B8798",
    marginTop: 4,
  },

  completedBadge: {
    backgroundColor: "#E8F8EE",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 11,
  },

  completedBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#218A4A",
  },

  divider: {
    height: 1,
    backgroundColor: "#EDF1F6",
    marginVertical: 18,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3D",
    marginBottom: 15,
  },

  routeContainer: {
    flexDirection: "row",
  },

  routeLine: {
    width: 20,
    alignItems: "center",
    paddingTop: 4,
  },

  pickupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#5BC0FF",
    borderWidth: 2,
    borderColor: "#087BB8",
  },

  routeConnector: {
    width: 1.5,
    height: 32,
    backgroundColor: "#C8D2DF",
    marginVertical: 2,
  },

  destinationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#071A3D",
  },

  routeTextContainer: {
    flex: 1,
    marginLeft: 9,
  },

  locationBlock: {
    marginBottom: 18,
  },

  locationLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#8A96A8",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 4,
  },

  locationText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#344256",
    lineHeight: 20,
  },

  driverRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  driverAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  driverAvatarText: {
    fontSize: 21,
    fontWeight: "800",
    color: "#5BC0FF",
  },

  driverInfo: {
    flex: 1,
  },

  driverName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3D",
    marginBottom: 4,
  },

  driverMeta: {
    fontSize: 13,
    color: "#718096",
  },

  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  vehicleIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#E3F6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  vehicleIconText: {
    fontSize: 24,
  },

  vehicleInfo: {
    flex: 1,
  },

  vehicleName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3D",
    marginBottom: 3,
  },

  vehicleMeta: {
    fontSize: 12,
    color: "#718096",
    marginBottom: 4,
  },

  plateText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#087BB8",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },

  summaryLabel: {
    fontSize: 13,
    color: "#718096",
  },

  summaryValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#344256",
  },

  totalDivider: {
    height: 1,
    backgroundColor: "#EDF1F6",
    marginVertical: 5,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: "#071A3D",
  },

  totalValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#087BB8",
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    marginTop: 2,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E4EBF3",
  },

  infoIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E3F6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  infoIconText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#087BB8",
  },

  infoTextContainer: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#071A3D",
    marginBottom: 4,
  },

  infoDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#718096",
  },

  receiptButton: {
    height: 54,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#5BC0FF",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  receiptButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#087BB8",
  },

  homeButton: {
    height: 54,
    borderRadius: 18,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },

  homeButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#071A3D",
  },

  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#9AA6B6",
    marginTop: 22,
  },
});
