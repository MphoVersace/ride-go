import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function RideSearchingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.topSection}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.successCircle}>
          <View style={styles.innerCircle}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </View>

        <Text style={styles.heading}>Ride confirmed</Text>

        <Text style={styles.description}>
          We're looking for a driver near you.
        </Text>

        <View style={styles.searchingCard}>
          <View style={styles.loadingCircle}>
            <View style={styles.loadingDot} />
          </View>

          <View style={styles.searchingText}>
            <Text style={styles.searchingTitle}>Finding your driver</Text>

            <Text style={styles.searchingSubtitle}>This may take a moment</Text>
          </View>
        </View>

        <View style={styles.tripCard}>
          <View style={styles.tripRow}>
            <View style={styles.pickupDot} />

            <View style={styles.tripText}>
              <Text style={styles.tripLabel}>Pickup</Text>

              <Text style={styles.tripValue}>Your current location</Text>
            </View>
          </View>

          <View style={styles.tripLine} />

          <View style={styles.tripRow}>
            <View style={styles.destinationDot} />

            <View style={styles.tripText}>
              <Text style={styles.tripLabel}>Destination</Text>

              <Text style={styles.tripValue}>Rosebank Mall</Text>
            </View>
          </View>
        </View>

        <View style={styles.rideSummary}>
          <View>
            <Text style={styles.summaryLabel}>Your ride</Text>

            <Text style={styles.summaryRide}>Economy</Text>
          </View>

          <View style={styles.summaryPriceContainer}>
            <Text style={styles.summaryPrice}>R45</Text>

            <Text style={styles.summaryEstimated}>estimated</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.cancelButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071A3D",
    paddingHorizontal: 20,
  },

  topSection: {
    width: "100%",
    paddingTop: 55,
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
    fontSize: 34,
    color: "#FFFFFF",
    marginTop: -4,
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 38,
  },

  successCircle: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: "#12345F",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },

  innerCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  checkmark: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#071A3D",
    marginTop: -3,
  },

  heading: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#C9D6E8",
    textAlign: "center",
    marginBottom: 25,
  },

  searchingCard: {
    width: "100%",
    minHeight: 76,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 13,
  },

  loadingCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  loadingDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: "#5BC0FF",
  },

  searchingText: {
    flex: 1,
  },

  searchingTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  searchingSubtitle: {
    fontSize: 12,
    color: "#8FA5C1",
  },

  tripCard: {
    width: "100%",
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    borderRadius: 18,
    padding: 16,
    marginBottom: 13,
  },

  tripRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#5BC0FF",
    marginHorizontal: 4,
    marginRight: 14,
  },

  destinationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#5BC0FF",
    marginHorizontal: 4,
    marginRight: 14,
  },

  tripText: {
    flex: 1,
  },

  tripLabel: {
    fontSize: 11,
    color: "#8FA5C1",
    marginBottom: 3,
  },

  tripValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  tripLine: {
    width: 2,
    height: 18,
    backgroundColor: "#1D4775",
    marginLeft: 9,
    marginVertical: 2,
  },

  rideSummary: {
    width: "100%",
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  summaryLabel: {
    fontSize: 10,
    color: "#8FA5C1",
    marginBottom: 3,
  },

  summaryRide: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  summaryPriceContainer: {
    alignItems: "flex-end",
  },

  summaryPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5BC0FF",
  },

  summaryEstimated: {
    fontSize: 9,
    color: "#8FA5C1",
  },

  bottomSection: {
    width: "100%",
    paddingBottom: 25,
    paddingTop: 12,
  },

  cancelButton: {
    width: "100%",
    height: 55,
    borderRadius: 28,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
