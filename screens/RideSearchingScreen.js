import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function RideSearchingScreen({ navigation }) {
  useEffect(() => {
    const driverSearchTimer = setTimeout(() => {
      navigation.replace("DriverFound");
    }, 2500);

    return () => clearTimeout(driverSearchTimer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.logo}>RideGo</Text>

        <Text style={styles.title}>Ride confirmed</Text>

        <Text style={styles.subtitle}>
          We’re looking for a driver near you.
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.searchCard}>
          <View style={styles.loadingCircle}>
            <View style={styles.loadingDot} />
          </View>

          <Text style={styles.searchTitle}>Finding your driver</Text>

          <Text style={styles.searchText}>
            Please wait while we find the best available driver for your ride.
          </Text>
        </View>

        <View style={styles.tripCard}>
          <View style={styles.locationRow}>
            <View style={styles.dot} />

            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>Pickup</Text>

              <Text style={styles.locationText}>Your current location</Text>
            </View>
          </View>

          <View style={styles.connector} />

          <View style={styles.locationRow}>
            <View style={styles.destinationDot} />

            <View style={styles.locationTextContainer}>
              <Text style={styles.locationLabel}>Destination</Text>

              <Text style={styles.locationText}>Rosebank Mall</Text>
            </View>
          </View>
        </View>

        <View style={styles.rideCard}>
          <View style={styles.rideIcon}>
            <Text style={styles.rideEmoji}>🚗</Text>
          </View>

          <View style={styles.rideInfo}>
            <Text style={styles.rideName}>Economy</Text>

            <Text style={styles.rideDescription}>
              Affordable everyday rides
            </Text>
          </View>

          <Text style={styles.price}>R45</Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate("RiderHome")}
        >
          <Text style={styles.cancelText}>Cancel ride</Text>
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
    paddingTop: 65,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  logo: {
    color: "#5BC0FF",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 30,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    color: "#B8C7E0",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  searchCard: {
    backgroundColor: "#102A55",
    borderRadius: 22,
    padding: 25,
    alignItems: "center",
    marginBottom: 18,
  },

  loadingCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 4,
    borderColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  loadingDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#5BC0FF",
  },

  searchTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },

  searchText: {
    color: "#B8C7E0",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 21,
  },

  tripCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#5BC0FF",
    marginRight: 14,
  },

  destinationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#071A3D",
    marginRight: 14,
  },

  connector: {
    width: 2,
    height: 25,
    backgroundColor: "#D7DFEA",
    marginLeft: 5,
  },

  locationTextContainer: {
    flex: 1,
  },

  locationLabel: {
    color: "#7A8799",
    fontSize: 12,
    marginBottom: 3,
  },

  locationText: {
    color: "#071A3D",
    fontSize: 15,
    fontWeight: "600",
  },

  rideCard: {
    backgroundColor: "#102A55",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  rideIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#183B70",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  rideEmoji: {
    fontSize: 23,
  },

  rideInfo: {
    flex: 1,
  },

  rideName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 3,
  },

  rideDescription: {
    color: "#AFC0D9",
    fontSize: 12,
  },

  price: {
    color: "#5BC0FF",
    fontSize: 18,
    fontWeight: "800",
  },

  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  cancelButton: {
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#496487",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
