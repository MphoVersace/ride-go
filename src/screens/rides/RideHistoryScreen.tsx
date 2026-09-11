import React from "react";
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
  TargetIcon,
  StarIcon,
  CheckCircleIcon,
} from "../../components/common/SvgIcons";
import { useRide } from "../../services/RideContext";

export default function RideHistoryScreen({
  navigation,
}: RootStackScreenProps<"RideHistory">) {
  const { rideHistory } = useRide();

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
        <Text style={styles.appBarTitle}>Your Trips</Text>
        <View style={styles.appBarSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={styles.summaryTitle}>Trip Activity</Text>
              <Text style={styles.summarySubtitle}>
                {rideHistory.length} completed {rideHistory.length === 1 ? "ride" : "rides"} in South Africa
              </Text>
            </View>
            <View style={styles.badgeCircle}>
              <CheckCircleIcon size={24} color={colors.accent.primary} />
            </View>
          </View>
        </View>

        <Text style={styles.sectionHeader}>Recent Trips</Text>

        {rideHistory.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No rides taken yet</Text>
            <Text style={styles.emptySubtitle}>
              When you complete a ride, details will be listed here.
            </Text>
            <TouchableOpacity
              style={styles.bookNowButton}
              activeOpacity={0.85}
              onPress={() => navigation.navigate("RiderHome")}
            >
              <Text style={styles.bookNowText}>Book a Ride</Text>
            </TouchableOpacity>
          </View>
        ) : (
          rideHistory.map((trip) => {
            const tierLabel =
              trip.tier.charAt(0).toUpperCase() + trip.tier.slice(1);

            return (
              <TouchableOpacity
                key={trip.id}
                style={styles.tripCard}
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate("TripDetails", { tripId: trip.id })
                }
              >
                {/* Trip Header Row */}
                <View style={styles.tripTopRow}>
                  <View>
                    <Text style={styles.tripTier}>{tierLabel}</Text>
                    <Text style={styles.tripDate}>{trip.date}</Text>
                  </View>
                  <View style={styles.priceContainer}>
                    <Text style={styles.tripPrice}>R{trip.total}.00</Text>
                    {trip.tip > 0 && (
                      <Text style={styles.tripTipText}>(incl. R{trip.tip} tip)</Text>
                    )}
                  </View>
                </View>

                {/* Route */}
                <View style={styles.routeBox}>
                  <View style={styles.routePoint}>
                    <PinIcon size={14} color={colors.accent.primary} />
                    <Text style={styles.routeText} numberOfLines={1}>
                      {trip.pickup}
                    </Text>
                  </View>
                  <View style={styles.routePoint}>
                    <TargetIcon size={14} color={colors.accent.secondary} />
                    <Text style={styles.routeText} numberOfLines={1}>
                      {trip.destination}
                    </Text>
                  </View>
                </View>

                {/* Driver and Rating Footer */}
                <View style={styles.tripFooter}>
                  <View style={styles.driverSection}>
                    <Text style={styles.driverName}>Driver: {trip.driverName}</Text>
                    <View style={styles.starsRow}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <StarIcon
                          key={s}
                          size={12}
                          color={colors.accent.primary}
                          filled={s <= trip.rating}
                        />
                      ))}
                    </View>
                  </View>

                  <View style={styles.arrowCircle}>
                    <ArrowRightIcon size={16} color={colors.accent.primary} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
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
    paddingHorizontal: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  appBarSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  summaryCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginVertical: spacing.md,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  summarySubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 3,
  },
  badgeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tripCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.sm,
  },
  tripTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.xs,
  },
  tripTier: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  tripDate: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 2,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  tripPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  tripTipText: {
    fontSize: 11,
    color: colors.text.muted,
    marginTop: 2,
  },
  routeBox: {
    backgroundColor: colors.surface.cardAlt,
    borderRadius: 12,
    padding: spacing.xs,
    marginVertical: spacing.xs,
    gap: 6,
  },
  routePoint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  routeText: {
    flex: 1,
    fontSize: 13,
    color: colors.text.secondary,
  },
  tripFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xs,
  },
  driverSection: {
    flex: 1,
  },
  driverName: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text.primary,
  },
  starsRow: {
    flexDirection: "row",
    gap: 2,
    marginTop: 3,
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginTop: spacing.lg,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  bookNowButton: {
    backgroundColor: colors.accent.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  bookNowText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
});
