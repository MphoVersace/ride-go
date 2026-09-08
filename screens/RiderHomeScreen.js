import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function RiderHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good day 👋</Text>
          <Text style={styles.subtitle}>Where are you going?</Text>
        </View>

        <TouchableOpacity style={styles.profileButton} activeOpacity={0.8}>
          <Text style={styles.profileIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.locationCard}>
        <View style={styles.locationIconContainer}>
          <Text style={styles.locationIcon}>📍</Text>
        </View>

        <View style={styles.locationText}>
          <Text style={styles.locationLabel}>Current location</Text>
          <Text style={styles.locationValue}>Your current location</Text>
        </View>

        <Text style={styles.locationArrow}>›</Text>
      </View>

      <TouchableOpacity
        style={styles.destinationCard}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("DestinationSearch")}
      >
        <View style={styles.searchIconContainer}>
          <Text style={styles.searchIcon}>⌕</Text>
        </View>

        <Text style={styles.destinationText}>Where do you want to go?</Text>

        <Text style={styles.destinationArrow}>›</Text>
      </TouchableOpacity>

      <View style={styles.mapContainer}>
        <View style={styles.mapRoadHorizontal} />
        <View style={styles.mapRoadVertical} />
        <View style={styles.mapRoadDiagonal} />

        <View style={styles.mapCircleOne} />
        <View style={styles.mapCircleTwo} />
        <View style={styles.mapCircleThree} />

        <View style={styles.mapPin}>
          <Text style={styles.mapPinText}>📍</Text>
        </View>

        <View style={styles.mapLabel}>
          <Text style={styles.mapLabelText}>Your location</Text>
        </View>
      </View>

      <View style={styles.quickSection}>
        <Text style={styles.sectionTitle}>Quick actions</Text>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickCard} activeOpacity={0.85}>
            <View style={styles.quickIconCircle}>
              <Text style={styles.quickIcon}>🏠</Text>
            </View>

            <Text style={styles.quickTitle}>Home</Text>
            <Text style={styles.quickSubtitle}>Add location</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard} activeOpacity={0.85}>
            <View style={styles.quickIconCircle}>
              <Text style={styles.quickIcon}>💼</Text>
            </View>

            <Text style={styles.quickTitle}>Work</Text>
            <Text style={styles.quickSubtitle}>Add location</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
          <Text style={styles.navIconActive}>⌂</Text>
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
          <Text style={styles.navIcon}>◷</Text>
          <Text style={styles.navText}>Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.8}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
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
    paddingTop: 55,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  greeting: {
    fontSize: 16,
    color: "#8FA5C1",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    alignItems: "center",
    justifyContent: "center",
  },

  profileIcon: {
    fontSize: 22,
  },

  locationCard: {
    width: "100%",
    minHeight: 66,
    backgroundColor: "#102A52",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1D4775",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  locationIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  locationIcon: {
    fontSize: 19,
  },

  locationText: {
    flex: 1,
  },

  locationLabel: {
    fontSize: 12,
    color: "#8FA5C1",
    marginBottom: 3,
  },

  locationValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  locationArrow: {
    fontSize: 30,
    color: "#5BC0FF",
    marginLeft: 8,
  },

  destinationCard: {
    width: "100%",
    height: 62,
    backgroundColor: "#5BC0FF",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  searchIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  searchIcon: {
    fontSize: 26,
    color: "#5BC0FF",
    marginTop: -3,
  },

  destinationText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#071A3D",
  },

  destinationArrow: {
    fontSize: 30,
    color: "#071A3D",
  },

  mapContainer: {
    width: "100%",
    height: 180,
    backgroundColor: "#102A52",
    borderRadius: 22,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#1D4775",
    marginBottom: 18,
  },

  mapRoadHorizontal: {
    position: "absolute",
    width: "120%",
    height: 24,
    backgroundColor: "#1D4775",
    top: 75,
    left: -20,
    transform: [{ rotate: "8deg" }],
  },

  mapRoadVertical: {
    position: "absolute",
    width: 22,
    height: "130%",
    backgroundColor: "#1D4775",
    left: 125,
    top: -20,
    transform: [{ rotate: "18deg" }],
  },

  mapRoadDiagonal: {
    position: "absolute",
    width: "120%",
    height: 14,
    backgroundColor: "#173C68",
    top: 115,
    left: -15,
    transform: [{ rotate: "-25deg" }],
  },

  mapCircleOne: {
    position: "absolute",
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 10,
    borderColor: "#173C68",
    top: 15,
    left: 25,
  },

  mapCircleTwo: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 12,
    borderColor: "#173C68",
    bottom: -25,
    right: 20,
  },

  mapCircleThree: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 8,
    borderColor: "#173C68",
    top: 20,
    right: 35,
  },

  mapPin: {
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: -18,
    marginTop: -18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  mapPinText: {
    fontSize: 17,
  },

  mapLabel: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "#071A3D",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },

  mapLabelText: {
    fontSize: 11,
    color: "#C9D6E8",
  },

  quickSection: {
    width: "100%",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },

  quickActions: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },

  quickCard: {
    flex: 1,
    minHeight: 95,
    backgroundColor: "#102A52",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 12,
  },

  quickIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
  },

  quickIcon: {
    fontSize: 17,
  },

  quickTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 2,
  },

  quickSubtitle: {
    fontSize: 11,
    color: "#8FA5C1",
  },

  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 78,
    backgroundColor: "#0A2147",
    borderTopWidth: 1,
    borderTopColor: "#1D4775",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
  },

  navIconActive: {
    fontSize: 24,
    color: "#5BC0FF",
    marginBottom: 3,
  },

  navIcon: {
    fontSize: 22,
    color: "#8FA5C1",
    marginBottom: 4,
  },

  navTextActive: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#5BC0FF",
  },

  navText: {
    fontSize: 11,
    color: "#8FA5C1",
  },
});
