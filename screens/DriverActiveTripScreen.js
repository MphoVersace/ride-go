import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DriverActiveTripScreen({ navigation }) {
  const handleCall = () => {
    Alert.alert("Call Rider", "Calling the rider will be connected later.");
  };

  const handleSafety = () => {
    Alert.alert("Safety Centre", "Safety tools will be connected later.");
  };

  const handleCompleteTrip = () => {
    Alert.alert(
      "Complete Trip",
      "This is a visual prototype. Trip completion will be connected later.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Continue",
          onPress: () => navigation.navigate("DriverTripCompleted"),
        },
      ],
    );
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
              <Text style={styles.headerLabel}>ACTIVE TRIP</Text>
              <Text style={styles.headerTitle}>Driving to Sandton</Text>
            </View>

            <View style={styles.tripBadge}>
              <View style={styles.tripBadgeDot} />
              <Text style={styles.tripBadgeText}>IN TRIP</Text>
            </View>
          </View>

          {/* ETA */}
          <View style={styles.etaCard}>
            <View style={styles.etaMain}>
              <Text style={styles.etaValue}>12 min</Text>
              <Text style={styles.etaLabel}>Estimated arrival</Text>
            </View>

            <View style={styles.etaDivider} />

            <View style={styles.etaSecondary}>
              <Text style={styles.distanceValue}>5.8 km</Text>
              <Text style={styles.etaLabel}>Remaining</Text>
            </View>
          </View>

          {/* Map */}
          <View style={styles.mapContainer}>
            <View style={styles.mapRoadOne} />
            <View style={styles.mapRoadTwo} />
            <View style={styles.mapRoadThree} />
            <View style={styles.mapRoadFour} />

            <View style={styles.mapCircleOne} />
            <View style={styles.mapCircleTwo} />
            <View style={styles.mapCircleThree} />

            <View style={styles.routeSegmentOne} />
            <View style={styles.routeSegmentTwo} />
            <View style={styles.routeSegmentThree} />

            <View style={styles.driverLocation}>
              <View style={styles.driverArrow}>
                <Text style={styles.driverArrowText}>▲</Text>
              </View>
            </View>

            <View style={styles.destinationPin}>
              <Text style={styles.destinationPinText}>D</Text>
            </View>

            <View style={styles.mapLabel}>
              <Text style={styles.mapLabelText}>Trip in progress</Text>
            </View>

            <TouchableOpacity
              style={styles.recenterButton}
              activeOpacity={0.85}
              onPress={() =>
                Alert.alert(
                  "Recenter Map",
                  "Map controls will be connected later.",
                )
              }
            >
              <Text style={styles.recenterIcon}>⌖</Text>
            </TouchableOpacity>
          </View>

          {/* Rider */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>RIDER</Text>

              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ VERIFIED</Text>
              </View>
            </View>

            <View style={styles.riderRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>N</Text>
              </View>

              <View style={styles.riderDetails}>
                <Text style={styles.riderName}>Naledi M.</Text>

                <View style={styles.ratingRow}>
                  <Text style={styles.star}>★</Text>
                  <Text style={styles.rating}>4.9</Text>
                  <Text style={styles.ratingCount}>• 42 rides</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.callButton}
                activeOpacity={0.85}
                onPress={handleCall}
              >
                <Text style={styles.callIcon}>☎</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Destination */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>DESTINATION</Text>

            <View style={styles.destinationRow}>
              <View style={styles.destinationIcon}>
                <Text style={styles.destinationIconText}>D</Text>
              </View>

              <View style={styles.destinationDetails}>
                <Text style={styles.destinationName}>Sandton City</Text>
                <Text style={styles.destinationAddress}>
                  83 Rivonia Road, Sandton
                </Text>
              </View>
            </View>

            <View style={styles.destinationDivider} />

            <View style={styles.routeStatusRow}>
              <View style={styles.routeStatusIcon}>
                <Text style={styles.routeStatusIconText}>→</Text>
              </View>

              <View style={styles.routeStatusContent}>
                <Text style={styles.routeStatusTitle}>
                  Heading to destination
                </Text>
                <Text style={styles.routeStatusText}>
                  Continue following the route to complete the trip.
                </Text>
              </View>
            </View>
          </View>

          {/* Trip Summary */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>💰</Text>
              <Text style={styles.summaryValue}>R125</Text>
              <Text style={styles.summaryLabel}>Estimated fare</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>📏</Text>
              <Text style={styles.summaryValue}>8.4 km</Text>
              <Text style={styles.summaryLabel}>Total distance</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>⏱️</Text>
              <Text style={styles.summaryValue}>18 min</Text>
              <Text style={styles.summaryLabel}>Trip estimate</Text>
            </View>
          </View>

          {/* Safety */}
          <TouchableOpacity
            style={styles.safetyCard}
            activeOpacity={0.85}
            onPress={handleSafety}
          >
            <View style={styles.safetyIcon}>
              <Text style={styles.safetyIconText}>🛡</Text>
            </View>

            <View style={styles.safetyContent}>
              <Text style={styles.safetyTitle}>Safety Centre</Text>
              <Text style={styles.safetyText}>
                Access safety tools and support during your trip.
              </Text>
            </View>

            <Text style={styles.safetyArrow}>→</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Action */}
        <View style={styles.bottomAction}>
          <TouchableOpacity
            style={styles.completeButton}
            activeOpacity={0.85}
            onPress={handleCompleteTrip}
          >
            <Text style={styles.completeButtonText}>Complete Trip</Text>
            <Text style={styles.completeButtonArrow}>→</Text>
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
    paddingBottom: 120,
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
    fontSize: 23,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  tripBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
  },

  tripBadgeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#5BC0FF",
    marginRight: 6,
  },

  tripBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#5BC0FF",
    letterSpacing: 0.5,
  },

  etaCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#102A52",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 16,
    marginBottom: 14,
  },

  etaMain: {
    flex: 1,
  },

  etaValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 3,
  },

  distanceValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 3,
  },

  etaLabel: {
    fontSize: 11,
    color: "#8FA5C1",
  },

  etaDivider: {
    width: 1,
    height: 42,
    backgroundColor: "#1D4775",
    marginHorizontal: 16,
  },

  etaSecondary: {
    width: 90,
  },

  mapContainer: {
    width: "100%",
    height: 260,
    backgroundColor: "#102A52",
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#1D4775",
    marginBottom: 14,
  },

  mapRoadOne: {
    position: "absolute",
    width: "135%",
    height: 22,
    backgroundColor: "#1D4775",
    top: 83,
    left: -40,
    transform: [{ rotate: "8deg" }],
  },

  mapRoadTwo: {
    position: "absolute",
    width: 19,
    height: "135%",
    backgroundColor: "#1D4775",
    left: 128,
    top: -30,
    transform: [{ rotate: "20deg" }],
  },

  mapRoadThree: {
    position: "absolute",
    width: "125%",
    height: 13,
    backgroundColor: "#173C68",
    top: 165,
    left: -25,
    transform: [{ rotate: "-21deg" }],
  },

  mapRoadFour: {
    position: "absolute",
    width: "105%",
    height: 12,
    backgroundColor: "#173C68",
    bottom: 37,
    left: 15,
    transform: [{ rotate: "28deg" }],
  },

  mapCircleOne: {
    position: "absolute",
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 11,
    borderColor: "#173C68",
    top: 13,
    left: 23,
  },

  mapCircleTwo: {
    position: "absolute",
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 13,
    borderColor: "#173C68",
    bottom: -35,
    right: 7,
  },

  mapCircleThree: {
    position: "absolute",
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 8,
    borderColor: "#173C68",
    top: 116,
    right: 22,
  },

  routeSegmentOne: {
    position: "absolute",
    width: 92,
    height: 4,
    backgroundColor: "#5BC0FF",
    left: 67,
    top: 119,
    transform: [{ rotate: "24deg" }],
  },

  routeSegmentTwo: {
    position: "absolute",
    width: 95,
    height: 4,
    backgroundColor: "#5BC0FF",
    left: 125,
    top: 157,
    transform: [{ rotate: "-24deg" }],
  },

  routeSegmentThree: {
    position: "absolute",
    width: 66,
    height: 4,
    backgroundColor: "#5BC0FF",
    left: 200,
    top: 120,
    transform: [{ rotate: "38deg" }],
  },

  driverLocation: {
    position: "absolute",
    left: 48,
    top: 93,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#071A3D",
    borderWidth: 2,
    borderColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  driverArrow: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  driverArrowText: {
    fontSize: 13,
    color: "#071A3D",
    marginLeft: 1,
  },

  destinationPin: {
    position: "absolute",
    right: 48,
    bottom: 49,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  destinationPinText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#071A3D",
  },

  mapLabel: {
    position: "absolute",
    left: 12,
    bottom: 12,
    backgroundColor: "#071A3D",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 9,
  },

  mapLabelText: {
    fontSize: 10,
    color: "#C9D6E8",
  },

  recenterButton: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#071A3D",
    borderWidth: 1,
    borderColor: "#1D4775",
    alignItems: "center",
    justifyContent: "center",
  },

  recenterIcon: {
    fontSize: 22,
    color: "#5BC0FF",
  },

  card: {
    width: "100%",
    backgroundColor: "#102A52",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 16,
    marginBottom: 14,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  sectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#8FA5C1",
    letterSpacing: 0.8,
  },

  verifiedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#071A3D",
    borderWidth: 1,
    borderColor: "#1D4775",
  },

  verifiedText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#5BC0FF",
    letterSpacing: 0.4,
  },

  riderRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#5BC0FF",
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
    color: "#FFFFFF",
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
    color: "#FFFFFF",
    marginRight: 5,
  },

  ratingCount: {
    fontSize: 12,
    color: "#8FA5C1",
  },

  callButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#071A3D",
    borderWidth: 1,
    borderColor: "#1D4775",
    alignItems: "center",
    justifyContent: "center",
  },

  callIcon: {
    fontSize: 17,
    color: "#5BC0FF",
  },

  destinationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  destinationIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  destinationIconText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#071A3D",
  },

  destinationDetails: {
    flex: 1,
  },

  destinationName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  destinationAddress: {
    fontSize: 11,
    lineHeight: 16,
    color: "#8FA5C1",
  },

  destinationDivider: {
    height: 1,
    backgroundColor: "#1D4775",
    marginVertical: 14,
  },

  routeStatusRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  routeStatusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#071A3D",
    borderWidth: 1,
    borderColor: "#1D4775",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  routeStatusIconText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#5BC0FF",
  },

  routeStatusContent: {
    flex: 1,
  },

  routeStatusTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  routeStatusText: {
    fontSize: 11,
    lineHeight: 16,
    color: "#8FA5C1",
  },

  summaryRow: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 14,
  },

  summaryCard: {
    flex: 1,
    minHeight: 104,
    backgroundColor: "#102A52",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1D4775",
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
    color: "#FFFFFF",
    marginBottom: 3,
  },

  summaryLabel: {
    fontSize: 10,
    color: "#8FA5C1",
  },

  safetyCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0A2147",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 13,
  },

  safetyIcon: {
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

  safetyIconText: {
    fontSize: 16,
  },

  safetyContent: {
    flex: 1,
  },

  safetyTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  safetyText: {
    fontSize: 11,
    lineHeight: 16,
    color: "#8FA5C1",
  },

  safetyArrow: {
    fontSize: 20,
    fontWeight: "800",
    color: "#5BC0FF",
    marginLeft: 8,
  },

  bottomAction: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#0A2147",
    borderTopWidth: 1,
    borderTopColor: "#1D4775",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
  },

  completeButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "#5BC0FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  completeButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#071A3D",
  },

  completeButtonArrow: {
    fontSize: 20,
    fontWeight: "800",
    color: "#071A3D",
    marginLeft: 9,
  },
});
