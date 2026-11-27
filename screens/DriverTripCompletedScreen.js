import { colors } from "../ui/theme";
import Icon from "../ui/Icon";
import { openScreen } from "../navigation/routes";
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

export default function DriverTripCompletedScreen({ navigation }) {
  const handleRateRider = () => {
    Alert.alert("Rate Rider", "Rider rating will be connected later.");
  };

  const handleViewEarnings = () => {
    Alert.alert("Earnings", "Detailed earnings will be connected later.");
  };

  const handleDone = () => {
    openScreen(navigation, "DriverHome");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Success */}
          <View style={styles.successSection}>
            <View style={styles.successCircle}>
              <Text style={styles.successIcon}>✓</Text>
            </View>

            <Text style={styles.successLabel}>TRIP COMPLETED</Text>
            <Text style={styles.successTitle}>Great job, Thabo!</Text>
            <Text style={styles.successSubtitle}>
              You successfully completed your trip with Naledi.
            </Text>
          </View>

          {/* Earnings */}
          <View style={styles.earningsCard}>
            <Text style={styles.earningsLabel}>TRIP EARNINGS</Text>
            <Text style={styles.earningsValue}>R125</Text>
            <Text style={styles.earningsSubtext}>
              Estimated driver earnings
            </Text>

            <TouchableOpacity
              style={styles.earningsButton}
              activeOpacity={0.85}
              onPress={handleViewEarnings}
            >
              <Text style={styles.earningsButtonText}>View Earnings</Text>
              <Text style={styles.earningsButtonArrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Route */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>TRIP ROUTE</Text>

            <View style={styles.routeRow}>
              <View style={styles.routeTimeline}>
                <View style={styles.routeDotPickup} />
                <View style={styles.routeLine} />
                <View style={styles.routeDotDestination} />
              </View>

              <View style={styles.routeContent}>
                <View style={styles.locationBlock}>
                  <Text style={styles.locationLabel}>PICKUP</Text>
                  <Text style={styles.locationName}>Rosebank Mall</Text>
                  <Text style={styles.locationAddress}>
                    15A Cradock Avenue, Rosebank
                  </Text>
                </View>

                <View style={styles.locationBlock}>
                  <Text style={styles.locationLabel}>DESTINATION</Text>
                  <Text style={styles.locationName}>Sandton City</Text>
                  <Text style={styles.locationAddress}>
                    83 Rivonia Road, Sandton
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Trip Details */}
          <View style={styles.detailsRow}>
            <View style={styles.detailCard}>
              <Icon name="ruler" style={styles.detailIcon} />
              <Text style={styles.detailValue}>8.4 km</Text>
              <Text style={styles.detailLabel}>Distance</Text>
            </View>

            <View style={styles.detailCard}>
              <Icon name="timer" style={styles.detailIcon} />
              <Text style={styles.detailValue}>18 min</Text>
              <Text style={styles.detailLabel}>Duration</Text>
            </View>

            <View style={styles.detailCard}>
              <Icon name="wallet" style={styles.detailIcon} />
              <Text style={styles.detailValue}>R125</Text>
              <Text style={styles.detailLabel}>Fare</Text>
            </View>
          </View>

          {/* Rider */}
          <View style={styles.card}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionLabel}>RIDER</Text>

              <View style={styles.completedBadge}>
                <Text style={styles.completedBadgeText}>COMPLETED</Text>
              </View>
            </View>

            <View style={styles.riderRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>N</Text>
              </View>

              <View style={styles.riderDetails}>
                <Text style={styles.riderName}>Naledi M.</Text>

                <View style={styles.ratingRow}>
                  <Icon name="star" style={styles.star} />
                  <Text style={styles.rating}>4.9</Text>
                  <Text style={styles.ratingCount}>• 42 rides</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.rateButton}
              activeOpacity={0.85}
              onPress={handleRateRider}
            >
              <Text style={styles.rateButtonText}>Rate Rider</Text>
              <Text style={styles.rateButtonArrow}>→</Text>
            </TouchableOpacity>
          </View>

          {/* Driver Earnings Note */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>✓</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>
                Earnings added to your trip total
              </Text>
              <Text style={styles.infoText}>
                Your completed trip has been recorded in your driver activity.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action */}
        <View style={styles.bottomAction}>
          <TouchableOpacity
            style={styles.doneButton}
            activeOpacity={0.85}
            onPress={handleDone}
          >
            <Text style={styles.doneButtonText}>Back to Driver Home</Text>
            <Text style={styles.doneButtonArrow}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scrollView: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 120,
  },

  successSection: {
    alignItems: "center",
    marginBottom: 22,
  },

  successCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  successIcon: {
    fontSize: 38,
    fontWeight: "800",
    color: "#071A3D",
  },

  successLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.blueInk,
    letterSpacing: 1,
    marginBottom: 6,
  },

  successTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.black,
    marginBottom: 7,
  },

  successSubtitle: {
    maxWidth: 300,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    color: colors.muted,
  },

  earningsCard: {
    width: "100%",
    backgroundColor: colors.blueTint,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.blueLine,
    padding: 20,
    alignItems: "center",
    marginBottom: 14,
  },

  earningsLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.muted,
    letterSpacing: 0.8,
    marginBottom: 7,
  },

  earningsValue: {
    fontSize: 34,
    fontWeight: "800",
    color: colors.black,
    marginBottom: 4,
  },

  earningsSubtext: {
    fontSize: 11,
    color: colors.muted,
    marginBottom: 16,
  },

  earningsButton: {
    width: "100%",
    height: 44,
    borderRadius: 13,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.blueLine,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  earningsButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.blueInk,
  },

  earningsButtonArrow: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.blueInk,
    marginLeft: 8,
  },

  card: {
    width: "100%",
    backgroundColor: colors.blueTint,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.blueLine,
    padding: 16,
    marginBottom: 14,
  },

  sectionLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.muted,
    letterSpacing: 0.8,
  },

  routeRow: {
    flexDirection: "row",
    marginTop: 14,
  },

  routeTimeline: {
    width: 20,
    alignItems: "center",
    paddingTop: 5,
  },

  routeDotPickup: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.blue,
  },

  routeLine: {
    width: 2,
    height: 62,
    backgroundColor: colors.blueLine,
    marginVertical: 5,
  },

  routeDotDestination: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#5BC0FF",
  },

  routeContent: {
    flex: 1,
    marginLeft: 10,
  },

  locationBlock: {
    marginBottom: 19,
  },

  locationLabel: {
    fontSize: 8,
    fontWeight: "800",
    color: colors.blueInk,
    letterSpacing: 0.6,
    marginBottom: 4,
  },

  locationName: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.black,
    marginBottom: 3,
  },

  locationAddress: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.muted,
  },

  detailsRow: {
    flexDirection: "row",
    gap: 9,
    marginBottom: 14,
  },

  detailCard: {
    flex: 1,
    minHeight: 96,
    backgroundColor: colors.blueTint,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.blueLine,
    padding: 11,
    justifyContent: "center",
  },

  detailIcon: {
    fontSize: 16,
    marginBottom: 7,
  },

  detailValue: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.black,
    marginBottom: 3,
  },

  detailLabel: {
    fontSize: 10,
    color: colors.muted,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  completedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.blueLine,
  },

  completedBadgeText: {
    fontSize: 8,
    fontWeight: "800",
    color: colors.blueInk,
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
    backgroundColor: colors.blue,
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
    color: colors.black,
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
    color: colors.black,
    marginRight: 5,
  },

  ratingCount: {
    fontSize: 12,
    color: colors.muted,
  },

  rateButton: {
    height: 44,
    borderRadius: 13,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.blueLine,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },

  rateButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.blueInk,
  },

  rateButtonArrow: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.blueInk,
    marginLeft: 8,
  },

  infoCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.blueTint,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.blueLine,
    padding: 13,
  },

  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.blueLine,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  infoIconText: {
    fontSize: 17,
    fontWeight: "800",
    color: colors.blueInk,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.black,
    marginBottom: 4,
  },

  infoText: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.muted,
  },

  bottomAction: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.blueTint,
    borderTopWidth: 1,
    borderTopColor: colors.blueLine,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
  },

  doneButton: {
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  doneButtonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#071A3D",
  },

  doneButtonArrow: {
    fontSize: 20,
    fontWeight: "800",
    color: "#071A3D",
    marginLeft: 9,
  },
});
