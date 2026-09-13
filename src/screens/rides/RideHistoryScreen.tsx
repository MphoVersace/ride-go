import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackScreenProps } from "../../navigation/types";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/metrics";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PinIcon,
  CheckCircleIcon,
  DownloadIcon,
  SteeringWheelIcon,
  WalletIcon,
  TreeLeafIcon,
  StarIcon,
  ReceiptIcon,
} from "../../components/common/SvgIcons";
import { useRide } from "../../services/RideContext";
import BottomTabBar, { TabKey } from "../../components/common/BottomTabBar";

type HistoryTabKey = "past" | "upcoming" | "business";

export default function RideHistoryScreen({
  navigation,
}: RootStackScreenProps<any>) {
  const { rideHistory } = useRide();
  const [activeTab, setActiveTab] = useState<HistoryTabKey>("past");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleTabPress = (tab: TabKey) => {
    if (tab === "explore" || tab === "home") {
      navigation.navigate("Explore");
    } else if (tab === "rides") {
      navigation.navigate("Rides");
    } else if (tab === "activity" || tab === "trips") {
      // Current tab
    } else if (tab === "account" || tab === "profile") {
      navigation.navigate("Account");
    }
  };

  const filterOptions = [
    { key: "all", label: "All Rides" },
    { key: "30days", label: "Last 30 Days" },
    { key: "personal", label: "Personal" },
    { key: "eco", label: "Eco / Electric" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Top App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Ride Activity & History</Text>
        <View style={styles.appBarSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Interactive Header Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "past" && styles.tabButtonActive,
            ]}
            activeOpacity={0.8}
            onPress={() => setActiveTab("past")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "past" && styles.tabButtonTextActive,
              ]}
            >
              Past Trips ({rideHistory.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "upcoming" && styles.tabButtonActive,
            ]}
            activeOpacity={0.8}
            onPress={() => setActiveTab("upcoming")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "upcoming" && styles.tabButtonTextActive,
              ]}
            >
              Upcoming (1)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "business" && styles.tabButtonActive,
            ]}
            activeOpacity={0.8}
            onPress={() => setActiveTab("business")}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === "business" && styles.tabButtonTextActive,
              ]}
            >
              Business
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stat Metrics Bento Grid */}
        <View style={styles.bentoGrid}>
          {/* Bento Card 1: Total Trips */}
          <View style={styles.bentoCard}>
            <View style={styles.bentoHeaderRow}>
              <Text style={styles.bentoLabel}>TRIPS</Text>
              <SteeringWheelIcon size={16} color={colors.accent.primary} />
            </View>
            <View style={styles.bentoValueWrap}>
              <Text style={styles.bentoValueNumber}>
                {Math.max(28, rideHistory.length)}
              </Text>
              <Text style={styles.bentoSubtext}>All-time</Text>
            </View>
          </View>

          {/* Bento Card 2: ZAR Saved */}
          <View style={styles.bentoCard}>
            <View style={styles.bentoHeaderRow}>
              <Text style={styles.bentoLabelYellow}>SAVED</Text>
              <WalletIcon size={16} color={colors.accent.primary} />
            </View>
            <View style={styles.bentoValueWrap}>
              <Text style={styles.bentoValueYellow}>R380</Text>
              <Text style={styles.bentoSubtext}>EV Pass</Text>
            </View>
          </View>

          {/* Bento Card 3: Top Rider Rating */}
          <View style={styles.bentoCard}>
            <View style={styles.bentoHeaderRow}>
              <Text style={styles.bentoLabel}>RATING</Text>
              <StarIcon size={15} color={colors.accent.primary} />
            </View>
            <View style={styles.bentoValueWrap}>
              <Text style={styles.bentoValueNumber}>4.98</Text>
              <Text style={styles.bentoSubtext}>Top Rider</Text>
            </View>
          </View>
        </View>

        {/* Active Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterChipsRow}
        >
          {filterOptions.map((filter) => {
            const isSelected = selectedFilter === filter.key;
            return (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterChip,
                  isSelected && styles.filterChipActive,
                ]}
                activeOpacity={0.8}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected && styles.filterChipTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Month Group Header & Statement Action */}
        <View style={styles.feedHeaderRow}>
          <Text style={styles.feedHeaderTitle}>October 2024</Text>
          <TouchableOpacity
            style={styles.downloadStatementButton}
            activeOpacity={0.8}
          >
            <Text style={styles.downloadStatementText}>Statement</Text>
            <DownloadIcon size={14} color={colors.accent.primary} />
          </TouchableOpacity>
        </View>

        {/* Trip List: Dynamic History or Stitch Featured History */}
        {rideHistory.length > 0 ? (
          rideHistory.map((trip) => {
            const tierLabel =
              trip.tier === "standard"
                ? "Volt Eco"
                : trip.tier === "comfort"
                ? "Go Comfort"
                : "Go Exec";

            return (
              <TouchableOpacity
                key={trip.id}
                style={styles.tripCard}
                activeOpacity={0.88}
                onPress={() =>
                  navigation.navigate("TripDetails", { tripId: trip.id })
                }
              >
                <View style={styles.tripTopRow}>
                  <View>
                    <Text style={styles.tripTier}>{tierLabel}</Text>
                    <Text style={styles.tripDate}>{trip.date}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.tripPrice}>R{trip.total}.00</Text>
                    {trip.tip > 0 && (
                      <Text style={styles.tripTipText}>
                        (incl. R{trip.tip} tip)
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.routeBox}>
                  <View style={styles.routePoint}>
                    <View style={styles.pickupDot} />
                    <Text style={styles.routeText} numberOfLines={1}>
                      {trip.pickup}
                    </Text>
                  </View>
                  <View style={styles.verticalRouteLine} />
                  <View style={styles.routePoint}>
                    <View style={styles.destDot} />
                    <Text style={styles.routeText} numberOfLines={1}>
                      {trip.destination}
                    </Text>
                  </View>
                </View>

                <View style={styles.tripFooter}>
                  <Text style={styles.driverInfoText}>
                    Driver: {trip.driverName} • {trip.distance || "12.4 km"}
                  </Text>
                  <View style={styles.viewDetailsRow}>
                    <Text style={styles.viewDetailsText}>Receipt</Text>
                    <ArrowRightIcon size={12} color={colors.accent.primary} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.stitchTripsStack}>
            {/* Featured Trip 1: Volt Comfort EV */}
            <View style={styles.tripCard}>
              <View style={styles.tripTopRow}>
                <View>
                  <Text style={styles.tripTier}>Volt Comfort EV</Text>
                  <Text style={styles.tripDate}>Yesterday • 8:15 PM</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.tripPrice}>R125.00</Text>
                  <Text style={styles.tripStatusCompleted}>Completed</Text>
                </View>
              </View>

              <View style={styles.routeBox}>
                <View style={styles.routePoint}>
                  <View style={styles.pickupDot} />
                  <Text style={styles.routeText} numberOfLines={1}>
                    V&A Waterfront (Breakwater Blvd, Cape Town)
                  </Text>
                </View>
                <View style={styles.verticalRouteLine} />
                <View style={styles.routePoint}>
                  <View style={styles.destDot} />
                  <Text style={styles.routeText} numberOfLines={1}>
                    Camps Bay Promenade (Victoria Rd)
                  </Text>
                </View>
              </View>

              <View style={styles.tripFooter}>
                <Text style={styles.driverInfoText}>
                  Driven by Marcus (Polestar 2) • 5.0
                </Text>
                <View style={styles.viewDetailsRow}>
                  <Text style={styles.viewDetailsText}>Rebook Ride</Text>
                  <ArrowRightIcon size={12} color={colors.accent.primary} />
                </View>
              </View>
            </View>

            {/* Featured Trip 2: Volt Black Exec */}
            <View style={styles.tripCard}>
              <View style={styles.tripTopRow}>
                <View>
                  <Text style={styles.tripTier}>Volt Black Exec</Text>
                  <Text style={styles.tripDate}>Oct 12 • 11:30 AM</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.tripPrice}>R280.00</Text>
                  <Text style={styles.tripStatusCompleted}>Completed</Text>
                </View>
              </View>

              <View style={styles.routeBox}>
                <View style={styles.routePoint}>
                  <View style={styles.pickupDot} />
                  <Text style={styles.routeText} numberOfLines={1}>
                    Cape Town Int'l Airport (CPT Terminal 2)
                  </Text>
                </View>
                <View style={styles.verticalRouteLine} />
                <View style={styles.routePoint}>
                  <View style={styles.destDot} />
                  <Text style={styles.routeText} numberOfLines={1}>
                    Century City (Bridgeway Precinct, Cape Town)
                  </Text>
                </View>
              </View>

              <View style={styles.tripFooter}>
                <Text style={styles.driverInfoText}>
                  You rated: 5.0 • Exec Saloon
                </Text>
                <View style={styles.viewDetailsRow}>
                  <Text style={styles.viewDetailsText}>View Receipt</Text>
                  <ReceiptIcon size={14} color={colors.accent.primary} />
                </View>
              </View>
            </View>

            {/* Featured Trip 3: Volt Eco Zero CO2 */}
            <View style={styles.tripCard}>
              <View style={styles.tripTopRow}>
                <View>
                  <Text style={styles.tripTier}>Volt Eco Zero CO2</Text>
                  <Text style={styles.tripDate}>Oct 9 • 6:45 PM</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.tripPrice}>R75.00</Text>
                  <Text style={styles.tripStatusCompleted}>Completed</Text>
                </View>
              </View>

              <View style={styles.routeBox}>
                <View style={styles.routePoint}>
                  <View style={styles.pickupDot} />
                  <Text style={styles.routeText} numberOfLines={1}>
                    Green Point (Somerset Road, Cape Town)
                  </Text>
                </View>
                <View style={styles.verticalRouteLine} />
                <View style={styles.routePoint}>
                  <View style={styles.destDot} />
                  <Text style={styles.routeText} numberOfLines={1}>
                    Kloof Street (Gardens, Cape Town)
                  </Text>
                </View>
              </View>

              <View style={styles.tripFooter}>
                <Text style={styles.driverInfoText}>
                  Paid with Apple Pay (•••• 4019)
                </Text>
                <View style={styles.viewDetailsRow}>
                  <Text style={styles.viewDetailsText}>Rebook</Text>
                  <ArrowRightIcon size={12} color={colors.accent.primary} />
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Environmental Impact Summary Card */}
        <View style={styles.environmentalCard}>
          <View style={styles.environmentalHeader}>
            <View style={styles.environmentalIconBox}>
              <TreeLeafIcon size={20} color={colors.accent.primary} />
            </View>
            <View style={styles.environmentalTitleWrap}>
              <Text style={styles.environmentalTitle}>114 kg CO2 Saved</Text>
              <Text style={styles.environmentalTag}>100% Electric Fleets</Text>
            </View>
          </View>
          <Text style={styles.environmentalDescription}>
            Your EV rides this month equivalent to planting 6 indigenous
            yellowwood trees in Kirstenbosch Gardens.
          </Text>
        </View>

        {/* Activity Settings & Enterprise Section */}
        <View style={styles.enterpriseSection}>
          <TouchableOpacity
            style={styles.enterpriseItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Settings")}
          >
            <View style={styles.enterpriseInfo}>
              <Text style={styles.enterpriseTitle}>Add Business Profile</Text>
              <Text style={styles.enterpriseSubtitle}>
                Automate expensing to Concur or Expensify
              </Text>
            </View>
            <ArrowRightIcon size={16} color={colors.accent.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.enterpriseItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("PaymentMethods")}
          >
            <View style={styles.enterpriseInfo}>
              <Text style={styles.enterpriseTitle}>Payment Methods & Wallets</Text>
              <Text style={styles.enterpriseSubtitle}>
                Volt Cash (R150.00), Apple Pay, Visa
              </Text>
            </View>
            <ArrowRightIcon size={16} color={colors.accent.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.enterpriseItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("HelpSupport")}
          >
            <View style={styles.enterpriseInfo}>
              <Text style={styles.enterpriseTitle}>Help with a Past Trip</Text>
              <Text style={styles.enterpriseSubtitle}>
                Find lost items, report route issues
              </Text>
            </View>
            <ArrowRightIcon size={16} color={colors.accent.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 4-Tab Navigation Bar */}
      <BottomTabBar activeTab="activity" onSelectTab={handleTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  appBar: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface.card,
    borderWidth: 1,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  appBarTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text.primary,
    letterSpacing: -0.2,
  },
  appBarSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 96,
    gap: spacing.md,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: colors.surface.card,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButtonActive: {
    backgroundColor: colors.accent.primary,
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text.secondary,
  },
  tabButtonTextActive: {
    color: colors.accent.contrast,
  },
  bentoGrid: {
    flexDirection: "row",
    gap: 8,
  },
  bentoCard: {
    flex: 1,
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.surface.border,
    justifyContent: "space-between",
    minHeight: 88,
  },
  bentoHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bentoLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.text.secondary,
    letterSpacing: 1,
  },
  bentoLabelYellow: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.accent.primary,
    letterSpacing: 1,
  },
  bentoValueWrap: {
    marginTop: 6,
  },
  bentoValueNumber: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.text.primary,
  },
  bentoValueYellow: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.accent.primary,
  },
  bentoSubtext: {
    fontSize: 10,
    color: colors.text.muted,
    marginTop: 1,
  },
  filterChipsRow: {
    gap: 8,
  },
  filterChip: {
    backgroundColor: colors.surface.card,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  filterChipActive: {
    backgroundColor: colors.surface.elevated,
    borderColor: colors.accent.primary,
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.text.secondary,
  },
  filterChipTextActive: {
    color: colors.accent.primary,
  },
  feedHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  feedHeaderTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.text.secondary,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  downloadStatementButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  downloadStatementText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  tripCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: spacing.sm,
  },
  tripTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  tripTier: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text.primary,
  },
  tripDate: {
    fontSize: 11,
    color: colors.text.muted,
    marginTop: 2,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  tripPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text.primary,
  },
  tripTipText: {
    fontSize: 10,
    color: colors.text.secondary,
    marginTop: 2,
  },
  routeBox: {
    gap: 4,
    paddingVertical: 4,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.primary,
  },
  destDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: colors.text.primary,
  },
  verticalRouteLine: {
    width: 2,
    height: 8,
    backgroundColor: colors.surface.border,
    marginLeft: 3,
  },
  routeText: {
    fontSize: 12,
    color: colors.text.primary,
    flex: 1,
  },
  tripFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.surface.border,
    paddingTop: 8,
    marginTop: 2,
  },
  driverInfoText: {
    fontSize: 11,
    color: colors.text.muted,
  },
  viewDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  viewDetailsText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  emptyCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: spacing.sm,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 18,
  },
  bookNowButton: {
    marginTop: spacing.sm,
    backgroundColor: colors.accent.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  bookNowText: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.accent.contrast,
  },
  stitchTripsStack: {
    gap: spacing.md,
  },
  tripStatusCompleted: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.accent.primary,
    textTransform: "uppercase",
    marginTop: 2,
    letterSpacing: 0.5,
  },
  environmentalCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  environmentalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  environmentalIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surface.elevated,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  environmentalTitleWrap: {
    flex: 1,
  },
  environmentalTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text.primary,
  },
  environmentalTag: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.accent.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 1,
  },
  environmentalDescription: {
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  enterpriseSection: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surface.border,
    overflow: "hidden",
    marginTop: spacing.sm,
  },
  enterpriseItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.border,
  },
  enterpriseInfo: {
    flex: 1,
    gap: 2,
  },
  enterpriseTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.text.primary,
  },
  enterpriseSubtitle: {
    fontSize: 11,
    color: colors.text.muted,
  },
});
