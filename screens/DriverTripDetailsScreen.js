import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DriverTripDetailsScreen({ navigation, route }) {
  const trip = route?.params?.trip;

  const tripData = trip || {
    rider: "Naledi M.",
    pickup: "Rosebank Mall",
    destination: "Sandton City",
    date: "Today",
    time: "14:25",
    fare: "R125",
    distance: "8.4 km",
    duration: "18 min",
    status: "Completed",
  };

  const isCancelled = tripData.status === "Cancelled";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <StatusBar style="light" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>

            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerEyebrow}>TRIP DETAILS</Text>
              <Text style={styles.headerTitle}>Trip summary</Text>
            </View>

            <View style={styles.headerSpacer} />
          </View>

          {/* Status Card */}
          <View style={styles.statusCard}>
            <View style={styles.statusTopRow}>
              <View>
                <Text style={styles.statusLabel}>Trip status</Text>
                <Text style={styles.statusValue}>{tripData.status}</Text>
              </View>

              <View
                style={[
                  styles.statusBadge,
                  isCancelled && styles.cancelledBadge,
                ]}
              >
                <Text
                  style={[
                    styles.statusBadgeText,
                    isCancelled && styles.cancelledBadgeText,
                  ]}
                >
                  {tripData.status.toUpperCase()}
                </Text>
              </View>
            </View>

            <View style={styles.statusDivider} />

            <View style={styles.dateTimeRow}>
              <View>
                <Text style={styles.dateTimeLabel}>Date</Text>
                <Text style={styles.dateTimeValue}>{tripData.date}</Text>
              </View>

              <View style={styles.dateTimeRight}>
                <Text style={styles.dateTimeLabel}>Time</Text>
                <Text style={styles.dateTimeValue}>{tripData.time}</Text>
              </View>
            </View>
          </View>

          {/* Earnings */}
          <View style={styles.earningsCard}>
            <View style={styles.earningsIconCircle}>
              <Text style={styles.earningsIcon}>R</Text>
            </View>

            <View style={styles.earningsTextContainer}>
              <Text style={styles.earningsLabel}>Your earnings</Text>
              <Text style={styles.earningsValue}>{tripData.fare}</Text>
            </View>

            <View style={styles.completedIndicator}>
              <Text style={styles.completedIndicatorText}>
                {isCancelled ? "CANCELLED" : "PAID"}
              </Text>
            </View>
          </View>

          {/* Route Map */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trip route</Text>

            <View style={styles.mapContainer}>
              <View style={styles.mapRoadHorizontal} />
              <View style={styles.mapRoadVertical} />
              <View style={styles.mapRoadDiagonal} />
              <View style={styles.mapRoadSmall} />

              <View style={styles.mapCircleOne} />
              <View style={styles.mapCircleTwo} />
              <View style={styles.mapCircleThree} />

              {/* Route */}
              <View style={styles.routeLine} />

              {/* Pickup */}
              <View style={styles.pickupPin}>
                <View style={styles.pickupPinInner} />
              </View>

              {/* Destination */}
              <View style={styles.destinationPin}>
                <Text style={styles.destinationPinText}>D</Text>
              </View>

              <View style={styles.pickupMapLabel}>
                <Text style={styles.mapLabelText}>Pickup</Text>
              </View>

              <View style={styles.destinationMapLabel}>
                <Text style={styles.mapLabelText}>Destination</Text>
              </View>
            </View>
          </View>

          {/* Route Details */}
          <View style={styles.routeCard}>
            <View style={styles.locationRow}>
              <View style={styles.locationIndicatorContainer}>
                <View style={styles.pickupDot} />
                <View style={styles.locationConnector} />
                <View style={styles.destinationDot} />
              </View>

              <View style={styles.locationDetails}>
                <View style={styles.locationBlock}>
                  <Text style={styles.locationLabel}>PICKUP</Text>
                  <Text style={styles.locationName}>{tripData.pickup}</Text>
                </View>

                <View style={styles.locationBlock}>
                  <Text style={styles.locationLabel}>DESTINATION</Text>
                  <Text style={styles.locationName}>
                    {tripData.destination}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Trip Metrics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trip information</Text>

            <View style={styles.metricsRow}>
              <View style={styles.metricCard}>
                <View style={styles.metricIconCircle}>
                  <Text style={styles.metricIcon}>↔</Text>
                </View>

                <Text style={styles.metricValue}>{tripData.distance}</Text>
                <Text style={styles.metricLabel}>Distance</Text>
              </View>

              <View style={styles.metricCard}>
                <View style={styles.metricIconCircle}>
                  <Text style={styles.metricIcon}>◷</Text>
                </View>

                <Text style={styles.metricValue}>{tripData.duration}</Text>
                <Text style={styles.metricLabel}>Duration</Text>
              </View>

              <View style={styles.metricCard}>
                <View style={styles.metricIconCircle}>
                  <Text style={styles.metricIcon}>R</Text>
                </View>

                <Text style={styles.metricValue}>{tripData.fare}</Text>
                <Text style={styles.metricLabel}>Fare</Text>
              </View>
            </View>
          </View>

          {/* Rider */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rider</Text>

            <View style={styles.riderCard}>
              <View style={styles.riderAvatar}>
                <Text style={styles.riderAvatarText}>👤</Text>
              </View>

              <View style={styles.riderDetails}>
                <Text style={styles.riderName}>{tripData.rider}</Text>

                <View style={styles.ratingRow}>
                  <Text style={styles.star}>★</Text>
                  <Text style={styles.rating}>4.9</Text>
                  <Text style={styles.ratingSeparator}>•</Text>
                  <Text style={styles.rides}>42 rides</Text>
                </View>
              </View>

              <View style={styles.riderStatus}>
                <Text style={styles.riderStatusText}>RIDER</Text>
              </View>
            </View>
          </View>

          {/* Trip Summary */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconCircle}>
              <Text style={styles.infoIcon}>✓</Text>
            </View>

            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Trip completed successfully</Text>
              <Text style={styles.infoText}>
                This trip has been added to your driver activity and earnings
                history.
              </Text>
            </View>
          </View>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backToTripsButton}
            activeOpacity={0.85}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backToTripsButtonText}>Back to My Trips</Text>
          </TouchableOpacity>
        </ScrollView>
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
    paddingTop: 16,
    paddingBottom: 36,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    fontSize: 32,
    lineHeight: 34,
    color: "#FFFFFF",
    marginTop: -3,
  },

  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },

  headerEyebrow: {
    fontSize: 10,
    fontWeight: "800",
    color: "#5BC0FF",
    letterSpacing: 1.2,
    marginBottom: 3,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  headerSpacer: {
    width: 44,
  },

  statusCard: {
    backgroundColor: "#102A52",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 16,
    marginBottom: 14,
  },

  statusTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusLabel: {
    fontSize: 11,
    color: "#8FA5C1",
    marginBottom: 4,
  },

  statusValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#173C68",
  },

  statusBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#5BC0FF",
    letterSpacing: 0.5,
  },

  cancelledBadge: {
    backgroundColor: "#35233A",
  },

  cancelledBadgeText: {
    color: "#D9A7FF",
  },

  statusDivider: {
    height: 1,
    backgroundColor: "#1D4775",
    marginVertical: 14,
  },

  dateTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dateTimeRight: {
    alignItems: "flex-end",
  },

  dateTimeLabel: {
    fontSize: 10,
    color: "#8FA5C1",
    marginBottom: 3,
  },

  dateTimeValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  earningsCard: {
    backgroundColor: "#5BC0FF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  earningsIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  earningsIcon: {
    fontSize: 18,
    fontWeight: "800",
    color: "#5BC0FF",
  },

  earningsTextContainer: {
    flex: 1,
  },

  earningsLabel: {
    fontSize: 11,
    color: "#071A3D",
    marginBottom: 2,
  },

  earningsValue: {
    fontSize: 25,
    fontWeight: "900",
    color: "#071A3D",
  },

  completedIndicator: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "rgba(7, 26, 61, 0.16)",
  },

  completedIndicatorText: {
    fontSize: 9,
    fontWeight: "900",
    color: "#071A3D",
  },

  section: {
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 10,
  },

  mapContainer: {
    height: 230,
    borderRadius: 22,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    overflow: "hidden",
    position: "relative",
  },

  mapRoadHorizontal: {
    position: "absolute",
    width: "125%",
    height: 24,
    backgroundColor: "#1D4775",
    top: 88,
    left: -20,
    transform: [{ rotate: "8deg" }],
  },

  mapRoadVertical: {
    position: "absolute",
    width: 22,
    height: "135%",
    backgroundColor: "#1D4775",
    left: 125,
    top: -25,
    transform: [{ rotate: "18deg" }],
  },

  mapRoadDiagonal: {
    position: "absolute",
    width: "125%",
    height: 15,
    backgroundColor: "#173C68",
    top: 142,
    left: -20,
    transform: [{ rotate: "-24deg" }],
  },

  mapRoadSmall: {
    position: "absolute",
    width: "80%",
    height: 12,
    backgroundColor: "#173C68",
    top: 42,
    right: -35,
    transform: [{ rotate: "-35deg" }],
  },

  mapCircleOne: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 10,
    borderColor: "#173C68",
    top: 18,
    left: 24,
  },

  mapCircleTwo: {
    position: "absolute",
    width: 75,
    height: 75,
    borderRadius: 38,
    borderWidth: 12,
    borderColor: "#173C68",
    bottom: -28,
    right: 15,
  },

  mapCircleThree: {
    position: "absolute",
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 8,
    borderColor: "#173C68",
    top: 20,
    right: 28,
  },

  routeLine: {
    position: "absolute",
    width: 150,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#5BC0FF",
    left: 76,
    top: 124,
    transform: [{ rotate: "-18deg" }],
  },

  pickupPin: {
    position: "absolute",
    left: 48,
    top: 136,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#071A3D",
  },

  pickupPinInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#071A3D",
  },

  destinationPin: {
    position: "absolute",
    right: 52,
    top: 82,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#071A3D",
    borderWidth: 3,
    borderColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  destinationPinText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#5BC0FF",
  },

  pickupMapLabel: {
    position: "absolute",
    left: 24,
    bottom: 16,
    backgroundColor: "#071A3D",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
  },

  destinationMapLabel: {
    position: "absolute",
    right: 20,
    top: 18,
    backgroundColor: "#071A3D",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
  },

  mapLabelText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#C9D6E8",
  },

  routeCard: {
    backgroundColor: "#102A52",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 16,
    marginBottom: 22,
  },

  locationRow: {
    flexDirection: "row",
  },

  locationIndicatorContainer: {
    width: 22,
    alignItems: "center",
    paddingTop: 4,
  },

  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#5BC0FF",
    borderWidth: 3,
    borderColor: "#071A3D",
  },

  locationConnector: {
    width: 2,
    height: 40,
    backgroundColor: "#1D4775",
    marginVertical: 3,
  },

  destinationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#071A3D",
    borderWidth: 3,
    borderColor: "#5BC0FF",
  },

  locationDetails: {
    flex: 1,
    marginLeft: 12,
  },

  locationBlock: {
    marginBottom: 20,
  },

  locationLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "#8FA5C1",
    letterSpacing: 0.8,
    marginBottom: 4,
  },

  locationName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  metricsRow: {
    flexDirection: "row",
    gap: 10,
  },

  metricCard: {
    flex: 1,
    minHeight: 112,
    backgroundColor: "#102A52",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 12,
  },

  metricIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  metricIcon: {
    fontSize: 14,
    fontWeight: "800",
    color: "#5BC0FF",
  },

  metricValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 2,
  },

  metricLabel: {
    fontSize: 10,
    color: "#8FA5C1",
  },

  riderCard: {
    backgroundColor: "#102A52",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  riderAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  riderAvatarText: {
    fontSize: 22,
  },

  riderDetails: {
    flex: 1,
  },

  riderName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 5,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  star: {
    fontSize: 13,
    color: "#5BC0FF",
    marginRight: 4,
  },

  rating: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  ratingSeparator: {
    fontSize: 12,
    color: "#8FA5C1",
    marginHorizontal: 6,
  },

  rides: {
    fontSize: 11,
    color: "#8FA5C1",
  },

  riderStatus: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: "#071A3D",
  },

  riderStatusText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#8FA5C1",
    letterSpacing: 0.5,
  },

  infoCard: {
    backgroundColor: "#102A52",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  infoIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#173C68",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  infoIcon: {
    fontSize: 18,
    fontWeight: "900",
    color: "#5BC0FF",
  },

  infoTextContainer: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 3,
  },

  infoText: {
    fontSize: 10,
    lineHeight: 15,
    color: "#8FA5C1",
  },

  backToTripsButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  backToTripsButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#071A3D",
  },
});
