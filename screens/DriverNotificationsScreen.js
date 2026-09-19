import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DriverNotificationsScreen = ({ navigation }) => {
  const notifications = [
    {
      id: 1,
      type: "ride",
      title: "New ride request",
      message: "You have a new ride request from Naledi M. near Rosebank Mall.",
      time: "5 min ago",
      unread: true,
      icon: "🚗",
    },
    {
      id: 2,
      type: "earnings",
      title: "Weekly earnings available",
      message: "Your weekly earnings summary is ready to review.",
      time: "2 hrs ago",
      unread: true,
      icon: "R",
    },
    {
      id: 3,
      type: "document",
      title: "Documents verified",
      message:
        "Your driver and vehicle documents have been successfully verified.",
      time: "Yesterday",
      unread: false,
      icon: "✓",
    },
    {
      id: 4,
      type: "account",
      title: "Profile updated",
      message: "Your driver profile information was successfully updated.",
      time: "Yesterday",
      unread: false,
      icon: "👤",
    },
    {
      id: 5,
      type: "announcement",
      title: "Drive safely with RideGo",
      message:
        "Remember to take regular breaks and keep your attention on the road.",
      time: "2 days ago",
      unread: false,
      icon: "i",
    },
  ];

  const handleNotificationPress = (notification) => {
    Alert.alert(notification.title, notification.message);
  };

  const handleMarkAllRead = () => {
    Alert.alert(
      "Notifications updated",
      "All notifications have been marked as read.",
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.eyebrow}>DRIVER ACCOUNT</Text>
            <Text style={styles.title}>Notifications</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryTitle}>Stay up to date</Text>

              <Text style={styles.summaryText}>
                Important updates about your RideGo driver account.
              </Text>
            </View>

            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>2 New</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.markReadButton}
            onPress={handleMarkAllRead}
            activeOpacity={0.8}
          >
            <Text style={styles.markReadText}>Mark all as read</Text>
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent notifications</Text>

            <View style={styles.notificationList}>
              {notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <TouchableOpacity
                    style={[
                      styles.notificationRow,
                      notification.unread && styles.unreadNotification,
                    ]}
                    onPress={() => handleNotificationPress(notification)}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.notificationIcon,
                        notification.type === "earnings" && styles.earningsIcon,
                        notification.type === "document" && styles.documentIcon,
                        notification.type === "account" && styles.accountIcon,
                        notification.type === "announcement" &&
                          styles.announcementIcon,
                      ]}
                    >
                      <Text
                        style={[
                          styles.notificationIconText,
                          notification.type === "earnings" &&
                            styles.earningsIconText,
                          notification.type === "document" &&
                            styles.documentIconText,
                          notification.type === "account" &&
                            styles.accountIconText,
                          notification.type === "announcement" &&
                            styles.announcementIconText,
                        ]}
                      >
                        {notification.icon}
                      </Text>
                    </View>

                    <View style={styles.notificationContent}>
                      <View style={styles.notificationTitleRow}>
                        <Text
                          style={[
                            styles.notificationTitle,
                            notification.unread && styles.unreadTitle,
                          ]}
                        >
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

                    <Text style={styles.chevron}>›</Text>
                  </TouchableOpacity>

                  {index < notifications.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconText}>i</Text>
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Important account updates</Text>

              <Text style={styles.infoText}>
                RideGo may send notifications about ride requests, earnings,
                documents, account activity and safety.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.backButtonLarge}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Text style={styles.backButtonLargeText}>Back to Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F9FC",
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F9FC",
  },

  header: {
    minHeight: 82,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 32,
    lineHeight: 34,
    color: "#0F5FA8",
    marginTop: -3,
  },

  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
    color: "#64748B",
    marginBottom: 3,
  },

  title: {
    fontSize: 21,
    fontWeight: "800",
    color: "#0F172A",
  },

  headerSpacer: {
    width: 42,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 36,
  },

  summaryRow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  summaryTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 4,
  },

  summaryText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#64748B",
    maxWidth: 230,
  },

  unreadBadge: {
    backgroundColor: "#EAF4FF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  unreadBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0F5FA8",
  },

  markReadButton: {
    alignSelf: "flex-end",
    marginBottom: 24,
    paddingVertical: 4,
  },

  markReadText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F5FA8",
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },

  notificationList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },

  notificationRow: {
    minHeight: 112,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  unreadNotification: {
    backgroundColor: "#F8FBFF",
  },

  notificationIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#EAF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  notificationIconText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F5FA8",
  },

  earningsIcon: {
    backgroundColor: "#ECFDF5",
  },

  earningsIconText: {
    color: "#15803D",
    fontSize: 16,
  },

  documentIcon: {
    backgroundColor: "#F0FDF4",
  },

  documentIconText: {
    color: "#15803D",
    fontSize: 18,
  },

  accountIcon: {
    backgroundColor: "#F1EAFE",
  },

  accountIconText: {
    color: "#7C3AED",
    fontSize: 18,
  },

  announcementIcon: {
    backgroundColor: "#FFF7ED",
  },

  announcementIconText: {
    color: "#C2410C",
    fontSize: 18,
  },

  notificationContent: {
    flex: 1,
    paddingRight: 6,
  },

  notificationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  notificationTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
  },

  unreadTitle: {
    fontWeight: "800",
    color: "#0F172A",
  },

  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0F5FA8",
    marginLeft: 8,
  },

  notificationMessage: {
    fontSize: 12,
    lineHeight: 18,
    color: "#64748B",
    marginBottom: 7,
  },

  notificationTime: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
  },

  chevron: {
    fontSize: 26,
    color: "#94A3B8",
    marginLeft: 6,
    marginTop: 8,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginLeft: 78,
  },

  infoCard: {
    backgroundColor: "#EAF4FF",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 22,
  },

  infoIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#0F5FA8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  infoIconText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F3F6D",
    marginBottom: 5,
  },

  infoText: {
    fontSize: 13,
    lineHeight: 19,
    color: "#365A78",
  },

  backButtonLarge: {
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: "#0F5FA8",
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonLargeText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});

export default DriverNotificationsScreen;
