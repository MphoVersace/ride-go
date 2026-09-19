import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DriverEarningsDetailsScreen = ({ navigation, route }) => {
  const earning = route?.params?.earning || {
    rider: "Naledi M.",
    pickup: "Rosebank Mall",
    destination: "Sandton City",
    date: "Today",
    time: "14:25",
    fare: "R125",
    distance: "8.4 km",
    duration: "18 min",
    rideEarnings: "R125",
    rideGoFee: "-R21",
    netEarnings: "R104",
    status: "Completed",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.eyebrow}>EARNINGS DETAILS</Text>
            <Text style={styles.title}>Trip Earnings</Text>
          </View>
        </View>

        <View style={styles.earningsCard}>
          <Text style={styles.earningsLabel}>NET EARNINGS</Text>
          <Text style={styles.earningsAmount}>{earning.netEarnings}</Text>

          <View style={styles.completedBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.completedText}>{earning.status}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Information</Text>

          <View style={styles.tripCard}>
            <View style={styles.tripHeader}>
              <View>
                <Text style={styles.riderLabel}>RIDER</Text>
                <Text style={styles.riderName}>{earning.rider}</Text>
              </View>

              <View style={styles.ratingBadge}>
                <Text style={styles.ratingStar}>★</Text>
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>

            <View style={styles.routeContainer}>
              <View style={styles.routeLine}>
                <View style={styles.pickupDot} />
                <View style={styles.verticalLine} />
                <View style={styles.destinationDot} />
              </View>

              <View style={styles.routeDetails}>
                <View style={styles.locationBlock}>
                  <Text style={styles.locationLabel}>PICKUP</Text>
                  <Text style={styles.locationText}>{earning.pickup}</Text>
                </View>

                <View style={styles.locationBlock}>
                  <Text style={styles.locationLabel}>DESTINATION</Text>
                  <Text style={styles.locationText}>{earning.destination}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Summary</Text>

          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{earning.distance}</Text>
              <Text style={styles.summaryLabel}>Distance</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{earning.duration}</Text>
              <Text style={styles.summaryLabel}>Duration</Text>
            </View>

            <View style={styles.summaryDivider} />

            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{earning.fare}</Text>
              <Text style={styles.summaryLabel}>Fare</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Earnings Breakdown</Text>

          <View style={styles.breakdownCard}>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Ride earnings</Text>
              <Text style={styles.breakdownValue}>{earning.rideEarnings}</Text>
            </View>

            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>RideGo service fee</Text>
              <Text style={styles.feeValue}>{earning.rideGoFee}</Text>
            </View>

            <View style={styles.breakdownDivider} />

            <View style={styles.totalRow}>
              <View>
                <Text style={styles.totalLabel}>Your earnings</Text>
                <Text style={styles.totalSubtext}>
                  Amount added to your earnings
                </Text>
              </View>

              <Text style={styles.totalValue}>{earning.netEarnings}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Date & Time</Text>

          <View style={styles.dateCard}>
            <View style={styles.dateIcon}>
              <Text style={styles.dateIconText}>▣</Text>
            </View>

            <View>
              <Text style={styles.dateValue}>
                {earning.date} at {earning.time}
              </Text>
              <Text style={styles.dateSubtext}>Completed trip</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>i</Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>About your earnings</Text>
            <Text style={styles.infoText}>
              Your net earnings are calculated after the RideGo service fee.
              Payment and payout processing will be connected later.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.doneButton}
          activeOpacity={0.85}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.doneButtonText}>Back to Earnings</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 35,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#E6EAF0",
  },

  backIcon: {
    fontSize: 32,
    lineHeight: 34,
    color: "#0F172A",
    marginTop: -3,
  },

  eyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "#64748B",
    marginBottom: 3,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
  },

  earningsCard: {
    backgroundColor: "#0B3B82",
    borderRadius: 24,
    padding: 24,
    marginBottom: 28,
    alignItems: "center",
    shadowColor: "#0B3B82",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 5,
  },

  earningsLabel: {
    color: "#BFDBFE",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 8,
  },

  earningsAmount: {
    color: "#FFFFFF",
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 14,
  },

  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F7EF",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#16A34A",
    marginRight: 7,
  },

  completedText: {
    color: "#15803D",
    fontSize: 12,
    fontWeight: "800",
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
  },

  tripCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E6EAF0",
  },

  tripHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF1F5",
  },

  riderLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1,
    marginBottom: 4,
  },

  riderName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7E6",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12,
  },

  ratingStar: {
    color: "#F59E0B",
    fontSize: 13,
    marginRight: 5,
  },

  ratingText: {
    color: "#92400E",
    fontSize: 12,
    fontWeight: "800",
  },

  routeContainer: {
    flexDirection: "row",
    paddingTop: 20,
  },

  routeLine: {
    width: 20,
    alignItems: "center",
    paddingTop: 4,
  },

  pickupDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#0EA5E9",
    borderWidth: 3,
    borderColor: "#E0F2FE",
  },

  verticalLine: {
    width: 2,
    height: 42,
    backgroundColor: "#CBD5E1",
  },

  destinationDot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#0F3B78",
    borderWidth: 3,
    borderColor: "#DBEAFE",
  },

  routeDetails: {
    flex: 1,
    marginLeft: 12,
  },

  locationBlock: {
    minHeight: 52,
  },

  locationLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1,
    marginBottom: 4,
  },

  locationText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6EAF0",
  },

  summaryItem: {
    flex: 1,
    alignItems: "center",
  },

  summaryValue: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 5,
  },

  summaryLabel: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
  },

  summaryDivider: {
    width: 1,
    height: 35,
    backgroundColor: "#E2E8F0",
  },

  breakdownCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E6EAF0",
  },

  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  breakdownLabel: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },

  breakdownValue: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "800",
  },

  feeValue: {
    fontSize: 14,
    color: "#DC2626",
    fontWeight: "800",
  },

  breakdownDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginBottom: 17,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "800",
    marginBottom: 4,
  },

  totalSubtext: {
    fontSize: 11,
    color: "#94A3B8",
  },

  totalValue: {
    fontSize: 22,
    color: "#0B3B82",
    fontWeight: "900",
  },

  dateCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6EAF0",
  },

  dateIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  dateIconText: {
    color: "#0B3B82",
    fontSize: 18,
    fontWeight: "800",
  },

  dateValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 4,
  },

  dateSubtext: {
    fontSize: 11,
    color: "#64748B",
  },

  infoCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 18,
    padding: 17,
    flexDirection: "row",
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },

  infoIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  infoIconText: {
    color: "#0B3B82",
    fontSize: 15,
    fontWeight: "900",
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#1E3A8A",
    marginBottom: 5,
  },

  infoText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#475569",
  },

  doneButton: {
    backgroundColor: "#0B3B82",
    borderRadius: 16,
    minHeight: 54,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});

export default DriverEarningsDetailsScreen;
