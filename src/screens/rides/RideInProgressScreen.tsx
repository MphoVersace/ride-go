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
  ShieldCheckIcon,
  PinIcon,
  TargetIcon,
  StarIcon,
  ArrowRightIcon,
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
          style={styles.safetyButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("SafetyCentre")}
        >
          <ShieldCheckIcon size={20} color={colors.accent.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Realtime Moving Vector Map with Destination Callout */}
        <View style={styles.mapWrap}>
          <DarkRouteMap
            height={260}
            showRoute={true}
            driverEta={`${etaMinutes} min`}
            progress={progress}
          />
        </View>

        {/* Live Status Bar matching video reference */}
        <View style={styles.liveStatusRow}>
          <View style={styles.statusIndicatorPill}>
            <View style={styles.pulsingDot} />
            <Text style={styles.statusText}>
              In transit • arriving in {etaMinutes} min
            </Text>
          </View>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceBadgeText}>{distanceKm} km left</Text>
          </View>
        </View>

        {/* Driver Header Card with Call/Chat Triggers */}
        <View style={styles.driverCard}>
          <View style={styles.driverAvatar}>
            <Text style={styles.driverAvatarText}>{driver.avatar}</Text>
          </View>

          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{driver.name}</Text>
            <View style={styles.driverRatingRow}>
              <StarIcon size={14} color={colors.accent.primary} filled />
              <Text style={styles.driverRatingText}>
                {driver.rating} • {driver.carModel}
              </Text>
            </View>
            <Text style={styles.plateNumber}>{driver.licensePlate}</Text>
          </View>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity style={styles.actionCircle} activeOpacity={0.8}>
              <PhoneIcon size={18} color={colors.text.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionCircle, styles.chatCircleActive]}
              activeOpacity={0.8}
              onPress={() => setChatVisible(true)}
            >
              <ChatBubbleIcon size={18} color={colors.accent.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Route Scrubber Timeline Card matching video reference */}
        <View style={styles.timelineCard}>
          <View style={styles.timelineHeader}>
            <Text style={styles.bookingNumber}>TRIP DETAILS ({tierName.toUpperCase()})</Text>
            <Text style={styles.fareAmount}>R{baseFare}.00</Text>
          </View>

          {/* Animated Timeline Scrubber */}
          <View style={styles.scrubberContainer}>
            <View style={styles.scrubberTrack}>
              <View
                style={[
                  styles.scrubberProgress,
                  { width: `${Math.min(100, Math.max(8, progress * 100))}%` },
                ]}
              />
            </View>
            <View
              style={[
                styles.scrubberThumb,
                { left: `${Math.min(94, Math.max(4, progress * 100))}%` },
              ]}
            >
              <View style={styles.scrubberThumbDot} />
            </View>
          </View>

          {/* Origin & Destination Labels */}
          <View style={styles.routeLocationsRow}>
            <View style={styles.locationItem}>
              <View style={styles.originIndicator}>
                <PinIcon size={14} color={colors.accent.primary} />
              </View>
              <View style={styles.locationTextWrap}>
                <Text style={styles.locationLabel}>PICKUP</Text>
                <Text style={styles.locationName} numberOfLines={1}>
                  {pickup.title}
                </Text>
              </View>
            </View>

            <View style={styles.locationItem}>
              <View style={styles.destIndicator}>
                <TargetIcon size={14} color={colors.accent.secondary} />
              </View>
              <View style={styles.locationTextWrap}>
                <Text style={styles.locationLabel}>DESTINATION</Text>
                <Text style={styles.locationName} numberOfLines={1}>
                  {destination.title}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Complete Trip CTA */}
        <TouchableOpacity
          style={styles.arriveButton}
          activeOpacity={0.85}
          onPress={() => navigation.replace("TripCompleted")}
        >
          <Text style={styles.arriveButtonText}>Arrived at Destination</Text>
          <ArrowRightIcon size={18} color={colors.accent.contrast} />
        </TouchableOpacity>
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
  headerTitleWrap: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  headerSubtitle: {
    fontSize: 11,
    color: colors.text.muted,
    marginTop: 1,
  },
  safetyButton: {
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
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  mapWrap: {
    marginVertical: spacing.sm,
  },
  liveStatusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: spacing.xs,
  },
  statusIndicatorPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: 8,
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.primary,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text.primary,
  },
  distanceBadge: {
    backgroundColor: colors.surface.cardAlt,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  distanceBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 22,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    marginVertical: spacing.xs,
    gap: spacing.sm,
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surface.cardAlt,
    borderWidth: 2,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  driverAvatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "bold",
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
  plateNumber: {
    fontSize: 11,
    color: colors.text.muted,
    fontWeight: "600",
    marginTop: 2,
  },
  actionButtonsRow: {
    flexDirection: "row",
    gap: 8,
  },
  actionCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  chatCircleActive: {
    borderColor: colors.accent.primary,
  },
  timelineCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 22,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    marginVertical: spacing.xs,
  },
  timelineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  bookingNumber: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.text.muted,
    letterSpacing: 0.5,
  },
  fareAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  scrubberContainer: {
    height: 20,
    justifyContent: "center",
    position: "relative",
    marginBottom: spacing.md,
  },
  scrubberTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surface.cardAlt,
    overflow: "hidden",
  },
  scrubberProgress: {
    height: "100%",
    backgroundColor: colors.accent.primary,
  },
  scrubberThumb: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -9,
    borderWidth: 2,
    borderColor: colors.surface.card,
  },
  scrubberThumbDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.background.primary,
  },
  routeLocationsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  locationItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  originIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  destIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  locationTextWrap: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.text.muted,
  },
  locationName: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text.primary,
    marginTop: 1,
  },
  arriveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent.primary,
    height: 54,
    borderRadius: 27,
    marginTop: spacing.sm,
    gap: 8,
  },
  arriveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
});
