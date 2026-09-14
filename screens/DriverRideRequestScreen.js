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

export default function DriverRideRequestScreen({ navigation }) {
  const handleDecline = () => {
    Alert.alert(
      "Ride Declined",
      "This is a visual prototype. Ride request logic will be connected later.",
    );
  };

  const handleAccept = () => {
    Alert.alert(
      "Ride Accepted",
      "This is a visual prototype. Driver trip flow will be connected later.",
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
              <Text style={styles.headerLabel}>NEW RIDE REQUEST</Text>
              <Text style={styles.headerTitle}>You have a new trip</Text>
            </View>

            <View style={styles.requestBadge}>
              <Text style={styles.requestBadgeText}>NEW</Text>
            </View>
          </View>

          {/* Countdown */}
          <View style={styles.countdownCard}>
            <View style={styles.countdownCircle}>
              <Text style={styles.countdownNumber}>15</Text>
              <Text style={styles.countdownSeconds}>SEC</Text>
            </View>

            <View style={styles.countdownContent}>
              <Text style={styles.countdownTitle}>Respond to request</Text>
              <Text style={styles.countdownText}>
                Review the trip details before accepting.
              </Text>
            </View>
          </View>

          {/* Rider */}
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
            </View>
          </View>

          {/* Trip Route */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>TRIP DETAILS</Text>

            <View style={styles.routeContainer}>
              <View style={styles.routeLine}>
                <View style={styles.pickupDot} />

                <View style={styles.routeConnector} />

                <View style={styles.destinationDot} />
              </View>

              <View style={styles.locations}>
                <View style={styles.locationBlock}>
                  <Text style={styles.locationType}>PICKUP</Text>
                  <Text style={styles.locationName}>Rosebank Mall</Text>
                  <Text style={styles.locationAddress}>15A Cradock Avenue</Text>
                </View>

                <View style={styles.locationBlock}>
                  <Text style={styles.locationType}>DESTINATION</Text>
                  <Text style={styles.locationName}>Sandton City</Text>
                  <Text style={styles.locationAddress}>83 Rivonia Road</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Trip Summary */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>📏</Text>
              <Text style={styles.summaryValue}>8.4 km</Text>
              <Text style={styles.summaryLabel}>Distance</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>⏱️</Text>
              <Text style={styles.summaryValue}>18 min</Text>
              <Text style={styles.summaryLabel}>Estimated time</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>💰</Text>
              <Text style={styles.summaryValue}>R125</Text>
              <Text style={styles.summaryLabel}>Estimated fare</Text>
            </View>
          </View>

          {/* Map Preview */}
          <View style={styles.mapContainer}>
            <View style={styles.mapRoadHorizontal} />
            <View style={styles.mapRoadVertical} />
            <View style={styles.mapRoadDiagonal} />

            <View style={styles.mapCircleOne} />
            <View style={styles.mapCircleTwo} />

            <View style={styles.mapPickupPin}>
              <Text style={styles.mapPinText}>P</Text>
            </View>

            <View style={styles.mapDestinationPin}>
              <Text style={styles.mapPinText}>D</Text>
            </View>

            <View style={styles.mapRouteLine} />

            <View style={styles.mapLabel}>
              <Text style={styles.mapLabelText}>Trip route</Text>
            </View>
          </View>

          {/* Information */}
          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>ℹ️</Text>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Before you accept</Text>
              <Text style={styles.infoText}>
                Make sure you're comfortable with the pickup location,
                destination and estimated fare.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.declineButton}
            activeOpacity={0.85}
            onPress={handleDecline}
          >
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.acceptButton}
            activeOpacity={0.85}
            onPress={handleAccept}
          >
            <Text style={styles.acceptButtonText}>Accept Ride</Text>
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
    paddingBottom: 145,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  headerLabel: {
    fontSize: 11,
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

  requestBadge: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
  },

  requestBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#5BC0FF",
    letterSpacing: 0.6,
  },

  countdownCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#102A52",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 16,
    marginBottom: 16,
  },

  countdownCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#071A3D",
    borderWidth: 4,
    borderColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  countdownNumber: {
    fontSize: 21,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  countdownSeconds: {
    fontSize: 8,
    fontWeight: "800",
    color: "#8FA5C1",
    marginTop: -1,
  },

  countdownContent: {
    flex: 1,
  },

  countdownTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  countdownText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#8FA5C1",
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

  routeContainer: {
    flexDirection: "row",
  },

  routeLine: {
    width: 20,
    alignItems: "center",
    paddingTop: 3,
  },

  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#5BC0FF",
  },

  routeConnector: {
    width: 2,
    height: 38,
    backgroundColor: "#1D4775",
    marginVertical: 3,
  },

  destinationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#5BC0FF",
  },

  locations: {
    flex: 1,
    marginLeft: 8,
  },

  locationBlock: {
    minHeight: 55,
  },

  locationType: {
    fontSize: 9,
    fontWeight: "800",
    color: "#8FA5C1",
    letterSpacing: 0.7,
    marginBottom: 3,
  },

  locationName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 2,
  },

  locationAddress: {
    fontSize: 11,
    color: "#8FA5C1",
  },

  summaryRow: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 14,
  },

  summaryCard: {
    flex: 1,
    minHeight: 106,
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

  mapContainer: {
    width: "100%",
    height: 190,
    backgroundColor: "#102A52",
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#1D4775",
    marginBottom: 14,
  },

  mapRoadHorizontal: {
    position: "absolute",
    width: "120%",
    height: 22,
    backgroundColor: "#1D4775",
    top: 75,
    left: -20,
    transform: [{ rotate: "7deg" }],
  },

  mapRoadVertical: {
    position: "absolute",
    width: 20,
    height: "130%",
    backgroundColor: "#1D4775",
    left: 125,
    top: -20,
    transform: [{ rotate: "18deg" }],
  },

  mapRoadDiagonal: {
    position: "absolute",
    width: "120%",
    height: 13,
    backgroundColor: "#173C68",
    top: 122,
    left: -15,
    transform: [{ rotate: "-25deg" }],
  },

  mapCircleOne: {
    position: "absolute",
    width: 65,
    height: 65,
    borderRadius: 33,
    borderWidth: 10,
    borderColor: "#173C68",
    top: 10,
    left: 22,
  },

  mapCircleTwo: {
    position: "absolute",
    width: 75,
    height: 75,
    borderRadius: 38,
    borderWidth: 12,
    borderColor: "#173C68",
    bottom: -28,
    right: 18,
  },

  mapPickupPin: {
    position: "absolute",
    left: 68,
    top: 60,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  mapDestinationPin: {
    position: "absolute",
    right: 58,
    bottom: 43,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  mapPinText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#071A3D",
  },

  mapRouteLine: {
    position: "absolute",
    width: 145,
    height: 3,
    backgroundColor: "#5BC0FF",
    left: 90,
    top: 112,
    transform: [{ rotate: "24deg" }],
  },

  mapLabel: {
    position: "absolute",
    left: 11,
    bottom: 11,
    backgroundColor: "#071A3D",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 9,
  },

  mapLabelText: {
    fontSize: 10,
    color: "#C9D6E8",
  },

  infoCard: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#0A2147",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 13,
  },

  infoIcon: {
    fontSize: 16,
    marginRight: 10,
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

  bottomActions: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#0A2147",
    borderTopWidth: 1,
    borderTopColor: "#1D4775",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
  },

  declineButton: {
    flex: 0.85,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    alignItems: "center",
    justifyContent: "center",
  },

  declineButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  acceptButton: {
    flex: 1.15,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  acceptButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#071A3D",
  },
});
