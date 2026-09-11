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
  ArrowRightIcon,
  StarIcon,
  WalletIcon,
  HomeIcon,
  ShieldCheckIcon,
  ChatBubbleIcon,
  SettingsIcon,
  CheckCircleIcon,
  EditIcon,
} from "../../components/common/SvgIcons";
import { useRide } from "../../services/RideContext";

export default function RiderProfileScreen({
  navigation,
}: RootStackScreenProps<"RiderProfile">) {
  const { userProfile, walletBalance, savedPlaces, rideHistory } = useRide();

  const menuSections = [
    {
      id: "history",
      title: "Trip History",
      subtitle: "Review your completed trips & receipts",
      icon: <CheckCircleIcon size={20} color={colors.accent.primary} />,
      badge: `${rideHistory.length} trips`,
      onPress: () => navigation.navigate("RideHistory"),
    },
    {
      id: "payments",
      title: "Wallet & Payments",
      subtitle: "Top up wallet & manage cards",
      icon: <WalletIcon size={20} color={colors.accent.primary} />,
      badge: `R${walletBalance}.00`,
      onPress: () => navigation.navigate("PaymentMethods"),
    },
    {
      id: "places",
      title: "Saved Places",
      subtitle: "Home, Work & favorites",
      icon: <HomeIcon size={20} color={colors.accent.primary} />,
      badge: `${savedPlaces.length} saved`,
      onPress: () => navigation.navigate("SavedPlaces"),
    },
    {
      id: "safety",
      title: "Safety Centre",
      subtitle: "Emergency contacts & 24/7 assistance",
      icon: <ShieldCheckIcon size={20} color={colors.accent.primary} />,
      onPress: () => navigation.navigate("SafetyCentre"),
    },
    {
      id: "settings",
      title: "Preferences & Settings",
      subtitle: "Notifications, privacy & app options",
      icon: <SettingsIcon size={20} color={colors.accent.primary} />,
      onPress: () => navigation.navigate("Settings"),
    },
    {
      id: "support",
      title: "Help & Support",
      subtitle: "Contact RideGo team & FAQs",
      icon: <ChatBubbleIcon size={20} color={colors.accent.primary} />,
      onPress: () => navigation.navigate("HelpSupport"),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Nav Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Rider Profile</Text>
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <EditIcon size={18} color={colors.accent.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{userProfile.avatar}</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <ShieldCheckIcon size={14} color={colors.accent.contrast} />
            </View>
          </View>

          <View style={styles.userInfoWrap}>
            <Text style={styles.userName}>{userProfile.name}</Text>
            <Text style={styles.userPhone}>{userProfile.phone}</Text>
            <Text style={styles.userEmail}>{userProfile.email}</Text>

            <View style={styles.ratingRow}>
              <StarIcon size={14} color={colors.accent.primary} filled />
              <Text style={styles.ratingText}>{userProfile.rating} Rating</Text>
              <Text style={styles.ratingDot}>•</Text>
              <Text style={styles.memberSince}>Since {userProfile.memberSince}</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {userProfile.completedRides + rideHistory.length}
            </Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{userProfile.totalDistance}</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>R{walletBalance}</Text>
            <Text style={styles.statLabel}>Wallet</Text>
          </View>
        </View>

        <Text style={styles.sectionHeader}>Account Menu</Text>

        {/* Menu Rows */}
        {menuSections.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuRow}
            activeOpacity={0.85}
            onPress={item.onPress}
          >
            <View style={styles.menuIconCircle}>{item.icon}</View>

            <View style={styles.menuInfo}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>

            {item.badge && (
              <View style={styles.badgeWrap}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}

            <View style={styles.arrowWrap}>
              <ArrowRightIcon size={16} color={colors.accent.primary} />
            </View>
          </TouchableOpacity>
        ))}
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
  editButton: {
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
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 24,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    marginVertical: spacing.md,
    gap: spacing.md,
  },
  avatarWrap: {
    position: "relative",
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface.cardAlt,
    borderWidth: 2.5,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  userInfoWrap: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  userPhone: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },
  userEmail: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 1,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  ratingDot: {
    fontSize: 12,
    color: colors.text.muted,
  },
  memberSince: {
    fontSize: 11,
    color: colors.text.muted,
  },
  statsGrid: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 18,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.md,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  statLabel: {
    fontSize: 11,
    color: colors.text.muted,
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.surface.border,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  menuIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  menuSubtitle: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  badgeWrap: {
    backgroundColor: colors.surface.cardAlt,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  arrowWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
});
