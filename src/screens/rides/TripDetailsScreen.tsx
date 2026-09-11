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
  PinIcon,
  TargetIcon,
  StarIcon,
  CreditCardIcon,
  CheckCircleIcon,
} from "../../components/common/SvgIcons";
import { useRide } from "../../services/RideContext";

export default function TripDetailsScreen({
  navigation,
  route,
}: RootStackScreenProps<"TripDetails">) {
  const { rideHistory, setPickupLocation, setDestinationLocation } = useRide();
  const tripId = route.params?.tripId;

  const trip =
    rideHistory.find((t) => t.id === tripId) ||
    rideHistory[0] || {
      id: "TRIP-9081",
      date: "10 Sep 2026, 18:45",
      pickup: "14 Long St, Cape Town",
      destination: "Camps Bay Beach, Cape Town",
      fare: 75,
      tip: 15,
      total: 90,
      tier: "comfort",
      driverName: "Sipho Khumalo",
      rating: 5,
      distance: "7.8 km",
    };

  const tierLabel = trip.tier.charAt(0).toUpperCase() + trip.tier.slice(1);

  const handleRebook = () => {
    setPickupLocation(trip.pickup, "Cape Town, South Africa");
    setDestinationLocation(trip.destination, "Cape Town, South Africa", trip.distance);
    navigation.navigate("RiderHome");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Nav Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Trip Details</Text>
        <View style={styles.navSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Hero */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.tripIdText}>{trip.id}</Text>
              <Text style={styles.tripDateText}>{trip.date}</Text>
            </View>
            <View style={styles.checkWrap}>
              <CheckCircleIcon size={28} color={colors.accent.primary} />
            </View>
          </View>
          <Text style={styles.totalPrice}>R{trip.total}.00</Text>
          <Text style={styles.tierTag}>{tierLabel} Ride</Text>
        </View>

        {/* Route Card */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Route ({trip.distance})</Text>

          <View style={styles.locationRow}>
            <View style={styles.pinCircle}>
              <PinIcon size={16} color={colors.accent.primary} />
            </View>
            <View style={styles.locationTextWrap}>
              <Text style={styles.locationType}>PICKUP</Text>
              <Text style={styles.locationTitle}>{trip.pickup}</Text>
            </View>
          </View>

          <View style={styles.connector} />

          <View style={styles.locationRow}>
            <View style={styles.targetCircle}>
              <TargetIcon size={16} color={colors.accent.secondary} />
            </View>
            <View style={styles.locationTextWrap}>
              <Text style={styles.locationType}>DESTINATION</Text>
              <Text style={styles.locationTitle}>{trip.destination}</Text>
            </View>
          </View>
        </View>

        {/* Driver Card */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Driver Information</Text>

          <View style={styles.driverRow}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {trip.driverName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Text>
            </View>
            <View style={styles.driverMeta}>
              <Text style={styles.driverName}>{trip.driverName}</Text>
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIcon
                    key={s}
                    size={14}
                    color={colors.accent.primary}
                    filled={s <= trip.rating}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Payment Summary */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>Fare Breakdown</Text>

          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Trip Fare ({tierLabel})</Text>
            <Text style={styles.fareValue}>R{trip.fare}.00</Text>
          </View>

          {trip.tip > 0 && (
            <View style={styles.fareRow}>
              <Text style={styles.fareLabel}>Driver Tip</Text>
              <Text style={styles.fareValue}>R{trip.tip}.00</Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.fareRow}>
            <Text style={styles.fareTotalLabel}>Total Paid</Text>
            <Text style={styles.fareTotalValue}>R{trip.total}.00</Text>
          </View>

          <View style={styles.paymentMethod}>
            <CreditCardIcon size={18} color={colors.accent.primary} />
            <Text style={styles.paymentMethodText}>RideGo Wallet</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.rebookButton}
            activeOpacity={0.85}
            onPress={handleRebook}
          >
            <Text style={styles.rebookButtonText}>Book This Route Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.receiptButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("TripReceipt")}
          >
            <Text style={styles.receiptButtonText}>View Full Receipt</Text>
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
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginVertical: spacing.md,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  tripIdText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  tripDateText: {
    fontSize: 13,
    color: colors.text.muted,
    marginTop: 2,
  },
  checkWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  totalPrice: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.accent.primary,
    marginTop: spacing.sm,
  },
  tierTag: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text.secondary,
    marginTop: 2,
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
  connector: {
    width: 2,
    height: 16,
    backgroundColor: colors.surface.border,
    marginLeft: 15,
    marginVertical: 2,
  },
  locationTextWrap: {
    flex: 1,
  },
  locationType: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.text.muted,
  },
  locationTitle: {
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
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface.cardAlt,
    borderWidth: 2,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  driverMeta: {
    flex: 1,
  },
  driverName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text.primary,
  },
  starsRow: {
    flexDirection: "row",
    gap: 3,
    marginTop: 3,
  },
  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  fareLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  fareValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.surface.border,
    marginVertical: spacing.xs,
  },
  fareTotalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  fareTotalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  paymentMethod: {
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
  actionButtons: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  rebookButton: {
    backgroundColor: colors.accent.primary,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  rebookButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
  receiptButton: {
    backgroundColor: colors.surface.card,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  receiptButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.accent.primary,
  },
});
