import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function DriverFoundScreen({ navigation }) {
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

        <Text style={styles.headerTitle}>Your driver is on the way</Text>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.mapCard}>
        <View style={styles.routeLine} />

        <View style={styles.pickupPin}>
          <Text style={styles.pinText}>●</Text>
        </View>

        <View style={styles.driverMarker}>
          <Text style={styles.carEmoji}>🚗</Text>
        </View>

        <View style={styles.destinationPin}>
          <Text style={styles.pinText}>📍</Text>
        </View>

        <View style={styles.etaBubble}>
          <Text style={styles.etaNumber}>3 min</Text>
          <Text style={styles.etaLabel}>away</Text>
        </View>

        <Text style={styles.mapHint}>Driver approaching your pickup point</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.arrivalCard}>
          <View>
            <Text style={styles.arrivalLabel}>ARRIVING IN</Text>
            <Text style={styles.arrivalTime}>3 minutes</Text>
          </View>

          <View style={styles.arrivalIcon}>
            <Text style={styles.arrivalIconText}>⌚</Text>
          </View>
        </View>

        <View style={styles.driverCard}>
          <View style={styles.driverTopRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>TM</Text>
            </View>

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Thabo M.</Text>

              <View style={styles.ratingRow}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.rating}>4.9</Text>
                <Text style={styles.tripCount}>• 1,240 trips</Text>
              </View>
            </View>

            <View style={styles.rideBadge}>
              <Text style={styles.rideBadgeText}>Economy</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.vehicleRow}>
            <View style={styles.vehicleIcon}>
              <Text style={styles.vehicleEmoji}>🚘</Text>
            </View>

            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleName}>Toyota Corolla</Text>
              <Text style={styles.vehicleColour}>Silver</Text>
            </View>

            <View style={styles.plate}>
              <Text style={styles.plateText}>KDF 482 GP</Text>
            </View>
          </View>
        </View>

        <View style={styles.tripCard}>
          <Text style={styles.tripLabel}>PICKUP</Text>
          <Text style={styles.tripValue}>Your current location</Text>

          <View style={styles.tripDivider} />

          <Text style={styles.tripLabel}>DESTINATION</Text>
          <Text style={styles.tripValue}>Rosebank Mall</Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Text style={styles.actionIcon}>☎</Text>
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Text style={styles.actionIcon}>✉</Text>
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.cancelButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("RiderHome")}
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
  },

  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 18,
  },

  backButton: {
    alignItems: "center",
    backgroundColor: "#102A52",
    borderColor: "#1D4775",
    borderRadius: 22,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    width: 44,
  },

  backIcon: {
    color: "#FFFFFF",
    fontSize: 34,
    marginTop: -4,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  headerSpacer: {
    width: 44,
  },

  mapCard: {
    backgroundColor: "#0D2A52",
    height: 210,
    marginHorizontal: 20,
    overflow: "hidden",
    position: "relative",
  },

  routeLine: {
    backgroundColor: "#5BC0FF",
    height: 3,
    left: 55,
    position: "absolute",
    top: 107,
    transform: [{ rotate: "-18deg" }],
    width: 250,
  },

  pickupPin: {
    alignItems: "center",
    backgroundColor: "#19C37D",
    borderColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 3,
    height: 36,
    justifyContent: "center",
    left: 45,
    position: "absolute",
    top: 126,
    width: 36,
  },

  destinationPin: {
    alignItems: "center",
    backgroundColor: "#EF476F",
    borderColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 3,
    height: 36,
    justifyContent: "center",
    position: "absolute",
    right: 38,
    top: 52,
    width: 36,
  },

  pinText: {
    color: "#FFFFFF",
    fontSize: 15,
  },

  driverMarker: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#5BC0FF",
    borderRadius: 25,
    borderWidth: 3,
    height: 50,
    justifyContent: "center",
    left: "43%",
    position: "absolute",
    top: 82,
    width: 50,
  },

  carEmoji: {
    fontSize: 25,
  },

  etaBubble: {
    alignItems: "center",
    backgroundColor: "#071A3D",
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 7,
    position: "absolute",
    right: 22,
    top: 15,
  },

  etaNumber: {
    color: "#5BC0FF",
    fontSize: 14,
    fontWeight: "800",
  },

  etaLabel: {
    color: "#A9BFDC",
    fontSize: 11,
  },

  mapHint: {
    bottom: 14,
    color: "#A9BFDC",
    fontSize: 12,
    left: 0,
    position: "absolute",
    right: 0,
    textAlign: "center",
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
  },

  arrivalCard: {
    alignItems: "center",
    backgroundColor: "#102A52",
    borderColor: "#1D4775",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },

  arrivalLabel: {
    color: "#8FA5C1",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },

  arrivalTime: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 4,
  },

  arrivalIcon: {
    alignItems: "center",
    backgroundColor: "#173D6D",
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    width: 40,
  },

  arrivalIconText: {
    color: "#5BC0FF",
    fontSize: 20,
  },

  driverCard: {
    backgroundColor: "#102A52",
    borderColor: "#1D4775",
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 14,
    padding: 16,
  },

  driverTopRow: {
    alignItems: "center",
    flexDirection: "row",
  },

  avatar: {
    alignItems: "center",
    backgroundColor: "#5BC0FF",
    borderRadius: 28,
    height: 56,
    justifyContent: "center",
    width: 56,
  },

  avatarText: {
    color: "#071A3D",
    fontSize: 17,
    fontWeight: "800",
  },

  driverInfo: {
    flex: 1,
    marginLeft: 12,
  },

  driverName: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  ratingRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
  },

  star: {
    color: "#FFC857",
    fontSize: 15,
  },

  rating: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 4,
  },

  tripCount: {
    color: "#8FA5C1",
    fontSize: 12,
    marginLeft: 5,
  },

  rideBadge: {
    backgroundColor: "#173D6D",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  rideBadgeText: {
    color: "#5BC0FF",
    fontSize: 11,
    fontWeight: "700",
  },

  divider: {
    backgroundColor: "#1D4775",
    height: 1,
    marginVertical: 15,
  },

  vehicleRow: {
    alignItems: "center",
    flexDirection: "row",
  },

  vehicleIcon: {
    alignItems: "center",
    backgroundColor: "#173D6D",
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    width: 36,
  },

  vehicleEmoji: {
    fontSize: 19,
  },

  vehicleInfo: {
    flex: 1,
    marginLeft: 10,
  },

  vehicleName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  vehicleColour: {
    color: "#8FA5C1",
    fontSize: 12,
    marginTop: 2,
  },

  plate: {
    backgroundColor: "#F5F7FA",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  plateText: {
    color: "#071A3D",
    fontSize: 11,
    fontWeight: "800",
  },

  tripCard: {
    backgroundColor: "#102A52",
    borderColor: "#1D4775",
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 14,
    padding: 16,
  },

  tripLabel: {
    color: "#8FA5C1",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },

  tripValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },

  tripDivider: {
    backgroundColor: "#1D4775",
    height: 1,
    marginVertical: 13,
  },

  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },

  actionRow: {
    flexDirection: "row",
    gap: 12,
  },

  actionButton: {
    alignItems: "center",
    backgroundColor: "#102A52",
    borderColor: "#1D4775",
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 13,
  },

  actionIcon: {
    color: "#5BC0FF",
    fontSize: 18,
    marginRight: 8,
  },

  actionText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  cancelButton: {
    alignItems: "center",
    marginTop: 14,
    paddingVertical: 12,
  },

  cancelButtonText: {
    color: "#FF8FA3",
    fontSize: 14,
    fontWeight: "700",
  },
});
