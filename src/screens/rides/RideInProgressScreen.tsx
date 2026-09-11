import React, { useEffect, useState } from "react";
import {
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
  ArrowRightIcon,
} from "../../components/common/SvgIcons";
import DarkRouteMap from "../../components/common/DarkRouteMap";

export default function RideInProgressScreen({
  navigation,
}: RootStackScreenProps<"RideInProgress">) {
  const [etaMinutes, setEtaMinutes] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("RiderHome")}
        >
          <ArrowLeftIcon size={20} color={colors.text.primary} />
        </TouchableOpacity>

        <View style={styles.statusPill}>
          <View style={styles.pulsingDot} />
          <Text style={styles.statusText}>On Route</Text>
        </View>

        <TouchableOpacity
          style={styles.safetyButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("SafetyCentre")}
        >
          <ShieldCheckIcon size={20} color={colors.accent.primary} />
        </TouchableOpacity>
      </View>

      {/* Main Vector Dark Map View */}
      <View style={styles.mapWrap}>
        <DarkRouteMap height={280} showRoute={true} driverEta={`${etaMinutes} min`} />
      </View>

      {/* Active Trip Dashboard Sheet */}
      <View style={styles.tripSheet}>
        {/* Navigation Instruction Pill */}
        <View style={styles.navTicker}>
          <View style={styles.navTurnIcon}>
            <Text style={styles.navTurnArrow}>↰</Text>
          </View>
          <View style={styles.navTickerTextWrap}>
            <Text style={styles.navTurnDistance}>In 250m</Text>
            <Text style={styles.navTurnStreet}>Turn left onto Strand Street</Text>
          </View>
        </View>

        {/* Route Details */}
        <View style={styles.routePoints}>
          <View style={styles.routeItem}>
            <PinIcon size={16} color={colors.accent.primary} />
            <Text style={styles.routeText} numberOfLines={1}>
              14 Long St, Cape Town
            </Text>
          </View>
          <View style={styles.routeDivider} />
          <View style={styles.routeItem}>
            <PinIcon size={16} color={colors.text.secondary} />
            <Text style={styles.routeText} numberOfLines={1}>
              V&A Waterfront, Cape Town
            </Text>
          </View>
        </View>

        {/* Driver Quick Bar */}
        <View style={styles.driverBar}>
          <View style={styles.driverAvatar}>
            <Text style={styles.driverAvatarText}>UB</Text>
          </View>
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>Ucok Behel</Text>
            <Text style={styles.carPlate}>Honda CR-V • AB6299ZG</Text>
          </View>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.circleAction}>
              <PhoneIcon size={18} color={colors.text.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleAction}>
              <ChatBubbleIcon size={18} color={colors.accent.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Complete Trip Simulation Button */}
        <TouchableOpacity
          style={styles.arriveButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("TripCompleted")}
        >
          <Text style={styles.arriveButtonText}>Arrived at Destination</Text>
          <ArrowRightIcon size={20} color={colors.accent.contrast} />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
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
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.accent.primary,
    gap: 8,
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.primary,
  },
  statusText: {
    color: colors.accent.primary,
    fontWeight: "bold",
    fontSize: 13,
  },
  safetyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface.card,
    borderWidth: 1,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  mapWrap: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  tripSheet: {
    backgroundColor: colors.surface.card,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: spacing.sm,
  },
  navTicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.elevated,
    borderRadius: 20,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  navTurnIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  navTurnArrow: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
  navTickerTextWrap: {
    flex: 1,
  },
  navTurnDistance: {
    color: colors.accent.primary,
    fontSize: 12,
    fontWeight: "bold",
  },
  navTurnStreet: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  routePoints: {
    backgroundColor: colors.surface.subtle,
    borderRadius: 18,
    padding: spacing.sm,
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  routeDivider: {
    height: 12,
    width: 1,
    backgroundColor: colors.surface.border,
    marginLeft: 7,
    marginVertical: 2,
  },
  routeText: {
    fontSize: 13,
    color: colors.text.primary,
    fontWeight: "500",
  },
  driverBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.elevated,
    borderRadius: 20,
    padding: spacing.sm,
  },
  driverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface.subtle,
    borderWidth: 1,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  driverAvatarText: {
    color: colors.accent.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  carPlate: {
    fontSize: 12,
    color: colors.text.muted,
  },
  actionRow: {
    flexDirection: "row",
    gap: 8,
  },
  circleAction: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface.card,
    borderWidth: 1,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  arriveButton: {
    backgroundColor: colors.accent.primary,
    height: 52,
    borderRadius: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  arriveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
});
