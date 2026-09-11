import React, { useState } from "react";
import {
  ScrollView,
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
  SearchIcon,
  PinIcon,
  TargetIcon,
} from "../../components/common/SvgIcons";
import { useRide } from "../../services/RideContext";

const searchResultsData = [
  {
    id: "dest-1",
    title: "V&A Waterfront",
    address: "19 Dock Rd, Cape Town, 8001",
    distance: "2.4 km",
  },
  {
    id: "dest-2",
    title: "Camps Bay Beach",
    address: "Victoria Rd, Camps Bay, Cape Town",
    distance: "7.8 km",
  },
  {
    id: "dest-3",
    title: "Table Mountain Aerial Cableway",
    address: "Tafelberg Rd, Gardens, Cape Town",
    distance: "5.1 km",
  },
  {
    id: "dest-4",
    title: "Kirstenbosch National Botanical Garden",
    address: "Rhodes Dr, Newlands, Cape Town",
    distance: "12.3 km",
  },
  {
    id: "dest-5",
    title: "Cape Town International Airport (CPT)",
    address: "Matroosfontein, Cape Town",
    distance: "19.5 km",
  },
];

export default function DestinationResultsScreen({
  navigation,
  route,
}: RootStackScreenProps<"DestinationResults">) {
  const { setDestinationLocation } = useRide();
  const initialQuery = route.params?.destination || "";
  const [query, setQuery] = useState(initialQuery);

  const filteredResults = searchResultsData.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.address.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: (typeof searchResultsData)[0]) => {
    setDestinationLocation(item.title, item.address, item.distance);
    navigation.navigate("RideOptions");
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
        <Text style={styles.headerTitle}>Choose Destination</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarWrap}>
        <View style={styles.searchIcon}>
          <SearchIcon size={18} color={colors.accent.primary} />
        </View>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Search location or venue..."
          placeholderTextColor={colors.text.muted}
          autoCapitalize="words"
        />
        {query.length > 0 && (
          <TouchableOpacity
            style={styles.clearBtn}
            onPress={() => setQuery("")}
          >
            <Text style={styles.clearText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Results List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>
          {filteredResults.length} Available Locations
        </Text>

        {filteredResults.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.resultCard}
            activeOpacity={0.85}
            onPress={() => handleSelect(item)}
          >
            <View style={styles.iconCircle}>
              <TargetIcon size={18} color={colors.accent.primary} />
            </View>
            <View style={styles.resultTextWrap}>
              <Text style={styles.resultTitle}>{item.title}</Text>
              <Text style={styles.resultAddress}>{item.address}</Text>
            </View>
            <View style={styles.distanceBadge}>
              <Text style={styles.distanceText}>{item.distance}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  headerSpacer: {
    width: 40,
  },
  searchBarWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    marginHorizontal: spacing.md,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
    borderWidth: 1,
    borderColor: colors.surface.border,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 15,
  },
  clearBtn: {
    padding: 6,
  },
  clearText: {
    color: colors.text.muted,
    fontSize: 20,
    lineHeight: 20,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 16,
    padding: spacing.sm,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.surface.border,
    gap: spacing.sm,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  resultTextWrap: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text.primary,
  },
  resultAddress: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  distanceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: colors.surface.cardAlt,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.accent.primary,
  },
});
