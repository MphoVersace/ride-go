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
  ArrowRightIcon,
} from "../../components/common/SvgIcons";
import DarkRouteMap from "../../components/common/DarkRouteMap";
import {
  StandardTelemetryVector,
  ComfortTelemetryVector,
  LuxuryTelemetryVector,
  ExpressParcelVector,
  CargoCrateVector,
  FreightPalletVector,
  PromoCargoVector,
} from "../../components/common/MobilityTelemetryVectors";
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
              <Text style={styles.highlightVehicle}>Active Transit Unit • Direct Route</Text>
            </View>
            <ArrowRightIcon size={16} color={colors.accent.primary} />
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
                Book a heavy bakkie or truck with professional movers
              </Text>
              <View style={styles.promoActionRow}>
                <Text style={styles.promoActionText}>Book Moving Truck</Text>
                <ArrowRightIcon size={14} color={colors.accent.primary} />
              </View>
            </View>
            <View style={styles.promoIllustration}>
              <PromoCargoVector width={64} height={36} color={colors.accent.primary} />
            </View>
          </TouchableOpacity>
        )}

        {/* Unified Location Route Card */}
        <View style={styles.unifiedRouteCard}>
          {/* Pickup Point */}
          <TouchableOpacity
            style={styles.routeItemRow}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("DestinationSearch")}
          >
            <View style={styles.routeIconDot}>
              <PinIcon size={16} color={colors.accent.primary} />
            </View>
            <View style={styles.routeItemContent}>
              <Text style={styles.routeLabelSmall}>PICKUP LOCATION</Text>
              <Text style={styles.routeValueText} numberOfLines={1}>
                {pickup.title}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Route Divider with Center-Aligned Swap Button */}
          <View style={styles.routeDividerContainer}>
            <View style={styles.routeDividerLine} />
            <TouchableOpacity
              style={styles.inlineSwapButton}
              activeOpacity={0.8}
              accessibilityLabel="Swap pickup and destination"
            >
              <SwapArrowsIcon size={14} color={colors.accent.primary} />
            </TouchableOpacity>
            <View style={styles.routeDividerLine} />
          </View>

          {/* Destination Point */}
          <TouchableOpacity
            style={styles.routeItemRow}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("DestinationSearch")}
          >
            <View style={styles.routeIconDotDest}>
              <PinIcon size={16} color={colors.text.primary} />
            </View>
            <View style={styles.routeItemContent}>
              <Text style={styles.routeLabelSmall}>DESTINATION</Text>
              <Text
                style={
                  destination.title
                    ? styles.routeValueText
                    : styles.routePlaceholderText
                }
                numberOfLines={1}
              >
                {destination.title
                  ? destination.title
                  : selectedService === "driver"
                  ? "Where do you want to go?"
                  : "Add recipient drop-off address"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Service Type Switcher (Driver vs Package) */}
        <View style={styles.serviceSelector}>
          <TouchableOpacity
            style={[
              styles.serviceTabButton,
              selectedService === "driver" && styles.serviceTabButtonActive,
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
                styles.serviceTabButtonText,
                selectedService === "driver" && styles.serviceTabButtonTextActive,
              ]}
            >
              Driver
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.serviceTabButton,
              selectedService === "package" && styles.serviceTabButtonActive,
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
                styles.serviceTabButtonText,
                selectedService === "package" && styles.serviceTabButtonTextActive,
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
                  <StandardTelemetryVector
                    width={56}
                    height={26}
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
                  <View style={styles.tierIconWrap}>
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
                  <ComfortTelemetryVector
                    width={56}
                    height={26}
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
                  <View style={styles.tierIconWrap}>
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
                  <LuxuryTelemetryVector
                    width={56}
                    height={26}
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
                  <View style={styles.tierIconWrap}>
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
                  <ExpressParcelVector
                    width={54}
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
                  <View style={styles.tierIconWrap}>
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
                  <CargoCrateVector
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
                  <View style={styles.tierIconWrap}>
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
                  <FreightPalletVector
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
                  <View style={styles.tierIconWrap}>
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
  driverRatingWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.surface.elevated,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  driverRatingText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.text.primary,
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
  unifiedRouteCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    marginBottom: spacing.md,
  },
  routeItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  routeIconDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface.elevated,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  routeIconDotDest: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface.elevated,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.accent.primary,
  },
  routeItemContent: {
    flex: 1,
  },
  routeLabelSmall: {
    fontSize: 9,
    fontWeight: "800",
    color: colors.accent.primary,
    letterSpacing: 1,
    marginBottom: 2,
  },
  routeValueText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text.primary,
  },
  routePlaceholderText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.muted,
  },
  routeDividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  routeDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.surface.border,
  },
  inlineSwapButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.surface.elevated,
    borderWidth: 1,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: spacing.xs,
  },
  serviceSelector: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  serviceTabButton: {
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
  serviceTabButtonActive: {
    backgroundColor: colors.accent.primary,
    borderColor: colors.accent.primary,
  },
  serviceTabButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.secondary,
  },
  serviceTabButtonTextActive: {
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
  tierIconWrap: {
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
