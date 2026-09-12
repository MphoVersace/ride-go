import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
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
import { useRide } from "../../services/RideContext";
import Svg, { Circle } from "react-native-svg";
import { PinIcon } from "../../components/common/SvgIcons";

export default function RideSearchingScreen({
  navigation,
}: RootStackScreenProps<"RideSearching">) {
  const { pickup, destination, tier, tierFares, matchDriver } = useRide();
  const [statusText, setStatusText] = useState("Connecting to nearby drivers...");

  const pulseAnim1 = useRef(new Animated.Value(0.2)).current;
  const pulseAnim2 = useRef(new Animated.Value(0.2)).current;
  const pulseAnim3 = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    // Staggered radar ripple loops
    const createPulse = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.2,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const pulse1 = createPulse(pulseAnim1, 0);
    const pulse2 = createPulse(pulseAnim2, 600);
    const pulse3 = createPulse(pulseAnim3, 1200);

    pulse1.start();
    pulse2.start();
    pulse3.start();

    // Cycling status messages simulating matching
    const t1 = setTimeout(() => {
      setStatusText("Analyzing shortest route on Kings Way...");
    }, 1200);

    const t2 = setTimeout(() => {
      setStatusText("Driver matched! Preparing details...");
    }, 2400);

    const t3 = setTimeout(() => {
      matchDriver();
      navigation.replace("DriverFound");
    }, 3200);

    return () => {
      pulse1.stop();
      pulse2.stop();
      pulse3.stop();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigation, matchDriver, pulseAnim1, pulseAnim2, pulseAnim3]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <View style={styles.container}>
        {/* Tier & Price Badge */}
        <View style={styles.tierBadge}>
          <Text style={styles.tierBadgeText}>
            {tier.toUpperCase()} • R{tierFares[tier]}
          </Text>
        </View>

        {/* Animated Radar Center Area */}
        <View style={styles.radarContainer}>
          {/* Radar Ring 3 */}
          <Animated.View
            style={[
              styles.radarRing,
              {
                transform: [
                  {
                    scale: pulseAnim3.interpolate({
                      inputRange: [0.2, 1],
                      outputRange: [0.6, 2.4],
                    }),
                  },
                ],
                opacity: pulseAnim3.interpolate({
                  inputRange: [0.2, 1],
                  outputRange: [0.7, 0],
                }),
              },
            ]}
          />

          {/* Radar Ring 2 */}
          <Animated.View
            style={[
              styles.radarRing,
              {
                transform: [
                  {
                    scale: pulseAnim2.interpolate({
                      inputRange: [0.2, 1],
                      outputRange: [0.6, 2.0],
                    }),
                  },
                ],
                opacity: pulseAnim2.interpolate({
                  inputRange: [0.2, 1],
                  outputRange: [0.8, 0],
                }),
              },
            ]}
          />

          {/* Radar Ring 1 */}
          <Animated.View
            style={[
              styles.radarRing,
              {
                transform: [
                  {
                    scale: pulseAnim1.interpolate({
                      inputRange: [0.2, 1],
                      outputRange: [0.6, 1.5],
                    }),
                  },
                ],
                opacity: pulseAnim1.interpolate({
                  inputRange: [0.2, 1],
                  outputRange: [0.9, 0],
                }),
              },
            ]}
          />

          {/* Center Radar Dispatch Beacon (Zero Cars) */}
          <View style={styles.centerNode}>
            <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
              <Circle cx={20} cy={20} r={17} fill={colors.surface.card} stroke={colors.accent.primary} strokeWidth={2.5} />
              <Circle cx={20} cy={20} r={8} fill={colors.accent.primary} />
            </Svg>
          </View>
        </View>

        {/* Dynamic Status Text */}
        <Text style={styles.headline}>Looking for a ride</Text>
        <Text style={styles.statusTicker}>{statusText}</Text>

        {/* Location Route Card */}
        <View style={styles.routeCard}>
          <View style={styles.routeItem}>
            <PinIcon size={16} color={colors.accent.primary} />
            <Text style={styles.routeText} numberOfLines={1}>
              {pickup.title}
            </Text>
          </View>
          <View style={styles.routeDivider} />
          <View style={styles.routeItem}>
            <PinIcon size={16} color={colors.text.secondary} />
            <Text style={styles.routeText} numberOfLines={1}>
              {destination.title}
            </Text>
          </View>
        </View>

        {/* Cancel Button */}
        <TouchableOpacity
          style={styles.cancelBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("RiderHome")}
        >
          <Text style={styles.cancelBtnText}>Cancel Search</Text>
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
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.lg,
  },
  tierBadge: {
    backgroundColor: colors.surface.elevated,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.accent.primary,
  },
  tierBadgeText: {
    color: colors.accent.primary,
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  radarContainer: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.xl,
    position: "relative",
  },
  radarRing: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: colors.accent.primary,
    backgroundColor: colors.accent.subtle,
  },
  centerNode: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.surface.card,
    borderWidth: 2,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  headline: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 6,
  },
  statusTicker: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: "center",
    minHeight: 20,
    marginBottom: spacing.md,
  },
  routeCard: {
    width: "100%",
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  routeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  routeDivider: {
    height: 12,
    width: 1,
    backgroundColor: colors.surface.border,
    marginLeft: 7,
    marginVertical: 4,
  },
  routeText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  cancelBtn: {
    width: "100%",
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface.card,
  },
  cancelBtnText: {
    color: colors.text.muted,
    fontSize: 15,
    fontWeight: "bold",
  },
});
