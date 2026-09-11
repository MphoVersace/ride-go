import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";

export default function RideSearchingScreen({ navigation, route }) {
  const selectedRide = route?.params?.selectedRide || {
    id: "economy",
    name: "Economy",
    description: "Affordable everyday rides",
    eta: "3–5 min",
    price: "R45",
    icon: "🚗",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("DriverFound", {
        selectedRide: selectedRide,
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, selectedRide]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#071A3D" />

      <View style={styles.content}>
        <Text style={styles.title}>Ride confirmed</Text>

        <Text style={styles.subtitle}>
          We’re looking for a driver near you.
        </Text>

        <View style={styles.searchingCard}>
          <View style={styles.loaderCircle}>
            <View style={styles.loaderDot} />
          </View>

          <Text style={styles.searchingTitle}>Finding your driver</Text>

          <Text style={styles.searchingText}>
            We’re matching you with a nearby driver.
          </Text>
        </View>

        <View style={styles.tripCard}>
          <View style={styles.locationRow}>
            <View style={[styles.locationDot, styles.pickupDot]} />

            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>PICKUP</Text>
              <Text style={styles.locationText}>Your current location</Text>
            </View>
          </View>

          <View style={styles.routeLine} />

          <View style={styles.locationRow}>
            <View style={[styles.locationDot, styles.destinationDot]} />

            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>DESTINATION</Text>
              <Text style={styles.locationText}>Rosebank Mall</Text>
            </View>
          </View>
        </View>

        <View style={styles.rideSummary}>
          <View style={styles.rideIconContainer}>
            <Text style={styles.rideIcon}>{selectedRide.icon}</Text>
          </View>

          <View style={styles.rideInfo}>
            <Text style={styles.rideName}>{selectedRide.name}</Text>
            <Text style={styles.rideDetails}>{selectedRide.description}</Text>
          </View>

          <Text style={styles.ridePrice}>{selectedRide.price}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.navigate("RiderHome")}
        activeOpacity={0.8}
      >
        <Text style={styles.cancelButtonText}>Cancel ride</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071A3D",
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 70,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },

  subtitle: {
    color: "#AEBBD4",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 28,
  },

  searchingCard: {
    backgroundColor: "#102A55",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
  },

  loaderCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#5BC0FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  loaderDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#5BC0FF",
  },

  searchingTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  searchingText: {
    color: "#AEBBD4",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },

  tripCard: {
    backgroundColor: "#102A55",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 14,
  },

  pickupDot: {
    backgroundColor: "#5BC0FF",
  },

  destinationDot: {
    backgroundColor: "#FFFFFF",
  },

  locationTextContainer: {
    flex: 1,
  },

  locationLabel: {
    color: "#7185A8",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 4,
  },

  locationText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  routeLine: {
    width: 1,
    height: 24,
    backgroundColor: "#415779",
    marginLeft: 5.5,
    marginVertical: 4,
  },

  rideSummary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  rideIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EAF7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  rideIcon: {
    fontSize: 24,
  },

  rideInfo: {
    flex: 1,
  },

  rideName: {
    color: "#071A3D",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },

  rideDetails: {
    color: "#6D7D96",
    fontSize: 12,
  },

  ridePrice: {
    color: "#071A3D",
    fontSize: 17,
    fontWeight: "700",
  },

  cancelButton: {
    marginHorizontal: 24,
    marginBottom: 28,
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#415779",
    justifyContent: "center",
    alignItems: "center",
  },

  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
