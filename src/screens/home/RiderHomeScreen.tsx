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
  CalendarClockIcon,
  PhoneCallIcon,
  ChatBubbleIcon,
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

const FAST_BOOKINGS = [
  {
    id: "gardens",
    title: "Home Gardens",
    address: "Kloof Street, Gardens, Cape Town",
    eta: "12 min",
    distance: "3.8 km",
  },
  {
    id: "waterfront",
    title: "V&A Waterfront Harbour",
    address: "Victoria Wharf, Breakwater Blvd",
    eta: "18 min",
    distance: "5.4 km",
  },
  {
    id: "airport",
    title: "Cape Town Int'l Airport CPT",
    address: "Departures Terminal, Matroosfontein",
    eta: "26 min",
    distance: "21.0 km",
  },
  {
    id: "campsbay",
    title: "Camps Bay Beach Coast",
    address: "Victoria Road Promenade",
    eta: "15 min",
    distance: "7.2 km",
  },
];

const QUICK_SERVICES = [
  { id: "ride", title: "Go Ride", eta: "3 min", tag: "Fastest", type: "driver" as const },
  { id: "comfort", title: "Go Comfort", eta: "Spacious", tag: "Premium", type: "driver" as const },
  { id: "suv", title: "Go 4x4", eta: "6 Seats", tag: "SUV", type: "driver" as const },
  { id: "package", title: "Package", eta: "Courier", tag: "Express", type: "package" as const },
];

export default function RiderHomeScreen({
  navigation,
}: RootStackScreenProps<any>) {
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
  const [selectedQuickService, setSelectedQuickService] = useState("ride");
  const [selectedParcelTier, setSelectedParcelTier] =
    useState<ParcelTierKey>("courier");

  const currentParcel =
    PARCEL_TIERS.find((p) => p.key === selectedParcelTier) || PARCEL_TIERS[0];

  const handleTabPress = (tab: TabKey) => {
    if (tab === "explore" || tab === "home") {
      // Current tab
    } else if (tab === "rides") {
      navigation.navigate("Rides");
    } else if (tab === "activity" || tab === "trips") {
      navigation.navigate("Activity");
    } else if (tab === "account" || tab === "profile") {
      navigation.navigate("Account");
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

      {/* Top Header Bar with Brand & Actions */}
      <View style={styles.header}>
        <View style={styles.brandContainer}>
          <SteeringWheelIcon size={22} color={colors.accent.primary} />
          <View style={styles.brandTitleWrap}>
            <Text style={styles.brandTitleRide}>Ride</Text>
            <View style={styles.brandBadgeGo}>
              <Text style={styles.brandBadgeGoText}>GO</Text>
            </View>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.notificationButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Notifications")}
          >
            <BellIcon size={20} color={colors.text.primary} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.profileChip}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Account")}
          >
            <View style={styles.profileAvatar}>
              <Text style={styles.avatarInitial}>{userProfile.avatar}</Text>
            </View>
          </TouchableOpacity>
        </View>
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
            <Text style={styles.liveFleetText}>24 RIDE-GO CARS NEARBY (CAPE TOWN)</Text>
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
          {/* Hero "Where to?" Search Bar with Schedule Pill */}
          <TouchableOpacity
            style={styles.heroSearchCard}
            activeOpacity={0.88}
            onPress={() => navigation.navigate("DestinationSearch")}
          >
            <View style={styles.searchIconBox}>
              <SearchIcon size={22} color="#000000" />
            </View>
            <View style={styles.searchContent}>
              <Text style={styles.searchHeading}>Where to?</Text>
              <Text style={styles.searchSubheading} numberOfLines={1}>
                {destination.title || "Search destination or Camps Bay, Stellenbosch, V&A..."}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.schedulePill}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("DestinationSearch")}
            >
              <CalendarClockIcon size={14} color={colors.accent.primary} />
              <Text style={styles.schedulePillText}>Now</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* Stitch Quick Service Carousel */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickServicesRow}
          >
            {QUICK_SERVICES.map((item) => {
              const isActive = selectedQuickService === item.id;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.quickServiceCard,
                    isActive && styles.quickServiceCardActive,
                  ]}
                  activeOpacity={0.85}
                  onPress={() => {
                    setSelectedQuickService(item.id);
                    if (item.type === "package") {
                      setSelectedService("package");
                    } else {
                      setSelectedService("driver");
                    }
                  }}
                >
                  <View
                    style={[
                      styles.quickServiceTagWrap,
                      isActive && styles.quickServiceTagWrapActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.quickServiceTagText,
                        isActive && styles.quickServiceTagTextActive,
                      ]}
                    >
                      {item.tag}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.quickServiceTitle,
                      isActive && styles.quickServiceTitleActive,
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.quickServiceEta}>{item.eta}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

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

          {/* Ride-Go Mzansi Special Promo Card */}
          <View style={styles.promoCard}>
            <View style={styles.promoCardHeader}>
              <View style={styles.promoCodePill}>
                <Text style={styles.promoCodeText}>MZANSI30</Text>
              </View>
              <Text style={styles.promoDiscountText}>30% OFF</Text>
            </View>
            <Text style={styles.promoTitle}>Ride-Go Mzansi Special</Text>
            <Text style={styles.promoDescription}>
              30% off your first 5 trips across Western Cape. Cape Town Metro & Winelands • Instant dispatch.
            </Text>
            <TouchableOpacity
              style={styles.promoClaimButton}
              activeOpacity={0.85}
              onPress={() => {
                setDestinationLocation(FAST_BOOKINGS[1].title, FAST_BOOKINGS[1].address, FAST_BOOKINGS[1].distance);
                navigation.navigate("RideOptions");
              }}
            >
              <Text style={styles.promoClaimButtonText}>Claim Offer</Text>
              <ArrowRightIcon size={16} color="#000000" />
            </TouchableOpacity>
          </View>

          {/* Fast Bookings Section */}
          <View style={styles.fastBookingsSection}>
            <View style={styles.fastBookingsHeaderRow}>
              <Text style={styles.fastBookingsHeaderTitle}>Fast Bookings</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("SavedPlaces")}
              >
                <Text style={styles.fastBookingsEditAction}>Edit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.fastBookingsList}>
              {FAST_BOOKINGS.map((booking) => (
                <TouchableOpacity
                  key={booking.id}
                  style={styles.fastBookingItem}
                  activeOpacity={0.8}
                  onPress={() => {
                    setDestinationLocation(booking.title, booking.address, booking.distance);
                    navigation.navigate("RideOptions");
                  }}
                >
                  <View style={styles.fastBookingIconWrap}>
                    <PinIcon size={18} color={colors.accent.primary} />
                  </View>
                  <View style={styles.fastBookingInfo}>
                    <Text style={styles.fastBookingTitle}>{booking.title}</Text>
                    <Text style={styles.fastBookingAddress} numberOfLines={1}>
                      {booking.address}
                    </Text>
                  </View>
                  <View style={styles.fastBookingEtaWrap}>
                    <Text style={styles.fastBookingEtaText}>{booking.eta}</Text>
                    <ArrowRightIcon size={14} color={colors.text.muted} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Live Driver En Route Status HUD */}
          <View style={styles.activeDriverCard}>
            <View style={styles.activeDriverPulseWrap}>
              <View style={styles.activeDriverPulseDot} />
            </View>
            <View style={styles.activeDriverInfo}>
              <View style={styles.activeDriverNameRow}>
                <Text style={styles.activeDriverName}>Thulane J.</Text>
                <View style={styles.driverRatingScoreWrap}>
                  <Text style={styles.driverRatingScoreText}>4.98</Text>
                </View>
              </View>
              <Text style={styles.activeDriverSubtitle}>
                Driver en route • VW Polo Vivo (3 min away)
              </Text>
            </View>
            <View style={styles.activeDriverActions}>
              <TouchableOpacity
                style={styles.driverActionButton}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("RideInProgress")}
              >
                <PhoneCallIcon size={16} color={colors.accent.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.driverActionButton}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("RideInProgress")}
              >
                <ChatBubbleIcon size={16} color={colors.accent.primary} />
              </TouchableOpacity>
            </View>
          </View>

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

      {/* 4-Tab Navigation Bar */}
      <BottomTabBar activeTab="explore" onSelectTab={handleTabPress} />
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
  // Brand Header
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  brandTitleRide: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text.primary,
    letterSpacing: -0.5,
  },
  brandBadgeGo: {
    backgroundColor: colors.accent.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  brandBadgeGoText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.accent.contrast,
    letterSpacing: 0.5,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  notificationDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.accent.primary,
  },
  // Schedule Pill
  schedulePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.surface.elevated,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  schedulePillText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  // Quick Services Carousel
  quickServicesRow: {
    gap: spacing.sm,
    paddingVertical: 2,
  },
  quickServiceCard: {
    width: 100,
    backgroundColor: colors.surface.card,
    borderRadius: 14,
    padding: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    alignItems: "center",
  },
  quickServiceCardActive: {
    borderColor: colors.accent.primary,
    backgroundColor: colors.surface.elevated,
  },
  quickServiceTagWrap: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: colors.surface.elevated,
    marginBottom: 6,
  },
  quickServiceTagWrapActive: {
    backgroundColor: colors.accent.primary,
  },
  quickServiceTagText: {
    fontSize: 9,
    fontWeight: "800",
    color: colors.text.secondary,
    textTransform: "uppercase",
  },
  quickServiceTagTextActive: {
    color: colors.accent.contrast,
  },
  quickServiceTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.primary,
    textAlign: "center",
  },
  quickServiceTitleActive: {
    color: colors.accent.primary,
  },
  quickServiceEta: {
    fontSize: 11,
    color: colors.text.muted,
    marginTop: 2,
  },
  // Promo Card
  promoCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    gap: spacing.xs,
  },
  promoCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promoCodePill: {
    backgroundColor: "rgba(255, 209, 0, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 209, 0, 0.4)",
  },
  promoCodeText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.accent.primary,
    letterSpacing: 0.8,
  },
  promoDiscountText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.accent.primary,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text.primary,
    marginTop: 4,
  },
  promoDescription: {
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  promoClaimButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent.primary,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
    marginTop: spacing.xs,
  },
  promoClaimButtonText: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.accent.contrast,
  },
  // Fast Bookings
  fastBookingsSection: {
    backgroundColor: colors.surface.card,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    gap: spacing.sm,
  },
  fastBookingsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fastBookingsHeaderTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text.primary,
  },
  fastBookingsEditAction: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  fastBookingsList: {
    gap: 10,
  },
  fastBookingItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.border,
  },
  fastBookingIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  fastBookingInfo: {
    flex: 1,
  },
  fastBookingTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.primary,
  },
  fastBookingAddress: {
    fontSize: 11,
    color: colors.text.secondary,
    marginTop: 1,
  },
  fastBookingEtaWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  fastBookingEtaText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.accent.primary,
  },
  // Active Driver Card
  activeDriverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.accent.primary,
    gap: spacing.sm,
  },
  activeDriverPulseWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 209, 0, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  activeDriverPulseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent.primary,
  },
  activeDriverInfo: {
    flex: 1,
  },
  activeDriverNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  activeDriverName: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text.primary,
  },
  driverRatingScoreWrap: {
    backgroundColor: colors.surface.elevated,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  driverRatingScoreText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  activeDriverSubtitle: {
    fontSize: 11,
    color: colors.text.secondary,
    marginTop: 2,
  },
  activeDriverActions: {
    flexDirection: "row",
    gap: 8,
  },
  driverActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface.elevated,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
});
