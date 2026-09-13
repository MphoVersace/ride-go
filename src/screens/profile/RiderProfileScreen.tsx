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
  WalletIcon,
  HomeIcon,
  SettingsIcon,
  ChatBubbleIcon,
  CheckCircleIcon,
  EditIcon,
  CapitecIcon,
  CreditCardIcon,
  KeypadPinIcon,
  ShareIcon,
  PhoneCallIcon,
  TagIcon,
  SouthAfricaFlagSvg,
} from "../../components/common/SvgIcons";
import { useRide } from "../../services/RideContext";
import BottomTabBar, { TabKey } from "../../components/common/BottomTabBar";

export default function RiderProfileScreen({
  navigation,
}: RootStackScreenProps<any>) {
  const { userProfile, rideHistory, walletBalance, savedPlaces } = useRide();

  const handleTabPress = (tab: TabKey) => {
    if (tab === "explore" || tab === "home") {
      navigation.navigate("Explore");
    } else if (tab === "rides") {
      navigation.navigate("Rides");
    } else if (tab === "activity" || tab === "trips") {
      navigation.navigate("Activity");
    } else if (tab === "account" || tab === "profile") {
      // Current tab
    }
  };

  const displayName = userProfile?.name || "Nomvula Zungu";
  const displayEmail = userProfile?.email || "nomvula.zungu@ridego.co.za";
  const displayPhone = userProfile?.phone || "+27 82 491 0842";
  const displayTrips = Math.max(28, (userProfile?.completedRides || 0) + rideHistory.length);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Top Header */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate("Explore");
            }
          }}
        >
          <ArrowLeftIcon size={18} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.navHeaderCenter}>
          <Text style={styles.navBrand}>RIDE GO</Text>
          <Text style={styles.navSubtitle}>Identity & Account</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <EditIcon size={16} color={colors.accent.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stitch Screen Step 5 of 5 Banner */}
        <View style={styles.stepProgressCard}>
          <View style={styles.stepProgressHeader}>
            <View style={styles.stepIndicatorLeft}>
              <CheckCircleIcon size={16} color={colors.accent.primary} />
              <Text style={styles.stepProgressTitle}>Step 5 of 5</Text>
            </View>
            <Text style={styles.stepProgressPercent}>100% Ready</Text>
          </View>
          <View style={styles.progressBarTrack}>
            <View style={styles.progressBarFill} />
          </View>
        </View>

        {/* Verification Complete Status Card */}
        <View style={styles.verificationCard}>
          <View style={styles.verificationBadgeRow}>
            <SouthAfricaFlagSvg width={18} height={12} />
            <Text style={styles.verificationBadgeText}>
              Identity Cleared • Tier 1 Verified Rider
            </Text>
          </View>
          <Text style={styles.verificationTitle}>Verification Complete!</Text>
          <Text style={styles.verificationSubtitle}>
            Welcome {displayName}, your verified Ride-Go account is fully active
            and cleared for fast urban dispatch.
          </Text>
        </View>

        {/* Rider Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileTopRow}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitials}>
                {displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </Text>
              <View style={styles.avatarCheckBadge}>
                <CheckCircleIcon size={14} color={colors.accent.contrast} />
              </View>
            </View>

            <View style={styles.profileInfoWrap}>
              <Text style={styles.profileName}>{displayName}</Text>
              <Text style={styles.profileMeta}>
                SA ID verified • Phone & Email authenticated
              </Text>
              <View style={styles.idChipRow}>
                <View style={styles.idChip}>
                  <Text style={styles.idChipText}>SmartID: 9403••••084</Text>
                </View>
                <View style={styles.tierChip}>
                  <Text style={styles.tierChipText}>Tier 1</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Quick Metrics */}
          <View style={styles.metricsRow}>
            <View style={styles.metricBox}>
              <Text style={styles.metricVal}>{displayTrips}</Text>
              <Text style={styles.metricLbl}>Completed</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricBox}>
              <Text style={styles.metricVal}>R{walletBalance || 150}.00</Text>
              <Text style={styles.metricLbl}>Wallet</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricBox}>
              <Text style={styles.metricVal}>4.98</Text>
              <Text style={styles.metricLbl}>Transit Rating</Text>
            </View>
          </View>
        </View>

        {/* Stitch Promo Card: RIDEGOFIRST */}
        <View style={styles.promoCard}>
          <View style={styles.promoHeader}>
            <View style={styles.promoIconWrap}>
              <TagIcon size={18} color={colors.accent.primary} />
            </View>
            <View style={styles.promoHeaderTextWrap}>
              <Text style={styles.promoTitle}>R50 Off First 3 Rides</Text>
              <Text style={styles.promoSubtitle}>
                Applied automatically at checkout
              </Text>
            </View>
            <View style={styles.promoStatusChip}>
              <Text style={styles.promoStatusText}>ACTIVATED</Text>
            </View>
          </View>

          <View style={styles.promoCodeRow}>
            <View style={styles.promoCodePill}>
              <Text style={styles.promoCodeText}>RIDEGOFIRST</Text>
            </View>
            <Text style={styles.promoSavingsText}>Saves up to R150</Text>
          </View>
        </View>

        {/* Stitch Preferred Payment Method Card */}
        <View style={styles.paymentSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeaderTitle}>Preferred Payment</Text>
            <View style={styles.activeCheckRow}>
              <CheckCircleIcon size={14} color={colors.accent.primary} />
              <Text style={styles.activeCheckText}>Active</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryPaymentCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("PaymentMethods")}
          >
            <View style={styles.paymentIconBox}>
              <CapitecIcon size={20} color={colors.accent.primary} />
            </View>
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentTitle}>Capitec Pay</Text>
              <Text style={styles.paymentSubtitle}>
                Linked via Open Banking • Auto-approval
              </Text>
            </View>
            <View style={styles.bonusChip}>
              <Text style={styles.bonusChipText}>R20 Bonus</Text>
            </View>
          </TouchableOpacity>

          {/* Alternative Payment Methods */}
          <View style={styles.altPaymentRow}>
            <TouchableOpacity
              style={styles.altPaymentPill}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("PaymentMethods")}
            >
              <WalletIcon size={14} color={colors.accent.primary} />
              <Text style={styles.altPaymentText}>Ozow Instant EFT</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.altPaymentPill}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("PaymentMethods")}
            >
              <CreditCardIcon size={14} color={colors.text.secondary} />
              <Text style={styles.altPaymentText}>Visa / Mastercard</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stitch Active Urban Safety Safeguards */}
        <View style={styles.safetySection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeaderTitle}>
              Active Urban Safety Safeguards
            </Text>
            <Text style={styles.safeguardCounter}>3 Enabled</Text>
          </View>

          <View style={styles.safeguardsList}>
            {/* Safeguard 1: PIN */}
            <View style={styles.safeguardItem}>
              <View style={styles.safeguardIconBox}>
                <KeypadPinIcon size={18} color={colors.accent.primary} />
              </View>
              <View style={styles.safeguardContent}>
                <Text style={styles.safeguardTitle}>
                  4-Digit Ride PIN Security
                </Text>
                <Text style={styles.safeguardDesc}>
                  Car will not start trip until driver enters your dynamic code.
                </Text>
              </View>
            </View>

            {/* Safeguard 2: WhatsApp Route Mirroring */}
            <View style={styles.safeguardItem}>
              <View style={styles.safeguardIconBox}>
                <ShareIcon size={18} color={colors.accent.primary} />
              </View>
              <View style={styles.safeguardContent}>
                <Text style={styles.safeguardTitle}>Live Trip Share</Text>
                <Text style={styles.safeguardDesc}>
                  Automatic WhatsApp route mirroring to 2 trusted contacts.
                </Text>
              </View>
            </View>

            {/* Safeguard 3: Emergency Link */}
            <View style={[styles.safeguardItem, { borderBottomWidth: 0 }]}>
              <View style={styles.safeguardIconBox}>
                <PhoneCallIcon size={18} color={colors.accent.primary} />
              </View>
              <View style={styles.safeguardContent}>
                <Text style={styles.safeguardTitle}>
                  Rapid Response & Medical Link
                </Text>
                <Text style={styles.safeguardDesc}>
                  Direct coordination with South African national emergency
                  dispatch teams.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Account Navigation Links */}
        <View style={styles.menuLinksSection}>
          <TouchableOpacity
            style={styles.menuLinkItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("SavedPlaces")}
          >
            <HomeIcon size={18} color={colors.accent.primary} />
            <View style={styles.menuLinkTextWrap}>
              <Text style={styles.menuLinkTitle}>Saved Places</Text>
              <Text style={styles.menuLinkSubtitle}>
                {savedPlaces.length} saved destinations
              </Text>
            </View>
            <ArrowRightIcon size={14} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuLinkItem}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Settings")}
          >
            <SettingsIcon size={18} color={colors.accent.primary} />
            <View style={styles.menuLinkTextWrap}>
              <Text style={styles.menuLinkTitle}>Preferences & Settings</Text>
              <Text style={styles.menuLinkSubtitle}>
                Notifications, security & language
              </Text>
            </View>
            <ArrowRightIcon size={14} color={colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuLinkItem, { borderBottomWidth: 0 }]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("HelpSupport")}
          >
            <ChatBubbleIcon size={18} color={colors.accent.primary} />
            <View style={styles.menuLinkTextWrap}>
              <Text style={styles.menuLinkTitle}>Help & Support</Text>
              <Text style={styles.menuLinkSubtitle}>
                24/7 dedicated transit assistance
              </Text>
            </View>
            <ArrowRightIcon size={14} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Stitch Bottom CTA Button: Start Riding with Ride-Go */}
        <TouchableOpacity
          style={styles.primaryCtaButton}
          activeOpacity={0.88}
          onPress={() => navigation.navigate("Explore")}
        >
          <View style={styles.ctaContentRow}>
            <View>
              <Text style={styles.ctaTitle}>Start Riding with Ride-Go</Text>
              <Text style={styles.ctaSubtitle}>
                Tap to browse drivers near Johannesburg Metro • Fast pickup
              </Text>
            </View>
            <View style={styles.ctaArrowCircle}>
              <ArrowRightIcon size={18} color={colors.accent.contrast} />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* 4-Tab Navigation Bar */}
      <BottomTabBar activeTab="account" onSelectTab={handleTabPress} />
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
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.border,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  navHeaderCenter: {
    alignItems: "center",
  },
  navBrand: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.accent.primary,
    letterSpacing: 2,
  },
  navSubtitle: {
    fontSize: 10,
    color: colors.text.secondary,
    fontWeight: "600",
    marginTop: 1,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: 96,
    gap: spacing.md,
  },
  stepProgressCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 14,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: 8,
  },
  stepProgressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepIndicatorLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  stepProgressTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.text.primary,
  },
  stepProgressPercent: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  progressBarTrack: {
    height: 4,
    backgroundColor: colors.surface.border,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.accent.primary,
  },
  verificationCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: 6,
  },
  verificationBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  verificationBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.accent.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  verificationTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text.primary,
  },
  verificationSubtitle: {
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  profileCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: spacing.md,
  },
  profileTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surface.elevated,
    borderWidth: 2,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarInitials: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.accent.primary,
  },
  avatarCheckBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: colors.accent.primary,
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfoWrap: {
    flex: 1,
    gap: 2,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text.primary,
  },
  profileMeta: {
    fontSize: 11,
    color: colors.text.muted,
  },
  idChipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  idChip: {
    backgroundColor: colors.surface.elevated,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  idChipText: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.text.secondary,
  },
  tierChip: {
    backgroundColor: colors.surface.elevated,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.accent.primary,
  },
  tierChipText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.accent.primary,
  },
  metricsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.elevated,
    borderRadius: 12,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  metricBox: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  metricVal: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.text.primary,
  },
  metricLbl: {
    fontSize: 10,
    color: colors.text.muted,
    fontWeight: "600",
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.surface.border,
  },
  promoCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.accent.primary,
    gap: spacing.sm,
  },
  promoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  promoIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.surface.elevated,
    alignItems: "center",
    justifyContent: "center",
  },
  promoHeaderTextWrap: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text.primary,
  },
  promoSubtitle: {
    fontSize: 11,
    color: colors.text.muted,
    marginTop: 1,
  },
  promoStatusChip: {
    backgroundColor: colors.accent.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  promoStatusText: {
    fontSize: 9,
    fontWeight: "900",
    color: colors.accent.contrast,
    letterSpacing: 0.5,
  },
  promoCodeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface.elevated,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  promoCodePill: {
    backgroundColor: colors.surface.card,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  promoCodeText: {
    fontSize: 12,
    fontWeight: "900",
    color: colors.accent.primary,
    letterSpacing: 1.5,
  },
  promoSavingsText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.text.secondary,
  },
  paymentSection: {
    gap: 8,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeaderTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.text.primary,
    letterSpacing: 0.5,
  },
  activeCheckRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  activeCheckText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  primaryPaymentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 14,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: spacing.sm,
  },
  paymentIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.surface.elevated,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  paymentDetails: {
    flex: 1,
    gap: 2,
  },
  paymentTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.text.primary,
  },
  paymentSubtitle: {
    fontSize: 11,
    color: colors.text.muted,
  },
  bonusChip: {
    backgroundColor: colors.accent.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bonusChipText: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.accent.contrast,
  },
  altPaymentRow: {
    flexDirection: "row",
    gap: 8,
  },
  altPaymentPill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: colors.surface.card,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  altPaymentText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.text.secondary,
  },
  safetySection: {
    gap: 8,
  },
  safeguardCounter: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  safeguardsList: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surface.border,
    overflow: "hidden",
  },
  safeguardItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.border,
    gap: spacing.sm,
  },
  safeguardIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surface.elevated,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  safeguardContent: {
    flex: 1,
    gap: 2,
  },
  safeguardTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.text.primary,
  },
  safeguardDesc: {
    fontSize: 11,
    color: colors.text.secondary,
    lineHeight: 16,
  },
  menuLinksSection: {
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surface.border,
    overflow: "hidden",
  },
  menuLinkItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface.border,
    gap: spacing.sm,
  },
  menuLinkTextWrap: {
    flex: 1,
    gap: 2,
  },
  menuLinkTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.text.primary,
  },
  menuLinkSubtitle: {
    fontSize: 11,
    color: colors.text.muted,
  },
  primaryCtaButton: {
    backgroundColor: colors.accent.primary,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: colors.accent.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaContentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ctaTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: colors.accent.contrast,
  },
  ctaSubtitle: {
    fontSize: 10,
    color: "#423800",
    fontWeight: "600",
    marginTop: 2,
  },
  ctaArrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
