import React, { useState, useEffect } from "react";
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
  ArrowLeftIcon,
  ChatBubbleIcon,
  PhoneIcon,
  SeatIcon,
  ShieldCheckIcon,
  StarIcon,
  SteeringWheelIcon,
} from "../../components/common/SvgIcons";
import DarkRouteMap from "../../components/common/DarkRouteMap";
import DriverChatModal from "../../components/common/DriverChatModal";
import { useRide } from "../../services/RideContext";

export default function DriverFoundScreen({
  navigation,
}: RootStackScreenProps<"DriverFound">) {
  const { driver, tier, tierFares, startRide } = useRide();
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

        <Text style={styles.headerTitle}>Driver Matched</Text>

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
        {/* Route Preview on Dark Vector Map */}
        <View style={styles.mapContainer}>
          <DarkRouteMap
            height={180}
            showRoute={true}
            driverEta={`Arriving in ${countdown} min`}
          />
        </View>

        {/* Floating Bottom Sheet Container */}
        <View style={styles.sheetCard}>
          {/* Arrival Status Banner */}
          <View style={styles.arrivalBanner}>
            <Text style={styles.arrivalText}>The driver will arrive in</Text>
            <View style={styles.arrivalBadge}>
              <Text style={styles.arrivalBadgeText}>{countdown} min</Text>
            </View>
          </View>

          {/* Driver Profile Card */}
          <View style={styles.driverProfileCard}>
            <View style={styles.driverAvatarWrap}>
              <Text style={styles.driverAvatarText}>{driver.avatar}</Text>
            </View>

            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{driver.name}</Text>
              <Text style={styles.driverVehicleModel}>{driver.carModel}</Text>
            </View>

            <View style={styles.plateAndRating}>
              <View style={styles.licensePlateBadge}>
                <Text style={styles.licensePlateText}>{driver.licensePlate}</Text>
              </View>
              <View style={styles.ratingRow}>
                <StarIcon size={13} color={colors.accent.primary} />
                <Text style={styles.ratingText}>{driver.rating.toFixed(1)}</Text>
              </View>
            </View>
          </View>

          {/* Vehicle Inspection & Top-Down Render Card */}
          <View style={styles.vehicleOverviewCard}>
            <View style={styles.vehicleSpecsRow}>
              <View style={styles.specItem}>
                <SeatIcon size={16} color={colors.text.secondary} />
                <Text style={styles.specLabel}>4 Seat</Text>
              </View>

              <View style={styles.specItem}>
                <SteeringWheelIcon size={16} color={colors.text.secondary} />
                <Text style={styles.specLabel}>{driver.tripsCount} Trips</Text>
              </View>

              <View style={styles.specItem}>
                <ShieldCheckIcon size={16} color={colors.accent.primary} />
                <Text style={styles.specLabel}>{driver.safetyRating}% Safety</Text>
              </View>
            </View>

            {/* Top-Down 3D Vehicle Visual */}
            <View style={styles.topDownCarWrapper}>
              <Image
                source={require("../../../assets/vehicles/car_top_down.jpg")}
                style={styles.topDownCarImage}
                resizeMode="contain"
              />
            </View>

            {/* Fare Summary in Rands */}
            <View style={styles.fareRow}>
              <View>
                <Text style={styles.tierName}>
                  {tier.toUpperCase()} Ride
                </Text>
                <Text style={styles.paymentMethodLabel}>Cash or Card on arrival</Text>
              </View>
              <Text style={styles.fareAmount}>R{tierFares[tier]}</Text>
            </View>
          </View>

          {/* Chat with Driver CTA */}
          <TouchableOpacity
            style={styles.chatButton}
            activeOpacity={0.85}
            onPress={() => setChatVisible(true)}
          >
            <View style={styles.chatIconBadge}>
              <ChatBubbleIcon size={18} color={colors.accent.contrast} />
            </View>
            <Text style={styles.chatButtonText}>Chat with driver</Text>
            <Text style={styles.chatArrows}>›››</Text>
          </TouchableOpacity>

          {/* Start Ride CTA */}
          <TouchableOpacity
            style={styles.startRideButton}
            activeOpacity={0.85}
            onPress={() => {
              startRide();
              navigation.replace("RideInProgress");
            }}
          >
            <Text style={styles.startRideButtonText}>Start Ride (Driver Arrived)</Text>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
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
    paddingBottom: spacing.xl,
  },
  mapContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sheetCard: {
    backgroundColor: colors.surface.card,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  arrivalBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface.elevated,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginBottom: spacing.md,
  },
  arrivalText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text.primary,
  },
  arrivalBadge: {
    backgroundColor: colors.accent.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  arrivalBadgeText: {
    color: colors.accent.contrast,
    fontSize: 13,
    fontWeight: "bold",
  },
  driverProfileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.subtle,
    borderRadius: 24,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.md,
  },
  driverAvatarWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface.elevated,
    borderWidth: 2,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  driverAvatarText: {
    color: colors.accent.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  driverVehicleModel: {
    fontSize: 13,
    color: colors.text.muted,
    marginTop: 2,
  },
  plateAndRating: {
    alignItems: "flex-end",
    gap: 4,
  },
  licensePlateBadge: {
    backgroundColor: colors.surface.elevated,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.accent.primary,
  },
  licensePlateText: {
    color: colors.accent.primary,
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  vehicleOverviewCard: {
    backgroundColor: colors.surface.elevated,
    borderRadius: 28,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.md,
  },
  vehicleSpecsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.border,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  specLabel: {
    color: colors.text.secondary,
    fontSize: 13,
    fontWeight: "600",
  },
  topDownCarWrapper: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.xs,
  },
  topDownCarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  fareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.surface.border,
  },
  tierName: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  paymentMethodLabel: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 2,
  },
  fareAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  chatButton: {
    backgroundColor: colors.accent.primary,
    height: 56,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    justifyContent: "space-between",
  },
  chatIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(7, 26, 61, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  chatButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
  chatArrows: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.accent.contrast,
    letterSpacing: -2,
  },
  startRideButton: {
    backgroundColor: colors.surface.elevated,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
  },
  startRideButtonText: {
    color: colors.accent.primary,
    fontSize: 15,
    fontWeight: "bold",
  },
});
