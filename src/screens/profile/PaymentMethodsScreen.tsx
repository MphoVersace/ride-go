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
  CreditCardIcon,
  WalletIcon,
  PlusIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
} from "../../components/common/SvgIcons";
import { useRide } from "../../services/RideContext";

export default function PaymentMethodsScreen({
  navigation,
}: RootStackScreenProps<"PaymentMethods">) {
  const {
    walletBalance,
    topUpWallet,
    paymentMethods,
    selectedPaymentMethod,
    selectPaymentMethod,
  } = useRide();

  const [topUpSuccess, setTopUpSuccess] = useState<number | null>(null);

  const topUpAmounts = [50, 100, 200, 500];

  const handleTopUp = (amount: number) => {
    topUpWallet(amount);
    setTopUpSuccess(amount);
    setTimeout(() => {
      setTopUpSuccess(null);
    }, 2500);
  };

  const handleAddCard = () => {
    Alert.alert(
      "Add Payment Card",
      "Secure 3D-Secure gateway connection for Visa and Mastercard credit or debit cards.",
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* App Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Payment & Wallet</Text>
        <View style={styles.navSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Wallet Hero Card */}
        <View style={styles.walletCard}>
          <View style={styles.walletHeaderRow}>
            <View style={styles.walletIconCircle}>
              <WalletIcon size={24} color={colors.accent.primary} />
            </View>
            <View style={styles.walletHeaderInfo}>
              <Text style={styles.walletHeaderLabel}>RIDEGO WALLET</Text>
              <Text style={styles.walletSubtext}>Auto-pay enabled for trips</Text>
            </View>
          </View>

          <View style={styles.balanceWrap}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>R{walletBalance}.00</Text>
          </View>

          {topUpSuccess !== null && (
            <View style={styles.toastWrap}>
              <CheckCircleIcon size={16} color={colors.accent.primary} />
              <Text style={styles.toastText}>
                Added +R{topUpSuccess}.00 to your wallet!
              </Text>
            </View>
          )}

          {/* Quick Top-Up Chips */}
          <Text style={styles.topUpTitle}>Quick Top-Up (ZAR):</Text>
          <View style={styles.topUpChipsRow}>
            {topUpAmounts.map((amt) => (
              <TouchableOpacity
                key={amt}
                style={styles.topUpChip}
                activeOpacity={0.85}
                onPress={() => handleTopUp(amt)}
              >
                <PlusIcon size={12} color={colors.accent.primary} />
                <Text style={styles.topUpChipText}>R{amt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section: Payment Methods */}
        <Text style={styles.sectionHeader}>Saved Payment Methods</Text>

        {paymentMethods.map((method) => {
          const isSelected = selectedPaymentMethod === method.id;

          return (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                isSelected && styles.methodCardSelected,
              ]}
              activeOpacity={0.85}
              onPress={() => selectPaymentMethod(method.id)}
            >
              <View style={styles.methodIconWrap}>
                {method.type === "wallet" ? (
                  <WalletIcon size={22} color={colors.accent.primary} />
                ) : (
                  <CreditCardIcon size={22} color={colors.accent.primary} />
                )}
              </View>

              <View style={styles.methodInfoWrap}>
                <Text style={styles.methodTitle}>{method.title}</Text>
                <Text style={styles.methodSubtitle}>
                  {method.type === "wallet"
                    ? `Balance: R${walletBalance}.00`
                    : method.subtitle}
                </Text>
              </View>

              <View
                style={[
                  styles.radioOuter,
                  isSelected && styles.radioOuterSelected,
                ]}
              >
                {isSelected && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Add Card CTA */}
        <TouchableOpacity
          style={styles.addCardButton}
          activeOpacity={0.85}
          onPress={handleAddCard}
        >
          <PlusIcon size={18} color={colors.accent.primary} />
          <Text style={styles.addCardText}>Add New Payment Card</Text>
        </TouchableOpacity>

        {/* Security Assurance */}
        <View style={styles.securityCard}>
          <ShieldCheckIcon size={20} color={colors.accent.primary} />
          <Text style={styles.securityText}>
            All transactions are encrypted with bank-grade 256-bit TLS security and compliant with PCI-DSS standards.
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
  walletCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 24,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    marginVertical: spacing.md,
  },
  walletHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  walletIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  walletHeaderInfo: {
    flex: 1,
  },
  walletHeaderLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.accent.primary,
    letterSpacing: 0.8,
  },
  walletSubtext: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },
  balanceWrap: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  balanceLabel: {
    fontSize: 12,
    color: colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  balanceAmount: {
    fontSize: 38,
    fontWeight: "bold",
    color: colors.text.primary,
    marginTop: 2,
  },
  toastWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface.cardAlt,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginVertical: spacing.xs,
  },
  toastText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.accent.primary,
  },
  topUpTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.secondary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  topUpChipsRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  topUpChip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface.cardAlt,
    borderRadius: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: 4,
  },
  topUpChipText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text.secondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.surface.border,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  methodCardSelected: {
    borderColor: colors.accent.primary,
    backgroundColor: colors.surface.cardAlt,
  },
  methodIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface.card,
    alignItems: "center",
    justifyContent: "center",
  },
  methodInfoWrap: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  methodSubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 2,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: colors.accent.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.accent.primary,
  },
  addCardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface.card,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    gap: 8,
  },
  addCardText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.accent.primary,
  },
  securityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: spacing.xs,
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    color: colors.text.secondary,
    lineHeight: 16,
  },
});
