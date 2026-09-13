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
  SearchIcon,
  CrosshairIcon,
  LayersIcon,
} from "../../components/common/SvgIcons";
import DarkRouteMap from "../../components/common/DarkRouteMap";
import {
  StandardTelemetryVector,
  ComfortTelemetryVector,
  LuxuryTelemetryVector,
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

const DESTINATION_PRESETS = [
  { title: "V&A Waterfront", address: "Breakwater Blvd, Victoria & Alfred Waterfront", distance: "4.2 km" },
  { title: "Camps Bay Beach", address: "Victoria Rd, Camps Bay, Cape Town", distance: "6.8 km" },
  { title: "Sandton City", address: "83 Rivonia Rd, Sandhurst, Sandton", distance: "14.5 km" },
  { title: "Stellenbosch", address: "Dorp St, Stellenbosch Central", distance: "45.0 km" },
  { title: "OR Tambo Airport", address: "1 Jones Rd, Kempton Park, Johannesburg", distance: "28.0 km" },
];

export default function RiderHomeScreen({
  navigation,
}: RootStackScreenProps<"RiderHome">) {
  const {
    pickup,
    destination,
    setDestinationLocation,
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

  const handleSelectPreset = (preset: typeof DESTINATION_PRESETS[0]) => {
    setDestinationLocation(preset.title, preset.address, preset.distance);
    navigation.navigate("RideOptions");
  };

  const handleChooseRide = () => {
    if (selectedService === "driver") {
      navigation.navigate("RideOptions");
    } else {
      startSearch();
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
        {/* Interactive Map Viewport Layer */}
        <View style={styles.mapViewportLayer}>
          <DarkRouteMap
            height={240}
            showRoute={true}
            driverEta={selectedService === "driver" ? "3 min" : currentParcel.eta}
          />

          {/* Live Fleet Indicator (Top Left) */}
          <View style={styles.liveFleetPill}>
            <View style={styles.livePulseDot} />
            <Text style={styles.liveFleetText}>24 RIDE-GO CARS NEARBY</Text>
          </View>

          {/* Floating Map Quick Controls (Top Right) */}
          <View style={styles.mapQuickControls}>
            <TouchableOpacity
              style={styles.mapControlButton}
              activeOpacity={0.8}
              accessibilityLabel="Re-center location"
            >
              <CrosshairIcon size={18} color={colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mapControlButton}
              activeOpacity={0.8}
              accessibilityLabel="Traffic layer"
            >
              <LayersIcon size={18} color={colors.accent.primary} />
            </TouchableOpacity>
          </View>

          {/* Current Pickup Pill Tag (Bottom of Map) */}
          <View style={styles.pickupPillTag}>
            <View style={styles.pickupDot} />
            <Text style={styles.pickupTagText} numberOfLines={1}>
              {pickup.title || "Cape Town City Bowl"}
            </Text>
          </View>
        </View>

        {/* Primary Discovery Console */}
        <View style={styles.discoveryConsole}>
          {/* Hero "Where to?" Search Bar */}
          <TouchableOpacity
            style={styles.heroSearchCard}
            activeOpacity={0.88}
            onPress={() => navigation.navigate("DestinationSearch")}
          >
            <View style={styles.searchIconBox}>
              <SearchIcon size={24} color="#000000" />
            </View>
            <View style={styles.searchContent}>
              <Text style={styles.searchHeading}>Where to?</Text>
              <Text style={styles.searchSubheading} numberOfLines={1}>
                {destination.title || "Search destination or Camps Bay, V&A, Sandton..."}
              </Text>
            </View>
            <View style={styles.searchArrowWrap}>
              <ArrowRightIcon size={18} color={colors.accent.primary} />
            </View>
          </TouchableOpacity>

          {/* Destination Shortcut Preset Chips */}
          <View style={styles.presetsSection}>
            <Text style={styles.presetsHeader}>POPULAR DESTINATIONS</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.presetsRow}
            >
              {DESTINATION_PRESETS.map((preset) => (
                <TouchableOpacity
                  key={preset.title}
                  style={styles.presetChip}
                  activeOpacity={0.8}
                  onPress={() => handleSelectPreset(preset)}
                >
                  <PinIcon size={13} color={colors.accent.primary} />
                  <Text style={styles.presetChipText}>{preset.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
                Ride Transit
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
                Parcel & Freight
              </Text>
            </TouchableOpacity>
          </View>

          {/* Available Rides Tier Stack */}
          {selectedService === "driver" ? (
            <View style={styles.tierStackSection}>
              <View style={styles.tierSectionHeaderRow}>
                <Text style={styles.sectionHeaderTitle}>Select Mobility Tier</Text>
                <Text style={styles.sectionHeaderSubtitle}>All electric & zero-emission</Text>
              </View>

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
                    Volt Eco
                  </Text>
                  <Text style={styles.tierEta}>3 min</Text>

                  <View style={styles.tierVectorWrap}>
                    <StandardTelemetryVector
                      width={52}
                      height={24}
                      color={
                        tier === "standard"
                          ? colors.accent.primary
                          : colors.text.muted
                      }
                    />
                  </View>

                  <View style={styles.tierSpecs}>
                    <SeatIcon size={13} color={colors.text.secondary} />
                    <Text style={styles.tierSeatCount}>4</Text>
                  </View>

                  <Text style={styles.tierPrice}>R{tierFares.standard}</Text>
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
                    Go Comfort
                  </Text>
                  <Text style={styles.tierEta}>4 min</Text>

                  <View style={styles.tierVectorWrap}>
                    <ComfortTelemetryVector
                      width={52}
                      height={24}
                      color={
                        tier === "comfort"
                          ? colors.accent.primary
                          : colors.text.muted
                      }
                    />
                  </View>

                  <View style={styles.tierSpecs}>
                    <SeatIcon size={13} color={colors.text.secondary} />
                    <Text style={styles.tierSeatCount}>4</Text>
                  </View>

                  <Text style={styles.tierPrice}>R{tierFares.comfort}</Text>
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
                    Go Exec
                  </Text>
                  <Text style={styles.tierEta}>6 min</Text>

                  <View style={styles.tierVectorWrap}>
                    <LuxuryTelemetryVector
                      width={52}
                      height={24}
                      color={
                        tier === "luxury"
                          ? colors.accent.primary
                          : colors.text.muted
                      }
                    />
                  </View>

                  <View style={styles.tierSpecs}>
                    <SeatIcon size={13} color={colors.text.secondary} />
                    <Text style={styles.tierSeatCount}>4</Text>
                  </View>

                  <Text style={styles.tierPrice}>R{tierFares.luxury}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* Parcel Promo & Options */
            <TouchableOpacity
              style={styles.promoBannerCard}
              activeOpacity={0.85}
              onPress={() => setSelectedParcelTier("truck")}
            >
              <View style={styles.promoInfo}>
                <Text style={styles.promoHeading}>Express Freight & Delivery</Text>
                <Text style={styles.promoSubtext}>
                  Book verified couriers, delivery bakkies, or moving trucks.
                </Text>
                <View style={styles.promoActionRow}>
                  <Text style={styles.promoActionText}>View Freight Options</Text>
                  <ArrowRightIcon size={14} color={colors.accent.primary} />
                </View>
              </View>
              <View style={styles.promoIllustration}>
                <PromoCargoVector width={64} height={36} color={colors.accent.primary} />
              </View>
            </TouchableOpacity>
          )}

          {/* Primary Action Button */}
          <TouchableOpacity
            style={styles.confirmRideButton}
            activeOpacity={0.88}
            onPress={handleChooseRide}
          >
            <Text style={styles.confirmRideButtonText}>
              {selectedService === "driver"
                ? "CHOOSE RIDE OPTION"
                : `BOOK ${currentParcel.title.toUpperCase()} (R${currentParcel.price})`}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Preserved Navigation Bar Locked */}
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.border,
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
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  profileChip: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.accent.contrast,
  },
  scrollContent: {
    paddingBottom: 96,
  },
  mapViewportLayer: {
    position: "relative",
    width: "100%",
    height: 240,
  },
  liveFleetPill: {
    position: "absolute",
    top: 14,
    left: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(22, 22, 26, 0.92)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.surface.border,
    zIndex: 10,
  },
  livePulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.primary,
  },
  liveFleetText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.text.primary,
    letterSpacing: 0.8,
  },
  mapQuickControls: {
    position: "absolute",
    top: 14,
    right: spacing.lg,
    flexDirection: "column",
    gap: 8,
    zIndex: 10,
  },
  mapControlButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(22, 22, 26, 0.92)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  pickupPillTag: {
    position: "absolute",
    bottom: 16,
    left: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(22, 22, 26, 0.95)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.accent.primary,
    zIndex: 10,
  },
  pickupDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent.primary,
  },
  pickupTagText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.text.primary,
  },
  discoveryConsole: {
    marginTop: -8,
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  heroSearchCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    gap: spacing.md,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  searchIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContent: {
    flex: 1,
  },
  searchHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text.primary,
    letterSpacing: -0.2,
  },
  searchSubheading: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  searchArrowWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  presetsSection: {
    gap: 8,
  },
  presetsHeader: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.text.muted,
    letterSpacing: 1.2,
  },
  presetsRow: {
    gap: 8,
  },
  presetChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface.card,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  presetChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text.primary,
  },
  serviceSelector: {
    flexDirection: "row",
    backgroundColor: colors.surface.card,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  serviceTabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  serviceTabButtonActive: {
    backgroundColor: colors.accent.primary,
  },
  serviceTabButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.secondary,
  },
  serviceTabButtonTextActive: {
    color: colors.accent.contrast,
  },
  tierStackSection: {
    gap: spacing.sm,
  },
  tierSectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text.primary,
    letterSpacing: -0.2,
  },
  sectionHeaderSubtitle: {
    fontSize: 11,
    color: colors.text.muted,
  },
  tierRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  tierCard: {
    flex: 1,
    backgroundColor: colors.surface.card,
    borderRadius: 14,
    padding: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    alignItems: "center",
  },
  tierCardActive: {
    borderColor: colors.accent.primary,
    backgroundColor: colors.surface.elevated,
  },
  tierTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.text.secondary,
  },
  tierTitleActive: {
    color: colors.accent.primary,
  },
  tierEta: {
    fontSize: 10,
    color: colors.text.muted,
    marginTop: 2,
  },
  tierVectorWrap: {
    marginVertical: 6,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  tierSpecs: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 4,
  },
  tierSeatCount: {
    fontSize: 11,
    color: colors.text.secondary,
  },
  tierPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text.primary,
  },
  promoBannerCard: {
    flexDirection: "row",
    backgroundColor: colors.surface.card,
    borderRadius: 14,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    alignItems: "center",
  },
  promoInfo: {
    flex: 1,
  },
  promoHeading: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text.primary,
  },
  promoSubtext: {
    fontSize: 11,
    color: colors.text.secondary,
    marginTop: 2,
    marginBottom: 6,
  },
  promoActionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  promoActionText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  promoIllustration: {
    marginLeft: spacing.sm,
  },
  confirmRideButton: {
    backgroundColor: colors.accent.primary,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.accent.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  confirmRideButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.accent.contrast,
    letterSpacing: 1.2,
  },
});
