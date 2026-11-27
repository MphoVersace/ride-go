import { colors } from "../ui/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import {
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
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  headerLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.blueInk,
    letterSpacing: 1,
    marginBottom: 5,
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: colors.black,
  },

  totalBadge: {
    minWidth: 62,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: colors.blueTint,
    borderWidth: 1,
    borderColor: colors.blueLine,
  },

  totalBadgeValue: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.black,
  },

  totalBadgeLabel: {
    fontSize: 9,
    color: colors.muted,
    marginTop: 1,
  },

  overviewCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.blueTint,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.blueLine,
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
    color: colors.black,
    marginBottom: 4,
  },

  overviewLabel: {
    fontSize: 10,
    color: colors.muted,
  },

  overviewDivider: {
    width: 1,
    height: 34,
    backgroundColor: colors.blueLine,
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
    color: colors.black,
  },

  filterBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: colors.blueTint,
    borderWidth: 1,
    borderColor: colors.blueLine,
  },

  filterBadgeText: {
    fontSize: 8,
    fontWeight: "800",
    color: colors.blueInk,
    letterSpacing: 0.5,
  },

  tripCard: {
    width: "100%",
    backgroundColor: colors.blueTint,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.blueLine,
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
    color: colors.blueInk,
    marginRight: 7,
  },

  tripTime: {
    fontSize: 10,
    color: colors.muted,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.blueLine,
  },

  cancelledBadge: {
    borderColor: colors.blueLine,
  },

  statusText: {
    fontSize: 8,
    fontWeight: "800",
    color: colors.blueInk,
  },

  cancelledStatusText: {
    color: colors.muted,
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
    backgroundColor: colors.blue,
  },

  tripLine: {
    width: 2,
    height: 44,
    backgroundColor: colors.blueLine,
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
    color: colors.muted,
    letterSpacing: 0.6,
    marginBottom: 3,
  },

  locationText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.black,
  },

  tripDivider: {
    height: 1,
    backgroundColor: colors.blueLine,
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
    backgroundColor: colors.blue,
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
    color: colors.black,
    marginBottom: 3,
  },

  tripMeta: {
    fontSize: 10,
    color: colors.muted,
  },

  fareGroup: {
    alignItems: "flex-end",
  },

  fare: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.black,
    marginBottom: 2,
  },

  fareLabel: {
    fontSize: 9,
    color: colors.muted,
  },

  viewDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 13,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: colors.blueLine,
  },

  viewDetailsText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.blueInk,
  },

  viewDetailsArrow: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.blueInk,
    marginLeft: 6,
  },

  infoCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.blueTint,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.blueLine,
    padding: 13,
    marginTop: 2,
  },

  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.blueLine,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  infoIconText: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.blueInk,
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

});
