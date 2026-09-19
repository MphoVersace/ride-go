import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DriverEarningsScreen({ navigation }) {
  const earnings = [
    {
      label: "Today",
      value: "R850",
      trips: "8 trips",
    },
    {
      label: "This week",
      value: "R4,280",
      trips: "37 trips",
    },
    {
      label: "This month",
      value: "R16,940",
      trips: "142 trips",
    },
  ];

  const recentEarnings = [
    {
      rider: "Naledi M.",
      route: "Rosebank Mall → Sandton City",
      time: "Today • 14:25",
      amount: "R125",
      status: "Completed",
    },
    {
      rider: "Lerato K.",
      route: "Melrose Arch → Rosebank",
      time: "Today • 12:10",
      amount: "R98",
      status: "Completed",
    },
    {
      rider: "Thabo S.",
      route: "Sandton City → Midrand",
      time: "Yesterday • 18:40",
      amount: "R164",
      status: "Completed",
    },
    {
      rider: "Amahle N.",
      route: "Fourways Mall → Bryanston",
      time: "Yesterday • 16:15",
      amount: "R112",
      status: "Completed",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <StatusBar style="light" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerEyebrow}>DRIVER FINANCES</Text>
              <Text style={styles.headerTitle}>Earnings</Text>
            </View>

            <View style={styles.headerIcon}>
              <Text style={styles.headerIconText}>R</Text>
            </View>
          </View>

          {/* Main Earnings Card */}
          <View style={styles.mainEarningsCard}>
            <View style={styles.mainEarningsTop}>
              <View>
                <Text style={styles.mainEarningsLabel}>Today's earnings</Text>
                <Text style={styles.mainEarningsValue}>R850</Text>
              </View>

              <View style={styles.earningsTrend}>
                <Text style={styles.trendArrow}>↗</Text>
                <Text style={styles.trendText}>+12%</Text>
              </View>
            </View>

            <View style={styles.mainDivider} />

            <View style={styles.mainStatsRow}>
              <View>
                <Text style={styles.mainStatLabel}>Trips</Text>
                <Text style={styles.mainStatValue}>8</Text>
              </View>

              <View>
                <Text style={styles.mainStatLabel}>Average trip</Text>
                <Text style={styles.mainStatValue}>R106</Text>
              </View>

              <View style={styles.mainStatRight}>
                <Text style={styles.mainStatLabel}>Rating</Text>
                <Text style={styles.mainStatValue}>4.9 ★</Text>
              </View>
            </View>
          </View>

          {/* Period Summary */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Earnings overview</Text>
              <Text style={styles.sectionSubtitle}>2026</Text>
            </View>

            <View style={styles.periodCards}>
              {earnings.map((item) => (
                <View style={styles.periodCard} key={item.label}>
                  <Text style={styles.periodLabel}>{item.label}</Text>
                  <Text style={styles.periodValue}>{item.value}</Text>
                  <Text style={styles.periodTrips}>{item.trips}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Earnings Breakdown */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's breakdown</Text>

            <View style={styles.breakdownCard}>
              <View style={styles.breakdownRow}>
                <View style={styles.breakdownLeft}>
                  <View style={styles.breakdownIcon}>
                    <Text style={styles.breakdownIconText}>R</Text>
                  </View>

                  <View>
                    <Text style={styles.breakdownTitle}>Ride earnings</Text>
                    <Text style={styles.breakdownDescription}>
                      8 completed trips
                    </Text>
                  </View>
                </View>

                <Text style={styles.breakdownAmount}>R1,020</Text>
              </View>

              <View style={styles.breakdownDivider} />

              <View style={styles.breakdownRow}>
                <View style={styles.breakdownLeft}>
                  <View style={styles.breakdownIcon}>
                    <Text style={styles.breakdownIconText}>−</Text>
                  </View>

                  <View>
                    <Text style={styles.breakdownTitle}>RideGo fees</Text>
                    <Text style={styles.breakdownDescription}>
                      Service fees
                    </Text>
                  </View>
                </View>

                <Text style={styles.feeAmount}>−R170</Text>
              </View>

              <View style={styles.breakdownDivider} />

              <View style={styles.breakdownTotalRow}>
                <Text style={styles.breakdownTotalLabel}>Net earnings</Text>
                <Text style={styles.breakdownTotalValue}>R850</Text>
              </View>
            </View>
          </View>

          {/* Earnings Activity */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent earnings</Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("DriverTrips")}
              >
                <Text style={styles.viewAllText}>View trips</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.activityCard}>
              {recentEarnings.map((item, index) => (
                <View key={`${item.rider}-${item.time}`}>
                  <TouchableOpacity
                    style={styles.activityRow}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate("DriverTripDetails", {
                        trip: {
                          rider: item.rider,
                          pickup: item.route.split(" → ")[0],
                          destination: item.route.split(" → ")[1],
                          date: item.time.split(" • ")[0],
                          time: item.time.split(" • ")[1],
                          fare: item.amount,
                          distance: "8.4 km",
                          duration: "18 min",
                          status: item.status,
                        },
                      })
                    }
                  >
                    <View style={styles.activityIcon}>
                      <Text style={styles.activityIconText}>✓</Text>
                    </View>

                    <View style={styles.activityDetails}>
                      <Text style={styles.activityRider}>{item.rider}</Text>
                      <Text style={styles.activityRoute}>{item.route}</Text>
                      <Text style={styles.activityTime}>{item.time}</Text>
                    </View>

                    <View style={styles.activityAmountContainer}>
                      <Text style={styles.activityAmount}>{item.amount}</Text>
                      <Text style={styles.activityStatus}>PAID</Text>
                    </View>
                  </TouchableOpacity>

                  {index < recentEarnings.length - 1 && (
                    <View style={styles.activityDivider} />
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Payout Card */}
          <View style={styles.payoutCard}>
            <View style={styles.payoutIconCircle}>
              <Text style={styles.payoutIcon}>↗</Text>
            </View>

            <View style={styles.payoutTextContainer}>
              <Text style={styles.payoutTitle}>Next payout</Text>
              <Text style={styles.payoutDescription}>
                Your earnings are ready for your next payout.
              </Text>
            </View>

            <Text style={styles.payoutAmount}>R850</Text>
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconCircle}>
              <Text style={styles.infoIcon}>i</Text>
            </View>

            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Keep driving, Thabo</Text>
              <Text style={styles.infoText}>
                Complete more trips to increase your daily and weekly earnings.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DriverHome")}
          >
            <Text style={styles.navIcon}>⌂</Text>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DriverTrips")}
          >
            <Text style={styles.navIcon}>◷</Text>
            <Text style={styles.navText}>Trips</Text>
          </TouchableOpacity>

          <View style={[styles.navItem, styles.activeNavItem]}>
            <Text style={[styles.navIcon, styles.activeNavIcon]}>R</Text>
            <Text style={[styles.navText, styles.activeNavText]}>Earnings</Text>
          </View>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DriverProfile")}
          >
            <Text style={styles.navIcon}>◯</Text>
            <Text style={styles.navText}>Profile</Text>
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
    paddingTop: 16,
    paddingBottom: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  headerEyebrow: {
    fontSize: 10,
    fontWeight: "800",
    color: "#5BC0FF",
    letterSpacing: 1.2,
    marginBottom: 3,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#102A52",
    borderWidth: 1,
    borderColor: "#1D4775",
    alignItems: "center",
    justifyContent: "center",
  },

  headerIconText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#5BC0FF",
  },

  mainEarningsCard: {
    backgroundColor: "#5BC0FF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 24,
  },

  mainEarningsTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  mainEarningsLabel: {
    fontSize: 12,
    color: "#071A3D",
    marginBottom: 3,
  },

  mainEarningsValue: {
    fontSize: 34,
    fontWeight: "900",
    color: "#071A3D",
  },

  earningsTrend: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(7, 26, 61, 0.14)",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12,
  },

  trendArrow: {
    fontSize: 16,
    fontWeight: "900",
    color: "#071A3D",
    marginRight: 4,
  },

  trendText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#071A3D",
  },

  mainDivider: {
    height: 1,
    backgroundColor: "rgba(7, 26, 61, 0.18)",
    marginVertical: 16,
  },

  mainStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  mainStatLabel: {
    fontSize: 10,
    color: "#071A3D",
    marginBottom: 3,
  },

  mainStatValue: {
    fontSize: 15,
    fontWeight: "900",
    color: "#071A3D",
  },

  mainStatRight: {
    alignItems: "flex-end",
  },

  section: {
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  sectionSubtitle: {
    fontSize: 11,
    color: "#8FA5C1",
  },

  viewAllText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#5BC0FF",
  },

  periodCards: {
    flexDirection: "row",
    gap: 10,
  },

  periodCard: {
    flex: 1,
    backgroundColor: "#102A52",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 12,
    minHeight: 102,
  },

  periodLabel: {
    fontSize: 10,
    color: "#8FA5C1",
    marginBottom: 7,
  },

  periodValue: {
    fontSize: 17,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 4,
  },

  periodTrips: {
    fontSize: 9,
    color: "#5BC0FF",
    fontWeight: "700",
  },

  breakdownCard: {
    backgroundColor: "#102A52",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 16,
  },

  breakdownRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  breakdownLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  breakdownIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  breakdownIconText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#5BC0FF",
  },

  breakdownTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 2,
  },

  breakdownDescription: {
    fontSize: 10,
    color: "#8FA5C1",
  },

  breakdownAmount: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  feeAmount: {
    fontSize: 14,
    fontWeight: "800",
    color: "#D9A7FF",
  },

  breakdownDivider: {
    height: 1,
    backgroundColor: "#1D4775",
    marginVertical: 14,
  },

  breakdownTotalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  breakdownTotalLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  breakdownTotalValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#5BC0FF",
  },

  activityCard: {
    backgroundColor: "#102A52",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1D4775",
    paddingHorizontal: 14,
  },

  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  activityIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  activityIconText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#5BC0FF",
  },

  activityDetails: {
    flex: 1,
    marginRight: 8,
  },

  activityRider: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 2,
  },

  activityRoute: {
    fontSize: 9,
    color: "#C9D6E8",
    marginBottom: 3,
  },

  activityTime: {
    fontSize: 9,
    color: "#8FA5C1",
  },

  activityAmountContainer: {
    alignItems: "flex-end",
  },

  activityAmount: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 3,
  },

  activityStatus: {
    fontSize: 8,
    fontWeight: "900",
    color: "#5BC0FF",
    letterSpacing: 0.5,
  },

  activityDivider: {
    height: 1,
    backgroundColor: "#1D4775",
  },

  payoutCard: {
    backgroundColor: "#173C68",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#24578A",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  payoutIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#071A3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  payoutIcon: {
    fontSize: 17,
    fontWeight: "900",
    color: "#5BC0FF",
  },

  payoutTextContainer: {
    flex: 1,
  },

  payoutTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 3,
  },

  payoutDescription: {
    fontSize: 9,
    lineHeight: 14,
    color: "#8FA5C1",
  },

  payoutAmount: {
    fontSize: 16,
    fontWeight: "900",
    color: "#5BC0FF",
  },

  infoCard: {
    backgroundColor: "#102A52",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1D4775",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  infoIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#173C68",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  infoIcon: {
    fontSize: 16,
    fontWeight: "900",
    color: "#5BC0FF",
  },

  infoTextContainer: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 3,
  },

  infoText: {
    fontSize: 10,
    lineHeight: 15,
    color: "#8FA5C1",
  },

  bottomNav: {
    height: 76,
    backgroundColor: "#0B2247",
    borderTopWidth: 1,
    borderTopColor: "#1D4775",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 6,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 65,
  },

  activeNavItem: {
    opacity: 1,
  },

  navIcon: {
    fontSize: 20,
    color: "#8FA5C1",
    marginBottom: 3,
  },

  activeNavIcon: {
    color: "#5BC0FF",
  },

  navText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#8FA5C1",
  },

  activeNavText: {
    color: "#5BC0FF",
  },
});
