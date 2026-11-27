import { colors } from "../ui/theme";
import Icon from "../ui/Icon";
import { openScreen } from "../navigation/routes";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const initialNotifications = [
  {
    id: "1",
    type: "ride",
    icon: "car",
    title: "Driver found",
    message: "Your RideGo driver is on the way to your pickup location.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: "2",
    type: "safety",
    icon: "shield",
    title: "Ride safely",
    message: "Remember to confirm your driver's details before getting in.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: "3",
    type: "promotion",
    icon: "gift",
    title: "RideGo reward",
    message: "You have a new RideGo promotion available for your next trip.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: "4",
    type: "account",
    icon: "user",
    title: "Profile updated",
    message: "Your RideGo profile information was successfully updated.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: "5",
    type: "ride",
    icon: "star",
    title: "How was your ride?",
    message: "Your recent trip is complete. Share your experience with us.",
    time: "3 days ago",
    unread: false,
  },
];

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(
    (notification) => notification.unread,
  ).length;

  const markAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  };

  const markAsRead = (id) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Notifications</Text>
            <Text style={styles.headerSubtitle}>
              Stay updated with your RideGo activity
            </Text>
          </View>

          {unreadCount > 0 && (
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Icon name="bell" style={styles.heroIconText} />
          </View>

          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>You're all caught up</Text>
            <Text style={styles.heroDescription}>
              Important ride, safety, and account updates will appear here.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Recent notifications</Text>
            <Text style={styles.sectionSubtitle}>
              {unreadCount > 0
                ? `${unreadCount} unread notification${
                    unreadCount === 1 ? "" : "s"
                  }`
                : "All notifications are read"}
            </Text>
          </View>

          {unreadCount > 0 && (
            <TouchableOpacity
              style={styles.markAllButton}
              onPress={markAllAsRead}
              activeOpacity={0.8}
            >
              <Text style={styles.markAllText}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.notificationsContainer}>
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                notification.unread && styles.notificationCardUnread,
              ]}
              activeOpacity={0.85}
              onPress={() => markAsRead(notification.id)}
            >
              <View
                style={[
                  styles.notificationIcon,
                  notification.unread && styles.notificationIconUnread,
                ]}
              >
                <Icon name={notification.icon} style={styles.notificationIconText} />
              </View>

              <View style={styles.notificationContent}>
                <View style={styles.notificationTitleRow}>
                  <Text style={styles.notificationTitle}>
                    {notification.title}
                  </Text>

                  {notification.unread && (
                    <View style={styles.unreadDot} />
                  )}
                </View>

                <Text style={styles.notificationMessage}>
                  {notification.message}
                </Text>

                <Text style={styles.notificationTime}>
                  {notification.time}
                </Text>
              </View>

              <Text style={styles.notificationArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Icon name="bell" style={styles.infoIconText} />
          </View>

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Stay informed</Text>
            <Text style={styles.infoDescription}>
              RideGo can notify you about driver matches, trip updates, safety
              information, promotions, and account activity.
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.85}
          onPress={() => openScreen(navigation, "RiderHome")}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          RideGo • Fast, Safe, Reliable
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.blueTint,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  backButtonText: {
    color: colors.black,
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "300",
    marginTop: -3,
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    color: colors.black,
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  headerSubtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4,
  },

  headerBadge: {
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    marginLeft: 8,
  },

  headerBadgeText: {
    color: "#071A3D",
    fontSize: 12,
    fontWeight: "900",
  },

  heroCard: {
    backgroundColor: colors.blueTint,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    borderWidth: 1,
    borderColor: colors.blueLine,
  },

  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.blueLine,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  heroIconText: {
    fontSize: 27,
  },

  heroTextContainer: {
    flex: 1,
  },

  heroTitle: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 5,
  },

  heroDescription: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  sectionTitle: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 3,
  },

  markAllButton: {
    backgroundColor: colors.blueLine,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 11,
    marginLeft: 10,
  },

  markAllText: {
    color: colors.blueInk,
    fontSize: 10,
    fontWeight: "800",
  },

  notificationsContainer: {
    marginBottom: 20,
  },

  notificationCard: {
    backgroundColor: colors.blueTint,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
    borderWidth: 1,
    borderColor: colors.blueLine,
  },

  notificationCardUnread: {
    backgroundColor: colors.blueTint,
    borderColor: colors.blueLine,
  },

  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: colors.blueLine,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  notificationIconUnread: {
    backgroundColor: colors.blueLine,
  },

  notificationIconText: {
    fontSize: 22,
  },

  notificationContent: {
    flex: 1,
  },

  notificationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  notificationTitle: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "800",
    flexShrink: 1,
  },

  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.blue,
    marginLeft: 7,
  },

  notificationMessage: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 17,
    marginBottom: 6,
  },

  notificationTime: {
    color: "#6684B0",
    fontSize: 10,
    fontWeight: "600",
  },

  notificationArrow: {
    color: colors.blueInk,
    fontSize: 25,
    fontWeight: "300",
    marginLeft: 8,
  },

  infoCard: {
    backgroundColor: colors.blueTint,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.blueLine,
    marginBottom: 20,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: colors.blueLine,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  infoIconText: {
    fontSize: 19,
  },

  infoTextContainer: {
    flex: 1,
  },

  infoTitle: {
    color: colors.black,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 4,
  },

  infoDescription: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 17,
  },

  homeButton: {
    height: 54,
    borderRadius: 17,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  homeButtonText: {
    color: "#071A3D",
    fontSize: 15,
    fontWeight: "900",
  },

  footerText: {
    color: "#5D78A4",
    fontSize: 11,
    textAlign: "center",
    marginBottom: 4,
  },
});
