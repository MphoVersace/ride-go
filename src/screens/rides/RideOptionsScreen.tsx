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
  SeatIcon,
  ShieldCheckIcon,
} from "../../components/common/SvgIcons";
import { VehicleSideSvg } from "../../components/common/VehicleSvgs";
import { useRide, RideTier } from "../../services/RideContext";

interface TierOption {
  key: RideTier;
  name: string;
  desc: string;
  seats: number;
  eta: string;
}

const tiersData: TierOption[] = [
  {
    key: "standard",
    name: "Standard",
    desc: "Everyday Toyota Prius hybrid, swift & economical",
    seats: 4,
    eta: "3 min",
  },
  {
    key: "comfort",
    name: "Comfort",
    desc: "Spacious legroom, newest models, highly rated",
    seats: 4,
    eta: "4 min",
  },
  {
    key: "luxury",
    name: "Luxury",
    desc: "Premium executive ride, quiet & refined comfort",
    seats: 4,
    eta: "6 min",
  },
];

export default function RideOptionsScreen({
  navigation,
}: RootStackScreenProps<"RideOptions">) {
  const { pickup, destination, tier, tierFares, selectTier, startSearch } =
    useRide();

  const handleConfirm = () => {
    startSearch();
    navigation.navigate("RideSearching");
  };

  const currentFare = tierFares[tier];
  const currentTierName = tier.charAt(0).toUpperCase() + tier.slice(1);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Nav Header */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Choose Ride Option</Text>
        <View style={styles.navSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Route Card */}
        <View style={styles.routeCard}>
          <View style={styles.routeRow}>
            <PinIcon size={16} color={colors.accent.primary} />
            <Text style={styles.routeText} numberOfLines={1}>
              {pickup.title}
            </Text>
          </View>
          <View style={styles.routeDivider} />
          <View style={styles.routeRow}>
            <TargetIcon size={16} color={colors.accent.secondary} />
            <Text style={styles.routeText} numberOfLines={1}>
              {destination.title}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>Available Vehicle Tiers</Text>

        {/* Tier Cards */}
        {tiersData.map((item) => {
          const isSelected = tier === item.key;
          const fare = tierFares[item.key];

          return (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.tierCard,
                isSelected && styles.tierCardActive,
              ]}
              activeOpacity={0.85}
              onPress={() => selectTier(item.key)}
            >
              {/* Left Vehicle Vector Art */}
              <View style={styles.vehicleArtBox}>
                <VehicleSideSvg
                  width={72}
                  height={34}
                  color={isSelected ? colors.accent.primary : colors.text.secondary}
                />
              </View>

              {/* Middle Details */}
              <View style={styles.tierInfo}>
                <View style={styles.tierTitleRow}>
                  <Text style={styles.tierName}>{item.name}</Text>
                  <View style={styles.seatsRow}>
                    <SeatIcon size={14} color={colors.text.muted} />
                    <Text style={styles.seatsText}>{item.seats}</Text>
                  </View>
                </View>
                <Text style={styles.tierDesc}>{item.desc}</Text>
                <Text style={styles.tierEta}>ETA: {item.eta}</Text>
              </View>

              {/* Right Fare */}
              <View style={styles.tierPriceBox}>
                <Text style={styles.tierPrice}>R{fare}.00</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Safety Note */}
        <View style={styles.safetyCard}>
          <ShieldCheckIcon size={20} color={colors.accent.primary} />
          <Text style={styles.safetyText}>
            All RideGo trips include 24/7 incident response, GPS tracking, and verified drivers.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom CTA Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomFareSummary}>
          <Text style={styles.bottomFareLabel}>Estimated Total</Text>
          <Text style={styles.bottomFareValue}>R{currentFare}.00</Text>
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.85}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>
            Request {currentTierName}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 110,
  },
  routeCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginVertical: spacing.md,
    gap: 8,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  routeDivider: {
    height: 1,
    backgroundColor: colors.surface.border,
    marginHorizontal: spacing.xs,
  },
  routeText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  tierCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  tierCardActive: {
    borderColor: colors.accent.primary,
    backgroundColor: colors.surface.cardAlt,
  },
  vehicleArtBox: {
    width: 72,
    alignItems: "center",
    justifyContent: "center",
  },
  tierInfo: {
    flex: 1,
  },
  tierTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tierName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  seatsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  seatsText: {
    fontSize: 12,
    color: colors.text.muted,
  },
  tierDesc: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
    lineHeight: 16,
  },
  tierEta: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.accent.primary,
    marginTop: 4,
  },
  tierPriceBox: {
    alignItems: "flex-end",
  },
  tierPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  safetyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  safetyText: {
    flex: 1,
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 16,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface.card,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.surface.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  bottomFareSummary: {
    flex: 1,
  },
  bottomFareLabel: {
    fontSize: 11,
    color: colors.text.muted,
    textTransform: "uppercase",
  },
  bottomFareValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  confirmButton: {
    backgroundColor: colors.accent.primary,
    paddingHorizontal: spacing.lg,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
});
