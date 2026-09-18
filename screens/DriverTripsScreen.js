import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DriverTripsScreen({ navigation }) {
  const trips = [
    {
      id: 1,
      rider: "Naledi M.",
      pickup: "Rosebank Mall",
      destination: "Sandton City",
      time: "14:25",
      date: "Today",
      fare: "R125",
      distance: "8.4 km",
      duration: "18 min",
      status: "Completed",
    },
    {
      id: 2,
      rider: "Lerato K.",
      pickup: "Melrose Arch",
      destination: "Rosebank",
      time: "12:10",
      date: "Today",
      fare: "R98",
      distance: "6.1 km",
      duration: "15 min",
      status: "Completed",
    },
    {
      id: 3,
      rider: "Thabo S.",
      pickup: "Sandton City",
      destination: "Midrand",
      time: "18:40",
      date: "Yesterday",
      fare: "R164",
      distance: "12.7 km",
      duration: "26 min",
      status: "Completed",
    },
    {
      id: 4,
      rider: "Amahle N.",
      pickup: "Fourways Mall",
      destination: "Bryanston",
      time: "16:15",
      date: "Yesterday",
      fare: "R112",
      distance: "7.8 km",
      duration: "19 min",
      status: "Completed",
    },
    {
      id: 5,
      rider: "Kea M.",
      pickup: "Rosebank",
      destination: "Parktown",
      time: "11:05",
      date: "Yesterday",
      fare: "R87",
      distance: "5.3 km",
      duration: "13 min",
      status: "Cancelled",
    },
  ];

  const handleTripPress = (trip) => {
    navigation.navigate("DriverTripDetails", {
      trip,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#071A3D" />

      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerLabel}>DRIVER ACTIVITY</Text>
              <Text style={styles.headerTitle}>My Trips</Text>
            </View>

            <View style={styles.totalBadge}>
              <Text style={styles.totalBadgeValue}>8</Text>
              <Text style={styles.totalBadgeLabel}>Trips</Text>
            </View>
          </View>

          {/* Overview */}
          <View style={styles.overviewCard}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>8</Text>
              <Text style={styles.overviewLabel}>Trips</Text>
            </View>

            <View style={styles.overviewDivider} />

            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>R850</Text>
              <Text style={styles.overviewLabel}>Earned</Text>
            </View>

            <View style={styles.overviewDivider} />

            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>4.9</Text>
              <Text style={styles.overviewLabel}>Rating</Text>
            </View>
          </View>

          {/* Section Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Trips</Text>

            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>ALL</Text>
            </View>
          </View>

          {/* Trip List */}
          {trips.map((trip, index) => (
            <TouchableOpacity
              key={trip.id}
              style={styles.tripCard}
              activeOpacity={0.85}
              onPress={() => handleTripPress(trip)}
            >
              <View style={styles.tripTopRow}>
                <View style={styles.tripDateGroup}>
                  <Text style={styles.tripDate}>{trip.date}</Text>
                  <Text style={styles.tripTime}>{trip.time}</Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    trip.status === "Cancelled" && styles.cancelledBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      trip.status === "Cancelled" && styles.cancelledStatusText,
                    ]}
                  >
                    {trip.status}
                  </Text>
                </View>
              </View>

              <View style={styles.tripMainRow}>
                <View style={styles.tripTimeline}>
                  <View style={styles.pickupDot} />
                  <View style={styles.tripLine} />
                  <View style={styles.destinationDot} />
                </View>

                <View style={styles.tripRoute}>
                  <View style={styles.locationBlock}>
                    <Text style={styles.locationLabel}>PICKUP</Text>
                    <Text style={styles.locationText}>{trip.pickup}</Text>
                  </View>

                  <View style={styles.locationBlock}>
                    <Text style={styles.locationLabel}>DESTINATION</Text>
                    <Text style={styles.locationText}>{trip.destination}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.tripDivider} />

              <View style={styles.tripBottomRow}>
                <View style={styles.riderGroup}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {trip.rider.charAt(0)}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.riderName}>{trip.rider}</Text>
                    <Text style={styles.tripMeta}>
                      {trip.distance} • {trip.duration}
                    </Text>
                  </View>
                </View>

                <View style={styles.fareGroup}>
                  <Text style={styles.fare}>{trip.fare}</Text>
                  <Text style={styles.fareLabel}>Fare</Text>
                </View>
              </View>

              <View style={styles.viewDetailsRow}>
                <Text style={styles.viewDetailsText}>View trip details</Text>
                <Text style={styles.viewDetailsArrow}>→</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Bottom Information */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>✓</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Your trip history</Text>
              <Text style={styles.infoText}>
                Completed and cancelled trips are recorded here for your
                reference.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNavigation}>
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("DriverHome")}
          >
            <Text style={styles.navIcon}>⌂</Text>
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>

          <View style={[styles.navItem, styles.activeNavItem]}>
            <Text style={[styles.navIcon, styles.activeNavIcon]}>▣</Text>
            <Text style={[styles.navLabel, styles.activeNavLabel]}>Trips</Text>
          </View>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("DriverEarnings")}
          >
            <Text style={styles.navIcon}>R</Text>
            <Text style={styles.navLabel}>Earnings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("DriverProfile")}
          >
            <Text style={styles.navIcon}>●</Text>
            <Text style={styles.navLabel}>Profile</Text>
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
    paddingBottom: 105,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  headerLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#5BC0FF",
    letterSpacing: 1,
    marginBottom: 5,
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  totalBadge: {
    minWidth: 62,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
  },

  totalBadgeValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  totalBadgeLabel: {
    fontSize: 9,
    color: "#8FA5C1",
    marginTop: 1,
  },

  overviewCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#102A52",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 16,
    marginBottom: 22,
  },

  overviewItem: {
    flex: 1,
    alignItems: "center",
  },

  overviewValue: {
    fontSize: 19,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  overviewLabel: {
    fontSize: 10,
    color: "#8FA5C1",
  },

  overviewDivider: {
    width: 1,
    height: 34,
    backgroundColor: "#1D4775",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  filterBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
  },

  filterBadgeText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#5BC0FF",
    letterSpacing: 0.5,
  },

  tripCard: {
    width: "100%",
    backgroundColor: "#102A52",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 15,
    marginBottom: 12,
  },

  tripTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  tripDateGroup: {
    flexDirection: "row",
    alignItems: "center",
  },

  tripDate: {
    fontSize: 10,
    fontWeight: "800",
    color: "#5BC0FF",
    marginRight: 7,
  },

  tripTime: {
    fontSize: 10,
    color: "#8FA5C1",
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#071A3D",
    borderWidth: 1,
    borderColor: "#1D4775",
  },

  cancelledBadge: {
    borderColor: "#394B63",
  },

  statusText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#5BC0FF",
  },

  cancelledStatusText: {
    color: "#8FA5C1",
  },

  tripMainRow: {
    flexDirection: "row",
  },

  tripTimeline: {
    width: 20,
    alignItems: "center",
    paddingTop: 5,
  },

  pickupDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#5BC0FF",
  },

  tripLine: {
    width: 2,
    height: 44,
    backgroundColor: "#1D4775",
    marginVertical: 4,
  },

  destinationDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#5BC0FF",
  },

  tripRoute: {
    flex: 1,
    marginLeft: 10,
  },

  locationBlock: {
    marginBottom: 13,
  },

  locationLabel: {
    fontSize: 8,
    fontWeight: "800",
    color: "#8FA5C1",
    letterSpacing: 0.6,
    marginBottom: 3,
  },

  locationText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  tripDivider: {
    height: 1,
    backgroundColor: "#1D4775",
    marginVertical: 13,
  },

  tripBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  riderGroup: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  avatarText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#071A3D",
  },

  riderName: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 3,
  },

  tripMeta: {
    fontSize: 10,
    color: "#8FA5C1",
  },

  fareGroup: {
    alignItems: "flex-end",
  },

  fare: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 2,
  },

  fareLabel: {
    fontSize: 9,
    color: "#8FA5C1",
  },

  viewDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 13,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: "#1D4775",
  },

  viewDetailsText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#5BC0FF",
  },

  viewDetailsArrow: {
    fontSize: 16,
    fontWeight: "800",
    color: "#5BC0FF",
    marginLeft: 6,
  },

  infoCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A2147",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 13,
    marginTop: 2,
  },

  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#071A3D",
    borderWidth: 1,
    borderColor: "#1D4775",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  infoIconText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#5BC0FF",
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  infoText: {
    fontSize: 11,
    lineHeight: 16,
    color: "#8FA5C1",
  },

  bottomNavigation: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 78,
    backgroundColor: "#0A2147",
    borderTopWidth: 1,
    borderTopColor: "#1D4775",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 8,
  },

  navItem: {
    flex: 1,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
  },

  activeNavItem: {
    backgroundColor: "#102A52",
  },

  navIcon: {
    fontSize: 18,
    color: "#6F86A3",
    marginBottom: 4,
  },

  activeNavIcon: {
    color: "#5BC0FF",
  },

  navLabel: {
    fontSize: 9,
    fontWeight: "700",
    color: "#6F86A3",
  },

  activeNavLabel: {
    color: "#5BC0FF",
  },
});
