import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DriverWelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <StatusBar style="light" />

        <View style={styles.topSection}>
          <Text style={styles.logo}>RideGo</Text>

          <View style={styles.driverBadge}>
            <Text style={styles.driverBadgeText}>DRIVER</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.visualCircle}>
            <View style={styles.routeLine} />

            <View style={styles.locationPin}>
              <View style={styles.locationDot} />
            </View>

            <View style={styles.car}>
              <View style={styles.carBody}>
                <View style={styles.carWindow} />
                <View style={styles.wheelLeft} />
                <View style={styles.wheelRight} />
              </View>
            </View>

            <View style={styles.destinationPin}>
              <View style={styles.destinationDot} />
            </View>
          </View>

          <Text style={styles.heading}>Drive with RideGo</Text>

          <Text style={styles.description}>
            Turn your time on the road into an opportunity to earn. Accept
            trips, help riders get where they need to go, and stay in control of
            your driving experience.
          </Text>

          <View style={styles.benefits}>
            <View style={styles.benefitRow}>
              <View style={styles.benefitIcon}>
                <Text style={styles.benefitIconText}>R</Text>
              </View>

              <View style={styles.benefitTextContainer}>
                <Text style={styles.benefitTitle}>Earn on your terms</Text>
                <Text style={styles.benefitDescription}>
                  Choose when you're ready to drive.
                </Text>
              </View>
            </View>

            <View style={styles.benefitRow}>
              <View style={styles.benefitIcon}>
                <Text style={styles.benefitIconText}>✓</Text>
              </View>

              <View style={styles.benefitTextContainer}>
                <Text style={styles.benefitTitle}>Stay in control</Text>
                <Text style={styles.benefitDescription}>
                  See trip details before accepting.
                </Text>
              </View>
            </View>

            <View style={styles.benefitRow}>
              <View style={styles.benefitIcon}>
                <Text style={styles.benefitIconText}>★</Text>
              </View>

              <View style={styles.benefitTextContainer}>
                <Text style={styles.benefitTitle}>Build your rating</Text>
                <Text style={styles.benefitDescription}>
                  Deliver great rides and grow your profile.
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DriverProfileSetup")}
          >
            <Text style={styles.primaryButtonText}>Get Started →</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Let's get your driver profile ready.
          </Text>
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
    paddingHorizontal: 20,
  },

  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },

  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#5BC0FF",
  },

  driverBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#254A73",
  },

  driverBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#5BC0FF",
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
  },

  visualCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#102A52",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 24,
  },

  routeLine: {
    position: "absolute",
    width: 105,
    height: 65,
    borderWidth: 2,
    borderColor: "#254A73",
    borderRadius: 45,
    transform: [{ rotate: "-12deg" }],
  },

  locationPin: {
    position: "absolute",
    top: 32,
    left: 35,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  locationDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#071A3D",
  },

  destinationPin: {
    position: "absolute",
    bottom: 30,
    right: 32,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  destinationDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#071A3D",
  },

  car: {
    width: 55,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  carBody: {
    width: 52,
    height: 25,
    backgroundColor: "#5BC0FF",
    borderRadius: 7,
    position: "relative",
  },

  carWindow: {
    position: "absolute",
    width: 25,
    height: 10,
    backgroundColor: "#071A3D",
    borderRadius: 3,
    top: 4,
    left: 14,
  },

  wheelLeft: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#111827",
    bottom: -4,
    left: 6,
  },

  wheelRight: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#111827",
    bottom: -4,
    right: 6,
  },

  heading: {
    fontSize: 29,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#C9D6E8",
    textAlign: "center",
    maxWidth: 350,
    marginBottom: 20,
  },

  benefits: {
    width: "100%",
    maxWidth: 370,
  },

  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },

  benefitIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#102A52",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  benefitIconText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#5BC0FF",
  },

  benefitTextContainer: {
    flex: 1,
  },

  benefitTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 2,
  },

  benefitDescription: {
    fontSize: 12,
    color: "#8FA8C5",
  },

  bottomSection: {
    paddingBottom: 8,
  },

  primaryButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3D",
  },

  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: "#8FA8C5",
    marginTop: 10,
  },
});
