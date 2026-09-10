import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const safetyFeatures = [
  {
    id: "emergency",
    icon: "🚨",
    title: "Emergency assistance",
    description:
      "Quickly access emergency support if you ever feel unsafe during a ride.",
    action: "Emergency",
  },
  {
    id: "share",
    icon: "📍",
    title: "Share your trip",
    description:
      "Let someone you trust know where you are and keep them updated during your ride.",
    action: "Share trip",
  },
  {
    id: "contacts",
    icon: "👥",
    title: "Trusted contacts",
    description:
      "Choose people you trust who can be notified when you need extra support.",
    action: "Manage contacts",
  },
  {
    id: "support",
    icon: "💬",
    title: "Safety support",
    description:
      "Get help with a safety concern or report something that happened during a ride.",
    action: "Get help",
  },
];

const safetyTips = [
  "Check your driver's name, photo, vehicle and registration before getting in.",
  "Share your trip with someone you trust when travelling alone.",
  "Stay aware of your surroundings throughout your journey.",
  "Use RideGo's safety tools whenever you feel uncomfortable or unsafe.",
];

export default function SafetyCentreScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.75}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Safety Centre</Text>
            <Text style={styles.headerSubtitle}>
              Your safety comes first
            </Text>
          </View>
        </View>

        {/* Safety Hero */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconCircle}>
            <Text style={styles.heroIcon}>🛡️</Text>
          </View>

          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Ride with confidence</Text>

            <Text style={styles.heroDescription}>
              RideGo gives you tools to help you stay informed, connected and
              supported throughout your journey.
            </Text>
          </View>
        </View>

        {/* Emergency Card */}
        <TouchableOpacity
          style={styles.emergencyCard}
          activeOpacity={0.85}
        >
          <View style={styles.emergencyIconCircle}>
            <Text style={styles.emergencyIcon}>🚨</Text>
          </View>

          <View style={styles.emergencyTextContainer}>
            <Text style={styles.emergencyTitle}>Need immediate help?</Text>

            <Text style={styles.emergencyDescription}>
              Access emergency assistance when you feel unsafe.
            </Text>
          </View>

          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* Safety Features */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Safety tools</Text>
          <Text style={styles.sectionCount}>4 tools</Text>
        </View>

        {safetyFeatures.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={styles.featureCard}
            activeOpacity={0.82}
          >
            <View style={styles.featureIconCircle}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
            </View>

            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>

              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>

              <View style={styles.featureAction}>
                <Text style={styles.featureActionText}>{feature.action}</Text>
                <Text style={styles.featureChevron}>›</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Safety Tips */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Safety tips</Text>
        </View>

        <View style={styles.tipsCard}>
          {safetyTips.map((tip, index) => (
            <View
              key={index}
              style={[
                styles.tipRow,
                index === safetyTips.length - 1 && styles.lastTipRow,
              ]}
            >
              <View style={styles.tipNumber}>
                <Text style={styles.tipNumberText}>{index + 1}</Text>
              </View>

              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Prototype Information */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconCircle}>
            <Text style={styles.infoIcon}>ℹ️</Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>RideGo safety tools</Text>

            <Text style={styles.infoText}>
              These safety features are currently presented as part of the
              RideGo prototype. Emergency services, trusted contacts and
              safety reporting will be connected during the functionality
              phase.
            </Text>
          </View>
        </View>

        {/* Back Home */}
        <TouchableOpacity
          style={styles.homeButton}
          activeOpacity={0.82}
          onPress={() => navigation.navigate("RiderHome")}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>RideGo • Fast. Safe. Reliable.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F9FF",
  },

  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 35,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#E4ECF7",
  },

  backButtonText: {
    color: "#071A3D",
    fontSize: 32,
    lineHeight: 34,
    fontWeight: "300",
    marginTop: -3,
  },

  headerTextContainer: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 27,
    fontWeight: "800",
    color: "#071A3D",
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#6D7B91",
    marginTop: 3,
  },

  heroCard: {
    backgroundColor: "#071A3D",
    borderRadius: 24,
    padding: 22,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  heroIconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#18315B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  heroIcon: {
    fontSize: 30,
  },

  heroTextContainer: {
    flex: 1,
  },

  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 6,
  },

  heroDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: "#C9D6E8",
  },

  emergencyCard: {
    backgroundColor: "#FFF4F4",
    borderWidth: 1,
    borderColor: "#FFD8D8",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
  },

  emergencyIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFE1E1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  emergencyIcon: {
    fontSize: 24,
  },

  emergencyTextContainer: {
    flex: 1,
  },

  emergencyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#8E1D1D",
    marginBottom: 4,
  },

  emergencyDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: "#7A4A4A",
  },

  chevron: {
    fontSize: 28,
    color: "#8E1D1D",
    marginLeft: 8,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#071A3D",
  },

  sectionCount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#71809A",
  },

  featureCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5ECF6",
  },

  featureIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#EAF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  featureIcon: {
    fontSize: 24,
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3D",
    marginBottom: 5,
  },

  featureDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#6D7B91",
  },

  featureAction: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },

  featureActionText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#168DD9",
  },

  featureChevron: {
    fontSize: 20,
    fontWeight: "700",
    color: "#168DD9",
    marginLeft: 4,
    marginTop: -1,
  },

  tipsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 17,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#E5ECF6",
    marginBottom: 16,
  },

  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
  },

  lastTipRow: {
    borderBottomWidth: 0,
  },

  tipNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EAF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  tipNumberText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#168DD9",
  },

  tipText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: "#536176",
    paddingTop: 3,
  },

  infoCard: {
    backgroundColor: "#EEF6FF",
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#D8E9FA",
  },

  infoIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#DCEEFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  infoIcon: {
    fontSize: 18,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#16446D",
    marginBottom: 5,
  },

  infoText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#56718E",
  },

  homeButton: {
    height: 54,
    borderRadius: 18,
    backgroundColor: "#5BC0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  homeButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3D",
  },

  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#8A96A8",
    marginBottom: 5,
  },
});

