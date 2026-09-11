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
  ShieldCheckIcon,
  PhoneIcon,
  UserIcon,
  ShareIcon,
  AlertTriangleIcon,
  PlusIcon,
} from "../../components/common/SvgIcons";

interface TrustedContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

const initialContacts: TrustedContact[] = [
  {
    id: "tc-1",
    name: "Sarah Versace",
    relation: "Spouse",
    phone: "+27 82 111 2233",
  },
  {
    id: "tc-2",
    name: "Thabo Khumalo",
    relation: "Brother",
    phone: "+27 83 444 5566",
  },
];

export default function SafetyCentreScreen({
  navigation,
}: RootStackScreenProps<"SafetyCentre">) {
  const [contacts, setContacts] = useState<TrustedContact[]>(initialContacts);
  const [tripSharingActive, setTripSharingActive] = useState(true);

  const handleCallEmergency = (service: string, number: string) => {
    Alert.alert(
      `Call ${service}?`,
      `Dial ${number} now for immediate South African emergency assistance?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call Now",
          style: "destructive",
          onPress: () => {
            Alert.alert("Emergency Triggered", `Connecting you to ${service} (${number})...`);
          },
        },
      ]
    );
  };

  const handleShareTrip = () => {
    setTripSharingActive(!tripSharingActive);
    Alert.alert(
      tripSharingActive ? "Trip Sharing Disabled" : "Trip Sharing Enabled",
      tripSharingActive
        ? "Your live trip location will no longer be broadcast to your trusted contacts."
        : "Your live GPS tracking link has been broadcast to your trusted contacts."
    );
  };

  const handleAddContact = () => {
    Alert.alert(
      "Add Trusted Contact",
      "Enter a contact name and South African mobile number to receive live trip updates.",
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
        <Text style={styles.navTitle}>Safety Centre</Text>
        <View style={styles.navSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Safety Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroIconCircle}>
            <ShieldCheckIcon size={28} color={colors.accent.primary} />
          </View>
          <View style={styles.heroInfo}>
            <Text style={styles.heroTitle}>RideGo Safety Toolkit</Text>
            <Text style={styles.heroDescription}>
              24/7 incident response, satellite GPS route tracking, and verified South African driver screening.
            </Text>
          </View>
        </View>

        {/* Emergency Dispatch Buttons */}
        <Text style={styles.sectionHeader}>Emergency Assistance (South Africa)</Text>

        <TouchableOpacity
          style={styles.emergencyCard}
          activeOpacity={0.85}
          onPress={() => handleCallEmergency("SAPS Police", "10111")}
        >
          <View style={styles.emergencyIconWrap}>
            <AlertTriangleIcon size={22} color={colors.accent.primary} />
          </View>
          <View style={styles.emergencyInfo}>
            <Text style={styles.emergencyTitle}>Police Flying Squad (10111)</Text>
            <Text style={styles.emergencyDesc}>South African Police Service rapid response</Text>
          </View>
          <View style={styles.callBadge}>
            <PhoneIcon size={16} color={colors.accent.contrast} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.emergencyCard}
          activeOpacity={0.85}
          onPress={() => handleCallEmergency("National Emergency", "112")}
        >
          <View style={styles.emergencyIconWrap}>
            <PhoneIcon size={22} color={colors.accent.primary} />
          </View>
          <View style={styles.emergencyInfo}>
            <Text style={styles.emergencyTitle}>National Emergency (112)</Text>
            <Text style={styles.emergencyDesc}>Cellular emergency dispatch for all mobile networks</Text>
          </View>
          <View style={styles.callBadge}>
            <PhoneIcon size={16} color={colors.accent.contrast} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.emergencyCard}
          activeOpacity={0.85}
          onPress={() => handleCallEmergency("RideGo Safety Hotline", "0800 902 435")}
        >
          <View style={styles.emergencyIconWrap}>
            <ShieldCheckIcon size={22} color={colors.accent.primary} />
          </View>
          <View style={styles.emergencyInfo}>
            <Text style={styles.emergencyTitle}>RideGo 24/7 Incident Hotline</Text>
            <Text style={styles.emergencyDesc}>Dedicated toll-free rider safety dispatch</Text>
          </View>
          <View style={styles.callBadge}>
            <PhoneIcon size={16} color={colors.accent.contrast} />
          </View>
        </TouchableOpacity>

        {/* Live Trip Sharing */}
        <Text style={styles.sectionHeader}>Live Trip Sharing</Text>
        <View style={styles.featureCard}>
          <View style={styles.featureIconCircle}>
            <ShareIcon size={22} color={colors.accent.primary} />
          </View>
          <View style={styles.featureInfo}>
            <Text style={styles.featureTitle}>Auto-Share Live Trips</Text>
            <Text style={styles.featureDesc}>
              Automatically broadcast your real-time vehicle route and ETA to trusted contacts.
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              tripSharingActive && styles.toggleButtonActive,
            ]}
            activeOpacity={0.8}
            onPress={handleShareTrip}
          >
            <Text style={styles.toggleText}>
              {tripSharingActive ? "ON" : "OFF"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Trusted Contacts */}
        <View style={styles.contactsHeaderRow}>
          <Text style={styles.sectionHeaderNoMargin}>Trusted Contacts</Text>
          <TouchableOpacity
            style={styles.addContactBtn}
            activeOpacity={0.8}
            onPress={handleAddContact}
          >
            <PlusIcon size={14} color={colors.accent.primary} />
            <Text style={styles.addContactText}>Add Contact</Text>
          </TouchableOpacity>
        </View>

        {contacts.map((contact) => (
          <View key={contact.id} style={styles.contactCard}>
            <View style={styles.contactAvatar}>
              <UserIcon size={18} color={colors.accent.primary} />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>
                {contact.name} ({contact.relation})
              </Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
            </View>
          </View>
        ))}

        {/* Safety Guidelines */}
        <Text style={styles.sectionHeader}>Rider Safety Checklist</Text>
        <View style={styles.checklistCard}>
          <Text style={styles.checkItem}>
            1. Verify the vehicle model and registration plate match your driver card before entering.
          </Text>
          <Text style={styles.checkItem}>
            2. Ask the driver to confirm your name from their driver app.
          </Text>
          <Text style={styles.checkItem}>
            3. Follow the highlighted cyan route polyline on the live RideGo navigation map.
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
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    marginVertical: spacing.md,
    gap: spacing.sm,
  },
  heroIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.accent.primary,
  },
  heroInfo: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  heroDescription: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 3,
    lineHeight: 17,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  sectionHeaderNoMargin: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  emergencyCard: {
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
  emergencyIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  emergencyInfo: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  emergencyDesc: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  callBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  featureIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  featureDesc: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
    lineHeight: 16,
  },
  toggleButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: colors.surface.cardAlt,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  toggleButtonActive: {
    backgroundColor: colors.accent.primary,
    borderColor: colors.accent.primary,
  },
  toggleText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
  contactsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  addContactBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  addContactText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  contactAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text.primary,
  },
  contactPhone: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 1,
  },
  checklistCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: 8,
    marginBottom: spacing.md,
  },
  checkItem: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 18,
  },
});
