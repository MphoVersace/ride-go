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

const supportOptions = [
  {
    id: "ride-help",
    icon: "🚗",
    title: "Ride help",
    description: "Get help with a current or previous RideGo trip.",
    action: "Get ride help",
  },
  {
    id: "payment-help",
    icon: "💳",
    title: "Payments & fares",
    description: "Find help with fares, payments, refunds and charges.",
    action: "View payment help",
  },
  {
    id: "account-help",
    icon: "👤",
    title: "Account & profile",
    description: "Get help managing your profile and account information.",
    action: "Manage account help",
  },
  {
    id: "safety-help",
    icon: "🛡️",
    title: "Safety concerns",
    description: "Report a safety concern or get support after a ride.",
    action: "Get safety support",
  },
];

const popularQuestions = [
  "How do I request a ride?",
  "How are fares calculated?",
  "How do I change my payment method?",
  "What should I do if I left something in a car?",
];

export default function HelpSupportScreen({ navigation }) {
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
            <Text style={styles.headerTitle}>Help & Support</Text>
            <Text style={styles.headerSubtitle}>We're here to help</Text>
          </View>
        </View>

        {/* Hero */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconCircle}>
            <Text style={styles.heroIcon}>💬</Text>
          </View>

          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>How can we help?</Text>

            <Text style={styles.heroDescription}>
              Find answers, get help with your rides, or learn more about using
              RideGo.
            </Text>
          </View>
        </View>

        {/* Search */}
        <TouchableOpacity style={styles.searchCard} activeOpacity={0.85}>
          <View style={styles.searchIconCircle}>
            <Text style={styles.searchIcon}>⌕</Text>
          </View>

          <View style={styles.searchTextContainer}>
            <Text style={styles.searchTitle}>Search help</Text>
            <Text style={styles.searchPlaceholder}>
              What do you need help with?
            </Text>
          </View>

          <Text style={styles.searchChevron}>›</Text>
        </TouchableOpacity>

        {/* Support Options */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Support topics</Text>
          <Text style={styles.sectionCount}>4 topics</Text>
        </View>

        {supportOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.supportCard}
            activeOpacity={0.82}
          >
            <View style={styles.supportIconCircle}>
              <Text style={styles.supportIcon}>{option.icon}</Text>
            </View>

            <View style={styles.supportContent}>
              <Text style={styles.supportTitle}>{option.title}</Text>

              <Text style={styles.supportDescription}>
                {option.description}
              </Text>

              <View style={styles.supportAction}>
                <Text style={styles.supportActionText}>{option.action}</Text>
                <Text style={styles.supportChevron}>›</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Popular Questions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular questions</Text>
        </View>

        <View style={styles.questionsCard}>
          {popularQuestions.map((question, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.questionRow,
                index === popularQuestions.length - 1 && styles.lastQuestionRow,
              ]}
              activeOpacity={0.75}
            >
              <View style={styles.questionIconCircle}>
                <Text style={styles.questionIcon}>?</Text>
              </View>

              <Text style={styles.questionText}>{question}</Text>

              <Text style={styles.questionChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Support */}
        <View style={styles.contactCard}>
          <View style={styles.contactIconCircle}>
            <Text style={styles.contactIcon}>🎧</Text>
          </View>

          <View style={styles.contactContent}>
            <Text style={styles.contactTitle}>Still need help?</Text>

            <Text style={styles.contactDescription}>
              Our support team will be available to assist you with your RideGo
              experience.
            </Text>

            <TouchableOpacity style={styles.contactButton} activeOpacity={0.82}>
              <Text style={styles.contactButtonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Prototype Information */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconCircle}>
            <Text style={styles.infoIcon}>ℹ️</Text>
          </View>

          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>RideGo support</Text>

            <Text style={styles.infoText}>
              Help topics, search, support requests and live assistance are
              currently presented as part of the RideGo prototype. These
              services will be connected during the functionality phase.
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
    fontSize: 29,
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

  searchCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
    borderWidth: 1,
    borderColor: "#E4ECF7",
  },

  searchIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#EAF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  searchIcon: {
    fontSize: 28,
    color: "#168DD9",
    marginTop: -4,
  },

  searchTextContainer: {
    flex: 1,
  },

  searchTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#071A3D",
    marginBottom: 3,
  },

  searchPlaceholder: {
    fontSize: 12,
    color: "#8A96A8",
  },

  searchChevron: {
    fontSize: 27,
    color: "#168DD9",
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

  supportCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5ECF6",
  },

  supportIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#EAF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  supportIcon: {
    fontSize: 24,
  },

  supportContent: {
    flex: 1,
  },

  supportTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3D",
    marginBottom: 5,
  },

  supportDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#6D7B91",
  },

  supportAction: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },

  supportActionText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#168DD9",
  },

  supportChevron: {
    fontSize: 20,
    fontWeight: "700",
    color: "#168DD9",
    marginLeft: 4,
    marginTop: -1,
  },

  questionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E5ECF6",
    marginBottom: 16,
  },

  questionRow: {
    minHeight: 67,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
  },

  lastQuestionRow: {
    borderBottomWidth: 0,
  },

  questionIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EEF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  questionIcon: {
    fontSize: 15,
    fontWeight: "900",
    color: "#168DD9",
  },

  questionText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: "#536176",
  },

  questionChevron: {
    fontSize: 23,
    color: "#8A96A8",
    marginLeft: 8,
  },

  contactCard: {
    backgroundColor: "#EAF6FF",
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#D5EAFB",
  },

  contactIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: "#D8EEFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  contactIcon: {
    fontSize: 23,
  },

  contactContent: {
    flex: 1,
  },

  contactTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#16446D",
    marginBottom: 5,
  },

  contactDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#56718E",
    marginBottom: 13,
  },

  contactButton: {
    alignSelf: "flex-start",
    backgroundColor: "#168DD9",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
  },

  contactButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 17,
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5ECF6",
  },

  infoIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#EEF6FF",
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
