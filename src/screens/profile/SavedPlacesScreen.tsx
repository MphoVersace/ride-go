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
  HomeIcon,
  BriefcaseIcon,
  PinIcon,
  StarIcon,
  PlusIcon,
  TrashIcon,
  ArrowRightIcon,
} from "../../components/common/SvgIcons";
import { useRide, SavedPlace } from "../../services/RideContext";

export default function SavedPlacesScreen({
  navigation,
}: RootStackScreenProps<"SavedPlaces">) {
  const { savedPlaces, addSavedPlace, deleteSavedPlace, setDestinationLocation } =
    useRide();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newType, setNewType] = useState<SavedPlace["type"]>("favorite");

  const handleSelectPlace = (place: SavedPlace) => {
    setDestinationLocation(place.title, place.address, place.distance || "3.5 km");
    navigation.navigate("RideOptions");
  };

  const handleAdd = () => {
    if (!newTitle.trim() || !newAddress.trim()) return;

    addSavedPlace({
      type: newType,
      title: newTitle.trim(),
      address: newAddress.trim(),
      distance: "4.2 km",
    });

    setNewTitle("");
    setNewAddress("");
    setShowAddModal(false);
  };

  const renderIcon = (type: SavedPlace["type"]) => {
    switch (type) {
      case "home":
        return <HomeIcon size={20} color={colors.accent.primary} />;
      case "work":
        return <BriefcaseIcon size={20} color={colors.accent.primary} />;
      case "airport":
        return <PinIcon size={20} color={colors.accent.primary} />;
      default:
        return <StarIcon size={20} color={colors.accent.primary} filled />;
    }
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
        <Text style={styles.navTitle}>Saved Places</Text>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.8}
          onPress={() => setShowAddModal(!showAddModal)}
        >
          <PlusIcon size={18} color={colors.accent.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Subtitle banner */}
        <View style={styles.bannerCard}>
          <Text style={styles.bannerTitle}>Favorite Destinations</Text>
          <Text style={styles.bannerSubtitle}>
            Tap any destination to immediately configure a ride and see vehicle options.
          </Text>
        </View>

        {/* Add Place Card / Form */}
        {showAddModal && (
          <View style={styles.addCard}>
            <Text style={styles.addCardTitle}>Add New Saved Place</Text>

            <View style={styles.typeSelectorRow}>
              {(["home", "work", "favorite"] as const).map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.typeChip,
                    newType === t && styles.typeChipActive,
                  ]}
                  onPress={() => setNewType(t)}
                >
                  <Text
                    style={[
                      styles.typeChipText,
                      newType === t && styles.typeChipTextActive,
                    ]}
                  >
                    {t.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.textInput}
              placeholder="Place name (e.g. Gym, Mom's House)"
              placeholderTextColor={colors.text.muted}
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Full street address in South Africa"
              placeholderTextColor={colors.text.muted}
              value={newAddress}
              onChangeText={setNewAddress}
            />

            <View style={styles.addActionsRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleAdd}>
                <Text style={styles.saveBtnText}>Save Place</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Text style={styles.sectionHeader}>
          {savedPlaces.length} Saved Destinations
        </Text>

        {/* Places List */}
        {savedPlaces.map((place) => (
          <View key={place.id} style={styles.placeCard}>
            <TouchableOpacity
              style={styles.placeClickArea}
              activeOpacity={0.8}
              onPress={() => handleSelectPlace(place)}
            >
              <View style={styles.placeIconCircle}>
                {renderIcon(place.type)}
              </View>

              <View style={styles.placeInfo}>
                <Text style={styles.placeTitle}>{place.title}</Text>
                <Text style={styles.placeAddress} numberOfLines={1}>
                  {place.address}
                </Text>
                {place.distance && (
                  <Text style={styles.placeDistance}>{place.distance} away</Text>
                )}
              </View>

              <View style={styles.arrowCircle}>
                <ArrowRightIcon size={16} color={colors.accent.primary} />
              </View>
            </TouchableOpacity>

            {/* Optional delete button for custom places */}
            {place.type === "favorite" && (
              <TouchableOpacity
                style={styles.deleteButton}
                activeOpacity={0.7}
                onPress={() => deleteSavedPlace(place.id)}
              >
                <TrashIcon size={16} color={colors.text.muted} />
              </TouchableOpacity>
            )}
          </View>
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
  addButton: {
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
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  bannerCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginVertical: spacing.md,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
    marginTop: 3,
    lineHeight: 18,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text.muted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  placeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.card,
    borderRadius: 18,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surface.border,
    marginBottom: spacing.sm,
  },
  placeClickArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  placeIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  placeInfo: {
    flex: 1,
  },
  placeTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  placeAddress: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  placeDistance: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.accent.primary,
    marginTop: 2,
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface.cardAlt,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    padding: 8,
    marginLeft: 4,
  },
  addCard: {
    backgroundColor: colors.surface.card,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.accent.primary,
    marginBottom: spacing.md,
  },
  addCardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  typeSelectorRow: {
    flexDirection: "row",
    gap: 8,
    marginVertical: spacing.xs,
  },
  typeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: colors.surface.cardAlt,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  typeChipActive: {
    borderColor: colors.accent.primary,
    backgroundColor: colors.accent.primary,
  },
  typeChipText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.text.muted,
  },
  typeChipTextActive: {
    color: colors.accent.contrast,
  },
  textInput: {
    height: 44,
    backgroundColor: colors.surface.cardAlt,
    borderRadius: 12,
    paddingHorizontal: 12,
    color: colors.text.primary,
    fontSize: 14,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.surface.border,
  },
  addActionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelBtnText: {
    color: colors.text.secondary,
    fontWeight: "600",
  },
  saveBtn: {
    backgroundColor: colors.accent.primary,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 16,
  },
  saveBtnText: {
    color: colors.accent.contrast,
    fontWeight: "bold",
  },
});
