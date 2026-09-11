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
import {
  VehicleSideSvg,
  CourierBikeSvg,
  DeliveryBakkieSvg,
  MovingTruckSvg,
} from "../../components/common/VehicleSvgs";
import BottomTabBar, { TabKey } from "../../components/common/BottomTabBar";
import { useRide } from "../../services/RideContext";

type ParcelTierKey = "courier" | "bakkie" | "truck";

interface ParcelTierInfo {
  key: ParcelTierKey;
  title: string;
  eta: string;
  price: number;
  capacity: string;
}

const PARCEL_TIERS: ParcelTierInfo[] = [
  {
    key: "courier",
    title: "Courier Bike",
    eta: "15 min",
    price: 35,
    capacity: "10 kg max",
  },
  {
    key: "bakkie",
    title: "Delivery Bakkie",
    eta: "25 min",
    price: 85,
    capacity: "500 kg max",
  },
  {
    key: "truck",
    title: "Moving Truck",
    eta: "45 min",
    price: 195,
    capacity: "2.5 Ton max",
  },
];

export default function RiderHomeScreen({
  navigation,
}: RootStackScreenProps<"RiderHome">) {
  const {
    pickup,
    destination,
    tier,
    selectTier,
    tierFares,
    startSearch,
    userProfile,
  } = useRide();

  const [selectedService, setSelectedService] = useState<"driver" | "package">(
    "driver"
  );
  const [selectedParcelTier, setSelectedParcelTier] =
    useState<ParcelTierKey>("courier");

  const currentParcel =
    PARCEL_TIERS.find((p) => p.key === selectedParcelTier) || PARCEL_TIERS[0];

  const handleTabPress = (tab: TabKey) => {
    if (tab === "trips") {
      navigation.navigate("RideHistory");
    } else if (tab === "wallet") {
      navigation.navigate("PaymentMethods");
    } else if (tab === "profile") {
      navigation.navigate("RiderProfile");
    }
  };

  const handleConfirmAction = () => {
    startSearch();
    if (selectedService === "driver") {
      navigation.navigate("RideSearching");
    } else {
      navigation.navigate("RideSearching", {
        rideType: currentParcel.title,
      });
    }
  };

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
            <Text style={styles.avatarInitial}>{userProfile.avatar}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title Headline */}
        <Text style={styles.title}>
          {selectedService === "driver"
            ? "Where do you\nwant to go?"
            : "Send & Deliver\nany package"}
        </Text>

        {/* Favorite Driver / Top Match Chip */}
        {selectedService === "driver" ? (
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
        ) : (
          /* Promo Hero Banner Card for Parcel / Moving Day */
          <TouchableOpacity
            style={styles.promoBannerCard}
            activeOpacity={0.85}
            onPress={() => setSelectedParcelTier("truck")}
          >
            <View style={styles.promoInfo}>
              <Text style={styles.promoHeading}>Moving day made simple</Text>
              <Text style={styles.promoSubtext}>
                Book a heavy bakkie or truck with verified movers
              </Text>
              <View style={styles.promoActionRow}>
                <Text style={styles.promoActionText}>Book Moving Truck</Text>
                <ArrowRightIcon size={14} color={colors.accent.primary} />
              </View>
            </View>
            <View style={styles.promoIllustration}>
              <MovingTruckSvg width={72} height={36} color={colors.accent.primary} />
            </View>
          </TouchableOpacity>
        )}

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
            <Text style={styles.locationPillText}>
              {selectedService === "driver" ? pickup.title : `Pickup: ${pickup.title}`}
            </Text>
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
              {destination.title
                ? selectedService === "driver"
                  ? destination.title
                  : `Drop-off: ${destination.title}`
                : selectedService === "driver"
                ? "Add your destination"
                : "Add recipient address"}
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
          <DarkRouteMap
            height={160}
            showRoute={true}
            driverEta={selectedService === "driver" ? "3 min" : currentParcel.eta}
          />
        </View>

        {/* Service Options: Driver Rides OR Parcel Fleet */}
        {selectedService === "driver" ? (
          /* Ride Tier Cards (Standard, Comfort, Luxury) in Rands */
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
        ) : (
          /* Parcel Delivery Tier Options (Courier, Bakkie, Moving Truck) */
          <View style={styles.tierSection}>
            <Text style={styles.sectionHeader}>Available Delivery Fleet</Text>

            <View style={styles.tierRow}>
              {/* Courier Bike */}
              <TouchableOpacity
                style={[
                  styles.tierCard,
                  selectedParcelTier === "courier" && styles.tierCardActive,
                ]}
                activeOpacity={0.85}
                onPress={() => setSelectedParcelTier("courier")}
              >
                <Text
                  style={[
                    styles.tierTitle,
                    selectedParcelTier === "courier" && styles.tierTitleActive,
                  ]}
                >
                  Courier
                </Text>
                <Text style={styles.tierEta}>15 min</Text>

                <View style={styles.tierCarPreview}>
                  <CourierBikeSvg
                    width={50}
                    height={24}
                    color={
                      selectedParcelTier === "courier"
                        ? colors.accent.primary
                        : colors.text.muted
                    }
                  />
                </View>

                <View style={styles.tierSpecs}>
                  <PackageIcon size={13} color={colors.text.secondary} />
                  <Text style={styles.tierSeatCount}>10 kg</Text>
                </View>

                <View style={styles.tierBottomRow}>
                  <View style={styles.tierIconBadge}>
                    <PackageIcon
                      size={14}
                      color={
                        selectedParcelTier === "courier"
                          ? colors.accent.contrast
                          : colors.accent.primary
                      }
                    />
                  </View>
                  <Text style={styles.tierPrice}>R35</Text>
                </View>
              </TouchableOpacity>

              {/* Delivery Bakkie */}
              <TouchableOpacity
                style={[
                  styles.tierCard,
                  selectedParcelTier === "bakkie" && styles.tierCardActive,
                ]}
                activeOpacity={0.85}
                onPress={() => setSelectedParcelTier("bakkie")}
              >
                <Text
                  style={[
                    styles.tierTitle,
                    selectedParcelTier === "bakkie" && styles.tierTitleActive,
                  ]}
                >
                  Bakkie
                </Text>
                <Text style={styles.tierEta}>25 min</Text>

                <View style={styles.tierCarPreview}>
                  <DeliveryBakkieSvg
                    width={54}
                    height={24}
                    color={
                      selectedParcelTier === "bakkie"
                        ? colors.accent.primary
                        : colors.text.muted
                    }
                  />
                </View>

                <View style={styles.tierSpecs}>
                  <PackageIcon size={13} color={colors.text.secondary} />
                  <Text style={styles.tierSeatCount}>500 kg</Text>
                </View>

                <View style={styles.tierBottomRow}>
                  <View style={styles.tierIconBadge}>
                    <PackageIcon
                      size={14}
                      color={
                        selectedParcelTier === "bakkie"
                          ? colors.accent.contrast
                          : colors.accent.primary
                      }
                    />
                  </View>
                  <Text style={styles.tierPrice}>R85</Text>
                </View>
              </TouchableOpacity>

              {/* Moving Truck */}
              <TouchableOpacity
                style={[
                  styles.tierCard,
                  selectedParcelTier === "truck" && styles.tierCardActive,
                ]}
                activeOpacity={0.85}
                onPress={() => setSelectedParcelTier("truck")}
              >
                <Text
                  style={[
                    styles.tierTitle,
                    selectedParcelTier === "truck" && styles.tierTitleActive,
                  ]}
                >
                  Truck
                </Text>
                <Text style={styles.tierEta}>45 min</Text>

                <View style={styles.tierCarPreview}>
                  <MovingTruckSvg
                    width={54}
                    height={24}
                    color={
                      selectedParcelTier === "truck"
                        ? colors.accent.primary
                        : colors.text.muted
                    }
                  />
                </View>

                <View style={styles.tierSpecs}>
                  <PackageIcon size={13} color={colors.text.secondary} />
                  <Text style={styles.tierSeatCount}>2.5 Ton</Text>
                </View>

                <View style={styles.tierBottomRow}>
                  <View style={styles.tierIconBadge}>
                    <PackageIcon
                      size={14}
                      color={
                        selectedParcelTier === "truck"
                          ? colors.accent.contrast
                          : colors.accent.primary
                      }
                    />
                  </View>
                  <Text style={styles.tierPrice}>R195</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Primary Action Button */}
        <TouchableOpacity
          style={styles.requestRideButton}
          activeOpacity={0.85}
          onPress={handleConfirmAction}
        >
          <Text style={styles.requestRideText}>
            {selectedService === "driver"
              ? `Confirm ${tier.toUpperCase()} • R${tierFares[tier]}`
              : `Confirm ${currentParcel.title} • R${currentParcel.price}`}
          </Text>
          <ArrowRightIcon size={20} color={colors.accent.contrast} />
        </TouchableOpacity>
      </ScrollView>

      {/* Floating Bottom Navigation Bar */}
      <BottomTabBar activeTab="home" onSelectTab={handleTabPress} />
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
    paddingBottom: 88,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.text.primary,
    lineHeight: 38,
    marginTop: spacing.xs,
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
  promoBannerCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.md,
  },
  promoInfo: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  promoHeading: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  promoSubtext: {
    color: colors.text.secondary,
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  promoActionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  promoActionText: {
    color: colors.accent.primary,
    fontSize: 13,
    fontWeight: "bold",
  },
  promoIllustration: {
    width: 76,
    height: 50,
    backgroundColor: colors.surface.elevated,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
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
    fontSize: 13,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  tierTitleActive: {
    color: colors.accent.primary,
  },
  tierEta: {
    fontSize: 11,
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
    marginBottom: 8,
  },
  tierSeatCount: {
    fontSize: 11,
    color: colors.text.secondary,
  },
  tierBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tierIconBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.surface.subtle,
    alignItems: "center",
    justifyContent: "center",
  },
  tierPrice: {
    fontSize: 14,
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
