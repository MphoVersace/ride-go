import React, { useState, useEffect } from "react";
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

export default function DriverFoundScreen({
  navigation,
}: RootStackScreenProps<"DriverFound">) {
  const { pickup, destination, driver, tier, tierFares, startRide } = useRide();
  const [chatVisible, setChatVisible] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev: number) => (prev > 1 ? prev - 1 : 1));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={20} color={colors.text.primary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Live Driver Tracking</Text>

        <TouchableOpacity
          style={styles.callButton}
          activeOpacity={0.8}
        >
          <PhoneIcon size={18} color={colors.accent.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Map Viewport Container */}
        <View style={styles.mapContainer}>
          <DarkRouteMap
            height={220}
            showRoute={true}
            driverEta={`Arriving in ${countdown} min`}
          />

          {/* Floating Top Live ETA Status Pill */}
          <View style={styles.floatingEtaPill}>
            <View style={styles.etaPulseDot} />
            <Text style={styles.etaDriverText}>
              {driver.name} is {countdown} mins away
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
          {/* Safety Code PIN Banner */}
          <View style={styles.safetyPinBanner}>
            <View style={styles.safetyPinAccentBar} />
            <View style={styles.safetyPinIconWrap}>
              <LockIcon size={18} color={colors.accent.primary} />
            </View>
            <View style={styles.safetyPinInfo}>
              <Text style={styles.safetyPinLabel}>SAFETY VERIFICATION PIN</Text>
              <Text style={styles.safetyPinCode}>4821</Text>
              <Text style={styles.safetyPinSubtext}>
                Provide this 4-digit code to your driver before boarding
              </Text>
            </View>
          </View>

          {/* Driver Profile Card */}
          <View style={styles.driverProfileCard}>
            <View style={styles.driverAvatarWrap}>
              <Text style={styles.driverAvatarText}>{driver.avatar}</Text>
            </View>

            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{driver.name}</Text>
              <Text style={styles.driverVehicleModel}>
                {driver.carModel} • {driver.licensePlate}
              </Text>
            </View>

            <View style={styles.driverActionsRow}>
              <TouchableOpacity
                style={styles.actionIconButton}
                activeOpacity={0.8}
                onPress={() => setChatVisible(true)}
              >
                <ChatBubbleIcon size={18} color={colors.accent.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionIconButton}
                activeOpacity={0.8}
              >
                <PhoneIcon size={18} color={colors.accent.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Route & Fare Telemetry Card */}
          <View style={styles.routeTelemetryCard}>
            <View style={styles.routeRow}>
              <View style={styles.routeDotOrigin} />
              <Text style={styles.routePointText} numberOfLines={1}>
                {pickup.title || "Current Location"}
              </Text>
            </View>
            <View style={styles.routeDividerLine} />
            <View style={styles.routeRow}>
              <View style={styles.routeDotDest} />
              <Text style={styles.routePointText} numberOfLines={1}>
                {destination.title || "Destination Point"}
              </Text>
            </View>

            <View style={styles.fareRow}>
              <View>
                <Text style={styles.tierName}>{tier.toUpperCase()} MOBILITY</Text>
                <Text style={styles.paymentMethodLabel}>
                  Upfront Fixed Fare
                </Text>
              </View>
              <Text style={styles.fareAmount}>R{tierFares[tier]}.00</Text>
            </View>
          </View>

          {/* Start Ride CTA */}
          <TouchableOpacity
            style={styles.startRideButton}
            activeOpacity={0.88}
            onPress={() => {
              startRide();
              navigation.replace("RideInProgress");
            }}
          >
            <Text style={styles.startRideButtonText}>
              START RIDE (DRIVER ARRIVED)
            </Text>
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
    borderWidth: 1,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text.primary,
    letterSpacing: -0.2,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface.card,
    borderWidth: 1,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  mapContainer: {
    position: "relative",
    width: "100%",
    height: 220,
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
  driverProfileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: 12,
  },
  driverAvatarWrap: {
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
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text.primary,
  },
  driverVehicleModel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  driverActionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  actionIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface.elevated,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  routeTelemetryCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: 8,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  routeDotOrigin: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.primary,
  },
  routeDotDest: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: colors.text.primary,
  },
  routePointText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.text.primary,
    flex: 1,
  },
  routeDividerLine: {
    height: 1,
    backgroundColor: colors.surface.border,
    marginLeft: 16,
  },
  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.surface.border,
  },
  tierName: {
    fontSize: 11,
    fontWeight: "800",
    color: colors.accent.primary,
    letterSpacing: 1,
  },
  paymentMethodLabel: {
    fontSize: 11,
    color: colors.text.muted,
    marginTop: 1,
  },
  fareAmount: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text.primary,
  },
  startRideButton: {
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
  startRideButtonText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.accent.contrast,
    letterSpacing: 1.2,
  },
});
