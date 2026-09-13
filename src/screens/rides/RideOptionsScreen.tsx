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
  SeatIcon,
  ArrowRightIcon,
  WalletIcon,
  CrosshairIcon,
  LayersIcon,
} from "../../components/common/SvgIcons";
import {
  StandardTelemetryVector,
  ComfortTelemetryVector,
  LuxuryTelemetryVector,
} from "../../components/common/MobilityTelemetryVectors";
import DarkRouteMap from "../../components/common/DarkRouteMap";
import SlideToConfirm from "../../components/common/SlideToConfirm";
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
    name: "Volt Eco",
    desc: "Swift & economical transit • 100% Electric",
    seats: 4,
    eta: "3 min away",
  },
  {
    key: "comfort",
    name: "Go Comfort",
    desc: "Extra legroom, enhanced damping & quiet cabin",
    seats: 4,
    eta: "4 min away",
  },
  {
    key: "luxury",
    name: "Go Exec",
    desc: "Executive mobility with premier silent cruise",
    seats: 4,
    eta: "6 min away",
  },
];

export default function RideOptionsScreen({
  navigation,
}: RootStackScreenProps<"RideOptions">) {
  const {
    pickup,
    destination,
    tier,
    tierFares,
    selectTier,
    startSearch,
    walletBalance,
  } = useRide();

  const handleConfirm = () => {
    startSearch();
    navigation.navigate("RideSearching");
  };

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
        <Text style={styles.navTitle}>Select Your Ride</Text>
        <View style={styles.navSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Map Section */}
        <View style={styles.mapContainer}>
          <DarkRouteMap
            height={210}
            showRoute={true}
            driverEta="3 min"
          />

          {/* Floating Trip Trajectory HUD (Top Left) */}
          <View style={styles.tripTrajectoryHud}>
            <View style={styles.hudPulseDot} />
            <Text style={styles.hudTimeText}>
              22 mins{" "}
              <Text style={styles.hudDistanceText}>
                • {destination.distance || "14.2 km"}
              </Text>
            </Text>
          </View>

          {/* Floating Map Controls (Top Right) */}
          <View style={styles.mapControls}>
            <TouchableOpacity
              style={styles.mapControlButton}
              activeOpacity={0.8}
              accessibilityLabel="Re-center map"
            >
              <CrosshairIcon size={16} color={colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mapControlButton}
              activeOpacity={0.8}
              accessibilityLabel="Toggle traffic"
            >
              <LayersIcon size={16} color={colors.accent.primary} />
            </TouchableOpacity>
          </View>

          {/* Pickup & Destination Overlay Pills */}
          <View style={styles.routeOverlayPills}>
            <View style={styles.routePill}>
              <View style={styles.pickupDot} />
              <Text style={styles.routePillText} numberOfLines={1}>
                {pickup.title || "Downtown Plaza"}
              </Text>
            </View>

            <View style={styles.routeArrowBox}>
              <ArrowRightIcon size={12} color={colors.text.secondary} />
            </View>

            <View style={styles.routePill}>
              <View style={styles.destDot} />
              <Text style={styles.routePillText} numberOfLines={1}>
                {destination.title || "Terminal 2, Airport"}
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Sheet Console */}
        <View style={styles.sheetConsole}>
          {/* Sheet Header */}
          <View style={styles.sheetHeader}>
            <View>
              <Text style={styles.sheetTitle}>Select Ride Tier</Text>
              <Text style={styles.sheetSubtitle}>
                All rides electric & carbon-neutral offset
              </Text>
            </View>
          </View>

          {/* Vehicle Tier Stack */}
          <View style={styles.tierStack}>
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
                  activeOpacity={0.88}
                  onPress={() => selectTier(item.key)}
                >
                  {/* Left Telemetry Vector */}
                  <View style={styles.telemetryBox}>
                    {item.key === "standard" && (
                      <StandardTelemetryVector
                        width={60}
                        height={28}
                        color={
                          isSelected ? colors.accent.primary : colors.text.muted
                        }
                      />
                    )}
                    {item.key === "comfort" && (
                      <ComfortTelemetryVector
                        width={60}
                        height={28}
                        color={
                          isSelected ? colors.accent.primary : colors.text.muted
                        }
                      />
                    )}
                    {item.key === "luxury" && (
                      <LuxuryTelemetryVector
                        width={60}
                        height={28}
                        color={
                          isSelected ? colors.accent.primary : colors.text.muted
                        }
                      />
                    )}
                  </View>

                  {/* Center Details */}
                  <View style={styles.tierInfo}>
                    <View style={styles.tierTitleRow}>
                      <Text
                        style={[
                          styles.tierName,
                          isSelected && styles.tierNameActive,
                        ]}
                      >
                        {item.name}
                      </Text>
                      <View style={styles.seatsBadge}>
                        <SeatIcon size={12} color={colors.text.secondary} />
                        <Text style={styles.seatsText}>{item.seats}</Text>
                      </View>
                    </View>
                    <Text style={styles.tierDesc}>{item.desc}</Text>
                    <Text style={styles.tierEtaText}>{item.eta}</Text>
                  </View>

                  {/* Right Fare */}
                  <View style={styles.tierFareBox}>
                    <Text
                      style={[
                        styles.tierFareText,
                        isSelected && styles.tierFareTextActive,
                      ]}
                    >
                      R{fare}.00
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Payment Method Selector Row */}
          <TouchableOpacity
            style={styles.paymentRow}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("PaymentMethods")}
          >
            <View style={styles.paymentLeft}>
              <View style={styles.paymentIconBox}>
                <WalletIcon size={18} color={colors.accent.primary} />
              </View>
              <View>
                <Text style={styles.paymentTitle}>Ride-Go Wallet</Text>
                <Text style={styles.paymentBalance}>
                  Available Balance: R{walletBalance}.00
                </Text>
              </View>
            </View>
            <Text style={styles.paymentChangeText}>Change</Text>
          </TouchableOpacity>

          {/* Interactive Slide to Confirm Slider */}
          <View style={styles.sliderContainer}>
            <SlideToConfirm
              label="SLIDE TO CONFIRM RIDE"
              confirmedLabel="CONFIRMED • MATCHING"
              onConfirm={handleConfirm}
            />
          </View>
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
    height: 54,
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
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text.primary,
    letterSpacing: -0.2,
  },
  navSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  mapContainer: {
    position: "relative",
    width: "100%",
    height: 210,
  },
  tripTrajectoryHud: {
    position: "absolute",
    top: 12,
    left: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(22, 22, 26, 0.94)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.surface.border,
    zIndex: 10,
  },
  hudPulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.primary,
  },
  hudTimeText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.text.primary,
  },
  hudDistanceText: {
    fontWeight: "500",
    color: colors.text.secondary,
  },
  mapControls: {
    position: "absolute",
    top: 12,
    right: spacing.lg,
    flexDirection: "column",
    gap: 6,
    zIndex: 10,
  },
  mapControlButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(22, 22, 26, 0.94)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  routeOverlayPills: {
    position: "absolute",
    bottom: 12,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    zIndex: 10,
  },
  routePill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(22, 22, 26, 0.96)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surface.border,
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
  routePillText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.text.primary,
  },
  routeArrowBox: {
    paddingHorizontal: 2,
  },
  sheetConsole: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  sheetHeader: {
    paddingTop: 4,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text.primary,
    letterSpacing: -0.3,
  },
  sheetSubtitle: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  tierStack: {
    gap: 10,
  },
  tierCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    gap: 12,
  },
  tierCardActive: {
    borderColor: colors.accent.primary,
    backgroundColor: colors.surface.elevated,
  },
  telemetryBox: {
    width: 64,
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
    fontSize: 14,
    fontWeight: "800",
    color: colors.text.primary,
  },
  tierNameActive: {
    color: colors.accent.primary,
  },
  seatsBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  seatsText: {
    fontSize: 11,
    color: colors.text.secondary,
  },
  tierDesc: {
    fontSize: 11,
    color: colors.text.muted,
    marginTop: 2,
  },
  tierEtaText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.accent.primary,
    marginTop: 4,
  },
  tierFareBox: {
    alignItems: "flex-end",
  },
  tierFareText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text.primary,
  },
  tierFareTextActive: {
    color: colors.accent.primary,
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface.card,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  paymentIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  paymentTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.primary,
  },
  paymentBalance: {
    fontSize: 11,
    color: colors.text.muted,
    marginTop: 1,
  },
  paymentChangeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  sliderContainer: {
    marginTop: 6,
  },
});
