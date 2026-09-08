import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const rideOptions = [
  {
    id: "economy",
    icon: "🚗",
    name: "Economy",
    description: "Affordable everyday rides",
    eta: "3–5 min",
    price: "R45",
  },
  {
    id: "comfort",
    icon: "🚘",
    name: "Comfort",
    description: "A more comfortable ride",
    eta: "4–6 min",
    price: "R65",
  },
  {
    id: "business",
    icon: "💼",
    name: "Business",
    description: "Professional rides for work and meetings",
    eta: "5–7 min",
    price: "R85",
  },
  {
    id: "luxury",
    icon: "✨",
    name: "Luxury",
    description: "Premium vehicles and an elevated experience",
    eta: "6–8 min",
    price: "R120",
  },
  {
    id: "xl",
    icon: "🚙",
    name: "XL",
    description: "More space for groups and luggage",
    eta: "5–7 min",
    price: "R95",
  },
];

export default function RideOptionsScreen({ navigation }) {
  const [selectedRideId, setSelectedRideId] = useState("economy");

  const selectedRide =
    rideOptions.find((ride) => ride.id === selectedRideId) || rideOptions[0];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Choose your ride</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tripCard}>
          <View style={styles.tripRow}>
            <View style={styles.tripDotStart} />

            <View style={styles.tripText}>
              <Text style={styles.tripLabel}>Pickup</Text>

              <Text style={styles.tripValue}>Your current location</Text>
            </View>
          </View>

          <View style={styles.tripLine} />

          <View style={styles.tripRow}>
            <View style={styles.tripDotEnd} />

            <View style={styles.tripText}>
              <Text style={styles.tripLabel}>Destination</Text>

              <Text style={styles.tripValue}>Rosebank Mall</Text>
            </View>
          </View>
        </View>

        <View style={styles.mapPreview}>
          <View style={styles.mapRoadOne} />
          <View style={styles.mapRoadTwo} />
          <View style={styles.mapRoadThree} />

          <View style={styles.pickupPin}>
            <Text style={styles.pinText}>●</Text>
          </View>

          <View style={styles.destinationPin}>
            <Text style={styles.pinText}>📍</Text>
          </View>

          <View style={styles.routeLine} />
        </View>

        <Text style={styles.sectionTitle}>Available rides</Text>

        <View style={styles.rideList}>
          {rideOptions.map((ride) => {
            const isSelected = ride.id === selectedRideId;

            return (
              <TouchableOpacity
                key={ride.id}
                style={[styles.rideCard, isSelected && styles.selectedRideCard]}
                activeOpacity={0.85}
                onPress={() => setSelectedRideId(ride.id)}
              >
                <View
                  style={[
                    styles.rideIconCircle,
                    isSelected && styles.selectedRideIconCircle,
                  ]}
                >
                  <Text style={styles.rideIcon}>{ride.icon}</Text>
                </View>

                <View style={styles.rideInfo}>
                  <View style={styles.rideTitleRow}>
                    <Text style={styles.rideName}>{ride.name}</Text>

                    {ride.id === "economy" && (
                      <View style={styles.recommendedBadge}>
                        <Text style={styles.recommendedText}>Recommended</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.rideDescription}>{ride.description}</Text>

                  <Text style={styles.rideEta}>Pickup in {ride.eta}</Text>
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{ride.price}</Text>

                  <Text style={styles.priceLabel}>estimated</Text>
                </View>

                {isSelected && (
                  <View style={styles.selectedCheck}>
                    <Text style={styles.selectedCheckText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.disclaimer}>
          Prices shown are estimates and may change based on the final route,
          traffic, and ride conditions.
        </Text>
      </ScrollView>

      <View style={styles.bottomSection}>
        <View style={styles.selectedSummary}>
          <View>
            <Text style={styles.selectedLabel}>Selected ride</Text>

            <Text style={styles.selectedRide}>{selectedRide.name}</Text>
          </View>

          <View style={styles.selectedPriceContainer}>
            <Text style={styles.selectedPrice}>{selectedRide.price}</Text>

            <Text style={styles.selectedEstimated}>estimated</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("RideSearching", {
              selectedRide: selectedRide,
            })
          }
        >
          <Text style={styles.confirmButtonText}>Confirm Ride →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071A3D",
  },

  header: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  headerSpacer: {
    width: 44,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 185,
  },

  tripCard: {
    width: "100%",
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },

  tripRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  tripDotStart: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#5BC0FF",
    marginHorizontal: 4,
    marginRight: 14,
  },

  tripDotEnd: {
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

  mapPreview: {
    width: "100%",
    height: 150,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    marginBottom: 22,
  },

  mapRoadOne: {
    position: "absolute",
    width: "130%",
    height: 25,
    backgroundColor: "#1D4775",
    top: 60,
    left: -30,
    transform: [{ rotate: "12deg" }],
  },

  mapRoadTwo: {
    position: "absolute",
    width: 22,
    height: "140%",
    backgroundColor: "#1D4775",
    left: 130,
    top: -25,
    transform: [{ rotate: "-18deg" }],
  },

  mapRoadThree: {
    position: "absolute",
    width: "120%",
    height: 13,
    backgroundColor: "#173C68",
    top: 112,
    left: -15,
    transform: [{ rotate: "-20deg" }],
  },

  pickupPin: {
    position: "absolute",
    left: "27%",
    top: "53%",
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#071A3D",
  },

  pinText: {
    fontSize: 10,
    color: "#071A3D",
  },

  destinationPin: {
    position: "absolute",
    right: "22%",
    top: "22%",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#071A3D",
  },

  routeLine: {
    position: "absolute",
    width: 120,
    height: 3,
    backgroundColor: "#5BC0FF",
    left: "30%",
    top: "48%",
    transform: [{ rotate: "-25deg" }],
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },

  rideList: {
    width: "100%",
  },

  rideCard: {
    width: "100%",
    minHeight: 94,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    borderRadius: 18,
    padding: 13,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  selectedRideCard: {
    borderColor: "#5BC0FF",
    borderWidth: 2,
    backgroundColor: "#12345F",
  },

  rideIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  selectedRideIconCircle: {
    backgroundColor: "#5BC0FF",
  },

  rideIcon: {
    fontSize: 22,
  },

  rideInfo: {
    flex: 1,
    paddingRight: 8,
  },

  rideTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    paddingRight: 8,
  },

  rideName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  recommendedBadge: {
    backgroundColor: "#5BC0FF",
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginLeft: 7,
  },

  recommendedText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#071A3D",
  },

  rideDescription: {
    fontSize: 11,
    lineHeight: 16,
    color: "#C9D6E8",
    marginBottom: 3,
  },

  rideEta: {
    fontSize: 10,
    color: "#8FA5C1",
  },

  priceContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 3,
  },

  price: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 2,
  },

  priceLabel: {
    fontSize: 9,
    color: "#8FA5C1",
  },

  selectedCheck: {
    position: "absolute",
    top: 7,
    right: 7,
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  selectedCheckText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#071A3D",
    marginTop: -1,
  },

  disclaimer: {
    fontSize: 10,
    lineHeight: 16,
    color: "#7188A5",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 12,
  },

  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0A2147",
    borderTopWidth: 1,
    borderTopColor: "#1D4775",
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 25,
  },

  selectedSummary: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  selectedLabel: {
    fontSize: 10,
    color: "#8FA5C1",
    marginBottom: 3,
  },

  selectedRide: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  selectedPriceContainer: {
    alignItems: "flex-end",
  },

  selectedPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5BC0FF",
  },

  selectedEstimated: {
    fontSize: 9,
    color: "#8FA5C1",
  },

  confirmButton: {
    width: "100%",
    height: 55,
    backgroundColor: "#5BC0FF",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  confirmButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#071A3D",
  },
});
