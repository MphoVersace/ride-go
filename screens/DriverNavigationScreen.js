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

export default function DriverNavigationScreen({ navigation }) {
  const handleCall = () => {
    Alert.alert("Call Rider", "Calling the rider will be connected later.");
  };

  const handleMessage = () => {
    Alert.alert("Message Rider", "Messaging will be connected later.");
  };

  const handleArrived = () => {
    Alert.alert(
      "Arrived at Pickup",
      "This is a visual prototype. Pickup confirmation will be connected later.",
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
              <Text style={styles.headerLabel}>ON THE WAY</Text>
              <Text style={styles.headerTitle}>Pick up Naledi</Text>
            </View>

            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusBadgeText}>EN ROUTE</Text>
            </View>
          </View>

          {/* ETA Card */}
          <View style={styles.etaCard}>
            <View style={styles.etaMain}>
              <Text style={styles.etaValue}>6 min</Text>
              <Text style={styles.etaLabel}>Estimated arrival</Text>
            </View>

            <View style={styles.etaDivider} />

            <View style={styles.etaSecondary}>
              <Text style={styles.etaDistance}>2.1 km</Text>
              <Text style={styles.etaLabel}>To pickup</Text>
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

            <View style={styles.routeLineOne} />
            <View style={styles.routeLineTwo} />

            <View style={styles.driverLocation}>
              <View style={styles.driverLocationArrow}>
                <Text style={styles.driverLocationArrowText}>▲</Text>
              </View>
            </View>

            <View style={styles.pickupPin}>
              <Text style={styles.pickupPinText}>P</Text>
            </View>

            <View style={styles.mapLabel}>
              <Text style={styles.mapLabelText}>Pickup route</Text>
            </View>

            <View style={styles.navigationButton}>
              <Text style={styles.navigationIcon}>↗</Text>
            </View>
          </View>

          {/* Rider Card */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>RIDER</Text>

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

              <View style={styles.riderActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  activeOpacity={0.85}
                  onPress={handleCall}
                >
                  <Text style={styles.actionIcon}>☎</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  activeOpacity={0.85}
                  onPress={handleMessage}
                >
                  <Text style={styles.actionIcon}>✉</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Pickup Location */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>PICKUP LOCATION</Text>

            <View style={styles.locationRow}>
              <View style={styles.locationPin}>
                <Text style={styles.locationPinText}>P</Text>
              </View>

              <View style={styles.locationDetails}>
                <Text style={styles.locationName}>Rosebank Mall</Text>
                <Text style={styles.locationAddress}>
                  15A Cradock Avenue, Rosebank
                </Text>
              </View>
            </View>

            <View style={styles.locationDivider} />

            <View style={styles.instructionRow}>
              <Text style={styles.instructionIcon}>ⓘ</Text>

              <Text style={styles.instructionText}>
                Look out for your rider near the main entrance.
              </Text>
            </View>
          </View>

          {/* Trip Information */}
          <View style={styles.tripInfoRow}>
            <View style={styles.tripInfoCard}>
              <Text style={styles.tripInfoIcon}>💰</Text>
              <Text style={styles.tripInfoValue}>R125</Text>
              <Text style={styles.tripInfoLabel}>Estimated fare</Text>
            </View>

            <View style={styles.tripInfoCard}>
              <Text style={styles.tripInfoIcon}>📍</Text>
              <Text style={styles.tripInfoValue}>Sandton</Text>
              <Text style={styles.tripInfoLabel}>Destination</Text>
            </View>
          </View>

          {/* Safety Notice */}
          <View style={styles.safetyCard}>
            <View style={styles.safetyIcon}>
              <Text style={styles.safetyIconText}>✓</Text>
            </View>

            <View style={styles.safetyContent}>
              <Text style={styles.safetyTitle}>Drive safely</Text>
              <Text style={styles.safetyText}>
                Follow the road rules and never use your phone while driving.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action */}
        <View style={styles.bottomAction}>
          <TouchableOpacity
            style={styles.arrivedButton}
            activeOpacity={0.85}
            onPress={handleArrived}
          >
            <Text style={styles.arrivedButtonText}>I’ve Arrived at Pickup</Text>
            <Text style={styles.arrivedButtonArrow}>→</Text>
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

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#5BC0FF",
    marginRight: 6,
  },

  statusBadgeText: {
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

  etaDistance: {
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
    height: 250,
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
    width: "130%",
    height: 22,
    backgroundColor: "#1D4775",
    top: 78,
    left: -35,
    transform: [{ rotate: "9deg" }],
  },

  mapRoadTwo: {
    position: "absolute",
    width: 19,
    height: "130%",
    backgroundColor: "#1D4775",
    left: 132,
    top: -25,
    transform: [{ rotate: "21deg" }],
  },

  mapRoadThree: {
    position: "absolute",
    width: "125%",
    height: 13,
    backgroundColor: "#173C68",
    top: 155,
    left: -35,
    transform: [{ rotate: "-19deg" }],
  },

  mapRoadFour: {
    position: "absolute",
    width: "100%",
    height: 12,
    backgroundColor: "#173C68",
    bottom: 38,
    left: 25,
    transform: [{ rotate: "27deg" }],
  },

  mapCircleOne: {
    position: "absolute",
    width: 75,
    height: 75,
    borderRadius: 38,
    borderWidth: 11,
    borderColor: "#173C68",
    top: 14,
    left: 25,
  },

  mapCircleTwo: {
    position: "absolute",
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 13,
    borderColor: "#173C68",
    bottom: -35,
    right: 8,
  },

  mapCircleThree: {
    position: "absolute",
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 8,
    borderColor: "#173C68",
    top: 112,
    right: 25,
  },

  routeLineOne: {
    position: "absolute",
    width: 118,
    height: 4,
    backgroundColor: "#5BC0FF",
    left: 74,
    top: 117,
    transform: [{ rotate: "25deg" }],
  },

  routeLineTwo: {
    position: "absolute",
    width: 72,
    height: 4,
    backgroundColor: "#5BC0FF",
    left: 157,
    top: 153,
    transform: [{ rotate: "-34deg" }],
  },

  driverLocation: {
    position: "absolute",
    left: 54,
    top: 100,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#071A3D",
    borderWidth: 2,
    borderColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  driverLocationArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  driverLocationArrowText: {
    fontSize: 13,
    color: "#071A3D",
    marginLeft: 1,
  },

  pickupPin: {
    position: "absolute",
    right: 52,
    bottom: 50,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#5BC0FF",
  },

  pickupPinText: {
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

  navigationButton: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1D4775",
  },

  navigationIcon: {
    fontSize: 21,
    fontWeight: "800",
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

  sectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#8FA5C1",
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

  riderActions: {
    flexDirection: "row",
    gap: 8,
  },

  actionButton: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#071A3D",
    borderWidth: 1,
    borderColor: "#1D4775",
    alignItems: "center",
    justifyContent: "center",
  },

  actionIcon: {
    fontSize: 17,
    color: "#5BC0FF",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationPin: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  locationPinText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#071A3D",
  },

  locationDetails: {
    flex: 1,
  },

  locationName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  locationAddress: {
    fontSize: 11,
    lineHeight: 16,
    color: "#8FA5C1",
  },

  locationDivider: {
    height: 1,
    backgroundColor: "#1D4775",
    marginVertical: 14,
  },

  instructionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  instructionIcon: {
    fontSize: 15,
    color: "#5BC0FF",
    marginRight: 9,
  },

  instructionText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 17,
    color: "#8FA5C1",
  },

  tripInfoRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },

  tripInfoCard: {
    flex: 1,
    minHeight: 100,
    backgroundColor: "#102A52",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 12,
    justifyContent: "center",
  },

  tripInfoIcon: {
    fontSize: 16,
    marginBottom: 7,
  },

  tripInfoValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 3,
  },

  tripInfoLabel: {
    fontSize: 10,
    color: "#8FA5C1",
  },

  safetyCard: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#0A2147",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 13,
  },

  safetyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  safetyIconText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#071A3D",
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

  arrivedButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "#5BC0FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  arrivedButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#071A3D",
  },

  arrivedButtonArrow: {
    fontSize: 20,
    fontWeight: "800",
    color: "#071A3D",
    marginLeft: 9,
  },
});
