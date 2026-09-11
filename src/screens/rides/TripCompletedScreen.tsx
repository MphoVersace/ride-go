import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackScreenProps } from "../../navigation/types";
import { colors } from "../../constants/colors";
import { spacing } from "../../constants/metrics";
import {
  StarIcon,
  ShieldCheckIcon,
} from "../../components/common/SvgIcons";

export default function TripCompletedScreen({
  navigation,
}: RootStackScreenProps<"TripCompleted">) {
  const [rating, setRating] = useState(5);
  const [selectedTip, setSelectedTip] = useState<number | null>(20);
  const [comment, setComment] = useState("");

  const tipOptions = [10, 20, 50, 100];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <View style={styles.content}>
        {/* Driver Avatar & Badge */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>UB</Text>
          </View>
          <View style={styles.verifiedBadge}>
            <ShieldCheckIcon size={14} color={colors.accent.contrast} />
          </View>
        </View>

        <Text style={styles.title}>Trip Completed!</Text>
        <Text style={styles.subtitle}>
          How was your ride with <Text style={styles.driverHighlight}>Ucok Behel</Text>?
        </Text>

        {/* 5-Star Rating Selector */}
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              activeOpacity={0.8}
              onPress={() => setRating(star)}
              style={styles.starButton}
            >
              <StarIcon
                size={34}
                color={colors.accent.primary}
                filled={star <= rating}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Fare Receipt Summary */}
        <View style={styles.receiptCard}>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Ride Fare (Standard)</Text>
            <Text style={styles.receiptValue}>R45.00</Text>
          </View>
          {selectedTip !== null && selectedTip > 0 && (
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Driver Tip</Text>
              <Text style={styles.receiptValue}>R{selectedTip}.00</Text>
            </View>
          )}
          <View style={styles.receiptDivider} />
          <View style={styles.receiptRow}>
            <Text style={styles.receiptTotalLabel}>Total Paid</Text>
            <Text style={styles.receiptTotalValue}>
              R{45 + (selectedTip ?? 0)}.00
            </Text>
          </View>
        </View>

        {/* Tip Selection in Rands */}
        <View style={styles.tipSection}>
          <Text style={styles.tipTitle}>Add a tip for Ucok?</Text>
          <View style={styles.tipChipsRow}>
            {tipOptions.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.tipChip,
                  selectedTip === amount && styles.tipChipActive,
                ]}
                activeOpacity={0.85}
                onPress={() => setSelectedTip(amount === selectedTip ? null : amount)}
              >
                <Text
                  style={[
                    styles.tipChipText,
                    selectedTip === amount && styles.tipChipTextActive,
                  ]}
                >
                  R{amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Optional Comment Input */}
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.textInput}
            placeholder="Leave a comment (optional)..."
            placeholderTextColor={colors.text.muted}
            value={comment}
            onChangeText={setComment}
          />
        </View>

        {/* Submit / Done Button */}
        <TouchableOpacity
          style={styles.doneButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("RiderHome")}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: spacing.lg,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: spacing.sm,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface.card,
    borderWidth: 3,
    borderColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.accent.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  driverHighlight: {
    color: colors.accent.primary,
    fontWeight: "bold",
  },
  starsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: spacing.lg,
  },
  starButton: {
    padding: 4,
  },
  receiptCard: {
    width: "100%",
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.md,
  },
  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  receiptLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  receiptValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
  },
  receiptDivider: {
    height: 1,
    backgroundColor: colors.surface.border,
    marginVertical: spacing.xs,
  },
  receiptTotalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  receiptTotalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.accent.primary,
  },
  tipSection: {
    width: "100%",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  tipChipsRow: {
    flexDirection: "row",
    gap: spacing.xs,
    width: "100%",
    justifyContent: "center",
  },
  tipChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: colors.surface.card,
    borderWidth: 1,
    borderColor: colors.surface.border,
    minWidth: 64,
    alignItems: "center",
  },
  tipChipActive: {
    backgroundColor: colors.accent.primary,
    borderColor: colors.accent.primary,
  },
  tipChipText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text.secondary,
  },
  tipChipTextActive: {
    color: colors.accent.contrast,
  },
  inputWrap: {
    width: "100%",
    backgroundColor: colors.surface.card,
    borderRadius: 18,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.lg,
  },
  textInput: {
    color: colors.text.primary,
    fontSize: 14,
    height: 44,
  },
  doneButton: {
    width: "100%",
    backgroundColor: colors.accent.primary,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  doneButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.accent.contrast,
  },
});
