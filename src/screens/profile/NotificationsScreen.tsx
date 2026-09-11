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
  ArrowLeftIcon,
  BellIcon,
  ShieldCheckIcon,
  WalletIcon,
  SteeringWheelIcon,
  CheckCircleIcon,
} from "../../components/common/SvgIcons";

interface NotificationItem {
  id: string;
  type: "ride" | "wallet" | "safety";
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    type: "ride",
    title: "Driver Matched",
    message: "Ucok Behel is approaching your pickup location in a Honda CR-V (AB6299ZG).",
    time: "3 min ago",
    unread: true,
  },
  {
    id: "notif-2",
    type: "wallet",
    title: "Wallet Top-Up Successful",
    message: "R100.00 has been added to your RideGo Wallet balance via Visa •••• 4821.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: "notif-3",
    type: "safety",
    title: "Safety Reminder",
    message: "Verify the driver's license plate and vehicle model before starting your trip.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "notif-4",
    type: "ride",
    title: "Trip Completed",
    message: "Your ride to Camps Bay Beach was completed. Receipt for R90.00 is ready.",
    time: "2 days ago",
    unread: false,
  },
];

export default function NotificationsScreen({
  navigation,
}: RootStackScreenProps<"Notifications">) {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleNotificationPress = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const displayedNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => n.unread)
      : notifications;

  const renderIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "ride":
        return <SteeringWheelIcon size={20} color={colors.accent.primary} />;
      case "wallet":
        return <WalletIcon size={20} color={colors.accent.primary} />;
      case "safety":
        return <ShieldCheckIcon size={20} color={colors.accent.primary} />;
    }
  };

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
        <Text style={styles.navTitle}>Notifications</Text>
        {unreadCount > 0 ? (
          <TouchableOpacity
            style={styles.markReadBtn}
            onPress={handleMarkAllRead}
          >
            <Text style={styles.markReadText}>Mark all read</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.navSpacer} />
        )}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Filter Tabs */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "all" && styles.tabActive]}
            activeOpacity={0.8}
            onPress={() => setActiveTab("all")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "all" && styles.tabTextActive,
              ]}
            >
              All Notifications ({notifications.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "unread" && styles.tabActive]}
            activeOpacity={0.8}
            onPress={() => setActiveTab("unread")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "unread" && styles.tabTextActive,
              ]}
            >
              Unread ({unreadCount})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        {displayedNotifications.length === 0 ? (
          <View style={styles.emptyCard}>
            <BellIcon size={32} color={colors.text.muted} />
            <Text style={styles.emptyTitle}>No unread notifications</Text>
            <Text style={styles.emptySubtitle}>
              You are all caught up on your ride and account alerts.
            </Text>
          </View>
        ) : (
          displayedNotifications.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.notifCard,
                item.unread && styles.notifCardUnread,
              ]}
              activeOpacity={0.85}
              onPress={() => handleNotificationPress(item.id)}
            >
              <View style={styles.iconCircle}>{renderIcon(item.type)}</View>

              <View style={styles.notifContent}>
                <View style={styles.notifHeaderRow}>
                  <Text style={styles.notifTitle}>{item.title}</Text>
                  <Text style={styles.notifTime}>{item.time}</Text>
                </View>

                <Text style={styles.notifMessage}>{item.message}</Text>
              </View>

              {item.unread && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          ))
        )}
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
  navTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  markReadBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  markReadText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  navSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  tabsRow: {
    flexDirection: "row",
    gap: 8,
    marginVertical: spacing.md,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: colors.surface.card,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  tabActive: {
    backgroundColor: colors.accent.primary,
    borderColor: colors.accent.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.secondary,
  },
  tabTextActive: {
    color: colors.accent.contrast,
  },
  notifCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: colors.surface.card,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  notifCardUnread: {
    borderColor: colors.accent.primary,
    backgroundColor: colors.surface.cardAlt,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface.card,
    alignItems: "center",
    justifyContent: "center",
  },
  notifContent: {
    flex: 1,
  },
  notifHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  notifTime: {
    fontSize: 11,
    color: colors.text.muted,
  },
  notifMessage: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.primary,
    marginTop: 6,
  },
  emptyCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginTop: spacing.xl,
    gap: spacing.xs,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
    textAlign: "center",
  },
});
