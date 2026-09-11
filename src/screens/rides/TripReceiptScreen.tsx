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
  CheckCircleIcon,
  PinIcon,
  TargetIcon,
  CreditCardIcon,
  StarIcon,
} from "../../components/common/SvgIcons";
import { useRide } from "../../services/RideContext";

export default function TripReceiptScreen({
  navigation,
}: RootStackScreenProps<"TripReceipt">) {
  const { rideHistory, driver, tier, tierFares, resetRide } = useRide();

  // Pick the latest completed trip or fall back to current context values
  const latestTrip = rideHistory[0];
  const fare = latestTrip?.fare ?? tierFares[tier];
  const tip = latestTrip?.tip ?? 0;
  const total = latestTrip?.total ?? fare + tip;
  const tripId = latestTrip?.id ?? "TRIP-9024";
  const tripDate = latestTrip?.date ?? "Today, just now";
  const pickupName = latestTrip?.pickup ?? "14 Long St, Cape Town";
  const destinationName = latestTrip?.destination ?? "V&A Waterfront";
  const driverName = latestTrip?.driverName ?? driver.name;
  const tierName = latestTrip?.tier
    ? latestTrip.tier.charAt(0).toUpperCase() + latestTrip.tier.slice(1)
    : tier.charAt(0).toUpperCase() + tier.slice(1);

  const handleDone = () => {
    resetRide();
    navigation.navigate("RiderHome");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={handleDone}
        >
          <ArrowLeftIcon size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Trip Receipt</Text>
        <View style={styles.navSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Header */}
        <View style={styles.header}>
          <View style={styles.successIconWrapper}>
            <CheckCircleIcon size={44} color={colors.accent.primary} />
          </View>
          <Text style={styles.totalAmount}>R{total}.00</Text>
          <Text style={styles.subtext}>Payment Completed via Wallet</Text>
          <Text style={styles.tripIdText}>{tripId} • {tripDate}</Text>
        </View>

        {/* Route Card */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Route Summary</Text>

          <View style={styles.locationRow}>
            <View style={styles.pinCircle}>
              <PinIcon size={16} color={colors.accent.primary} />
            </View>
            <View style={styles.locationTextWrap}>
              <Text style={styles.locationTypeLabel}>PICKUP</Text>
              <Text style={styles.locationName}>{pickupName}</Text>
            </View>
          </View>

          <View style={styles.routeConnectorLine} />

          <View style={styles.locationRow}>
            <View style={styles.targetCircle}>
              <TargetIcon size={16} color={colors.accent.secondary} />
            </View>
            <View style={styles.locationTextWrap}>
              <Text style={styles.locationTypeLabel}>DESTINATION</Text>
              <Text style={styles.locationName}>{destinationName}</Text>
            </View>
          </View>
        </View>

        {/* Driver Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Driver & Vehicle</Text>

          <View style={styles.driverRow}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverAvatarText}>
                {driverName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </View>
            <View style={styles.driverInfoWrap}>
              <Text style={styles.driverNameText}>{driverName}</Text>
              <View style={styles.driverRatingRow}>
                <StarIcon size={14} color={colors.accent.primary} filled />
                <Text style={styles.driverRatingText}>
                  {driver.rating} • {tierName}
                </Text>
              </View>
            </View>
            <View style={styles.vehicleInfoWrap}>
              <Text style={styles.vehicleModel}>{driver.carModel}</Text>
              <Text style={styles.vehiclePlate}>{driver.licensePlate}</Text>
            </View>
          </View>
        </View>

        {/* Itemized Fare Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Fare Breakdown</Text>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Base Fare ({tierName})</Text>
            <Text style={styles.breakdownValue}>R{fare}.00</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Service & Platform Fee</Text>
            <Text style={styles.breakdownValue}>R0.00</Text>
          </View>

          {tip > 0 && (
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Driver Tip</Text>
              <Text style={styles.breakdownValue}>R{tip}.00</Text>
            </View>
          )}

          <View style={styles.cardDivider} />

          <View style={styles.breakdownRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>R{total}.00</Text>
          </View>

          {/* Payment Method */}
          <View style={styles.paymentMethodRow}>
            <CreditCardIcon size={20} color={colors.accent.primary} />
            <Text style={styles.paymentMethodText}>
              RideGo Wallet • Auto-deducted
            </Text>
          </View>
        </View>

        {/* Action CTAs */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={handleDone}
          >
            <Text style={styles.primaryButtonText}>Book Another Ride</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("RideHistory")}
          >
            <Text style={styles.secondaryButtonText}>View All Ride History</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  navBar: {
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
  navTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  navSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  header: {
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  successIconWrapper: {
    marginBottom: spacing.sm,
  },
  totalAmount: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  subtext: {
    fontSize: 14,
    color: colors.accent.primary,
    fontWeight: "600",
    marginTop: 4,
  },
  tripIdText: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.md,
  },
  cardSectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  pinCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  targetCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  routeConnectorLine: {
    width: 2,
    height: 16,
    backgroundColor: colors.surface.border,
    marginLeft: 15,
    marginVertical: 2,
  },
  locationTextWrap: {
    flex: 1,
  },
  locationTypeLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.text.muted,
  },
  locationName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
    marginTop: 1,
  },
  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  driverAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.accent.primary,
  },
  driverAvatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  driverInfoWrap: {
    flex: 1,
  },
  driverNameText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text.primary,
  },
  driverRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  driverRatingText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  vehicleInfoWrap: {
    alignItems: "flex-end",
  },
  vehicleModel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text.primary,
  },
  vehiclePlate: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 2,
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },
  breakdownLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  breakdownValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
  },
  cardDivider: {
    height: 1,
    backgroundColor: colors.surface.border,
    marginVertical: spacing.sm,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  paymentMethodRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.surface.border,
  },
  paymentMethodText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  actionsContainer: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.accent.primary,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
  secondaryButton: {
    backgroundColor: colors.surface.card,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.accent.primary,
  },
});
