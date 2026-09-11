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
    icon: "🚗",
    title: "Driver found",
    message: "Your RideGo driver is on the way to your pickup location.",
    time: "5 min ago",
    unread: true,
  },
  {
    id: "2",
    type: "safety",
    icon: "🛡️",
    title: "Ride safely",
    message: "Remember to confirm your driver's details before getting in.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: "3",
    type: "promotion",
    icon: "🎁",
    title: "RideGo reward",
    message: "You have a new RideGo promotion available for your next trip.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: "4",
    type: "account",
    icon: "👤",
    title: "Profile updated",
    message: "Your RideGo profile information was successfully updated.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: "5",
    type: "ride",
    icon: "⭐",
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
      <StatusBar barStyle="light-content" backgroundColor="#071A3D" />

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
            <Text style={styles.heroIconText}>🔔</Text>
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
                <Text style={styles.notificationIconText}>
                  {notification.icon}
                </Text>
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
            <Text style={styles.infoIconText}>🔔</Text>
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
          onPress={() => navigation.navigate("RiderHome")}
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
    backgroundColor: "#071A3D",
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
    backgroundColor: "#102957",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  backButtonText: {
    color: "#FFFFFF",
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "300",
    marginTop: -3,
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -0.5,
  },

  headerSubtitle: {
    color: "#9FB4D8",
    fontSize: 13,
    marginTop: 4,
  },

  headerBadge: {
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#5BC0FF",
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
    backgroundColor: "#102957",
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#1D3A70",
  },

  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#17366B",
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
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 5,
  },

  heroDescription: {
    color: "#AFC1DE",
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
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: "#7894BD",
    fontSize: 11,
    marginTop: 3,
  },

  markAllButton: {
    backgroundColor: "#17366B",
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 11,
    marginLeft: 10,
  },

  markAllText: {
    color: "#5BC0FF",
    fontSize: 10,
    fontWeight: "800",
  },

  notificationsContainer: {
    marginBottom: 20,
  },

  notificationCard: {
    backgroundColor: "#102957",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
    borderWidth: 1,
    borderColor: "#1D3A70",
  },

  notificationCardUnread: {
    backgroundColor: "#112F5F",
    borderColor: "#31578D",
  },

  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#17366B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  notificationIconUnread: {
    backgroundColor: "#1C467E",
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
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    flexShrink: 1,
  },

  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#5BC0FF",
    marginLeft: 7,
  },

  notificationMessage: {
    color: "#AFC1DE",
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
    color: "#5BC0FF",
    fontSize: 25,
    fontWeight: "300",
    marginLeft: 8,
  },

  infoCard: {
    backgroundColor: "#0D2248",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#193765",
    marginBottom: 20,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#17366B",
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
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 4,
  },

  infoDescription: {
    color: "#8FA8CE",
    fontSize: 11,
    lineHeight: 17,
  },

  homeButton: {
    height: 54,
    borderRadius: 17,
    backgroundColor: "#5BC0FF",
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
