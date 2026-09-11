import React, { useState } from "react";
import {
  FlatList,
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
  ArrowLeftIcon,
  PinIcon,
  SwapArrowsIcon,
  SearchIcon,
  TargetIcon,
} from "../../components/common/SvgIcons";

interface Suggestion {
  id: string;
  title: string;
  address: string;
  distance: string;
}

export default function DestinationSearchScreen({
  navigation,
}: RootStackScreenProps<"DestinationSearch">) {
  const [pickup, setPickup] = useState("14 Long St, Cape Town");
  const [destination, setDestination] = useState("");

  const suggestions: Suggestion[] = [
    {
      id: "1",
      title: "V&A Waterfront",
      address: "19 Dock Rd, Cape Town, 8001",
      distance: "2.4 km",
    },
    {
      id: "2",
      title: "Cape Town International Airport (CPT)",
      address: "Matroosfontein, Cape Town, 7490",
      distance: "18.5 km",
    },
    {
      id: "3",
      title: "Table Mountain Aerial Cableway",
      address: "Tafelberg Rd, Gardens, Cape Town",
      distance: "6.1 km",
    },
    {
      id: "4",
      title: "Camps Bay Beach",
      address: "Victoria Rd, Camps Bay, Cape Town",
      distance: "7.8 km",
    },
  ];

  const handleSelectLocation = (place: Suggestion) => {
    setDestination(place.title);
    navigation.navigate("DriverFound");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeftIcon size={20} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan your ride</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Stacked Search Inputs */}
      <View style={styles.inputsCard}>
        {/* Pickup Input */}
        <View style={styles.inputRow}>
          <View style={styles.dotOrigin} />
          <TextInput
            style={styles.input}
            value={pickup}
            onChangeText={setPickup}
            placeholder="Enter pick-up location"
            placeholderTextColor={colors.text.muted}
          />
        </View>

        <View style={styles.inputDivider}>
          <TouchableOpacity
            style={styles.swapBtn}
            onPress={() => {
              const temp = pickup;
              setPickup(destination);
              setDestination(temp);
            }}
          >
            <SwapArrowsIcon size={14} color={colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Destination Input */}
        <View style={styles.inputRow}>
          <View style={styles.dotDestination} />
          <TextInput
            style={styles.input}
            value={destination}
            onChangeText={setDestination}
            placeholder="Where to? (e.g. V&A Waterfront)"
            placeholderTextColor={colors.text.muted}
            autoFocus
          />
        </View>
      </View>

      {/* Quick Location Chips */}
      <View style={styles.quickChipsRow}>
        <TouchableOpacity
          style={styles.quickChip}
          activeOpacity={0.85}
          onPress={() => setDestination("Home - 45 Kloof St")}
        >
          <TargetIcon size={14} color={colors.accent.primary} />
          <Text style={styles.quickChipText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickChip}
          activeOpacity={0.85}
          onPress={() => setDestination("Work - Bree St Hub")}
        >
          <TargetIcon size={14} color={colors.accent.primary} />
          <Text style={styles.quickChipText}>Work</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickChip}
          activeOpacity={0.85}
          onPress={() => setDestination("Airport (CPT)")}
        >
          <TargetIcon size={14} color={colors.accent.primary} />
          <Text style={styles.quickChipText}>Airport</Text>
        </TouchableOpacity>
      </View>

      {/* Search Suggestions List */}
      <Text style={styles.resultsTitle}>Suggested Destinations</Text>

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestionCard}
            activeOpacity={0.8}
            onPress={() => handleSelectLocation(item)}
          >
            <View style={styles.iconCircle}>
              <PinIcon size={18} color={colors.accent.primary} />
            </View>

            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemAddress} numberOfLines={1}>
                {item.address}
              </Text>
            </View>

            <Text style={styles.itemDistance}>{item.distance}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface.card,
    borderWidth: 1,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  inputsCard: {
    backgroundColor: colors.surface.card,
    marginHorizontal: spacing.md,
    borderRadius: 24,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.sm,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  dotOrigin: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent.primary,
  },
  dotDestination: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: colors.text.primary,
  },
  input: {
    flex: 1,
    height: 44,
    color: colors.text.primary,
    fontSize: 15,
  },
  inputDivider: {
    height: 1,
    backgroundColor: colors.surface.border,
    marginVertical: 6,
    position: "relative",
    justifyContent: "center",
  },
  swapBtn: {
    position: "absolute",
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface.elevated,
    borderWidth: 1,
    borderColor: colors.surface.border,
    alignItems: "center",
    justifyContent: "center",
  },
  quickChipsRow: {
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  quickChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface.card,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  quickChipText: {
    color: colors.text.secondary,
    fontSize: 13,
    fontWeight: "600",
  },
  resultsTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text.primary,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  listContent: {
    paddingHorizontal: spacing.md,
  },
  suggestionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.sm,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface.subtle,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  itemAddress: {
    fontSize: 12,
    color: colors.text.muted,
    marginTop: 2,
  },
  itemDistance: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.accent.primary,
    marginLeft: spacing.xs,
  },
});
