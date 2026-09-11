import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const rideHistory = [
  {
    id: "1",
    date: "10 September 2026",
    time: "15:15",
    status: "Completed",
    statusType: "completed",
    rideType: "Economy",
    pickup: "Your current location",
    destination: "Rosebank Mall",
    fare: "R85.00",
    duration: "12 min",
  },
  {
    id: "2",
    date: "8 September 2026",
    time: "18:40",
    status: "Completed",
    statusType: "completed",
    rideType: "Comfort",
    pickup: "Sandton City",
    destination: "Melrose Arch",
    fare: "R112.00",
    duration: "19 min",
  },
  {
    id: "3",
    date: "5 September 2026",
    time: "09:25",
    status: "Completed",
    statusType: "completed",
    rideType: "Economy",
    pickup: "Fourways Mall",
    destination: "Montecasino",
    fare: "R68.00",
    duration: "10 min",
  },
  {
    id: "4",
    date: "2 September 2026",
    time: "20:10",
    status: "Cancelled",
    statusType: "cancelled",
    rideType: "Economy",
    pickup: "Rosebank",
    destination: "Parkhurst",
    fare: "R0.00",
    duration: "—",
  },
];

export default function RideHistoryScreen({ navigation }) {
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
            <Text style={styles.headerTitle}>Ride History</Text>
            <Text style={styles.headerSubtitle}>
              View your recent trips with RideGo.
            </Text>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Text style={styles.summaryIconText}>↗</Text>
          </View>

          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryTitle}>Your trips</Text>
            <Text style={styles.summaryDescription}>
              Keep track of your completed and cancelled rides.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent rides</Text>

          <View style={styles.tripCountBadge}>
            <Text style={styles.tripCountText}>{rideHistory.length} trips</Text>
          </View>
        </View>

        {rideHistory.map((ride) => (
          <TouchableOpacity
            key={ride.id}
            style={styles.rideCard}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("TripDetails", {
                ride: ride,
              })
            }
          >
            <View style={styles.rideTopRow}>
              <View style={styles.rideIcon}>
                <Text style={styles.rideIconText}>
                  {ride.statusType === "cancelled" ? "×" : "↗"}
                </Text>
              </View>

              <View style={styles.rideMainInfo}>
                <View style={styles.rideTitleRow}>
                  <Text style={styles.rideType}>{ride.rideType}</Text>

                  <View
                    style={[
                      styles.statusBadge,
                      ride.statusType === "cancelled"
                        ? styles.cancelledBadge
                        : styles.completedBadge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        ride.statusType === "cancelled"
                          ? styles.cancelledText
                          : styles.completedText,
                      ]}
                    >
                      {ride.status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.rideDate}>
                  {ride.date} • {ride.time}
                </Text>
              </View>

              <Text style={styles.fare}>{ride.fare}</Text>
            </View>

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

            <View style={styles.rideBottomRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Duration</Text>
                <Text style={styles.detailValue}>{ride.duration}</Text>
              </View>

              <View style={styles.viewDetailsContainer}>
                <Text style={styles.viewDetailsText}>View details</Text>
                <Text style={styles.arrowText}>›</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>i</Text>
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Ride history</Text>
            <Text style={styles.infoDescription}>
              This is prototype ride data for the RideGo rider experience. Your
              real trips will appear here once the backend is connected.
            </Text>
          </View>
        </View>

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

  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#071A3D",
    borderRadius: 22,
    padding: 18,
    marginBottom: 26,
  },

  summaryIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  summaryIconText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#071A3D",
  },

  summaryTextContainer: {
    flex: 1,
  },

  summaryTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  summaryDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#C9D6E8",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#071A3D",
  },

  tripCountBadge: {
    backgroundColor: "#E3F6FF",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 15,
  },

  tripCountText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#087BB8",
  },

  rideCard: {
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

  rideTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  rideIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E3F6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  rideIconText: {
    fontSize: 23,
    fontWeight: "900",
    color: "#087BB8",
  },

  rideMainInfo: {
    flex: 1,
    paddingRight: 8,
  },

  rideTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 4,
  },

  rideType: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3D",
    marginRight: 8,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },

  completedBadge: {
    backgroundColor: "#E8F8EE",
  },

  cancelledBadge: {
    backgroundColor: "#FDECEC",
  },

  statusText: {
    fontSize: 10,
    fontWeight: "800",
  },

  completedText: {
    color: "#218A4A",
  },

  cancelledText: {
    color: "#C0392B",
  },

  rideDate: {
    fontSize: 12,
    color: "#7B8798",
  },

  fare: {
    fontSize: 15,
    fontWeight: "800",
    color: "#071A3D",
    marginTop: 2,
  },

  routeContainer: {
    flexDirection: "row",
    marginTop: 18,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#EDF1F6",
  },

  routeLine: {
    width: 20,
    alignItems: "center",
    paddingTop: 4,
  },

  pickupDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#5BC0FF",
    borderWidth: 2,
    borderColor: "#087BB8",
  },

  routeConnector: {
    width: 1.5,
    height: 25,
    backgroundColor: "#C8D2DF",
    marginVertical: 2,
  },

  destinationDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#071A3D",
  },

  routeTextContainer: {
    flex: 1,
    marginLeft: 8,
  },

  locationBlock: {
    marginBottom: 13,
  },

  locationBlockLast: {
    marginBottom: 0,
  },

  locationLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#8A96A8",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 3,
  },

  locationText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#344256",
  },

  rideBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: "#EDF1F6",
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  detailLabel: {
    fontSize: 11,
    color: "#8A96A8",
    marginRight: 6,
  },

  detailValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#46546A",
  },

  viewDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewDetailsText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#087BB8",
  },

  arrowText: {
    fontSize: 20,
    color: "#087BB8",
    marginLeft: 3,
    marginTop: -2,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    marginTop: 8,
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
