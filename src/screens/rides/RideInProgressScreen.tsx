import React, { useEffect, useState } from "react";
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
  ChatBubbleIcon,
  PhoneIcon,
  LockIcon,
  CrosshairIcon,
  LayersIcon,
} from "../../components/common/SvgIcons";
import DarkRouteMap from "../../components/common/DarkRouteMap";
import DriverChatModal from "../../components/common/DriverChatModal";
import { useRide } from "../../services/RideContext";

export default function RideInProgressScreen({
  navigation,
}: RootStackScreenProps<"RideInProgress">) {
  const { pickup, destination, driver, tier, tierFares } = useRide();

  // Progress simulation (0.0 to 1.0)
  const [progress, setProgress] = useState(0.2);
  const [etaMinutes, setEtaMinutes] = useState(12);
  const [distanceKm, setDistanceKm] = useState(3.2);
  const [chatVisible, setChatVisible] = useState(false);

  const baseFare = tierFares[tier];
  const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);

  // Live timer counting down ETA and advancing the moving vehicle along the route
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 0.95) {
          return 0.95;
        }
        return prev + 0.08;
      });

      setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1));
      setDistanceKm((prev) => (prev > 0.3 ? Number((prev - 0.3).toFixed(1)) : 0.1));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Top App Bar */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("RiderHome")}
        >
          <ArrowLeftIcon size={20} color={colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.headerTitleWrap}>
          <Text style={styles.headerTitle}>Live Trip Tracking</Text>
          <Text style={styles.headerSubtitle}>Booking #RG-908124</Text>
        </View>

        <TouchableOpacity
          style={styles.callButton}
          activeOpacity={0.8}
        >
          <PhoneIcon size={18} color={colors.accent.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Realtime Moving Vector Map with Destination Callout */}
        <View style={styles.mapWrap}>
          <DarkRouteMap
            height={240}
            showRoute={true}
            driverEta={`${etaMinutes} min`}
            progress={progress}
          />

          {/* Floating Top Live ETA Status Pill */}
          <View style={styles.floatingEtaPill}>
            <View style={styles.etaPulseDot} />
            <Text style={styles.etaDriverText}>
              {driver.name} is {etaMinutes} mins away • In Transit
            </Text>
          </View>

          {/* Floating Map Controls */}
          <View style={styles.mapControls}>
            <TouchableOpacity
              style={styles.mapControlButton}
              activeOpacity={0.8}
              accessibilityLabel="Re-center location"
            >
              <CrosshairIcon size={16} color={colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mapControlButton}
              activeOpacity={0.8}
              accessibilityLabel="Layers"
            >
              <LayersIcon size={16} color={colors.accent.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Primary Bottom Sheet Console */}
        <View style={styles.sheetConsole}>
          {/* Safety Verification PIN Banner */}
          <View style={styles.safetyPinBanner}>
            <View style={styles.safetyPinAccentBar} />
            <View style={styles.safetyPinIconWrap}>
              <LockIcon size={18} color={colors.accent.primary} />
            </View>
            <View style={styles.safetyPinInfo}>
              <Text style={styles.safetyPinLabel}>ACTIVE TRANSIT CODE</Text>
              <Text style={styles.safetyPinCode}>4821</Text>
              <Text style={styles.safetyPinSubtext}>
                Verified onboard • Electric transit tracking active
              </Text>
            </View>
          </View>

          {/* Driver Profile Card */}
          <View style={styles.driverCard}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverAvatarText}>{driver.avatar}</Text>
            </View>

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{driver.name}</Text>
              <Text style={styles.driverSubText}>
                {driver.carModel} • {driver.licensePlate}
              </Text>
            </View>

            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                style={styles.actionCircle}
                activeOpacity={0.8}
                onPress={() => setChatVisible(true)}
              >
                <ChatBubbleIcon size={18} color={colors.accent.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionCircle}
                activeOpacity={0.8}
              >
                <PhoneIcon size={18} color={colors.accent.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Trip Progress Scrubber Card */}
          <View style={styles.timelineCard}>
            <View style={styles.timelineHeader}>
              <Text style={styles.bookingNumber}>
                {tierName.toUpperCase()} MOBILITY
              </Text>
              <Text style={styles.fareAmount}>R{baseFare}.00</Text>
            </View>

            {/* Live Progress Scrubber */}
            <View style={styles.scrubberContainer}>
              <View style={styles.scrubberTrack}>
                <View
                  style={[
                    styles.scrubberProgress,
                    { width: `${Math.min(100, Math.max(8, progress * 100))}%` },
                  ]}
                />
              </View>
            </View>

            <View style={styles.telemetryMetricsRow}>
              <Text style={styles.metricItemText}>
                {distanceKm} km remaining
              </Text>
              <Text style={styles.metricItemTextYellow}>
                ETA: {etaMinutes} min
              </Text>
            </View>

            {/* Origin & Destination Labels */}
            <View style={styles.routeLocationsRow}>
              <View style={styles.locationItem}>
                <View style={styles.originIndicator} />
                <View style={styles.locationTextWrap}>
                  <Text style={styles.locationLabel}>PICKUP</Text>
                  <Text style={styles.locationName} numberOfLines={1}>
                    {pickup.title}
                  </Text>
                </View>
              </View>

              <View style={styles.locationItem}>
                <View style={styles.destIndicator} />
                <View style={styles.locationTextWrap}>
                  <Text style={styles.locationLabel}>DESTINATION</Text>
                  <Text style={styles.locationName} numberOfLines={1}>
                    {destination.title}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Arrive CTA Button */}
          <TouchableOpacity
            style={styles.arriveButton}
            activeOpacity={0.88}
            onPress={() => navigation.replace("TripCompleted")}
          >
            <Text style={styles.arriveButtonText}>ARRIVED AT DESTINATION</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Driver Chat Modal */}
      <DriverChatModal
        visible={chatVisible}
        onClose={() => setChatVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    height: 56,
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
  headerTitleWrap: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text.primary,
    letterSpacing: -0.2,
  },
  headerSubtitle: {
    fontSize: 11,
    color: colors.text.muted,
    marginTop: 1,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  mapWrap: {
    position: "relative",
    width: "100%",
    height: 240,
  },
  floatingEtaPill: {
    position: "absolute",
    top: 12,
    left: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(22, 22, 26, 0.95)",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.surface.border,
    zIndex: 10,
  },
  etaPulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.primary,
  },
  etaDriverText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.text.primary,
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
    backgroundColor: "rgba(22, 22, 26, 0.95)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  sheetConsole: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  safetyPinBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    position: "relative",
    overflow: "hidden",
    gap: 12,
  },
  safetyPinAccentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: colors.accent.primary,
  },
  safetyPinIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 209, 0, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  safetyPinInfo: {
    flex: 1,
  },
  safetyPinLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: colors.accent.primary,
    letterSpacing: 1.2,
  },
  safetyPinCode: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.text.primary,
    letterSpacing: 4,
    marginVertical: 2,
  },
  safetyPinSubtext: {
    fontSize: 11,
    color: colors.text.secondary,
  },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: 12,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  driverAvatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.accent.contrast,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text.primary,
  },
  driverSubText: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  actionButtonsRow: {
    flexDirection: "row",
    gap: 8,
  },
  actionCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface.elevated,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  timelineCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: spacing.sm,
  },
  timelineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bookingNumber: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.accent.primary,
    letterSpacing: 1,
  },
  fareAmount: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text.primary,
  },
  scrubberContainer: {
    marginVertical: 4,
  },
  scrubberTrack: {
    height: 6,
    backgroundColor: colors.surface.elevated,
    borderRadius: 3,
    overflow: "hidden",
  },
  scrubberProgress: {
    height: 6,
    backgroundColor: colors.accent.primary,
    borderRadius: 3,
  },
  telemetryMetricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metricItemText: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: "600",
  },
  metricItemTextYellow: {
    fontSize: 12,
    color: colors.accent.primary,
    fontWeight: "800",
  },
  routeLocationsRow: {
    gap: 8,
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.surface.border,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  originIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.primary,
  },
  destIndicator: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: colors.text.primary,
  },
  locationTextWrap: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: colors.text.muted,
    letterSpacing: 1,
  },
  locationName: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text.primary,
  },
  arriveButton: {
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
  arriveButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.accent.contrast,
    letterSpacing: 1.2,
  },
});
