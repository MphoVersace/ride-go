import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
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
  ChevronDownIcon,
  ChevronUpIcon,
  ShieldCheckIcon,
} from "../../components/common/SvgIcons";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "How are ride fares calculated in Rands?",
    answer:
      "Fares are calculated based on your selected vehicle tier (Standard R45, Comfort R75, Luxury R140) and distance travelled. You can also add an optional tip for your driver (R10, R20, R50, or R100).",
  },
  {
    id: "faq-2",
    question: "How does the RideGo Wallet work?",
    answer:
      "Your RideGo Wallet stores South African Rand balance for instant ride payments. Trips are automatically debited upon arrival without handling cash. You can top up anytime using Visa or Mastercard.",
  },
  {
    id: "faq-3",
    question: "What should I do if I leave an item in the vehicle?",
    answer:
      "Go to your Ride History, tap on the completed trip, and contact your driver directly. You can also contact our 24/7 South African safety helpline for assistance retrieving lost items.",
  },
  {
    id: "faq-4",
    question: "How does the in-app safety feature protect me?",
    answer:
      "Every RideGo trip features live GPS telemetry tracking. You can share your live ride route with trusted contacts or trigger rapid emergency dispatch to the SAPS Flying Squad (10111) with one tap.",
  },
];

export default function HelpSupportScreen({
  navigation,
}: RootStackScreenProps<"HelpSupport">) {
  const [expandedId, setExpandedId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCallSupport = () => {
    Alert.alert(
      "Call RideGo Support",
      "Connect to RideGo South Africa Support Hotline at +27 800 902 435?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call Now", onPress: () => {} },
      ]
    );
  };

  const handleSubmitTicket = () => {
    Alert.alert(
      "Support Ticket Submitted",
      "Thank you for contacting RideGo. A customer care agent will review your inquiry within 15 minutes.",
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Nav Header */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Help & Support</Text>
        <View style={styles.navSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Support Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconWrap}>
            <ChatBubbleIcon size={26} color={colors.accent.contrast} />
          </View>
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroTitle}>24/7 Rider Support</Text>
            <Text style={styles.heroDesc}>
              Have questions about a trip, payment or lost property? We are here to assist you anytime.
            </Text>
          </View>
        </View>

        {/* Contact CTAs */}
        <View style={styles.contactRow}>
          <TouchableOpacity
            style={styles.contactBtn}
            activeOpacity={0.85}
            onPress={handleCallSupport}
          >
            <PhoneIcon size={18} color={colors.accent.primary} />
            <Text style={styles.contactBtnText}>Call Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactBtn}
            activeOpacity={0.85}
            onPress={handleSubmitTicket}
          >
            <ChatBubbleIcon size={18} color={colors.accent.primary} />
            <Text style={styles.contactBtnText}>Submit Ticket</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <Text style={styles.sectionHeader}>Frequently Asked Questions</Text>

        {faqs.map((faq) => {
          const isExpanded = expandedId === faq.id;

          return (
            <View key={faq.id} style={styles.faqCard}>
              <TouchableOpacity
                style={styles.faqHeader}
                activeOpacity={0.8}
                onPress={() => toggleFaq(faq.id)}
              >
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                {isExpanded ? (
                  <ChevronUpIcon size={18} color={colors.accent.primary} />
                ) : (
                  <ChevronDownIcon size={18} color={colors.text.muted} />
                )}
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.faqBody}>
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                </View>
              )}
            </View>
          );
        })}

        {/* Safety Badge Note */}
        <View style={styles.safetyCard}>
          <ShieldCheckIcon size={20} color={colors.accent.primary} />
          <Text style={styles.safetyText}>
            For urgent security emergencies, use the Safety Centre or dial 10111 directly.
          </Text>
        </View>
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
  navSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 22,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    marginVertical: spacing.md,
    gap: spacing.sm,
  },
  heroIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  heroTextWrap: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  heroDesc: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 3,
    lineHeight: 16,
  },
  contactRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  contactBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface.card,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: 8,
  },
  contactBtnText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  faqCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.xs,
    overflow: "hidden",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: colors.text.primary,
    paddingRight: spacing.xs,
  },
  faqBody: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.surface.border,
    paddingTop: spacing.xs,
  },
  faqAnswer: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  safetyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  safetyText: {
    flex: 1,
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 16,
  },
});
