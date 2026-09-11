import React, { useState } from "react";
import {
  Image,
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
  BellIcon,
  PinIcon,
  SwapArrowsIcon,
  SteeringWheelIcon,
  PackageIcon,
  SeatIcon,
  StarIcon,
  ArrowRightIcon,
} from "../../components/common/SvgIcons";
import DarkRouteMap from "../../components/common/DarkRouteMap";
import { VehicleSideSvg } from "../../components/common/VehicleSvgs";
import { useRide } from "../../services/RideContext";

export default function RiderHomeScreen({
  navigation,
}: RootStackScreenProps<"RiderHome">) {
  const { pickup, destination, tier, selectTier, tierFares, startSearch } =
    useRide();
  const [selectedService, setSelectedService] = useState<"driver" | "package">(
    "driver"
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Top Header Bar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.notificationButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Notifications")}
          >
            <BellIcon size={22} color={colors.text.primary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.profileChip}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("RiderProfile")}
        >
          <View style={styles.profileAvatar}>
            <Text style={styles.avatarInitial}>T</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title Headline */}
        <Text style={styles.title}>Where do you{"\n"}want to go?</Text>

        {/* Favorite Driver / Top Match Chip */}
        <TouchableOpacity
          style={styles.driverHighlightChip}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("DriverFound")}
        >
          <View style={styles.highlightAvatar}>
            <Text style={styles.highlightAvatarText}>UB</Text>
          </View>
          <View style={styles.highlightInfo}>
            <Text style={styles.highlightName}>Ucok Behel</Text>
            <Text style={styles.highlightVehicle}>Honda CR-V • AB6299ZG</Text>
          </View>
          <View style={styles.ratingStars}>
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon key={i} size={14} color={colors.accent.primary} />
            ))}
          </View>
        </TouchableOpacity>

        {/* Stacked Location Pill Cards */}
        <View style={styles.locationCardGroup}>
          <TouchableOpacity
            style={styles.locationPill}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("DestinationSearch")}
          >
            <View style={styles.pillIconWrap}>
              <PinIcon size={18} color={colors.accent.primary} />
            </View>
            <Text style={styles.locationPillText}>{pickup.title}</Text>
          </TouchableOpacity>

          {/* Inline Flip/Swap Button */}
          <TouchableOpacity
            style={styles.swapButton}
            activeOpacity={0.8}
          >
            <SwapArrowsIcon size={16} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.locationPill}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("DestinationSearch")}
          >
            <View style={styles.pillIconWrap}>
              <PinIcon size={18} color={colors.text.secondary} />
            </View>
            <Text
              style={
                destination.title
                  ? styles.locationPillText
                  : styles.locationPlaceholderText
              }
            >
              {destination.title || "Add your destination"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Service Type Switcher (Driver vs Package) */}
        <View style={styles.serviceSelector}>
          <TouchableOpacity
            style={[
              styles.servicePill,
              selectedService === "driver" && styles.servicePillActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setSelectedService("driver")}
          >
            <SteeringWheelIcon
              size={18}
              color={
                selectedService === "driver"
                  ? colors.accent.contrast
                  : colors.text.secondary
              }
            />
            <Text
              style={[
                styles.servicePillText,
                selectedService === "driver" && styles.servicePillTextActive,
              ]}
            >
              Driver
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.servicePill,
              selectedService === "package" && styles.servicePillActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setSelectedService("package")}
          >
            <PackageIcon
              size={18}
              color={
                selectedService === "package"
                  ? colors.accent.contrast
                  : colors.text.muted
              }
            />
            <Text
              style={[
                styles.servicePillText,
                selectedService === "package" && styles.servicePillTextActive,
              ]}
            >
              Package
            </Text>
          </TouchableOpacity>
        </View>

        {/* Interactive Map Visual */}
        <View style={styles.mapSection}>
          <DarkRouteMap height={160} showRoute={true} driverEta="3 min" />
        </View>

        {/* Ride Tier Cards (Standard, Comfort, Luxury) in Rands */}
        <View style={styles.tierSection}>
          <Text style={styles.sectionHeader}>Available Rides</Text>

          <View style={styles.tierRow}>
            {/* Standard Tier */}
            <TouchableOpacity
              style={[
                styles.tierCard,
                tier === "standard" && styles.tierCardActive,
              ]}
              activeOpacity={0.85}
              onPress={() => selectTier("standard")}
            >
              <Text
                style={[
                  styles.tierTitle,
                  tier === "standard" && styles.tierTitleActive,
                ]}
              >
                Standard
              </Text>
              <Text style={styles.tierEta}>3 min</Text>

              <View style={styles.tierCarPreview}>
                <VehicleSideSvg
                  width={54}
                  height={24}
                  color={
                    tier === "standard"
                      ? colors.accent.primary
                      : colors.text.muted
                  }
                />
              </View>

              <View style={styles.tierSpecs}>
                <SeatIcon size={14} color={colors.text.secondary} />
                <Text style={styles.tierSeatCount}>4</Text>
              </View>

              <View style={styles.tierBottomRow}>
                <View style={styles.tierIconBadge}>
                  <SteeringWheelIcon
                    size={16}
                    color={
                      tier === "standard"
                        ? colors.accent.contrast
                        : colors.accent.primary
                    }
                  />
                </View>
                <Text style={styles.tierPrice}>R{tierFares.standard}</Text>
              </View>
            </TouchableOpacity>

            {/* Comfort Tier */}
            <TouchableOpacity
              style={[
                styles.tierCard,
                tier === "comfort" && styles.tierCardActive,
              ]}
              activeOpacity={0.85}
              onPress={() => selectTier("comfort")}
            >
              <Text
                style={[
                  styles.tierTitle,
                  tier === "comfort" && styles.tierTitleActive,
                ]}
              >
                Comfort
              </Text>
              <Text style={styles.tierEta}>4 min</Text>

              <View style={styles.tierCarPreview}>
                <VehicleSideSvg
                  width={54}
                  height={24}
                  color={
                    tier === "comfort"
                      ? colors.accent.primary
                      : colors.text.muted
                  }
                />
              </View>

              <View style={styles.tierSpecs}>
                <SeatIcon size={14} color={colors.text.secondary} />
                <Text style={styles.tierSeatCount}>4</Text>
              </View>

              <View style={styles.tierBottomRow}>
                <View style={styles.tierIconBadge}>
                  <SteeringWheelIcon
                    size={16}
                    color={
                      tier === "comfort"
                        ? colors.accent.contrast
                        : colors.accent.primary
                    }
                  />
                </View>
                <Text style={styles.tierPrice}>R{tierFares.comfort}</Text>
              </View>
            </TouchableOpacity>

            {/* Luxury Tier */}
            <TouchableOpacity
              style={[
                styles.tierCard,
                tier === "luxury" && styles.tierCardActive,
              ]}
              activeOpacity={0.85}
              onPress={() => selectTier("luxury")}
            >
              <Text
                style={[
                  styles.tierTitle,
                  tier === "luxury" && styles.tierTitleActive,
                ]}
              >
                Luxury
              </Text>
              <Text style={styles.tierEta}>6 min</Text>

              <View style={styles.tierCarPreview}>
                <VehicleSideSvg
                  width={54}
                  height={24}
                  color={
                    tier === "luxury"
                      ? colors.accent.primary
                      : colors.text.muted
                  }
                />
              </View>

              <View style={styles.tierSpecs}>
                <SeatIcon size={14} color={colors.text.secondary} />
                <Text style={styles.tierSeatCount}>4</Text>
              </View>

              <View style={styles.tierBottomRow}>
                <View style={styles.tierIconBadge}>
                  <SteeringWheelIcon
                    size={16}
                    color={
                      tier === "luxury"
                        ? colors.accent.contrast
                        : colors.accent.primary
                    }
                  />
                </View>
                <Text style={styles.tierPrice}>R{tierFares.luxury}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity
          style={styles.requestRideButton}
          activeOpacity={0.85}
          onPress={() => {
            startSearch();
            navigation.navigate("RideSearching");
          }}
        >
          <Text style={styles.requestRideText}>
            Confirm {tier.toUpperCase()} • R{tierFares[tier]}
          </Text>
          <ArrowRightIcon size={20} color={colors.accent.contrast} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface.card,
    borderWidth: 1,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  profileChip: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface.elevated,
    borderWidth: 2,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: colors.text.primary,
    lineHeight: 40,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  driverHighlightChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.md,
  },
  highlightAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface.elevated,
    borderWidth: 1,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  highlightAvatarText: {
    color: colors.accent.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
  highlightInfo: {
    flex: 1,
  },
  highlightName: {
    color: colors.text.primary,
    fontSize: 15,
    fontWeight: "bold",
  },
  highlightVehicle: {
    color: colors.text.muted,
    fontSize: 12,
    marginTop: 2,
  },
  ratingStars: {
    flexDirection: "row",
    gap: 3,
  },
  locationCardGroup: {
    position: "relative",
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  locationPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    height: 52,
    borderRadius: 26,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  pillIconWrap: {
    marginRight: spacing.sm,
  },
  locationPillText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text.primary,
  },
  locationPlaceholderText: {
    fontSize: 15,
    color: colors.text.muted,
  },
  swapButton: {
    position: "absolute",
    right: 18,
    top: 40,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface.elevated,
    borderWidth: 1,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  serviceSelector: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  servicePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.surface.card,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  servicePillActive: {
    backgroundColor: colors.accent.primary,
    borderColor: colors.accent.primary,
  },
  servicePillText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.secondary,
  },
  servicePillTextActive: {
    color: colors.accent.contrast,
    fontWeight: "bold",
  },
  mapSection: {
    marginBottom: spacing.md,
  },
  tierSection: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  tierRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  tierCard: {
    flex: 1,
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  tierCardActive: {
    backgroundColor: colors.surface.elevated,
    borderColor: colors.accent.primary,
    borderWidth: 1.5,
  },
  tierTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  tierTitleActive: {
    color: colors.accent.primary,
  },
  tierEta: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 2,
    marginBottom: 4,
  },
  tierCarPreview: {
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
  tierSpecs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 10,
  },
  tierSeatCount: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  tierBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tierIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  tierPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  requestRideButton: {
    backgroundColor: colors.accent.primary,
    height: 56,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  requestRideText: {
    color: colors.accent.contrast,
    fontSize: 16,
    fontWeight: "bold",
  },
});
